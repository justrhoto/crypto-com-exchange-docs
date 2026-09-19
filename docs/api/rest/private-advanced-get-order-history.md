# private/advanced/get-order-history

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/private-advanced-get-order-history

- **Method:** `POST`
- **Path:** `/private/advanced/get-order-history`
- **Tags:** Advanced Order Management

Gets the order history of OTO/OTOCO orders for a particular instrument.

Users should use `user.advance.order` to keep track of real-time order updates, and `private/advanced/get-order-history` should primarily be used for recovery; typically when the websocket is disconnected.

## Request Body

### Parameters

- `end_time` (string (int64)) - End time in Unix time format (exclusive), ms or ns. Default: current system timestamp. Nanosecond is recommended for accurate pagination.
- `instrument_name` (string) - e.g. BTCUSD-PERP. Omit for 'all'.
- `limit` (string (int32)) - Maximum number of results to return before end_time. Default: 100. Max: 100.
- `start_time` (string (int64)) - Start time in Unix time format (inclusive), ms or ns. Default: end_time - 1 day. Nanosecond is recommended for accurate pagination.

### Example

```json
{
  "id": "1",
  "method": "private/advanced/get-order-history",
  "api_key": "YOUR_API_KEY",
  "sig": "DIGITAL_SIGNATURE",
  "nonce": "1739923200000",
  "params": {
    "instrument_name": "BTC_USD",
    "start_time": "1610905028000081486",
    "end_time": "1613570791058211357",
    "limit": "20"
  }
}
```

## Responses

### 200 Success.

#### Result

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

#### Example

```json
{
  "id": "1",
  "method": "private/advanced/get-order-history",
  "code": "0",
  "result": {
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
        "cumulative_quantity": "0.0100",
        "cumulative_value": "500.000000",
        "cumulative_fee": "0.000000",
        "status": "FILLED",
        "update_user_id": "fd797356-55db-48c2-a44d-157aabf702e8",
        "order_date": "2021-02-17",
        "instrument_name": "BTCUSD",
        "fee_instrument_name": "USD",
        "list_id": "6498090546073120100",
        "contingency_type": "OTOCO",
        "leg_id": "1",
        "create_time": "1613575617173",
        "create_time_ns": "1613575617173123456",
        "update_time": "1613575617173"
      },
      {
        "account_id": "52e7c00f-1324-5a6z-bfgt-de445bde21a5",
        "order_id": "19848526",
        "client_oid": "1613571154901",
        "order_type": "STOP_LOSS",
        "time_in_force": "GOOD_TILL_CANCEL",
        "side": "SELL",
        "exec_inst": [],
        "quantity": "0.0100",
        "ref_price": "45000.00",
        "ref_price_type": "MARK_PRICE",
        "maker_fee_rate": "0.000250",
        "taker_fee_rate": "0.000400",
        "avg_price": "0.0",
        "cumulative_quantity": "0.0100",
        "cumulative_value": "450.0000",
        "cumulative_fee": "0.000000",
        "status": "FILLED",
        "update_user_id": "fd797356-55db-48c2-a44d-157aabf702e8",
        "order_date": "2021-02-17",
        "instrument_name": "BTCUSD",
        "fee_instrument_name": "USD",
        "list_id": "6498090546073120100",
        "contingency_type": "OTOCO",
        "leg_id": "2",
        "create_time": "1613575617173",
        "create_time_ns": "1613575617173123456",
        "update_time": "1613575617173"
      },
      {
        "account_id": "52e7c00f-1324-5a6z-bfgt-de445bde21a5",
        "order_id": "19848526",
        "client_oid": "1613571154901",
        "order_type": "TAKE_PROFIT",
        "time_in_force": "GOOD_TILL_CANCEL",
        "side": "SELL",
        "exec_inst": [],
        "quantity": "0.0100",
        "ref_price": "55000.00",
        "ref_price_type": "MARK_PRICE",
        "maker_fee_rate": "0.000250",
        "taker_fee_rate": "0.000400",
        "avg_price": "0.0",
        "cumulative_quantity": "0.0000",
        "cumulative_value": "0.000000",
        "cumulative_fee": "0.000000",
        "status": "CANCELED",
        "update_user_id": "fd797356-55db-48c2-a44d-157aabf702e8",
        "order_date": "2021-02-17",
        "instrument_name": "BTCUSD",
        "fee_instrument_name": "USD",
        "list_id": "6498090546073120100",
        "contingency_type": "OTOCO",
        "leg_id": "3",
        "create_time": "1613575617173",
        "create_time_ns": "1613575617173123456",
        "update_time": "1613575617173"
      }
    ]
  }
}
```

### 400 Bad request.

#### Example

```json
{
  "id": "1",
  "method": "private/advanced/get-order-history",
  "code": "40001",
  "message": "BAD_REQUEST"
}
```

### 401 Unauthorized.

#### Example

```json
{
  "id": "1",
  "method": "private/advanced/get-order-history",
  "code": "40101",
  "message": "UNAUTHORIZED"
}
```

### 408 Request timeout.

#### Example

```json
{
  "id": "1",
  "method": "private/advanced/get-order-history",
  "code": "40801",
  "message": "REQUEST_TIMEOUT"
}
```

### 429 Too many requests.

#### Example

```json
{
  "id": "1",
  "method": "private/advanced/get-order-history",
  "code": "42901",
  "message": "TOO_MANY_REQUESTS"
}
```

### 500 Internal server error.

#### Example

```json
{
  "id": "1",
  "method": "private/advanced/get-order-history",
  "code": "50001",
  "message": "INTERNAL_SERVER_ERROR"
}
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: private/advanced/get-order-history
  version: 1.0.0
servers:
  - url: https://api.crypto.com/exchange/v1
    description: Production
  - url: https://uat-api.3ona.co/exchange/v1
    description: UAT Sandbox
paths:
  /private/advanced/get-order-history:
    post:
      tags:
        - Advanced Order Management
      x-apply-to:
        - rest
      summary: private/advanced/get-order-history
      description: |
        Gets the order history of OTO/OTOCO orders for a particular instrument.

        Users should use `user.advance.order` to keep track of real-time order updates, and `private/advanced/get-order-history` should primarily be used for recovery; typically when the websocket is disconnected.
      operationId: privateAdvancedGetOrderHistory
      x-codeSamples: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PrivateAdvancedGetOrderHistoryRequest"
            example:
              id: "1"
              method: private/advanced/get-order-history
              api_key: YOUR_API_KEY
              sig: DIGITAL_SIGNATURE
              nonce: "1739923200000"
              params:
                instrument_name: BTC_USD
                start_time: "1610905028000081486"
                end_time: "1613570791058211357"
                limit: "20"
      responses:
        "200":
          description: Success.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateAdvancedGetOrderHistoryResponse"
              example:
                id: "1"
                method: private/advanced/get-order-history
                code: "0"
                result:
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
                      cumulative_quantity: "0.0100"
                      cumulative_value: "500.000000"
                      cumulative_fee: "0.000000"
                      status: FILLED
                      update_user_id: fd797356-55db-48c2-a44d-157aabf702e8
                      order_date: "2021-02-17"
                      instrument_name: BTCUSD
                      fee_instrument_name: USD
                      list_id: "6498090546073120100"
                      contingency_type: OTOCO
                      leg_id: "1"
                      create_time: "1613575617173"
                      create_time_ns: "1613575617173123456"
                      update_time: "1613575617173"
                    - account_id: 52e7c00f-1324-5a6z-bfgt-de445bde21a5
                      order_id: "19848526"
                      client_oid: "1613571154901"
                      order_type: STOP_LOSS
                      time_in_force: GOOD_TILL_CANCEL
                      side: SELL
                      exec_inst: []
                      quantity: "0.0100"
                      ref_price: "45000.00"
                      ref_price_type: MARK_PRICE
                      maker_fee_rate: "0.000250"
                      taker_fee_rate: "0.000400"
                      avg_price: "0.0"
                      cumulative_quantity: "0.0100"
                      cumulative_value: "450.0000"
                      cumulative_fee: "0.000000"
                      status: FILLED
                      update_user_id: fd797356-55db-48c2-a44d-157aabf702e8
                      order_date: "2021-02-17"
                      instrument_name: BTCUSD
                      fee_instrument_name: USD
                      list_id: "6498090546073120100"
                      contingency_type: OTOCO
                      leg_id: "2"
                      create_time: "1613575617173"
                      create_time_ns: "1613575617173123456"
                      update_time: "1613575617173"
                    - account_id: 52e7c00f-1324-5a6z-bfgt-de445bde21a5
                      order_id: "19848526"
                      client_oid: "1613571154901"
                      order_type: TAKE_PROFIT
                      time_in_force: GOOD_TILL_CANCEL
                      side: SELL
                      exec_inst: []
                      quantity: "0.0100"
                      ref_price: "55000.00"
                      ref_price_type: MARK_PRICE
                      maker_fee_rate: "0.000250"
                      taker_fee_rate: "0.000400"
                      avg_price: "0.0"
                      cumulative_quantity: "0.0000"
                      cumulative_value: "0.000000"
                      cumulative_fee: "0.000000"
                      status: CANCELED
                      update_user_id: fd797356-55db-48c2-a44d-157aabf702e8
                      order_date: "2021-02-17"
                      instrument_name: BTCUSD
                      fee_instrument_name: USD
                      list_id: "6498090546073120100"
                      contingency_type: OTOCO
                      leg_id: "3"
                      create_time: "1613575617173"
                      create_time_ns: "1613575617173123456"
                      update_time: "1613575617173"
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateAdvancedGetOrderHistoryResponse"
              example:
                id: "1"
                method: private/advanced/get-order-history
                code: "40001"
                message: BAD_REQUEST
        "401":
          description: Unauthorized.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateAdvancedGetOrderHistoryResponse"
              example:
                id: "1"
                method: private/advanced/get-order-history
                code: "40101"
                message: UNAUTHORIZED
        "408":
          description: Request timeout.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateAdvancedGetOrderHistoryResponse"
              example:
                id: "1"
                method: private/advanced/get-order-history
                code: "40801"
                message: REQUEST_TIMEOUT
        "429":
          description: Too many requests.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateAdvancedGetOrderHistoryResponse"
              example:
                id: "1"
                method: private/advanced/get-order-history
                code: "42901"
                message: TOO_MANY_REQUESTS
        "500":
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateAdvancedGetOrderHistoryResponse"
              example:
                id: "1"
                method: private/advanced/get-order-history
                code: "50001"
                message: INTERNAL_SERVER_ERROR
components:
  schemas:
    PrivateAdvancedGetOrderHistoryRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - api_key
        - sig
        - nonce
        - params
      description: Request body for private/advanced/get-order-history.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/advanced/get-order-history"
          example: private/advanced/get-order-history
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
          properties:
            instrument_name:
              type: string
              description: e.g. BTCUSD-PERP. Omit for 'all'.
            start_time:
              type: string
              format: int64
              description: "Start time in Unix time format (inclusive), ms or ns. Default: end_time - 1 day. Nanosecond is recommended for accurate pagination."
            end_time:
              type: string
              format: int64
              description: "End time in Unix time format (exclusive), ms or ns. Default: current system timestamp. Nanosecond is recommended for accurate pagination."
            limit:
              type: string
              format: int32
              description: "Maximum number of results to return before end_time. Default: 100. Max: 100."
    PrivateAdvancedGetOrderHistoryResponse:
      type: object
      description: |
        Response for private/advanced/get-order-history (HTTP 200/4xx/5xx).
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
          description: Present when code === 0. result.data[] (OTO/OTOCO order history).
          properties:
            data:
              type: array
              items:
                $ref: "#/components/schemas/PrivateOrder"
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
    PrivateOrder:
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
          $ref: "#/components/schemas/OrderType"
        time_in_force:
          $ref: "#/components/schemas/TimeInForce"
        side:
          $ref: "#/components/schemas/OrderSide"
        exec_inst:
          type: array
          items:
            $ref: "#/components/schemas/ExecInstOrderDetail"
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
          $ref: "#/components/schemas/OrderStatus"
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
          $ref: "#/components/schemas/ContingencyType"
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
    OrderType:
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
    TimeInForce:
      type: string
      enum:
        - GOOD_TILL_CANCEL
        - IMMEDIATE_OR_CANCEL
        - FILL_OR_KILL
      description: Time in force
    OrderSide:
      type: string
      enum:
        - BUY
        - SELL
      description: BUY or SELL
    ExecInstOrderDetail:
      type: string
      enum:
        - POST_ONLY
        - REDUCE_ONLY
        - SMART_POST_ONLY
        - LIQUIDATION
        - ISOLATED_MARGIN
        - MARGIN_ORDER
      description: Execution instruction as returned in order detail.
    OrderStatus:
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
    ContingencyType:
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
