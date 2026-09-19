# crypto-com-exchange-docs

An unofficial, LLM-friendly, auto-updating Markdown mirror of the [Crypto.com Exchange API
documentation](https://exchange-developer.crypto.com/exchange/v1/docs/api/rest-introduction).

**[Browse the index →](INDEX.md)**

221 pages covering the REST, WebSocket, and FIX APIs, refreshed nightly. Every page is stored
byte-for-byte as upstream publishes it, at a path mirroring its upstream URL — so a `git diff`
shows exactly what Crypto.com changed, and nothing else.

## Why this exists

Pointing an agent at the live documentation means rendering a JavaScript site, paginating a
sidebar, and re-fetching content that rarely changes. Pointing it at this repository means
reading local Markdown. The git history also turns "what changed in the API?" into `git log`.

## Layout

```
INDEX.md                                      generated; grouped by protocol and tag
docs/api/rest-introduction.md                 guide pages
docs/api/rest/private-create-order.md         REST endpoints  (112)
docs/api/websocket/ws-channel-user-order.md   WebSocket channels (62)
docs/api/fix/fix-logon.md                     FIX messages    (31)
.metadata.json                                per-file hashes and page count
update.ts                                     the sync script
```

Local paths mirror upstream URLs exactly: drop
`https://exchange-developer.crypto.com/exchange/v1/` from any documentation URL, add `.md`, and
you have the path in this repository. Nothing here is reorganised or hand-curated, so nothing
here needs a human to decide where a new page belongs — an upstream restructure sorts itself out
unattended, which matters for a job that runs nightly with nobody watching. Browsing structure
lives in the generated `INDEX.md` instead, where it is disposable.

## Use with an AI agent

This repository is also a skill directory. Clone it into your agent's skills folder:

```sh
git clone https://github.com/justrhoto/crypto-com-exchange-docs ~/.claude/skills/crypto-com-exchange-docs
```

Or vendor it into a project, pinned to a commit you control:

```sh
git submodule add https://github.com/justrhoto/crypto-com-exchange-docs docs/crypto-com
```

## How the sync works

`update.ts` runs nightly via GitHub Actions:

1. **Enumerate** — fetch `llms.txt`, which lists every documentation page. Upstream supports the
   [llmstxt.org](https://llmstxt.org) convention and serves a clean `.md` twin for every page,
   so there is no HTML scraping and no link rewriting anywhere in this repository.
2. **Guard** — if `llms.txt` is unreachable, empty, or lists more than 10% fewer pages than the
   last successful run, the job fails and *nothing is written*. A mirror that silently deletes
   itself after one bad upstream deploy is worse than a mirror that goes stale loudly.
3. **Fetch** — all pages, 8 at a time, with retry and backoff. Any page that fails after three
   attempts aborts the run before any write.
4. **Write and prune** — changed pages are written; files no longer listed upstream are deleted.
   Pruning happens only after the guardrail passes.
5. **Commit** — direct to `main`, only when something changed, with the summary in the commit
   message: `docs: sync 2026-09-20 (3 modified, 1 added, 0 removed)`.

Run it yourself with `bun run update.ts`. It is idempotent.

Known single point of failure: `llms.txt` is the only enumeration source. There is no reachable
`sitemap.xml` and no published OpenAPI specification, and the `.md` endpoints are undocumented.
If Crypto.com withdraws them, the nightly job fails visibly rather than corrupting the mirror.

## Licence and attribution

This is an **unofficial** mirror. It is not affiliated with, endorsed by, or maintained by
Crypto.com.

- The documentation under `docs/` is the property of Crypto.com, reproduced here unmodified for
  reference. All rights to that content remain with its owner.
- The tooling in this repository — `update.ts`, the workflow, and the generated index — is
  [MIT licensed](LICENSE).

Content may be stale or incomplete. **The live documentation is always authoritative**,
especially for anything involving funds, risk parameters, or margin rules. Verify against
[exchange-developer.crypto.com](https://exchange-developer.crypto.com/exchange/v1/docs/api/rest-introduction)
before you trade on it.
