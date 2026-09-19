# private/get-deposit-address

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/private-get-deposit-address

- **Method:** `POST`
- **Path:** `/private/get-deposit-address`
- **Tags:** Crypto Wallet

Fetches deposit address. Withdrawal setting must be enabled for your API Key. If you do not see the option when viewing your API Keys, this feature is not yet available for you.

## Request Body

### Parameters

- `currency` (string **required**) - E.g. BTC, CRO.

### Example

```json
{
  "id": "-1",
  "method": "private/get-deposit-address",
  "api_key": "YOUR_API_KEY",
  "sig": "DIGITAL_SIGNATURE",
  "nonce": "1587846358253",
  "params": {
    "currency": "CRO"
  }
}
```

## Responses

### 200 Success.

#### Result

- `deposit_address_list` (array of object) - List of deposit addresses.
  Array of objects:
  - `address` (string) - Address with Address Tag (if any).
  - `create_time` (string (int64)) - Creation time (ms).
  - `currency` (string) - E.g. BTC, CRO.
  - `id` (string) - Newly created deposit ID.
  - `network` (string) - E.g. ETH, CRO. When currency = CRO, network = CRO is main net; network = ETH is ERC20 address.
  - `status` (string) - 0 = Inactive, 1 = Active.

#### Example

```json
{
  "id": "11",
  "method": "private/get-deposit-address",
  "code": "0",
  "result": {
    "deposit_address_list": [
      {
        "currency": "CRO",
        "create_time": "1615886328000",
        "id": "12345",
        "address": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "status": "1",
        "network": "CRO"
      },
      {
        "currency": "CRO",
        "create_time": "1615886332000",
        "id": "12346",
        "address": "yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy",
        "status": "1",
        "network": "ETH"
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
  "method": "private/get-deposit-address",
  "code": "40001",
  "message": "BAD_REQUEST"
}
```

### 401 Unauthorized.

#### Example

```json
{
  "id": "1",
  "method": "private/get-deposit-address",
  "code": "40101",
  "message": "UNAUTHORIZED"
}
```

### 408 Request timeout.

#### Example

```json
{
  "id": "1",
  "method": "private/get-deposit-address",
  "code": "40801",
  "message": "REQUEST_TIMEOUT"
}
```

### 429 Too many requests.

#### Example

```json
{
  "id": "1",
  "method": "private/get-deposit-address",
  "code": "42901",
  "message": "TOO_MANY_REQUESTS"
}
```

### 500 Internal server error.

#### Example

```json
{
  "id": "1",
  "method": "private/get-deposit-address",
  "code": "50001",
  "message": "INTERNAL_SERVER_ERROR"
}
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: private/get-deposit-address
  version: 1.0.0
servers:
  - url: https://api.crypto.com/exchange/v1
    description: Production
  - url: https://uat-api.3ona.co/exchange/v1
    description: UAT Sandbox
paths:
  /private/get-deposit-address:
    post:
      tags:
        - Crypto Wallet
      x-apply-to:
        - rest
      summary: private/get-deposit-address
      description: Fetches deposit address. Withdrawal setting must be enabled for your API Key. If you do not see the option when viewing your API Keys, this feature is not yet available for you.
      operationId: privateGetDepositAddress
      x-codeSamples: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PrivateGetDepositAddressRequest"
            example:
              id: "-1"
              method: private/get-deposit-address
              api_key: YOUR_API_KEY
              sig: DIGITAL_SIGNATURE
              nonce: "1587846358253"
              params:
                currency: CRO
      responses:
        "200":
          description: Success.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateGetDepositAddressResponse"
              example:
                id: "11"
                method: private/get-deposit-address
                code: "0"
                result:
                  deposit_address_list:
                    - currency: CRO
                      create_time: "1615886328000"
                      id: "12345"
                      address: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
                      status: "1"
                      network: CRO
                    - currency: CRO
                      create_time: "1615886332000"
                      id: "12346"
                      address: yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
                      status: "1"
                      network: ETH
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateGetDepositAddressResponse"
              example:
                id: "1"
                method: private/get-deposit-address
                code: "40001"
                message: BAD_REQUEST
        "401":
          description: Unauthorized.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateGetDepositAddressResponse"
              example:
                id: "1"
                method: private/get-deposit-address
                code: "40101"
                message: UNAUTHORIZED
        "408":
          description: Request timeout.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateGetDepositAddressResponse"
              example:
                id: "1"
                method: private/get-deposit-address
                code: "40801"
                message: REQUEST_TIMEOUT
        "429":
          description: Too many requests.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateGetDepositAddressResponse"
              example:
                id: "1"
                method: private/get-deposit-address
                code: "42901"
                message: TOO_MANY_REQUESTS
        "500":
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateGetDepositAddressResponse"
              example:
                id: "1"
                method: private/get-deposit-address
                code: "50001"
                message: INTERNAL_SERVER_ERROR
components:
  schemas:
    PrivateGetDepositAddressRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - api_key
        - sig
        - nonce
        - params
      description: Request body for private/get-deposit-address.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/get-deposit-address"
          example: private/get-deposit-address
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
            - currency
          properties:
            currency:
              type: string
              example: CRO
              description: E.g. BTC, CRO.
    PrivateGetDepositAddressResponse:
      type: object
      description: |
        Response for private/get-deposit-address (HTTP 200/4xx/5xx).
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
          description: Present when code === 0. deposit_address_list (currency, create_time, id, address, status, network).
          properties:
            deposit_address_list:
              type: array
              description: List of deposit addresses.
              items:
                type: object
                properties:
                  id:
                    type: string
                    description: Newly created deposit ID.
                  currency:
                    type: string
                    description: E.g. BTC, CRO.
                  network:
                    type: string
                    description: E.g. ETH, CRO. When currency = CRO, network = CRO is main net; network = ETH is ERC20 address.
                  address:
                    type: string
                    description: Address with Address Tag (if any).
                  create_time:
                    type: string
                    format: int64
                    description: Creation time (ms).
                  status:
                    type: string
                    description: 0 = Inactive, 1 = Active.
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
```
