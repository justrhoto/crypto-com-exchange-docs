# SecurityDefinitionRequest (35=c)

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/fix/fix-security-definition-request

The FIX Client could request the details of a tradable instrument by sending a Security Definition Request (35=c) message to the gateway. The Symbol (55) is used as the unique identifier of an instrument.

**Response Attributes:** See SecurityDefinition for details.

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

**SecurityRequestType** Tag 321 (integer)required

Required for snapshot and/or subscribe. Valid values: 0 = Request Security identity and specifications (ie. Symbol tag55 is required)

**Symbol** Tag 55 (string)required

Required for snapshot and/or subscribe.

**SubscriptionRequestType** Tag 263 (string)required

**Possible values:** \[`0`, `1`, `2`\]

Valid values: 0 = Snapshot, 1 = Snapshot and subscribe this security definition changes, 2 = Unsubscribe

**StandardTrailer** objectrequired

Each FIX message is terminated by a Standard Trailer as a message delimiter as well as containing the checksum value.

**CheckSum** Tag 10 (string)required

Three bytes, simple checksum. Always last field in message

Security definition

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

The unique identifier of this request from 35=d

**SecurityResponseID** Tag 322 (string)required

Identifier for the Security Definition message

**SecurityResponseType** Tag 323 (integer)required

1 = Accept security proposal as is

**Symbol** Tag 55 (string)required

The fully qualified product symbol

**NoInstrAttrib** Tag 870 (integer)

**Possible values:** `>= 1`

Number of repeating InstrAttrib group entries.

**InstrAttribGrp** object

**InstrAttribType** Tag 871 (integer)

Code to represent the type of instrument attribute

**InstrAttribValue** Tag 872 (string)

Attribute value appropriate to the InstrAttribType (871) field.

**StandardTrailer** objectrequired

Each FIX message is terminated by a Standard Trailer as a message delimiter as well as containing the checksum value.

**CheckSum** Tag 10 (string)required

Three bytes, simple checksum. Always last field in message