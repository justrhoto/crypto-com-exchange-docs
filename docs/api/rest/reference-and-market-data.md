# Reference and Market Data

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/reference-and-market-data

Reference and market data endpoints provide public, unauthenticated access to instrument metadata, real-time market data, and historical pricing information. These endpoints form the foundation for price discovery, order book analysis, and trading decision workflows.

## Core Data Types

### Instrument Reference Data

Use [`public/get-instruments`](/exchange/v1/docs/api/rest/public-get-instruments) to retrieve the full catalog of tradable instruments. Each instrument includes:

*   Contract specifications (tick size, quantity decimals, leverage limits)
*   Product classification (perpetual swap, future, option)
*   Trading status and expiry information
*   Underlying index reference

This endpoint should be called on application startup and periodically refreshed to detect new listings or contract expirations.

### Real-Time Market Data

| Endpoint           | Use Case                                       | Update Frequency                      |
| :----------------- | :--------------------------------------------- | :------------------------------------ |
| public/get-book    | Order book depth (bids/asks)                   | Snapshot on request (up to 50 levels) |
| public/get-tickers | 24h summary (high, low, volume, open interest) | Updated per trade                     |
| public/get-trades  | Recent trade history                           | Last 150 trades (7-day max window)    |

For low-latency applications, use WebSocket subscriptions instead:

*   `book.{instrument_name}.{depth}` - Order book updates (10 or 50 levels)
*   `ticker.{instrument_name}` - Real-time ticker updates
*   `trade.{instrument_name}` - Trade feed

### Settlement and Expiry

[`public/get-expired-settlement-price`](/exchange/v1/docs/api/rest/public-get-expired-settlement-price) provides historical settlement prices for expired futures contracts. Use this for post-trade reconciliation and historical PnL calculations.

## Rate Limits

Public endpoints share a global rate limit pool. For market data-intensive applications:

*   Use WebSocket subscriptions instead of polling REST endpoints
*   Cache `public/get-instruments` responses (updates infrequently)
*   Batch ticker requests by omitting `instrument_name` to get all tickers in one call

## Typical Integration Flow

**Step 1 — Bootstrap Reference Data**

Call `public/get-instruments` to load the instrument catalog. Store contract specifications locally.

**Step 2 — Subscribe to Market Data**

For real-time pricing, establish WebSocket connections and subscribe to:

*   `book.{instrument_name}.10` - top 10 order book levels
*   `ticker.{instrument_name}` - 24h summary stats
*   `trade.{instrument_name}` - trade feed

**Step 3 — Polling Fallback**

If WebSocket connections are unavailable, poll `public/get-tickers` and `public/get-book` at reasonable intervals (e.g., 1-5 seconds).