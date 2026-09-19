# private/advanced/cancel-order-list

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/private-advanced-cancel-order-list

- **Method:** `POST`
- **Path:** `/private/advanced/cancel-order-list`
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
  "api_key": "YOUR_API_KEY",
  "sig": "DIGITAL_SIGNATURE",
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

### 200 Success.

#### Example

```json
{
  "id": "1",
  "method": "private/advanced/cancel-order-list",
  "code": "0",
  "result": [
    {
      "index": 0,
      "code": 0
    },
    {
      "index": 1,
      "code": 0
    }
  ]
}
```

### 400 Bad request.

#### Example

```json
{
  "id": "1",
  "method": "private/advanced/cancel-order-list",
  "code": "40001",
  "message": "BAD_REQUEST"
}
```

### 401 Unauthorized.

#### Example

```json
{
  "id": "1",
  "method": "private/advanced/cancel-order-list",
  "code": "40101",
  "message": "UNAUTHORIZED"
}
```

### 408 Request timeout.

#### Example

```json
{
  "id": "1",
  "method": "private/advanced/cancel-order-list",
  "code": "40801",
  "message": "REQUEST_TIMEOUT"
}
```

### 429 Too many requests.

#### Example

```json
{
  "id": "1",
  "method": "private/advanced/cancel-order-list",
  "code": "42901",
  "message": "TOO_MANY_REQUESTS"
}
```

### 500 Internal server error.

#### Example

```json
{
  "id": "1",
  "method": "private/advanced/cancel-order-list",
  "code": "50001",
  "message": "INTERNAL_SERVER_ERROR"
}
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: private/advanced/cancel-order-list
  version: 1.0.0
servers:
  - url: https://api.crypto.com/exchange/v1
    description: Production
  - url: https://uat-api.3ona.co/exchange/v1
    description: UAT Sandbox
paths:
  /private/advanced/cancel-order-list:
    post:
      tags:
        - Advanced Order Management
      x-apply-to:
        - rest
        - ws-user-api
      summary: private/advanced/cancel-order-list
      description: |
        Cancels multiple advanced orders in a single request.

        This call is asynchronous, so the response is simply a confirmation of the request.

        The `user.advanced.order` subscription can be used to check when the orders are successfully canceled.
      operationId: privateAdvancedCancelOrderList
      x-codeSamples: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PrivateAdvancedCancelOrderListRequest"
            example:
              method: private/advanced/cancel-order-list
              id: "1"
              api_key: YOUR_API_KEY
              sig: DIGITAL_SIGNATURE
              nonce: "1610905028000"
              params:
                order_list:
                  - order_id: "289991951579667814"
                  - client_oid: my_tp_order
      responses:
        "200":
          description: Success.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateAdvancedCancelOrderListResponse"
              example:
                id: "1"
                method: private/advanced/cancel-order-list
                code: "0"
                result:
                  - index: 0
                    code: 0
                  - index: 1
                    code: 0
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateAdvancedCancelOrderListResponse"
              example:
                id: "1"
                method: private/advanced/cancel-order-list
                code: "40001"
                message: BAD_REQUEST
        "401":
          description: Unauthorized.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateAdvancedCancelOrderListResponse"
              example:
                id: "1"
                method: private/advanced/cancel-order-list
                code: "40101"
                message: UNAUTHORIZED
        "408":
          description: Request timeout.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateAdvancedCancelOrderListResponse"
              example:
                id: "1"
                method: private/advanced/cancel-order-list
                code: "40801"
                message: REQUEST_TIMEOUT
        "429":
          description: Too many requests.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateAdvancedCancelOrderListResponse"
              example:
                id: "1"
                method: private/advanced/cancel-order-list
                code: "42901"
                message: TOO_MANY_REQUESTS
        "500":
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateAdvancedCancelOrderListResponse"
              example:
                id: "1"
                method: private/advanced/cancel-order-list
                code: "50001"
                message: INTERNAL_SERVER_ERROR
components:
  schemas:
    PrivateAdvancedCancelOrderListRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - api_key
        - sig
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
        api_key:
          type: string
          description: Your API key (only required for private REST)
        sig:
          type: string
          description: HMAC-SHA256 signature in hex (only required for private REST)
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
