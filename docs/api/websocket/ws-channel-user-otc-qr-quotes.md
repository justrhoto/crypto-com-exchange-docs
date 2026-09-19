# user.otc_qr.quotes

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-channel-user-otc-qr-quotes

CHANNEL 

## wss://stream.crypto.com/exchange/v1/user

user.otc\_qr.quotesPrivate

OTC quote updates for RFQ takers. Subscribe with channels \["user.otc\_qr.quotes"\]. Receives quotes with bid/ask prices in response to quote requests.

## Request

### Body

**required**

**id** integerrequired

Request id

**method** stringrequired

**Possible values:** \[`subscribe`\]

**params** objectrequired

**channels** string\[\]required

e.g. \["user.otc\_qr.quotes"\]

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
    

**quote\_id** string

System generated unique ID for the quote

**quote\_req\_id** string

System generated unique ID for the quote request

**cl\_quote\_req\_id** string

Client provided ID for the quote request

**status** string

ACTIVE

**reason** string

Reason if not successful otherwise NO\_ERROR

**response\_time\_ns** string

Unix epoch time when quote was generated in nanosecond

**expiry\_time\_ns** string

Unix epoch time when quote expires in nanosecond

**leg\_list** object\[\]

*   Array \[
    

**instrument\_name** string

Instrument for this leg, e.g. BTC\_USD

**quantity** decimal

Either quantity or notional

**notional** decimal

Either quantity or notional

**bid** decimal

The bid price for the instrument

**ask** decimal

The ask price for the instrument

**type** string

**Possible values:** \[`PRICE`\]

PRICE. Only present when the quote has pricing (i.e. bid / ask).

*   \]
    

*   \]