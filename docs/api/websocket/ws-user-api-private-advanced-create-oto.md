# private/advanced/create-oto

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-user-api-private-advanced-create-oto

- **Method:** `POST`
- **Path:** `/ws/user-api/private/advanced/create-oto`
- **Tags:** Advanced Order Management

Creates a One-triggers-the-Other (OTO) execution strategy on the Exchange.

OTO execution strategy allows users to place a two-order strategy where one order automatically triggers the other when the first order is fully executed. Users are able to place a limit or market order with a trigger order, and only when the primary order is fully executed, the trigger order will take effect. The trigger order can either be a stop loss or take profit order.

**SpotAttach / DerivAttach:** This API creates SpotAttach (for spot instruments) or DerivAttach (for derivative instruments) order types. The contingency type is automatically resolved from the instrument type. With 2 legs (1 limit/market + 1 trigger), it follows OTO behavior.
- **SpotAttach**: Flexible - you can later attach additional TP/SL using `private/advanced/create-order` with `attach_order_id`, effectively converting it to OTOCO behavior. You can also cancel individual legs using `private/advanced/cancel-order` and reattach new ones.
- **DerivAttach**: For derivatives, the primary leg may specify `isolation_id`, `leverage`, `isolated_margin_amount`, and `exec_inst` may include ISOLATED_MARGIN. Trigger legs inherit the isolation mode from the parent leg.

This call is asynchronous, so the response is simply a confirmation of the request. The `user.advanced.order` subscription can be used to check if the orders are successfully created.

For the content of each order in order_list, please refer to `private/create-order` for details. One order must be `LIMIT` or `MARKET`, and the other must be `STOP_LOSS`, `STOP_LIMIT`, `TAKE_PROFIT_LIMIT` or `TAKE_PROFIT`. The `ref_price_type` for the trigger order supports `MARK_PRICE` (default), `INDEX_PRICE`, and `LAST_PRICE`.

## Request Body

### Parameters

- `order_list` (array of object **required**) - Exactly 2 orders. One must be LIMIT or MARKET, the other STOP_LOSS, STOP_LIMIT, TAKE_PROFIT_LIMIT or TAKE_PROFIT. ref_price_type supports MARK_PRICE (default), INDEX_PRICE, LAST_PRICE.

### Example

```json
{
  "method": "private/advanced/create-oto",
  "id": "123456789",
  "nonce": "123456789000",
  "params": {
    "order_list": [
      {
        "instrument_name": "BTCUSD",
        "quantity": "0.1",
        "type": "LIMIT",
        "price": "93000",
        "side": "BUY"
      },
      {
        "instrument_name": "BTCUSD",
        "quantity": "0.1",
        "type": "STOP_LOSS",
        "ref_price": "80000",
        "side": "SELL"
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
  title: private/advanced/create-oto
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
  /ws/user-api/private/advanced/create-oto:
    post:
      operationId: ws-user-api-privateAdvancedCreateOto
      summary: private/advanced/create-oto
      description: |-
        Creates a One-triggers-the-Other (OTO) execution strategy on the Exchange.

        OTO execution strategy allows users to place a two-order strategy where one order automatically triggers the other when the first order is fully executed. Users are able to place a limit or market order with a trigger order, and only when the primary order is fully executed, the trigger order will take effect. The trigger order can either be a stop loss or take profit order.

        **SpotAttach / DerivAttach:** This API creates SpotAttach (for spot instruments) or DerivAttach (for derivative instruments) order types. The contingency type is automatically resolved from the instrument type. With 2 legs (1 limit/market + 1 trigger), it follows OTO behavior.
        - **SpotAttach**: Flexible - you can later attach additional TP/SL using `private/advanced/create-order` with `attach_order_id`, effectively converting it to OTOCO behavior. You can also cancel individual legs using `private/advanced/cancel-order` and reattach new ones.
        - **DerivAttach**: For derivatives, the primary leg may specify `isolation_id`, `leverage`, `isolated_margin_amount`, and `exec_inst` may include ISOLATED_MARGIN. Trigger legs inherit the isolation mode from the parent leg.

        This call is asynchronous, so the response is simply a confirmation of the request. The `user.advanced.order` subscription can be used to check if the orders are successfully created.

        For the content of each order in order_list, please refer to `private/create-order` for details. One order must be `LIMIT` or `MARKET`, and the other must be `STOP_LOSS`, `STOP_LIMIT`, `TAKE_PROFIT_LIMIT` or `TAKE_PROFIT`. The `ref_price_type` for the trigger order supports `MARK_PRICE` (default), `INDEX_PRICE`, and `LAST_PRICE`.
      tags:
        - Advanced Order Management
      x-type: request
      x-channel-url: wss://stream.crypto.com/exchange/v1/user
      x-channel-group: user
      x-name: private/advanced/create-oto
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/WsPrivateAdvancedCreateOtoRequest"
            description: private/advanced/create-oto
            example:
              method: private/advanced/create-oto
              id: "123456789"
              nonce: "123456789000"
              params:
                order_list:
                  - instrument_name: BTCUSD
                    quantity: "0.1"
                    type: LIMIT
                    price: "93000"
                    side: BUY
                  - instrument_name: BTCUSD
                    quantity: "0.1"
                    type: STOP_LOSS
                    ref_price: "80000"
                    side: SELL
      responses:
        "200":
          description: WebSocket response
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/WsPrivateAdvancedCreateOtoResponse"
              examples:
                Success:
                  value:
                    id: "1661331443"
                    method: private/advanced/create-oto
                    code: "0"
                    result:
                      list_id: "6498090546073120100"
                  summary: Success.
                Bad request:
                  value:
                    id: "1"
                    method: private/advanced/create-oto
                    code: "40001"
                    message: BAD_REQUEST
                  summary: Bad request.
                Unauthorized:
                  value:
                    id: "1"
                    method: private/advanced/create-oto
                    code: "40101"
                    message: UNAUTHORIZED
                  summary: Unauthorized.
                Request timeout:
                  value:
                    id: "1"
                    method: private/advanced/create-oto
                    code: "40801"
                    message: REQUEST_TIMEOUT
                  summary: Request timeout.
                Too many requests:
                  value:
                    id: "1"
                    method: private/advanced/create-oto
                    code: "42901"
                    message: TOO_MANY_REQUESTS
                  summary: Too many requests.
                Internal server error:
                  value:
                    id: "1"
                    method: private/advanced/create-oto
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
    WsPrivateAdvancedCreateOtoRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - nonce
        - params
      description: Request body for private/advanced/create-oto.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/advanced/create-oto"
          example: private/advanced/create-oto
        nonce:
          type: string
          format: int64
          description: Current timestamp in milliseconds, e.g. "1771761038000".
        params:
          type: object
          required:
            - order_list
          properties:
            order_list:
              type: array
              minItems: 2
              maxItems: 2
              description: Exactly 2 orders. One must be LIMIT or MARKET, the other STOP_LOSS, STOP_LIMIT, TAKE_PROFIT_LIMIT or TAKE_PROFIT. ref_price_type supports MARK_PRICE (default), INDEX_PRICE, LAST_PRICE.
              items:
                $ref: "#/components/schemas/WsCreateOrderParamsAdvancedMultiLeg"
    WsCreateOrderParamsAdvancedMultiLeg:
      description: Order parameters for advanced multi-leg orders (OCO/OTO/OTOCO) that accept both LIMIT/MARKET and trigger types.
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
              $ref: "#/components/schemas/WsOrderType"
            price:
              type: string
              format: decimal
              example: "1"
              description: Limit price (required for LIMIT, STOP_LIMIT, TAKE_PROFIT_LIMIT)
            notional:
              type: string
              format: decimal
              description: Amount to spend; for MARKET/STOP_LOSS/TAKE_PROFIT BUY only
            ref_price:
              type: string
              format: decimal
              description: Trigger price for STOP_LOSS, STOP_LIMIT, TAKE_PROFIT, TAKE_PROFIT_LIMIT
            ref_price_type:
              allOf:
                - $ref: "#/components/schemas/WsRefPriceType"
                - description: "Reference price type: MARK_PRICE (default), INDEX_PRICE, LAST_PRICE"
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
            attach_order_id:
              type: string
              format: int64
              description: Order ID to attach this trigger order to. Used for SpotAttach / DerivAttach.
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
    WsOrderType:
      type: string
      enum:
        - LIMIT
        - MARKET
        - STOP_LOSS
        - STOP_LIMIT
        - TAKE_PROFIT
        - TAKE_PROFIT_LIMIT
      description: |
        Order type:
        - ➖ LIMIT, MARKET
        - ➖ STOP_LOSS, STOP_LIMIT, TAKE_PROFIT, TAKE_PROFIT_LIMIT: Trigger orders
    WsRefPriceType:
      type: string
      enum:
        - MARK_PRICE
        - INDEX_PRICE
        - LAST_PRICE
      description: Reference price type for trigger orders
    WsSpotMargin:
      type: string
      enum:
        - SPOT
        - MARGIN
      description: SPOT or MARGIN (spot/margin mode).
    WsPrivateAdvancedCreateOtoResponse:
      $ref: "#/components/schemas/PrivateAdvancedCreateOtoResponse"
    PrivateAdvancedCreateOtoResponse:
      type: object
      description: |
        Response for private/advanced/create-oto (HTTP 200/4xx/5xx).
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
          description: Present when code === 0. list_id.
          properties:
            list_id:
              type: string
              format: int64
              description: List ID.
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
```
