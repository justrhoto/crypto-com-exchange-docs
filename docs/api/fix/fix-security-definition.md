# SecurityDefinition (35=d)

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/fix/fix-security-definition

After received (35=c), gateway will acknowledge and send a Security Definition (35=d) message to the client. The subscribed clients will be sent a Security Definition (35=d) message for each new instrument. Client will receive multiple Security Definition (35=d) when receiving (35=c,321=3)

Security definition received

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