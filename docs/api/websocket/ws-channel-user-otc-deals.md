# user.otc.deals

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-channel-user-otc-deals

CHANNEL 

## wss://stream.crypto.com/exchange/v1/user

user.otc.dealsPrivate

OTC deal updates for RFQ takers. Subscribe with channels \["user.otc.deals"\]. Provides deal status updates (ACCEPTED, CONFIRMED, SETTLED, REJECTED).

## Request

### Body

**required**

**id** integerrequired

Request id

**method** stringrequired

**Possible values:** \[`subscribe`\]

**params** objectrequired

**channels** string\[\]required

e.g. \["user.otc.deals"\]

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
    

**deal\_id** string

System generated unique ID for the deal

**cl\_deal\_id** string

Client provided ID for the deal request

**quote\_id** string

System generated unique ID for the quote

**quote\_req\_id** string

System generated unique ID for the quote request

**deal\_type** string

Deal type

**deal\_status** string

**Possible values:** \[`ACCEPTED`, `CONFIRMED`, `SETTLED`, `REJECTED`\]

ACCEPTED: system received deal; CONFIRMED: liquidity provider has executed deal; SETTLED: deal settled and funds transferred; REJECTED: deal rejected

**reason** string

NO\_ERROR or error reason

**update\_time\_ns** string

Unix epoch time when deal last updated in nanosecond

**leg\_list** object\[\]

*   Array \[
    

**instrument\_name** stringrequired

Instrument symbol (e.g., BTC\_USD)

**price** decimalrequired

Echoed back from quote

**quantity** decimal

Echoed back from quote request if requested quantity

**notional** decimal

Echoed back from quote request if requested notional

**executed\_quantity** decimal

Executed quantity

**executed\_notional** decimal

Executed notional

**side** stringrequired

**Possible values:** \[`BUY`, `SELL`\]

Echoed back from deal

**type** string

**Possible values:** \[`PRICE`\]

e.g. PRICE

*   \]
    

*   \]