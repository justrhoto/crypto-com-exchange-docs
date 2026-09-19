# NewOrderSingle (35=D)

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/fix/fix-new-order-single

Creates a new BUY or SELL order on the Exchange.

This call is asynchronous, so the response with Pending New is simply an acceptance of the request, but not necessarily mean it is confirmed into order book.

The drop copy subscription can be used to check when the order is successfully created.

See FIX Spot Order Life Cycle and ExecutionReport for details.

**Mandatory parameters based on OrdType:**

| OrdType   | Side    | Additional Mandatory Parameters              |
| :-------- | :------ | :------------------------------------------- |
| 1: MARKET | 1: BUY  | CashOrderQty or OrderQty, mutually exclusive |
| 1: MARKET | 2: SELL | OrderQty                                     |
| 2: LIMIT  | 1: BUY  | OrderQty, Price                              |
| 2: LIMIT  | 2: SELL | OrderQty, Price                              |

**Response Attributes:**

*   MsgType (35) = 8
*   OrderID (37): Newly created order ID
*   OrdStatus (39) = A for an order being accepted, but not yet confirmed
*   ClOrdID (11): Unique identifier as assigned by the buy-side
*   ExecType (150) = A for an order being accepted, but not yet confirmed
*   ExecType (150) = I will also be sent when a trigger order is confirmed but not yet triggered

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

Unique identifier for Order as assigned by the buy-side. Uniqueness must be guaranteed across trading sessions.

**Currency** Tag 15 (string)

Required for OTC Order. Indicates whether OrderQty is for Base Currency or Quote Currency (Limit Orders Only). Options are:

**ExecInst** Tag 18 (string)

**Possible values:** \[`6`, `8`\]

*   6: POST\_ONLY, - 8: SMART\_POST\_ONLY, - Or leave empty

**OrderQty** Tag 38 (number)

For LIMIT Orders, MARKET orders only - Order Quantity

**OrdType** Tag 40 (string)required

**Possible values:** \[`1`, `2`, `D`\]

1: MARKET, 2: LIMIT, D: PREVIOUSLY\_QUOTED. Must of D for OTC RFQ Order. Must of 1 or 2 for OTC RFS Order

**Price** Tag 44 (number)

For LIMIT orders only - Unit price

**Side** Tag 54 (string)required

**Possible values:** \[`1`, `2`\]

1: BUY, 2: SELL

**Symbol** Tag 55 (string)required

e.g., ETH\_CRO, BTC\_USDT

**TimeInForce** Tag 59 (string)

**Possible values:** \[`1`, `3`, `4`\]

(Limit Orders Only) Options are: - 1: GOOD\_TILL\_CANCEL (Default if unspecified), - 3: IMMEDIATE\_OR\_CANCEL, - 4: FILL\_OR\_KILL.

**TransactTime** Tag 60 (date-time)required

Time this order request was initiated/released by the trader or trading system. i.e. 20190525-08:26:38.989 (in GMT)

**QuoteID** Tag 117 (string)

Required for OTC Order. Must be RFS for OTC RFS Order

**CashOrderQty** Tag 152 (number)

For MARKET (BUY) orders only - Notional amount to spend

**CashMargin** Tag 544 (string)

**Possible values:** \[`1`, `2`, `3`\]

1: SPOT places order without margin (default for Spot), 2: SPOT places order with margin

**TriggerPriceType** Tag 1107 (string)

**Possible values:** \[`2`, `I`, `M`\]

which price to use for ref\_price: 2: LAST\_PRICE (default for Spot), I: INDEX\_PRICE, M: MARK\_PRICE

**SelfMatchPreventionScope** Tag 12362 (string)

**Possible values:** \[`M`, `S`\]

Optional Field. Possible Values: - M: Matches Master or Sub a/c, - S: Matches Sub a/c only. Note: orderbook-specific settings takes higher precedence.

**SelfMatchPreventionInstruction** Tag 2964 (integer)

Mandatory if SelfMatchPreventionScope is set. Possible Values: - 1: Cancel Taker, - 2: Cancel Maker, - 3: Cancel Both Maker and Taker

**SelfMatchPreventionID** Tag 2362 (integer)

Optional Field. Possible Value: 0 to 32767. Default Value: - If SelfMatchPreventionScope & SelfMatchPreventionInstruction are not specified, REJECT, - If SelfMatchPreventionScope is specified, default value = 0. Note: orderbook-specific settings takes higher precedence.

**CommissionCurrency** Tag 2643 (string)

Fee currency for trade. Only present if this message was the result of a fill.

Valid Values: \[SPOT\] Buy - Base/Quote token/USD/USDT/EUR \[SPOT\] Sell - Quote token/USD/USDT/EUR \[DERIV\] Buy/Sell - USD/USDT/EUR

Example: If a client would like to BUY CRO/BTC, the default fee token is CRO, valid tokens are CRO/BTC/USD/USDT/EUR. If a client would like to SELL CRO/BTC, the default fee token is BTC, valid tokens are BTC/USD/USDT/EUR. If a client would like to BUY/SELL BTCUSD-PERP, the default fee token is USD, valid tokens are USD/USDT/EUR.

If a client has an insufficient balance in their preferred fee token, the system will switch to the default fee token.

**BrokerId** Tag 7933 (string)

Optional Field, Broker ID of the client.

**ReceiveWindow** Tag 20100 (integer)

This field is for setting the latency threshold. By default, if this field is not set explicitly, default value 5000 (i.e. 5000 milliseconds) will be applied. If this field is set out of valid range, default value 5000 will be applied. The effective value of this field, is used for checking against the time difference between current time when message is received and SendingTime (Tag52) from request message. If the difference is larger than effective ReceiveWindow value, the order will be rejected. Valid Range of values (in milliseconds): 100 - 5000

**StandardTrailer** objectrequired

Each FIX message is terminated by a Standard Trailer as a message delimiter as well as containing the checksum value.

**CheckSum** Tag 10 (string)required

Three bytes, simple checksum. Always last field in message

Order accepted

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