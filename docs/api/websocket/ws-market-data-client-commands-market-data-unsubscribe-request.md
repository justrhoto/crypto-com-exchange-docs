# unsubscribe

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-market-data-client-commands-market-data-unsubscribe-request

- **Method:** `POST`
- **Path:** `/ws/request/marketDataClientCommands/MarketDataUnsubscribeRequest`
- **Tags:** Websocket Market Data

Unsubscribe from market data channels. Use on the Market Data server only.

## Request Body

### Parameters

- `channels` (array of string **required**) - Market data channels to unsubscribe

### Example

```json
{
  "id": 2,
  "method": "unsubscribe",
  "nonce": "1613571154900",
  "params": {
    "channels": [
      "book.BTCUSD-PERP.10"
    ]
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
  title: unsubscribe
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
  /ws/request/marketDataClientCommands/MarketDataUnsubscribeRequest:
    post:
      operationId: ws-marketDataClientCommands-MarketDataUnsubscribeRequest
      summary: unsubscribe
      description: Unsubscribe from market data channels. Use on the Market Data server only.
      tags:
        - Websocket Market Data
      x-type: request
      x-channel-url: wss://stream.crypto.com/exchange/v1/market
      x-channel-group: marketData
      x-name: unsubscribe
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
                method:
                  type: string
                  enum:
                    - unsubscribe
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
                      description: Market data channels to unsubscribe
              example:
                id: 2
                method: unsubscribe
                nonce: "1613571154900"
                params:
                  channels:
                    - book.BTCUSD-PERP.10
            description: Unsubscribe from market data channels. Use on the Market Data server only.
            example:
              id: 2
              method: unsubscribe
              nonce: "1613571154900"
              params:
                channels:
                  - book.BTCUSD-PERP.10
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
```
