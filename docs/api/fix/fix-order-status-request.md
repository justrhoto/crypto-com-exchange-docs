# OrderStatusRequest (35=H)

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/fix/fix-order-status-request

Get details on a particular OPEN Orders only in Order Management Flow. Not available in Drop Copy Flow.

**Request Attributes:**

*   Symbol (55): Required
*   ClOrdID (11): Unique identifier for Order as assigned by the buy-side, either tag11 or tag37 must be specified
*   OrderID (37): OrderID of the order to request, either tag11 or tag37 must be specified

**Response Attributes:** An ExecutionReport (8) with ExecType=I (Order Status) will be returned.

*   MsgType (35) = 8
*   ExecType (150) = I
*   TotNumReports (911): Must be 0 to indicate there is no match, otherwise this tag will not be populated
*   LastRptRequested (912): Must be Y

**Order status request rejected for unknown order:**

*   MsgType (35) = 8
*   ExecType (150) = I
*   OrdStatus (39) = 8 Rejected
*   CumQty (14) = 0
*   LeavesQty (151) = 0
*   OrdRejReason (103): 5 = Unknown Order, 8 = Stale Order, 13 = Incorrect quantity, 99 = Other

See ExecutionReport for details.

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

**Symbol** Tag 55 (string)required

**ClOrdID** Tag 11 (string)

Unique identifier for Order as assigned by the buy-side, either tag11 or tag37 must be specified.

**OrderID** Tag 37 (string)

OrderID of the order to request. either tag11 or tag37 must be specified.

**StandardTrailer** objectrequired

Each FIX message is terminated by a Standard Trailer as a message delimiter as well as containing the checksum value.

**CheckSum** Tag 10 (string)required

Three bytes, simple checksum. Always last field in message

Order status

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

Client-selected order ID.

**OrigClOrdID** Tag 41 (string)

ClOrdID of the previous non-rejected order. i.e. Response from OrderCancelReplaceRequest(35=G) or OrderCancelRequest(35=F).

**ExecInst** Tag 18 (string)

**Possible values:** \[`6`, `8`\]

Instructions for order handling on exchange. If more than one instruction is applicable to an order, this field can contain multiple instructions separated by space.

**ExecRefID** Tag 19 (string)

For CDC internal reference only

**OrderID** Tag 37 (string)required

Server-assigned order ID

**ExecID** Tag 17 (string)required

unique execution ID. Equal to Fill ID if this message was the result of a fill

**Symbol** Tag 55 (string)required

Symbol name

**Side** Tag 54 (string)required

**Possible values:** \[`1`, `2`\]

"1": buy; "2": sell

**OrderQty** Tag 38 (number)required

Original order quantity

**Price** Tag 44 (number)

Original order price

**ExecType** Tag 150 (string)required

**Possible values:** \[`0`, `4`, `6`, `8`, `A`, `F`, `I`\]

Reason for this message (see below)

**OrdStatus** Tag 39 (string)required

**Possible values:** \[`0`, `1`, `2`, `4`, `6`, `8`, `A`\]

Order status (Please refer to standard FIX spec)

**CumQty** Tag 14 (number)required

Quantity of order that has already been filled

**LeavesQty** Tag 151 (number)required

Quantity of order that is still open

**WorkingIndicator** Tag 636 (string)

**Possible values:** \[`Y`, `N`\]

Indicates if the order is currently being worked.

**TransactTime** Tag 60 (date-time)

Time of the order update. Only present on order updates. It is stamped in response flow \[no matter there were trades or not\]; our system stamp this time when there are updates for an order (so it is called update\_time on Web Socket)

**OrderCreateTime** Tag 6616 (date-time)

TransactTime when order is created with 39=0|150=0. it is stamped in request flow; when our system confirmed and accepted the order (i.e. it is called create\_time on Web Socket)

**LastPx** Tag 31 (number)

Fill price. Only present if this message was the result of a fill

**LastQty** Tag 32 (number)

Fill quantity. Only present if this message was the result of a fill

**LastLiquidityInd** Tag 851 (integer)

"2": taker fill; "1": maker fill. Only present if this message was the result of a fill

**AvgPx** Tag 6 (number)

Average fill price for all fills in order. Only present if this message was the result of a fill

**Commission** Tag 12 (number)

Fee for trade. Only present if this message was the result of a fill

**CommissionCurrency** Tag 2643 (string)

Fee currency for trade. Only present if this message was the result of a fill

**CommType** Tag 13 (string)

**Possible values:** \[`3`\]

Always 3 (absolute)

**OrdRejReason** Tag 103 (integer)

Reason the order was rejected (see below). Only present on rejected NewOrderSingle (D) requests. i.e. 1 = Unkown symbol, 5 = Unknown Order, 99 = Other

**Text** Tag 58 (string)

Description of the reason the order was rejected (e.g., Too many requests). Only present on rejected NewOrderSingle (D) requests

**CashMargin** Tag 544 (string)

**Possible values:** \[`1`, `2`, `3`\]

`1`: messages corresponds to a spot order. `2`: messages corresponds to a margin order. `3`: messages correspond to liquidation.

**TrdMatchID** Tag 880 (string)

Trade match ID

**TradeTransactTime** Tag 10060 (date-time)

TransactTime when order is getting partial filled or fullly filled. It is stamped in response flow \[only when there has trade happened\]; i.e. the trade time / order matching time of when the trade happened (i.e. the time of this order being matched with another order) \[i.e. the transaction\_time in Web Socket\]

**MatchCount** Tag 20101 (integer)

Number of orders matched for this trade execution. If it is Maker's Order, value is always 1. If it is Taker's Order, it is the number of orders matched for this trade execution

**MatchIndex** Tag 20102 (integer)

Only appears if it is Maker's order. It represents which order entry of corresponding price level was matched. This value is 0 base. If the matched order is on the top of the queue, it is shown 0.

**StandardTrailer** objectrequired

Each FIX message is terminated by a Standard Trailer as a message delimiter as well as containing the checksum value.

**CheckSum** Tag 10 (string)required

Three bytes, simple checksum. Always last field in message