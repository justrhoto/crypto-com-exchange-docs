# 0001. Mirror upstream URL paths verbatim

Date: 2026-09-19

## Status

Accepted

## Context

The mirror holds 221 pages. Upstream organises them under paths like
`docs/api/rest/private-advanced-amend-order` and `docs/api/fix/fix-logon` — machine-generated,
flat within each protocol, and not especially pleasant to read. Comparable projects (notably
`ammario/kalshi-docs`) reorganise their mirrors into hand-designed trees such as
`api-reference/trading/create-order.md`, which browse considerably better.

Every endpoint page carries a `Tags:` field, so a nicer structure could be derived rather than
hand-written — but tags are absent on guide and FIX pages, so a derived tree would still need
hand-written rules for roughly a third of the corpus.

The sync runs unattended every night. Whatever structure we choose, the script has to place new
and moved pages into it without a human present.

## Decision

Local paths mirror upstream URL paths exactly. The local path is the upstream URL with the base
`https://exchange-developer.crypto.com/exchange/v1/` removed, and nothing else. No renaming, no
regrouping, no curated directories.

Navigability is provided by a generated `INDEX.md` instead, which groups pages by protocol and
tag. Structure lives in the index, which is disposable and regenerated every run; the file tree
stays mechanical.

## Consequences

The path mapping is total and reversible, so the script never needs a human decision. A page
added upstream lands in the right place automatically. A page moved upstream appears as a delete
plus an add — noisy, but honest and self-correcting.

Any URL in the documentation converts to a local path by hand, in one step, which makes the
mirror easy to cross-reference while reading the live site.

The cost is aesthetic and real: the tree is uglier than a curated one, and related endpoints are
not adjacent on disk. We judged this acceptable because the index recovers the browsing
experience, while a curated tree would have created a mapping requiring maintenance forever — and
the first unattended sync after an upstream restructure is exactly when nobody is watching.

This is expensive to reverse once anything links to these paths: consumers vendor the repository
as a submodule and reference files directly. Reorganising later would break those references.
