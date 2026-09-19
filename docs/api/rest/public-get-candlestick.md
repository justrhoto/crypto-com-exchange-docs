# public/get-candlestick

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/public-get-candlestick

- **Method:** `GET`
- **Path:** `/public/get-candlestick`
- **Tags:** Reference and Market Data

Retrieves candlesticks (k-line data history) over a given period for an instrument (e.g. BTCUSD-PERP).

## Parameters

### Query Parameters

- `instrument_name` (string **required**) - Instrument symbol, e.g. BTCUSD-PERP
- `timeframe` (enum: 1m | 5m | 15m | 30m | 1h | 2h | 4h | 12h | 1D | 7D | 14D | 1M) - The period value. Default **1m**.

- `count` (string (int32)) - Number of candles to return. Default 25.
- `start_ts` (string (int64)) - Start time (Unix timestamp). Default 1 day ago.
- `end_ts` (string (int64)) - End time (Unix timestamp). Default current time.

## Responses

### 200 Success.

#### Result

- `data` (array of object)
  Array of objects:
  - `c` (string (decimal)) - Close
  - `h` (string (decimal)) - High
  - `l` (string (decimal)) - Low
  - `o` (string (decimal)) - Open
  - `t` (string (int64)) - Start time of candlestick (Unix timestamp, ms), e.g. "1771761038000".
  - `v` (string (decimal)) - Volume
- `instrument_name` (string) - e.g. BTCUSD-PERP
- `interval` (string) - The period (e.g. M5).

#### Example

```json
{
  "id": "1",
  "method": "public/get-candlestick",
  "code": "0",
  "result": {
    "interval": "M5",
    "data": [
      {
        "o": "50508.500000",
        "h": "50548.500000",
        "l": "50172.500000",
        "c": "50202.000000",
        "v": "17.203200",
        "t": "1613544000000"
      }
    ],
    "instrument_name": "BTCUSD-PERP"
  }
}
```

### 400 Bad request.

#### Example

```json
{
  "id": "1",
  "method": "public/get-candlestick",
  "code": "40001",
  "message": "BAD_REQUEST"
}
```

### 408 Request timeout.

#### Example

```json
{
  "id": "1",
  "method": "public/get-candlestick",
  "code": "40801",
  "message": "REQUEST_TIMEOUT"
}
```

### 429 Too many requests.

#### Example

```json
{
  "id": "1",
  "method": "public/get-candlestick",
  "code": "42901",
  "message": "TOO_MANY_REQUESTS"
}
```

### 500 Internal server error.

#### Example

```json
{
  "id": "1",
  "method": "public/get-candlestick",
  "code": "50001",
  "message": "INTERNAL_SERVER_ERROR"
}
```

## Code Examples

### cURL

```curl
curl -X GET "https://api.crypto.com/exchange/v1/public/get-candlestick?instrument_name=BTCUSD-PERP&timeframe=M5" \
  -H "Content-Type: application/json"
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: public/get-candlestick
  version: 1.0.0
servers:
  - url: https://api.crypto.com/exchange/v1
    description: Production
  - url: https://uat-api.3ona.co/exchange/v1
    description: UAT Sandbox
paths:
  /public/get-candlestick:
    get:
      tags:
        - Reference and Market Data
      x-business-units:
        - exchange
        - exchange-caas
        - fcm-margined
        - fcm-b2c-margined
        - fcm-non-us-margined
        - dcm-margined
      x-deploy-envs-by-business-units:
        exchange:
          - local
          - develop
          - staging
          - pre
          - master
        exchange-caas:
          - local
          - develop
          - staging
          - pre
          - master
        fcm-margined:
          - local
          - develop
          - staging
          - pre
        fcm-b2c-margined:
          - local
          - develop
          - staging
          - pre
        fcm-non-us-margined:
          - local
          - develop
          - staging
          - pre
        dcm-margined:
          - local
          - develop
          - staging
          - pre
      x-apply-to:
        - rest
      summary: public/get-candlestick
      description: Retrieves candlesticks (k-line data history) over a given period for an instrument (e.g. BTCUSD-PERP).
      operationId: publicGetCandlestick
      parameters:
        - name: instrument_name
          in: query
          required: true
          schema:
            type: string
            example: BTCUSD-PERP
          description: Instrument symbol, e.g. BTCUSD-PERP
        - name: timeframe
          in: query
          schema:
            $ref: "#/components/schemas/CandlestickTimeframe"
          description: |
            The period value. Default **1m**.
        - name: count
          in: query
          schema:
            type: string
            format: int32
            default: "25"
          description: Number of candles to return. Default 25.
        - name: start_ts
          in: query
          schema:
            type: string
            format: int64
          description: Start time (Unix timestamp). Default 1 day ago.
        - name: end_ts
          in: query
          schema:
            type: string
            format: int64
          description: End time (Unix timestamp). Default current time.
      x-codeSamples:
        - lang: cURL
          label: cURL
          source: |
            curl -X GET "https://api.crypto.com/exchange/v1/public/get-candlestick?instrument_name=BTCUSD-PERP&timeframe=M5" \
              -H "Content-Type: application/json"
      responses:
        "200":
          description: Success.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PublicGetCandlestickResponse"
              example:
                id: "1"
                method: public/get-candlestick
                code: "0"
                result:
                  interval: M5
                  data:
                    - o: "50508.500000"
                      h: "50548.500000"
                      l: "50172.500000"
                      c: "50202.000000"
                      v: "17.203200"
                      t: "1613544000000"
                  instrument_name: BTCUSD-PERP
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PublicGetCandlestickResponse"
              example:
                id: "1"
                method: public/get-candlestick
                code: "40001"
                message: BAD_REQUEST
        "408":
          description: Request timeout.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PublicGetCandlestickResponse"
              example:
                id: "1"
                method: public/get-candlestick
                code: "40801"
                message: REQUEST_TIMEOUT
        "429":
          description: Too many requests.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PublicGetCandlestickResponse"
              example:
                id: "1"
                method: public/get-candlestick
                code: "42901"
                message: TOO_MANY_REQUESTS
        "500":
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PublicGetCandlestickResponse"
              example:
                id: "1"
                method: public/get-candlestick
                code: "50001"
                message: INTERNAL_SERVER_ERROR
components:
  schemas:
    CandlestickTimeframe:
      type: string
      enum:
        - 1m
        - 5m
        - 15m
        - 30m
        - 1h
        - 2h
        - 4h
        - 12h
        - 1D
        - 7D
        - 14D
        - 1M
      description: Candlestick period. Default 1m.
      example: 5m
    PublicGetCandlestickResponse:
      type: object
      description: |
        Response for public/get-candlestick (HTTP 200/4xx/5xx).
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
          description: Present when code === 0. Candlestick data. data[] has o,h,l,c,v,t (Open,High,Low,Close,Volume,Start time ms).
          properties:
            interval:
              type: string
              description: The period (e.g. M5).
            instrument_name:
              type: string
              description: e.g. BTCUSD-PERP
            data:
              type: array
              items:
                $ref: "#/components/schemas/CandlestickItem"
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
    CandlestickItem:
      type: object
      description: Single candlestick (Open, High, Low, Close, Volume, Start time ms)
      properties:
        o:
          type: string
          format: decimal
          description: Open
        h:
          type: string
          format: decimal
          description: High
        l:
          type: string
          format: decimal
          description: Low
        c:
          type: string
          format: decimal
          description: Close
        v:
          type: string
          format: decimal
          description: Volume
        t:
          type: string
          format: int64
          description: Start time of candlestick (Unix timestamp, ms), e.g. "1771761038000".
```
