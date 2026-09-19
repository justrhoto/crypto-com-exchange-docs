# FIX Drop Copy

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/fix/fix-drop-copy

Drop Copy flow for receiving real-time copies of all execution reports for trade monitoring and reconciliation.

Drop Copy provides a separate connection that mirrors execution reports from the Order Management flow, enabling:

*   **Trade Monitoring**: Real-time visibility into all order activity and fills
*   **Reconciliation**: Independent feed for back-office systems to verify trades
*   **Audit Trail**: Complete record of all execution events

This flow receives:

*   **Execution Reports** (35=8): All order status changes, fills, and confirmations
*   **Cancel Rejects** (35=9): Notifications when cancel requests are rejected

## Important Notes

*   Drop Copy is **read-only** — you cannot send orders or cancellations on this connection
*   Use Drop Copy alongside Order Management for complete trade visibility

## Related Documentation

*   [FIX Introduction](/exchange/v1/docs/api/fix/exchange-fix-protocol) — API overview, authentication, endpoints, and message structure
*   [FIX Session Management](/exchange/v1/docs/api/fix/fix-session-management) — Session management, logon/logout, and heartbeat messages