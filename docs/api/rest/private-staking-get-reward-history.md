# private/staking/get-reward-history

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/private-staking-get-reward-history

- **Method:** `POST`
- **Path:** `/private/staking/get-reward-history`
- **Tags:** Staking

Get stake/unstake request history

## Request Body

### Parameters

- `end_time` (string (int64)) - End time in Unix format (inclusive), ms or ns. Default: current system timestamp.
- `instrument_name` (string) - Staking instrument name, e.g. SOL.staked.
- `limit` (string (int32)) - Max number of requests returned. Default: 20. Max: 500.
- `start_time` (string (int64)) - Start time in Unix format (inclusive), ms or ns. Default: end_time - 30 days. Min: end_time - 180 days.

### Example

```json
{
  "id": "1",
  "method": "private/staking/get-reward-history",
  "api_key": "YOUR_API_KEY",
  "sig": "DIGITAL_SIGNATURE",
  "nonce": "1739923200000",
  "params": {
    "instrument_name": "SOL.staked",
    "start_time": "1691455454495",
    "end_time": "1691545277000",
    "limit": "10"
  }
}
```

## Responses

### 200 Success.

#### Result

- `data` (array of object) - List of reward history entries.
  Array of objects:
  - `event_timestamp_ms` (string (int64)) - Event timestamp in milliseconds in Unix time format.
  - `reward_inst_name` (string) - Reward instrument name, e.g. SOL.staked.
  - `reward_quantity` (string (decimal)) - Reward quantity.
  - `staked_balance` (string (decimal)) - Staked balance.
  - `staking_inst_name` (string) - Staking instrument name, e.g. SOL.staked.
  - `underlying_inst_name` (string) - Underlying instrument name, e.g. SOL.

#### Example

```json
{
  "id": "1",
  "method": "private/staking/get-reward-history",
  "code": "0",
  "result": {
    "data": [
      {
        "staking_inst_name": "SOL.staked",
        "underlying_inst_name": "SOL",
        "reward_inst_name": "SOL.staked",
        "reward_quantity": "123.4567",
        "staked_balance": "1234567",
        "event_timestamp_ms": "1667795832609"
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
  "method": "private/staking/get-reward-history",
  "code": "40001",
  "message": "BAD_REQUEST"
}
```

### 401 Unauthorized.

#### Example

```json
{
  "id": "1",
  "method": "private/staking/get-reward-history",
  "code": "40101",
  "message": "UNAUTHORIZED"
}
```

### 408 Request timeout.

#### Example

```json
{
  "id": "1",
  "method": "private/staking/get-reward-history",
  "code": "40801",
  "message": "REQUEST_TIMEOUT"
}
```

### 429 Too many requests.

#### Example

```json
{
  "id": "1",
  "method": "private/staking/get-reward-history",
  "code": "42901",
  "message": "TOO_MANY_REQUESTS"
}
```

### 500 Internal server error.

#### Example

```json
{
  "id": "1",
  "method": "private/staking/get-reward-history",
  "code": "50001",
  "message": "INTERNAL_SERVER_ERROR"
}
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: private/staking/get-reward-history
  version: 1.0.0
servers:
  - url: https://api.crypto.com/exchange/v1
    description: Production
  - url: https://uat-api.3ona.co/exchange/v1
    description: UAT Sandbox
paths:
  /private/staking/get-reward-history:
    post:
      tags:
        - Staking
      x-apply-to:
        - rest
      summary: private/staking/get-reward-history
      description: Get stake/unstake request history
      operationId: privateStakingGetRewardHistory
      x-codeSamples: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PrivateStakingGetRewardHistoryRequest"
            example:
              id: "1"
              method: private/staking/get-reward-history
              api_key: YOUR_API_KEY
              sig: DIGITAL_SIGNATURE
              nonce: "1739923200000"
              params:
                instrument_name: SOL.staked
                start_time: "1691455454495"
                end_time: "1691545277000"
                limit: "10"
      responses:
        "200":
          description: Success.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateStakingGetRewardHistoryResponse"
              example:
                id: "1"
                method: private/staking/get-reward-history
                code: "0"
                result:
                  data:
                    - staking_inst_name: SOL.staked
                      underlying_inst_name: SOL
                      reward_inst_name: SOL.staked
                      reward_quantity: "123.4567"
                      staked_balance: "1234567"
                      event_timestamp_ms: "1667795832609"
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateStakingGetRewardHistoryResponse"
              example:
                id: "1"
                method: private/staking/get-reward-history
                code: "40001"
                message: BAD_REQUEST
        "401":
          description: Unauthorized.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateStakingGetRewardHistoryResponse"
              example:
                id: "1"
                method: private/staking/get-reward-history
                code: "40101"
                message: UNAUTHORIZED
        "408":
          description: Request timeout.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateStakingGetRewardHistoryResponse"
              example:
                id: "1"
                method: private/staking/get-reward-history
                code: "40801"
                message: REQUEST_TIMEOUT
        "429":
          description: Too many requests.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateStakingGetRewardHistoryResponse"
              example:
                id: "1"
                method: private/staking/get-reward-history
                code: "42901"
                message: TOO_MANY_REQUESTS
        "500":
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateStakingGetRewardHistoryResponse"
              example:
                id: "1"
                method: private/staking/get-reward-history
                code: "50001"
                message: INTERNAL_SERVER_ERROR
components:
  schemas:
    PrivateStakingGetRewardHistoryRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - api_key
        - sig
        - nonce
        - params
      description: Request body for private/staking/get-reward-history.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/staking/get-reward-history"
          example: private/staking/get-reward-history
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
              description: Staking instrument name, e.g. SOL.staked.
            start_time:
              type: string
              format: int64
              description: "Start time in Unix format (inclusive), ms or ns. Default: end_time - 30 days. Min: end_time - 180 days."
            end_time:
              type: string
              format: int64
              description: "End time in Unix format (inclusive), ms or ns. Default: current system timestamp."
            limit:
              type: string
              format: int32
              description: "Max number of requests returned. Default: 20. Max: 500."
    PrivateStakingGetRewardHistoryResponse:
      type: object
      description: |
        Response for private/staking/get-reward-history (HTTP 200/4xx/5xx).
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
          description: Present when code === 0. data array (reward_quantity, staked_balance, etc.).
          properties:
            data:
              type: array
              description: List of reward history entries.
              items:
                type: object
                properties:
                  staking_inst_name:
                    type: string
                    description: Staking instrument name, e.g. SOL.staked.
                  underlying_inst_name:
                    type: string
                    description: Underlying instrument name, e.g. SOL.
                  reward_inst_name:
                    type: string
                    description: Reward instrument name, e.g. SOL.staked.
                  reward_quantity:
                    type: string
                    format: decimal
                    description: Reward quantity.
                  staked_balance:
                    type: string
                    format: decimal
                    description: Staked balance.
                  event_timestamp_ms:
                    type: string
                    format: int64
                    description: Event timestamp in milliseconds in Unix time format.
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
```
