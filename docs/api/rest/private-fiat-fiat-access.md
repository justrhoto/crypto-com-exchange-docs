# private/fiat/fiat-access

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/private-fiat-fiat-access

- **Method:** `POST`
- **Path:** `/private/fiat/fiat-access`
- **Tags:** Fiat Wallet

Retrieves fiat access information for a user account. Used by FCM/DCM brokers to check deposit and withdrawal permissions for different currencies and payment networks on behalf of their users.

## Request Body

### Example

```json
{
  "id": "3",
  "method": "private/fiat/fiat-access",
  "api_key": "YOUR_API_KEY",
  "sig": "DIGITAL_SIGNATURE",
  "nonce": "1773372503821",
  "params": {}
}
```

## Responses

### 200 Success.

#### Result

- `accesses` (array of object **required**) - List of fiat access permissions
  Array of objects:
  - `currency` (string **required**) - Currency code (e.g., USD)
  - `is_deposit_enable` (boolean **required**) - Whether deposits are enabled for this currency/network
  - `is_withdraw_enable` (boolean **required**) - Whether withdrawals are enabled for this currency/network
  - `payment_network` (string **required**) - Payment network identifier (e.g., us_ach)

#### Example

```json
{
  "id": "3",
  "method": "private/fiat/fiat-access",
  "code": "0",
  "result": {
    "accesses": [
      {
        "currency": "USD",
        "payment_network": "us_ach",
        "is_deposit_enable": true,
        "is_withdraw_enable": true
      }
    ]
  }
}
```

### 400 Bad request.

#### Example

```json
{
  "id": "1",
  "method": "private/fiat/fiat-access",
  "code": "40001",
  "message": "BAD_REQUEST"
}
```

### 401 Unauthorized.

#### Example

```json
{
  "id": "1",
  "method": "private/fiat/fiat-access",
  "code": "40101",
  "message": "UNAUTHORIZED"
}
```

### 408 Request timeout.

#### Example

```json
{
  "id": "1",
  "method": "private/fiat/fiat-access",
  "code": "40801",
  "message": "REQUEST_TIMEOUT"
}
```

### 429 Too many requests.

#### Example

```json
{
  "id": "1",
  "method": "private/fiat/fiat-access",
  "code": "42901",
  "message": "TOO_MANY_REQUESTS"
}
```

### 500 Internal server error.

#### Example

```json
{
  "id": "1",
  "method": "private/fiat/fiat-access",
  "code": "50001",
  "message": "INTERNAL_SERVER_ERROR"
}
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: private/fiat/fiat-access
  version: 1.0.0
servers:
  - url: https://api.crypto.com/exchange/v1
    description: Production
  - url: https://uat-api.3ona.co/exchange/v1
    description: UAT Sandbox
paths:
  /private/fiat/fiat-access:
    post:
      tags:
        - Fiat Wallet
      x-apply-to:
        - rest
      summary: private/fiat/fiat-access
      description: Retrieves fiat access information for a user account. Used by FCM/DCM brokers to check deposit and withdrawal permissions for different currencies and payment networks on behalf of their users.
      operationId: privateFiatFiatAccess
      x-codeSamples: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PrivateFiatFiatAccessRequest"
            example:
              id: "3"
              method: private/fiat/fiat-access
              api_key: YOUR_API_KEY
              sig: DIGITAL_SIGNATURE
              nonce: "1773372503821"
              params: {}
      responses:
        "200":
          description: Success.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateFiatFiatAccessResponse"
              example:
                id: "3"
                method: private/fiat/fiat-access
                code: "0"
                result:
                  accesses:
                    - currency: USD
                      payment_network: us_ach
                      is_deposit_enable: true
                      is_withdraw_enable: true
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateFiatFiatAccessResponse"
              example:
                id: "1"
                method: private/fiat/fiat-access
                code: "40001"
                message: BAD_REQUEST
        "401":
          description: Unauthorized.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateFiatFiatAccessResponse"
              example:
                id: "1"
                method: private/fiat/fiat-access
                code: "40101"
                message: UNAUTHORIZED
        "408":
          description: Request timeout.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateFiatFiatAccessResponse"
              example:
                id: "1"
                method: private/fiat/fiat-access
                code: "40801"
                message: REQUEST_TIMEOUT
        "429":
          description: Too many requests.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateFiatFiatAccessResponse"
              example:
                id: "1"
                method: private/fiat/fiat-access
                code: "42901"
                message: TOO_MANY_REQUESTS
        "500":
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateFiatFiatAccessResponse"
              example:
                id: "1"
                method: private/fiat/fiat-access
                code: "50001"
                message: INTERNAL_SERVER_ERROR
components:
  schemas:
    PrivateFiatFiatAccessRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - api_key
        - sig
        - nonce
        - on_behalf_of_account_uuid
        - params
      description: Request body for private/fiat/fiat-access. Used by FCM/DCM brokers to check fiat access permissions on behalf of their users.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/fiat/fiat-access"
          example: private/fiat/fiat-access
        api_key:
          type: string
          description: Your API key (only required for private REST)
        sig:
          type: string
          description: HMAC-SHA256 signature in hex (only required for private REST)
        nonce:
          type: string
          format: int64
          description: Current timestamp in milliseconds, e.g. "1773372503821".
        on_behalf_of_account_uuid:
          type: string
          description: The account UUID of the user on whose behalf the broker is making the request
        params:
          type: object
          properties: {}
    PrivateFiatFiatAccessResponse:
      type: object
      description: |
        Response for private/fiat/fiat-access (HTTP 200/4xx/5xx).
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
          description: Present when code === 0. Contains accesses array.
          required:
            - accesses
          properties:
            accesses:
              type: array
              description: List of fiat access permissions
              items:
                type: object
                required:
                  - currency
                  - payment_network
                  - is_deposit_enable
                  - is_withdraw_enable
                properties:
                  currency:
                    type: string
                    description: Currency code (e.g., USD)
                  payment_network:
                    type: string
                    description: Payment network identifier (e.g., us_ach)
                  is_deposit_enable:
                    type: boolean
                    description: Whether deposits are enabled for this currency/network
                  is_withdraw_enable:
                    type: boolean
                    description: Whether withdrawals are enabled for this currency/network
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
```
