# private/cancel-all-orders

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-user-api-private-cancel-all-orders

- **Method:** `POST`
- **Path:** `/ws/user-api/private/cancel-all-orders`
- **Tags:** Trading

Cancels all orders for a particular instrument/pair (asynchronous).

This call is asynchronous, so the response is simply a confirmation of the request.

The `user.order` subscription can be used to check when the order is successfully canceled.

## Request Body

### Parameters

- `instrument_name` (string) - e.g. BTCUSD-PERP. If not provided, the orders of ALL instruments will be canceled.
- `type` (enum: LIMIT | TRIGGER | ALL) - Allowed values depend on operation

### Example

```json
{
  "id": "1",
  "method": "private/cancel-all-orders",
  "nonce": "1611169184000",
  "params": {
    "instrument_name": "BTCUSD-PERP"
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
  title: private/cancel-all-orders
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
  /ws/user-api/private/cancel-all-orders:
    post:
      operationId: ws-user-api-privateCancelAllOrders
      summary: private/cancel-all-orders
      description: |-
        Cancels all orders for a particular instrument/pair (asynchronous).

        This call is asynchronous, so the response is simply a confirmation of the request.

        The `user.order` subscription can be used to check when the order is successfully canceled.
      tags:
        - Trading
      x-type: request
      x-channel-url: wss://stream.crypto.com/exchange/v1/user
      x-channel-group: user
      x-name: private/cancel-all-orders
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/WsPrivateCancelAllOrdersRequest"
            description: private/cancel-all-orders
            example:
              id: "1"
              method: private/cancel-all-orders
              nonce: "1611169184000"
              params:
                instrument_name: BTCUSD-PERP
      responses:
        "200":
          description: WebSocket response
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/WsPrivateCancelAllOrdersResponse"
              examples:
                Success:
                  value:
                    id: "1"
                    method: private/cancel-all-orders
                    code: "0"
                  summary: Success.
                Bad request:
                  value:
                    id: "1"
                    method: private/cancel-all-orders
                    code: "40001"
                    message: BAD_REQUEST
                  summary: Bad request.
                Unauthorized:
                  value:
                    id: "1"
                    method: private/cancel-all-orders
                    code: "40101"
                    message: UNAUTHORIZED
                  summary: Unauthorized.
                Request timeout:
                  value:
                    id: "1"
                    method: private/cancel-all-orders
                    code: "40801"
                    message: REQUEST_TIMEOUT
                  summary: Request timeout.
                Too many requests:
                  value:
                    id: "1"
                    method: private/cancel-all-orders
                    code: "42901"
                    message: TOO_MANY_REQUESTS
                  summary: Too many requests.
                Internal server error:
                  value:
                    id: "1"
                    method: private/cancel-all-orders
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
    WsPrivateCancelAllOrdersRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - nonce
        - params
      description: Request body for private/cancel-all-orders.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/cancel-all-orders"
          example: private/cancel-all-orders
        nonce:
          type: string
          format: int64
          description: Current timestamp in milliseconds, e.g. "1771761038000".
        params:
          type: object
          properties:
            instrument_name:
              type: string
              example: BTCUSD-PERP
              description: e.g. BTCUSD-PERP. If not provided, the orders of ALL instruments will be canceled.
            type:
              $ref: "#/components/schemas/WsCancelOrderType"
    WsCancelOrderType:
      type: string
      enum:
        - LIMIT
        - TRIGGER
        - ALL
      description: |
        Allowed values depend on operation:
        - ➖ **private/cancel-all-orders:** LIMIT, ALL
        - ➖ **private/advanced/cancel-all-orders:** LIMIT, TRIGGER, ALL. For LIMIT, only the legs from advanced orders will be in-scope.
    WsPrivateCancelAllOrdersResponse:
      $ref: "#/components/schemas/PrivateCancelAllOrdersResponse"
    PrivateCancelAllOrdersResponse:
      type: object
      description: |
        Response for private/cancel-all-orders (HTTP 200/4xx/5xx).
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
          description: Present when code === 0; no result block per docs (code 0 = queued).
          properties: {}
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
```
