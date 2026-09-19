---
name: crypto-com-exchange-docs
description: Reference documentation for the Crypto.com Exchange API (REST, WebSocket, and FIX). Use when working with Crypto.com Exchange endpoints, authentication and request signing, order placement and management, market data feeds, WebSocket channels, wallets, staking, or FIX messages — or when the user mentions Crypto.com Exchange, exchange-developer.crypto.com, or an endpoint like private/create-order.
---

# Crypto.com Exchange API documentation

A local mirror of the complete Crypto.com Exchange API documentation: 221 pages covering the
REST, WebSocket, and FIX APIs. Read from here instead of fetching the live site.

## Finding a page

Start with `INDEX.md`. It lists every page grouped by protocol (REST, WebSocket, FIX) and then
by tag (Trading, Crypto Wallet, Reference and Market Data, and so on), with the HTTP method and
path for each endpoint.

To go directly from a documentation URL to a local file, drop
`https://exchange-developer.crypto.com/exchange/v1/` and append `.md`:

| Looking for | Read |
| --- | --- |
| Authentication, signing, rate limits, error codes | `docs/api/rest-common-api-reference.md` |
| A REST endpoint | `docs/api/rest/<method-name>.md`, e.g. `private-create-order.md` |
| A WebSocket channel | `docs/api/websocket/ws-channel-<name>.md` |
| A FIX message | `docs/api/fix/fix-<message>.md` |
| Concepts for an area | `docs/api/rest/<topic>.md`, e.g. `trading.md` |

Endpoint pages carry the method, path, tags, typed parameters, and request/response examples.
`docs/api/rest-change-log.md` and `docs/api/rest-breaking-change-schedule.md` cover upcoming
changes.

## Using it

Read the specific endpoint page before writing code against an endpoint — parameter names,
types, and required/optional status are exact in these pages and easy to get wrong from memory.
Signing and nonce rules live in `rest-common-api-reference.md` and apply to every private call.

## Caveats

These files are an unmodified mirror, synced nightly; they are not authoritative. For anything
that moves funds or affects risk, confirm against the live documentation. Do not edit files
under `docs/` — the next sync overwrites them.
