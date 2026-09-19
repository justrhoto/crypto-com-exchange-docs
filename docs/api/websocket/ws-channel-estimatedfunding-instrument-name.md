# estimatedfunding.{instrument_name}

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-channel-estimatedfunding-instrument-name

- **Method:** `POST`
- **Path:** `/ws/channel/estimatedfunding-instrument-name`
- **Tags:** Websocket Market Data

Estimated funding rate for the next interval. Subscribe e.g. ["estimatedfunding.BTCUSD-PERP"].
Refers to estimated hourly rate that will be effective at the end of each hour in the next interval.
Funding intervals are 00:00 - 04:00, 04:00 - 08:00, 08:00 - 12:00, 12:00 - 16:00, 16:00 - 20:00, 20:00 - 00:00 UTC

## Request Body

### Parameters

- `channels` (array of string **required**) - e.g. ["estimatedfunding.BTCUSD-PERP"]

### Example

```json
{
  "id": 1,
  "method": "subscribe",
  "nonce": "1613571154900",
  "params": {
    "channels": [
      "estimatedfunding.BTCUSD-PERP"
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
    "instrument_name": "BTCUSD-PERP",
    "subscription": "estimated.BTCUSD-PERP",
    "channel": "estimatedfunding",
    "data": [
      {
        "v": "0.00144",
        "t": 1613582880000
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
  title: estimatedfunding.{instrument_name}
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
  /ws/channel/estimatedfunding-instrument-name:
    post:
      operationId: ws-channel-estimatedfunding-instrument-name
      summary: estimatedfunding.{instrument_name}
      description: |-
        Estimated funding rate for the next interval. Subscribe e.g. ["estimatedfunding.BTCUSD-PERP"].
        Refers to estimated hourly rate that will be effective at the end of each hour in the next interval.
        Funding intervals are 00:00 - 04:00, 04:00 - 08:00, 08:00 - 12:00, 12:00 - 16:00, 16:00 - 20:00, 20:00 - 00:00 UTC
      tags:
        - Websocket Market Data
      x-type: channel
      x-channel-url: wss://stream.crypto.com/exchange/v1/market
      x-channel-group: marketData
      x-name: estimatedfunding.{instrument_name}
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
                      description: e.g. ["estimatedfunding.BTCUSD-PERP"]
                      example:
                        - estimatedfunding.BTCUSD-PERP
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
                  - estimatedfunding.BTCUSD-PERP
                book_subscription_type: SNAPSHOT_AND_UPDATE
                book_update_frequency: 100
      responses:
        "200":
          description: WebSocket response
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/WsEstimatedFundingPayload"
              example:
                id: 1
                method: subscribe
                code: 0
                result:
                  instrument_name: BTCUSD-PERP
                  subscription: estimated.BTCUSD-PERP
                  channel: estimatedfunding
                  data:
                    - v: "0.00144"
                      t: 1613582880000
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
    WsEstimatedFundingPayload:
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
          instrument_name: BTCUSD-PERP
          subscription: estimated.BTCUSD-PERP
          channel: estimatedfunding
          data:
            - v: "0.00144"
              t: 1613582880000
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
