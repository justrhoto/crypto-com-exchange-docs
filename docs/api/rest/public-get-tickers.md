# public/get-tickers

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/public-get-tickers

- **Method:** `GET`
- **Path:** `/public/get-tickers`
- **Tags:** Reference and Market Data

Fetches the public tickers for all or a particular instrument.

## Parameters

### Query Parameters

- `instrument_name` (string) - e.g. BTCUSD-PERP

## Responses

### 200 Success.

#### Result

- `data` (array of object)
  Array of objects:
  - `a` (string (decimal)) - The price of the latest trade, null if there weren't any trades
  - `b` (string (decimal)) - The current best bid price, null if there aren't any bids
  - `c` (string (decimal)) - 24-hour price change, null if there weren't any trades
  - `h` (string (decimal)) - Price of the 24h highest trade
  - `i` (string) - Instrument name
  - `k` (string (decimal)) - The current best ask price, null if there aren't any asks
  - `l` (string (decimal)) - Price of the 24h lowest trade, null if there weren't any trades
  - `oi` (string (decimal)) - The open interest
  - `t` (string (int64)) - The published timestamp in ms, e.g. "1771761038000".
  - `v` (string (decimal)) - The total 24h traded volume
  - `vv` (string (decimal)) - The total 24h traded volume value (in USD)

#### Example

```json
{
  "id": "-1",
  "method": "public/get-tickers",
  "code": "0",
  "result": {
    "data": [
      {
        "h": "51790.00",
        "l": "47895.50",
        "a": "51174.500000",
        "i": "BTCUSD-PERP",
        "v": "879.5024",
        "vv": "26370000.12",
        "oi": "12345.12",
        "c": "0.03955106",
        "b": "51170.000000",
        "k": "51180.000000",
        "t": "1613580710768"
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
  "method": "public/get-tickers",
  "code": "40001",
  "message": "BAD_REQUEST"
}
```

### 408 Request timeout.

#### Example

```json
{
  "id": "1",
  "method": "public/get-tickers",
  "code": "40801",
  "message": "REQUEST_TIMEOUT"
}
```

### 429 Too many requests.

#### Example

```json
{
  "id": "1",
  "method": "public/get-tickers",
  "code": "42901",
  "message": "TOO_MANY_REQUESTS"
}
```

### 500 Internal server error.

#### Example

```json
{
  "id": "1",
  "method": "public/get-tickers",
  "code": "50001",
  "message": "INTERNAL_SERVER_ERROR"
}
```

## Code Examples

### cURL

```curl
curl -X GET "https://api.crypto.com/exchange/v1/public/get-tickers?instrument_name=BTCUSD-PERP" \
  -H "Content-Type: application/json"
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: public/get-tickers
  version: 1.0.0
servers:
  - url: https://api.crypto.com/exchange/v1
    description: Production
  - url: https://uat-api.3ona.co/exchange/v1
    description: UAT Sandbox
paths:
  /public/get-tickers:
    get:
      tags:
        - Reference and Market Data
      x-business-units:
        - exchange
        - exchange-caas
        - fcm
        - fcm-margined
        - fcm-non-us
        - fcm-non-us-margined
        - dcm-margined
        - fcm-b2c
        - fcm-b2c-margined
      x-apply-to:
        - rest
      summary: public/get-tickers
      description: Fetches the public tickers for all or a particular instrument.
      operationId: publicGetTickers
      parameters:
        - name: instrument_name
          in: query
          schema:
            type: string
            example: BTCUSD-PERP
          description: e.g. BTCUSD-PERP
      x-codeSamples:
        - lang: cURL
          label: cURL
          source: |
            curl -X GET "https://api.crypto.com/exchange/v1/public/get-tickers?instrument_name=BTCUSD-PERP" \
              -H "Content-Type: application/json"
      responses:
        "200":
          description: Success.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PublicGetTickersResponse"
              example:
                id: "-1"
                method: public/get-tickers
                code: "0"
                result:
                  data:
                    - h: "51790.00"
                      l: "47895.50"
                      a: "51174.500000"
                      i: BTCUSD-PERP
                      v: "879.5024"
                      vv: "26370000.12"
                      oi: "12345.12"
                      c: "0.03955106"
                      b: "51170.000000"
                      k: "51180.000000"
                      t: "1613580710768"
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PublicGetTickersResponse"
              example:
                id: "1"
                method: public/get-tickers
                code: "40001"
                message: BAD_REQUEST
        "408":
          description: Request timeout.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PublicGetTickersResponse"
              example:
                id: "1"
                method: public/get-tickers
                code: "40801"
                message: REQUEST_TIMEOUT
        "429":
          description: Too many requests.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PublicGetTickersResponse"
              example:
                id: "1"
                method: public/get-tickers
                code: "42901"
                message: TOO_MANY_REQUESTS
        "500":
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PublicGetTickersResponse"
              example:
                id: "1"
                method: public/get-tickers
                code: "50001"
                message: INTERNAL_SERVER_ERROR
components:
  schemas:
    PublicGetTickersResponse:
      type: object
      description: |
        Response for public/get-tickers (HTTP 200/4xx/5xx).
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
            data:
              type: array
              items:
                $ref: "#/components/schemas/TickerItemBase"
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
    TickerItemBase:
      type: object
      description: |
        Ticker row fields shared by REST public/get-tickers result.data[] and WS ticker channel result.data[].
        WS adds bs, ks (best bid/ask size) via TickerPayloadItem.
      properties:
        h:
          type: string
          format: decimal
          description: Price of the 24h highest trade
        l:
          type: string
          format: decimal
          description: Price of the 24h lowest trade, null if there weren't any trades
        a:
          type: string
          format: decimal
          description: The price of the latest trade, null if there weren't any trades
        c:
          type: string
          format: decimal
          description: 24-hour price change, null if there weren't any trades
        b:
          type: string
          format: decimal
          description: The current best bid price, null if there aren't any bids
        k:
          type: string
          format: decimal
          description: The current best ask price, null if there aren't any asks
        i:
          type: string
          description: Instrument name
        v:
          type: string
          format: decimal
          description: The total 24h traded volume
        vv:
          type: string
          format: decimal
          description: The total 24h traded volume value (in USD)
        oi:
          type: string
          format: decimal
          description: The open interest
        t:
          type: string
          format: int64
          description: The published timestamp in ms, e.g. "1771761038000".
```
