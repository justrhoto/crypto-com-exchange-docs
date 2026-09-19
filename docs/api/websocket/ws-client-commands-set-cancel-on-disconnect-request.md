# private/set-cancel-on-disconnect

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-client-commands-set-cancel-on-disconnect-request

- **Method:** `POST`
- **Path:** `/ws/request/clientCommands/SetCancelOnDisconnectRequest`
- **Tags:** Websocket User API

Set cancel on disconnect

## Request Body

### Parameters

- `scope` (enum: CONNECTION **required**) - Scope for cancel-on-disconnect; CONNECTION.

## Responses

### 200 WebSocket response

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: private/set-cancel-on-disconnect
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
  /ws/request/clientCommands/SetCancelOnDisconnectRequest:
    post:
      operationId: ws-clientCommands-SetCancelOnDisconnectRequest
      summary: private/set-cancel-on-disconnect
      description: Set cancel on disconnect
      tags:
        - Websocket User API
      x-type: request
      x-channel-url: wss://stream.crypto.com/exchange/v1/user
      x-channel-group: user
      x-name: private/set-cancel-on-disconnect
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
                    - private/set-cancel-on-disconnect
                nonce:
                  type: string
                  format: int64
                  description: Current timestamp in milliseconds.
                params:
                  type: object
                  required:
                    - scope
                  properties:
                    scope:
                      $ref: "#/components/schemas/CancelOnDisconnectScope"
            description: Set cancel on disconnect
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
    CancelOnDisconnectScope:
      type: string
      enum:
        - CONNECTION
      description: Scope for cancel-on-disconnect; CONNECTION.
```
