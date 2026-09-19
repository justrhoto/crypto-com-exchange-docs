# public/heartbeat

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-market-data-client-commands-heartbeat-request

- **Method:** `POST`
- **Path:** `/ws/request/marketDataClientCommands/HeartbeatRequest`
- **Tags:** Websocket Market Data

Heartbeat sent by server every 30s; client must respond with public/respond-heartbeat within 5 seconds.

## Request Body

- `code` (integer) - 0 = heartbeat
- `id` (integer) - Request id; echo in respond-heartbeat
- `method` (enum: public/heartbeat)

## Responses

### 200 N/A (server→client message)

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: public/heartbeat
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
  /ws/request/marketDataClientCommands/HeartbeatRequest:
    post:
      operationId: ws-marketDataClientCommands-HeartbeatRequest
      summary: public/heartbeat
      description: Heartbeat sent by server every 30s; client must respond with public/respond-heartbeat within 5 seconds.
      x-type: receive
      x-name: public/heartbeat
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                id:
                  type: integer
                  description: Request id; echo in respond-heartbeat
                method:
                  type: string
                  enum:
                    - public/heartbeat
                code:
                  type: integer
                  description: 0 = heartbeat
              example:
                id: 1587523073344
                method: public/heartbeat
                code: 0
            description: Message sent by server every 30s
      responses:
        "200":
          description: N/A (server→client message)
      servers:
        - url: wss://stream.crypto.com/exchange/v1/user
          description: Production User API and user subscriptions
        - url: wss://uat-stream.3ona.co/exchange/v1/user
          description: UAT Sandbox User API and user subscriptions
        - url: wss://stream.crypto.com/exchange/v1/market
          description: Production Market Data subscriptions
        - url: wss://uat-stream.3ona.co/exchange/v1/market
          description: UAT Sandbox Market Data subscriptions
      tags:
        - Websocket Market Data
      x-channel-url: wss://stream.crypto.com/exchange/v1/market
      x-channel-group: marketData
```
