# private/create-withdrawal

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/private-create-withdrawal

- **Method:** `POST`
- **Path:** `/private/create-withdrawal`
- **Tags:** Crypto Wallet

Creates a withdrawal request. Withdrawal setting must be enabled for your API Key. If you do not see the option when viewing your API Key, this feature is not yet available for you.

## Request Body

### Parameters

- `address` (string **required**) - Destination address (must be whitelisted).
- `amount` (string (decimal) **required**) - Withdrawal amount.
- `currency` (string **required**) - E.g. BTC, CRO.
- `address_tag` (string) - Secondary address identifier for coins like XRP, XLM (memo or tag).
- `client_wid` (string) - Optional Client withdrawal ID.
- `network_id` (string) - Desired network; address must be whitelisted. See default_network and network in get-currency-networks.

### Example

```json
{
  "id": "-1",
  "method": "private/create-withdrawal",
  "api_key": "YOUR_API_KEY",
  "sig": "DIGITAL_SIGNATURE",
  "nonce": "1607063412000",
  "params": {
    "client_wid": "my_withdrawal_002",
    "currency": "BTC",
    "amount": "1",
    "address": "2NBqqD5GRJ8wHy1PYyCXTe9ke5226FhavBf",
    "address_tag": "",
    "network_id": null
  }
}
```

## Responses

### 200 Success.

#### Result

- `address` (string) - Address with Address Tag (if any).
- `amount` (string (decimal)) - Withdrawal amount.
- `client_wid` (string) - (Optional) Client withdrawal ID if provided in the request.
- `create_time` (string (int64)) - Creation time (ms).
- `currency` (string) - E.g. BTC, CRO.
- `fee` (string (decimal)) - Withdrawal fee.
- `id` (string (int64)) - Newly created withdrawal ID.

#### Example

```json
{
  "id": "-1",
  "method": "private/create-withdrawal",
  "code": "0",
  "result": {
    "id": "2220",
    "amount": "1",
    "fee": "0.0004",
    "symbol": "BTC",
    "address": "2NBqqD5GRJ8wHy1PYyCXTe9ke5226FhavBf",
    "client_wid": "my_withdrawal_002",
    "create_time": "1607063412000",
    "network_id": null
  }
}
```

### 400 Bad request.

#### Example

```json
{
  "id": "1",
  "method": "private/create-withdrawal",
  "code": "40001",
  "message": "BAD_REQUEST"
}
```

### 401 Unauthorized.

#### Example

```json
{
  "id": "1",
  "method": "private/create-withdrawal",
  "code": "40101",
  "message": "UNAUTHORIZED"
}
```

### 408 Request timeout.

#### Example

```json
{
  "id": "1",
  "method": "private/create-withdrawal",
  "code": "40801",
  "message": "REQUEST_TIMEOUT"
}
```

### 429 Too many requests.

#### Example

```json
{
  "id": "1",
  "method": "private/create-withdrawal",
  "code": "42901",
  "message": "TOO_MANY_REQUESTS"
}
```

### 500 Internal server error.

#### Example

```json
{
  "id": "1",
  "method": "private/create-withdrawal",
  "code": "50001",
  "message": "INTERNAL_SERVER_ERROR"
}
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: private/create-withdrawal
  version: 1.0.0
servers:
  - url: https://api.crypto.com/exchange/v1
    description: Production
  - url: https://uat-api.3ona.co/exchange/v1
    description: UAT Sandbox
paths:
  /private/create-withdrawal:
    post:
      tags:
        - Crypto Wallet
      x-apply-to:
        - rest
      summary: private/create-withdrawal
      description: Creates a withdrawal request. Withdrawal setting must be enabled for your API Key. If you do not see the option when viewing your API Key, this feature is not yet available for you.
      operationId: privateCreateWithdrawal
      x-codeSamples: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PrivateCreateWithdrawalRequest"
            example:
              id: "-1"
              method: private/create-withdrawal
              api_key: YOUR_API_KEY
              sig: DIGITAL_SIGNATURE
              nonce: "1607063412000"
              params:
                client_wid: my_withdrawal_002
                currency: BTC
                amount: "1"
                address: 2NBqqD5GRJ8wHy1PYyCXTe9ke5226FhavBf
                address_tag: ""
                network_id: null
      responses:
        "200":
          description: Success.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCreateWithdrawalResponse"
              example:
                id: "-1"
                method: private/create-withdrawal
                code: "0"
                result:
                  id: "2220"
                  amount: "1"
                  fee: "0.0004"
                  symbol: BTC
                  address: 2NBqqD5GRJ8wHy1PYyCXTe9ke5226FhavBf
                  client_wid: my_withdrawal_002
                  create_time: "1607063412000"
                  network_id: null
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCreateWithdrawalResponse"
              example:
                id: "1"
                method: private/create-withdrawal
                code: "40001"
                message: BAD_REQUEST
        "401":
          description: Unauthorized.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCreateWithdrawalResponse"
              example:
                id: "1"
                method: private/create-withdrawal
                code: "40101"
                message: UNAUTHORIZED
        "408":
          description: Request timeout.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCreateWithdrawalResponse"
              example:
                id: "1"
                method: private/create-withdrawal
                code: "40801"
                message: REQUEST_TIMEOUT
        "429":
          description: Too many requests.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCreateWithdrawalResponse"
              example:
                id: "1"
                method: private/create-withdrawal
                code: "42901"
                message: TOO_MANY_REQUESTS
        "500":
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCreateWithdrawalResponse"
              example:
                id: "1"
                method: private/create-withdrawal
                code: "50001"
                message: INTERNAL_SERVER_ERROR
components:
  schemas:
    PrivateCreateWithdrawalRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - api_key
        - sig
        - nonce
        - params
      description: Request body for private/create-withdrawal.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/create-withdrawal"
          example: private/create-withdrawal
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
            - amount
            - address
          properties:
            client_wid:
              type: string
              description: Optional Client withdrawal ID.
            currency:
              type: string
              example: BTC
              description: E.g. BTC, CRO.
            amount:
              type: string
              format: decimal
              description: Withdrawal amount.
            address:
              type: string
              description: Destination address (must be whitelisted).
            address_tag:
              type: string
              description: Secondary address identifier for coins like XRP, XLM (memo or tag).
            network_id:
              type: string
              description: Desired network; address must be whitelisted. See default_network and network in get-currency-networks.
    PrivateCreateWithdrawalResponse:
      type: object
      description: |
        Response for private/create-withdrawal (HTTP 200/4xx/5xx).
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
          description: Present when code === 0. currency and other fields per docs.
          properties:
            id:
              type: string
              format: int64
              description: Newly created withdrawal ID.
            client_wid:
              type: string
              description: (Optional) Client withdrawal ID if provided in the request.
            currency:
              type: string
              description: E.g. BTC, CRO.
            amount:
              type: string
              format: decimal
              description: Withdrawal amount.
            fee:
              type: string
              format: decimal
              description: Withdrawal fee.
            address:
              type: string
              description: Address with Address Tag (if any).
            create_time:
              type: string
              format: int64
              description: Creation time (ms).
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
```
