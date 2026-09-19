# index.{instrument_name}

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-channel-index-instrument-name

- **Method:** `POST`
- **Path:** `/ws/channel/index-instrument-name`
- **Tags:** Websocket Market Data

Index price. Subscribe e.g. ["index.BTCUSD-INDEX"].

## Request Body

### Parameters

- `channels` (array of string **required**) - e.g. ["index.BTCUSD-INDEX"]

### Example

```json
{
  "id": 1,
  "method": "subscribe",
  "nonce": "1613571154900",
  "params": {
    "channels": [
      "index.BTCUSD-INDEX"
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
  - `t` (string (int64)) - Timestamp (ms), e.g. "1771761038000".
  - `v` (string (decimal)) - Value
- `instrument_name` (string)
- `subscription` (string)

#### Example

```json
{
  "id": 1,
  "method": "subscribe",
  "code": 0,
  "result": {
    "instrument_name": "BTCUSD-INDEX",
    "subscription": "index.BTCUSD-INDEX",
    "channel": "index",
    "data": [
      {
        "v": "51204.52000",
        "t": 1613582703000
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
  title: index.{instrument_name}
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
  /ws/channel/index-instrument-name:
    post:
      operationId: ws-channel-index-instrument-name
      summary: index.{instrument_name}
      description: Index price. Subscribe e.g. ["index.BTCUSD-INDEX"].
      tags:
        - Websocket Market Data
      x-type: channel
      x-channel-url: wss://stream.crypto.com/exchange/v1/market
      x-channel-group: marketData
      x-name: index.{instrument_name}
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
                      description: e.g. ["index.BTCUSD-INDEX"]
                      example:
                        - index.BTCUSD-INDEX
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
                  - index.BTCUSD-INDEX
                book_subscription_type: SNAPSHOT_AND_UPDATE
                book_update_frequency: 100
      responses:
        "200":
          description: WebSocket response
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/WsIndexPayload"
              example:
                id: 1
                method: subscribe
                code: 0
                result:
                  instrument_name: BTCUSD-INDEX
                  subscription: index.BTCUSD-INDEX
                  channel: index
                  data:
                    - v: "51204.52000"
                      t: 1613582703000
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
    WsIndexPayload:
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
            data:
              type: array
              items:
                $ref: "#/components/schemas/WsPriceTimestampItem"
      example:
        id: 1
        method: subscribe
        code: 0
        result:
          instrument_name: BTCUSD-INDEX
          subscription: index.BTCUSD-INDEX
          channel: index
          data:
            - v: "51204.52000"
              t: 1613582703000
    WsPriceTimestampItem:
      type: object
      description: Value with timestamp (used by index, mark, settlement, funding, etc.)
      properties:
        v:
          type: string
          format: decimal
          description: Value
        t:
          type: string
          format: int64
          description: Timestamp (ms), e.g. "1771761038000".
```
