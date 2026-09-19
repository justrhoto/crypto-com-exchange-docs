# ticker.{instrument_name}

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-channel-ticker-instrument-name

- **Method:** `POST`
- **Path:** `/ws/channel/ticker-instrument-name`
- **Tags:** Websocket Market Data

Ticker updates. Subscribe with channels e.g. ["ticker.BTCUSD-PERP"].

## Request Body

### Parameters

- `channels` (array of string **required**) - e.g. ["ticker.BTCUSD-PERP"]

### Example

```json
{
  "id": 1,
  "method": "subscribe",
  "nonce": "1613571154900",
  "params": {
    "channels": [
      "ticker.BTCUSD-PERP"
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
  "id": -1,
  "method": "subscribe",
  "code": 0,
  "result": {
    "instrument_name": "BTCUSD-PERP",
    "subscription": "ticker.BTCUSD-PERP",
    "channel": "ticker",
    "data": [
      {
        "h": "51790.00",
        "l": "47895.50",
        "a": "51174.500000",
        "c": "0.03955106",
        "b": "51170.000000",
        "bs": "0.1000",
        "k": "51180.000000",
        "ks": "0.2000",
        "i": "BTCUSD-PERP",
        "v": "879.5024",
        "vv": "26370000.12",
        "oi": "12345.12",
        "t": 1613580710768
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
  title: ticker.{instrument_name}
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
  /ws/channel/ticker-instrument-name:
    post:
      operationId: ws-channel-ticker-instrument-name
      summary: ticker.{instrument_name}
      description: Ticker updates. Subscribe with channels e.g. ["ticker.BTCUSD-PERP"].
      tags:
        - Websocket Market Data
      x-type: channel
      x-channel-url: wss://stream.crypto.com/exchange/v1/market
      x-channel-group: marketData
      x-name: ticker.{instrument_name}
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
                      description: e.g. ["ticker.BTCUSD-PERP"]
                      example:
                        - ticker.BTCUSD-PERP
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
                  - ticker.BTCUSD-PERP
                book_subscription_type: SNAPSHOT_AND_UPDATE
                book_update_frequency: 100
      responses:
        "200":
          description: WebSocket response
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/WsTickerPayload"
              example:
                id: -1
                method: subscribe
                code: 0
                result:
                  instrument_name: BTCUSD-PERP
                  subscription: ticker.BTCUSD-PERP
                  channel: ticker
                  data:
                    - h: "51790.00"
                      l: "47895.50"
                      a: "51174.500000"
                      c: "0.03955106"
                      b: "51170.000000"
                      bs: "0.1000"
                      k: "51180.000000"
                      ks: "0.2000"
                      i: BTCUSD-PERP
                      v: "879.5024"
                      vv: "26370000.12"
                      oi: "12345.12"
                      t: 1613580710768
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
    WsTickerPayload:
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
                $ref: "#/components/schemas/WsTickerPayloadItem"
      example:
        id: -1
        method: subscribe
        code: 0
        result:
          instrument_name: BTCUSD-PERP
          subscription: ticker.BTCUSD-PERP
          channel: ticker
          data:
            - h: "51790.00"
              l: "47895.50"
              a: "51174.500000"
              c: "0.03955106"
              b: "51170.000000"
              bs: "0.1000"
              k: "51180.000000"
              ks: "0.2000"
              i: BTCUSD-PERP
              v: "879.5024"
              vv: "26370000.12"
              oi: "12345.12"
              t: 1613580710768
    WsTickerPayloadItem:
      description: One item in WS ticker channel result.data[]. Extends TickerItemBase with bs, ks.
      allOf:
        - $ref: "#/components/schemas/WsTickerItemBase"
        - type: object
          properties:
            bs:
              type: string
              format: decimal
              description: Best bid size (WS only).
            ks:
              type: string
              format: decimal
              description: Best ask size (WS only).
    WsTickerItemBase:
      type: object
      description: |
        Ticker row fields shared by REST public/get-tickers result.data[] and WS ticker channel result.data[].
        WS adds bs, ks (best bid/ask size) via TickerPayloadItem.
      properties:
        h:
          type: string
          format: decimal
          description: Price of the 24h highest trade
        l:
          type: string
          format: decimal
          description: Price of the 24h lowest trade, null if there weren't any trades
        a:
          type: string
          format: decimal
          description: The price of the latest trade, null if there weren't any trades
        c:
          type: string
          format: decimal
          description: 24-hour price change, null if there weren't any trades
        b:
          type: string
          format: decimal
          description: The current best bid price, null if there aren't any bids
        k:
          type: string
          format: decimal
          description: The current best ask price, null if there aren't any asks
        i:
          type: string
          description: Instrument name
        v:
          type: string
          format: decimal
          description: The total 24h traded volume
        vv:
          type: string
          format: decimal
          description: The total 24h traded volume value (in USD)
        oi:
          type: string
          format: decimal
          description: The open interest
        t:
          type: string
          format: int64
          description: The published timestamp in ms, e.g. "1771761038000".
```
