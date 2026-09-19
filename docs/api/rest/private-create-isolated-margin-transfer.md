# private/create-isolated-margin-transfer

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/private-create-isolated-margin-transfer

- **Method:** `POST`
- **Path:** `/private/create-isolated-margin-transfer`
- **Tags:** Trading

Transfer balance between account and isolated position.

## Request Body

### Parameters

- `amount` (string (decimal) **required**) - Amount of USD to transfer; must be a positive number.
- `direction` (enum: CREDIT | DEBIT **required**) - CREDIT for credit to the isolated position; DEBIT for debit from the isolated position.
- `isolation_id` (string **required**) - Isolation ID of the isolated position to transfer margin to or from.

### Example

```json
{
  "id": "11",
  "method": "private/create-isolated-margin-transfer",
  "api_key": "YOUR_API_KEY",
  "sig": "DIGITAL_SIGNATURE",
  "nonce": "1611022832613",
  "params": {
    "isolation_id": "19848526",
    "direction": "CREDIT",
    "amount": "50"
  }
}
```

## Responses

### 200 Success.

#### Example

```json
{
  "id": "11",
  "method": "private/create-isolated-margin-transfer",
  "code": "0"
}
```

### 400 Bad request.

#### Example

```json
{
  "id": "1",
  "method": "private/create-isolated-margin-transfer",
  "code": "40001",
  "message": "BAD_REQUEST"
}
```

### 401 Unauthorized.

#### Example

```json
{
  "id": "1",
  "method": "private/create-isolated-margin-transfer",
  "code": "40101",
  "message": "UNAUTHORIZED"
}
```

### 408 Request timeout.

#### Example

```json
{
  "id": "1",
  "method": "private/create-isolated-margin-transfer",
  "code": "40801",
  "message": "REQUEST_TIMEOUT"
}
```

### 429 Too many requests.

#### Example

```json
{
  "id": "1",
  "method": "private/create-isolated-margin-transfer",
  "code": "42901",
  "message": "TOO_MANY_REQUESTS"
}
```

### 500 Internal server error.

#### Example

```json
{
  "id": "1",
  "method": "private/create-isolated-margin-transfer",
  "code": "50001",
  "message": "INTERNAL_SERVER_ERROR"
}
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: private/create-isolated-margin-transfer
  version: 1.0.0
servers:
  - url: https://api.crypto.com/exchange/v1
    description: Production
  - url: https://uat-api.3ona.co/exchange/v1
    description: UAT Sandbox
paths:
  /private/create-isolated-margin-transfer:
    post:
      tags:
        - Trading
      x-apply-to:
        - rest
      summary: private/create-isolated-margin-transfer
      description: Transfer balance between account and isolated position.
      operationId: privateCreateIsolatedMarginTransfer
      x-codeSamples: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PrivateCreateIsolatedMarginTransferRequest"
            example:
              id: "11"
              method: private/create-isolated-margin-transfer
              api_key: YOUR_API_KEY
              sig: DIGITAL_SIGNATURE
              nonce: "1611022832613"
              params:
                isolation_id: "19848526"
                direction: CREDIT
                amount: "50"
      responses:
        "200":
          description: Success.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCreateIsolatedMarginTransferResponse"
              example:
                id: "11"
                method: private/create-isolated-margin-transfer
                code: "0"
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCreateIsolatedMarginTransferResponse"
              example:
                id: "1"
                method: private/create-isolated-margin-transfer
                code: "40001"
                message: BAD_REQUEST
        "401":
          description: Unauthorized.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCreateIsolatedMarginTransferResponse"
              example:
                id: "1"
                method: private/create-isolated-margin-transfer
                code: "40101"
                message: UNAUTHORIZED
        "408":
          description: Request timeout.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCreateIsolatedMarginTransferResponse"
              example:
                id: "1"
                method: private/create-isolated-margin-transfer
                code: "40801"
                message: REQUEST_TIMEOUT
        "429":
          description: Too many requests.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCreateIsolatedMarginTransferResponse"
              example:
                id: "1"
                method: private/create-isolated-margin-transfer
                code: "42901"
                message: TOO_MANY_REQUESTS
        "500":
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCreateIsolatedMarginTransferResponse"
              example:
                id: "1"
                method: private/create-isolated-margin-transfer
                code: "50001"
                message: INTERNAL_SERVER_ERROR
components:
  schemas:
    PrivateCreateIsolatedMarginTransferRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - api_key
        - sig
        - nonce
        - params
      description: Request body for private/create-isolated-margin-transfer.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/create-isolated-margin-transfer"
          example: private/create-isolated-margin-transfer
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
            - isolation_id
            - direction
            - amount
          properties:
            isolation_id:
              type: string
              description: Isolation ID of the isolated position to transfer margin to or from.
            direction:
              $ref: "#/components/schemas/IsolatedMarginTransferDirection"
            amount:
              type: string
              format: decimal
              description: Amount of USD to transfer; must be a positive number.
    IsolatedMarginTransferDirection:
      type: string
      enum:
        - CREDIT
        - DEBIT
      description: CREDIT for credit to the isolated position; DEBIT for debit from the isolated position.
    PrivateCreateIsolatedMarginTransferResponse:
      type: object
      description: |
        Response for private/create-isolated-margin-transfer (HTTP 200/4xx/5xx).
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
          description: Present when code === 0; no result block per docs.
          properties: {}
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
```
