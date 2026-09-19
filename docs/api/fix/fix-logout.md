# Logout (35=5)

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/fix/fix-logout

The Logout (35=5) message initiates or confirms the termination of a FIX session. Disconnection without the exchange of Logout (35=5) messages should be interpreted as an abnormal condition.

Before actually closing the session, the logout initiator should wait for the opposite side to respond with a confirming Logout (35=5) message. This gives the remote end a chance to perform any Gap Fill operations that may be necessary. The session may be terminated if the remote side does not respond in an appropriate timeframe.

After sending the Logout (35=5) message, the logout initiator should not send any messages unless requested to do so by the logout acceptor via a ResendRequest (35=2).

SessionStatus values:

*   0 = session active
*   4 = Session logout complete
*   5 = Invalid username or password
*   6 = Account locked
*   7 = Logons are not allowed at this time

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

**Text** Tag 58 (string)

Status of the FIX session. Not sent for scheduled server initiated log outs. 0 = session active

**SessionStatus** Tag 1409 (integer)

4 = Session logout complete, 5 = Invalid username or password, 6 = Account locked, 7 = Logons are not allowed at this time

**StandardTrailer** objectrequired

Each FIX message is terminated by a Standard Trailer as a message delimiter as well as containing the checksum value.

**CheckSum** Tag 10 (string)required

Three bytes, simple checksum. Always last field in message

Logout acknowledged

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

**Text** Tag 58 (string)

Status of the FIX session. Not sent for scheduled server initiated log outs. 0 = session active

**SessionStatus** Tag 1409 (integer)

4 = Session logout complete, 5 = Invalid username or password, 6 = Account locked, 7 = Logons are not allowed at this time

**StandardTrailer** objectrequired

Each FIX message is terminated by a Standard Trailer as a message delimiter as well as containing the checksum value.

**CheckSum** Tag 10 (string)required

Three bytes, simple checksum. Always last field in message