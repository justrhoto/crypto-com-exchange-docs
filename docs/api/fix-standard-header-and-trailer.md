# Standard Header and Trailer

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/fix-standard-header-and-trailer

## Standard Header and Trailer

This documentation uses `|` to represent the FIX field separator (byte 0x01). It should be replaced by 0x01 in actual messages.

### Standard Header

The header identifies the message type, length, destination, sequence number, origination point and time.

| Tag | Name         | Type         | Required | Description                                                                       |
| :-- | :----------- | :----------- | :------- | :-------------------------------------------------------------------------------- |
| 8   | BeginString  | string       | Y        | Must be "FIX.4.4"                                                                 |
| 9   | BodyLength   | number       | Y        | Length of the message body in bytes                                               |
| 35  | MsgType      | string       | Y        | Message Type                                                                      |
| 34  | MsgSeqNum    | number       | Y        | Integer message sequence number                                                   |
| 43  | PossDupFlag  | boolean      | N        | Indicates possible retransmission of message with this sequence number            |
| 49  | SenderCompID | string       | Y        | See FIX Endpoints for details                                                     |
| 56  | TargetCompID | string       | Y        | See FIX Endpoints for details                                                     |
| 52  | SendingTime  | UTCTimestamp | Y        | Time when the message is being sent out from FIX Gateway                          |
| 97  | PossResend   | boolean      | N        | Indicates that message may contain information sent under another sequence number |

**Processing PossDupFlag and PossResend:**

*   **PossDupFlag (43=Y)** — if a message with this sequence number has been previously received, ignore message; if not, process normally.
*   **PossResend (97=Y)** — forward message to application and determine if previously received (i.e. verify order id and parameters).

### Standard Trailer

Each FIX message is terminated by a Standard Trailer as a message delimiter as well as containing the checksum value.

| Tag | Name     | Type   | Required | Description                                                |
| :-- | :------- | :----- | :------- | :--------------------------------------------------------- |
| 10  | CheckSum | string | Y        | Three bytes, simple checksum. Always last field in message |