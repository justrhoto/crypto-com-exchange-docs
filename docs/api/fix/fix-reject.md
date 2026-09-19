# Reject (35=3)

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/fix/fix-reject

The Reject (3) message should be issued when a message is received but cannot be properly processed due to a session-level rule violation. An example of when a reject may be appropriate would be the receipt of a message with invalid basic data (e.g. MsgType (35) = &) which successfully passes de-encryption, CheckSum (10) and BodyLength (9) checks.

Generation and receipt of a Reject (3) message indicates a serious error that may be the result of faulty logic in either the sending or receiving application.

If the sending application chooses to retransmit the rejected message, it should be assigned a new sequence number.

Note: receiving a Reject (3) for a message does NOT imply that the message has not been processed. The reject simply indicates that the message was improperly formatted or contained invalid data.

Reject received

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

MsgSeqNum (34) of rejected message

**RefTagID** Tag 371 (integer)

The tag number of the FIX field being referenced

**RefMsgType** Tag 372 (string)

The MsgType (35) of the FIX message being referenced

**SessionRejectReason** Tag 373 (integer)

Code to identify reason for a session-level Reject (3) message.

0 = Invalid Tag Number

1 = Required Tag Missing

2 = Tag not defined for this message type

3 = Undefined Tag

4 = Tag specified without a value

5 = Value is incorrect (out of range) for this tag

6 = Incorrect data format for value

7 = Decryption problem

8 = Signature problem

9 = CompID problem

10 = SendingTime accuracy problem

11 = Invalid MsgType

12 = XML Validation error

13 = Tag appears more than once

14 = Tag specified out of required order

15 = Repeating group fields out of order

16 = Incorrect NumInGroup count for repeating group

17 = Non Data value includes field delimiter (SOH character)

99 = Other

**Text** Tag 58 (string)

Where possible, message to explain reason for rejection

**StandardTrailer** objectrequired

Each FIX message is terminated by a Standard Trailer as a message delimiter as well as containing the checksum value.

**CheckSum** Tag 10 (string)required

Three bytes, simple checksum. Always last field in message