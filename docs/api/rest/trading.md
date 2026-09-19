# Trading

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/trading

Private trading endpoints manage order placement and lifecycle. All order operations (create, amend, cancel) are asynchronous — the REST response confirms the request was received, but order lifecycle updates arrive via WebSocket subscriptions.

## Order Management Workflow

**Create Order** Call `private/create-order` to submit a new order. The response returns an `order_id` and `client_oid`, but the order may still be pending acceptance by the matching engine. Subscribe to `user.order` or `user.order.{instrument_name}` to receive real-time order status updates.

**Amend Order** Call [`private/amend-order`](/exchange/v1/docs/api/rest/private-amend-order) to modify price or quantity on an existing order. Behind the scenes, amend performs a cancel-then-create operation. The new order loses queue priority unless you are only reducing quantity.

**Cancel Order** Call [`private/cancel-order`](/exchange/v1/docs/api/rest/private-cancel-order) to cancel a single order by `order_id` or `client_oid`, or [`private/cancel-all-orders`](/exchange/v1/docs/api/rest/private-cancel-all-orders) to cancel all orders for a given instrument.

## Order Types

| Type   | Description                                                                         |
| :----- | :---------------------------------------------------------------------------------- |
| LIMIT  | Limit order with specified price. Rests on the order book until filled or canceled. |
| MARKET | Market order that executes immediately at best available price.                     |

For trigger orders (stop-loss, take-profit) and multi-leg strategies (OCO, OTO, OTOCO), see [Advanced Order Management](/exchange/v1/docs/api/rest/advanced-order-management).

## Time in Force

| Value               | Description                                                                         |
| :------------------ | :---------------------------------------------------------------------------------- |
| GOOD_TILL_CANCEL    | Order remains active until filled or explicitly canceled. Default for limit orders. |
| IMMEDIATE_OR_CANCEL | Order fills immediately (partial or full), unfilled portion is canceled.            |
| FILL_OR_KILL        | Order must fill entirely and immediately, or the entire order is canceled.          |

## Execution Instructions

Execution instructions are passed as an array in `exec_inst`. Multiple instructions can be combined.

| Instruction     | Description                                                                                          |
| :-------------- | :--------------------------------------------------------------------------------------------------- |
| POST_ONLY       | Order is rejected if it would take liquidity. Ensures maker fee.                                     |
| SMART_POST_ONLY | If the order would take liquidity, it is repriced to the best maker level instead of being rejected. |
| REDUCE_ONLY     | Order can only reduce an existing position, not increase or open a new position.                     |

## Order Statuses

| Status   | Description                                                        |
| :------- | :----------------------------------------------------------------- |
| PENDING  | Order submitted, awaiting processing by the matching engine.       |
| NEW      | Order accepted by the matching engine, not yet on the order book.  |
| ACTIVE   | Order is live on the order book, waiting to be filled.             |
| FILLED   | Order has been completely filled.                                  |
| CANCELED | Order was canceled (by user request, or by system).                |
| EXPIRED  | Order expired due to time-in-force constraints.                    |
| REJECTED | Order was rejected (e.g., invalid parameters, risk checks failed). |

## Querying Orders and Trades

*   [`private/get-open-orders`](/exchange/v1/docs/api/rest/private-get-open-orders) — retrieve all currently active orders
*   [`private/get-order-detail`](/exchange/v1/docs/api/rest/private-get-order-detail) — fetch detailed information about a single order
*   [`private/get-order-history`](/exchange/v1/docs/api/rest/private-get-order-history) — retrieve past orders (filled, canceled, or rejected)
*   [`private/get-trades`](/exchange/v1/docs/api/rest/private-get-trades) — retrieve executed trades (fills)

## Real-Time Order and Trade Updates

Subscribe to the following WebSocket channels for real-time updates:

| Channel                      | Description                                      |
| :--------------------------- | :----------------------------------------------- |
| user.order                   | Order lifecycle events across all instruments    |
| user.order.{instrument_name} | Order updates for a specific instrument          |
| user.trade                   | Trade execution events across all instruments    |
| user.trade.{instrument_name} | Trade execution events for a specific instrument |

These subscriptions require authentication and eliminate the need for polling REST endpoints.