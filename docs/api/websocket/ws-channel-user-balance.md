# user.balance

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-channel-user-balance

CHANNEL 

## wss://stream.crypto.com/exchange/v1/user

user.balancePrivate

Balance updates. Subscribe with channels \["user.balance"\].

## Request

### Body

**required**

**id** integerrequired

Request id

**method** stringrequired

**Possible values:** \[`subscribe`\]

**params** objectrequired

**channels** string\[\]required

e.g. \["user.balance"\]

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

**position\_balances** object\[\]

Collateral balances as shown below.

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
    

**isolated\_positions** object\[\]

Balance of isolated positions (IsolatedPositionItem; own schema, no recursion). Optional; present in user-balance and get-subaccount-balances.

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

**position\_balances** object\[\]

Collateral balances as shown below.

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
    

**isolation\_id** string

Isolation ID of isolated position.

**leverage** decimal

The maximum leverage of the isolated position.

**isolation\_type** WsIsolationType (string)

**Possible values:** \[`ISOLATED_MARGIN`\]

Isolation type

*   \]
    

**account** string

Optional; sub-account ID in get-subaccount-balances.

*   \]