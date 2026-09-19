# MarketDataIncrementalRefresh (35=X)

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/fix/fix-market-data-incremental-refresh

Response for Market Data Request.

Market data received

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

**MDReqID** Tag 262 (string)required

Market Data channel. Possible values: book.{Symbol}.{MarketDepth}, e.g. book.BTC\_USDT.50; trade.{Symbol}, e.g. trade.ETH\_CRO

**MDEntryID** Tag 278 (string)

i. Trade ID when 269 = 2. ii. sequence id in order book

**MDEntryRefID** Tag 280 (string)

Referring to previous sequence id (MDEntryID) in order book

**Symbol** Tag 55 (string)required

**MDEntryTimeMs** Tag 10273 (integer)required

Same meaning as 272 and 273, with representation as epoch in milliseconds

**NoMDEntries** Tag 268 (integer)required

**Possible values:** `>= 1`

Number of market data entries.

**MDEntriesGrp** objectrequired

**MDUpdateAction** Tag 279 (string)required

**Possible values:** \[`0`, `1`, `2`\]

Type of Market Data update action.

**MDEntryType** Tag 269 (string)required

**Possible values:** \[`0`, `1`, `2`, `J`\]

Type of market data entry.

**MDEntryPx** Tag 270 (number)required

Price of the Market Data Entry.

**MDEntrySize** Tag 271 (number)required

Quantity or volume represented by the Market Data Entry.

**NumberOfOrders** Tag 346 (integer)

Number of orders in the market.

**TakerSide** Tag 10851 (string)

**Possible values:** \[`1`, `2`\]

**TrdMatchID** Tag 880 (string)

Identifier assigned by a matching system to a match event that results in multiple executions or trades.

**StandardTrailer** objectrequired

Each FIX message is terminated by a Standard Trailer as a message delimiter as well as containing the checksum value.

**CheckSum** Tag 10 (string)required

Three bytes, simple checksum. Always last field in message