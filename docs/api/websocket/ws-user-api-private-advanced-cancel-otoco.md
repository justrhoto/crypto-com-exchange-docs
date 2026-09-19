# private/advanced/cancel-otoco

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-user-api-private-advanced-cancel-otoco

- **Method:** `POST`
- **Path:** `/ws/user-api/private/advanced/cancel-otoco`
- **Tags:** Advanced Order Management

Cancel a SPOT_ATTACH or DERIV_ATTACH order on the Exchange. This call is asynchronous, so the response is simply a confirmation of the request. The `user.advanced.order` subscription can be used to check when each of the orders is successfully cancelled.

**Note:** This API can also be used to cancel SpotAttach / DerivAttach orders regardless of the number of legs (2 or 3). Both `cancel-oto` and `cancel-otoco` can be used interchangeably to cancel SpotAttach / DerivAttach orders by `list_id`.

## Request Body

### Parameters

- `list_id` (string (int64) **required**)

### Example

```json
{
  "method": "private/advanced/cancel-otoco",
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
  title: private/advanced/cancel-otoco
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
  /ws/user-api/private/advanced/cancel-otoco:
    post:
      operationId: ws-user-api-privateAdvancedCancelOtoco
      summary: private/advanced/cancel-otoco
      description: |-
        Cancel a SPOT_ATTACH or DERIV_ATTACH order on the Exchange. This call is asynchronous, so the response is simply a confirmation of the request. The `user.advanced.order` subscription can be used to check when each of the orders is successfully cancelled.

        **Note:** This API can also be used to cancel SpotAttach / DerivAttach orders regardless of the number of legs (2 or 3). Both `cancel-oto` and `cancel-otoco` can be used interchangeably to cancel SpotAttach / DerivAttach orders by `list_id`.
      tags:
        - Advanced Order Management
      x-type: request
      x-channel-url: wss://stream.crypto.com/exchange/v1/user
      x-channel-group: user
      x-name: private/advanced/cancel-otoco
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/WsPrivateAdvancedCancelOtocoRequest"
            description: private/advanced/cancel-otoco
            example:
              method: private/advanced/cancel-otoco
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
                $ref: "#/components/schemas/WsPrivateAdvancedCancelOtocoResponse"
              examples:
                Success:
                  value:
                    id: "1661328073"
                    method: private/advanced/cancel-otoco
                    code: "0"
                  summary: Success.
                Bad request:
                  value:
                    id: "1"
                    method: private/advanced/cancel-otoco
                    code: "40001"
                    message: BAD_REQUEST
                  summary: Bad request.
                Unauthorized:
                  value:
                    id: "1"
                    method: private/advanced/cancel-otoco
                    code: "40101"
                    message: UNAUTHORIZED
                  summary: Unauthorized.
                Request timeout:
                  value:
                    id: "1"
                    method: private/advanced/cancel-otoco
                    code: "40801"
                    message: REQUEST_TIMEOUT
                  summary: Request timeout.
                Too many requests:
                  value:
                    id: "1"
                    method: private/advanced/cancel-otoco
                    code: "42901"
                    message: TOO_MANY_REQUESTS
                  summary: Too many requests.
                Internal server error:
                  value:
                    id: "1"
                    method: private/advanced/cancel-otoco
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
    WsPrivateAdvancedCancelOtocoRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - nonce
        - params
      description: Request body for private/advanced/cancel-otoco.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/advanced/cancel-otoco"
          example: private/advanced/cancel-otoco
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
    WsPrivateAdvancedCancelOtocoResponse:
      $ref: "#/components/schemas/PrivateAdvancedCancelOtocoResponse"
    PrivateAdvancedCancelOtocoResponse:
      type: object
      description: |
        Response for private/advanced/cancel-otoco (HTTP 200/4xx/5xx).
        code === 0 → success; no result block per docs (code 0 = queued).
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
          description: Present when code === 0; no result block per docs (code 0 = queued).
          properties: {}
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
```
