# user.order.{instrument_name}

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-channel-user-order-instrument-name

- **Method:** `POST`
- **Path:** `/ws/channel/user-order-instrument-name`
- **Tags:** Websocket User API

Order updates for the user. Subscribe with channel ["user.order.{instrument_name}"].
Initial response with same id contains current open orders for the instrument; subsequent messages (id -1) are live updates.

## Request Body

### Parameters

- `channels` (array of string **required**) - e.g. ["user.order.BTCUSD-PERP"]

## Responses

### 200 WebSocket response

#### Result

- `channel` (string)
- `data` (array of object)
  Array of objects:
  - `account_id` (string) - Account ID.
  - `attach_isolation_id` (string) - Position this trigger is attached to (DerivAttach attach-to-position): > 0 = isolation_id of the isolated position; 0 = cross-margin position.
  - `attach_order_id` (string (int64)) - The order ID this trigger is attached to (for SpotAttach / DerivAttach attach-to-order orders).
  - `avg_price` (string (decimal)) - Average price.
  - `client_oid` (string) - Client Order ID.
  - `contingency_type` (enum: OCO | OTO | OTOCO | SPOT_ATTACH | DERIV_ATTACH) - Contingency type for advanced orders
  - `create_time` (string (int64)) - Order creation timestamp (ms), e.g. "1771761038000".
  - `create_time_ns` (string (int64)) - Order creation timestamp (nanosecond), e.g. "1771761038000000000".
  - `cumulative_fee` (string (decimal)) - Cumulative executed fee.
  - `cumulative_quantity` (string (decimal)) - Cumulative executed quantity.
  - `cumulative_value` (string (decimal)) - Cumulative executed value.
  - `exchange_order_id` (string) - Order ID assigned by the exchange (present once the leg has been accepted).
  - `exec_inst` (array of enum: POST_ONLY | REDUCE_ONLY | SMART_POST_ONLY | LIQUIDATION | ISOLATED_MARGIN | MARGIN_ORDER) - Execution instructions.
  - `fee_instrument_name` (string) - Currency used for the fees.
  - `instrument_name` (string) - E.g. BTCUSD-PERP.
  - `isolated_margin_amount` (string (decimal)) - Isolated margin amount specified on the primary leg (derivatives only, when provided).
  - `isolation_id` (string) - isolation_id of the isolated position the order is tied to (derivatives only).
  - `isolation_type` (enum: ISOLATED_MARGIN) - ISOLATED_MARGIN when isolation_id > 0 (derivatives only).
  - `leg_id` (string) - Leg id within OTO/OTOCO/OCO; advanced only.
  - `leverage` (number) - Leverage specified on the primary leg (derivatives only, when provided).
  - `limit_price` (string (decimal)) - Limit price specified in the order.
  - `list_id` (string (int64)) - OTO/OTOCO/OCO list id; advanced only.
  - `maker_fee_rate` (string (decimal)) - User's maker fee rate.
  - `order_date` (string) - Order creation date.
  - `order_id` (string (int64)) - Order ID.
  - `order_type` (enum: LIMIT | MARKET | STOP_LOSS | STOP_LIMIT | TAKE_PROFIT | TAKE_PROFIT_LIMIT) - Order type
  - `order_value` (string (decimal)) - Order value.
  - `quantity` (string (decimal)) - Quantity specified in the order.
  - `reason` (string) - Rejection reason code; present for get-order-detail and get-order-history.
  - `ref_price` (string (decimal)) - Trigger reference price (trigger legs only).
  - `ref_price_type` (enum: MARK_PRICE | INDEX_PRICE | LAST_PRICE) - Price source used for ref_price: MARK_PRICE, INDEX_PRICE, or LAST_PRICE (trigger legs only).
  - `reject_reason` (string) - Rejection reason, if the leg was rejected.
  - `side` (enum: BUY | SELL) - BUY or SELL
  - `status` (enum: PENDING | NEW | ACTIVE | FILLED | CANCELED | REJECTED | EXPIRED) - Order status
  - `taker_fee_rate` (string (decimal)) - User's taker fee rate.
  - `time_in_force` (enum: GOOD_TILL_CANCEL | IMMEDIATE_OR_CANCEL | FILL_OR_KILL) - Time in force
  - `update_time` (string (int64)) - Order update timestamp (ms), e.g. "1771761038000".
  - `update_user_id` (string) - Updated user.
- `instrument_name` (string)
- `subscription` (string)

#### Example

```json
{
  "id": 1,
  "method": "subscribe",
  "code": 0,
  "result": {
    "instrument_name": "BTCUSD-PERP",
    "subscription": "user.order.BTCUSD-PERP",
    "channel": "user.order",
    "data": [
      {
        "account_id": "52e7c00f-1324-5a6z-bfgt-de445bde21a5",
        "order_id": "19848525",
        "client_oid": "1613571154900",
        "order_type": "LIMIT",
        "time_in_force": "GOOD_TILL_CANCEL",
        "side": "BUY",
        "exec_inst": [],
        "quantity": "0.0100",
        "limit_price": "50000.0",
        "order_value": "500.000000",
        "maker_fee_rate": "0.000250",
        "taker_fee_rate": "0.000400",
        "avg_price": "0.0",
        "cumulative_quantity": "0.0000",
        "cumulative_value": "0.000000",
        "cumulative_fee": "0.000000",
        "status": "ACTIVE",
        "update_user_id": "fd797356-55db-48c2-a44d-157aabf702e8",
        "order_date": "2021-02-17",
        "instrument_name": "BTCUSD-PERP",
        "fee_instrument_name": "USD",
        "create_time": 1613575617173,
        "create_time_ns": "1613575617173123456",
        "update_time": 1613575617173,
        "transaction_time": 1613575617173,
        "transaction_time_ns": "1613570791060827635"
      }
    ]
  }
}
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: user.order.{instrument_name}
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
  /ws/channel/user-order-instrument-name:
    post:
      operationId: ws-channel-user-order-instrument-name
      summary: user.order.{instrument_name}
      description: |-
        Order updates for the user. Subscribe with channel ["user.order.{instrument_name}"].
        Initial response with same id contains current open orders for the instrument; subsequent messages (id -1) are live updates.
      tags:
        - Websocket User API
      x-type: channel
      x-channel-url: wss://stream.crypto.com/exchange/v1/user
      x-channel-group: user
      x-name: user.order.{instrument_name}
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - id
                - method
                - params
                - nonce
              properties:
                id:
                  type: integer
                  description: Request id
                method:
                  type: string
                  enum:
                    - subscribe
                params:
                  type: object
                  required:
                    - channels
                  properties:
                    channels:
                      type: array
                      items:
                        type: string
                      description: e.g. ["user.order.BTCUSD-PERP"]
                      example:
                        - user.order.BTCUSD-PERP
                nonce:
                  type: integer
                  description: Current timestamp in milliseconds
            description: Subscribe request for this channel
      responses:
        "200":
          description: WebSocket response
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/WsUserOrderPayload"
              example:
                id: 1
                method: subscribe
                code: 0
                result:
                  instrument_name: BTCUSD-PERP
                  subscription: user.order.BTCUSD-PERP
                  channel: user.order
                  data:
                    - account_id: 52e7c00f-1324-5a6z-bfgt-de445bde21a5
                      order_id: "19848525"
                      client_oid: "1613571154900"
                      order_type: LIMIT
                      time_in_force: GOOD_TILL_CANCEL
                      side: BUY
                      exec_inst: []
                      quantity: "0.0100"
                      limit_price: "50000.0"
                      order_value: "500.000000"
                      maker_fee_rate: "0.000250"
                      taker_fee_rate: "0.000400"
                      avg_price: "0.0"
                      cumulative_quantity: "0.0000"
                      cumulative_value: "0.000000"
                      cumulative_fee: "0.000000"
                      status: ACTIVE
                      update_user_id: fd797356-55db-48c2-a44d-157aabf702e8
                      order_date: "2021-02-17"
                      instrument_name: BTCUSD-PERP
                      fee_instrument_name: USD
                      create_time: 1613575617173
                      create_time_ns: "1613575617173123456"
                      update_time: 1613575617173
                      transaction_time: 1613575617173
                      transaction_time_ns: "1613570791060827635"
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
    WsUserOrderPayload:
      type: object
      description: Subscription response; id echoes request (or -1 for push), method "subscribe", result contains subscription/channel/data (array of order objects).
      properties:
        id:
          type: string
          format: int64
        method:
          type: string
        code:
          type: string
          format: int32
        result:
          type: object
          properties:
            instrument_name:
              type: string
            subscription:
              type: string
            channel:
              type: string
            data:
              type: array
              items:
                $ref: "#/components/schemas/WsPrivateOrder"
      example:
        id: 1
        method: subscribe
        code: 0
        result:
          instrument_name: BTCUSD-PERP
          subscription: user.order.BTCUSD-PERP
          channel: user.order
          data:
            - account_id: 52e7c00f-1324-5a6z-bfgt-de445bde21a5
              order_id: "19848525"
              client_oid: "1613571154900"
              order_type: LIMIT
              time_in_force: GOOD_TILL_CANCEL
              side: BUY
              exec_inst: []
              quantity: "0.0100"
              limit_price: "50000.0"
              order_value: "500.000000"
              maker_fee_rate: "0.000250"
              taker_fee_rate: "0.000400"
              avg_price: "0.0"
              cumulative_quantity: "0.0000"
              cumulative_value: "0.000000"
              cumulative_fee: "0.000000"
              status: ACTIVE
              update_user_id: fd797356-55db-48c2-a44d-157aabf702e8
              order_date: "2021-02-17"
              instrument_name: BTCUSD-PERP
              fee_instrument_name: USD
              create_time: 1613575617173
              create_time_ns: "1613575617173123456"
              update_time: 1613575617173
              transaction_time: 1613575617173
              transaction_time_ns: "1613570791060827635"
    WsPrivateOrder:
      type: object
      description: Order object shared by get-order-detail, get-open-orders, get-order-history and advanced variants. reason optional (detail/history). list_id, contingency_type, leg_id, ref_price, ref_price_type optional (advanced OTO/OTOCO only).
      properties:
        account_id:
          type: string
          description: Account ID.
        order_id:
          type: string
          format: int64
          description: Order ID.
        client_oid:
          type: string
          description: Client Order ID.
        order_type:
          $ref: "#/components/schemas/WsOrderType"
        time_in_force:
          $ref: "#/components/schemas/WsTimeInForce"
        side:
          $ref: "#/components/schemas/WsOrderSide"
        exec_inst:
          type: array
          items:
            $ref: "#/components/schemas/WsExecInstOrderDetail"
          description: Execution instructions.
        quantity:
          type: string
          format: decimal
          description: Quantity specified in the order.
        limit_price:
          type: string
          format: decimal
          description: Limit price specified in the order.
        order_value:
          type: string
          format: decimal
          description: Order value.
        maker_fee_rate:
          type: string
          format: decimal
          description: User's maker fee rate.
        taker_fee_rate:
          type: string
          format: decimal
          description: User's taker fee rate.
        avg_price:
          type: string
          format: decimal
          description: Average price.
        cumulative_quantity:
          type: string
          format: decimal
          description: Cumulative executed quantity.
        cumulative_value:
          type: string
          format: decimal
          description: Cumulative executed value.
        cumulative_fee:
          type: string
          format: decimal
          description: Cumulative executed fee.
        status:
          $ref: "#/components/schemas/WsOrderStatus"
        update_user_id:
          type: string
          description: Updated user.
        order_date:
          type: string
          description: Order creation date.
        instrument_name:
          type: string
          description: E.g. BTCUSD-PERP.
        fee_instrument_name:
          type: string
          description: Currency used for the fees.
        create_time:
          type: string
          format: int64
          description: Order creation timestamp (ms), e.g. "1771761038000".
        create_time_ns:
          type: string
          format: int64
          description: Order creation timestamp (nanosecond), e.g. "1771761038000000000".
        update_time:
          type: string
          format: int64
          description: Order update timestamp (ms), e.g. "1771761038000".
        reason:
          type: string
          description: Rejection reason code; present for get-order-detail and get-order-history.
        isolation_id:
          type: string
          description: isolation_id of the isolated position the order is tied to (derivatives only).
        isolation_type:
          type: string
          enum:
            - ISOLATED_MARGIN
          description: ISOLATED_MARGIN when isolation_id > 0 (derivatives only).
        list_id:
          type: string
          format: int64
          description: OTO/OTOCO/OCO list id; advanced only.
        contingency_type:
          $ref: "#/components/schemas/WsContingencyType"
        leg_id:
          type: string
          description: Leg id within OTO/OTOCO/OCO; advanced only.
        ref_price:
          type: string
          format: decimal
          description: Trigger reference price (trigger legs only).
        ref_price_type:
          type: string
          enum:
            - MARK_PRICE
            - INDEX_PRICE
            - LAST_PRICE
          description: "Price source used for ref_price: MARK_PRICE, INDEX_PRICE, or LAST_PRICE (trigger legs only)."
        attach_order_id:
          type: string
          format: int64
          description: The order ID this trigger is attached to (for SpotAttach / DerivAttach attach-to-order orders).
        attach_isolation_id:
          type: string
          description: "Position this trigger is attached to (DerivAttach attach-to-position): > 0 = isolation_id of the isolated position; 0 = cross-margin position."
        exchange_order_id:
          type: string
          description: Order ID assigned by the exchange (present once the leg has been accepted).
        reject_reason:
          type: string
          description: Rejection reason, if the leg was rejected.
        leverage:
          type: number
          description: Leverage specified on the primary leg (derivatives only, when provided).
        isolated_margin_amount:
          type: string
          format: decimal
          description: Isolated margin amount specified on the primary leg (derivatives only, when provided).
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
    WsTimeInForce:
      type: string
      enum:
        - GOOD_TILL_CANCEL
        - IMMEDIATE_OR_CANCEL
        - FILL_OR_KILL
      description: Time in force
    WsOrderSide:
      type: string
      enum:
        - BUY
        - SELL
      description: BUY or SELL
    WsExecInstOrderDetail:
      type: string
      enum:
        - POST_ONLY
        - REDUCE_ONLY
        - SMART_POST_ONLY
        - LIQUIDATION
        - ISOLATED_MARGIN
        - MARGIN_ORDER
      description: Execution instruction as returned in order detail.
    WsOrderStatus:
      type: string
      enum:
        - PENDING
        - NEW
        - ACTIVE
        - FILLED
        - CANCELED
        - REJECTED
        - EXPIRED
      description: Order status
    WsContingencyType:
      type: string
      enum:
        - OCO
        - OTO
        - OTOCO
        - SPOT_ATTACH
        - DERIV_ATTACH
      description: |
        Contingency type for advanced orders:
        - ➖ OCO: One-Cancels-the-Other
        - ➖ OTO: One-Triggers-the-Other
        - ➖ OTOCO: One-Triggers-a-One-Cancels-the-Other
        - ➖ SPOT_ATTACH: SpotAttach (TP/SL attached to order for spot instruments)
        - ➖ DERIV_ATTACH: DerivAttach (TP/SL attached to order or position for derivative instruments)
```
