# private/cancel-order-list (LIST)

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/private-cancel-order-list

- **Method:** `POST`
- **Path:** `/private/cancel-order-list`
- **Tags:** Trading

Cancel a list of orders on the Exchange.

This call is asynchronous, so the response is simply a confirmation of the request.

The `user.order` subscription can be used to check when each of the orders is successfully cancelled.

## Request Body

### Parameters

- `contingency_type` (enum: LIST **required**)
- `order_list` (array of object **required**) - List of orders to be cancelled. Each item: instrument_name (optional), order_id, client_oid (optional).
  Array of objects:
  - `client_oid` (string) - Optional Client order ID (maximum 36 characters).
  - `instrument_name` (string) - Instrument name, e.g. ETH_CRO, BTC_USDT.
  - `order_id` (string (int64)) - Order ID.

### Example

```json
{
  "id": "6575",
  "method": "private/cancel-order-list",
  "api_key": "YOUR_API_KEY",
  "sig": "DIGITAL_SIGNATURE",
  "nonce": "1750389124417",
  "params": {
    "contingency_type": "LIST",
    "order_list": [
      {
        "instrument_name": "CRO_USD",
        "client_oid": "api_leg1"
      },
      {
        "instrument_name": "CRO_USD",
        "client_oid": "api_leg2"
      }
    ]
  }
}
```

## Responses

### 200 Success.

#### Example

```json
{
  "id": "6575",
  "method": "private/cancel-order-list",
  "code": "0",
  "result": [
    {
      "code": "0",
      "index": "0"
    },
    {
      "code": "0",
      "index": "1"
    }
  ]
}
```

### 400 Bad request.

#### Example

```json
{
  "id": "1",
  "method": "private/cancel-order-list",
  "code": "40001",
  "message": "BAD_REQUEST"
}
```

### 401 Unauthorized.

#### Example

```json
{
  "id": "1",
  "method": "private/cancel-order-list",
  "code": "40101",
  "message": "UNAUTHORIZED"
}
```

### 408 Request timeout.

#### Example

```json
{
  "id": "1",
  "method": "private/cancel-order-list",
  "code": "40801",
  "message": "REQUEST_TIMEOUT"
}
```

### 429 Too many requests.

#### Example

```json
{
  "id": "1",
  "method": "private/cancel-order-list",
  "code": "42901",
  "message": "TOO_MANY_REQUESTS"
}
```

### 500 Internal server error.

#### Example

```json
{
  "id": "1",
  "method": "private/cancel-order-list",
  "code": "50001",
  "message": "INTERNAL_SERVER_ERROR"
}
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: private/cancel-order-list (LIST)
  version: 1.0.0
servers:
  - url: https://api.crypto.com/exchange/v1
    description: Production
  - url: https://uat-api.3ona.co/exchange/v1
    description: UAT Sandbox
paths:
  /private/cancel-order-list:
    post:
      tags:
        - Trading
      x-apply-to:
        - rest
        - ws-user-api
      summary: private/cancel-order-list (LIST)
      description: |
        Cancel a list of orders on the Exchange.

        This call is asynchronous, so the response is simply a confirmation of the request.

        The `user.order` subscription can be used to check when each of the orders is successfully cancelled.
      operationId: privateCancelOrderList
      x-codeSamples: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PrivateCancelOrderListRequest"
            example:
              id: "6575"
              method: private/cancel-order-list
              api_key: YOUR_API_KEY
              sig: DIGITAL_SIGNATURE
              nonce: "1750389124417"
              params:
                contingency_type: LIST
                order_list:
                  - instrument_name: CRO_USD
                    client_oid: api_leg1
                  - instrument_name: CRO_USD
                    client_oid: api_leg2
      responses:
        "200":
          description: Success.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCancelOrderListResponse"
              example:
                id: "6575"
                method: private/cancel-order-list
                code: "0"
                result:
                  - code: "0"
                    index: "0"
                  - code: "0"
                    index: "1"
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCancelOrderListResponse"
              example:
                id: "1"
                method: private/cancel-order-list
                code: "40001"
                message: BAD_REQUEST
        "401":
          description: Unauthorized.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCancelOrderListResponse"
              example:
                id: "1"
                method: private/cancel-order-list
                code: "40101"
                message: UNAUTHORIZED
        "408":
          description: Request timeout.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCancelOrderListResponse"
              example:
                id: "1"
                method: private/cancel-order-list
                code: "40801"
                message: REQUEST_TIMEOUT
        "429":
          description: Too many requests.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCancelOrderListResponse"
              example:
                id: "1"
                method: private/cancel-order-list
                code: "42901"
                message: TOO_MANY_REQUESTS
        "500":
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCancelOrderListResponse"
              example:
                id: "1"
                method: private/cancel-order-list
                code: "50001"
                message: INTERNAL_SERVER_ERROR
components:
  schemas:
    PrivateCancelOrderListRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - api_key
        - sig
        - nonce
        - params
      description: Request body for private/cancel-order-list.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/cancel-order-list"
          example: private/cancel-order-list
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
            - contingency_type
            - order_list
          properties:
            contingency_type:
              allOf:
                - $ref: "#/components/schemas/ContingencyTypeList"
                - description: Must be value LIST.
            order_list:
              type: array
              description: "List of orders to be cancelled. Each item: instrument_name (optional), order_id, client_oid (optional)."
              items:
                type: object
                properties:
                  instrument_name:
                    type: string
                    description: Instrument name, e.g. ETH_CRO, BTC_USDT.
                  order_id:
                    type: string
                    format: int64
                    description: Order ID.
                  client_oid:
                    type: string
                    description: Optional Client order ID (maximum 36 characters).
    ContingencyTypeList:
      type: string
      enum:
        - LIST
      description: Must be LIST for order-list APIs
    PrivateCancelOrderListResponse:
      type: object
      description: |
        Response for private/cancel-order-list (HTTP 200/4xx/5xx).
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
          type: array
          description: Present when code === 0. Array of { code, index, message } per docs.
          items:
            type: object
            properties:
              code:
                type: string
                format: int32
                description: 0 if success.
              index:
                type: string
                format: int32
                description: The index of corresponding order request (start from 0).
              message:
                type: string
                description: (Optional) For server or error messages.
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
```
