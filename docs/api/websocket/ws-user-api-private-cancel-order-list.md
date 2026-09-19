# private/cancel-order-list (LIST)

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-user-api-private-cancel-order-list

- **Method:** `POST`
- **Path:** `/ws/user-api/private/cancel-order-list`
- **Tags:** Trading

Cancel a list of orders on the Exchange.

This call is asynchronous, so the response is simply a confirmation of the request.

The `user.order` subscription can be used to check when each of the orders is successfully cancelled.

## Request Body

### Parameters

- `contingency_type` (enum: LIST **required**)
- `order_list` (array of object **required**) - List of orders to be cancelled. Each item: instrument_name (optional), order_id, client_oid (optional).
  Array of objects:
  - `client_oid` (string) - Optional Client order ID (maximum 36 characters).
  - `instrument_name` (string) - Instrument name, e.g. ETH_CRO, BTC_USDT.
  - `order_id` (string (int64)) - Order ID.

### Example

```json
{
  "id": "6575",
  "method": "private/cancel-order-list",
  "nonce": "1750389124417",
  "params": {
    "contingency_type": "LIST",
    "order_list": [
      {
        "instrument_name": "CRO_USD",
        "client_oid": "api_leg1"
      },
      {
        "instrument_name": "CRO_USD",
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
  title: private/cancel-order-list (LIST)
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
  /ws/user-api/private/cancel-order-list:
    post:
      operationId: ws-user-api-privateCancelOrderList
      summary: private/cancel-order-list (LIST)
      description: |-
        Cancel a list of orders on the Exchange.

        This call is asynchronous, so the response is simply a confirmation of the request.

        The `user.order` subscription can be used to check when each of the orders is successfully cancelled.
      tags:
        - Trading
      x-type: request
      x-channel-url: wss://stream.crypto.com/exchange/v1/user
      x-channel-group: user
      x-name: private/cancel-order-list (LIST)
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/WsPrivateCancelOrderListRequest"
            description: private/cancel-order-list (LIST)
            example:
              id: "6575"
              method: private/cancel-order-list
              nonce: "1750389124417"
              params:
                contingency_type: LIST
                order_list:
                  - instrument_name: CRO_USD
                    client_oid: api_leg1
                  - instrument_name: CRO_USD
                    client_oid: api_leg2
      responses:
        "200":
          description: WebSocket response
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/WsPrivateCancelOrderListResponse"
              examples:
                Success:
                  value:
                    id: "6575"
                    method: private/cancel-order-list
                    code: "0"
                    result:
                      - code: "0"
                        index: "0"
                      - code: "0"
                        index: "1"
                  summary: Success.
                Bad request:
                  value:
                    id: "1"
                    method: private/cancel-order-list
                    code: "40001"
                    message: BAD_REQUEST
                  summary: Bad request.
                Unauthorized:
                  value:
                    id: "1"
                    method: private/cancel-order-list
                    code: "40101"
                    message: UNAUTHORIZED
                  summary: Unauthorized.
                Request timeout:
                  value:
                    id: "1"
                    method: private/cancel-order-list
                    code: "40801"
                    message: REQUEST_TIMEOUT
                  summary: Request timeout.
                Too many requests:
                  value:
                    id: "1"
                    method: private/cancel-order-list
                    code: "42901"
                    message: TOO_MANY_REQUESTS
                  summary: Too many requests.
                Internal server error:
                  value:
                    id: "1"
                    method: private/cancel-order-list
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
    WsPrivateCancelOrderListRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - nonce
        - params
      description: Request body for private/cancel-order-list.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/cancel-order-list"
          example: private/cancel-order-list
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
              allOf:
                - $ref: "#/components/schemas/WsContingencyTypeList"
                - description: Must be value LIST.
            order_list:
              type: array
              description: "List of orders to be cancelled. Each item: instrument_name (optional), order_id, client_oid (optional)."
              items:
                type: object
                properties:
                  instrument_name:
                    type: string
                    description: Instrument name, e.g. ETH_CRO, BTC_USDT.
                  order_id:
                    type: string
                    format: int64
                    description: Order ID.
                  client_oid:
                    type: string
                    description: Optional Client order ID (maximum 36 characters).
    WsContingencyTypeList:
      type: string
      enum:
        - LIST
      description: Must be LIST for order-list APIs
    WsPrivateCancelOrderListResponse:
      $ref: "#/components/schemas/PrivateCancelOrderListResponse"
    PrivateCancelOrderListResponse:
      type: object
      description: |
        Response for private/cancel-order-list (HTTP 200/4xx/5xx).
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
          description: Present when code === 0. Array of { code, index, message } per docs.
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
