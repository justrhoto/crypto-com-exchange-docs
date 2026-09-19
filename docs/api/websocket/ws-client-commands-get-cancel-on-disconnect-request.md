# private/get-cancel-on-disconnect

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-client-commands-get-cancel-on-disconnect-request

- **Method:** `POST`
- **Path:** `/ws/request/clientCommands/GetCancelOnDisconnectRequest`
- **Tags:** Websocket User API

Get cancel on disconnect

## Request Body

- `id` (string (int64) **required**)
- `method` (enum: private/get-cancel-on-disconnect **required**)
- `nonce` (string (int64)) - Current timestamp in milliseconds.

## Responses

### 200 WebSocket response

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: private/get-cancel-on-disconnect
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
  /ws/request/clientCommands/GetCancelOnDisconnectRequest:
    post:
      operationId: ws-clientCommands-GetCancelOnDisconnectRequest
      summary: private/get-cancel-on-disconnect
      description: Get cancel on disconnect
      tags:
        - Websocket User API
      x-type: request
      x-channel-url: wss://stream.crypto.com/exchange/v1/user
      x-channel-group: user
      x-name: private/get-cancel-on-disconnect
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - id
                - method
              properties:
                id:
                  type: string
                  format: int64
                method:
                  type: string
                  enum:
                    - private/get-cancel-on-disconnect
                nonce:
                  type: string
                  format: int64
                  description: Current timestamp in milliseconds.
            description: Get cancel on disconnect
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
