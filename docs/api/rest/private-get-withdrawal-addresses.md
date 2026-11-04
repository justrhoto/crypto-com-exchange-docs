# private/get-withdrawal-addresses

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/private-get-withdrawal-addresses

- **Method:** `POST`
- **Path:** `/private/get-withdrawal-addresses`
- **Tags:** Crypto Wallet

Lists the caller's saved (whitelisted) withdrawal addresses. Returns only active addresses, newest first. Filter by `currency`, `network_id`, or both; an unknown value returns an empty list rather than an error.

## Request Body

### Parameters

- `currency` (string) - Exact currency symbol, e.g. USDC. Empty string treated as not set.
- `network_id` (string) - Exact network id as returned by private/get-currency-networks. Empty string treated as not set.
- `page` (string (int32)) - Zero-based page number (Default: 0). Negative value returns BAD_REQUEST.
- `page_size` (string (int32)) - Page size (Default: 20, Max: 200). Must be > 0.

## Responses

### 200 Success.

#### Result

- `withdrawal_address_list` (array of object) - Saved withdrawal addresses, newest first. Empty when nothing matches.
  Array of objects:
  - `address` (string) - Wallet address. If the network uses an address tag, the tag is appended as a query param, e.g. tcro1...?memo=123.
  - `create_time` (string (int64)) - When the address was saved, in epoch milliseconds.
  - `currency` (string) - Currency symbol, e.g. USDC.
  - `id` (string) - Address-book entry id.
  - `is_owner_of_address` (boolean) - Whether the user marked this address as their own wallet.
  - `label` (string) - User-chosen label.
  - `network_id` (string) - Network id, e.g. ETH.
  - `wallet_type` (string) - Wallet type, e.g. Crypto.com, Others.

#### Example

```json
{
  "id": "1",
  "method": "private/get-withdrawal-addresses",
  "code": "0",
  "result": {
    "withdrawal_address_list": [
      {
        "id": "59505",
        "currency": "CRO",
        "network_id": "CRONOS",
        "address": "0x4f07991e18af0BCF90d142c798bCB48fD038A424",
        "label": "test",
        "create_time": "1764137135000",
        "is_owner_of_address": true,
        "wallet_type": "Crypto.com"
      },
      {
        "id": "59226",
        "currency": "USDC",
        "network_id": "ETH",
        "address": "0x30509945d2B329Cc253A8Bb2E2c54bDBb08B1070",
        "label": "Ethereum",
        "create_time": "1756968443000",
        "is_owner_of_address": true,
        "wallet_type": "Others"
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
  "method": "private/get-withdrawal-addresses",
  "code": "10004",
  "message": "BAD_REQUEST"
}
```

### 401 Unauthorized.

#### Example

```json
{
  "id": "1",
  "method": "private/get-withdrawal-addresses",
  "code": "10002",
  "message": "UNAUTHORIZED"
}
```

### 408 Request timeout.

#### Example

```json
{
  "id": "1",
  "method": "private/get-withdrawal-addresses",
  "code": "40801",
  "message": "REQUEST_TIMEOUT"
}
```

### 429 Too many requests.

#### Example

```json
{
  "id": "1",
  "method": "private/get-withdrawal-addresses",
  "code": "40901",
  "message": "TOO_MANY_REQUESTS"
}
```

### 500 Internal server error.

#### Example

```json
{
  "id": "1",
  "method": "private/get-withdrawal-addresses",
  "code": "50001",
  "message": "INTERNAL_SERVER_ERROR"
}
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: private/get-withdrawal-addresses
  version: 1.0.0
servers:
  - url: https://api.crypto.com/exchange/v1
    description: Production
  - url: https://uat-api.3ona.co/exchange/v1
    description: UAT Sandbox
paths:
  /private/get-withdrawal-addresses:
    post:
      tags:
        - Crypto Wallet
      x-apply-to:
        - rest
      x-business-units:
        - exchange
        - exchange-caas
      summary: private/get-withdrawal-addresses
      description: Lists the caller's saved (whitelisted) withdrawal addresses. Returns only active addresses, newest first. Filter by `currency`, `network_id`, or both; an unknown value returns an empty list rather than an error.
      operationId: privateGetWithdrawalAddresses
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PrivateGetWithdrawalAddressesRequest"
            examples:
              noParams:
                summary: All addresses (no filters)
                value:
                  id: "1"
                  method: private/get-withdrawal-addresses
                  api_key: YOUR_API_KEY
                  sig: DIGITAL_SIGNATURE
                  nonce: "1760000000000"
                  params: {}
              byCurrency:
                summary: Filter by currency
                value:
                  id: "3"
                  method: private/get-withdrawal-addresses
                  api_key: YOUR_API_KEY
                  sig: DIGITAL_SIGNATURE
                  nonce: "1760000000000"
                  params:
                    currency: USDC
              byCurrencyAndNetwork:
                summary: Filter by currency and network
                value:
                  id: "5"
                  method: private/get-withdrawal-addresses
                  api_key: YOUR_API_KEY
                  sig: DIGITAL_SIGNATURE
                  nonce: "1760000000000"
                  params:
                    currency: USDC
                    network_id: ETH
              paged:
                summary: Second page
                value:
                  id: "7"
                  method: private/get-withdrawal-addresses
                  api_key: YOUR_API_KEY
                  sig: DIGITAL_SIGNATURE
                  nonce: "1760000000000"
                  params:
                    page_size: "2"
                    page: "1"
      responses:
        "200":
          description: Success.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateGetWithdrawalAddressesResponse"
              example:
                id: "1"
                method: private/get-withdrawal-addresses
                code: "0"
                result:
                  withdrawal_address_list:
                    - id: "59505"
                      currency: CRO
                      network_id: CRONOS
                      address: "0x4f07991e18af0BCF90d142c798bCB48fD038A424"
                      label: test
                      create_time: "1764137135000"
                      is_owner_of_address: true
                      wallet_type: Crypto.com
                    - id: "59226"
                      currency: USDC
                      network_id: ETH
                      address: "0x30509945d2B329Cc253A8Bb2E2c54bDBb08B1070"
                      label: Ethereum
                      create_time: "1756968443000"
                      is_owner_of_address: true
                      wallet_type: Others
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateGetWithdrawalAddressesResponse"
              example:
                id: "1"
                method: private/get-withdrawal-addresses
                code: "10004"
                message: BAD_REQUEST
        "401":
          description: Unauthorized.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateGetWithdrawalAddressesResponse"
              example:
                id: "1"
                method: private/get-withdrawal-addresses
                code: "10002"
                message: UNAUTHORIZED
        "408":
          description: Request timeout.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateGetWithdrawalAddressesResponse"
              example:
                id: "1"
                method: private/get-withdrawal-addresses
                code: "40801"
                message: REQUEST_TIMEOUT
        "429":
          description: Too many requests.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateGetWithdrawalAddressesResponse"
              example:
                id: "1"
                method: private/get-withdrawal-addresses
                code: "40901"
                message: TOO_MANY_REQUESTS
        "500":
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateGetWithdrawalAddressesResponse"
              example:
                id: "1"
                method: private/get-withdrawal-addresses
                code: "50001"
                message: INTERNAL_SERVER_ERROR
components:
  schemas:
    PrivateGetWithdrawalAddressesRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - api_key
        - sig
        - nonce
        - params
      description: Request body for private/get-withdrawal-addresses.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/get-withdrawal-addresses"
          example: private/get-withdrawal-addresses
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
          description: All fields optional. Use {} for no filters (returns all addresses).
          properties:
            currency:
              type: string
              description: Exact currency symbol, e.g. USDC. Empty string treated as not set.
            network_id:
              type: string
              description: Exact network id as returned by private/get-currency-networks. Empty string treated as not set.
            page_size:
              type: string
              format: int32
              description: "Page size (Default: 20, Max: 200). Must be > 0."
            page:
              type: string
              format: int32
              description: "Zero-based page number (Default: 0). Negative value returns BAD_REQUEST."
    PrivateGetWithdrawalAddressesResponse:
      type: object
      description: |
        Response for private/get-withdrawal-addresses (HTTP 200/4xx/5xx).
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
          description: Present when code === 0.
          properties:
            withdrawal_address_list:
              type: array
              description: Saved withdrawal addresses, newest first. Empty when nothing matches.
              items:
                type: object
                properties:
                  id:
                    type: string
                    description: Address-book entry id.
                  currency:
                    type: string
                    description: Currency symbol, e.g. USDC.
                  network_id:
                    type: string
                    description: Network id, e.g. ETH.
                  address:
                    type: string
                    description: Wallet address. If the network uses an address tag, the tag is appended as a query param, e.g. tcro1...?memo=123.
                  label:
                    type: string
                    description: User-chosen label.
                  create_time:
                    type: string
                    format: int64
                    description: When the address was saved, in epoch milliseconds.
                  is_owner_of_address:
                    type: boolean
                    description: Whether the user marked this address as their own wallet.
                  wallet_type:
                    type: string
                    description: Wallet type, e.g. Crypto.com, Others.
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
```
