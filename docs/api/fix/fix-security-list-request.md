# SecurityListRequest (35=x)

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/fix/fix-security-list-request

Security List is an aggregation of instrument definitions. It is useful when the FIX Client want get all instrument definitions, or expect to get numerous instrument definitions in one go. The FIX Client should send a Security List Request (35=x) message to the gateway.

**Response Attributes:** See SecurityList for details.

## Request

### Body

**required**

**StandardHeader** objectrequired

The header identifies the message type, length, destination, sequence number, origination point and time. Every FIX message begins with a Standard Header.

**BeginString** Tag 8 (string)required

Must be "FIX.4.4"

**BodyLength** Tag 9 (integer)required

Length of the message body in bytes

**MsgType** Tag 35 (string)required

Message Type

**MsgSeqNum** Tag 34 (integer)required

Integer message sequence number

**PossDupFlag** Tag 43 (boolean)

Indicates possible retransmission of message with this sequence number. If a message with this sequence number has been previously received, ignore message; if not, process normally.

**SenderCompID** Tag 49 (string)required

See FIX Endpoints for details

**TargetCompID** Tag 56 (string)required

See FIX Endpoints for details

**SendingTime** Tag 52 (date-time)required

Time when the message is being sent out from FIX Gateway

**PossResend** Tag 97 (boolean)

Indicates that message may contain information sent under another sequence number. Forward message to application and determine if previously received (i.e. verify order id and parameters).

**SecurityReqID** Tag 320 (string)required

The unique identifier of this request

**SecurityListRequestType** Tag 559 (integer)required

Required for snapshot and/or subscribe. Valid values: 0 = Symbol (tag55)

**SubscriptionRequestType** Tag 263 (string)required

**Possible values:** \[`0`, `1`, `2`\]

Valid values: 0 = Snapshot, 1 = Snapshot and subscribe the security list changes, 2 = Unsubscribe

**StandardTrailer** objectrequired

Each FIX message is terminated by a Standard Trailer as a message delimiter as well as containing the checksum value.

**CheckSum** Tag 10 (string)required

Three bytes, simple checksum. Always last field in message

Security list

**Schema**

**StandardHeader** objectrequired

The header identifies the message type, length, destination, sequence number, origination point and time. Every FIX message begins with a Standard Header.

**BeginString** Tag 8 (string)required

Must be "FIX.4.4"

**BodyLength** Tag 9 (integer)required

Length of the message body in bytes

**MsgType** Tag 35 (string)required

Message Type

**MsgSeqNum** Tag 34 (integer)required

Integer message sequence number

**PossDupFlag** Tag 43 (boolean)

Indicates possible retransmission of message with this sequence number. If a message with this sequence number has been previously received, ignore message; if not, process normally.

**SenderCompID** Tag 49 (string)required

See FIX Endpoints for details

**TargetCompID** Tag 56 (string)required

See FIX Endpoints for details

**SendingTime** Tag 52 (date-time)required

Time when the message is being sent out from FIX Gateway

**PossResend** Tag 97 (boolean)

Indicates that message may contain information sent under another sequence number. Forward message to application and determine if previously received (i.e. verify order id and parameters).

**SecurityReqID** Tag 320 (string)required

The unique identifier of Security List. i.e. From (35=x) request message

**SecurityResponseID** Tag 322 (string)required

Identifier for the Security List response message

**SecurityRequestResult** Tag 560 (integer)required

Valid values: 0 = Valid, 2 = Not found, 3 = Not authorised, 4 = Unavailable

**LastFragment** Tag 893 (string)required

**Possible values:** \[`Y`, `N`\]

Y = Last message in a sequence of messages. N = Not last message in a sequence of messages

**NoRelatedSym** Tag 146 (integer)required

**Possible values:** `>= 1`

Specifies the number of repeating symbols (instruments) specified

**SecListGrp** objectrequired

**Symbol** Tag 55 (string)required

Ticker symbol

**NoInstrAttrib** Tag 870 (integer)

**Possible values:** `>= 1`

Number of repeating InstrAttribType entries.

**InstrAttribGrp** object\[\]

*   Array \[
    

**InstrAttribType** Tag 871 (integer)

Code to represent the type of instrument attribute

**InstrAttribValue** Tag 872 (string)

Attribute value appropriate to the InstrAttribType (871) field.

*   \]
    

**StandardTrailer** objectrequired

Each FIX message is terminated by a Standard Trailer as a message delimiter as well as containing the checksum value.

**CheckSum** Tag 10 (string)required

Three bytes, simple checksum. Always last field in message