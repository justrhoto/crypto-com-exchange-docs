# user.account_risk

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-channel-user-account-risk

CHANNEL 

## wss://stream.crypto.com/exchange/v1/user

user.account\_riskPrivate

Account risk snapshot on a regular basis. Subscribe with channels \["user.account\_risk"\].

## Request

### Body

**required**

**id** integerrequired

Request id

**method** stringrequired

**Possible values:** \[`subscribe`\]

**params** objectrequired

**channels** string\[\]required

e.g. \["user.account\_risk"\]

**nonce** integerrequired

Current timestamp in milliseconds

WebSocket response

**Schema**

**id** int64

**method** string

**code** int32

**result** object

**account\_id** string

**subscription** string

**channel** string

**data** object\[\]

*   Array \[
    

**instrument\_name** string

Instrument name of the balance e.g. USD

**total\_available\_balance** decimal

Balance that user can open new order (Margin Balance - Initial Margin)

**total\_margin\_balance** decimal

Positive cash balance on eligible collateral tokens + Negative balance on all tokens + Unrealised PnL - Fee reserves

**total\_initial\_margin** decimal

Total margin requirement to support positions and all open orders IM and haircut from risk asset holdings. Total sum of total\_position\_im + total\_haircut.

**total\_maintenance\_margin** decimal

Total maintenance margin requirement for all positions

**total\_position\_cost** decimal

Position value in USD

**total\_cash\_balance** decimal

Wallet Balance (Deposits - Withdrawals + Realized PnL - Fees)

**total\_collateral\_value** decimal

Collateral Value

**total\_session\_unrealized\_pnl** decimal

Current unrealized profit and loss from all open positions (calculated with Mark Price and Avg Price)

**total\_session\_realized\_pnl** decimal

Current realized profit and loss from all open positions

**is\_liquidating** boolean

Describes whether the account is under liquidation

**total\_effective\_leverage** decimal

The actual leverage used (all open positions combined), i.e. position size / margin balance.

**position\_limit** decimal

Maximum position size allowed (for all open positions combined)

**used\_position\_limit** decimal

Combined position size of all open positions + order exposure on all instruments

**total\_isolated\_cash\_balance** decimal

Sum of cash balance of the isolated positions

**total\_position\_im** decimal

Initial margin requirement to support open positions and orders

**total\_haircut** decimal

Total haircut on eligible collateral token assets

**total\_risk\_exposure** decimal

Total risk exposure. Optional.

**total\_borrow** decimal

Total borrow. Optional.

**margin\_score** decimal

Margin score. Optional.

**has\_risk** boolean

Whether the account has risk. Optional.

**terminatable** boolean

Whether the account is terminatable. Optional.

**credit\_limits** array

Credit limits; may be empty. Item shape TBD when non-empty. Optional.

**balances** object\[\]

Collateral balances (same structure as position\_balances; user.account\_risk uses this name).

*   Array \[
    

**instrument\_name** string

Instrument name of the collateral e.g. USD

**quantity** decimal

Quantity of the collateral

**market\_value** decimal

Market value of the collateral

**collateral\_eligible** boolean

true or false

**haircut** decimal

Show haircut for eligible collateral token

**collateral\_amount** decimal

Collateral amount after haircut is applied

**max\_withdrawal\_balance** decimal

Max withdrawal balance of the collateral

**reserved\_qty** decimal

Fund/balance in use, not available for new orders or additional trading activities.

**hourly\_interest\_rate** decimal

Hourly interest rate for the collateral; e.g. "0". Optional.

*   \]
    

**positions** object\[\]

Position-level data; same shape as WS user.positions.

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
    

**isolated\_positions** object\[\]

Isolated margin rows; each has isolation\_id, leverage, isolation\_type and no nested isolated\_positions.

*   Array \[
    

**instrument\_name** string

Instrument name of the balance e.g. USD

**total\_available\_balance** decimal

Balance that user can open new order (Margin Balance - Initial Margin)

**total\_margin\_balance** decimal

Positive cash balance on eligible collateral tokens + Negative balance on all tokens + Unrealised PnL - Fee reserves

**total\_initial\_margin** decimal

Total margin requirement to support positions and all open orders IM and haircut from risk asset holdings. Total sum of total\_position\_im + total\_haircut.

**total\_maintenance\_margin** decimal

Total maintenance margin requirement for all positions

**total\_position\_cost** decimal

Position value in USD

**total\_cash\_balance** decimal

Wallet Balance (Deposits - Withdrawals + Realized PnL - Fees)

**total\_collateral\_value** decimal

Collateral Value

**total\_session\_unrealized\_pnl** decimal

Current unrealized profit and loss from all open positions (calculated with Mark Price and Avg Price)

**total\_session\_realized\_pnl** decimal

Current realized profit and loss from all open positions

**is\_liquidating** boolean

Describes whether the account is under liquidation

**total\_effective\_leverage** decimal

The actual leverage used (all open positions combined), i.e. position size / margin balance.

**position\_limit** decimal

Maximum position size allowed (for all open positions combined)

**used\_position\_limit** decimal

Combined position size of all open positions + order exposure on all instruments

**total\_isolated\_cash\_balance** decimal

Sum of cash balance of the isolated positions

**total\_position\_im** decimal

Initial margin requirement to support open positions and orders

**total\_haircut** decimal

Total haircut on eligible collateral token assets

**total\_risk\_exposure** decimal

Total risk exposure. Optional.

**total\_borrow** decimal

Total borrow. Optional.

**margin\_score** decimal

Margin score. Optional.

**has\_risk** boolean

Whether the account has risk. Optional.

**terminatable** boolean

Whether the account is terminatable. Optional.

**credit\_limits** array

Credit limits; may be empty. Item shape TBD when non-empty. Optional.

**isolation\_id** string

Isolation ID of isolated position.

**leverage** decimal

The maximum leverage of the isolated position.

**isolation\_type** WsIsolationType (string)

**Possible values:** \[`ISOLATED_MARGIN`\]

Isolation type

**balances** object\[\]

Collateral balances (same structure as position\_balances).

*   Array \[
    

**instrument\_name** string

Instrument name of the collateral e.g. USD

**quantity** decimal

Quantity of the collateral

**market\_value** decimal

Market value of the collateral

**collateral\_eligible** boolean

true or false

**haircut** decimal

Show haircut for eligible collateral token

**collateral\_amount** decimal

Collateral amount after haircut is applied

**max\_withdrawal\_balance** decimal

Max withdrawal balance of the collateral

**reserved\_qty** decimal

Fund/balance in use, not available for new orders or additional trading activities.

**hourly\_interest\_rate** decimal

Hourly interest rate for the collateral; e.g. "0". Optional.

*   \]
    

**positions** object\[\]

Position-level data; same shape as WS user.positions; items may include isolation\_id, leverage, isolation\_type.

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
    

*   \]
    

*   \]