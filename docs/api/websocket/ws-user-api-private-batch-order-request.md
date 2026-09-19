# private/batch-order-request

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-user-api-private-batch-order-request

- **Method:** `POST`
- **Path:** `/ws/user-api/private/batch-order-request`
- **Tags:** Trading

A batched order operation endpoint that allows you to submit multiple cancel and create order operations in a single request for a specific instrument.

Cancels are processed before creates (not atomic by default). Operations are independent (one failure doesn't roll back others) when atomic is false.

**Limits:**
- Maximum 10 create orders per batch request
- At least one of cancels or creates must be non-empty

This call is asynchronous, so the response is simply a confirmation of the request.

The `user.order` subscription can be used to check when orders are successfully created or canceled.

## Request Body

### Parameters

- `instrument_name` (string **required**) - Target instrument for all operations in this batch request.
- `cancels` (array of object) - Array of orders to cancel (by order_id or client_oid). At least one of cancels or creates must be non-empty.
  Array of objects:
  - `client_oid` (string) - Client Order ID to cancel.
  - `order_id` (string (int64)) - Order ID to cancel.
- `creates` (array of object) - Array of new orders to create. Maximum 1000 orders per batch. At least one of cancels or creates must be non-empty.
- `stp_account_enforce_flag` (boolean) - Self-trade prevention account enforcement flag.
- `stp_cancel_type` (string) - Self-trade prevention cancel behavior.
- `stp_group` (string) - Self-trade prevention group ID.

### Example

```json
{
  "id": "1234567890",
  "method": "private/batch-order-request",
  "nonce": "1234567890",
  "params": {
    "instrument_name": "BTCUSD-PERP",
    "cancels": [
      {
        "order_id": "4134141"
      },
      {
        "client_oid": "my-client-order-id"
      }
    ],
    "creates": [
      {
        "side": "BUY",
        "type": "LIMIT",
        "price": "41555",
        "quantity": "0.01",
        "exec_inst": [
          "POST_ONLY",
          "REDUCE_ONLY"
        ],
        "time_in_force": "GOOD_TILL_CANCEL",
        "client_oid": "optional-client-id"
      },
      {
        "side": "SELL",
        "type": "MARKET",
        "quantity": "0.01"
      }
    ]
  }
}
```

## Responses

### 200 WebSocket response

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: private/batch-order-request
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
  /ws/user-api/private/batch-order-request:
    post:
      operationId: ws-user-api-privateBatchOrderRequest
      summary: private/batch-order-request
      description: |-
        A batched order operation endpoint that allows you to submit multiple cancel and create order operations in a single request for a specific instrument.

        Cancels are processed before creates (not atomic by default). Operations are independent (one failure doesn't roll back others) when atomic is false.

        **Limits:**
        - Maximum 10 create orders per batch request
        - At least one of cancels or creates must be non-empty

        This call is asynchronous, so the response is simply a confirmation of the request.

        The `user.order` subscription can be used to check when orders are successfully created or canceled.
      tags:
        - Trading
      x-type: request
      x-channel-url: wss://stream.crypto.com/exchange/v1/user
      x-channel-group: user
      x-name: private/batch-order-request
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/WsPrivateBatchOrderRequestRequest"
            description: private/batch-order-request
            example:
              id: "1234567890"
              method: private/batch-order-request
              nonce: "1234567890"
              params:
                instrument_name: BTCUSD-PERP
                cancels:
                  - order_id: "4134141"
                  - client_oid: my-client-order-id
                creates:
                  - side: BUY
                    type: LIMIT
                    price: "41555"
                    quantity: "0.01"
                    exec_inst:
                      - POST_ONLY
                      - REDUCE_ONLY
                    time_in_force: GOOD_TILL_CANCEL
                    client_oid: optional-client-id
                  - side: SELL
                    type: MARKET
                    quantity: "0.01"
      responses:
        "200":
          description: WebSocket response
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/WsPrivateBatchOrderRequestResponse"
              examples:
                Success:
                  value:
                    id: "1234567890"
                    method: private/batch-order-request
                    code: "0"
                    result:
                      cancels:
                        - code: "0"
                          order_id: "4134141"
                        - code: "0"
                          client_oid: my-client-order-id
                      creates:
                        - code: "0"
                          order_id: "9876543210"
                          client_oid: optional-client-id
                        - code: "0"
                          order_id: "9876543211"
                          client_oid: "1234567890"
                  summary: Success.
                Bad request:
                  value:
                    id: "1"
                    method: private/batch-order-request
                    code: "40001"
                    message: BAD_REQUEST
                  summary: Bad request.
                Unauthorized:
                  value:
                    id: "1"
                    method: private/batch-order-request
                    code: "40101"
                    message: UNAUTHORIZED
                  summary: Unauthorized.
                Request timeout:
                  value:
                    id: "1"
                    method: private/batch-order-request
                    code: "40801"
                    message: REQUEST_TIMEOUT
                  summary: Request timeout.
                Too many requests:
                  value:
                    id: "1"
                    method: private/batch-order-request
                    code: "42901"
                    message: TOO_MANY_REQUESTS
                  summary: Too many requests.
                Internal server error:
                  value:
                    id: "1"
                    method: private/batch-order-request
                    code: "50001"
                    message: INTERNAL_SERVER_ERROR
                  summary: Internal server error.
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
    WsPrivateBatchOrderRequestRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - nonce
        - params
      description: Request body for private/batch-order-request. A batched order operation endpoint that allows you to submit multiple cancel and create order operations in a single request for a specific instrument.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/batch-order-request"
          example: private/batch-order-request
        nonce:
          type: string
          format: int64
          description: Current timestamp in milliseconds, e.g. "1771761038000".
        params:
          type: object
          required:
            - instrument_name
          properties:
            instrument_name:
              type: string
              example: BTCUSD-PERP
              description: Target instrument for all operations in this batch request.
            cancels:
              type: array
              description: Array of orders to cancel (by order_id or client_oid). At least one of cancels or creates must be non-empty.
              items:
                type: object
                properties:
                  order_id:
                    type: string
                    format: int64
                    description: Order ID to cancel.
                  client_oid:
                    type: string
                    description: Client Order ID to cancel.
            creates:
              type: array
              maxItems: 1000
              description: Array of new orders to create. Maximum 1000 orders per batch. At least one of cancels or creates must be non-empty.
              items:
                allOf:
                  - $ref: "#/components/schemas/WsCreateOrderParams"
                  - type: object
                    properties:
                      instrument_name:
                        description: Instrument name is inherited from parent params.instrument_name and should not be specified in individual create items.
            stp_cancel_type:
              type: string
              description: Self-trade prevention cancel behavior.
            stp_account_enforce_flag:
              type: boolean
              description: Self-trade prevention account enforcement flag.
            stp_group:
              type: string
              description: Self-trade prevention group ID.
    WsCreateOrderParams:
      description: Order parameters for private/create-order (LIMIT, MARKET orders).
      allOf:
        - $ref: "#/components/schemas/WsCreateOrderParamsBase"
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
              $ref: "#/components/schemas/WsSpotMargin"
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
    WsCreateOrderParamsBase:
      type: object
      description: Base order parameters shared by all create-order variants.
      properties:
        instrument_name:
          type: string
          example: BTC_USD
          description: Instrument symbol, e.g. BTCUSD-PERP
        side:
          $ref: "#/components/schemas/WsOrderSide"
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
            - $ref: "#/components/schemas/WsTimeInForce"
            - description: When exec_inst contains POST_ONLY only GOOD_TILL_CANCEL allowed.
        exec_inst:
          type: array
          items:
            $ref: "#/components/schemas/WsExecInstCreateOrder"
          description: Optional array of execution instructions. POST_ONLY and SMART_POST_ONLY mutually exclusive.
        fee_instrument_name:
          type: string
          description: Fee instrument (e.g. CRO) for fee deduction
        stp_id:
          type: string
          description: Self-trade prevention ID (0 to 32767)
        stp_inst:
          $ref: "#/components/schemas/WsStpInst"
        stp_scope:
          $ref: "#/components/schemas/WsStpScope"
    WsOrderSide:
      type: string
      enum:
        - BUY
        - SELL
      description: BUY or SELL
    WsTimeInForce:
      type: string
      enum:
        - GOOD_TILL_CANCEL
        - IMMEDIATE_OR_CANCEL
        - FILL_OR_KILL
      description: Time in force
    WsExecInstCreateOrder:
      type: string
      enum:
        - POST_ONLY
        - REDUCE_ONLY
        - SMART_POST_ONLY
        - ISOLATED_MARGIN
        - MARGIN_ORDER
      description: Execution instruction for create-order. POST_ONLY and SMART_POST_ONLY mutually exclusive.
    WsStpInst:
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
    WsStpScope:
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
    WsSpotMargin:
      type: string
      enum:
        - SPOT
        - MARGIN
      description: SPOT or MARGIN (spot/margin mode).
    WsPrivateBatchOrderRequestResponse:
      $ref: "#/components/schemas/PrivateBatchOrderRequestResponse"
    PrivateBatchOrderRequestResponse:
      type: object
      description: |
        Response for private/batch-order-request (HTTP 200/4xx/5xx).
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
            cancels:
              type: array
              description: Results for cancel operations.
              items:
                type: object
                properties:
                  code:
                    type: string
                    format: int32
                    description: 0 if success.
                  order_id:
                    type: string
                    format: int64
                    description: Order ID that was cancelled.
                  client_oid:
                    type: string
                    description: Client Order ID that was cancelled.
                  message:
                    type: string
                    description: (Optional) Error or status message.
            creates:
              type: array
              description: Results for create operations.
              items:
                type: object
                properties:
                  code:
                    type: string
                    format: int32
                    description: 0 if success.
                  order_id:
                    type: string
                    format: int64
                    description: Newly created order ID.
                  client_oid:
                    type: string
                    description: Client Order ID from the request.
                  message:
                    type: string
                    description: (Optional) Error or status message.
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
```
