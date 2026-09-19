# user.transactions

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-channel-user-transactions

CHANNEL 

## wss://stream.crypto.com/exchange/v1/user

user.transactionsPrivate

Transaction updates for the user. Subscribe with channel \["user.transactions"\].

## Request

### Body

**required**

**id** integerrequired

Request id

**method** stringrequired

**Possible values:** \[`subscribe`\]

**params** objectrequired

**channels** string\[\]required

e.g. \["user.transactions"\]

**nonce** integerrequired

Current timestamp in milliseconds

WebSocket response

**Schema**

**id** int64

**method** string

**code** int32

**result** object

**subscription** string

**channel** string

**data** object\[\]

*   Array \[
    

**journal\_id** int64

Journal ID.

**instrument\_name** string

E.g. BTCUSD-PERP.

**transaction\_qty** decimal

Transaction quantity.

**transaction\_cost** decimal

Transaction cost.

**realized\_pnl** decimal

Realized PNL.

**journal\_type** WsJournalType (string)

**Possible values:** \[`TRADING`, `TRADE_FEE`, `ONCHAIN_WITHDRAWAL`, `ONCHAIN_DEPOSIT`, `FUNDING`, `REALIZED_PNL`, `INSURANCE_FUND`, `SOCIALIZED_LOSS`, `LIQUIDATION_FEE`, `SESSION_RESET`, `ADJUSTMENT`, `SESSION_SETTLE`, `UNCOVERED_LOSS`, `ADMIN_ADJUSTMENT`, `DELIST`, `SETTLEMENT_FEE`, `AUTO_CONVERSION`, `MANUAL_CONVERSION`, `SUBACCOUNT_TX`, `FIAT_WITHDRAWAL_CANCEL`, `MARGIN_TRADE_INTEREST`\]

Journal / transaction type

**account\_id** string

Account ID.

**event\_date** string

Event date.

**order\_id** int64

Order ID.

**trade\_id** int64

Trade ID.

**trade\_match\_id** int64

Trade match ID; applicable to trades only; non-trade transactions may have zero or null.

**event\_timestamp\_ms** int64

Event timestamp in milliseconds.

**event\_timestamp\_ns** int64

Event timestamp in nanoseconds.

**client\_oid** string

Client Order ID (can be empty).

**taker\_side** WsTakerSide (string)

**Possible values:** \[`MAKER`, `TAKER`\]

Maker or taker side of the trade

**side** WsOrderSide (string)

**Possible values:** \[`BUY`, `SELL`\]

BUY or SELL

**isolation\_id** string

Isolation ID of the order if under isolated position.

**isolation\_type** WsIsolationType (string)

**Possible values:** \[`ISOLATED_MARGIN`\]

Isolation type

*   \]