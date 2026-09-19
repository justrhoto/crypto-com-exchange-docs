# book.{instrument_name}.{depth}

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-channel-book-instrument-name-depth

- **Method:** `POST`
- **Path:** `/ws/channel/book-instrument-name-depth`
- **Tags:** Websocket Market Data

Order book (L2). Subscribe with channels e.g. ["book.BTCUSD-PERP.10"] or ["book.BTCUSD-PERP.50"].
Optional params: book_subscription_type (SNAPSHOT | SNAPSHOT_AND_UPDATE), book_update_frequency (10 | 100 | 500 ms).

## Request Body

### Parameters

- `channels` (array of string **required**) - e.g. ["book.BTCUSD-PERP.10"]
- `book_subscription_type` (enum: SNAPSHOT | SNAPSHOT_AND_UPDATE)
- `book_update_frequency` (enum: 10 | 100 | 500)

### Example

```json
{
  "id": 1,
  "method": "subscribe",
  "nonce": "1613571154900",
  "params": {
    "channels": [
      "book.BTCUSD-PERP.10"
    ],
    "book_subscription_type": "SNAPSHOT_AND_UPDATE",
    "book_update_frequency": 100
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
  title: book.{instrument_name}.{depth}
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
  /ws/channel/book-instrument-name-depth:
    post:
      operationId: ws-channel-book-instrument-name-depth
      summary: book.{instrument_name}.{depth}
      description: |-
        Order book (L2). Subscribe with channels e.g. ["book.BTCUSD-PERP.10"] or ["book.BTCUSD-PERP.50"].
        Optional params: book_subscription_type (SNAPSHOT | SNAPSHOT_AND_UPDATE), book_update_frequency (10 | 100 | 500 ms).
      tags:
        - Websocket Market Data
      x-type: channel
      x-channel-url: wss://stream.crypto.com/exchange/v1/market
      x-channel-group: marketData
      x-name: book.{instrument_name}.{depth}
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
                      description: e.g. ["book.BTCUSD-PERP.10"]
                      example:
                        - book.BTCUSD-PERP.10
                    book_subscription_type:
                      allOf:
                        - $ref: "#/components/schemas/BookSubscriptionType"
                        - description: For book channel only
                    book_update_frequency:
                      allOf:
                        - $ref: "#/components/schemas/BookUpdateFrequency"
                        - description: 10, 100 or 500 ms; for book channel only
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
                  - book.BTCUSD-PERP.10
                book_subscription_type: SNAPSHOT_AND_UPDATE
                book_update_frequency: 100
      responses:
        "200":
          description: WebSocket response
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/WsBookPayload"
              examples:
                Example - Snapshot:
                  value:
                    id: -1
                    method: subscribe
                    code: 0
                    result:
                      instrument_name: BTCUSD-PERP
                      subscription: book.BTCUSD-PERP.10
                      channel: book
                      depth: 10
                      data:
                        - asks:
                            - - "30082.5"
                              - "0.1689"
                              - "1"
                            - - "30083.0"
                              - "0.1288"
                              - "1"
                            - - "30084.5"
                              - "0.0171"
                              - "1"
                            - - "30085.0"
                              - "0.0369"
                              - "2"
                            - - "30086.5"
                              - "0.2664"
                              - "1"
                            - - "30087.0"
                              - "0.8000"
                              - "1"
                            - - "30089.0"
                              - "0.1828"
                              - "1"
                            - - "30089.5"
                              - "0.1828"
                              - "1"
                            - - "30090.0"
                              - "0.1995"
                              - "1"
                            - - "30091.0"
                              - "0.1986"
                              - "2"
                          bids:
                            - - "30079.0"
                              - "0.0505"
                              - "1"
                            - - "30077.5"
                              - "1.0527"
                              - "2"
                            - - "30076.0"
                              - "0.1689"
                              - "1"
                            - - "30075.5"
                              - "0.0171"
                              - "1"
                            - - "30075.0"
                              - "0.1288"
                              - "1"
                            - - "30074.5"
                              - "0.0033"
                              - "1"
                            - - "30073.5"
                              - "0.1675"
                              - "1"
                            - - "30072.5"
                              - "0.3424"
                              - "1"
                            - - "30072.0"
                              - "0.2161"
                              - "2"
                            - - "30071.5"
                              - "0.1829"
                              - "1"
                          t: 1654780033786
                          tt: 1654780033755
                          u: 542048017824
                  summary: Example - Snapshot
                Example - Incremental Update:
                  value:
                    id: -1
                    method: subscribe
                    code: 0
                    result:
                      instrument_name: BTCUSD-PERP
                      subscription: book.BTCUSD-PERP.10
                      channel: book.update
                      depth: 10
                      data:
                        - update:
                            asks:
                              - - "50126.000000"
                                - "0"
                                - "0"
                              - - "50180.000000"
                                - "3.279000"
                                - "10"
                            bids:
                              - - "50097.000000"
                                - "0.252000"
                                - "1"
                          tt: 1647917463003
                          t: 1647917463003
                          u: 7845460002
                          pu: 7845460001
                  summary: Example - Incremental Update
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
    BookSubscriptionType:
      type: string
      enum:
        - SNAPSHOT
        - SNAPSHOT_AND_UPDATE
      description: Book subscription type for order book channel.
    BookUpdateFrequency:
      type: string
      enum:
        - "10"
        - "100"
        - "500"
      description: Update frequency in ms; for book channel only.
    WsBookPayload:
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
            depth:
              type: string
              format: int32
            data:
              type: array
              items:
                $ref: "#/components/schemas/WsBookPayloadItem"
      examples:
        Example - Snapshot:
          id: -1
          method: subscribe
          code: 0
          result:
            instrument_name: BTCUSD-PERP
            subscription: book.BTCUSD-PERP.10
            channel: book
            depth: 10
            data:
              - asks:
                  - - "30082.5"
                    - "0.1689"
                    - "1"
                  - - "30083.0"
                    - "0.1288"
                    - "1"
                  - - "30084.5"
                    - "0.0171"
                    - "1"
                  - - "30085.0"
                    - "0.0369"
                    - "2"
                  - - "30086.5"
                    - "0.2664"
                    - "1"
                  - - "30087.0"
                    - "0.8000"
                    - "1"
                  - - "30089.0"
                    - "0.1828"
                    - "1"
                  - - "30089.5"
                    - "0.1828"
                    - "1"
                  - - "30090.0"
                    - "0.1995"
                    - "1"
                  - - "30091.0"
                    - "0.1986"
                    - "2"
                bids:
                  - - "30079.0"
                    - "0.0505"
                    - "1"
                  - - "30077.5"
                    - "1.0527"
                    - "2"
                  - - "30076.0"
                    - "0.1689"
                    - "1"
                  - - "30075.5"
                    - "0.0171"
                    - "1"
                  - - "30075.0"
                    - "0.1288"
                    - "1"
                  - - "30074.5"
                    - "0.0033"
                    - "1"
                  - - "30073.5"
                    - "0.1675"
                    - "1"
                  - - "30072.5"
                    - "0.3424"
                    - "1"
                  - - "30072.0"
                    - "0.2161"
                    - "2"
                  - - "30071.5"
                    - "0.1829"
                    - "1"
                t: 1654780033786
                tt: 1654780033755
                u: 542048017824
        Example - Incremental Update:
          id: -1
          method: subscribe
          code: 0
          result:
            instrument_name: BTCUSD-PERP
            subscription: book.BTCUSD-PERP.10
            channel: book.update
            depth: 10
            data:
              - update:
                  asks:
                    - - "50126.000000"
                      - "0"
                      - "0"
                    - - "50180.000000"
                      - "3.279000"
                      - "10"
                  bids:
                    - - "50097.000000"
                      - "0.252000"
                      - "1"
                tt: 1647917463003
                t: 1647917463003
                u: 7845460002
                pu: 7845460001
    WsBookPayloadItem:
      type: object
      description: |
        One item in WS book channel result.data[] (snapshot or delta).
        Snapshot has asks, bids, t, tt, u; delta has update and pu.
      properties:
        asks:
          type: array
          items:
            $ref: "#/components/schemas/WsBookSnapshotLevel"
          description: Ask levels (snapshot).
        bids:
          type: array
          items:
            $ref: "#/components/schemas/WsBookSnapshotLevel"
          description: Bid levels (snapshot).
        t:
          type: string
          format: int64
          description: Timestamp (snapshot), ms, e.g. "1771761038000".
        tt:
          type: string
          format: int64
          description: Timestamp (snapshot), ms, e.g. "1771761038000".
        u:
          type: string
          format: int64
          description: Sequence (snapshot).
        update:
          type: object
          description: Delta; has asks/bids.
        pu:
          type: string
          format: int64
          description: Previous sequence (delta).
    WsBookSnapshotLevel:
      type: array
      items:
        type: string
        format: decimal
      description: "[0] = Price, [1] = Quantity, [2] = Number of Orders. Known issue: Number of Orders currently returns 0."
```
