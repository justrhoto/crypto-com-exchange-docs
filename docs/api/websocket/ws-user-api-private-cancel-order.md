# private/cancel-order

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-user-api-private-cancel-order

- **Method:** `POST`
- **Path:** `/ws/user-api/private/cancel-order`
- **Tags:** Trading

Cancels an existing order on the Exchange.

This call is asynchronous, so the response is simply a confirmation of the request.

The `user.order` subscription can be used to check when the order is successfully canceled.

## Request Body

### Parameters

- `client_oid` (string) - Optional Client Order ID. Either order_id or client_oid must be present.
- `order_id` (string (int64)) - Optional Order ID. Either order_id or client_oid must be present. string format is highly recommended.

### Example

```json
{
  "id": "1",
  "method": "private/cancel-order",
  "nonce": "1610905028000",
  "params": {
    "order_id": "18342311"
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
  title: private/cancel-order
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
  /ws/user-api/private/cancel-order:
    post:
      operationId: ws-user-api-privateCancelOrder
      summary: private/cancel-order
      description: |-
        Cancels an existing order on the Exchange.

        This call is asynchronous, so the response is simply a confirmation of the request.

        The `user.order` subscription can be used to check when the order is successfully canceled.
      tags:
        - Trading
      x-type: request
      x-channel-url: wss://stream.crypto.com/exchange/v1/user
      x-channel-group: user
      x-name: private/cancel-order
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/WsPrivateCancelOrderRequest"
            description: private/cancel-order
            example:
              id: "1"
              method: private/cancel-order
              nonce: "1610905028000"
              params:
                order_id: "18342311"
      responses:
        "200":
          description: WebSocket response
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/WsPrivateCancelOrderResponse"
              examples:
                Success:
                  value:
                    id: "1"
                    method: private/cancel-order
                    code: "0"
                    message: NO_ERROR
                    result:
                      client_oid: c5f682ed-7108-4f1c-b755-972fcdca0f02
                      order_id: "18342311"
                  summary: Success.
                Bad request:
                  value:
                    id: "1"
                    method: private/cancel-order
                    code: "40001"
                    message: BAD_REQUEST
                  summary: Bad request.
                Unauthorized:
                  value:
                    id: "1"
                    method: private/cancel-order
                    code: "40101"
                    message: UNAUTHORIZED
                  summary: Unauthorized.
                Request timeout:
                  value:
                    id: "1"
                    method: private/cancel-order
                    code: "40801"
                    message: REQUEST_TIMEOUT
                  summary: Request timeout.
                Too many requests:
                  value:
                    id: "1"
                    method: private/cancel-order
                    code: "42901"
                    message: TOO_MANY_REQUESTS
                  summary: Too many requests.
                Internal server error:
                  value:
                    id: "1"
                    method: private/cancel-order
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
    WsPrivateCancelOrderRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - nonce
        - params
      description: Request body for private/cancel-order.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/cancel-order"
          example: private/cancel-order
        nonce:
          type: string
          format: int64
          description: Current timestamp in milliseconds, e.g. "1771761038000".
        params:
          type: object
          properties:
            order_id:
              type: string
              format: int64
              example: "123"
              description: Optional Order ID. Either order_id or client_oid must be present. string format is highly recommended.
            client_oid:
              type: string
              description: Optional Client Order ID. Either order_id or client_oid must be present.
    WsPrivateCancelOrderResponse:
      $ref: "#/components/schemas/PrivateCancelOrderResponse"
    PrivateCancelOrderResponse:
      type: object
      description: |
        Response for private/cancel-order (HTTP 200/4xx/5xx).
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
