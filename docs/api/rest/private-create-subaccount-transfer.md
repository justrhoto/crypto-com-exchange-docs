# private/create-subaccount-transfer

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/private-create-subaccount-transfer

- **Method:** `POST`
- **Path:** `/private/create-subaccount-transfer`
- **Tags:** Account Balance and Positions

Transfer between subaccounts (and master account).

## Request Body

### Parameters

- `amount` (string (decimal) **required**) - Amount to transfer; must be a positive number.
- `currency` (string **required**) - Currency symbol.
- `from` (string **required**) - Account UUID to be debited.
- `to` (string **required**) - Account UUID to be credited.

### Example

```json
{
  "id": "1234",
  "method": "private/create-subaccount-transfer",
  "api_key": "YOUR_API_KEY",
  "sig": "DIGITAL_SIGNATURE",
  "params": {
    "from": "12345678-0000-0000-0000-000000000001",
    "to": "12345678-0000-0000-0000-000000000002",
    "currency": "CRO",
    "amount": "500"
  },
  "nonce": "1587846358253"
}
```

## Responses

### 200 Success.

#### Example

```json
{
  "id": "1234",
  "method": "private/create-subaccount-transfer",
  "code": "0"
}
```

### 400 Bad request.

#### Example

```json
{
  "id": "1",
  "method": "private/create-subaccount-transfer",
  "code": "40001",
  "message": "BAD_REQUEST"
}
```

### 401 Unauthorized.

#### Example

```json
{
  "id": "1",
  "method": "private/create-subaccount-transfer",
  "code": "40101",
  "message": "UNAUTHORIZED"
}
```

### 408 Request timeout.

#### Example

```json
{
  "id": "1",
  "method": "private/create-subaccount-transfer",
  "code": "40801",
  "message": "REQUEST_TIMEOUT"
}
```

### 429 Too many requests.

#### Example

```json
{
  "id": "1",
  "method": "private/create-subaccount-transfer",
  "code": "42901",
  "message": "TOO_MANY_REQUESTS"
}
```

### 500 Internal server error.

#### Example

```json
{
  "id": "1",
  "method": "private/create-subaccount-transfer",
  "code": "50001",
  "message": "INTERNAL_SERVER_ERROR"
}
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: private/create-subaccount-transfer
  version: 1.0.0
servers:
  - url: https://api.crypto.com/exchange/v1
    description: Production
  - url: https://uat-api.3ona.co/exchange/v1
    description: UAT Sandbox
paths:
  /private/create-subaccount-transfer:
    post:
      tags:
        - Account Balance and Positions
      x-apply-to:
        - rest
      summary: private/create-subaccount-transfer
      description: Transfer between subaccounts (and master account).
      operationId: privateCreateSubaccountTransfer
      x-codeSamples: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PrivateCreateSubaccountTransferRequest"
            example:
              id: "1234"
              method: private/create-subaccount-transfer
              api_key: YOUR_API_KEY
              sig: DIGITAL_SIGNATURE
              params:
                from: 12345678-0000-0000-0000-000000000001
                to: 12345678-0000-0000-0000-000000000002
                currency: CRO
                amount: "500"
              nonce: "1587846358253"
      responses:
        "200":
          description: Success.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCreateSubaccountTransferResponse"
              example:
                id: "1234"
                method: private/create-subaccount-transfer
                code: "0"
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCreateSubaccountTransferResponse"
              example:
                id: "1"
                method: private/create-subaccount-transfer
                code: "40001"
                message: BAD_REQUEST
        "401":
          description: Unauthorized.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCreateSubaccountTransferResponse"
              example:
                id: "1"
                method: private/create-subaccount-transfer
                code: "40101"
                message: UNAUTHORIZED
        "408":
          description: Request timeout.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCreateSubaccountTransferResponse"
              example:
                id: "1"
                method: private/create-subaccount-transfer
                code: "40801"
                message: REQUEST_TIMEOUT
        "429":
          description: Too many requests.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCreateSubaccountTransferResponse"
              example:
                id: "1"
                method: private/create-subaccount-transfer
                code: "42901"
                message: TOO_MANY_REQUESTS
        "500":
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCreateSubaccountTransferResponse"
              example:
                id: "1"
                method: private/create-subaccount-transfer
                code: "50001"
                message: INTERNAL_SERVER_ERROR
components:
  schemas:
    PrivateCreateSubaccountTransferRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - api_key
        - sig
        - nonce
        - params
      description: Request body for private/create-subaccount-transfer.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/create-subaccount-transfer"
          example: private/create-subaccount-transfer
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
            - from
            - to
            - currency
            - amount
          properties:
            from:
              type: string
              description: Account UUID to be debited.
            to:
              type: string
              description: Account UUID to be credited.
            currency:
              type: string
              example: CRO
              description: Currency symbol.
            amount:
              type: string
              format: decimal
              example: "500"
              description: Amount to transfer; must be a positive number.
    PrivateCreateSubaccountTransferResponse:
      type: object
      description: |
        Response for private/create-subaccount-transfer (HTTP 200/4xx/5xx).
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
          description: No result block per docs when code === 0 (success).
          properties: {}
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
```
