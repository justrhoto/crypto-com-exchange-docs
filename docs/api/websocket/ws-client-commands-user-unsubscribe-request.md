# unsubscribe

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-client-commands-user-unsubscribe-request

- **Method:** `POST`
- **Path:** `/ws/request/clientCommands/UserUnsubscribeRequest`
- **Tags:** Websocket User API

Unsubscribe from user channels. Use on the User API server only.

## Request Body

### Parameters

- `channels` (array of string **required**) - User channels to unsubscribe

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
  /ws/request/clientCommands/UserUnsubscribeRequest:
    post:
      operationId: ws-clientCommands-UserUnsubscribeRequest
      summary: unsubscribe
      description: Unsubscribe from user channels. Use on the User API server only.
      tags:
        - Websocket User API
      x-type: request
      x-channel-url: wss://stream.crypto.com/exchange/v1/user
      x-channel-group: user
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
                      description: User channels to unsubscribe
            description: Unsubscribe from user channels. Use on the User API server only.
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
