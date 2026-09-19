# private/otc/get-otc-instruments

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/private-otc-get-otc-instruments

- **Method:** `POST`
- **Path:** `/private/otc/get-otc-instruments`
- **Tags:** OTC RFQ for Taker

Retrieves a list of available OTC instruments that takers can request quotes for.

## Request Body

### Example

```json
{
  "id": "12",
  "method": "private/otc/get-otc-instruments",
  "api_key": "YOUR_API_KEY",
  "sig": "DIGITAL_SIGNATURE",
  "nonce": "1610905028000",
  "params": {}
}
```

## Responses

### 200 Success.

#### Result

- `instrument_list` (array of object) - List of available OTC instruments.
  Array of objects:
  - `base_currency` (string) - Primary asset
  - `instrument_name` (string) - Trading pair identifier, e.g. BTC_USD
  - `price_tick_size` (string) - Minimum price increment
  - `qty_decimals` (integer) - Quantity decimal precision
  - `qty_tick_size` (string) - Minimum quantity increment
  - `quote_currency` (string) - Pricing asset
  - `quote_decimals` (integer) - Quote decimal precision
  - `type` (string) - Instrument classification, e.g. SPOT

#### Example

```json
{
  "id": 12,
  "method": "private/otc/get-otc-instruments",
  "code": 0,
  "result": {
    "instrument_list": [
      {
        "instrument_name": "BTC_USD",
        "base_currency": "BTC",
        "quote_currency": "USD",
        "type": "SPOT",
        "price_tick_size": "0.01",
        "quote_decimals": 2,
        "qty_tick_size": "0.00001",
        "qty_decimals": 5
      }
    ]
  }
}
```

### 400 Bad request.

#### Example

```json
{
  "id": "12",
  "method": "private/otc/get-otc-instruments",
  "code": "40001",
  "message": "BAD_REQUEST"
}
```

### 401 Unauthorized.

#### Example

```json
{
  "id": "12",
  "method": "private/otc/get-otc-instruments",
  "code": "40101",
  "message": "UNAUTHORIZED"
}
```

### 408 Request timeout.

#### Example

```json
{
  "id": "12",
  "method": "private/otc/get-otc-instruments",
  "code": "40801",
  "message": "REQUEST_TIMEOUT"
}
```

### 429 Too many requests.

#### Example

```json
{
  "id": "12",
  "method": "private/otc/get-otc-instruments",
  "code": "42901",
  "message": "TOO_MANY_REQUESTS"
}
```

### 500 Internal server error.

#### Example

```json
{
  "id": "12",
  "method": "private/otc/get-otc-instruments",
  "code": "50001",
  "message": "INTERNAL_SERVER_ERROR"
}
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: private/otc/get-otc-instruments
  version: 1.0.0
servers:
  - url: https://api.crypto.com/exchange/v1
    description: Production
  - url: https://uat-api.3ona.co/exchange/v1
    description: UAT Sandbox
paths:
  /private/otc/get-otc-instruments:
    post:
      tags:
        - OTC RFQ for Taker
      x-apply-to:
        - rest
      summary: private/otc/get-otc-instruments
      description: Retrieves a list of available OTC instruments that takers can request quotes for.
      operationId: privateOtcGetOtcInstruments
      x-codeSamples: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PrivateOtcGetOtcInstrumentsRequest"
            example:
              id: "12"
              method: private/otc/get-otc-instruments
              api_key: YOUR_API_KEY
              sig: DIGITAL_SIGNATURE
              nonce: "1610905028000"
              params: {}
      responses:
        "200":
          description: Success.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateOtcGetOtcInstrumentsResponse"
              example:
                id: 12
                method: private/otc/get-otc-instruments
                code: 0
                result:
                  instrument_list:
                    - instrument_name: BTC_USD
                      base_currency: BTC
                      quote_currency: USD
                      type: SPOT
                      price_tick_size: "0.01"
                      quote_decimals: 2
                      qty_tick_size: "0.00001"
                      qty_decimals: 5
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateOtcGetOtcInstrumentsResponse"
              example:
                id: "12"
                method: private/otc/get-otc-instruments
                code: "40001"
                message: BAD_REQUEST
        "401":
          description: Unauthorized.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateOtcGetOtcInstrumentsResponse"
              example:
                id: "12"
                method: private/otc/get-otc-instruments
                code: "40101"
                message: UNAUTHORIZED
        "408":
          description: Request timeout.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateOtcGetOtcInstrumentsResponse"
              example:
                id: "12"
                method: private/otc/get-otc-instruments
                code: "40801"
                message: REQUEST_TIMEOUT
        "429":
          description: Too many requests.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateOtcGetOtcInstrumentsResponse"
              example:
                id: "12"
                method: private/otc/get-otc-instruments
                code: "42901"
                message: TOO_MANY_REQUESTS
        "500":
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateOtcGetOtcInstrumentsResponse"
              example:
                id: "12"
                method: private/otc/get-otc-instruments
                code: "50001"
                message: INTERNAL_SERVER_ERROR
components:
  schemas:
    PrivateOtcGetOtcInstrumentsRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - api_key
        - sig
        - nonce
        - params
      description: Request body for private/otc/get-otc-instruments. Retrieves available OTC instruments.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/otc/get-otc-instruments"
          example: private/otc/get-otc-instruments
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
          description: Empty object for this endpoint.
    PrivateOtcGetOtcInstrumentsResponse:
      type: object
      description: |
        Response for private/otc/get-otc-instruments (HTTP 200/4xx/5xx).
        code === 0 → success, result present with instrument_list.
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
            instrument_list:
              type: array
              description: List of available OTC instruments.
              items:
                $ref: "#/components/schemas/PrivateOtcGetOtcInstrumentsInstrumentItem"
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
    PrivateOtcGetOtcInstrumentsInstrumentItem:
      type: object
      description: OTC instrument details.
      properties:
        instrument_name:
          type: string
          description: Trading pair identifier, e.g. BTC_USD
        base_currency:
          type: string
          description: Primary asset
        quote_currency:
          type: string
          description: Pricing asset
        type:
          type: string
          description: Instrument classification, e.g. SPOT
        price_tick_size:
          type: string
          description: Minimum price increment
        quote_decimals:
          type: integer
          description: Quote decimal precision
        qty_tick_size:
          type: string
          description: Minimum quantity increment
        qty_decimals:
          type: integer
          description: Quantity decimal precision
```
