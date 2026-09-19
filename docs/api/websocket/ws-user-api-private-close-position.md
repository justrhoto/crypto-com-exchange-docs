# private/close-position

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-user-api-private-close-position

- **Method:** `POST`
- **Path:** `/ws/user-api/private/close-position`
- **Tags:** Trading

Cancels position for a particular instrument/pair (asynchronous).

This call is asynchronous, so the response is simply a confirmation of the request.

The `user.order` subscription can be used to check when the order is successfully canceled.

## Request Body

### Parameters

- `instrument_name` (string **required**) - e.g. BTCUSD-PERP.
- `type` (enum: LIMIT | MARKET **required**) - LIMIT or MARKET
- `isolation_id` (string) - Needed when closing an existing isolated position. If omitted, the non-isolated position will be closed.
- `price` (string (decimal)) - For LIMIT orders only. Must use decimal precision matching the instrument's `price_tick_size`.
- `quantity` (string (decimal)) - Positive number only. Only provide if intending to do partial closing.

### Example

```json
{
  "id": "1",
  "method": "private/close-position",
  "nonce": "1610905028000",
  "params": {
    "instrument_name": "BTCUSD-PERP",
    "type": "LIMIT",
    "price": "30000.0",
    "quantity": "1000"
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
  title: private/close-position
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
  /ws/user-api/private/close-position:
    post:
      operationId: ws-user-api-privateClosePosition
      summary: private/close-position
      description: |-
        Cancels position for a particular instrument/pair (asynchronous).

        This call is asynchronous, so the response is simply a confirmation of the request.

        The `user.order` subscription can be used to check when the order is successfully canceled.
      tags:
        - Trading
      x-type: request
      x-channel-url: wss://stream.crypto.com/exchange/v1/user
      x-channel-group: user
      x-name: private/close-position
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/WsPrivateClosePositionRequest"
            description: private/close-position
            example:
              id: "1"
              method: private/close-position
              nonce: "1610905028000"
              params:
                instrument_name: BTCUSD-PERP
                type: LIMIT
                price: "30000.0"
                quantity: "1000"
      responses:
        "200":
          description: WebSocket response
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/WsPrivateClosePositionResponse"
              examples:
                Success:
                  value:
                    id: "1"
                    method: private/close-position
                    code: "0"
                    result:
                      client_oid: 1684d6e4-2c55-64e1-52c3-3aa9febc3a23
                      order_id: "15744"
                  summary: Success.
                Bad request:
                  value:
                    id: "1"
                    method: private/close-position
                    code: "40001"
                    message: BAD_REQUEST
                  summary: Bad request.
                Unauthorized:
                  value:
                    id: "1"
                    method: private/close-position
                    code: "40101"
                    message: UNAUTHORIZED
                  summary: Unauthorized.
                Request timeout:
                  value:
                    id: "1"
                    method: private/close-position
                    code: "40801"
                    message: REQUEST_TIMEOUT
                  summary: Request timeout.
                Too many requests:
                  value:
                    id: "1"
                    method: private/close-position
                    code: "42901"
                    message: TOO_MANY_REQUESTS
                  summary: Too many requests.
                Internal server error:
                  value:
                    id: "1"
                    method: private/close-position
                    code: "50001"
                    message: INTERNAL_SERVER_ERROR
                  summary: Internal server error.
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
    WsPrivateClosePositionRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - nonce
        - params
      description: Request body for private/close-position.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/close-position"
          example: private/close-position
        nonce:
          type: string
          format: int64
          description: Current timestamp in milliseconds, e.g. "1771761038000".
        params:
          type: object
          required:
            - instrument_name
            - type
          properties:
            instrument_name:
              type: string
              example: BTCUSD-PERP
              description: e.g. BTCUSD-PERP.
            type:
              $ref: "#/components/schemas/WsClosePositionType"
            price:
              type: string
              format: decimal
              description: For LIMIT orders only. Must use decimal precision matching the instrument's `price_tick_size`.
            quantity:
              type: string
              format: decimal
              description: Positive number only. Only provide if intending to do partial closing.
            isolation_id:
              type: string
              description: Needed when closing an existing isolated position. If omitted, the non-isolated position will be closed.
    WsClosePositionType:
      type: string
      enum:
        - LIMIT
        - MARKET
      description: LIMIT or MARKET
    WsPrivateClosePositionResponse:
      $ref: "#/components/schemas/PrivateClosePositionResponse"
    PrivateClosePositionResponse:
      type: object
      description: |
        Response for private/close-position (HTTP 200/4xx/5xx).
        code === 0 → success, result present.
        code !== 0 → error, message and/or original present.
      properties:
        id:
          type: string
          format: int64
          description: Echoed request id
        method:
          type: string
          description: Method invoked
        code:
          type: string
          format: int32
          description: 0 = success; non-zero indicates error (reason code).
        result:
          type: object
          description: Present when code === 0. order_id, client_oid.
          properties:
            order_id:
              type: string
              format: int64
              description: Order ID
            client_oid:
              type: string
              description: Client Order ID
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
```
