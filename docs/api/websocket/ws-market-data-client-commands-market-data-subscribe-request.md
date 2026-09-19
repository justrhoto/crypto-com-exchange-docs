# subscribe

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-market-data-client-commands-market-data-subscribe-request

- **Method:** `POST`
- **Path:** `/ws/request/marketDataClientCommands/MarketDataSubscribeRequest`
- **Tags:** Websocket Market Data

Subscribe to one or more **market data** channels. Use on the Market Data server only.

## Request Body

### Parameters

- `channels` (array of string **required**) - Market data channels only, e.g. ["book.BTCUSD-PERP.10"], ["ticker.BTCUSD-PERP"], ["trade.BTCUSD-PERP"]
- `book_subscription_type` (enum: SNAPSHOT | SNAPSHOT_AND_UPDATE)
- `book_update_frequency` (enum: 10 | 100 | 500)

### Example

```json
{
  "id": 1,
  "method": "subscribe",
  "nonce": "1613571154900",
  "params": {
    "channels": [
      "book.BTCUSD-PERP.10"
    ],
    "book_subscription_type": "SNAPSHOT_AND_UPDATE",
    "book_update_frequency": 100
  }
}
```

## Responses

### 200 WebSocket response

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: subscribe
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
  /ws/request/marketDataClientCommands/MarketDataSubscribeRequest:
    post:
      operationId: ws-marketDataClientCommands-MarketDataSubscribeRequest
      summary: subscribe
      description: Subscribe to one or more **market data** channels. Use on the Market Data server only.
      tags:
        - Websocket Market Data
      x-type: request
      x-channel-url: wss://stream.crypto.com/exchange/v1/market
      x-channel-group: marketData
      x-name: subscribe
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
                  type: string
                  format: int64
                  description: Request id
                method:
                  type: string
                  enum:
                    - subscribe
                nonce:
                  type: string
                  format: int64
                  description: Current timestamp in milliseconds.
                params:
                  type: object
                  required:
                    - channels
                  properties:
                    channels:
                      type: array
                      items:
                        type: string
                      description: Market data channels only, e.g. ["book.BTCUSD-PERP.10"], ["ticker.BTCUSD-PERP"], ["trade.BTCUSD-PERP"]
                    book_subscription_type:
                      allOf:
                        - $ref: "#/components/schemas/BookSubscriptionType"
                        - description: For book channel only
                    book_update_frequency:
                      allOf:
                        - $ref: "#/components/schemas/BookUpdateFrequency"
                        - description: 10, 100 or 500 ms; for book channel only
              example:
                id: 1
                method: subscribe
                nonce: "1613571154900"
                params:
                  channels:
                    - book.BTCUSD-PERP.10
                  book_subscription_type: SNAPSHOT_AND_UPDATE
                  book_update_frequency: 100
            description: Subscribe to one or more **market data** channels. Use on the Market Data server only.
            example:
              id: 1
              method: subscribe
              nonce: "1613571154900"
              params:
                channels:
                  - book.BTCUSD-PERP.10
                book_subscription_type: SNAPSHOT_AND_UPDATE
                book_update_frequency: 100
      responses:
        "200":
          description: WebSocket response
          content:
            application/json:
              schema:
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
                    description: 0 = success
                  result:
                    type: object
                    description: Method-specific result
                  message:
                    type: string
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
    BookSubscriptionType:
      type: string
      enum:
        - SNAPSHOT
        - SNAPSHOT_AND_UPDATE
      description: Book subscription type for order book channel.
    BookUpdateFrequency:
      type: string
      enum:
        - "10"
        - "100"
        - "500"
      description: Update frequency in ms; for book channel only.
```
