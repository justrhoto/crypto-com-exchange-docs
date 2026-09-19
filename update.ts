#!/usr/bin/env bun
/**
 * Syncs the local mirror in `docs/` with the Crypto.com Exchange API documentation.
 *
 * Upstream is a Docusaurus site that publishes llmstxt.org endpoints, so there is no HTML
 * scraping here: `llms.txt` enumerates every page, and each page has a clean `.md` twin
 * that we copy byte-for-byte.
 *
 * Run order matters. The guardrail runs before anything touches the working tree, and
 * pruning runs after it: the failure mode this protects against is upstream serving a
 * truncated `llms.txt`, which a prune-first script would turn into a mass deletion.
 */
import { createHash } from "node:crypto";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, posix, relative, sep } from "node:path";

const BASE = "https://exchange-developer.crypto.com/exchange/v1/";
const LLMS_TXT = `${BASE}llms.txt`;
const DOCS_DIR = "docs";
const METADATA_FILE = ".metadata.json";
const INDEX_FILE = "INDEX.md";
const USER_AGENT =
  "crypto-com-exchange-docs/1.0 (+https://github.com/justrhoto/crypto-com-exchange-docs; docs mirror)";

/** Fail the run rather than prune if the page count falls by more than this fraction. */
const SHRINK_TOLERANCE = 0.1;
const CONCURRENCY = 8;
const MAX_ATTEMPTS = 3;

/** A `- [title](url): description` entry from llms.txt. */
type Entry = { title: string; url: string; description: string };

/** An entry we mirror, with its resolved local path and fetched body. */
type Page = Entry & { path: string; body: string };

type Metadata = {
  source: string;
  pageCount: number;
  /** URLs deliberately not mirrored, so new ones show up in a diff rather than vanishing. */
  skipped: string[];
  /** Per-file sha256. Deliberately no timestamp: this file must only change when content does. */
  files: Record<string, string>;
};

const sha256 = (s: string) => createHash("sha256").update(s).digest("hex");
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function fetchText(url: string): Promise<string> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(url, { headers: { "user-agent": USER_AGENT } });
      if (res.status === 429 || res.status >= 500) throw new Error(`HTTP ${res.status}`);
      // Other 4xx will not fix themselves; fail fast instead of burning retries.
      if (!res.ok) throw Object.assign(new Error(`HTTP ${res.status}`), { fatal: true });
      return await res.text();
    } catch (error) {
      lastError = error;
      if ((error as { fatal?: boolean }).fatal || attempt === MAX_ATTEMPTS) break;
      await sleep(500 * 2 ** (attempt - 1));
    }
  }
  throw new Error(`Failed to fetch ${url}: ${lastError}`);
}

/** Parses `- [Title](https://...): description` lines. */
function parseLlmsTxt(text: string): Entry[] {
  const entries: Entry[] = [];
  const seen = new Set<string>();
  for (const line of text.split("\n")) {
    const match = line.match(/^\s*-\s*\[([^\]]*)\]\((https?:\/\/[^)]+)\)\s*:?\s*(.*)$/);
    if (!match) continue;
    const [, title, url, description] = match;
    if (seen.has(url)) continue;
    seen.add(url);
    entries.push({ title: title.trim(), url, description: description.trim() });
  }
  return entries;
}

/** We mirror only `.md` pages on the docs host; everything else is reported, never dropped silently. */
const isMirrorable = (url: string) => url.startsWith(BASE) && url.endsWith(".md");

/** `.../exchange/v1/docs/api/rest/x.md` -> `docs/api/rest/x.md`, preserving upstream structure verbatim. */
const localPath = (url: string) => url.slice(BASE.length);

async function readMetadata(): Promise<Metadata | null> {
  try {
    return JSON.parse(await readFile(METADATA_FILE, "utf8")) as Metadata;
  } catch {
    return null;
  }
}

/** Every existing mirrored file, as posix-style repo-relative paths. */
async function existingFiles(): Promise<string[]> {
  const out: string[] = [];
  const walk = async (dir: string) => {
    let items;
    try {
      items = await readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const item of items) {
      const full = join(dir, item.name);
      if (item.isDirectory()) await walk(full);
      else if (item.name.endsWith(".md")) out.push(relative(".", full).split(sep).join(posix.sep));
    }
  };
  await walk(DOCS_DIR);
  return out;
}

/** Fetches every page with a bounded worker pool. Any failure aborts the whole run. */
async function fetchPages(entries: Entry[]): Promise<Page[]> {
  const pages: Page[] = new Array(entries.length);
  let cursor = 0;
  let done = 0;
  const worker = async () => {
    while (cursor < entries.length) {
      const index = cursor++;
      const entry = entries[index];
      pages[index] = { ...entry, path: localPath(entry.url), body: await fetchText(entry.url) };
      if (++done % 25 === 0) console.log(`  fetched ${done}/${entries.length}`);
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  return pages;
}

/** REST / WebSocket / FIX, derived from the path so guide pages land beside their protocol. */
function protocolOf(path: string): string {
  if (!path.startsWith("docs/api/")) return "Other";
  const rest = path.slice("docs/api/".length);
  if (rest.startsWith("rest/") || rest.startsWith("rest-")) return "REST API";
  if (rest.startsWith("websocket/") || rest.startsWith("websocket-")) return "WebSocket API";
  if (rest.startsWith("fix/") || rest.startsWith("fix-")) return "FIX API";
  return "Other";
}

const tagOf = (body: string) => body.match(/^-\s*\*\*Tags:\*\*\s*(.+)$/m)?.[1].trim() ?? "Guides";
const methodOf = (body: string) => body.match(/^-\s*\*\*Method:\*\*\s*`([^`]+)`/m)?.[1] ?? "";
const endpointOf = (body: string) => body.match(/^-\s*\*\*Path:\*\*\s*`([^`]+)`/m)?.[1] ?? "";

const PROTOCOL_ORDER = ["REST API", "WebSocket API", "FIX API", "Other"];

function buildIndex(pages: Page[], skipped: Entry[]): string {
  const groups = new Map<string, Map<string, Page[]>>();
  for (const page of pages) {
    const protocol = protocolOf(page.path);
    const tag = tagOf(page.body);
    if (!groups.has(protocol)) groups.set(protocol, new Map());
    const tags = groups.get(protocol)!;
    if (!tags.has(tag)) tags.set(tag, []);
    tags.get(tag)!.push(page);
  }

  const lines = [
    "# Index",
    "",
    "<!-- Generated by update.ts. Do not edit by hand; your changes will be overwritten. -->",
    "",
    `${pages.length} pages mirrored from the [Crypto.com Exchange API documentation](${BASE}docs/api/rest-introduction).`,
    "",
  ];

  const protocols = [...groups.keys()].sort(
    (a, b) => PROTOCOL_ORDER.indexOf(a) - PROTOCOL_ORDER.indexOf(b),
  );
  for (const protocol of protocols) {
    lines.push(`## ${protocol}`, "");
    // "Guides" last: reference material reads better after the endpoints it describes.
    const tags = [...groups.get(protocol)!.keys()].sort((a, b) =>
      a === "Guides" ? 1 : b === "Guides" ? -1 : a.localeCompare(b),
    );
    for (const tag of tags) {
      const entries = groups.get(protocol)!.get(tag)!.sort((a, b) => a.path.localeCompare(b.path));
      lines.push(`### ${tag}`, "");
      const hasEndpoints = entries.some((p) => endpointOf(p.body));
      lines.push(
        hasEndpoints ? "| Page | Method | Path |" : "| Page | Description |",
        hasEndpoints ? "| --- | --- | --- |" : "| --- | --- |",
      );
      for (const page of entries) {
        const title = (page.title || page.path).replace(/\|/g, "\\|");
        const link = `[${title}](${page.path})`;
        if (hasEndpoints) {
          lines.push(`| ${link} | ${methodOf(page.body)} | \`${endpointOf(page.body)}\` |`);
        } else {
          lines.push(`| ${link} | ${page.description.replace(/\|/g, "\\|").slice(0, 160)} |`);
        }
      }
      lines.push("");
    }
  }

  if (skipped.length) {
    lines.push(
      "## Not mirrored",
      "",
      "Listed upstream but outside the mirror (not Markdown, or not on the documentation host).",
      "",
    );
    for (const entry of skipped) lines.push(`- [${entry.title}](${entry.url})`);
    lines.push("");
  }
  return lines.join("\n");
}

async function main() {
  console.log(`Enumerating ${LLMS_TXT}`);
  const entries = parseLlmsTxt(await fetchText(LLMS_TXT));
  const mirrorable = entries.filter((e) => isMirrorable(e.url));
  const skipped = entries.filter((e) => !isMirrorable(e.url));
  console.log(
    `  ${entries.length} entries: ${mirrorable.length} mirrorable, ${skipped.length} skipped`,
  );
  for (const entry of skipped) console.log(`  skipping ${entry.url}`);

  // Guardrail. Runs before any write, and before any prune.
  const previous = await readMetadata();
  if (mirrorable.length === 0) {
    throw new Error("llms.txt yielded no mirrorable pages; refusing to touch the mirror.");
  }
  if (previous) {
    const floor = Math.floor(previous.pageCount * (1 - SHRINK_TOLERANCE));
    if (mirrorable.length < floor) {
      throw new Error(
        `Page count fell from ${previous.pageCount} to ${mirrorable.length} (floor ${floor}). ` +
          "Upstream may be broken; refusing to sync. Re-run once upstream recovers, or edit " +
          `${METADATA_FILE} by hand if the drop is genuine.`,
      );
    }
  }

  console.log(`Fetching ${mirrorable.length} pages`);
  const pages = await fetchPages(mirrorable);

  const wanted = new Set(pages.map((p) => p.path));
  const before = await existingFiles();
  let added = 0;
  let modified = 0;
  for (const page of pages) {
    const existing = await readFile(page.path, "utf8").catch(() => null);
    if (existing === page.body) continue;
    await mkdir(dirname(page.path), { recursive: true });
    await writeFile(page.path, page.body);
    if (existing === null) added++;
    else modified++;
  }

  const orphans = before.filter((f) => !wanted.has(f));
  for (const orphan of orphans) await rm(orphan);

  await writeFile(INDEX_FILE, buildIndex(pages, skipped));
  const metadata: Metadata = {
    source: LLMS_TXT,
    pageCount: pages.length,
    skipped: skipped.map((e) => e.url),
    files: Object.fromEntries(
      pages.map((p) => [p.path, sha256(p.body)] as const).sort((a, b) => a[0].localeCompare(b[0])),
    ),
  };
  await writeFile(METADATA_FILE, `${JSON.stringify(metadata, null, 2)}\n`);

  const summary = `${modified} modified, ${added} added, ${orphans.length} removed`;
  const changed = modified + added + orphans.length > 0;
  console.log(`Done: ${summary}`);
  if (process.env.GITHUB_OUTPUT) {
    await writeFile(process.env.GITHUB_OUTPUT, `changed=${changed}\nsummary=${summary}\n`, {
      flag: "a",
    });
  }
}

main().catch((error) => {
  console.error(`\n${error instanceof Error ? error.message : error}`);
  process.exit(1);
});
