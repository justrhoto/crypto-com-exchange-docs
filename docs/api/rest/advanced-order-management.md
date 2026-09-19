# Advanced Order Management

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/advanced-order-management

Advanced Order Management provides trigger orders and multi-leg execution strategies beyond basic LIMIT and MARKET orders. Use these endpoints for conditional order execution based on price triggers.

## Trigger Orders

Trigger orders activate when a reference price condition is met. Use [`private/advanced/create-order`](/exchange/v1/docs/api/rest/private-advanced-create-order) to create trigger orders.

| Type              | Description                                                                                      |
| :---------------- | :----------------------------------------------------------------------------------------------- |
| STOP_LOSS         | Converts to a market order when trigger price is reached. Used to limit losses.                  |
| STOP_LIMIT        | Converts to a limit order when trigger price is reached. Offers price control on stop execution. |
| TAKE_PROFIT       | Market order activated when price moves favorably to the trigger level. Used to lock in gains.   |
| TAKE_PROFIT_LIMIT | Limit order activated when price moves favorably to the trigger level.                           |

Trigger orders require:

*   `ref_price` — the trigger price
*   `ref_price_type` — reference price source: `MARK_PRICE` (default), `INDEX_PRICE`, or `LAST_PRICE`

## Multi-Leg Strategies

Multi-leg orders link multiple orders together with conditional execution logic.

| Strategy                 | Description                                                                                     | Endpoint                      |
| :----------------------- | :---------------------------------------------------------------------------------------------- | :---------------------------- |
| OCO (One-Cancels-Other)  | Two orders where filling one cancels the other. Typically pairs a take-profit with a stop-loss. | private/advanced/create-oco   |
| OTO (One-Triggers-Other) | Primary order triggers a secondary order when filled. Used to attach TP/SL to an entry order.   | private/advanced/create-oto   |
| OTOCO (One-Triggers-OCO) | Primary order triggers an OCO pair when filled. Entry order with both TP and SL attached.       | private/advanced/create-otoco |

## Contingency Types

Multi-leg orders use contingency types to define the relationship between legs:

| Type         | Description                                                                |
| :----------- | :------------------------------------------------------------------------- |
| OCO          | One-Cancels-Other: two orders, one cancels when the other fills            |
| SPOT_ATTACH  | Attach trigger orders to a spot position                                   |
| DERIV_ATTACH | Attach trigger orders to a derivatives position (supports isolated margin) |

## Order Management

*   [`private/advanced/amend-order`](/exchange/v1/docs/api/rest/private-advanced-amend-order) — modify trigger price or quantity
*   [`private/advanced/cancel-order`](/exchange/v1/docs/api/rest/private-advanced-cancel-order) — cancel a single advanced order
*   [`private/advanced/cancel-all-orders`](/exchange/v1/docs/api/rest/private-advanced-cancel-all-orders) — cancel all advanced orders for an instrument
*   [`private/advanced/get-open-orders`](/exchange/v1/docs/api/rest/private-advanced-get-open-orders) — retrieve open advanced orders
*   [`private/advanced/get-order-history`](/exchange/v1/docs/api/rest/private-advanced-get-order-history) — retrieve advanced order history

## Real-Time Updates

Subscribe to `user.advanced.order` for real-time advanced order lifecycle events.