# private/advanced/cancel-order-list

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-user-api-private-advanced-cancel-order-list

- **Method:** `POST`
- **Path:** `/ws/user-api/private/advanced/cancel-order-list`
- **Tags:** Advanced Order Management

Cancels multiple advanced orders in a single request.

This call is asynchronous, so the response is simply a confirmation of the request.

The `user.advanced.order` subscription can be used to check when the orders are successfully canceled.

## Request Body

### Parameters

- `order_list` (array of object **required**) - Array of orders to cancel (max 10). Each item must have either order_id or client_oid.
  Array of objects:
  - `client_oid` (string) - Client Order ID to cancel.
  - `order_id` (string (int64)) - Order ID to cancel. string format is highly recommended.

### Example

```json
{
  "method": "private/advanced/cancel-order-list",
  "id": "1",
  "nonce": "1610905028000",
  "params": {
    "order_list": [
      {
        "order_id": "289991951579667814"
      },
      {
        "client_oid": "my_tp_order"
      }
    ]
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
  title: private/advanced/cancel-order-list
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
  /ws/user-api/private/advanced/cancel-order-list:
    post:
      operationId: ws-user-api-privateAdvancedCancelOrderList
      summary: private/advanced/cancel-order-list
      description: |-
        Cancels multiple advanced orders in a single request.

        This call is asynchronous, so the response is simply a confirmation of the request.

        The `user.advanced.order` subscription can be used to check when the orders are successfully canceled.
      tags:
        - Advanced Order Management
      x-type: request
      x-channel-url: wss://stream.crypto.com/exchange/v1/user
      x-channel-group: user
      x-name: private/advanced/cancel-order-list
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/WsPrivateAdvancedCancelOrderListRequest"
            description: private/advanced/cancel-order-list
            example:
              method: private/advanced/cancel-order-list
              id: "1"
              nonce: "1610905028000"
              params:
                order_list:
                  - order_id: "289991951579667814"
                  - client_oid: my_tp_order
      responses:
        "200":
          description: WebSocket response
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/WsPrivateAdvancedCancelOrderListResponse"
              examples:
                Success:
                  value:
                    id: "1"
                    method: private/advanced/cancel-order-list
                    code: "0"
                    result:
                      - index: 0
                        code: 0
                      - index: 1
                        code: 0
                  summary: Success.
                Bad request:
                  value:
                    id: "1"
                    method: private/advanced/cancel-order-list
                    code: "40001"
                    message: BAD_REQUEST
                  summary: Bad request.
                Unauthorized:
                  value:
                    id: "1"
                    method: private/advanced/cancel-order-list
                    code: "40101"
                    message: UNAUTHORIZED
                  summary: Unauthorized.
                Request timeout:
                  value:
                    id: "1"
                    method: private/advanced/cancel-order-list
                    code: "40801"
                    message: REQUEST_TIMEOUT
                  summary: Request timeout.
                Too many requests:
                  value:
                    id: "1"
                    method: private/advanced/cancel-order-list
                    code: "42901"
                    message: TOO_MANY_REQUESTS
                  summary: Too many requests.
                Internal server error:
                  value:
                    id: "1"
                    method: private/advanced/cancel-order-list
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
    WsPrivateAdvancedCancelOrderListRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - nonce
        - params
      description: Request body for private/advanced/cancel-order-list.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/advanced/cancel-order-list"
          example: private/advanced/cancel-order-list
        nonce:
          type: string
          format: int64
          description: Current timestamp in milliseconds, e.g. "1771761038000".
        params:
          type: object
          required:
            - order_list
          properties:
            order_list:
              type: array
              minItems: 1
              maxItems: 10
              description: Array of orders to cancel (max 10). Each item must have either order_id or client_oid.
              items:
                type: object
                properties:
                  order_id:
                    type: string
                    format: int64
                    description: Order ID to cancel. string format is highly recommended.
                  client_oid:
                    type: string
                    description: Client Order ID to cancel.
    WsPrivateAdvancedCancelOrderListResponse:
      $ref: "#/components/schemas/PrivateAdvancedCancelOrderListResponse"
    PrivateAdvancedCancelOrderListResponse:
      type: object
      description: |
        Response for private/advanced/cancel-order-list (HTTP 200/4xx/5xx).
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
          type: array
          description: Present when code === 0. Array of results for each cancel request.
          items:
            type: object
            properties:
              index:
                type: integer
                description: Index of the order in the original request (0-based).
              code:
                type: integer
                description: 0 for success, error code otherwise.
              message:
                type: string
                description: Error message (present on failure).
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
```
