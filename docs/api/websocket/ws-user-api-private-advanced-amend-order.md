# private/advanced/amend-order

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-user-api-private-advanced-amend-order

- **Method:** `POST`
- **Path:** `/ws/user-api/private/advanced/amend-order`
- **Tags:** Advanced Order Management

Amends an existing trigger order on the Exchange.

This call is asynchronous, so the response is simply a confirmation of the request.

The `user.advanced.order` subscription can be used to check when the order is successfully amended.

**Trigger Order Type Conversion:**
- Set `new_price` to "0" → Convert trigger limit order to trigger market order
- Set `new_price` to "> 0" → Convert trigger market order to trigger limit order

## Request Body

### Parameters

- `new_price` (string (decimal) **required**) - New limit price for the trigger order. Set to '0' to convert trigger limit to market, or value > 0 to convert market to limit.
- `new_quantity` (string (decimal) **required**) - New quantity. If no change required, input original value.
- `client_oid` (string) - Client Order ID to amend. Either order_id or client_oid must be present.
- `new_ref_price` (string (decimal)) - New reference/trigger price. Omit to keep the existing trigger price.
- `order_id` (string (int64)) - Order ID to amend. Either order_id or client_oid must be present. string format is highly recommended.

### Example

```json
{
  "method": "private/advanced/amend-order",
  "id": "1",
  "nonce": "1610905028000",
  "params": {
    "order_id": "18342311",
    "new_ref_price": "46000.0",
    "new_quantity": "0.15"
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
  title: private/advanced/amend-order
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
  /ws/user-api/private/advanced/amend-order:
    post:
      operationId: ws-user-api-privateAdvancedAmendOrder
      summary: private/advanced/amend-order
      description: |-
        Amends an existing trigger order on the Exchange.

        This call is asynchronous, so the response is simply a confirmation of the request.

        The `user.advanced.order` subscription can be used to check when the order is successfully amended.

        **Trigger Order Type Conversion:**
        - Set `new_price` to "0" → Convert trigger limit order to trigger market order
        - Set `new_price` to "> 0" → Convert trigger market order to trigger limit order
      tags:
        - Advanced Order Management
      x-type: request
      x-channel-url: wss://stream.crypto.com/exchange/v1/user
      x-channel-group: user
      x-name: private/advanced/amend-order
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/WsPrivateAdvancedAmendOrderRequest"
            description: private/advanced/amend-order
            example:
              method: private/advanced/amend-order
              id: "1"
              nonce: "1610905028000"
              params:
                order_id: "18342311"
                new_ref_price: "46000.0"
                new_quantity: "0.15"
      responses:
        "200":
          description: WebSocket response
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/WsPrivateAdvancedAmendOrderResponse"
              examples:
                Success:
                  value:
                    id: "1"
                    method: private/advanced/amend-order
                    code: "0"
                    result:
                      order_id: "18342311"
                      client_oid: c5f682ed-7108-4f1c-b755-972fcdca0f02
                  summary: Success.
                Bad request:
                  value:
                    id: "1"
                    method: private/advanced/amend-order
                    code: "40001"
                    message: BAD_REQUEST
                  summary: Bad request.
                Unauthorized:
                  value:
                    id: "1"
                    method: private/advanced/amend-order
                    code: "40101"
                    message: UNAUTHORIZED
                  summary: Unauthorized.
                Request timeout:
                  value:
                    id: "1"
                    method: private/advanced/amend-order
                    code: "40801"
                    message: REQUEST_TIMEOUT
                  summary: Request timeout.
                Too many requests:
                  value:
                    id: "1"
                    method: private/advanced/amend-order
                    code: "42901"
                    message: TOO_MANY_REQUESTS
                  summary: Too many requests.
                Internal server error:
                  value:
                    id: "1"
                    method: private/advanced/amend-order
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
    WsPrivateAdvancedAmendOrderRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - nonce
        - params
      description: Request body for private/advanced/amend-order.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/advanced/amend-order"
          example: private/advanced/amend-order
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
              description: Order ID to amend. Either order_id or client_oid must be present. string format is highly recommended.
            client_oid:
              type: string
              description: Client Order ID to amend. Either order_id or client_oid must be present.
            new_ref_price:
              type: string
              format: decimal
              description: New reference/trigger price. Omit to keep the existing trigger price.
            new_quantity:
              type: string
              format: decimal
              description: New quantity. If no change required, input original value.
            new_price:
              type: string
              format: decimal
              description: New limit price for the trigger order. Set to '0' to convert trigger limit to market, or value > 0 to convert market to limit.
    WsPrivateAdvancedAmendOrderResponse:
      $ref: "#/components/schemas/PrivateAdvancedAmendOrderResponse"
    PrivateAdvancedAmendOrderResponse:
      type: object
      description: |
        Response for private/advanced/amend-order (HTTP 200/4xx/5xx).
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
          description: Present when code === 0. Contains order_id and client_oid.
          properties:
            order_id:
              type: string
              format: int64
              description: Order ID.
            client_oid:
              type: string
              description: Client Order ID.
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
```
