# BusinessMessageReject (35=j)

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/fix/fix-business-message-reject

The Business Message Reject message can reject an application-level message which fulfills session-level rules and cannot be rejected via any other means.

Business message reject received

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

**RefSeqNum** Tag 45 (integer)required

**Possible values:** `>= 1`

MsgSeqNum of rejected message

**RefMsgType** Tag 372 (string)required

The MsgType of the FIX message being referenced.

**BusinessRejectRefID** Tag 379 (string)

The value of the business-level 'ID' field on the message being referenced.

**BusinessRejectReason** Tag 380 (integer)required

Code to identify reason for a Business Message Reject message. 0 = Other, 1 = Unknown ID, 2 = Unknown Security, 3 = Unsupported Message Type, 4 = Application not available, 5 = Conditionally Required Field Missing, 6 = Not authorized, 7 = DeliverTo firm not available at this time

**Text** Tag 58 (string)

Business Message Reject reason

**ExecRefID** Tag 19 (string)

For CDC internal reference only

**StandardTrailer** objectrequired

Each FIX message is terminated by a Standard Trailer as a message delimiter as well as containing the checksum value.

**CheckSum** Tag 10 (string)required

Three bytes, simple checksum. Always last field in message