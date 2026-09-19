# FIX Order Management

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/fix/fix-order-management

Order Management flow for trading operations on the Crypto.com Exchange via FIX protocol.

This flow supports:

*   **Order Entry**: Create new orders (35=D NewOrderSingle), modify existing orders (35=G OrderCancelReplaceRequest), and cancel orders (35=F OrderCancelRequest, 35=q OrderMassCancelRequest)
*   **Execution Reports**: Receive order confirmations, fills, and status updates (35=8 ExecutionReport)
*   **Order Status**: Query current order status (35=H OrderStatusRequest)
*   **Rejections**: Handle order and cancel rejections (35=9 OrderCancelReject, 35=j BusinessMessageReject)

## Related Documentation

*   [FIX Introduction](/exchange/v1/docs/api/fix/exchange-fix-protocol) — API overview, authentication, endpoints, and message structure
*   [FIX Session Management](/exchange/v1/docs/api/fix/fix-session-management) — Session management, logon/logout, and heartbeat messages