# private/cancel-order

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/private-cancel-order

- **Method:** `POST`
- **Path:** `/private/cancel-order`
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
  "api_key": "YOUR_API_KEY",
  "sig": "DIGITAL_SIGNATURE",
  "nonce": "1610905028000",
  "params": {
    "order_id": "18342311"
  }
}
```

## Responses

### 200 Success.

#### Result

- `client_oid` (string) - Client Order ID
- `order_id` (string (int64)) - Order ID

#### Example

```json
{
  "id": "1",
  "method": "private/cancel-order",
  "code": "0",
  "message": "NO_ERROR",
  "result": {
    "client_oid": "c5f682ed-7108-4f1c-b755-972fcdca0f02",
    "order_id": "18342311"
  }
}
```

### 400 Bad request.

#### Example

```json
{
  "id": "1",
  "method": "private/cancel-order",
  "code": "40001",
  "message": "BAD_REQUEST"
}
```

### 401 Unauthorized.

#### Example

```json
{
  "id": "1",
  "method": "private/cancel-order",
  "code": "40101",
  "message": "UNAUTHORIZED"
}
```

### 408 Request timeout.

#### Example

```json
{
  "id": "1",
  "method": "private/cancel-order",
  "code": "40801",
  "message": "REQUEST_TIMEOUT"
}
```

### 429 Too many requests.

#### Example

```json
{
  "id": "1",
  "method": "private/cancel-order",
  "code": "42901",
  "message": "TOO_MANY_REQUESTS"
}
```

### 500 Internal server error.

#### Example

```json
{
  "id": "1",
  "method": "private/cancel-order",
  "code": "50001",
  "message": "INTERNAL_SERVER_ERROR"
}
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: private/cancel-order
  version: 1.0.0
servers:
  - url: https://api.crypto.com/exchange/v1
    description: Production
  - url: https://uat-api.3ona.co/exchange/v1
    description: UAT Sandbox
paths:
  /private/cancel-order:
    post:
      tags:
        - Trading
      x-apply-to:
        - rest
        - ws-user-api
      summary: private/cancel-order
      description: |
        Cancels an existing order on the Exchange.

        This call is asynchronous, so the response is simply a confirmation of the request.

        The `user.order` subscription can be used to check when the order is successfully canceled.
      operationId: privateCancelOrder
      x-codeSamples: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PrivateCancelOrderRequest"
            example:
              id: "1"
              method: private/cancel-order
              api_key: YOUR_API_KEY
              sig: DIGITAL_SIGNATURE
              nonce: "1610905028000"
              params:
                order_id: "18342311"
      responses:
        "200":
          description: Success.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCancelOrderResponse"
              example:
                id: "1"
                method: private/cancel-order
                code: "0"
                message: NO_ERROR
                result:
                  client_oid: c5f682ed-7108-4f1c-b755-972fcdca0f02
                  order_id: "18342311"
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCancelOrderResponse"
              example:
                id: "1"
                method: private/cancel-order
                code: "40001"
                message: BAD_REQUEST
        "401":
          description: Unauthorized.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCancelOrderResponse"
              example:
                id: "1"
                method: private/cancel-order
                code: "40101"
                message: UNAUTHORIZED
        "408":
          description: Request timeout.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCancelOrderResponse"
              example:
                id: "1"
                method: private/cancel-order
                code: "40801"
                message: REQUEST_TIMEOUT
        "429":
          description: Too many requests.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCancelOrderResponse"
              example:
                id: "1"
                method: private/cancel-order
                code: "42901"
                message: TOO_MANY_REQUESTS
        "500":
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCancelOrderResponse"
              example:
                id: "1"
                method: private/cancel-order
                code: "50001"
                message: INTERNAL_SERVER_ERROR
components:
  schemas:
    PrivateCancelOrderRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - api_key
        - sig
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
            order_id:
              type: string
              format: int64
              example: "123"
              description: Optional Order ID. Either order_id or client_oid must be present. string format is highly recommended.
            client_oid:
              type: string
              description: Optional Client Order ID. Either order_id or client_oid must be present.
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
