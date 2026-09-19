# user.position_balance

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-channel-user-position-balance

CHANNEL 

## wss://stream.crypto.com/exchange/v1/user

user.position\_balancePrivate

Position and balance realtime updates. Subscribe with channels \["user.position\_balance"\].

## Request

### Body

**required**

**id** integerrequired

Request id

**method** stringrequired

**Possible values:** \[`subscribe`\]

**params** objectrequired

**channels** string\[\]required

e.g. \["user.position\_balance"\]

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
    

**balances** object\[\]

Collateral balances (slim: instrument\_name, quantity).

*   Array \[
    

**instrument\_name** string

Instrument name of the collateral e.g. USD

**quantity** decimal

Quantity of the collateral.

**update\_timestamp\_ms** int64

Update time (Unix timestamp). Optional.

*   \]
    

**positions** object\[\]

Position-level data; core fields only.

*   Array \[
    

**account\_id** string

Account ID.

**instrument\_name** string

E.g. BTCUSD-PERP.

**type** string

E.g. PERPETUAL\_SWAP.

**quantity** decimal

Position quantity.

**cost** string

Position cost or value in USD.

**open\_position\_pnl** string

Profit and loss for the open position.

**open\_pos\_cost** string

Open position cost.

**session\_pnl** string

Profit and loss in the current trading session.

**update\_timestamp\_ms** int64

Updated time (Unix timestamp).

**isolation\_id** string

Isolation ID of the isolated position.

**isolation\_type** WsIsolationType (string)

**Possible values:** \[`ISOLATED_MARGIN`\]

Isolation type

*   \]
    

**isolated\_positions** object\[\]

Isolated margin rows; each has isolation\_id, leverage, isolation\_type, balances, positions; no nested isolated\_positions.

*   Array \[
    

**isolation\_id** string

Isolation ID of isolated position.

**leverage** string

The maximum leverage of the isolated position.

**isolation\_type** WsIsolationType (string)

**Possible values:** \[`ISOLATED_MARGIN`\]

Isolation type

**balances** object\[\]

*   Array \[
    

**instrument\_name** string

Instrument name of the collateral e.g. USD

**quantity** decimal

Quantity of the collateral.

**update\_timestamp\_ms** int64

Update time (Unix timestamp). Optional.

*   \]
    

**positions** object\[\]

Position-level data; core fields only (same as UserPositionItemBase).

*   Array \[
    

**account\_id** string

Account ID.

**instrument\_name** string

E.g. BTCUSD-PERP.

**type** string

E.g. PERPETUAL\_SWAP.

**quantity** decimal

Position quantity.

**cost** string

Position cost or value in USD.

**open\_position\_pnl** string

Profit and loss for the open position.

**open\_pos\_cost** string

Open position cost.

**session\_pnl** string

Profit and loss in the current trading session.

**update\_timestamp\_ms** int64

Updated time (Unix timestamp).

**isolation\_id** string

Isolation ID of the isolated position.

**isolation\_type** WsIsolationType (string)

**Possible values:** \[`ISOLATED_MARGIN`\]

Isolation type

*   \]
    

*   \]
    

*   \]