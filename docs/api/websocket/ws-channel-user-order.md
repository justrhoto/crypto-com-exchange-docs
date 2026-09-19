# user.order

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-channel-user-order

CHANNEL 

## wss://stream.crypto.com/exchange/v1/user

user.orderPrivate

Order updates for the user. Subscribe with channel \["user.order"\]. Initial response with same id contains current open orders; subsequent messages (id -1) are live updates.

## Request

### Body

**required**

**id** integerrequired

Request id

**method** stringrequired

**Possible values:** \[`subscribe`\]

**params** objectrequired

**channels** string\[\]required

e.g. \["user.order"\]

**nonce** integerrequired

Current timestamp in milliseconds

WebSocket response

**Schema**

**id** int64

**method** string

**code** int32

**result** object

**instrument\_name** string

**subscription** string

**channel** string

**data** object\[\]

*   Array \[
    

**account\_id** string

Account ID.

**order\_id** int64

Order ID.

**client\_oid** string

Client Order ID.

**order\_type** WsOrderType (string)

**Possible values:** \[`LIMIT`, `MARKET`, `STOP_LOSS`, `STOP_LIMIT`, `TAKE_PROFIT`, `TAKE_PROFIT_LIMIT`\]

Order type:

*   ➖ LIMIT, MARKET
*   ➖ STOP\_LOSS, STOP\_LIMIT, TAKE\_PROFIT, TAKE\_PROFIT\_LIMIT: Trigger orders

**time\_in\_force** WsTimeInForce (string)

**Possible values:** \[`GOOD_TILL_CANCEL`, `IMMEDIATE_OR_CANCEL`, `FILL_OR_KILL`\]

Time in force

**side** WsOrderSide (string)

**Possible values:** \[`BUY`, `SELL`\]

BUY or SELL

**exec\_inst** WsExecInstOrderDetail (string)\[\]

**Possible values:** \[`POST_ONLY`, `REDUCE_ONLY`, `SMART_POST_ONLY`, `LIQUIDATION`, `ISOLATED_MARGIN`, `MARGIN_ORDER`\]

Execution instructions.

**quantity** decimal

Quantity specified in the order.

**limit\_price** decimal

Limit price specified in the order.

**order\_value** decimal

Order value.

**maker\_fee\_rate** decimal

User's maker fee rate.

**taker\_fee\_rate** decimal

User's taker fee rate.

**avg\_price** decimal

Average price.

**cumulative\_quantity** decimal

Cumulative executed quantity.

**cumulative\_value** decimal

Cumulative executed value.

**cumulative\_fee** decimal

Cumulative executed fee.

**status** WsOrderStatus (string)

**Possible values:** \[`PENDING`, `NEW`, `ACTIVE`, `FILLED`, `CANCELED`, `REJECTED`, `EXPIRED`\]

Order status

**update\_user\_id** string

Updated user.

**order\_date** string

Order creation date.

**instrument\_name** string

E.g. BTCUSD-PERP.

**fee\_instrument\_name** string

Currency used for the fees.

**create\_time** int64

Order creation timestamp (ms), e.g. "1771761038000".

**create\_time\_ns** int64

Order creation timestamp (nanosecond), e.g. "1771761038000000000".

**update\_time** int64

Order update timestamp (ms), e.g. "1771761038000".

**reason** string

Rejection reason code; present for get-order-detail and get-order-history.

**isolation\_id** string

isolation\_id of the isolated position the order is tied to (derivatives only).

**isolation\_type** string

**Possible values:** \[`ISOLATED_MARGIN`\]

ISOLATED\_MARGIN when isolation\_id > 0 (derivatives only).

**list\_id** int64

OTO/OTOCO/OCO list id; advanced only.

**contingency\_type** WsContingencyType (string)

**Possible values:** \[`OCO`, `OTO`, `OTOCO`, `SPOT_ATTACH`, `DERIV_ATTACH`\]

Contingency type for advanced orders:

*   ➖ OCO: One-Cancels-the-Other
*   ➖ OTO: One-Triggers-the-Other
*   ➖ OTOCO: One-Triggers-a-One-Cancels-the-Other
*   ➖ SPOT\_ATTACH: SpotAttach (TP/SL attached to order for spot instruments)
*   ➖ DERIV\_ATTACH: DerivAttach (TP/SL attached to order or position for derivative instruments)

**leg\_id** string

Leg id within OTO/OTOCO/OCO; advanced only.

**ref\_price** decimal

Trigger reference price (trigger legs only).

**ref\_price\_type** string

**Possible values:** \[`MARK_PRICE`, `INDEX_PRICE`, `LAST_PRICE`\]

Price source used for ref\_price: MARK\_PRICE, INDEX\_PRICE, or LAST\_PRICE (trigger legs only).

**attach\_order\_id** int64

The order ID this trigger is attached to (for SpotAttach / DerivAttach attach-to-order orders).

**attach\_isolation\_id** string

Position this trigger is attached to (DerivAttach attach-to-position): > 0 = isolation\_id of the isolated position; 0 = cross-margin position.

**exchange\_order\_id** string

Order ID assigned by the exchange (present once the leg has been accepted).

**reject\_reason** string

Rejection reason, if the leg was rejected.

**leverage** number

Leverage specified on the primary leg (derivatives only, when provided).

**isolated\_margin\_amount** decimal

Isolated margin amount specified on the primary leg (derivatives only, when provided).

*   \]