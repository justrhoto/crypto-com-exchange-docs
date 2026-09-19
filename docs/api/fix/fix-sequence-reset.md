# SequenceReset (35=4)

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/fix/fix-sequence-reset

The Sequence Reset message has two modes: Gap Fill mode and Reset mode.

**Gap Fill mode**

Gap Fill mode is used in response to a Resend Request (2) when one or more messages must be skipped over for the following reasons:

*   During normal resend processing, the sending application may choose not to send a message (e.g. an aged order).
*   During normal resend processing, a number of administrative messages are skipped and not resent (such as Heart Beats, Test Requests).

Gap Fill mode is indicated by GapFillFlag (123) field = "Y".

If the GapFillFlag (123) field is present (and equal to "Y"), the MsgSeqNum (34) should conform to standard message sequencing rules (i.e. the MsgSeqNum (34) of the Sequence Reset (4) GapFill mode message should represent the beginning MsgSeqNum (34) in the GapFill range because the remote side is expecting that next message sequence number).

**Reset mode**

Reset mode involves specifying an arbitrarily higher new sequence number to be expected by the receiver of the Sequence Reset (4)-Reset mode message, and is used to reestablish a FIX session after an unrecoverable application failure.

Reset mode is indicated by the GapFillFlag (123) field = "N" or if the field is omitted.

If the GapFillFlag (123) field is not present (or set to N), it can be assumed that the purpose of the Sequence Reset (4) message is to recover from an out-of-sequence condition. Sequence Reset (4) - Reset should NOT be used as a normal response to a Resend Request (2) (use Sequence Reset (4) - Gap Fill mode). The Sequence Reset (4) - Reset should ONLY be used to recover from a disaster situation which cannot be recovered via the use of Sequence Reset (4) - Gap Fill.

**Rules for processing all Sequence Reset messages:**

*   The sending application will initiate the Sequence Reset (4). The message specifies NewSeqNo (36) to reset to as the value of the next sequence number immediately following the messages being skipped.
*   The Sequence Reset (4) can only increase the sequence number.
*   If a sequence reset is received attempting to decrease the next expected sequence number the message should be rejected and treated as a serious error.
*   One must be careful to ignore the duplicate Sequence Reset (4)-GapFill mode which is attempting to lower the next expected sequence number.

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

Sequence reset acknowledged