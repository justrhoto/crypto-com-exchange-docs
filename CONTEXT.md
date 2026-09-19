# Context

Vocabulary for this repository. Terms here mean exactly this and nothing looser.

## Mirror

The `docs/` tree: local copies of upstream documentation pages, byte-identical to what upstream
serves. The mirror is never hand-edited — a sync run is the only thing that writes to it. "The
mirror is correct" means every file matches upstream byte-for-byte, which is a comparison, not a
judgement.

## Page

One upstream documentation page, identified by its URL. Every page has exactly one file in the
mirror, at the path formed by stripping the upstream base URL. A page is the unit of everything
here: fetching, diffing, hashing, and indexing.

Distinct from an **endpoint**: an endpoint is a callable API operation. Most REST pages document
one endpoint, but guide pages (`rest-introduction`, `rest-common-api-reference`) document none.

## Sync run

One execution of `update.ts`. Its steps are ordered and the order is load-bearing: enumerate →
guard → fetch → write → prune → index → commit. A run either completes all of these or writes
nothing.

## Enumeration

Reading the list of pages that should exist, from upstream's `llms.txt`. This is the only source
of truth for what belongs in the mirror. A page that is not enumerated does not belong, however
recently it was there.

## Guardrail

The check between enumeration and any write: the run fails if enumeration yields no pages, or
fewer than 90% of the previous run's count. It exists because enumeration and deletion are
linked — a truncated `llms.txt` would otherwise be indistinguishable from upstream genuinely
removing hundreds of pages.

## Orphan

A file in the mirror that the current run did not enumerate. Orphans are pruned, because a
mirror containing endpoints that no longer exist misinforms whoever reads it. Pruning happens
strictly after the guardrail passes; git retains the content regardless.

## Skipped URL

A URL that appears in `llms.txt` but falls outside the mirror rule — not Markdown, or not on the
documentation host. Skipped URLs are recorded in `.metadata.json` and listed in `INDEX.md`, never
silently discarded: a growing skip list is how we learn upstream has started publishing pages in
a form we do not handle. Currently empty.

## Generated file

A file written by a sync run and owned entirely by it: `INDEX.md`, `.metadata.json`, and
everything under `docs/`. Edits to these are lost on the next run. `README.md`, `SKILL.md`, this
file, and the ADRs are hand-written and never touched by the script — the division is absolute,
so no file is ever half-owned.
