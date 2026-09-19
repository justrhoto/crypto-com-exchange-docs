# private/fiat/fiat-transaction-limit

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/private-fiat-fiat-transaction-limit

- **Method:** `POST`
- **Path:** `/private/fiat/fiat-transaction-limit`
- **Tags:** Fiat Wallet

Retrieves transaction limits for a specific payment network.

## Request Body

### Parameters

- `payment_network` (string **required**) - Payment network identifier.

### Example

```json
{
  "id": "123456",
  "method": "private/fiat/fiat-transaction-limit",
  "api_key": "YOUR_API_KEY",
  "sig": "DIGITAL_SIGNATURE",
  "nonce": "1640995200000",
  "params": {
    "payment_network": "usd_cubix"
  }
}
```

## Responses

### 200 Success.

#### Result

- `deposit` (object **required**) - Deposit limits and information
  - `currency_daily_max_deposit_amount` (object) - Currency and amount pair (amount may be null to indicate no limit).
    - `amount` (string (decimal)) - Amount as string; null means no limit where applicable
    - `currency` (string) - Currency code (e.g., USD)
  - `currency_daily_max_transaction_count` (string (int32)) - Currency-level max daily transaction count (null/0 means no limit).
  - `currency_daily_transaction_count` (string (int32)) - Currency-level daily transaction count (null/0 means no limit).
  - `currency_monthly_max_deposit_amount` (object) - Currency and amount pair (amount may be null to indicate no limit).
    - `amount` (string (decimal)) - Amount as string; null means no limit where applicable
    - `currency` (string) - Currency code (e.g., USD)
  - `currency_monthly_max_transaction_count` (string (int32)) - Currency-level max monthly transaction count (null/0 means no limit).
  - `currency_monthly_transaction_count` (string (int32)) - Currency-level monthly transaction count (null/0 means no limit).
  - `daily_max_deposit_amount` (object) - Currency and amount pair (amount may be null to indicate no limit).
    - `amount` (string (decimal)) - Amount as string; null means no limit where applicable
    - `currency` (string) - Currency code (e.g., USD)
  - `daily_max_transaction_count` (string (int32)) - Maximum daily transaction count (null/0 means no limit).
  - `daily_quota` (string (int32)) - Daily quota count (null/0 means no limit).
  - `daily_transaction_count` (string (int32)) - Current daily transaction count (null/0 means no limit).
  - `fee_amount` (object) - Currency and amount pair (amount may be null to indicate no limit).
    - `amount` (string (decimal)) - Amount as string; null means no limit where applicable
    - `currency` (string) - Currency code (e.g., USD)
  - `min_deposit_amount` (object) - Currency and amount pair (amount may be null to indicate no limit).
    - `amount` (string (decimal)) - Amount as string; null means no limit where applicable
    - `currency` (string) - Currency code (e.g., USD)
  - `monthly_max_deposit_amount` (object) - Currency and amount pair (amount may be null to indicate no limit).
    - `amount` (string (decimal)) - Amount as string; null means no limit where applicable
    - `currency` (string) - Currency code (e.g., USD)
  - `monthly_max_transaction_count` (string (int32)) - Maximum monthly transaction count (null/0 means no limit).
  - `monthly_quota` (string (int32)) - Monthly quota count (null/0 means no limit).
  - `monthly_transaction_count` (string (int32)) - Current monthly transaction count (null/0 means no limit).
- `payment` (object **required**) - Payment limits and information
  - `auto_approve_max_payment_amount` (object) - Currency and amount pair (amount may be null to indicate no limit).
    - `amount` (string (decimal)) - Amount as string; null means no limit where applicable
    - `currency` (string) - Currency code (e.g., USD)
  - `bank_transfer_time` (object)
    - `max` (string (decimal))
    - `min` (string (decimal))
    - `unit` (string)
  - `bank_transfer_time_description` (string) - Human-readable bank transfer time description
  - `currency_daily_max_payment_amount` (object) - Currency and amount pair (amount may be null to indicate no limit).
    - `amount` (string (decimal)) - Amount as string; null means no limit where applicable
    - `currency` (string) - Currency code (e.g., USD)
  - `currency_daily_max_transaction_count` (string (int32)) - Currency-level max daily transaction count (null/0 means no limit).
  - `currency_daily_transaction_count` (string (int32)) - Currency-level daily transaction count.
  - `currency_monthly_max_payment_amount` (object) - Currency and amount pair (amount may be null to indicate no limit).
    - `amount` (string (decimal)) - Amount as string; null means no limit where applicable
    - `currency` (string) - Currency code (e.g., USD)
  - `currency_monthly_max_transaction_count` (string (int32)) - Currency-level max monthly transaction count (null/0 means no limit).
  - `currency_monthly_transaction_count` (string (int32)) - Currency-level monthly transaction count.
  - `daily_max_payment_amount` (object) - Currency and amount pair (amount may be null to indicate no limit).
    - `amount` (string (decimal)) - Amount as string; null means no limit where applicable
    - `currency` (string) - Currency code (e.g., USD)
  - `daily_max_transaction_count` (string (int32)) - Maximum daily transaction count (null/0 means no limit).
  - `daily_transaction_count` (string (int32)) - Current daily transaction count.
  - `fee_amount` (object) - Currency and amount pair (amount may be null to indicate no limit).
    - `amount` (string (decimal)) - Amount as string; null means no limit where applicable
    - `currency` (string) - Currency code (e.g., USD)
  - `full_name` (string) - Payment network full name
  - `min_payment_amount` (object) - Currency and amount pair (amount may be null to indicate no limit).
    - `amount` (string (decimal)) - Amount as string; null means no limit where applicable
    - `currency` (string) - Currency code (e.g., USD)
  - `monthly_max_payment_amount` (object) - Currency and amount pair (amount may be null to indicate no limit).
    - `amount` (string (decimal)) - Amount as string; null means no limit where applicable
    - `currency` (string) - Currency code (e.g., USD)
  - `monthly_max_transaction_count` (string (int32)) - Maximum monthly transaction count (null/0 means no limit).
  - `monthly_transaction_count` (string (int32)) - Current monthly transaction count.
  - `name` (string) - Payment network name
  - `refund_fee_amount` (object) - Currency and amount pair (amount may be null to indicate no limit).
    - `amount` (string (decimal)) - Amount as string; null means no limit where applicable
    - `currency` (string) - Currency code (e.g., USD)
  - `review_time` (object)
    - `max` (string (decimal))
    - `min` (string (decimal))
    - `unit` (string)
  - `review_time_description` (string) - Human-readable review time description

#### Example

```json
{
  "id": "0",
  "method": "private/fiat/fiat-transaction-limit",
  "code": "0",
  "result": {
    "deposit": {
      "min_deposit_amount": {
        "currency": "USD",
        "amount": "500"
      },
      "daily_max_deposit_amount": {
        "currency": "USD",
        "amount": null
      },
      "monthly_max_deposit_amount": {
        "currency": "USD",
        "amount": null
      },
      "currency_daily_max_deposit_amount": {
        "currency": "USD",
        "amount": null
      },
      "currency_monthly_max_deposit_amount": {
        "currency": "USD",
        "amount": null
      },
      "daily_quota": 0,
      "monthly_quota": 0,
      "daily_transaction_count": 0,
      "monthly_transaction_count": 0,
      "currency_daily_transaction_count": 0,
      "currency_monthly_transaction_count": 0,
      "fee_amount": {
        "currency": "USD",
        "amount": "0"
      },
      "daily_max_transaction_count": 0,
      "monthly_max_transaction_count": 0,
      "currency_daily_max_transaction_count": 0,
      "currency_monthly_max_transaction_count": 0
    },
    "payment": {
      "name": "CUBIX",
      "full_name": "CUBIX",
      "review_time_description": "1-2 working days",
      "review_time": {
        "min": "1",
        "max": "2",
        "unit": "working days"
      },
      "bank_transfer_time_description": "1-4 working days",
      "bank_transfer_time": {
        "min": "1",
        "max": "4",
        "unit": "working days"
      },
      "min_payment_amount": {
        "currency": "USD",
        "amount": "500"
      },
      "daily_max_payment_amount": {
        "currency": "USD",
        "amount": "5000000"
      },
      "monthly_max_payment_amount": {
        "currency": "USD",
        "amount": null
      },
      "auto_approve_max_payment_amount": {
        "currency": "USD",
        "amount": "5000000"
      },
      "currency_daily_max_payment_amount": {
        "currency": "USD",
        "amount": "10000000"
      },
      "currency_monthly_max_payment_amount": {
        "currency": "USD",
        "amount": null
      },
      "fee_amount": {
        "currency": "USD",
        "amount": "0"
      },
      "refund_fee_amount": {
        "currency": "USD",
        "amount": "0"
      },
      "daily_transaction_count": 0,
      "monthly_transaction_count": 0,
      "currency_daily_transaction_count": 0,
      "currency_monthly_transaction_count": 0,
      "daily_max_transaction_count": 0,
      "monthly_max_transaction_count": 0,
      "currency_daily_max_transaction_count": 0,
      "currency_monthly_max_transaction_count": 0
    }
  }
}
```

### 400 Bad request.

#### Example

```json
{
  "id": "1",
  "method": "private/fiat/fiat-transaction-limit",
  "code": "40001",
  "message": "BAD_REQUEST"
}
```

### 401 Unauthorized.

#### Example

```json
{
  "id": "1",
  "method": "private/fiat/fiat-transaction-limit",
  "code": "40101",
  "message": "UNAUTHORIZED"
}
```

### 408 Request timeout.

#### Example

```json
{
  "id": "1",
  "method": "private/fiat/fiat-transaction-limit",
  "code": "40801",
  "message": "REQUEST_TIMEOUT"
}
```

### 429 Too many requests.

#### Example

```json
{
  "id": "1",
  "method": "private/fiat/fiat-transaction-limit",
  "code": "42901",
  "message": "TOO_MANY_REQUESTS"
}
```

### 500 Internal server error.

#### Example

```json
{
  "id": "1",
  "method": "private/fiat/fiat-transaction-limit",
  "code": "50001",
  "message": "INTERNAL_SERVER_ERROR"
}
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: private/fiat/fiat-transaction-limit
  version: 1.0.0
servers:
  - url: https://api.crypto.com/exchange/v1
    description: Production
  - url: https://uat-api.3ona.co/exchange/v1
    description: UAT Sandbox
paths:
  /private/fiat/fiat-transaction-limit:
    post:
      tags:
        - Fiat Wallet
      x-apply-to:
        - rest
      summary: private/fiat/fiat-transaction-limit
      description: Retrieves transaction limits for a specific payment network.
      operationId: privateFiatFiatTransactionLimit
      x-codeSamples: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PrivateFiatFiatTransactionLimitRequest"
            example:
              id: "123456"
              method: private/fiat/fiat-transaction-limit
              api_key: YOUR_API_KEY
              sig: DIGITAL_SIGNATURE
              nonce: "1640995200000"
              params:
                payment_network: usd_cubix
      responses:
        "200":
          description: Success.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateFiatFiatTransactionLimitResponse"
              example:
                id: "0"
                method: private/fiat/fiat-transaction-limit
                code: "0"
                result:
                  deposit:
                    min_deposit_amount:
                      currency: USD
                      amount: "500"
                    daily_max_deposit_amount:
                      currency: USD
                      amount: null
                    monthly_max_deposit_amount:
                      currency: USD
                      amount: null
                    currency_daily_max_deposit_amount:
                      currency: USD
                      amount: null
                    currency_monthly_max_deposit_amount:
                      currency: USD
                      amount: null
                    daily_quota: 0
                    monthly_quota: 0
                    daily_transaction_count: 0
                    monthly_transaction_count: 0
                    currency_daily_transaction_count: 0
                    currency_monthly_transaction_count: 0
                    fee_amount:
                      currency: USD
                      amount: "0"
                    daily_max_transaction_count: 0
                    monthly_max_transaction_count: 0
                    currency_daily_max_transaction_count: 0
                    currency_monthly_max_transaction_count: 0
                  payment:
                    name: CUBIX
                    full_name: CUBIX
                    review_time_description: 1-2 working days
                    review_time:
                      min: "1"
                      max: "2"
                      unit: working days
                    bank_transfer_time_description: 1-4 working days
                    bank_transfer_time:
                      min: "1"
                      max: "4"
                      unit: working days
                    min_payment_amount:
                      currency: USD
                      amount: "500"
                    daily_max_payment_amount:
                      currency: USD
                      amount: "5000000"
                    monthly_max_payment_amount:
                      currency: USD
                      amount: null
                    auto_approve_max_payment_amount:
                      currency: USD
                      amount: "5000000"
                    currency_daily_max_payment_amount:
                      currency: USD
                      amount: "10000000"
                    currency_monthly_max_payment_amount:
                      currency: USD
                      amount: null
                    fee_amount:
                      currency: USD
                      amount: "0"
                    refund_fee_amount:
                      currency: USD
                      amount: "0"
                    daily_transaction_count: 0
                    monthly_transaction_count: 0
                    currency_daily_transaction_count: 0
                    currency_monthly_transaction_count: 0
                    daily_max_transaction_count: 0
                    monthly_max_transaction_count: 0
                    currency_daily_max_transaction_count: 0
                    currency_monthly_max_transaction_count: 0
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateFiatFiatTransactionLimitResponse"
              example:
                id: "1"
                method: private/fiat/fiat-transaction-limit
                code: "40001"
                message: BAD_REQUEST
        "401":
          description: Unauthorized.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateFiatFiatTransactionLimitResponse"
              example:
                id: "1"
                method: private/fiat/fiat-transaction-limit
                code: "40101"
                message: UNAUTHORIZED
        "408":
          description: Request timeout.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateFiatFiatTransactionLimitResponse"
              example:
                id: "1"
                method: private/fiat/fiat-transaction-limit
                code: "40801"
                message: REQUEST_TIMEOUT
        "429":
          description: Too many requests.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateFiatFiatTransactionLimitResponse"
              example:
                id: "1"
                method: private/fiat/fiat-transaction-limit
                code: "42901"
                message: TOO_MANY_REQUESTS
        "500":
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateFiatFiatTransactionLimitResponse"
              example:
                id: "1"
                method: private/fiat/fiat-transaction-limit
                code: "50001"
                message: INTERNAL_SERVER_ERROR
components:
  schemas:
    PrivateFiatFiatTransactionLimitRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - api_key
        - sig
        - nonce
        - params
      description: Request body for private/fiat/fiat-transaction-limit.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/fiat/fiat-transaction-limit"
          example: private/fiat/fiat-transaction-limit
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
            - payment_network
          properties:
            payment_network:
              type: string
              description: Payment network identifier.
    PrivateFiatFiatTransactionLimitResponse:
      type: object
      description: |
        Response for private/fiat/fiat-transaction-limit (HTTP 200/4xx/5xx).
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
          description: Present when code === 0. deposit and payment limits per docs.
          required:
            - deposit
            - payment
          properties:
            deposit:
              type: object
              description: Deposit limits and information
              properties:
                min_deposit_amount:
                  $ref: "#/components/schemas/CurrencyAmount"
                daily_max_deposit_amount:
                  $ref: "#/components/schemas/CurrencyAmount"
                monthly_max_deposit_amount:
                  $ref: "#/components/schemas/CurrencyAmount"
                currency_daily_max_deposit_amount:
                  $ref: "#/components/schemas/CurrencyAmount"
                currency_monthly_max_deposit_amount:
                  $ref: "#/components/schemas/CurrencyAmount"
                daily_quota:
                  type: string
                  format: int32
                  description: Daily quota count (null/0 means no limit).
                monthly_quota:
                  type: string
                  format: int32
                  description: Monthly quota count (null/0 means no limit).
                daily_transaction_count:
                  type: string
                  format: int32
                  description: Current daily transaction count (null/0 means no limit).
                monthly_transaction_count:
                  type: string
                  format: int32
                  description: Current monthly transaction count (null/0 means no limit).
                currency_daily_transaction_count:
                  type: string
                  format: int32
                  description: Currency-level daily transaction count (null/0 means no limit).
                currency_monthly_transaction_count:
                  type: string
                  format: int32
                  description: Currency-level monthly transaction count (null/0 means no limit).
                fee_amount:
                  $ref: "#/components/schemas/CurrencyAmount"
                daily_max_transaction_count:
                  type: string
                  format: int32
                  description: Maximum daily transaction count (null/0 means no limit).
                monthly_max_transaction_count:
                  type: string
                  format: int32
                  description: Maximum monthly transaction count (null/0 means no limit).
                currency_daily_max_transaction_count:
                  type: string
                  format: int32
                  description: Currency-level max daily transaction count (null/0 means no limit).
                currency_monthly_max_transaction_count:
                  type: string
                  format: int32
                  description: Currency-level max monthly transaction count (null/0 means no limit).
            payment:
              type: object
              description: Payment limits and information
              properties:
                name:
                  type: string
                  description: Payment network name
                full_name:
                  type: string
                  description: Payment network full name
                review_time_description:
                  type: string
                  description: Human-readable review time description
                review_time:
                  $ref: "#/components/schemas/FiatMinMaxUnit"
                bank_transfer_time_description:
                  type: string
                  description: Human-readable bank transfer time description
                bank_transfer_time:
                  $ref: "#/components/schemas/FiatMinMaxUnit"
                min_payment_amount:
                  $ref: "#/components/schemas/CurrencyAmount"
                daily_max_payment_amount:
                  $ref: "#/components/schemas/CurrencyAmount"
                monthly_max_payment_amount:
                  $ref: "#/components/schemas/CurrencyAmount"
                auto_approve_max_payment_amount:
                  $ref: "#/components/schemas/CurrencyAmount"
                currency_daily_max_payment_amount:
                  $ref: "#/components/schemas/CurrencyAmount"
                currency_monthly_max_payment_amount:
                  $ref: "#/components/schemas/CurrencyAmount"
                fee_amount:
                  $ref: "#/components/schemas/CurrencyAmount"
                refund_fee_amount:
                  $ref: "#/components/schemas/CurrencyAmount"
                daily_transaction_count:
                  type: string
                  format: int32
                  description: Current daily transaction count.
                monthly_transaction_count:
                  type: string
                  format: int32
                  description: Current monthly transaction count.
                currency_daily_transaction_count:
                  type: string
                  format: int32
                  description: Currency-level daily transaction count.
                currency_monthly_transaction_count:
                  type: string
                  format: int32
                  description: Currency-level monthly transaction count.
                daily_max_transaction_count:
                  type: string
                  format: int32
                  description: Maximum daily transaction count (null/0 means no limit).
                monthly_max_transaction_count:
                  type: string
                  format: int32
                  description: Maximum monthly transaction count (null/0 means no limit).
                currency_daily_max_transaction_count:
                  type: string
                  format: int32
                  description: Currency-level max daily transaction count (null/0 means no limit).
                currency_monthly_max_transaction_count:
                  type: string
                  format: int32
                  description: Currency-level max monthly transaction count (null/0 means no limit).
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
    CurrencyAmount:
      type: object
      description: Currency and amount pair (amount may be null to indicate no limit).
      properties:
        currency:
          type: string
          description: Currency code (e.g., USD)
        amount:
          type: string
          format: decimal
          nullable: true
          description: Amount as string; null means no limit where applicable
    FiatMinMaxUnit:
      type: object
      properties:
        min:
          type: string
          format: decimal
        max:
          type: string
          format: decimal
        unit:
          type: string
          example: working days
```
