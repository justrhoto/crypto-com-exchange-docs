# private/get-deposit-history

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/private-get-deposit-history

- **Method:** `POST`
- **Path:** `/private/get-deposit-history`
- **Tags:** Crypto Wallet

Fetches deposit history. If you do not see the option when viewing your API Keys, this feature is not yet available for you.

## Request Body

### Parameters

- `currency` (string) - E.g. BTC, CRO.
- `end_ts` (string (int64)) - End time (ms), e.g. "1771761038000". Default is current timestamp.
- `page` (string (int32)) - Page number (0-based).
- `page_size` (string (int32)) - Page size (Default: 20, Max: 200).
- `start_ts` (string (int64)) - Start time (ms), e.g. "1771761038000". Default is 90 days from current timestamp.
- `status` (enum: 0 | 1 | 2 | 3) - Deposit status. Used in private/get-deposit-history request (filter) and response (deposit_list[].status).

### Example

```json
{
  "id": "-1",
  "method": "private/get-deposit-history",
  "api_key": "YOUR_API_KEY",
  "sig": "DIGITAL_SIGNATURE",
  "nonce": "1587846358253",
  "params": {
    "currency": "XRP",
    "start_ts": "1587846300000",
    "end_ts": "1587846358253",
    "page_size": "2",
    "page": "0",
    "status": "1"
  }
}
```

## Responses

### 200 Success.

#### Result

- `deposit_list` (array of object) - List of deposits.
  Array of objects:
  - `address` (string) - Address with Address Tag (if any).
  - `amount` (string (decimal)) - Deposit amount.
  - `create_time` (string (int64)) - Creation time (ms).
  - `currency` (string) - E.g. BTC, CRO.
  - `fee` (string (decimal)) - Deposit fee.
  - `id` (string) - Newly created deposit ID.
  - `status` (enum: 0 | 1 | 2 | 3) - Deposit status. Used in private/get-deposit-history request (filter) and response (deposit_list[].status).
  - `update_time` (string (int64)) - Last update time (ms).

#### Example

```json
{
  "id": "11",
  "method": "private/get-deposit-history",
  "code": "0",
  "result": {
    "deposit_list": [
      {
        "currency": "XRP",
        "fee": "1.0",
        "create_time": "1607063412000",
        "id": "2220",
        "update_time": "1607063460000",
        "amount": "100",
        "address": "2NBqqD5GRJ8wHy1PYyCXTe9ke5226FhavBf?1234567890",
        "status": "1"
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
  "method": "private/get-deposit-history",
  "code": "40001",
  "message": "BAD_REQUEST"
}
```

### 401 Unauthorized.

#### Example

```json
{
  "id": "1",
  "method": "private/get-deposit-history",
  "code": "40101",
  "message": "UNAUTHORIZED"
}
```

### 408 Request timeout.

#### Example

```json
{
  "id": "1",
  "method": "private/get-deposit-history",
  "code": "40801",
  "message": "REQUEST_TIMEOUT"
}
```

### 429 Too many requests.

#### Example

```json
{
  "id": "1",
  "method": "private/get-deposit-history",
  "code": "42901",
  "message": "TOO_MANY_REQUESTS"
}
```

### 500 Internal server error.

#### Example

```json
{
  "id": "1",
  "method": "private/get-deposit-history",
  "code": "50001",
  "message": "INTERNAL_SERVER_ERROR"
}
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: private/get-deposit-history
  version: 1.0.0
servers:
  - url: https://api.crypto.com/exchange/v1
    description: Production
  - url: https://uat-api.3ona.co/exchange/v1
    description: UAT Sandbox
paths:
  /private/get-deposit-history:
    post:
      tags:
        - Crypto Wallet
      x-apply-to:
        - rest
      summary: private/get-deposit-history
      description: Fetches deposit history. If you do not see the option when viewing your API Keys, this feature is not yet available for you.
      operationId: privateGetDepositHistory
      x-codeSamples: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PrivateGetDepositHistoryRequest"
            example:
              id: "-1"
              method: private/get-deposit-history
              api_key: YOUR_API_KEY
              sig: DIGITAL_SIGNATURE
              nonce: "1587846358253"
              params:
                currency: XRP
                start_ts: "1587846300000"
                end_ts: "1587846358253"
                page_size: "2"
                page: "0"
                status: "1"
      responses:
        "200":
          description: Success.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateGetDepositHistoryResponse"
              example:
                id: "11"
                method: private/get-deposit-history
                code: "0"
                result:
                  deposit_list:
                    - currency: XRP
                      fee: "1.0"
                      create_time: "1607063412000"
                      id: "2220"
                      update_time: "1607063460000"
                      amount: "100"
                      address: 2NBqqD5GRJ8wHy1PYyCXTe9ke5226FhavBf?1234567890
                      status: "1"
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateGetDepositHistoryResponse"
              example:
                id: "1"
                method: private/get-deposit-history
                code: "40001"
                message: BAD_REQUEST
        "401":
          description: Unauthorized.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateGetDepositHistoryResponse"
              example:
                id: "1"
                method: private/get-deposit-history
                code: "40101"
                message: UNAUTHORIZED
        "408":
          description: Request timeout.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateGetDepositHistoryResponse"
              example:
                id: "1"
                method: private/get-deposit-history
                code: "40801"
                message: REQUEST_TIMEOUT
        "429":
          description: Too many requests.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateGetDepositHistoryResponse"
              example:
                id: "1"
                method: private/get-deposit-history
                code: "42901"
                message: TOO_MANY_REQUESTS
        "500":
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateGetDepositHistoryResponse"
              example:
                id: "1"
                method: private/get-deposit-history
                code: "50001"
                message: INTERNAL_SERVER_ERROR
components:
  schemas:
    PrivateGetDepositHistoryRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - api_key
        - sig
        - nonce
        - params
      description: Request body for private/get-deposit-history.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/get-deposit-history"
          example: private/get-deposit-history
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
            currency:
              type: string
              description: E.g. BTC, CRO.
            start_ts:
              type: string
              format: int64
              description: Start time (ms), e.g. "1771761038000". Default is 90 days from current timestamp.
            end_ts:
              type: string
              format: int64
              description: End time (ms), e.g. "1771761038000". Default is current timestamp.
            page_size:
              type: string
              format: int32
              description: "Page size (Default: 20, Max: 200)."
            page:
              type: string
              format: int32
              description: Page number (0-based).
            status:
              $ref: "#/components/schemas/DepositStatus"
    DepositStatus:
      type: string
      enum:
        - "0"
        - "1"
        - "2"
        - "3"
      description: |
        Deposit status. Used in private/get-deposit-history request (filter) and response (deposit_list[].status).
        - ➖ 0: Not Arrived
        - ➖ 1: Arrived
        - ➖ 2: Failed
        - ➖ 3: Pending
    PrivateGetDepositHistoryResponse:
      type: object
      description: |
        Response for private/get-deposit-history (HTTP 200/4xx/5xx).
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
          description: Present when code === 0. deposit_list (currency, fee, create_time, id, update_time, amount, address, status).
          properties:
            deposit_list:
              type: array
              description: List of deposits.
              items:
                type: object
                properties:
                  id:
                    type: string
                    description: Newly created deposit ID.
                  currency:
                    type: string
                    description: E.g. BTC, CRO.
                  amount:
                    type: string
                    format: decimal
                    description: Deposit amount.
                  fee:
                    type: string
                    format: decimal
                    description: Deposit fee.
                  address:
                    type: string
                    description: Address with Address Tag (if any).
                  create_time:
                    type: string
                    format: int64
                    description: Creation time (ms).
                  update_time:
                    type: string
                    format: int64
                    description: Last update time (ms).
                  status:
                    $ref: "#/components/schemas/DepositStatus"
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
```
