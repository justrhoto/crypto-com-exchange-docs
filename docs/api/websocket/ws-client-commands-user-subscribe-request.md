# subscribe

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-client-commands-user-subscribe-request

- **Method:** `POST`
- **Path:** `/ws/request/clientCommands/UserSubscribeRequest`
- **Tags:** Websocket User API

Subscribe to one or more **user** channels. Use on the User API server only.

## Request Body

### Parameters

- `channels` (array of string **required**) - User channels only. Each channel must be one of

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
  /ws/request/clientCommands/UserSubscribeRequest:
    post:
      operationId: ws-clientCommands-UserSubscribeRequest
      summary: subscribe
      description: Subscribe to one or more **user** channels. Use on the User API server only.
      tags:
        - Websocket User API
      x-type: request
      x-channel-url: wss://stream.crypto.com/exchange/v1/user
      x-channel-group: user
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
                      description: |
                        User channels only. Each channel must be one of:
                        - user.order
                        - user.order.{instrument_name}
                        - user.advance.order
                        - user.advance.order.{instrument_name}
                        - user.trade
                        - user.trade.{instrument_name}
                        - user.transactions
                        - user.balance
                        - user.positions
                        - user.account_risk
                        - user.position_balance
            description: Subscribe to one or more **user** channels. Use on the User API server only.
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
