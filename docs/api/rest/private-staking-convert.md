# private/staking/convert

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/private-staking-convert

- **Method:** `POST`
- **Path:** `/private/staking/convert`
- **Tags:** Staking

Create a request to convert between staked token with liquid staking token.

## Request Body

### Parameters

- `expected_rate` (string (decimal) **required**) - Expected conversion rate, from public/staking/get-conversion-rate.
- `from_instrument_name` (string **required**) - Instrument name to convert from, e.g. ETH.staked or CDCETH.
- `from_quantity` (string (decimal) **required**) - Quantity to be converted in from_instrument_name.
- `slippage_tolerance_bps` (string (decimal) **required**) - Maximum slippage allowed in basis point.
- `to_instrument_name` (string **required**) - Instrument name to convert to: CDCETH if from is ETH.staked, ETH.staked if from is CDCETH.

### Example

```json
{
  "id": "1",
  "method": "private/staking/convert",
  "api_key": "YOUR_API_KEY",
  "sig": "DIGITAL_SIGNATURE",
  "nonce": "1739923200000",
  "params": {
    "from_instrument_name": "ETH.staked",
    "to_instrument_name": "CDCETH",
    "expected_rate": "1.0203",
    "from_quantity": "3.14159265",
    "slippage_tolerance_bps": "3"
  }
}
```

## Responses

### 200 Success.

#### Result

- `convert_id` (string) - Convert request id
- `expected_rate` (string (decimal)) - Expected conversion rate
- `from_instrument_name` (string) - Instrument name to convert from, e.g. ETH.staked
- `from_quantity` (string (decimal)) - Quantity to be converted in from_instrument_name
- `reason` (string) - Reason for the status, e.g. NO_ERROR
- `slippage_tolerance_bps` (string (int32)) - Maximum slippage allowed in basis point
- `to_instrument_name` (string) - Instrument name to convert to, e.g. CDCETH

#### Example

```json
{
  "id": "1",
  "method": "private/staking/convert",
  "code": "0",
  "result": {
    "from_instrument_name": "ETH.staked",
    "to_instrument_name": "CDCETH",
    "expected_rate": "1.0203",
    "from_quantity": "3.14159265",
    "slippage_tolerance_bps": "3",
    "convert_id": "1",
    "reason": "NO_ERROR"
  }
}
```

### 400 Bad request.

#### Example

```json
{
  "id": "1",
  "method": "private/staking/convert",
  "code": "40001",
  "message": "BAD_REQUEST"
}
```

### 401 Unauthorized.

#### Example

```json
{
  "id": "1",
  "method": "private/staking/convert",
  "code": "40101",
  "message": "UNAUTHORIZED"
}
```

### 408 Request timeout.

#### Example

```json
{
  "id": "1",
  "method": "private/staking/convert",
  "code": "40801",
  "message": "REQUEST_TIMEOUT"
}
```

### 429 Too many requests.

#### Example

```json
{
  "id": "1",
  "method": "private/staking/convert",
  "code": "42901",
  "message": "TOO_MANY_REQUESTS"
}
```

### 500 Internal server error.

#### Example

```json
{
  "id": "1",
  "method": "private/staking/convert",
  "code": "50001",
  "message": "INTERNAL_SERVER_ERROR"
}
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: private/staking/convert
  version: 1.0.0
servers:
  - url: https://api.crypto.com/exchange/v1
    description: Production
  - url: https://uat-api.3ona.co/exchange/v1
    description: UAT Sandbox
paths:
  /private/staking/convert:
    post:
      tags:
        - Staking
      x-apply-to:
        - rest
      summary: private/staking/convert
      description: Create a request to convert between staked token with liquid staking token.
      operationId: privateStakingConvert
      x-codeSamples: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PrivateStakingConvertRequest"
            example:
              id: "1"
              method: private/staking/convert
              api_key: YOUR_API_KEY
              sig: DIGITAL_SIGNATURE
              nonce: "1739923200000"
              params:
                from_instrument_name: ETH.staked
                to_instrument_name: CDCETH
                expected_rate: "1.0203"
                from_quantity: "3.14159265"
                slippage_tolerance_bps: "3"
      responses:
        "200":
          description: Success.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateStakingConvertResponse"
              example:
                id: "1"
                method: private/staking/convert
                code: "0"
                result:
                  from_instrument_name: ETH.staked
                  to_instrument_name: CDCETH
                  expected_rate: "1.0203"
                  from_quantity: "3.14159265"
                  slippage_tolerance_bps: "3"
                  convert_id: "1"
                  reason: NO_ERROR
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateStakingConvertResponse"
              example:
                id: "1"
                method: private/staking/convert
                code: "40001"
                message: BAD_REQUEST
        "401":
          description: Unauthorized.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateStakingConvertResponse"
              example:
                id: "1"
                method: private/staking/convert
                code: "40101"
                message: UNAUTHORIZED
        "408":
          description: Request timeout.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateStakingConvertResponse"
              example:
                id: "1"
                method: private/staking/convert
                code: "40801"
                message: REQUEST_TIMEOUT
        "429":
          description: Too many requests.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateStakingConvertResponse"
              example:
                id: "1"
                method: private/staking/convert
                code: "42901"
                message: TOO_MANY_REQUESTS
        "500":
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateStakingConvertResponse"
              example:
                id: "1"
                method: private/staking/convert
                code: "50001"
                message: INTERNAL_SERVER_ERROR
components:
  schemas:
    PrivateStakingConvertRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - api_key
        - sig
        - nonce
        - params
      description: Request body for private/staking/convert.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/staking/convert"
          example: private/staking/convert
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
            - from_instrument_name
            - to_instrument_name
            - expected_rate
            - from_quantity
            - slippage_tolerance_bps
          properties:
            from_instrument_name:
              type: string
              description: Instrument name to convert from, e.g. ETH.staked or CDCETH.
            to_instrument_name:
              type: string
              description: "Instrument name to convert to: CDCETH if from is ETH.staked, ETH.staked if from is CDCETH."
            expected_rate:
              type: string
              format: decimal
              description: Expected conversion rate, from public/staking/get-conversion-rate.
            from_quantity:
              type: string
              format: decimal
              description: Quantity to be converted in from_instrument_name.
            slippage_tolerance_bps:
              type: string
              format: decimal
              description: Maximum slippage allowed in basis point.
    PrivateStakingConvertResponse:
      type: object
      description: |
        Response for private/staking/convert (HTTP 200/4xx/5xx).
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
          description: Present when code === 0. from_instrument_name, to_instrument_name, expected_rate, from_quantity, slippage_tolerance_bps, convert_id, reason per doc.
          properties:
            from_instrument_name:
              type: string
              description: Instrument name to convert from, e.g. ETH.staked
            to_instrument_name:
              type: string
              description: Instrument name to convert to, e.g. CDCETH
            expected_rate:
              type: string
              format: decimal
              description: Expected conversion rate
            from_quantity:
              type: string
              format: decimal
              description: Quantity to be converted in from_instrument_name
            slippage_tolerance_bps:
              type: string
              format: int32
              description: Maximum slippage allowed in basis point
            convert_id:
              type: string
              description: Convert request id
            reason:
              type: string
              description: Reason for the status, e.g. NO_ERROR
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
```
