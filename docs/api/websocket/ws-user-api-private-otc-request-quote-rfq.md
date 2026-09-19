# private/otc/request-quote (RFQ)

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-user-api-private-otc-request-quote-rfq

- **Method:** `POST`
- **Path:** `/ws/user-api/private/otc/request-quote`
- **Tags:** OTC RFQ for Taker

Create a quote request (RFQ flow).

## Request Body

### Parameters

- `cl_quote_req_id` (string **required**) - Client provided ID for the quote request. Should be unique per ACTIVE quote request.
- `leg_list` (array of object **required**) - Legs of the quote request.
  Array of objects:
  - `instrument_name` (string **required**) - Instrument for this leg, e.g. BTC_USD
  - `side` (enum: BUY | SELL **required**) - BUY or SELL
  - `notional` (string (decimal)) - Notional for this leg. Either quantity or notional must be provided but not both.
  - `quantity` (string (decimal)) - Quantity for this leg. Either quantity or notional must be provided but not both.
- `duration` (enum: 5000 | 10000 | 30000 | 60000 | 300000 | 600000) - Quote request goes from ACTIVE to COMPLETED after this duration (in millisecond).
- `firm_quote` (boolean) - FALSE indicates the quoted price subject to changes.
- `quote_ttl` (enum: 4000 | 5000) - The minimum time the quotes remains valid (in millisecond).
- `settlement_arrangement` (enum: IMMEDIATE | T1) - IMMEDIATE can only be used by non settle later account.

### Example

```json
{
  "id": "12",
  "method": "private/otc/request-quote",
  "params": {
    "cl_quote_req_id": "abcd13456",
    "firm_quote": false,
    "settlement_arrangement": "IMMEDIATE",
    "duration": "10000",
    "quote_ttl": "5000",
    "leg_list": [
      {
        "instrument_name": "BTC_USD",
        "quantity": "1",
        "side": "BUY"
      }
    ]
  }
}
```

## Responses

### 200 Success.

#### Result

- `channel` (string **required**) - Should be user.otc_qr.requests
- `subscription` (string **required**) - Should be user.otc_qr.requests
- `data` (array of object) - Quote request data items.
  Array of objects:
  - `cl_quote_req_id` (string **required**) - Client provided ID for the quote request
  - `quote_req_id` (string **required**) - System generated unique ID for the quote request

#### Example

```json
{
  "id": -1,
  "method": "subscribe",
  "code": 0,
  "result": {
    "subscription": "user.otc_qr.requests",
    "channel": "user.otc_qr.requests",
    "data": [
      {
        "cl_quote_req_id": "1739951702774",
        "quote_req_id": "4611686018427626536"
      }
    ]
  }
}
```

### 400 Bad request.

#### Example

```json
{
  "id": 12,
  "method": "private/otc/request-quote",
  "code": 40004,
  "message": "Missing or invalid argument"
}
```

### 401 Unauthorized.

#### Example

```json
{
  "id": "12",
  "method": "private/otc/request-quote",
  "code": "40101",
  "message": "UNAUTHORIZED"
}
```

### 408 Request timeout.

#### Example

```json
{
  "id": "12",
  "method": "private/otc/request-quote",
  "code": "40801",
  "message": "REQUEST_TIMEOUT"
}
```

### 429 Too many requests.

#### Example

```json
{
  "id": "12",
  "method": "private/otc/request-quote",
  "code": "42901",
  "message": "TOO_MANY_REQUESTS"
}
```

### 500 Internal server error.

#### Example

```json
{
  "id": "12",
  "method": "private/otc/request-quote",
  "code": "50001",
  "message": "INTERNAL_SERVER_ERROR"
}
```

## Code Examples

### Request

```ws
{
  "id": 12,
  "method": "private/otc/request-quote",
  "params": {
    "cl_quote_req_id": "abcd13456",
    "firm_quote": false,
    "settlement_arrangement": "IMMEDIATE",
    "duration": "10000",
    "leg_list": [
      {
        "instrument_name": "BTC_USD",
        "quantity": "1",
        "side": "BUY"
      }
    ],
    "quote_ttl": "5000"
  }
}
```

### Response

```ws
{
  "id": -1,
  "method": "subscribe",
  "code": 0,
  "result": {
    "subscription": "user.otc_qr.requests",
    "channel": "user.otc_qr.requests",
    "data": [
      {
        "cl_quote_req_id": "1739951702774",
        "quote_req_id": "4611686018427626536"
      }
    ]
  }
}
```

### Failed Response

```ws
{
  "id": 12,
  "method": "private/otc/request-quote",
  "code": 40004,
  "message": "Missing or invalid argument"
}
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: private/otc/request-quote (RFQ)
  version: 1.0.0
servers:
  - url: wss://stream.crypto.com/exchange/v1/user
    description: Production User API and user subscriptions
  - url: wss://uat-stream.3ona.co/exchange/v1/user
    description: UAT Sandbox User API and user subscriptions
  - url: wss://stream.crypto.com/exchange/v1/market
    description: Production Market Data subscriptions
  - url: wss://uat-stream.3ona.co/exchange/v1/market
    description: UAT Sandbox Market Data subscriptions
paths:
  /ws/user-api/private/otc/request-quote:
    post:
      tags:
        - OTC RFQ for Taker
      x-apply-to:
        - rest
        - ws-user-api
      summary: private/otc/request-quote (RFQ)
      description: Create a quote request (RFQ flow).
      operationId: ws-user-api-privateOtcRequestQuote_RFQ
      x-codeSamples:
        - lang: WS
          label: Request
          x-discriminator-value: RFQ
          source: |
            {
              "id": 12,
              "method": "private/otc/request-quote",
              "params": {
                "cl_quote_req_id": "abcd13456",
                "firm_quote": false,
                "settlement_arrangement": "IMMEDIATE",
                "duration": "10000",
                "leg_list": [
                  {
                    "instrument_name": "BTC_USD",
                    "quantity": "1",
                    "side": "BUY"
                  }
                ],
                "quote_ttl": "5000"
              }
            }
        - lang: WS
          label: Response
          x-discriminator-value: RFQ
          source: |
            {
              "id": -1,
              "method": "subscribe",
              "code": 0,
              "result": {
                "subscription": "user.otc_qr.requests",
                "channel": "user.otc_qr.requests",
                "data": [
                  {
                    "cl_quote_req_id": "1739951702774",
                    "quote_req_id": "4611686018427626536"
                  }
                ]
              }
            }
        - lang: WS
          label: Failed Response
          x-discriminator-value: RFQ
          source: |
            {
              "id": 12,
              "method": "private/otc/request-quote",
              "code": 40004,
              "message": "Missing or invalid argument"
            }
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PrivateOtcRequestQuoteRequest"
            example:
              id: "12"
              method: private/otc/request-quote
              params:
                cl_quote_req_id: abcd13456
                firm_quote: false
                settlement_arrangement: IMMEDIATE
                duration: "10000"
                quote_ttl: "5000"
                leg_list:
                  - instrument_name: BTC_USD
                    quantity: "1"
                    side: BUY
      responses:
        "200":
          description: Success.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateOtcRequestQuoteResponse"
              example:
                id: -1
                method: subscribe
                code: 0
                result:
                  subscription: user.otc_qr.requests
                  channel: user.otc_qr.requests
                  data:
                    - cl_quote_req_id: "1739951702774"
                      quote_req_id: "4611686018427626536"
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateOtcRequestQuoteResponse"
              example:
                id: 12
                method: private/otc/request-quote
                code: 40004
                message: Missing or invalid argument
        "401":
          description: Unauthorized.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateOtcRequestQuoteResponse"
              example:
                id: "12"
                method: private/otc/request-quote
                code: "40101"
                message: UNAUTHORIZED
        "408":
          description: Request timeout.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateOtcRequestQuoteResponse"
              example:
                id: "12"
                method: private/otc/request-quote
                code: "40801"
                message: REQUEST_TIMEOUT
        "429":
          description: Too many requests.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateOtcRequestQuoteResponse"
              example:
                id: "12"
                method: private/otc/request-quote
                code: "42901"
                message: TOO_MANY_REQUESTS
        "500":
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateOtcRequestQuoteResponse"
              example:
                id: "12"
                method: private/otc/request-quote
                code: "50001"
                message: INTERNAL_SERVER_ERROR
      x-type: request
      x-channel-url: wss://stream.crypto.com/exchange/v1/user
      x-channel-group: user
      x-name: private/otc/request-quote
      servers:
        - url: wss://stream.crypto.com/exchange/v1/user
          description: Production User API and user subscriptions
        - url: wss://uat-stream.3ona.co/exchange/v1/user
          description: UAT Sandbox User API and user subscriptions
        - url: wss://stream.crypto.com/exchange/v1/market
          description: Production Market Data subscriptions
        - url: wss://uat-stream.3ona.co/exchange/v1/market
          description: UAT Sandbox Market Data subscriptions
components:
  schemas:
    PrivateOtcRequestQuoteRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - params
      description: Request body for private/otc/request-quote. Create a quote request (RFQ flow).
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/otc/request-quote"
          example: private/otc/request-quote
        params:
          type: object
          required:
            - cl_quote_req_id
            - leg_list
          properties:
            cl_quote_req_id:
              type: string
              description: |
                Client provided ID for the quote request. Should be unique per ACTIVE quote request.
                Accepted characters a-z, A-Z, 0-9, _, -
            firm_quote:
              type: boolean
              default: false
              description: |
                FALSE indicates the quoted price subject to changes.
                TRUE indicates the quoted price is guaranteed.

                FALSE / TRUE (default to FALSE)
            settlement_arrangement:
              type: string
              enum:
                - IMMEDIATE
                - T1
              default: IMMEDIATE
              description: |
                IMMEDIATE can only be used by non settle later account.
                T1 can only be used by settle later account.
            duration:
              type: string
              enum:
                - "5000"
                - "10000"
                - "30000"
                - "60000"
                - "300000"
                - "600000"
              default: "10000"
              description: |
                Quote request goes from ACTIVE to COMPLETED after this duration (in millisecond).
            quote_ttl:
              type: string
              enum:
                - "4000"
                - "5000"
              default: "4000"
              description: The minimum time the quotes remains valid (in millisecond).
            leg_list:
              type: array
              description: Legs of the quote request.
              items:
                $ref: "#/components/schemas/PrivateOtcRequestQuoteLegItem"
    PrivateOtcRequestQuoteLegItem:
      type: object
      description: One leg of an OTC RFQ. Either quantity or notional must be provided but not both.
      required:
        - instrument_name
        - side
      properties:
        instrument_name:
          type: string
          description: Instrument for this leg, e.g. BTC_USD
        side:
          type: string
          enum:
            - BUY
            - SELL
          description: BUY or SELL
        quantity:
          type: string
          format: decimal
          description: Quantity for this leg. Either quantity or notional must be provided but not both.
        notional:
          type: string
          format: decimal
          description: Notional for this leg. Either quantity or notional must be provided but not both.
    PrivateOtcRequestQuoteResponse:
      type: object
      description: |
        Response for private/otc/request-quote (HTTP 200/4xx/5xx).
        code === 0 → success, result present with subscription, channel, and data array.
        code !== 0 → error, message and/or original present.
      required:
        - method
        - code
        - result
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
          description: Present when code === 0. subscription user.otc_qr.requests, channel user.otc_qr.requests.
          required:
            - subscription
            - channel
          properties:
            subscription:
              type: string
              description: Should be user.otc_qr.requests
            channel:
              type: string
              description: Should be user.otc_qr.requests
            data:
              type: array
              description: Quote request data items.
              items:
                type: object
                required:
                  - quote_req_id
                  - cl_quote_req_id
                properties:
                  quote_req_id:
                    type: string
                    description: System generated unique ID for the quote request
                  cl_quote_req_id:
                    type: string
                    description: Client provided ID for the quote request
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
```
