# private/advanced/cancel-oto

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-user-api-private-advanced-cancel-oto

- **Method:** `POST`
- **Path:** `/ws/user-api/private/advanced/cancel-oto`
- **Tags:** Advanced Order Management

Cancel a SPOT_ATTACH or DERIV_ATTACH order on the Exchange. This call is asynchronous, so the response is simply a confirmation of the request. The `user.advanced.order` subscription can be used to check when each of the orders is successfully cancelled.

**Note:** This API can also be used to cancel SpotAttach / DerivAttach orders regardless of the number of legs (2 or 3). Both `cancel-oto` and `cancel-otoco` can be used interchangeably to cancel SpotAttach / DerivAttach orders by `list_id`.

## Request Body

### Parameters

- `list_id` (string (int64) **required**)

### Example

```json
{
  "method": "private/advanced/cancel-oto",
  "id": "1234",
  "nonce": "123456789000",
  "params": {
    "list_id": "4421958062479290999"
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
  title: private/advanced/cancel-oto
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
  /ws/user-api/private/advanced/cancel-oto:
    post:
      operationId: ws-user-api-privateAdvancedCancelOto
      summary: private/advanced/cancel-oto
      description: |-
        Cancel a SPOT_ATTACH or DERIV_ATTACH order on the Exchange. This call is asynchronous, so the response is simply a confirmation of the request. The `user.advanced.order` subscription can be used to check when each of the orders is successfully cancelled.

        **Note:** This API can also be used to cancel SpotAttach / DerivAttach orders regardless of the number of legs (2 or 3). Both `cancel-oto` and `cancel-otoco` can be used interchangeably to cancel SpotAttach / DerivAttach orders by `list_id`.
      tags:
        - Advanced Order Management
      x-type: request
      x-channel-url: wss://stream.crypto.com/exchange/v1/user
      x-channel-group: user
      x-name: private/advanced/cancel-oto
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/WsPrivateAdvancedCancelOtoRequest"
            description: private/advanced/cancel-oto
            example:
              method: private/advanced/cancel-oto
              id: "1234"
              nonce: "123456789000"
              params:
                list_id: "4421958062479290999"
      responses:
        "200":
          description: WebSocket response
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/WsPrivateAdvancedCancelOtoResponse"
              examples:
                Success:
                  value:
                    id: "1661328073"
                    method: private/advanced/cancel-oto
                    code: "0"
                  summary: Success.
                Bad request:
                  value:
                    id: "1"
                    method: private/advanced/cancel-oto
                    code: "40001"
                    message: BAD_REQUEST
                  summary: Bad request.
                Unauthorized:
                  value:
                    id: "1"
                    method: private/advanced/cancel-oto
                    code: "40101"
                    message: UNAUTHORIZED
                  summary: Unauthorized.
                Request timeout:
                  value:
                    id: "1"
                    method: private/advanced/cancel-oto
                    code: "40801"
                    message: REQUEST_TIMEOUT
                  summary: Request timeout.
                Too many requests:
                  value:
                    id: "1"
                    method: private/advanced/cancel-oto
                    code: "42901"
                    message: TOO_MANY_REQUESTS
                  summary: Too many requests.
                Internal server error:
                  value:
                    id: "1"
                    method: private/advanced/cancel-oto
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
    WsPrivateAdvancedCancelOtoRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - nonce
        - params
      description: Request body for private/advanced/cancel-oto.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/advanced/cancel-oto"
          example: private/advanced/cancel-oto
        nonce:
          type: string
          format: int64
          description: Current timestamp in milliseconds, e.g. "1771761038000".
        params:
          type: object
          required:
            - list_id
          properties:
            list_id:
              type: string
              format: int64
    WsPrivateAdvancedCancelOtoResponse:
      $ref: "#/components/schemas/PrivateAdvancedCancelOtoResponse"
    PrivateAdvancedCancelOtoResponse:
      type: object
      description: |
        Response for private/advanced/cancel-oto (HTTP 200/4xx/5xx).
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
          description: Present when code === 0. No result block is returned per docs; code 0 indicates request queued.
          properties: {}
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
```
