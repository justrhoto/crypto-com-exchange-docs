# Heartbeat (35=0)

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/fix/fix-heartbeat

The Heartbeat (0) monitors the status of the communication link and identifies when the last of a string of messages was not received.

*   When either end of a FIX connection has not sent any data for HeartBtInt (108) seconds, it will transmit a Heartbeat (0) message.
*   When either end of the connection has not received any data for (HeartBtInt (108) + "some reasonable transmission time") seconds, it will transmit a Test Request (1) message.
*   If there is still no Heartbeat (0) message received after (HeartBtInt (108) + "some reasonable transmission time") seconds then the connection should be considered lost and corrective action be initiated.
*   If HeartBtInt (108) is set to zero then no regular heartbeat messages will be generated. Note that a test request message can still be sent independent of the value of the HeartBtInt (108), which will force a Heartbeat (0) message.
*   Heartbeats issued as the result of Test Request (1) must contain the TestReqID (112) transmitted in the Test Request (1) message. This is useful to verify that the Heartbeat (0) is the result of the Test Request (1) and not as the result of a regular timeout.

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

**TestReqID** Tag 112 (string)

Identifier included in Test Request (1) message to be returned in resulting Heartbeat (0)

**StandardTrailer** objectrequired

Each FIX message is terminated by a Standard Trailer as a message delimiter as well as containing the checksum value.

**CheckSum** Tag 10 (string)required

Three bytes, simple checksum. Always last field in message

Heartbeat acknowledged

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

**TestReqID** Tag 112 (string)

Identifier included in Test Request (1) message to be returned in resulting Heartbeat (0)

**StandardTrailer** objectrequired

Each FIX message is terminated by a Standard Trailer as a message delimiter as well as containing the checksum value.

**CheckSum** Tag 10 (string)required

Three bytes, simple checksum. Always last field in message