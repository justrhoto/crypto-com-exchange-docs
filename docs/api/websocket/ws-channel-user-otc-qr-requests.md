# user.otc_qr.requests

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-channel-user-otc-qr-requests

CHANNEL 

## wss://stream.crypto.com/exchange/v1/user

user.otc\_qr.requestsPrivate

OTC quote request status updates for RFQ takers. Subscribe with channels \["user.otc\_qr.requests"\]. Provides quote\_req\_id after request-quote, then status updates (ACTIVE, REJECTED, COMPLETED).

## Request

### Body

**required**

**id** integerrequired

Request id

**method** stringrequired

**Possible values:** \[`subscribe`\]

**params** objectrequired

**channels** string\[\]required

e.g. \["user.otc\_qr.requests"\]

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
    

**quote\_req\_id** string

System generated unique ID for the quote request

**cl\_quote\_req\_id** string

Client provided ID for the quote request

**status** string

**Possible values:** \[`ACTIVE`, `REJECTED`, `COMPLETED`\]

ACTIVE: user may receive a quote; REJECTED: rejected due to various reasons; COMPLETED: quote request duration has expired

**reason** string

Reason if REJECTED

*   \]