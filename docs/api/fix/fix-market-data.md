# FIX Market Data

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/fix/fix-market-data

Market Data flow for receiving real-time market information via FIX protocol.

This flow supports:

*   **Subscriptions**: Subscribe to market data channels (35=V MarketDataRequest)
*   **Order Book Updates**: Receive incremental order book changes (35=X MarketDataIncrementalRefresh) and full snapshots (35=W MarketDataSnapshotFullRefresh)
*   **Instrument Data**: Query available instruments (35=x SecurityListRequest, 35=c SecurityDefinitionRequest)
*   **Rejections**: Handle subscription rejections (35=Y MarketDataRequestReject)

## Related Documentation

*   [FIX Introduction](/exchange/v1/docs/api/fix/exchange-fix-protocol) — API overview, authentication, endpoints, and message structure
*   [FIX Session Management](/exchange/v1/docs/api/fix/fix-session-management) — Session management, logon/logout, and heartbeat messages