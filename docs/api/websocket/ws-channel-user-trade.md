# user.trade

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-channel-user-trade

CHANNEL 

## wss://stream.crypto.com/exchange/v1/user

user.tradePrivate

Trade updates for the user. Subscribe with channel \["user.trade"\].

## Request

### Body

**required**

**id** integerrequired

Request id

**method** stringrequired

**Possible values:** \[`subscribe`\]

**params** objectrequired

**channels** string\[\]required

e.g. \["user.trade"\]

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

**event\_date** string

Event date.

**journal\_type** string

Journal type would be TRADING.

**traded\_quantity** decimal

Trade quantity.

**traded\_price** decimal

Trade price.

**fees** decimal

Net trade fees (after fee credits applied, if any). The negative sign means a deduction on balance.

**fee\_credits** decimal

Fee credits used to offset the trade fees. The negative sign means fee credits were consumed.

**order\_id** int64

Order ID.

**trade\_id** int64

Trade ID.

**trade\_match\_id** int64

Trade match ID.

**client\_oid** string

Client Order ID.

**taker\_side** WsTakerSide (string)

**Possible values:** \[`MAKER`, `TAKER`\]

Maker or taker side of the trade

**side** WsOrderSide (string)

**Possible values:** \[`BUY`, `SELL`\]

BUY or SELL

**instrument\_name** string

E.g. BTCUSD-PERP.

**fee\_instrument\_name** string

E.g. USD.

**create\_time** int64

Create timestamp in milliseconds.

**create\_time\_ns** int64

Create timestamp in nanoseconds.

**match\_count** int32

Optional. Number of orders matched; Maker's order always 1; Taker's is the number of orders matched.

**match\_index** int32

Optional. Only for Maker's order; which order entry of the price level was matched; 0-based.

**isolation\_id** string

Isolation ID of the order if under isolated position.

**isolation\_type** WsIsolationType (string)

**Possible values:** \[`ISOLATED_MARGIN`\]

Isolation type

**transaction\_time** int64

Trade transaction time in nanoseconds.

*   \]