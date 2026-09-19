# candlestick.{timeframe}.{instrument_name}

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-channel-candlestick-timeframe-instrument-name

- **Method:** `POST`
- **Path:** `/ws/channel/candlestick-timeframe-instrument-name`
- **Tags:** Websocket Market Data

Candlestick (k-line) updates. Subscribe e.g. ["candlestick.1D.BTCUSD-PERP"]. Timeframe: 1m, 5m, 15m, 30m, 1h, 2h, 4h, 12h, 1D, 7D, 14D, 1M.

## Request Body

### Parameters

- `channels` (array of string **required**) - e.g. ["candlestick.1D.BTCUSD-PERP"]

### Example

```json
{
  "id": 1,
  "method": "subscribe",
  "nonce": "1613571154900",
  "params": {
    "channels": [
      "candlestick.1D.BTCUSD-PERP"
    ],
    "book_subscription_type": "SNAPSHOT_AND_UPDATE",
    "book_update_frequency": 100
  }
}
```

## Responses

### 200 WebSocket response

#### Result

- `channel` (string)
- `data` (array of object)
  Array of objects:
  - `c` (string (decimal)) - Close
  - `h` (string (decimal)) - High
  - `l` (string (decimal)) - Low
  - `o` (string (decimal)) - Open
  - `t` (string (int64)) - Start time of candlestick (Unix timestamp, ms), e.g. "1771761038000".
  - `v` (string (decimal)) - Volume
- `instrument_name` (string)
- `interval` (string)
- `subscription` (string)

#### Example

```json
{
  "id": 1,
  "method": "subscribe",
  "code": 0,
  "result": {
    "instrument_name": "BTCUSD-PERP",
    "subscription": "candlestick.1D.BTCUSD-PERP",
    "channel": "candlestick",
    "interval": "1D",
    "data": [
      {
        "o": "51140.500000",
        "h": "51699.000000",
        "l": "49212.000000",
        "c": "51313.500000",
        "v": "867.9432",
        "t": 1612224000000
      }
    ]
  }
}
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: candlestick.{timeframe}.{instrument_name}
  version: 1.0.0
servers:
  - url: wss://stream.crypto.com/exchange/v1/user
    description: Production User API and user subscriptions
  - url: wss://uat-stream.3ona.co/exchange/v1/user
    description: UAT Sandbox User API and user subscriptions
  - url: wss://stream.crypto.com/exchange/v1/market
    description: Production Market Data subscriptions
  - url: wss://uat-stream.3ona.co/exchange/v1/market
    description: UAT Sandbox Market Data subscriptions
paths:
  /ws/channel/candlestick-timeframe-instrument-name:
    post:
      operationId: ws-channel-candlestick-timeframe-instrument-name
      summary: candlestick.{timeframe}.{instrument_name}
      description: "Candlestick (k-line) updates. Subscribe e.g. [\"candlestick.1D.BTCUSD-PERP\"]. Timeframe: 1m, 5m, 15m, 30m, 1h, 2h, 4h, 12h, 1D, 7D, 14D, 1M."
      tags:
        - Websocket Market Data
      x-type: channel
      x-channel-url: wss://stream.crypto.com/exchange/v1/market
      x-channel-group: marketData
      x-name: candlestick.{timeframe}.{instrument_name}
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - id
                - method
                - params
                - nonce
              properties:
                id:
                  type: integer
                  description: Request id
                method:
                  type: string
                  enum:
                    - subscribe
                params:
                  type: object
                  required:
                    - channels
                  properties:
                    channels:
                      type: array
                      items:
                        type: string
                      description: e.g. ["candlestick.1D.BTCUSD-PERP"]
                      example:
                        - candlestick.1D.BTCUSD-PERP
                nonce:
                  type: integer
                  description: Current timestamp in milliseconds
            description: Subscribe request for this channel
            example:
              id: 1
              method: subscribe
              nonce: "1613571154900"
              params:
                channels:
                  - candlestick.1D.BTCUSD-PERP
                book_subscription_type: SNAPSHOT_AND_UPDATE
                book_update_frequency: 100
      responses:
        "200":
          description: WebSocket response
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/WsCandlestickPayload"
              example:
                id: 1
                method: subscribe
                code: 0
                result:
                  instrument_name: BTCUSD-PERP
                  subscription: candlestick.1D.BTCUSD-PERP
                  channel: candlestick
                  interval: 1D
                  data:
                    - o: "51140.500000"
                      h: "51699.000000"
                      l: "49212.000000"
                      c: "51313.500000"
                      v: "867.9432"
                      t: 1612224000000
      servers:
        - url: wss://stream.crypto.com/exchange/v1/user
          description: Production User API and user subscriptions
        - url: wss://uat-stream.3ona.co/exchange/v1/user
          description: UAT Sandbox User API and user subscriptions
        - url: wss://stream.crypto.com/exchange/v1/market
          description: Production Market Data subscriptions
        - url: wss://uat-stream.3ona.co/exchange/v1/market
          description: UAT Sandbox Market Data subscriptions
components:
  schemas:
    WsCandlestickPayload:
      type: object
      properties:
        id:
          type: string
          format: int64
        method:
          type: string
        code:
          type: string
          format: int32
        result:
          type: object
          properties:
            instrument_name:
              type: string
            subscription:
              type: string
            channel:
              type: string
            interval:
              type: string
            data:
              type: array
              items:
                $ref: "#/components/schemas/WsCandlestickItem"
      example:
        id: 1
        method: subscribe
        code: 0
        result:
          instrument_name: BTCUSD-PERP
          subscription: candlestick.1D.BTCUSD-PERP
          channel: candlestick
          interval: 1D
          data:
            - o: "51140.500000"
              h: "51699.000000"
              l: "49212.000000"
              c: "51313.500000"
              v: "867.9432"
              t: 1612224000000
    WsCandlestickItem:
      type: object
      description: Single candlestick (Open, High, Low, Close, Volume, Start time ms)
      properties:
        o:
          type: string
          format: decimal
          description: Open
        h:
          type: string
          format: decimal
          description: High
        l:
          type: string
          format: decimal
          description: Low
        c:
          type: string
          format: decimal
          description: Close
        v:
          type: string
          format: decimal
          description: Volume
        t:
          type: string
          format: int64
          description: Start time of candlestick (Unix timestamp, ms), e.g. "1771761038000".
```
