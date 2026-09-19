# MarketDataRequestReject (35=Y)

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/fix/fix-market-data-request-reject

The Market Data Request Reject is used when the broker cannot honor the Market Data Request (35=V), due to business or technical reasons. Brokers may choose to limit various parameters, such as the size of requests, whether just the top of book or the entire book may be displayed, and whether Full or Incremental updates must be used.

Rejection received

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

Must refer to the MDReqID (262) of the request.

**MDReqRejReason** Tag 281 (string)

Reject reason

**NoAltMDSource** Tag 816 (integer)

**Possible values:** `>= 1`

Number of market data source

**AltMDSourceGrp** object

**AltMDSourceID** Tag 817 (string)

Session layer source for market data (For the standard FIX session layer, this would be the TargetCompID (56) where market data can be obtained).

**Text** Tag 58 (string)

**EncodedTextLen** Tag 354 (integer)

Must be set if EncodedText (355) field is specified and must immediately precede it.

**EncodedText** Tag 355 (string)

Encoded (non-ASCII characters) representation of the Text (58) field in the encoded format specified via the MessageEncoding (347) field.

**StandardTrailer** objectrequired

Each FIX message is terminated by a Standard Trailer as a message delimiter as well as containing the checksum value.

**CheckSum** Tag 10 (string)required

Three bytes, simple checksum. Always last field in message