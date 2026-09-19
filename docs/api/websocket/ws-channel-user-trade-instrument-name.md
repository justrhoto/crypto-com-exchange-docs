# user.trade.{instrument_name}

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-channel-user-trade-instrument-name

- **Method:** `POST`
- **Path:** `/ws/channel/user-trade-instrument-name`
- **Tags:** Websocket User API

Trade updates for the user. Subscribe with channel ["user.trade.{instrument_name}"].

## Request Body

### Parameters

- `channels` (array of string **required**) - e.g. ["user.trade.BTCUSD-PERP"]

## Responses

### 200 WebSocket response

#### Result

- `channel` (string)
- `data` (array of object)
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
    "subscription": "user.trade.BTCUSD-PERP",
    "channel": "user.trade",
    "data": [
      {
        "account_id": "52e7c00f-1324-5a6z-bfgt-de445bde21a5",
        "event_date": "2021-02-17",
        "journal_type": "TRADING",
        "traded_quantity": "0.0500",
        "traded_price": "51278.5",
        "fees": "-1.025570",
        "fee_credits": "-0.500000",
        "order_id": "19708564",
        "trade_id": "38554669",
        "trade_match_id": "76423",
        "client_oid": "6ac2421d-5078-4ef6-a9d5-9680602ce123",
        "taker_side": "MAKER",
        "side": "BUY",
        "instrument_name": "BTCUSD-PERP",
        "fee_instrument_name": "USD",
        "create_time": 1613570791060,
        "create_time_ns": "1613570791060123456"
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
  title: user.trade.{instrument_name}
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
  /ws/channel/user-trade-instrument-name:
    post:
      operationId: ws-channel-user-trade-instrument-name
      summary: user.trade.{instrument_name}
      description: Trade updates for the user. Subscribe with channel ["user.trade.{instrument_name}"].
      tags:
        - Websocket User API
      x-type: channel
      x-channel-url: wss://stream.crypto.com/exchange/v1/user
      x-channel-group: user
      x-name: user.trade.{instrument_name}
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
                      description: e.g. ["user.trade.BTCUSD-PERP"]
                      example:
                        - user.trade.BTCUSD-PERP
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
                $ref: "#/components/schemas/WsUserTradePayload"
              example:
                id: 1
                method: subscribe
                code: 0
                result:
                  instrument_name: BTCUSD-PERP
                  subscription: user.trade.BTCUSD-PERP
                  channel: user.trade
                  data:
                    - account_id: 52e7c00f-1324-5a6z-bfgt-de445bde21a5
                      event_date: "2021-02-17"
                      journal_type: TRADING
                      traded_quantity: "0.0500"
                      traded_price: "51278.5"
                      fees: "-1.025570"
                      fee_credits: "-0.500000"
                      order_id: "19708564"
                      trade_id: "38554669"
                      trade_match_id: "76423"
                      client_oid: 6ac2421d-5078-4ef6-a9d5-9680602ce123
                      taker_side: MAKER
                      side: BUY
                      instrument_name: BTCUSD-PERP
                      fee_instrument_name: USD
                      create_time: 1613570791060
                      create_time_ns: "1613570791060123456"
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
    WsUserTradePayload:
      type: object
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
                $ref: "#/components/schemas/WsWsTradeItem"
      example:
        id: 1
        method: subscribe
        code: 0
        result:
          instrument_name: BTCUSD-PERP
          subscription: user.trade.BTCUSD-PERP
          channel: user.trade
          data:
            - account_id: 52e7c00f-1324-5a6z-bfgt-de445bde21a5
              event_date: "2021-02-17"
              journal_type: TRADING
              traded_quantity: "0.0500"
              traded_price: "51278.5"
              fees: "-1.025570"
              fee_credits: "-0.500000"
              order_id: "19708564"
              trade_id: "38554669"
              trade_match_id: "76423"
              client_oid: 6ac2421d-5078-4ef6-a9d5-9680602ce123
              taker_side: MAKER
              side: BUY
              instrument_name: BTCUSD-PERP
              fee_instrument_name: USD
              create_time: 1613570791060
              create_time_ns: "1613570791060123456"
    WsWsTradeItem:
      description: Trade item for WS user.trade channel; extends core with transaction_time.
      allOf:
        - $ref: "#/components/schemas/WsTradeItemBase"
        - type: object
          properties:
            transaction_time:
              type: string
              format: int64
              description: Trade transaction time in nanoseconds.
    WsTradeItemBase:
      type: object
      description: |
        Common trade fields shared by WS user.trade and REST private/get-trades result.data[].
        Transaction time is channel-specific: use WsTradeItem (transaction_time) or TradeItem (transact_time_ns).
      properties:
        account_id:
          type: string
          description: Account ID.
        event_date:
          type: string
          description: Event date.
        journal_type:
          type: string
          description: Journal type would be TRADING.
        traded_quantity:
          type: string
          format: decimal
          description: Trade quantity.
        traded_price:
          type: string
          format: decimal
          description: Trade price.
        fees:
          type: string
          format: decimal
          description: Net trade fees (after fee credits applied, if any). The negative sign means a deduction on balance.
        fee_credits:
          type: string
          format: decimal
          description: Fee credits used to offset the trade fees. The negative sign means fee credits were consumed.
        order_id:
          type: string
          format: int64
          description: Order ID.
        trade_id:
          type: string
          format: int64
          description: Trade ID.
        trade_match_id:
          type: string
          format: int64
          description: Trade match ID.
        client_oid:
          type: string
          description: Client Order ID.
        taker_side:
          allOf:
            - $ref: "#/components/schemas/WsTakerSide"
            - description: MAKER or TAKER or empty.
        side:
          $ref: "#/components/schemas/WsOrderSide"
        instrument_name:
          type: string
          description: E.g. BTCUSD-PERP.
        fee_instrument_name:
          type: string
          description: E.g. USD.
        create_time:
          type: string
          format: int64
          description: Create timestamp in milliseconds.
        create_time_ns:
          type: string
          format: int64
          description: Create timestamp in nanoseconds.
        match_count:
          type: string
          format: int32
          description: Optional. Number of orders matched; Maker's order always 1; Taker's is the number of orders matched.
        match_index:
          type: string
          format: int32
          description: Optional. Only for Maker's order; which order entry of the price level was matched; 0-based.
        isolation_id:
          type: string
          description: Isolation ID of the order if under isolated position.
        isolation_type:
          $ref: "#/components/schemas/WsIsolationType"
    WsTakerSide:
      type: string
      enum:
        - MAKER
        - TAKER
      description: Maker or taker side of the trade
    WsOrderSide:
      type: string
      enum:
        - BUY
        - SELL
      description: BUY or SELL
    WsIsolationType:
      type: string
      enum:
        - ISOLATED_MARGIN
      description: Isolation type
```
