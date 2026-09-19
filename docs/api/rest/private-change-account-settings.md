# private/change-account-settings

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/private-change-account-settings

- **Method:** `POST`
- **Path:** `/private/change-account-settings`
- **Tags:** Trading

Change account level settings regarding STP and other properties.

## Request Body

### Parameters

- `leverage` (integer (int32)) - Maximum leverage for the account. When account effective leverage exceeds this, further risk-increasing orders are rejected.
- `stp_id` (string) - Optional. 0 to 32767. If stp_scope and stp_inst not specified, REJECT. If stp_scope specified, default 0.
- `stp_inst` (enum: M | T | B) - Self-trade prevention instruction. Used in private/change-account-settings (params) and private/get-account-settings (result). Mandatory if stp_scope is set.
- `stp_scope` (enum: M | S | D) - Self-trade prevention scope. Used in private/change-account-settings (params) and private/get-account-settings (result).

### Example

```json
{
  "id": "696",
  "method": "private/change-account-settings",
  "api_key": "YOUR_API_KEY",
  "sig": "DIGITAL_SIGNATURE",
  "nonce": "1721989111722",
  "params": {
    "stp_scope": "S",
    "stp_id": "100",
    "stp_inst": "M"
  }
}
```

## Responses

### 200 Success.

#### Example

```json
{
  "id": "696",
  "method": "private/change-account-settings",
  "code": "0"
}
```

### 400 Bad request.

#### Example

```json
{
  "id": "1",
  "method": "private/change-account-settings",
  "code": "40001",
  "message": "BAD_REQUEST"
}
```

### 401 Unauthorized.

#### Example

```json
{
  "id": "1",
  "method": "private/change-account-settings",
  "code": "40101",
  "message": "UNAUTHORIZED"
}
```

### 408 Request timeout.

#### Example

```json
{
  "id": "1",
  "method": "private/change-account-settings",
  "code": "40801",
  "message": "REQUEST_TIMEOUT"
}
```

### 429 Too many requests.

#### Example

```json
{
  "id": "1",
  "method": "private/change-account-settings",
  "code": "42901",
  "message": "TOO_MANY_REQUESTS"
}
```

### 500 Internal server error.

#### Example

```json
{
  "id": "1",
  "method": "private/change-account-settings",
  "code": "50001",
  "message": "INTERNAL_SERVER_ERROR"
}
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: private/change-account-settings
  version: 1.0.0
servers:
  - url: https://api.crypto.com/exchange/v1
    description: Production
  - url: https://uat-api.3ona.co/exchange/v1
    description: UAT Sandbox
paths:
  /private/change-account-settings:
    post:
      tags:
        - Trading
      x-apply-to:
        - rest
      summary: private/change-account-settings
      description: Change account level settings regarding STP and other properties.
      operationId: privateChangeAccountSettings
      x-codeSamples: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PrivateChangeAccountSettingsRequest"
            example:
              id: "696"
              method: private/change-account-settings
              api_key: YOUR_API_KEY
              sig: DIGITAL_SIGNATURE
              nonce: "1721989111722"
              params:
                stp_scope: S
                stp_id: "100"
                stp_inst: M
      responses:
        "200":
          description: Success.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateChangeAccountSettingsResponse"
              example:
                id: "696"
                method: private/change-account-settings
                code: "0"
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateChangeAccountSettingsResponse"
              example:
                id: "1"
                method: private/change-account-settings
                code: "40001"
                message: BAD_REQUEST
        "401":
          description: Unauthorized.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateChangeAccountSettingsResponse"
              example:
                id: "1"
                method: private/change-account-settings
                code: "40101"
                message: UNAUTHORIZED
        "408":
          description: Request timeout.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateChangeAccountSettingsResponse"
              example:
                id: "1"
                method: private/change-account-settings
                code: "40801"
                message: REQUEST_TIMEOUT
        "429":
          description: Too many requests.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateChangeAccountSettingsResponse"
              example:
                id: "1"
                method: private/change-account-settings
                code: "42901"
                message: TOO_MANY_REQUESTS
        "500":
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateChangeAccountSettingsResponse"
              example:
                id: "1"
                method: private/change-account-settings
                code: "50001"
                message: INTERNAL_SERVER_ERROR
components:
  schemas:
    PrivateChangeAccountSettingsRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - api_key
        - sig
        - nonce
        - params
      description: Request body for private/change-account-settings.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/change-account-settings"
          example: private/change-account-settings
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
          properties:
            stp_scope:
              $ref: "#/components/schemas/StpScope"
            stp_inst:
              $ref: "#/components/schemas/StpInst"
            stp_id:
              type: string
              description: Optional. 0 to 32767. If stp_scope and stp_inst not specified, REJECT. If stp_scope specified, default 0.
            leverage:
              type: integer
              format: int32
              description: Maximum leverage for the account. When account effective leverage exceeds this, further risk-increasing orders are rejected.
    StpScope:
      type: string
      enum:
        - M
        - S
        - D
      description: |
        Self-trade prevention scope. Used in private/change-account-settings (params) and private/get-account-settings (result).
        - ➖ M: Matches Master or Sub a/c
        - ➖ S: Matches Sub a/c only
        - ➖ D: reset all STP fields to default (stp_inst and stp_id in same request are ignored).
    StpInst:
      type: string
      enum:
        - M
        - T
        - B
      description: |
        Self-trade prevention instruction. Used in private/change-account-settings (params) and private/get-account-settings (result). Mandatory if stp_scope is set.
        - ➖ M: Cancel Maker
        - ➖ T: Cancel Taker
        - ➖ B: Cancel Both Maker and Taker
    PrivateChangeAccountSettingsResponse:
      type: object
      description: |
        Response for private/change-account-settings (HTTP 200/4xx/5xx).
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
          description: Present when code === 0; no result block per docs.
          properties: {}
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
```
