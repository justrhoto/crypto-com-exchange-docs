# private/get-fee-rate

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/private-get-fee-rate

- **Method:** `POST`
- **Path:** `/private/get-fee-rate`
- **Tags:** Trading

Get fee rates for user’s account.

## Request Body

### Example

```json
{
  "id": "1",
  "method": "private/get-fee-rate",
  "api_key": "YOUR_API_KEY",
  "sig": "DIGITAL_SIGNATURE",
  "params": {},
  "nonce": "1721989202781"
}
```

## Responses

### 200 Success.

#### Result

- `deriv_tier` (string (int32)) - 30-day deriv trading volume tier.
- `effective_deriv_maker_rate_bps` (string (decimal)) - 30-day deriv maker rate in bps.
- `effective_deriv_taker_rate_bps` (string (decimal)) - 30-day deriv taker rate in bps.
- `effective_spot_maker_rate_bps` (string (decimal)) - 30-day spot maker rate in bps.
- `effective_spot_taker_rate_bps` (string (decimal)) - 30-day spot taker rate in bps.
- `spot_tier` (string (int32)) - 30-day spot trading volume tier.

#### Example

```json
{
  "id": "1",
  "method": "private/get-fee-rate",
  "code": "0",
  "result": {
    "spot_tier": "3",
    "deriv_tier": "3",
    "effective_spot_maker_rate_bps": "6.5",
    "effective_spot_taker_rate_bps": "6.9",
    "effective_deriv_maker_rate_bps": "1.1",
    "effective_deriv_taker_rate_bps": "3"
  }
}
```

### 400 Bad request.

#### Example

```json
{
  "id": "1",
  "method": "private/get-fee-rate",
  "code": "40001",
  "message": "BAD_REQUEST"
}
```

### 401 Unauthorized.

#### Example

```json
{
  "id": "1",
  "method": "private/get-fee-rate",
  "code": "40101",
  "message": "UNAUTHORIZED"
}
```

### 408 Request timeout.

#### Example

```json
{
  "id": "1",
  "method": "private/get-fee-rate",
  "code": "40801",
  "message": "REQUEST_TIMEOUT"
}
```

### 429 Too many requests.

#### Example

```json
{
  "id": "1",
  "method": "private/get-fee-rate",
  "code": "42901",
  "message": "TOO_MANY_REQUESTS"
}
```

### 500 Internal server error.

#### Example

```json
{
  "id": "1",
  "method": "private/get-fee-rate",
  "code": "50001",
  "message": "INTERNAL_SERVER_ERROR"
}
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: private/get-fee-rate
  version: 1.0.0
servers:
  - url: https://api.crypto.com/exchange/v1
    description: Production
  - url: https://uat-api.3ona.co/exchange/v1
    description: UAT Sandbox
paths:
  /private/get-fee-rate:
    post:
      tags:
        - Trading
      x-apply-to:
        - rest
      summary: private/get-fee-rate
      description: Get fee rates for user’s account.
      operationId: privateGetFeeRate
      x-codeSamples: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PrivateGetFeeRateRequest"
            example:
              id: "1"
              method: private/get-fee-rate
              api_key: YOUR_API_KEY
              sig: DIGITAL_SIGNATURE
              params: {}
              nonce: "1721989202781"
      responses:
        "200":
          description: Success.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateGetFeeRateResponse"
              example:
                id: "1"
                method: private/get-fee-rate
                code: "0"
                result:
                  spot_tier: "3"
                  deriv_tier: "3"
                  effective_spot_maker_rate_bps: "6.5"
                  effective_spot_taker_rate_bps: "6.9"
                  effective_deriv_maker_rate_bps: "1.1"
                  effective_deriv_taker_rate_bps: "3"
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateGetFeeRateResponse"
              example:
                id: "1"
                method: private/get-fee-rate
                code: "40001"
                message: BAD_REQUEST
        "401":
          description: Unauthorized.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateGetFeeRateResponse"
              example:
                id: "1"
                method: private/get-fee-rate
                code: "40101"
                message: UNAUTHORIZED
        "408":
          description: Request timeout.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateGetFeeRateResponse"
              example:
                id: "1"
                method: private/get-fee-rate
                code: "40801"
                message: REQUEST_TIMEOUT
        "429":
          description: Too many requests.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateGetFeeRateResponse"
              example:
                id: "1"
                method: private/get-fee-rate
                code: "42901"
                message: TOO_MANY_REQUESTS
        "500":
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateGetFeeRateResponse"
              example:
                id: "1"
                method: private/get-fee-rate
                code: "50001"
                message: INTERNAL_SERVER_ERROR
components:
  schemas:
    PrivateGetFeeRateRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - api_key
        - sig
        - nonce
        - params
      description: Request body for private/get-fee-rate.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/get-fee-rate"
          example: private/get-fee-rate
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
          description: No parameters; use empty object {}
          additionalProperties: false
    PrivateGetFeeRateResponse:
      type: object
      description: |
        Response for private/get-fee-rate (HTTP 200/4xx/5xx).
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
            spot_tier:
              type: string
              format: int32
              description: 30-day spot trading volume tier.
            deriv_tier:
              type: string
              format: int32
              description: 30-day deriv trading volume tier.
            effective_spot_maker_rate_bps:
              type: string
              format: decimal
              description: 30-day spot maker rate in bps.
            effective_spot_taker_rate_bps:
              type: string
              format: decimal
              description: 30-day spot taker rate in bps.
            effective_deriv_maker_rate_bps:
              type: string
              format: decimal
              description: 30-day deriv maker rate in bps.
            effective_deriv_taker_rate_bps:
              type: string
              format: decimal
              description: 30-day deriv taker rate in bps.
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
```
