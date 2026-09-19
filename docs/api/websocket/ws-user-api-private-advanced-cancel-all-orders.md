# private/advanced/cancel-all-orders

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-user-api-private-advanced-cancel-all-orders

- **Method:** `POST`
- **Path:** `/ws/user-api/private/advanced/cancel-all-orders`
- **Tags:** Advanced Order Management

Cancels all OTO/OTOCO orders for a particular instrument/pair (asynchronous). 

This call is asynchronous, so the response is simply a confirmation of the request. 

The `user.advance.order` subscription can be used to check when the order is successfully canceled.

## Request Body

### Parameters

- `instrument_name` (string) - e.g. BTC_USD. If not provided, the OTO/OTOCO orders of ALL instruments will be canceled. Required when position_type is specified.
- `position_type` (enum: CROSS_MARGIN | ISOLATED_MARGIN) - Derivatives only. One of CROSS_MARGIN, ISOLATED_MARGIN. When set, only advanced orders tied to the specified position type on the given instrument_name are cancelled. Requires instrument_name when set. Cannot be combined with type=LIMIT or type=TRIGGER.
- `type` (enum: LIMIT | TRIGGER | ALL) - Allowed values depend on operation

### Example

```json
{
  "id": "1",
  "nonce": "1611169184000",
  "method": "private/advanced/cancel-all-orders",
  "params": {
    "instrument_name": "BTC_USD"
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
  title: private/advanced/cancel-all-orders
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
  /ws/user-api/private/advanced/cancel-all-orders:
    post:
      operationId: ws-user-api-privateAdvancedCancelAllOrders
      summary: private/advanced/cancel-all-orders
      description: |-
        Cancels all OTO/OTOCO orders for a particular instrument/pair (asynchronous). 

        This call is asynchronous, so the response is simply a confirmation of the request. 

        The `user.advance.order` subscription can be used to check when the order is successfully canceled.
      tags:
        - Advanced Order Management
      x-type: request
      x-channel-url: wss://stream.crypto.com/exchange/v1/user
      x-channel-group: user
      x-name: private/advanced/cancel-all-orders
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/WsPrivateAdvancedCancelAllOrdersRequest"
            description: private/advanced/cancel-all-orders
            example:
              id: "1"
              nonce: "1611169184000"
              method: private/advanced/cancel-all-orders
              params:
                instrument_name: BTC_USD
      responses:
        "200":
          description: WebSocket response
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/WsPrivateAdvancedCancelAllOrdersResponse"
              examples:
                Success:
                  value:
                    id: "1"
                    method: private/advanced/cancel-all-orders
                    code: "0"
                  summary: Success.
                Bad request:
                  value:
                    id: "1"
                    method: private/advanced/cancel-all-orders
                    code: "40001"
                    message: BAD_REQUEST
                  summary: Bad request.
                Unauthorized:
                  value:
                    id: "1"
                    method: private/advanced/cancel-all-orders
                    code: "40101"
                    message: UNAUTHORIZED
                  summary: Unauthorized.
                Request timeout:
                  value:
                    id: "1"
                    method: private/advanced/cancel-all-orders
                    code: "40801"
                    message: REQUEST_TIMEOUT
                  summary: Request timeout.
                Too many requests:
                  value:
                    id: "1"
                    method: private/advanced/cancel-all-orders
                    code: "42901"
                    message: TOO_MANY_REQUESTS
                  summary: Too many requests.
                Internal server error:
                  value:
                    id: "1"
                    method: private/advanced/cancel-all-orders
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
    WsPrivateAdvancedCancelAllOrdersRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - nonce
        - params
      description: Request body for private/advanced/cancel-all-orders.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/advanced/cancel-all-orders"
          example: private/advanced/cancel-all-orders
        nonce:
          type: string
          format: int64
          description: Current timestamp in milliseconds, e.g. "1771761038000".
        params:
          type: object
          properties:
            instrument_name:
              type: string
              description: e.g. BTC_USD. If not provided, the OTO/OTOCO orders of ALL instruments will be canceled. Required when position_type is specified.
            type:
              $ref: "#/components/schemas/WsCancelOrderType"
            position_type:
              type: string
              enum:
                - CROSS_MARGIN
                - ISOLATED_MARGIN
              description: Derivatives only. One of CROSS_MARGIN, ISOLATED_MARGIN. When set, only advanced orders tied to the specified position type on the given instrument_name are cancelled. Requires instrument_name when set. Cannot be combined with type=LIMIT or type=TRIGGER.
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
    WsPrivateAdvancedCancelAllOrdersResponse:
      $ref: "#/components/schemas/PrivateAdvancedCancelAllOrdersResponse"
    PrivateAdvancedCancelAllOrdersResponse:
      type: object
      description: |
        Response for private/advanced/cancel-all-orders (HTTP 200/4xx/5xx).
        code === 0 → success; no result block per docs (code 0 = queued).
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
