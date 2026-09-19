# trade.{instrument_name}

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-channel-trade-instrument-name

- **Method:** `POST`
- **Path:** `/ws/channel/trade-instrument-name`
- **Tags:** Websocket Market Data

Public trades. Subscribe with channels e.g. ["trade.BTCUSD-PERP"]. Returns last 50 trades on subscribe.

## Request Body

### Parameters

- `channels` (array of string **required**) - e.g. ["trade.BTCUSD-PERP"]

### Example

```json
{
  "id": 1,
  "method": "subscribe",
  "nonce": "1613571154900",
  "params": {
    "channels": [
      "trade.BTCUSD-PERP"
    ],
    "book_subscription_type": "SNAPSHOT_AND_UPDATE",
    "book_update_frequency": 100
  }
}
```

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
    "subscription": "trade.BTCUSD-PERP",
    "channel": "trade",
    "data": [
      {
        "d": "2030407068",
        "t": 1613581138462,
        "p": "51327.500000",
        "q": "0.000100",
        "s": "SELL",
        "i": "BTCUSD-PERP"
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
  title: trade.{instrument_name}
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
  /ws/channel/trade-instrument-name:
    post:
      operationId: ws-channel-trade-instrument-name
      summary: trade.{instrument_name}
      description: Public trades. Subscribe with channels e.g. ["trade.BTCUSD-PERP"]. Returns last 50 trades on subscribe.
      tags:
        - Websocket Market Data
      x-type: channel
      x-channel-url: wss://stream.crypto.com/exchange/v1/market
      x-channel-group: marketData
      x-name: trade.{instrument_name}
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
                      description: e.g. ["trade.BTCUSD-PERP"]
                      example:
                        - trade.BTCUSD-PERP
                nonce:
                  type: integer
                  description: Current timestamp in milliseconds
            description: Subscribe request for this channel
            example:
              id: 1
              method: subscribe
              nonce: "1613571154900"
              params:
                channels:
                  - trade.BTCUSD-PERP
                book_subscription_type: SNAPSHOT_AND_UPDATE
                book_update_frequency: 100
      responses:
        "200":
          description: WebSocket response
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/WsMarketTradePayload"
              example:
                id: 1
                method: subscribe
                code: 0
                result:
                  instrument_name: BTCUSD-PERP
                  subscription: trade.BTCUSD-PERP
                  channel: trade
                  data:
                    - d: "2030407068"
                      t: 1613581138462
                      p: "51327.500000"
                      q: "0.000100"
                      s: SELL
                      i: BTCUSD-PERP
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
    WsMarketTradePayload:
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
                $ref: "#/components/schemas/WsMarketTradePayloadItem"
      example:
        id: 1
        method: subscribe
        code: 0
        result:
          instrument_name: BTCUSD-PERP
          subscription: trade.BTCUSD-PERP
          channel: trade
          data:
            - d: "2030407068"
              t: 1613581138462
              p: "51327.500000"
              q: "0.000100"
              s: SELL
              i: BTCUSD-PERP
    WsMarketTradePayloadItem:
      description: One item in WS trade channel result.data[] (public market trades). Same as MarketTradeItemBase.
      $ref: "#/components/schemas/WsMarketTradeItemBase"
    WsMarketTradeItemBase:
      type: object
      description: |
        Public market trade row fields shared by REST public/get-trades result.data[] and WS trade channel result.data[].
        REST adds tn (timestamp nanoseconds) via PublicTradeItem.
      properties:
        d:
          type: string
          description: Trade ID
        t:
          type: string
          format: int64
          description: Trade timestamp in milliseconds, e.g. "1771761038000".
        p:
          type: string
          format: decimal
          description: Trade price
        q:
          type: string
          format: decimal
          description: Trade quantity
        s:
          allOf:
            - $ref: "#/components/schemas/WsOrderSide"
            - description: Side (BUY or SELL). Side is the side of the taker order.
        i:
          type: string
          description: Instrument name e.g. BTCUSD-PERP
        m:
          type: string
          format: int64
          description: Trade match ID
    WsOrderSide:
      type: string
      enum:
        - BUY
        - SELL
      description: BUY or SELL
```
