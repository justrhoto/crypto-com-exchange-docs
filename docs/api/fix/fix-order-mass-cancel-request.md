# OrderMassCancelRequest (35=q)

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/fix/fix-order-mass-cancel-request

Cancels all orders for a particular instrument/pair (asynchronous).

This call is asynchronous, so the response as OrderMassCancelReport is simply an acceptance of the request, but not necessarily mean it is confirmed into order book.

The drop copy subscription can be used to check when the order is successfully cancelled with ExecutionReport or rejected with OrderCancelReject message.

From the drop copy, for each respective order, Execution Report (8) with ExecType=6 (Pending Cancel) and/or ExecType=4 (Cancelled) for acceptance and confirmation of the cancel request respectively. Besides, OrderCancelReject (9) can be returned if cancel reject happens.

**Response Attributes:** See OrderMassCancelReport for details.

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

**ClOrdID** Tag 11 (string)required

Unique ID of Order Mass Cancel Request (q) as assigned by the client.

**MassCancelRequestType** Tag 530 (integer)required

Specifies the type of cancellation requested. Supported values: 1: Cancel by Symbol

**Symbol** Tag 55 (string)

The symbol for which to cancel all orders. Required when MassCancelRequestType=1

**StandardTrailer** objectrequired

Each FIX message is terminated by a Standard Trailer as a message delimiter as well as containing the checksum value.

**CheckSum** Tag 10 (string)required

Three bytes, simple checksum. Always last field in message

Mass cancel report

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