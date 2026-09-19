# private/otc/get-open-quote-requests

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/private-otc-get-open-quote-requests

- **Method:** `POST`
- **Path:** `/private/otc/get-open-quote-requests`
- **Tags:** OTC RFQ for Taker

Get open quote requests. Only return active quote requests (status = NEW or ACTIVE).

## Request Body

### Parameters

- `cl_quote_req_id` (string) - Client provided ID for the quote request
- `end_time` (string (int64)) - End time in Unix time format (exclusive). Default: current system timestamp. Nanosecond recommended for accurate pagination.
- `limit` (integer (int32)) - Page size (default: 20, max: 200).
- `quote_req_id` (string) - System generated unique ID for the quote request
- `start_time` (string (int64)) - Start time in Unix time format (inclusive). Default: end_time - 1 day. Nanosecond recommended for accurate pagination.

### Example

```json
{
  "id": "12",
  "method": "private/otc/get-open-quote-requests",
  "api_key": "YOUR_API_KEY",
  "sig": "DIGITAL_SIGNATURE",
  "nonce": "1610905028000",
  "params": {}
}
```

## Responses

### 200 Success.

#### Result

- `count` (string (int32)) - Number of quote requests returned
- `quote_request_list` (array of object) - List of open quote requests (status NEW or ACTIVE).
  Array of objects:
  - `cl_quote_req_id` (string) - Client provided ID for the quote request
  - `firm_quote` (boolean) - The quoted price is guaranteed or subject to change
  - `leg_list` (array of object)
    Array of objects:
    - `instrument_name` (string) - Instrument for this leg, e.g. BTC_USD
    - `notional` (string (decimal)) - Either quantity or notional
    - `quantity` (string (decimal)) - Either quantity or notional
    - `side` (enum: BUY | SELL) - The side of the quote request
    - `type` (enum: PRICE) - e.g. PRICE
  - `quote_req_id` (string) - System generated unique ID for the quote request
  - `reason` (string) - e.g. NO_ERROR
  - `request_time_ns` (string) - Unix epoch time when quote request was created in nanoseconds
  - `settlement_arrangement` (enum: IMMEDIATE | T1) - Settlement arrangement of the Quote Request
  - `status` (enum: NEW | ACTIVE) - NEW or ACTIVE

#### Example

```json
{
  "id": 12,
  "method": "private/otc/get-open-quote-requests",
  "code": 0,
  "result": {
    "count": 1,
    "quote_request_list": [
      {
        "quote_req_id": "88997712345",
        "cl_quote_req_id": "abcd13456",
        "firm_quote": false,
        "settlement_arrangement": "IMMEDIATE",
        "status": "ACTIVE",
        "leg_list": [
          {
            "instrument_name": "BTC_USD",
            "quantity": "1",
            "side": "BUY",
            "type": "PRICE"
          }
        ],
        "request_time_ns": "1749104833703281311"
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
  "method": "private/otc/get-open-quote-requests",
  "code": "40001",
  "message": "BAD_REQUEST"
}
```

### 401 Unauthorized.

#### Example

```json
{
  "id": "12",
  "method": "private/otc/get-open-quote-requests",
  "code": "40101",
  "message": "UNAUTHORIZED"
}
```

### 408 Request timeout.

#### Example

```json
{
  "id": "12",
  "method": "private/otc/get-open-quote-requests",
  "code": "40801",
  "message": "REQUEST_TIMEOUT"
}
```

### 429 Too many requests.

#### Example

```json
{
  "id": "12",
  "method": "private/otc/get-open-quote-requests",
  "code": "42901",
  "message": "TOO_MANY_REQUESTS"
}
```

### 500 Internal server error.

#### Example

```json
{
  "id": "12",
  "method": "private/otc/get-open-quote-requests",
  "code": "50001",
  "message": "INTERNAL_SERVER_ERROR"
}
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: private/otc/get-open-quote-requests
  version: 1.0.0
servers:
  - url: https://api.crypto.com/exchange/v1
    description: Production
  - url: https://uat-api.3ona.co/exchange/v1
    description: UAT Sandbox
paths:
  /private/otc/get-open-quote-requests:
    post:
      tags:
        - OTC RFQ for Taker
      x-apply-to:
        - rest
      summary: private/otc/get-open-quote-requests
      description: Get open quote requests. Only return active quote requests (status = NEW or ACTIVE).
      operationId: privateOtcGetOpenQuoteRequests
      x-codeSamples: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PrivateOtcGetOpenQuoteRequestsRequest"
            example:
              id: "12"
              method: private/otc/get-open-quote-requests
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
                $ref: "#/components/schemas/PrivateOtcGetOpenQuoteRequestsResponse"
              example:
                id: 12
                method: private/otc/get-open-quote-requests
                code: 0
                result:
                  count: 1
                  quote_request_list:
                    - quote_req_id: "88997712345"
                      cl_quote_req_id: abcd13456
                      firm_quote: false
                      settlement_arrangement: IMMEDIATE
                      status: ACTIVE
                      leg_list:
                        - instrument_name: BTC_USD
                          quantity: "1"
                          side: BUY
                          type: PRICE
                      request_time_ns: "1749104833703281311"
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateOtcGetOpenQuoteRequestsResponse"
              example:
                id: "12"
                method: private/otc/get-open-quote-requests
                code: "40001"
                message: BAD_REQUEST
        "401":
          description: Unauthorized.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateOtcGetOpenQuoteRequestsResponse"
              example:
                id: "12"
                method: private/otc/get-open-quote-requests
                code: "40101"
                message: UNAUTHORIZED
        "408":
          description: Request timeout.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateOtcGetOpenQuoteRequestsResponse"
              example:
                id: "12"
                method: private/otc/get-open-quote-requests
                code: "40801"
                message: REQUEST_TIMEOUT
        "429":
          description: Too many requests.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateOtcGetOpenQuoteRequestsResponse"
              example:
                id: "12"
                method: private/otc/get-open-quote-requests
                code: "42901"
                message: TOO_MANY_REQUESTS
        "500":
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateOtcGetOpenQuoteRequestsResponse"
              example:
                id: "12"
                method: private/otc/get-open-quote-requests
                code: "50001"
                message: INTERNAL_SERVER_ERROR
components:
  schemas:
    PrivateOtcGetOpenQuoteRequestsRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - api_key
        - sig
        - nonce
        - params
      description: "Request body for private/otc/get-open-quote-requests. Get open quote requests (active only: status NEW or ACTIVE)."
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/otc/get-open-quote-requests"
          example: private/otc/get-open-quote-requests
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
          description: If start_time and end_time not provided, limit is not used; default page size 100.
          properties:
            cl_quote_req_id:
              type: string
              description: Client provided ID for the quote request
            quote_req_id:
              type: string
              description: System generated unique ID for the quote request
            start_time:
              type: string
              format: int64
              description: "Start time in Unix time format (inclusive). Default: end_time - 1 day. Nanosecond recommended for accurate pagination."
            end_time:
              type: string
              format: int64
              description: "End time in Unix time format (exclusive). Default: current system timestamp. Nanosecond recommended for accurate pagination."
            limit:
              type: integer
              format: int32
              description: "Page size (default: 20, max: 200)."
    PrivateOtcGetOpenQuoteRequestsResponse:
      type: object
      description: |
        Response for private/otc/get-open-quote-requests (HTTP 200/4xx/5xx).
        code === 0 → success, result present with count and quote_request_list.
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
            count:
              type: string
              format: int32
              description: Number of quote requests returned
            quote_request_list:
              type: array
              description: List of open quote requests (status NEW or ACTIVE).
              items:
                type: object
                properties:
                  quote_req_id:
                    type: string
                    description: System generated unique ID for the quote request
                  cl_quote_req_id:
                    type: string
                    description: Client provided ID for the quote request
                  firm_quote:
                    type: boolean
                    description: The quoted price is guaranteed or subject to change
                  settlement_arrangement:
                    type: string
                    enum:
                      - IMMEDIATE
                      - T1
                    description: Settlement arrangement of the Quote Request
                  status:
                    type: string
                    enum:
                      - NEW
                      - ACTIVE
                    description: NEW or ACTIVE
                  reason:
                    type: string
                    description: e.g. NO_ERROR
                  request_time_ns:
                    type: string
                    description: Unix epoch time when quote request was created in nanoseconds
                  leg_list:
                    type: array
                    items:
                      $ref: "#/components/schemas/PrivateOtcGetOpenQuoteRequestsOpenQuoteRequestLegItem"
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
    PrivateOtcGetOpenQuoteRequestsOpenQuoteRequestLegItem:
      type: object
      description: One leg in an open quote request. Either quantity or notional.
      properties:
        instrument_name:
          type: string
          description: Instrument for this leg, e.g. BTC_USD
        quantity:
          type: string
          format: decimal
          description: Either quantity or notional
        notional:
          type: string
          format: decimal
          description: Either quantity or notional
        side:
          type: string
          enum:
            - BUY
            - SELL
          description: The side of the quote request
        type:
          type: string
          enum:
            - PRICE
          description: e.g. PRICE
```
