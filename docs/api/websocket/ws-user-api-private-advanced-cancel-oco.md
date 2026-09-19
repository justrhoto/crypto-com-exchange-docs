# private/advanced/cancel-oco

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/ws-user-api-private-advanced-cancel-oco

- **Method:** `POST`
- **Path:** `/ws/user-api/private/advanced/cancel-oco`
- **Tags:** Advanced Order Management

Cancel an OCO order on the Exchange. This call is asynchronous, so the response is simply a confirmation of the request. The `user.advanced.order` subscription can be used to check when each of the orders is successfully cancelled.

## Request Body

### Parameters

- `list_id` (string (int64) **required**) - List ID of the OCO order to cancel

### Example

```json
{
  "method": "private/advanced/cancel-oco",
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
  title: private/advanced/cancel-oco
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
  /ws/user-api/private/advanced/cancel-oco:
    post:
      operationId: ws-user-api-privateAdvancedCancelOco
      summary: private/advanced/cancel-oco
      description: Cancel an OCO order on the Exchange. This call is asynchronous, so the response is simply a confirmation of the request. The `user.advanced.order` subscription can be used to check when each of the orders is successfully cancelled.
      tags:
        - Advanced Order Management
      x-type: request
      x-channel-url: wss://stream.crypto.com/exchange/v1/user
      x-channel-group: user
      x-name: private/advanced/cancel-oco
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/WsPrivateAdvancedCancelOcoRequest"
            description: private/advanced/cancel-oco
            example:
              method: private/advanced/cancel-oco
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
                $ref: "#/components/schemas/WsPrivateAdvancedCancelOcoResponse"
              examples:
                Success:
                  value:
                    id: "1661328073"
                    method: private/advanced/cancel-oco
                    code: "0"
                  summary: Success.
                Bad request:
                  value:
                    id: "1"
                    method: private/advanced/cancel-oco
                    code: "40001"
                    message: BAD_REQUEST
                  summary: Bad request.
                Unauthorized:
                  value:
                    id: "1"
                    method: private/advanced/cancel-oco
                    code: "40101"
                    message: UNAUTHORIZED
                  summary: Unauthorized.
                Request timeout:
                  value:
                    id: "1"
                    method: private/advanced/cancel-oco
                    code: "40801"
                    message: REQUEST_TIMEOUT
                  summary: Request timeout.
                Too many requests:
                  value:
                    id: "1"
                    method: private/advanced/cancel-oco
                    code: "42901"
                    message: TOO_MANY_REQUESTS
                  summary: Too many requests.
                Internal server error:
                  value:
                    id: "1"
                    method: private/advanced/cancel-oco
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
    WsPrivateAdvancedCancelOcoRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - nonce
        - params
      description: Request body for private/advanced/cancel-oco.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/advanced/cancel-oco"
          example: private/advanced/cancel-oco
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
              description: List ID of the OCO order to cancel
    WsPrivateAdvancedCancelOcoResponse:
      $ref: "#/components/schemas/PrivateAdvancedCancelOcoResponse"
    PrivateAdvancedCancelOcoResponse:
      type: object
      description: |
        Response for private/advanced/cancel-oco (HTTP 200/4xx/5xx).
        code === 0 → success. No result block is returned; code 0 indicates request queued.
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
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
```
