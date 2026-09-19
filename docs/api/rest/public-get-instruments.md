# public/get-instruments

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/public-get-instruments

- **Method:** `GET`
- **Path:** `/public/get-instruments`
- **Tags:** Reference and Market Data

Provides information on all supported instruments (e.g. BTCUSD-PERP).

## Parameters

### Query Parameters

- `event_symbols` (string) - Filter by up to 10 event symbols. Comma-separated.
- `is_combo` (boolean) - Filter for combo instruments.
- `PREDICT_CONTRACT_TYPE` (string) - Filter by predict contract type.

## Responses

### 200 Success.

#### Result

- `data` (array of object) - List of instruments.
  Array of objects:
  - `base_ccy` (string) - Base currency, e.g. BTC
  - `beta_product` (boolean) - Whether this is a beta product.
  - `contract_size` (string (decimal)) - Contract size for the instrument.
  - `display_name` (string) - Display name, e.g. BTCUSD Perpetual
  - `event_details` (object) - Event details for prediction market instruments. Structure is flexible and defined by external systems.
  - `expiry_timestamp_ms` (string (int64)) - Expiry timestamp in milliseconds
  - `inst_type` (string) - Instrument type, e.g. PERPETUAL_SWAP
  - `last_updated_time` (integer (int64)) - Unix timestamp in nanoseconds when the instrument was last updated.
  - `margin_buy_enabled` (boolean) - Whether margin buying is enabled for this instrument.
  - `margin_sell_enabled` (boolean) - Whether margin selling is enabled for this instrument.
  - `max_leverage` (string (decimal)) - Max leverage of the product
  - `price_tick_size` (string (decimal)) - Minimum price tick size
  - `product_type` (string) - Product type of the instrument. Possible values: COMMODITIES, EQUITY_IND, CURRENCIES, DIGITAL_CURRENCIES, EVENTS, EQUITY, PRE_IPO. Only returned if applicable.
  - `qty_tick_size` (string (decimal)) - Minimum trading quantity / tick size
  - `quantity_decimals` (string (int32)) - Minimum decimal place for qty field
  - `quote_ccy` (string) - Quote currency, e.g. USD
  - `quote_decimals` (string (int32)) - Minimum decimal place for price field
  - `symbol` (string) - Instrument name, e.g. BTCUSD-PERP
  - `tradable` (boolean) - True or false
  - `underlying_symbol` (string) - Underlying symbol
- `next_cursor` (string) - Cursor for pagination. Use this value in the cursor parameter of the next request.

#### Example

```json
{
  "id": "1",
  "method": "public/get-instruments",
  "code": "0",
  "result": {
    "data": [
      {
        "symbol": "BTCUSD-PERP",
        "inst_type": "PERPETUAL_SWAP",
        "display_name": "BTCUSD Perpetual",
        "base_ccy": "BTC",
        "quote_ccy": "USD",
        "quote_decimals": "2",
        "quantity_decimals": "4",
        "price_tick_size": "0.5",
        "qty_tick_size": "0.0001",
        "max_leverage": "50",
        "tradable": true,
        "expiry_timestamp_ms": "1624012801123",
        "underlying_symbol": "BTCUSD-INDEX",
        "product_type": "DIGITAL_CURRENCIES"
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
  "method": "public/get-instruments",
  "code": "40001",
  "message": "BAD_REQUEST"
}
```

### 408 Request timeout.

#### Example

```json
{
  "id": "1",
  "method": "public/get-instruments",
  "code": "40801",
  "message": "REQUEST_TIMEOUT"
}
```

### 429 Too many requests.

#### Example

```json
{
  "id": "1",
  "method": "public/get-instruments",
  "code": "42901",
  "message": "TOO_MANY_REQUESTS"
}
```

### 500 Internal server error.

#### Example

```json
{
  "id": "1",
  "method": "public/get-instruments",
  "code": "50001",
  "message": "INTERNAL_SERVER_ERROR"
}
```

## Code Examples

### cURL

```curl
curl -X GET "https://api.crypto.com/exchange/v1/public/get-instruments?event_symbols=MLB-00015-260724-M&is_combo=false&limit=100" \
  -H "Content-Type: application/json"
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: public/get-instruments
  version: 1.0.0
servers:
  - url: https://api.crypto.com/exchange/v1
    description: Production
  - url: https://uat-api.3ona.co/exchange/v1
    description: UAT Sandbox
paths:
  /public/get-instruments:
    get:
      tags:
        - Reference and Market Data
      x-parent-guide: prediction-reference-data
      x-apply-to:
        - rest
      summary: public/get-instruments
      description: Provides information on all supported instruments (e.g. BTCUSD-PERP).
      operationId: publicGetInstruments
      parameters:
        - name: event_symbols
          in: query
          required: false
          schema:
            type: string
            example: MLB-00015-260724-M
          description: Filter by up to 10 event symbols. Comma-separated.
        - name: is_combo
          in: query
          required: false
          schema:
            type: boolean
            example: false
          description: Filter for combo instruments.
        - name: PREDICT_CONTRACT_TYPE
          in: query
          required: false
          schema:
            type: string
            example: Total Goals
          description: Filter by predict contract type.
      x-codeSamples:
        - lang: cURL
          label: cURL
          source: |
            curl -X GET "https://api.crypto.com/exchange/v1/public/get-instruments?event_symbols=MLB-00015-260724-M&is_combo=false&limit=100" \
              -H "Content-Type: application/json"
      responses:
        "200":
          description: Success.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PublicGetInstrumentsResponse"
              example:
                id: "1"
                method: public/get-instruments
                code: "0"
                result:
                  data:
                    - symbol: BTCUSD-PERP
                      inst_type: PERPETUAL_SWAP
                      display_name: BTCUSD Perpetual
                      base_ccy: BTC
                      quote_ccy: USD
                      quote_decimals: "2"
                      quantity_decimals: "4"
                      price_tick_size: "0.5"
                      qty_tick_size: "0.0001"
                      max_leverage: "50"
                      tradable: true
                      expiry_timestamp_ms: "1624012801123"
                      underlying_symbol: BTCUSD-INDEX
                      product_type: DIGITAL_CURRENCIES
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PublicGetInstrumentsResponse"
              example:
                id: "1"
                method: public/get-instruments
                code: "40001"
                message: BAD_REQUEST
        "408":
          description: Request timeout.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PublicGetInstrumentsResponse"
              example:
                id: "1"
                method: public/get-instruments
                code: "40801"
                message: REQUEST_TIMEOUT
        "429":
          description: Too many requests.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PublicGetInstrumentsResponse"
              example:
                id: "1"
                method: public/get-instruments
                code: "42901"
                message: TOO_MANY_REQUESTS
        "500":
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PublicGetInstrumentsResponse"
              example:
                id: "1"
                method: public/get-instruments
                code: "50001"
                message: INTERNAL_SERVER_ERROR
components:
  schemas:
    PublicGetInstrumentsResponse:
      type: object
      description: |
        Response for public/get-instruments (HTTP 200/4xx/5xx).
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
          description: Present when code === 0. Instruments (data array).
          properties:
            data:
              type: array
              description: List of instruments.
              items:
                $ref: "#/components/schemas/InstrumentItem"
            next_cursor:
              type: string
              x-business-units:
                - fcm
                - dcm
              description: Cursor for pagination. Use this value in the cursor parameter of the next request.
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
    InstrumentItem:
      type: object
      description: Instrument information. Shared by REST public/get-instruments and WS instrument channel.
      properties:
        symbol:
          type: string
          description: Instrument name, e.g. BTCUSD-PERP
        inst_type:
          type: string
          description: Instrument type, e.g. PERPETUAL_SWAP
        display_name:
          type: string
          description: Display name, e.g. BTCUSD Perpetual
        base_ccy:
          type: string
          description: Base currency, e.g. BTC
        quote_ccy:
          type: string
          description: Quote currency, e.g. USD
        quote_decimals:
          type: string
          format: int32
          description: Minimum decimal place for price field
        quantity_decimals:
          type: string
          format: int32
          description: Minimum decimal place for qty field
        price_tick_size:
          type: string
          format: decimal
          description: Minimum price tick size
        qty_tick_size:
          type: string
          format: decimal
          description: Minimum trading quantity / tick size
        max_leverage:
          type: string
          format: decimal
          description: Max leverage of the product
        tradable:
          type: boolean
          description: True or false
        expiry_timestamp_ms:
          type: string
          format: int64
          description: Expiry timestamp in milliseconds
        beta_product:
          type: boolean
          x-business-units:
            - fcm
            - dcm
          description: Whether this is a beta product.
        underlying_symbol:
          type: string
          description: Underlying symbol
        product_type:
          type: string
          description: "Product type of the instrument. Possible values: COMMODITIES, EQUITY_IND, CURRENCIES, DIGITAL_CURRENCIES, EVENTS, EQUITY, PRE_IPO. Only returned if applicable."
        contract_size:
          type: string
          format: decimal
          x-business-units:
            - fcm
            - dcm
          description: Contract size for the instrument.
        margin_buy_enabled:
          type: boolean
          x-business-units:
            - fcm
            - dcm
          description: Whether margin buying is enabled for this instrument.
        margin_sell_enabled:
          type: boolean
          x-business-units:
            - fcm
            - dcm
          description: Whether margin selling is enabled for this instrument.
        event_details:
          type: object
          x-business-units:
            - fcm
            - dcm
          description: Event details for prediction market instruments. Structure is flexible and defined by external systems.
          additionalProperties: true
        last_updated_time:
          type: integer
          format: int64
          x-business-units:
            - fcm
            - dcm
          description: Unix timestamp in nanoseconds when the instrument was last updated.
```
