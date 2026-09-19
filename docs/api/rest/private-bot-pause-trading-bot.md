# private/bot/pause-trading-bot

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/private-bot-pause-trading-bot

- **Method:** `POST`
- **Path:** `/private/bot/pause-trading-bot`
- **Tags:** Trading Bot API

Pauses a running Trading Bot. The bot's open orders are cancelled and no new orders will be placed until resumed.

## Request Body

### Parameters

- `bot_id` (integer (int64) **required**) - Trading Bot ID
- `bot_type` (enum: DCA | TWAP | GRID | FUNDING_ARBITRAGE **required**) - Trading bot type

### Example

```json
{
  "id": 1,
  "method": "private/bot/pause-trading-bot",
  "api_key": "YOUR_API_KEY",
  "sig": "DIGITAL_SIGNATURE",
  "nonce": 1610905028000,
  "params": {
    "bot_id": 1,
    "bot_type": "DCA"
  }
}
```

## Responses

### 200 Success.

#### Example

```json
{
  "id": 1,
  "method": "private/bot/pause-trading-bot",
  "code": 0
}
```

### 400 Bad request.

#### Example

```json
{
  "id": 1,
  "method": "private/bot/pause-trading-bot",
  "code": "40001",
  "message": "BAD_REQUEST"
}
```

### 401 Unauthorized.

#### Example

```json
{
  "id": 1,
  "method": "private/bot/pause-trading-bot",
  "code": "40101",
  "message": "UNAUTHORIZED"
}
```

### 408 Request timeout.

#### Example

```json
{
  "id": 1,
  "method": "private/bot/pause-trading-bot",
  "code": "40801",
  "message": "REQUEST_TIMEOUT"
}
```

### 429 Too many requests.

#### Example

```json
{
  "id": 1,
  "method": "private/bot/pause-trading-bot",
  "code": "42901",
  "message": "TOO_MANY_REQUESTS"
}
```

### 500 Internal server error.

#### Example

```json
{
  "id": 1,
  "method": "private/bot/pause-trading-bot",
  "code": "50001",
  "message": "INTERNAL_SERVER_ERROR"
}
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: private/bot/pause-trading-bot
  version: 1.0.0
servers:
  - url: https://api.crypto.com/exchange/v1
    description: Production
  - url: https://uat-api.3ona.co/exchange/v1
    description: UAT Sandbox
paths:
  /private/bot/pause-trading-bot:
    post:
      tags:
        - Trading Bot API
      x-apply-to:
        - rest
      summary: private/bot/pause-trading-bot
      description: Pauses a running Trading Bot. The bot's open orders are cancelled and no new orders will be placed until resumed.
      operationId: privateBotPauseTradingBot
      x-codeSamples: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PrivateBotPauseTradingBotRequest"
            example:
              id: 1
              method: private/bot/pause-trading-bot
              api_key: YOUR_API_KEY
              sig: DIGITAL_SIGNATURE
              nonce: 1610905028000
              params:
                bot_id: 1
                bot_type: DCA
      responses:
        "200":
          description: Success.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateBotPauseTradingBotResponse"
              example:
                id: 1
                method: private/bot/pause-trading-bot
                code: 0
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateBotPauseTradingBotResponse"
              example:
                id: 1
                method: private/bot/pause-trading-bot
                code: "40001"
                message: BAD_REQUEST
        "401":
          description: Unauthorized.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateBotPauseTradingBotResponse"
              example:
                id: 1
                method: private/bot/pause-trading-bot
                code: "40101"
                message: UNAUTHORIZED
        "408":
          description: Request timeout.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateBotPauseTradingBotResponse"
              example:
                id: 1
                method: private/bot/pause-trading-bot
                code: "40801"
                message: REQUEST_TIMEOUT
        "429":
          description: Too many requests.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateBotPauseTradingBotResponse"
              example:
                id: 1
                method: private/bot/pause-trading-bot
                code: "42901"
                message: TOO_MANY_REQUESTS
        "500":
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateBotPauseTradingBotResponse"
              example:
                id: 1
                method: private/bot/pause-trading-bot
                code: "50001"
                message: INTERNAL_SERVER_ERROR
components:
  schemas:
    PrivateBotPauseTradingBotRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - api_key
        - sig
        - nonce
        - params
      description: Request body for private/bot/pause-trading-bot.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/bot/pause-trading-bot"
          example: private/bot/pause-trading-bot
        api_key:
          type: string
          description: Your API key (only required for private REST)
        sig:
          type: string
          description: HMAC-SHA256 signature in hex (only required for private REST)
        nonce:
          type: string
          format: int64
          description: Current timestamp in milliseconds, e.g. "1610905028000".
        params:
          type: object
          required:
            - bot_id
            - bot_type
          properties:
            bot_id:
              type: integer
              format: int64
              description: Trading Bot ID
              example: 1
            bot_type:
              $ref: "#/components/schemas/BotType"
    BotType:
      type: string
      enum:
        - DCA
        - TWAP
        - GRID
        - FUNDING_ARBITRAGE
      description: |
        Trading bot type:
        - DCA: Dollar Cost Averaging
        - TWAP: Time-Weighted Average Price
        - GRID: Grid trading
        - FUNDING_ARBITRAGE: Funding arbitrage
    PrivateBotPauseTradingBotResponse:
      type: object
      x-archetype: Response
      description: Response for private/bot/pause-trading-bot.
      properties:
        id:
          type: string
          format: int64
          description: Original request identifier
        method:
          type: string
          description: Method name
          example: private/bot/pause-trading-bot
        code:
          type: string
          format: int32
          description: 0 for success; error code otherwise
        message:
          type: string
          description: Error message for non-zero codes
```
