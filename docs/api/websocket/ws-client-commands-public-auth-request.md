# public/auth

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-client-commands-public-auth-request

- **Method:** `POST`
- **Path:** `/ws/request/clientCommands/PublicAuthRequest`
- **Tags:** Websocket User API

Authenticate with API key and signature (required once per User API session)

## Request Body

- `api_key` (string **required**)
- `id` (string (int64) **required**)
- `method` (enum: public/auth **required**)
- `nonce` (string (int64) **required**) - Current timestamp in milliseconds.
- `sig` (string **required**) - HMAC-SHA256 hex signature

## Responses

### 200 WebSocket response

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: public/auth
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
  /ws/request/clientCommands/PublicAuthRequest:
    post:
      operationId: ws-clientCommands-PublicAuthRequest
      summary: public/auth
      description: Authenticate with API key and signature (required once per User API session)
      tags:
        - Websocket User API
      x-type: request
      x-channel-url: wss://stream.crypto.com/exchange/v1/user
      x-channel-group: user
      x-name: public/auth
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - id
                - method
                - api_key
                - sig
                - nonce
              properties:
                id:
                  type: string
                  format: int64
                method:
                  type: string
                  enum:
                    - public/auth
                api_key:
                  type: string
                sig:
                  type: string
                  description: HMAC-SHA256 hex signature
                nonce:
                  type: string
                  format: int64
                  description: Current timestamp in milliseconds.
            description: Authenticate with API key and signature (required once per User API session)
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
