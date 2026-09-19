# Logon (35=A)

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/fix/fix-logon

Initiate FIX session with authentication credentials.

## FIX Digital Signature

For FIX API, the Logon (35=A) message has to be invoked ONCE per session, with the Digital Signature as Password (554) and API key as UserName (553) to be part of the message. Once authenticated, you will gain access to a FIX session, and no longer need to use the pass in the Digital Signature and API key anymore for the duration of the session.

The authentication is based on the pairing of the API Key, along with the HMAC-SHA256 hash of the request parameters using the API Secret as the cryptographic key.

**You should NEVER explicitly include the API Secret Key in plain-text in your request**

The algorithm for generating the HMAC-SHA256 signature is as follows:

1.  Concatenate based on flow type:
    *   **(Case i. Order Management Flow)** `"public/auth" + MsgSeqNum (34) + api_key + "system_labelONEEX" + RawData (96)`
    *   **(Case ii. Market Data Flow)** `"public/auth" + MsgSeqNum (34) + api_key + RawData (96)`
    *   **(Case iii. Drop Copy Flow)** `"public/auth" + MsgSeqNum (34) + api_key + "system_labelONEEX" + RawData (96)`
2.  Use HMAC-SHA256 to hash the above using the API Secret as the cryptographic key
3.  Encode the output as a hex string -- this is your Digital Signature

The above method is similar to sign a Digital Signature for REST / WS, with the following equivalent field mappings:

| FIX Tag        | Equivalent WS / REST Field for Signing Digital Signature |
| :------------- | :------------------------------------------------------- |
| MsgType (35)   | method                                                   |
| MsgSeqNum (34) | id                                                       |
| UserName (553) | api_key                                                  |
| RawData (96)   | nonce in milliseconds                                    |
| Password (554) | sig                                                      |

Please refer to the respective section to sign a Digital Signature for REST / WS for sample code.

## Remarks

We recommend adding 50 ms wait interval after receiving 35=A on both side, before sending first request.

The FIX gateway maintenance (Order Management flow only) will be carried out on second Thursday 07:05-07:15 (UTC) monthly. Please disconnect on 07:04 (UTC) and reconnect on 07:15 (UTC) with sequence number 1/1.

**Other options for client preferences:**

**Option 1:** Sequence number resets require by clients to LOGOFF and then LOGIN again using the Logon \[A\] message with the ResetSeqNumFlag (141) set to 'Y'. This resets the sequence numbers on both sides. Clients are free to perform this action whenever is convenient for their own schedule and set-up.

**Option 2:** Crypto.com FIX connections shall establish a cap to prevent sequence number counter overflow; Our FIX engine shall trigger disconnection and reset the sequence number to 1/1, either the inbound or outbound sequence number reach 2,147,480,000

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

**RawDataLength** Tag 95 (integer)required

Length of RawData field

**RawData** Tag 96 (string)required

Please refer FIX Digital Signature for details

**EncryptMethod** Tag 98 (integer)required

Must be 98=0

**HeartBtInt** Tag 108 (integer)required

Heartbeat interval in seconds.

**ResetSeqNumFlag** Tag 141 (string)

**Possible values:** \[`Y`, `N`\]

Indicates that both sides of the FIX session should reset sequence numbers.

**Username** Tag 553 (string)required

API Key

**Password** Tag 554 (string)required

Please refer FIX Digital Signature for details

**CancelOnDisconnectScope** Tag 6867 (string)

**Possible values:** \[`Y`\]

Y: Enabled for the open order placed by this session/connection.

**CancelOnDisconnectType** Tag 35002 (integer)

'0': Disable, '3': Enable

**StandardTrailer** objectrequired

Each FIX message is terminated by a Standard Trailer as a message delimiter as well as containing the checksum value.

**CheckSum** Tag 10 (string)required

Three bytes, simple checksum. Always last field in message

Logon accepted

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

**RawDataLength** Tag 95 (integer)required

Length of RawData field

**RawData** Tag 96 (string)required

Please refer FIX Digital Signature for details

**EncryptMethod** Tag 98 (integer)required

Must be 98=0

**HeartBtInt** Tag 108 (integer)required

Heartbeat interval in seconds.

**ResetSeqNumFlag** Tag 141 (string)

**Possible values:** \[`Y`, `N`\]

Indicates that both sides of the FIX session should reset sequence numbers.

**Username** Tag 553 (string)required

API Key

**Password** Tag 554 (string)required

Please refer FIX Digital Signature for details

**CancelOnDisconnectScope** Tag 6867 (string)

**Possible values:** \[`Y`\]

Y: Enabled for the open order placed by this session/connection.

**CancelOnDisconnectType** Tag 35002 (integer)

'0': Disable, '3': Enable

**StandardTrailer** objectrequired

Each FIX message is terminated by a Standard Trailer as a message delimiter as well as containing the checksum value.

**CheckSum** Tag 10 (string)required

Three bytes, simple checksum. Always last field in message