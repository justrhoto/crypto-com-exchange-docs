# private/create-order

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-user-api-private-create-order-dma

- **Method:** `POST`
- **Path:** `/ws/user-api/private/create-order`
- **Tags:** Trading

Creates a new BUY or SELL order. 

This call is asynchronous, so the response is simply a confirmation of the request.

The `user.order` subscription can be used to check when the order is successfully created.

## Request Body

### Example

```json
{
  "id": "1",
  "method": "private/create-order",
  "api_key": "YOUR_API_KEY",
  "sig": "DIGITAL_SIGNATURE",
  "nonce": "1610905028000",
  "params": {
    "instrument_name": "BTCUSD-PERP",
    "side": "SELL",
    "type": "LIMIT",
    "price": "50000.5",
    "quantity": "1",
    "client_oid": "c5f682ed-7108-4f1c-b755-972fcdca0f02",
    "exec_inst": [
      "POST_ONLY"
    ],
    "time_in_force": "FILL_OR_KILL"
  }
}
```

## Responses

### 200 Success.

#### Result

- `client_oid` (string) - Client Order ID from the request, or the request nonce if not provided. Recommend specifying client_oid as nonce can be the same across orders.
- `order_id` (string (int64)) - Newly created order ID

#### Example

```json
{
  "id": "1",
  "method": "private/create-order",
  "code": "0",
  "result": {
    "client_oid": "c5f682ed-7108-4f1c-b755-972fcdca0f02",
    "order_id": "18342311"
  }
}
```

### 400 Bad request.

#### Example

```json
{
  "id": "1",
  "method": "private/create-order",
  "code": "40001",
  "message": "BAD_REQUEST"
}
```

### 401 Unauthorized.

#### Example

```json
{
  "id": "1",
  "method": "private/create-order",
  "code": "40101",
  "message": "UNAUTHORIZED"
}
```

### 408 Request timeout.

#### Example

```json
{
  "id": "1",
  "method": "private/create-order",
  "code": "40801",
  "message": "REQUEST_TIMEOUT"
}
```

### 429 Too many requests.

#### Example

```json
{
  "id": "1",
  "method": "private/create-order",
  "code": "42901",
  "message": "TOO_MANY_REQUESTS"
}
```

### 500 Internal server error.

#### Example

```json
{
  "id": "1",
  "method": "private/create-order",
  "code": "50001",
  "message": "INTERNAL_SERVER_ERROR"
}
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: private/create-order
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
  /ws/user-api/private/create-order:
    post:
      tags:
        - Trading
      x-apply-to:
        - rest
        - ws-user-api
      summary: private/create-order
      description: |
        Creates a new BUY or SELL order. 

        This call is asynchronous, so the response is simply a confirmation of the request.

        The `user.order` subscription can be used to check when the order is successfully created.
      operationId: ws-user-api-privateCreateOrder_DMA
      x-codeSamples: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PrivateCreateOrderRequest"
            example:
              id: "1"
              method: private/create-order
              api_key: YOUR_API_KEY
              sig: DIGITAL_SIGNATURE
              nonce: "1610905028000"
              params:
                instrument_name: BTCUSD-PERP
                side: SELL
                type: LIMIT
                price: "50000.5"
                quantity: "1"
                client_oid: c5f682ed-7108-4f1c-b755-972fcdca0f02
                exec_inst:
                  - POST_ONLY
                time_in_force: FILL_OR_KILL
      responses:
        "200":
          description: Success.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCreateOrderResponse"
              example:
                id: "1"
                method: private/create-order
                code: "0"
                result:
                  client_oid: c5f682ed-7108-4f1c-b755-972fcdca0f02
                  order_id: "18342311"
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCreateOrderResponse"
              example:
                id: "1"
                method: private/create-order
                code: "40001"
                message: BAD_REQUEST
        "401":
          description: Unauthorized.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCreateOrderResponse"
              example:
                id: "1"
                method: private/create-order
                code: "40101"
                message: UNAUTHORIZED
        "408":
          description: Request timeout.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCreateOrderResponse"
              example:
                id: "1"
                method: private/create-order
                code: "40801"
                message: REQUEST_TIMEOUT
        "429":
          description: Too many requests.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCreateOrderResponse"
              example:
                id: "1"
                method: private/create-order
                code: "42901"
                message: TOO_MANY_REQUESTS
        "500":
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateCreateOrderResponse"
              example:
                id: "1"
                method: private/create-order
                code: "50001"
                message: INTERNAL_SERVER_ERROR
      x-type: request
      x-channel-url: wss://stream.crypto.com/exchange/v1/user
      x-channel-group: user
      x-name: private/create-order
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
    PrivateCreateOrderRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - api_key
        - sig
        - nonce
        - params
      description: Request body for private/create-order. All numbers in params must be strings. Trigger types (STOP_LOSS, STOP_LIMIT, TAKE_PROFIT, TAKE_PROFIT_LIMIT) require ref_price.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/create-order"
          example: private/create-order
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
          $ref: "#/components/schemas/CreateOrderParams"
    CreateOrderParams:
      description: Order parameters for private/create-order (LIMIT, MARKET orders).
      allOf:
        - $ref: "#/components/schemas/CreateOrderParamsBase"
        - type: object
          required:
            - instrument_name
            - side
            - type
            - quantity
          properties:
            type:
              type: string
              enum:
                - LIMIT
                - MARKET
              description: "Order type: LIMIT or MARKET"
            price:
              type: string
              format: decimal
              example: "1"
              description: Limit price (required for LIMIT orders)
            notional:
              type: string
              format: decimal
              description: Amount to spend; for MARKET BUY only (alternative to quantity)
            spot_margin:
              $ref: "#/components/schemas/SpotMargin"
            isolated_margin_amount:
              type: string
              format: decimal
              description: Isolated margin amount
            isolation_id:
              type: string
              description: Isolation ID for isolated margin
            leverage:
              type: string
              format: decimal
              description: Leverage for margin/derivatives
    CreateOrderParamsBase:
      type: object
      description: Base order parameters shared by all create-order variants.
      properties:
        instrument_name:
          type: string
          example: BTC_USD
          description: Instrument symbol, e.g. BTCUSD-PERP
        side:
          $ref: "#/components/schemas/OrderSide"
        quantity:
          type: string
          format: decimal
          example: "1"
          description: Order quantity. For MARKET BUY can use notional instead.
        client_oid:
          type: string
          description: Client order ID (max 36 chars). Recommended for correlation.
        time_in_force:
          allOf:
            - $ref: "#/components/schemas/TimeInForce"
            - description: When exec_inst contains POST_ONLY only GOOD_TILL_CANCEL allowed.
        exec_inst:
          type: array
          items:
            $ref: "#/components/schemas/ExecInstCreateOrder"
          description: Optional array of execution instructions. POST_ONLY and SMART_POST_ONLY mutually exclusive.
        fee_instrument_name:
          type: string
          description: Fee instrument (e.g. CRO) for fee deduction
        stp_id:
          type: string
          description: Self-trade prevention ID (0 to 32767)
        stp_inst:
          $ref: "#/components/schemas/StpInst"
        stp_scope:
          $ref: "#/components/schemas/StpScope"
    OrderSide:
      type: string
      enum:
        - BUY
        - SELL
      description: BUY or SELL
    TimeInForce:
      type: string
      enum:
        - GOOD_TILL_CANCEL
        - IMMEDIATE_OR_CANCEL
        - FILL_OR_KILL
      description: Time in force
    ExecInstCreateOrder:
      type: string
      enum:
        - POST_ONLY
        - REDUCE_ONLY
        - SMART_POST_ONLY
        - ISOLATED_MARGIN
        - MARGIN_ORDER
      description: Execution instruction for create-order. POST_ONLY and SMART_POST_ONLY mutually exclusive.
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
    SpotMargin:
      type: string
      enum:
        - SPOT
        - MARGIN
      description: SPOT or MARGIN (spot/margin mode).
    PrivateCreateOrderResponse:
      type: object
      description: |
        Response for private/create-order (HTTP 200/4xx/5xx).
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
          description: Present when code === 0. order_id, client_oid.
          properties:
            order_id:
              type: string
              format: int64
              description: Newly created order ID
            client_oid:
              type: string
              description: Client Order ID from the request, or the request nonce if not provided. Recommend specifying client_oid as nonce can be the same across orders.
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
```
