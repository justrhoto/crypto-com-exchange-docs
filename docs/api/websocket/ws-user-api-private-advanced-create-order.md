# private/advanced/create-order

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-user-api-private-advanced-create-order

- **Method:** `POST`
- **Path:** `/ws/user-api/private/advanced/create-order`
- **Tags:** Advanced Order Management

Creates a new BUY or SELL trigger order on the Exchange.

`type` must be STOP_LOSS, STOP_LIMIT, TAKE_PROFIT or TAKE_PROFIT_LIMIT.

This call is asynchronous, so the response is simply a confirmation of the request.

The `user.advanced.order` subscription can be used to check if the orders are successfully created.

**Helpful information:**
- STOP_LIMIT and TAKE_PROFIT_LIMIT will execute a LIMIT order when the ref_price is reached.
- STOP_LOSS and TAKE_PROFIT will execute a MARKET order when the ref_price is reached.

**To create trigger orders based on ref_price vs. the reference price (ref_price_type):**
- ref_price below ref_price_type price: SELL STOP_LOSS and STOP_LIMIT, BUY TAKE_PROFIT and TAKE_PROFIT_LIMIT
- ref_price above ref_price_type price: BUY STOP_LOSS and STOP_LIMIT, SELL TAKE_PROFIT and TAKE_PROFIT_LIMIT

**SpotAttach / DerivAttach:**
- **Contingency type resolution**: Automatically resolved from instrument type - spot instruments → SPOT_ATTACH, derivative instruments → DERIV_ATTACH
- **DerivAttach attach-to-order**: Use `attach_order_id` to attach TP/SL to an existing limit order
- **DerivAttach attach-to-position**: Use `attach_isolation_id` to attach TP/SL directly to an existing position (> 0 for isolated position ID, 0 for cross-margin position). Requires REDUCE_ONLY in exec_inst.
- **Standalone TP/SL**: For derivatives, if neither `attach_order_id` nor `attach_isolation_id` is specified, isolation is resolved from `isolation_id` parameter (if provided) or defaults to cross-margin

## Request Body

### Example

```json
{
  "method": "private/advanced/create-order",
  "id": "6573",
  "nonce": "1750385416548",
  "params": {
    "instrument_name": "CRO_USD",
    "side": "SELL",
    "type": "STOP_LIMIT",
    "quantity": "10",
    "price": "0.12",
    "ref_price": "0.12",
    "client_oid": "c5f682ed-7108-4f1c-b755-972fcdca0f02"
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
  title: private/advanced/create-order
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
  /ws/user-api/private/advanced/create-order:
    post:
      operationId: ws-user-api-privateAdvancedCreateOrder
      summary: private/advanced/create-order
      description: |-
        Creates a new BUY or SELL trigger order on the Exchange.

        `type` must be STOP_LOSS, STOP_LIMIT, TAKE_PROFIT or TAKE_PROFIT_LIMIT.

        This call is asynchronous, so the response is simply a confirmation of the request.

        The `user.advanced.order` subscription can be used to check if the orders are successfully created.

        **Helpful information:**
        - STOP_LIMIT and TAKE_PROFIT_LIMIT will execute a LIMIT order when the ref_price is reached.
        - STOP_LOSS and TAKE_PROFIT will execute a MARKET order when the ref_price is reached.

        **To create trigger orders based on ref_price vs. the reference price (ref_price_type):**
        - ref_price below ref_price_type price: SELL STOP_LOSS and STOP_LIMIT, BUY TAKE_PROFIT and TAKE_PROFIT_LIMIT
        - ref_price above ref_price_type price: BUY STOP_LOSS and STOP_LIMIT, SELL TAKE_PROFIT and TAKE_PROFIT_LIMIT

        **SpotAttach / DerivAttach:**
        - **Contingency type resolution**: Automatically resolved from instrument type - spot instruments → SPOT_ATTACH, derivative instruments → DERIV_ATTACH
        - **DerivAttach attach-to-order**: Use `attach_order_id` to attach TP/SL to an existing limit order
        - **DerivAttach attach-to-position**: Use `attach_isolation_id` to attach TP/SL directly to an existing position (> 0 for isolated position ID, 0 for cross-margin position). Requires REDUCE_ONLY in exec_inst.
        - **Standalone TP/SL**: For derivatives, if neither `attach_order_id` nor `attach_isolation_id` is specified, isolation is resolved from `isolation_id` parameter (if provided) or defaults to cross-margin
      tags:
        - Advanced Order Management
      x-type: request
      x-channel-url: wss://stream.crypto.com/exchange/v1/user
      x-channel-group: user
      x-name: private/advanced/create-order
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/WsPrivateAdvancedCreateOrderRequest"
            description: private/advanced/create-order
            example:
              method: private/advanced/create-order
              id: "6573"
              nonce: "1750385416548"
              params:
                instrument_name: CRO_USD
                side: SELL
                type: STOP_LIMIT
                quantity: "10"
                price: "0.12"
                ref_price: "0.12"
                client_oid: c5f682ed-7108-4f1c-b755-972fcdca0f02
      responses:
        "200":
          description: WebSocket response
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/WsPrivateAdvancedCreateOrderResponse"
              examples:
                Success:
                  value:
                    id: "6573"
                    method: private/advanced/create-order
                    code: "0"
                    result:
                      client_oid: c5f682ed-7108-4f1c-b755-972fcdca0f02
                      order_id: "5755600460443882762"
                  summary: Success.
                Bad request:
                  value:
                    id: "1"
                    method: private/advanced/create-order
                    code: "40001"
                    message: BAD_REQUEST
                  summary: Bad request.
                Unauthorized:
                  value:
                    id: "1"
                    method: private/advanced/create-order
                    code: "40101"
                    message: UNAUTHORIZED
                  summary: Unauthorized.
                Request timeout:
                  value:
                    id: "1"
                    method: private/advanced/create-order
                    code: "40801"
                    message: REQUEST_TIMEOUT
                  summary: Request timeout.
                Too many requests:
                  value:
                    id: "1"
                    method: private/advanced/create-order
                    code: "42901"
                    message: TOO_MANY_REQUESTS
                  summary: Too many requests.
                Internal server error:
                  value:
                    id: "1"
                    method: private/advanced/create-order
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
    WsPrivateAdvancedCreateOrderRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - nonce
        - params
      description: Request body for private/advanced/create-order.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/advanced/create-order"
          example: private/advanced/create-order
        nonce:
          type: string
          format: int64
          description: Current timestamp in milliseconds, e.g. "1771761038000".
        params:
          $ref: "#/components/schemas/WsCreateOrderParamsAdvanced"
    WsCreateOrderParamsAdvanced:
      description: Order parameters for private/advanced/create-order (trigger orders).
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
                - STOP_LOSS
                - STOP_LIMIT
                - TAKE_PROFIT
                - TAKE_PROFIT_LIMIT
              description: Trigger order type
            price:
              type: string
              format: decimal
              description: Limit price (required for STOP_LIMIT and TAKE_PROFIT_LIMIT)
            ref_price:
              type: string
              format: decimal
              description: Trigger price (required for all trigger order types)
            ref_price_type:
              allOf:
                - $ref: "#/components/schemas/WsRefPriceType"
                - description: "Reference price type: MARK_PRICE (default), INDEX_PRICE, LAST_PRICE"
            attach_order_id:
              type: string
              format: int64
              description: The order ID this trigger order is attached to. Used to attach TP/SL to an existing limit order (SpotAttach / DerivAttach attach-to-order).
            attach_isolation_id:
              type: string
              description: "Position this trigger order is attached to (DerivAttach attach-to-position, derivatives only). > 0: attach to the isolated position whose isolation_id equals the value. 0: attach to the cross-margin position. Requires REDUCE_ONLY in exec_inst. Mutually exclusive with attach_order_id and isolation_id."
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
    WsRefPriceType:
      type: string
      enum:
        - MARK_PRICE
        - INDEX_PRICE
        - LAST_PRICE
      description: Reference price type for trigger orders
    WsPrivateAdvancedCreateOrderResponse:
      $ref: "#/components/schemas/PrivateAdvancedCreateOrderResponse"
    PrivateAdvancedCreateOrderResponse:
      type: object
      description: |
        Response for private/advanced/create-order (HTTP 200/4xx/5xx).
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
          description: Present when code === 0. Contains order_id and client_oid.
          properties:
            order_id:
              type: string
              format: int64
              description: Newly created order ID.
            client_oid:
              type: string
              description: Newly created client order ID.
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
```
