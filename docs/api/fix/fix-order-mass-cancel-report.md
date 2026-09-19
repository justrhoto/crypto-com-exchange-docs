# OrderMassCancelReport (35=r)

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/fix/fix-order-mass-cancel-report

The Order Mass Cancel Report is used to acknowledge an Order Mass Cancel Request. Note that each affected order that is canceled is acknowledged with a separate Execution Report (8) or Order Cancel Reject (9) message.

Mass cancel report received

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

**ClOrdID** Tag 11 (string)required

Echoed back from the OrderMassCancelRequest

**ExecRefID** Tag 19 (string)

For CDC internal reference only

**MassCancelRequestType** Tag 530 (integer)required

Echoed back from the OrderMassCancelRequest

**MassCancelResponse** Tag 531 (integer)

If successful, echoes the MassCancelRequestType.

**MassCancelRejectReason** Tag 532 (integer)

Reason why cancel request has failed. 1: Unknown Symbol, 5: Unknown SecurityType

**StandardTrailer** objectrequired

Each FIX message is terminated by a Standard Trailer as a message delimiter as well as containing the checksum value.

**CheckSum** Tag 10 (string)required

Three bytes, simple checksum. Always last field in message