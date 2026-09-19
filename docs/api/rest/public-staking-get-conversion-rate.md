# public/staking/get-conversion-rate

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/public-staking-get-conversion-rate

- **Method:** `POST`
- **Path:** `/public/staking/get-conversion-rate`
- **Tags:** Staking

Returns conversion rate between staked token (e.g. ETH.staked) and liquid staking token (e.g. CDCETH). Params instrument_name (e.g. CDCETH). Used before private/staking/convert.

## Request Body

### Parameters

- `instrument_name` (string **required**) - Liquid staking token instrument name

### Example

```json
{
  "id": "1",
  "method": "public/staking/get-conversion-rate",
  "api_key": "YOUR_API_KEY",
  "sig": "DIGITAL_SIGNATURE",
  "nonce": "1739923200000",
  "params": {
    "instrument_name": "CDCETH"
  }
}
```

## Responses

### 200 Success.

#### Result

- `conversion_rate` (string (decimal)) - Conversion rate between staked token (e.g. ETH.staked) and liquid staking token (e.g. CDCETH).
- `instrument_name` (string) - e.g. CDCETH

#### Example

```json
{
  "id": "1",
  "method": "public/staking/get-conversion-rate",
  "code": "0",
  "result": {
    "instrument_name": "CDCETH",
    "conversion_rate": "1.0203"
  }
}
```

### 400 Bad request.

#### Example

```json
{
  "id": "1",
  "method": "public/staking/get-conversion-rate",
  "code": "40001",
  "message": "BAD_REQUEST"
}
```

### 408 Request timeout.

#### Example

```json
{
  "id": "1",
  "method": "public/staking/get-conversion-rate",
  "code": "40801",
  "message": "REQUEST_TIMEOUT"
}
```

### 429 Too many requests.

#### Example

```json
{
  "id": "1",
  "method": "public/staking/get-conversion-rate",
  "code": "42901",
  "message": "TOO_MANY_REQUESTS"
}
```

### 500 Internal server error.

#### Example

```json
{
  "id": "1",
  "method": "public/staking/get-conversion-rate",
  "code": "50001",
  "message": "INTERNAL_SERVER_ERROR"
}
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: public/staking/get-conversion-rate
  version: 1.0.0
servers:
  - url: https://api.crypto.com/exchange/v1
    description: Production
  - url: https://uat-api.3ona.co/exchange/v1
    description: UAT Sandbox
paths:
  /public/staking/get-conversion-rate:
    post:
      tags:
        - Staking
      x-apply-to:
        - rest
      summary: public/staking/get-conversion-rate
      description: Returns conversion rate between staked token (e.g. ETH.staked) and liquid staking token (e.g. CDCETH). Params instrument_name (e.g. CDCETH). Used before private/staking/convert.
      operationId: publicStakingGetConversionRate
      x-codeSamples: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PublicStakingGetConversionRateRequest"
            example:
              id: "1"
              method: public/staking/get-conversion-rate
              api_key: YOUR_API_KEY
              sig: DIGITAL_SIGNATURE
              nonce: "1739923200000"
              params:
                instrument_name: CDCETH
      responses:
        "200":
          description: Success.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PublicStakingGetConversionRateResponse"
              example:
                id: "1"
                method: public/staking/get-conversion-rate
                code: "0"
                result:
                  instrument_name: CDCETH
                  conversion_rate: "1.0203"
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PublicStakingGetConversionRateResponse"
              example:
                id: "1"
                method: public/staking/get-conversion-rate
                code: "40001"
                message: BAD_REQUEST
        "408":
          description: Request timeout.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PublicStakingGetConversionRateResponse"
              example:
                id: "1"
                method: public/staking/get-conversion-rate
                code: "40801"
                message: REQUEST_TIMEOUT
        "429":
          description: Too many requests.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PublicStakingGetConversionRateResponse"
              example:
                id: "1"
                method: public/staking/get-conversion-rate
                code: "42901"
                message: TOO_MANY_REQUESTS
        "500":
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PublicStakingGetConversionRateResponse"
              example:
                id: "1"
                method: public/staking/get-conversion-rate
                code: "50001"
                message: INTERNAL_SERVER_ERROR
components:
  schemas:
    PublicStakingGetConversionRateRequest:
      type: object
      required:
        - id
        - method
        - params
        - nonce
      description: Request body for public/staking/get-conversion-rate (no api_key/sig).
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "public/staking/get-conversion-rate"
          example: public/staking/get-conversion-rate
        params:
          type: object
          required:
            - instrument_name
          properties:
            instrument_name:
              type: string
              example: CDCETH
              description: Liquid staking token instrument name
              e.g. CDCETH: null
        nonce:
          type: string
          format: int64
          description: Current timestamp in milliseconds, e.g. "1771761038000".
    PublicStakingGetConversionRateResponse:
      type: object
      description: |
        Response for public/staking/get-conversion-rate (HTTP 200/4xx/5xx).
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
          description: Present when code === 0. instrument_name, conversion_rate.
          properties:
            instrument_name:
              type: string
              description: e.g. CDCETH
            conversion_rate:
              type: string
              format: decimal
              description: Conversion rate between staked token (e.g. ETH.staked) and liquid staking token (e.g. CDCETH).
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
```
