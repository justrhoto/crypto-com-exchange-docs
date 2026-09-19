# private/otc/get-settle-later-limit

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/private-otc-get-settle-later-limit

- **Method:** `POST`
- **Path:** `/private/otc/get-settle-later-limit`
- **Tags:** OTC RFQ for Taker

Get used settle later limit as well as the configured limit for account.

## Request Body

### Example

```json
{
  "id": "12",
  "method": "private/otc/get-settle-later-limit",
  "api_key": "YOUR_API_KEY",
  "sig": "DIGITAL_SIGNATURE",
  "nonce": "1610905028000",
  "params": {}
}
```

## Responses

### 200 Success.

#### Result

- `account_id` (string) - Account ID
- `configured_limit` (string) - Configured limit, e.g. 1000000
- `used_limit` (string) - Used limit, e.g. 200000

#### Example

```json
{
  "id": 12,
  "method": "private/otc/get-settle-later-limit",
  "code": 0,
  "result": {
    "account_id": "52e7c00f-1324-5a6z-bfgt-de445bde21c1",
    "configured_limit": "1000000",
    "used_limit": "20000"
  }
}
```

### 400 Bad request.

#### Example

```json
{
  "id": "12",
  "method": "private/otc/get-settle-later-limit",
  "code": "40001",
  "message": "BAD_REQUEST"
}
```

### 401 Unauthorized.

#### Example

```json
{
  "id": "12",
  "method": "private/otc/get-settle-later-limit",
  "code": "40101",
  "message": "UNAUTHORIZED"
}
```

### 408 Request timeout.

#### Example

```json
{
  "id": "12",
  "method": "private/otc/get-settle-later-limit",
  "code": "40801",
  "message": "REQUEST_TIMEOUT"
}
```

### 429 Too many requests.

#### Example

```json
{
  "id": "12",
  "method": "private/otc/get-settle-later-limit",
  "code": "42901",
  "message": "TOO_MANY_REQUESTS"
}
```

### 500 Internal server error.

#### Example

```json
{
  "id": "12",
  "method": "private/otc/get-settle-later-limit",
  "code": "50001",
  "message": "INTERNAL_SERVER_ERROR"
}
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: private/otc/get-settle-later-limit
  version: 1.0.0
servers:
  - url: https://api.crypto.com/exchange/v1
    description: Production
  - url: https://uat-api.3ona.co/exchange/v1
    description: UAT Sandbox
paths:
  /private/otc/get-settle-later-limit:
    post:
      tags:
        - OTC RFQ for Taker
      x-apply-to:
        - rest
      summary: private/otc/get-settle-later-limit
      description: Get used settle later limit as well as the configured limit for account.
      operationId: privateOtcGetSettleLaterLimit
      x-codeSamples: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PrivateOtcGetSettleLaterLimitRequest"
            example:
              id: "12"
              method: private/otc/get-settle-later-limit
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
                $ref: "#/components/schemas/PrivateOtcGetSettleLaterLimitResponse"
              example:
                id: 12
                method: private/otc/get-settle-later-limit
                code: 0
                result:
                  account_id: 52e7c00f-1324-5a6z-bfgt-de445bde21c1
                  configured_limit: "1000000"
                  used_limit: "20000"
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateOtcGetSettleLaterLimitResponse"
              example:
                id: "12"
                method: private/otc/get-settle-later-limit
                code: "40001"
                message: BAD_REQUEST
        "401":
          description: Unauthorized.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateOtcGetSettleLaterLimitResponse"
              example:
                id: "12"
                method: private/otc/get-settle-later-limit
                code: "40101"
                message: UNAUTHORIZED
        "408":
          description: Request timeout.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateOtcGetSettleLaterLimitResponse"
              example:
                id: "12"
                method: private/otc/get-settle-later-limit
                code: "40801"
                message: REQUEST_TIMEOUT
        "429":
          description: Too many requests.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateOtcGetSettleLaterLimitResponse"
              example:
                id: "12"
                method: private/otc/get-settle-later-limit
                code: "42901"
                message: TOO_MANY_REQUESTS
        "500":
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateOtcGetSettleLaterLimitResponse"
              example:
                id: "12"
                method: private/otc/get-settle-later-limit
                code: "50001"
                message: INTERNAL_SERVER_ERROR
components:
  schemas:
    PrivateOtcGetSettleLaterLimitRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - api_key
        - sig
        - nonce
        - params
      description: Request body for private/otc/get-settle-later-limit. No request params.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/otc/get-settle-later-limit"
          example: private/otc/get-settle-later-limit
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
          description: No params required.
    PrivateOtcGetSettleLaterLimitResponse:
      type: object
      description: |
        Response for private/otc/get-settle-later-limit (HTTP 200/4xx/5xx).
        code === 0 → success, result present with account_id, configured_limit, used_limit.
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
          description: Present when code === 0. Settle later limit (used and configured).
          properties:
            account_id:
              type: string
              description: Account ID
            configured_limit:
              type: string
              description: Configured limit, e.g. 1000000
            used_limit:
              type: string
              description: Used limit, e.g. 200000
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
```
