# public/get-deposit-instruments

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/public-get-deposit-instruments

- **Method:** `GET`
- **Path:** `/public/get-deposit-instruments`
- **Tags:** Reference and Market Data

Returns the list of instruments eligible for deposit and use as collateral.

## Responses

### 200 Success.

#### Example

```json
{
  "id": "-1",
  "method": "public/get-deposit-instruments",
  "code": "0",
  "result": [
    {
      "symbol": "USD",
      "inst_type": "CCY",
      "display_name": "USD",
      "base_ccy": "USD",
      "quote_ccy": "USD",
      "quote_decimals": 8,
      "quantity_decimals": 8,
      "haircut": "1.0",
      "collateral_eligible": false,
      "price_tick_size": "0.00000001",
      "qty_tick_size": "0.00000001",
      "max_leverage": "1",
      "tradable": false,
      "expiry_timestamp_ms": 0,
      "beta_product": false,
      "conversion_fee": "0.40",
      "margin_buy_enabled": false,
      "margin_sell_enabled": false,
      "inst_id": 12345
    }
  ]
}
```

### 400 Bad request.

#### Example

```json
{
  "id": "-1",
  "method": "public/get-deposit-instruments",
  "code": "40001",
  "message": "BAD_REQUEST"
}
```

### 408 Request timeout.

#### Example

```json
{
  "id": "-1",
  "method": "public/get-deposit-instruments",
  "code": "40801",
  "message": "REQUEST_TIMEOUT"
}
```

### 429 Too many requests.

#### Example

```json
{
  "id": "-1",
  "method": "public/get-deposit-instruments",
  "code": "42901",
  "message": "TOO_MANY_REQUESTS"
}
```

### 500 Internal server error.

#### Example

```json
{
  "id": "-1",
  "method": "public/get-deposit-instruments",
  "code": "50001",
  "message": "INTERNAL_SERVER_ERROR"
}
```

## Code Examples

### cURL

```curl
curl -X GET "https://api.crypto.com/exchange/v1/public/get-deposit-instruments" \
  -H "Content-Type: application/json"
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: public/get-deposit-instruments
  version: 1.0.0
servers:
  - url: https://api.crypto.com/exchange/v1
    description: Production
  - url: https://uat-api.3ona.co/exchange/v1
    description: UAT Sandbox
paths:
  /public/get-deposit-instruments:
    get:
      tags:
        - Reference and Market Data
      x-business-units:
        - exchange
        - fcm
        - fcm-b2c
        - fcm-margined
        - fcm-b2c-margined
      x-apply-to:
        - rest
      summary: public/get-deposit-instruments
      description: Returns the list of instruments eligible for deposit and use as collateral.
      operationId: publicGetDepositInstruments
      x-codeSamples:
        - lang: cURL
          label: cURL
          source: |
            curl -X GET "https://api.crypto.com/exchange/v1/public/get-deposit-instruments" \
              -H "Content-Type: application/json"
      responses:
        "200":
          description: Success.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PublicGetDepositInstrumentsResponse"
              example:
                id: "-1"
                method: public/get-deposit-instruments
                code: "0"
                result:
                  - symbol: USD
                    inst_type: CCY
                    display_name: USD
                    base_ccy: USD
                    quote_ccy: USD
                    quote_decimals: 8
                    quantity_decimals: 8
                    haircut: "1.0"
                    collateral_eligible: false
                    price_tick_size: "0.00000001"
                    qty_tick_size: "0.00000001"
                    max_leverage: "1"
                    tradable: false
                    expiry_timestamp_ms: 0
                    beta_product: false
                    conversion_fee: "0.40"
                    margin_buy_enabled: false
                    margin_sell_enabled: false
                    inst_id: 12345
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PublicGetDepositInstrumentsResponse"
              example:
                id: "-1"
                method: public/get-deposit-instruments
                code: "40001"
                message: BAD_REQUEST
        "408":
          description: Request timeout.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PublicGetDepositInstrumentsResponse"
              example:
                id: "-1"
                method: public/get-deposit-instruments
                code: "40801"
                message: REQUEST_TIMEOUT
        "429":
          description: Too many requests.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PublicGetDepositInstrumentsResponse"
              example:
                id: "-1"
                method: public/get-deposit-instruments
                code: "42901"
                message: TOO_MANY_REQUESTS
        "500":
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PublicGetDepositInstrumentsResponse"
              example:
                id: "-1"
                method: public/get-deposit-instruments
                code: "50001"
                message: INTERNAL_SERVER_ERROR
components:
  schemas:
    PublicGetDepositInstrumentsResponse:
      type: object
      x-archetype: Response
      x-business-units:
        - exchange
        - fcm
        - fcm-non-us
        - fcm-b2c
        - fcm-margined
        - fcm-non-us-margined
        - fcm-b2c-margined
      description: Response for public/get-deposit-instruments.
      properties:
        id:
          type: string
          format: int64
          description: Original request identifier
        method:
          type: string
          description: Method name
          example: public/get-deposit-instruments
        code:
          type: string
          format: int32
          description: 0 for success; error code otherwise
        message:
          type: string
          description: Error message for non-zero codes
        result:
          type: array
          description: List of instruments eligible for deposit and collateral.
          items:
            type: object
            properties:
              symbol:
                type: string
                description: Instrument symbol
              inst_type:
                type: string
                description: Instrument type (e.g. CCY)
              display_name:
                type: string
                description: Display name
              base_ccy:
                type: string
                description: Base currency
              quote_ccy:
                type: string
                description: Quote currency
              quote_decimals:
                type: integer
                description: Decimal places for quote currency
              quantity_decimals:
                type: integer
                description: Decimal places for quantity
              haircut:
                type: string
                description: Haircut rate (decimal string)
              collateral_eligible:
                type: boolean
                description: Whether eligible as collateral
              price_tick_size:
                type: string
                description: Minimum price increment
              qty_tick_size:
                type: string
                description: Minimum quantity increment
              max_leverage:
                type: string
                description: Maximum leverage
              tradable:
                type: boolean
                description: Whether the instrument is tradable
              expiry_timestamp_ms:
                type: integer
                format: int64
                description: Expiry timestamp (epoch ms). 0 if no expiry.
              beta_product:
                type: boolean
                description: Whether this is a beta product
              conversion_fee:
                type: string
                description: Conversion fee rate
              margin_buy_enabled:
                type: boolean
                description: Whether margin buy is enabled
              margin_sell_enabled:
                type: boolean
                description: Whether margin sell is enabled
              inst_id:
                type: integer
                format: int64
                description: Internal instrument ID
```
