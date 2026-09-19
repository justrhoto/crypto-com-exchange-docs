# OrderCancelReject (35=9)

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/fix/fix-order-cancel-reject

The Order Cancel Reject (9) message is issued by the broker upon receipt of a cancel request or cancel/replace request message which cannot be honored. Requests to change price or decrease quantity are executed only when an outstanding quantity exists. Filled orders cannot be changed (i.e quantity reduced or price change. However, the broker/sellside may support increasing the order quantity on a currently filled order).

When rejecting a Cancel/Replace Request (or Cancel Request), the Cancel Reject (9) message should provide the ClOrdID (11) which was specified on the Cancel/Replace Request (or Cancel Request) message for identification, and the OrigClOrdId should be that of the last accepted order (except in the case of CxlRejReason (102) = "Unknown Order".

Cancel reject received

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

**OrderID** Tag 37 (string)required

Newly created order ID

**ClOrdID** Tag 11 (string)

Unique identifier for Order as assigned by the buy-side. Uniqueness must be guaranteed across trading sessions.

**OrigClOrdID** Tag 41 (string)

Original Unique identifier for Order as assigned by the buy-side. Uniqueness must be guaranteed across trading sessions.

**OrdStatus** Tag 39 (string)required

**Possible values:** \[`0`, `1`, `2`, `4`, `6`, `8`, `A`\]

OrdStatus value after this cancel reject is applied.

**CxlRejResponseTo** Tag 434 (string)required

**Possible values:** \[`1`, `2`\]

1 = Order Cancel Request, 2 = Order Cancel/Replace Request

**CxlRejReason** Tag 102 (integer)

Cancel reject reason

**Text** Tag 58 (string)

**ExecRefID** Tag 19 (string)

For CDC internal reference only.

**StandardTrailer** objectrequired

Each FIX message is terminated by a Standard Trailer as a message delimiter as well as containing the checksum value.

**CheckSum** Tag 10 (string)required

Three bytes, simple checksum. Always last field in message