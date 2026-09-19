# private/cancel-all-orders

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/private-cancel-all-orders

- **Method:** `POST`
- **Path:** `/private/cancel-all-orders`
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
  "api_key": "YOUR_API_KEY",
  "sig": "DIGITAL_SIGNATURE",
  "nonce": "1611169184000",
  "params": {
    "instrument_name": "BTCUSD-PERP"
  }
}
```

## Responses

### 200 Success.

#### Example

```json
{
  "id": "1",
  "method": "private/cancel-all-orders",
  "code": "0"
}
```

### 400 Bad request.

#### Example

```json
{
  "id": "1",
  "method": "private/cancel-all-orders",
  "code": "40001",
  "message": "BAD_REQUEST"
}
```

### 401 Unauthorized.

#### Example

```json
{
  "id": "1",
  "method": "private/cancel-all-orders",
  "code": "40101",
  "message": "UNAUTHORIZED"
}
```

### 408 Request timeout.

#### Example

```json
{
  "id": "1",
  "method": "private/cancel-all-orders",
  "code": "40801",
  "message": "REQUEST_TIMEOUT"
}
```

### 429 Too many requests.

#### Example

```json
{
  "id": "1",
  "method": "private/cancel-all-orders",
  "code": "42901",
  "message": "TOO_MANY_REQUESTS"
}
```

### 500 Internal server error.

#### Example

```json
{
  "id": "1",
  "method": "private/cancel-all-orders",
  "code": "50001",
  "message": "INTERNAL_SERVER_ERROR"
}
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: private/cancel-all-orders
  version: 1.0.0
servers:
  - url: https://api.crypto.com/exchange/v1
    description: Production
  - url: https://uat-api.3ona.co/exchange/v1
    description: UAT Sandbox
paths:
  /private/cancel-all-orders:
    post:
      tags:
        - Trading
      x-apply-to:
        - rest
        - ws-user-api
      summary: private/cancel-all-orders
      description: |
        Cancels all orders for a particular instrument/pair (asynchronous).

        This call is asynchronous, so the response is simply a confirmation of the request.

        The `user.order` subscription can be used to check when the order is successfully canceled.
      operationId: privateCancelAllOrders
      x-codeSamples: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PrivateCancelAllOrdersRequest"
            example:
              id: "1"
              method: private/cancel-all-orders
              api_key: YOUR_API_KEY
              sig: DIGITAL_SIGNATURE
              nonce: "1611169184000"
              params:
                instrument_name: BTCUSD-PERP
      responses:
        "200":
          description: Success.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCancelAllOrdersResponse"
              example:
                id: "1"
                method: private/cancel-all-orders
                code: "0"
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCancelAllOrdersResponse"
              example:
                id: "1"
                method: private/cancel-all-orders
                code: "40001"
                message: BAD_REQUEST
        "401":
          description: Unauthorized.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCancelAllOrdersResponse"
              example:
                id: "1"
                method: private/cancel-all-orders
                code: "40101"
                message: UNAUTHORIZED
        "408":
          description: Request timeout.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCancelAllOrdersResponse"
              example:
                id: "1"
                method: private/cancel-all-orders
                code: "40801"
                message: REQUEST_TIMEOUT
        "429":
          description: Too many requests.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCancelAllOrdersResponse"
              example:
                id: "1"
                method: private/cancel-all-orders
                code: "42901"
                message: TOO_MANY_REQUESTS
        "500":
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCancelAllOrdersResponse"
              example:
                id: "1"
                method: private/cancel-all-orders
                code: "50001"
                message: INTERNAL_SERVER_ERROR
components:
  schemas:
    PrivateCancelAllOrdersRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - api_key
        - sig
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
          properties:
            instrument_name:
              type: string
              example: BTCUSD-PERP
              description: e.g. BTCUSD-PERP. If not provided, the orders of ALL instruments will be canceled.
            type:
              $ref: "#/components/schemas/CancelOrderType"
    CancelOrderType:
      type: string
      enum:
        - LIMIT
        - TRIGGER
        - ALL
      description: |
        Allowed values depend on operation:
        - ➖ **private/cancel-all-orders:** LIMIT, ALL
        - ➖ **private/advanced/cancel-all-orders:** LIMIT, TRIGGER, ALL. For LIMIT, only the legs from advanced orders will be in-scope.
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
