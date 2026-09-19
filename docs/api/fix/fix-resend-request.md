# ResendRequest (35=2)

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/fix/fix-resend-request

The resend request is sent by the receiving application to initiate the retransmission of messages. This function is utilized if a sequence number gap is detected, if the receiving application lost a message, or as a function of the initialization process.

The resend request can be used to request a single message, a range of messages or all messages subsequent to a particular message.

Note: the sending application may wish to consider the message type when resending messages; e.g. if a new order is in the resend series and a significant time period has elapsed since its original inception, the sender may not wish to retransmit the order given the potential for changed market conditions. (The Sequence Reset-GapFill (4) message is used to skip messages that a sender does not wish to resend.)

Note: it is imperative that the receiving application process messages in sequence order, e.g. if message number 7 is missed and 8-9 received, the application should ignore 8 and 9 and ask for a resend of 7-9, or, preferably, 7-0 (0 represents infinity). This latter approach is strongly recommended to recover from out of sequence conditions as it allows for faster recovery in the presence of certain race conditions when both sides are simultaneously attempting to recover a gap.

Request types:

*   To request a single message: BeginSeqNo (7) = EndSeqNo (16)
*   To request a range of messages: BeginSeqNo (7) = first message of range, EndSeqNo (16) = last message of range
*   To request all messages subsequent to a particular message: BeginSeqNo (7) = first message of range, EndSeqNo (16) = 0 (represents infinity)

FIX Sequence Number Resent scenarios: Case 1: After logon request (35=A), CDC found that there are missing sequence number and requires retransmission of messages from client. ResendRequest (35=2) sent by CDC. Case 2: After logon request (35=A), client found that there are missing sequence number and requires retransmission of messages from CDC. ResendRequest (35=2) sent by client. Case 3: ResendRequest (35=2) sent by client and CDC after Logon (35=A) acknowledgement.

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

**BeginSeqNo** Tag 7 (integer)required

**Possible values:** `>= 1`

First sequence number in the range to be resent. Please refer FIX Sequence Number Resent scenario for more details

**EndSeqNo** Tag 16 (integer)required

**Possible values:** `>= 1`

Last sequence number in the range to be resent. For single message resend requests, set BeginSeqNo = EndSeqNo. If request is for all messages subsequent to a particular message, EndSeqNo = 0.

**StandardTrailer** objectrequired

Each FIX message is terminated by a Standard Trailer as a message delimiter as well as containing the checksum value.

**CheckSum** Tag 10 (string)required

Three bytes, simple checksum. Always last field in message

Resend initiated

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

**GapFillFlag** Tag 123 (string)

**Possible values:** \[`Y`, `N`\]

Indicates that the Sequence Reset message is replacing administrative or application messages which will not be resent. Y = Gap Fill Message, Msg Seq Num Field Valid. N = Sequence Reset, Ignore Msg Seq Num

**NewSeqNo** Tag 36 (integer)required

**Possible values:** `>= 1`

New sequence number

**StandardTrailer** objectrequired

Each FIX message is terminated by a Standard Trailer as a message delimiter as well as containing the checksum value.

**CheckSum** Tag 10 (string)required

Three bytes, simple checksum. Always last field in message