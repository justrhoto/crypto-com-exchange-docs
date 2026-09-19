# public/respond-heartbeat

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-client-commands-respond-heartbeat-request

- **Method:** `POST`
- **Path:** `/ws/request/clientCommands/RespondHeartbeatRequest`
- **Tags:** Websocket User API

Respond to server heartbeat within 5 seconds

## Request Body

- `id` (string (int64) **required**) - Same id as in heartbeat request
- `method` (enum: public/respond-heartbeat **required**)

## Responses

### 200 WebSocket response

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: public/respond-heartbeat
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
  /ws/request/clientCommands/RespondHeartbeatRequest:
    post:
      operationId: ws-clientCommands-RespondHeartbeatRequest
      summary: public/respond-heartbeat
      description: Respond to server heartbeat within 5 seconds
      tags:
        - Websocket User API
      x-type: request
      x-channel-url: wss://stream.crypto.com/exchange/v1/user
      x-channel-group: user
      x-name: public/respond-heartbeat
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
                  description: Same id as in heartbeat request
                method:
                  type: string
                  enum:
                    - public/respond-heartbeat
            description: Respond to server heartbeat within 5 seconds
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
