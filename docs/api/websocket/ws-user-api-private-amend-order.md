# private/amend-order

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-user-api-private-amend-order

- **Method:** `POST`
- **Path:** `/ws/user-api/private/amend-order`
- **Tags:** Trading

Amend an existing order on the Exchange.

This call is asynchronous, so the response is simply a confirmation of the request.

The user.order subscription can be used to check when the order is successfully created.

Please note that amend order is designed as a convenience function such that it performs cancel and then create behind the scene. The new order will lose queue priority, except if the amend is only to amend down order quantity.

## Request Body

### Parameters

- `new_price` (string (decimal) **required**) - The new amended price. If no change required, input original value.
- `new_quantity` (string (decimal) **required**) - The new amended quantity. If no change required, input original value.
- `client_oid` (string) - Client Order ID (maximum 36 characters).
- `order_id` (string (int64)) - Optional Order ID. Either order_id or orig_client_oid must be present.
- `orig_client_oid` (string) - Optional Original Client Order ID. Either order_id or orig_client_oid must be present. If both exist, order_id has higher priority.

### Example

```json
{
  "id": "53",
  "method": "private/amend-order",
  "nonce": "1587846358253",
  "params": {
    "order_id": "6530219466236720401",
    "new_price": "82000",
    "new_quantity": "0.0002"
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
  title: private/amend-order
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
  /ws/user-api/private/amend-order:
    post:
      operationId: ws-user-api-privateAmendOrder
      summary: private/amend-order
      description: |-
        Amend an existing order on the Exchange.

        This call is asynchronous, so the response is simply a confirmation of the request.

        The user.order subscription can be used to check when the order is successfully created.

        Please note that amend order is designed as a convenience function such that it performs cancel and then create behind the scene. The new order will lose queue priority, except if the amend is only to amend down order quantity.
      tags:
        - Trading
      x-type: request
      x-channel-url: wss://stream.crypto.com/exchange/v1/user
      x-channel-group: user
      x-name: private/amend-order
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/WsPrivateAmendOrderRequest"
            description: private/amend-order
            example:
              id: "53"
              method: private/amend-order
              nonce: "1587846358253"
              params:
                order_id: "6530219466236720401"
                new_price: "82000"
                new_quantity: "0.0002"
      responses:
        "200":
          description: WebSocket response
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/WsPrivateAmendOrderResponse"
              examples:
                Success:
                  value:
                    id: "53"
                    method: private/amend-order
                    code: "0"
                    result:
                      client_oid: "53"
                      order_id: "6530219466236720401"
                  summary: Success.
                Bad request:
                  value:
                    id: "1"
                    method: private/amend-order
                    code: "40001"
                    message: BAD_REQUEST
                  summary: Bad request.
                Unauthorized:
                  value:
                    id: "1"
                    method: private/amend-order
                    code: "40101"
                    message: UNAUTHORIZED
                  summary: Unauthorized.
                Request timeout:
                  value:
                    id: "1"
                    method: private/amend-order
                    code: "40801"
                    message: REQUEST_TIMEOUT
                  summary: Request timeout.
                Too many requests:
                  value:
                    id: "1"
                    method: private/amend-order
                    code: "42901"
                    message: TOO_MANY_REQUESTS
                  summary: Too many requests.
                Internal server error:
                  value:
                    id: "1"
                    method: private/amend-order
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
    WsPrivateAmendOrderRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - nonce
        - params
      description: Request body for private/amend-order.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/amend-order"
          example: private/amend-order
        nonce:
          type: string
          format: int64
          description: Current timestamp in milliseconds, e.g. "1771761038000".
        params:
          type: object
          required:
            - new_quantity
            - new_price
          properties:
            order_id:
              type: string
              format: int64
              description: Optional Order ID. Either order_id or orig_client_oid must be present.
            client_oid:
              type: string
              description: Client Order ID (maximum 36 characters).
            orig_client_oid:
              type: string
              description: Optional Original Client Order ID. Either order_id or orig_client_oid must be present. If both exist, order_id has higher priority.
            new_price:
              type: string
              format: decimal
              description: The new amended price. If no change required, input original value.
            new_quantity:
              type: string
              format: decimal
              description: The new amended quantity. If no change required, input original value.
    WsPrivateAmendOrderResponse:
      $ref: "#/components/schemas/PrivateAmendOrderResponse"
    PrivateAmendOrderResponse:
      type: object
      description: |
        Response for private/amend-order (HTTP 200/4xx/5xx).
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
          description: Present when code === 0. client_oid, order_id.
          properties:
            client_oid:
              type: string
              description: Client order ID
            order_id:
              type: string
              format: int64
              description: Order ID
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
```
