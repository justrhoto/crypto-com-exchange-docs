# private/create-order-list (LIST)

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-user-api-private-create-order-list

- **Method:** `POST`
- **Path:** `/ws/user-api/private/create-order-list`
- **Tags:** Trading

Create a list of orders on the Exchange.

`contingency_type` must be LIST, for list of orders creation.

This call is asynchronous, so the response is simply a confirmation of the request.

The `user.order` subscription can be used to check if the orders are successfully created.

## Request Body

### Parameters

- `contingency_type` (enum: LIST **required**) - Must be LIST for order-list APIs
- `order_list` (array of object **required**) - LIST: 1-10 orders. See private/create-order for order fields.

### Example

```json
{
  "id": "6573",
  "method": "private/create-order-list",
  "nonce": "1750385416548",
  "params": {
    "contingency_type": "LIST",
    "order_list": [
      {
        "instrument_name": "CRO_USD",
        "side": "SELL",
        "type": "LIMIT",
        "quantity": "10",
        "price": "0.12",
        "client_oid": "api_leg1"
      },
      {
        "instrument_name": "CRO_USD",
        "side": "SELL",
        "type": "LIMIT",
        "quantity": "20",
        "price": "0.122",
        "client_oid": "api_leg2"
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
  title: private/create-order-list (LIST)
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
  /ws/user-api/private/create-order-list:
    post:
      operationId: ws-user-api-privateCreateOrderList
      summary: private/create-order-list (LIST)
      description: |-
        Create a list of orders on the Exchange.

        `contingency_type` must be LIST, for list of orders creation.

        This call is asynchronous, so the response is simply a confirmation of the request.

        The `user.order` subscription can be used to check if the orders are successfully created.
      tags:
        - Trading
      x-type: request
      x-channel-url: wss://stream.crypto.com/exchange/v1/user
      x-channel-group: user
      x-name: private/create-order-list (LIST)
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/WsPrivateCreateOrderListRequest"
            description: private/create-order-list (LIST)
            example:
              id: "6573"
              method: private/create-order-list
              nonce: "1750385416548"
              params:
                contingency_type: LIST
                order_list:
                  - instrument_name: CRO_USD
                    side: SELL
                    type: LIMIT
                    quantity: "10"
                    price: "0.12"
                    client_oid: api_leg1
                  - instrument_name: CRO_USD
                    side: SELL
                    type: LIMIT
                    quantity: "20"
                    price: "0.122"
                    client_oid: api_leg2
      responses:
        "200":
          description: WebSocket response
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/WsPrivateCreateOrderListResponse"
              examples:
                Success:
                  value:
                    id: "6573"
                    method: private/create-order-list
                    code: "0"
                    result:
                      - code: "0"
                        index: "0"
                        client_oid: api_leg1
                        order_id: "5755600460443882762"
                      - code: "0"
                        index: "1"
                        client_oid: api_leg2
                        order_id: "5755600460443882763"
                  summary: Success.
                Bad request:
                  value:
                    id: "1"
                    method: private/create-order-list
                    code: "40001"
                    message: BAD_REQUEST
                  summary: Bad request.
                Unauthorized:
                  value:
                    id: "1"
                    method: private/create-order-list
                    code: "40101"
                    message: UNAUTHORIZED
                  summary: Unauthorized.
                Request timeout:
                  value:
                    id: "1"
                    method: private/create-order-list
                    code: "40801"
                    message: REQUEST_TIMEOUT
                  summary: Request timeout.
                Too many requests:
                  value:
                    id: "1"
                    method: private/create-order-list
                    code: "42901"
                    message: TOO_MANY_REQUESTS
                  summary: Too many requests.
                Internal server error:
                  value:
                    id: "1"
                    method: private/create-order-list
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
    WsPrivateCreateOrderListRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - nonce
        - params
      description: Request body for private/create-order-list.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/create-order-list"
          example: private/create-order-list
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
              $ref: "#/components/schemas/WsContingencyTypeList"
            order_list:
              type: array
              minItems: 1
              maxItems: 10
              description: "LIST: 1-10 orders. See private/create-order for order fields."
              items:
                $ref: "#/components/schemas/WsCreateOrderParams"
    WsContingencyTypeList:
      type: string
      enum:
        - LIST
      description: Must be LIST for order-list APIs
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
    WsPrivateCreateOrderListResponse:
      $ref: "#/components/schemas/PrivateCreateOrderListResponse"
    PrivateCreateOrderListResponse:
      type: object
      description: |
        Response for private/create-order-list (HTTP 200/4xx/5xx).
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
          description: Present when code === 0. Array of { code, index, client_oid, order_id, message } per docs.
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
              client_oid:
                type: string
                description: (Optional) Client order ID if provided in the request (maximum 36 characters).
              order_id:
                type: string
                format: int64
                description: Newly created order ID.
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
