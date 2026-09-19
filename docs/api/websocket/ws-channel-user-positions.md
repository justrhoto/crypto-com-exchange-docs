# user.positions

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-channel-user-positions

CHANNEL 

## wss://stream.crypto.com/exchange/v1/user

user.positionsPrivate

Position updates. Subscribe with channels \["user.positions"\].

## Request

### Body

**required**

**id** integerrequired

Request id

**method** stringrequired

**Possible values:** \[`subscribe`\]

**params** objectrequired

**channels** string\[\]required

e.g. \["user.positions"\]

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

**session\_unrealized\_pnl** string

Session unrealized PnL.

**pos\_initial\_margin** string

Position initial margin.

**pos\_maintenance\_margin** string

Derived as pos\_initial\_margin × MM ratio; not reported directly by the risk engine.

**market\_value** string

Market value.

**mark\_price** decimal

Mark price.

**target\_leverage** decimal

Target leverage.

**leverage** decimal

Leverage.

**liquidation\_price** decimal

Liquidation price.

**isolated\_margin\_balance** decimal

Isolated margin balance.

**effective\_leverage** decimal

Effective leverage; present in user.account\_risk and some WS responses. Optional.

*   \]