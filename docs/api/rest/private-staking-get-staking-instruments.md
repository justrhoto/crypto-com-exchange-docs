# private/staking/get-staking-instruments

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/private-staking-get-staking-instruments

- **Method:** `POST`
- **Path:** `/private/staking/get-staking-instruments`
- **Tags:** Staking

Get staking instruments information

## Request Body

### Example

```json
{
  "id": "1",
  "method": "private/staking/get-staking-instruments",
  "api_key": "YOUR_API_KEY",
  "sig": "DIGITAL_SIGNATURE",
  "nonce": "1739923200000",
  "params": {}
}
```

## Responses

### 200 Success.

#### Result

- `data` (array of object) - List of staking instruments.
  Array of objects:
  - `additional_rewards` (array of object) - Additional reward entries; each has reward_inst_name.
    Array of objects:
    - `reward_inst_name` (string) - Additional reward instrument name
  - `apr_y` (enum: APR | APY) - APR or APY
  - `block_unstake` (boolean) - Disabled unstake - true or false
  - `est_rewards` (string (decimal)) - Estimated rewards
  - `instrument_name` (string) - Staking instrument name, e.g. SOL.staked
  - `is_compound_reward` (boolean) - Is reward compounded - true or false
  - `is_restaked` (boolean) - Is restaked instrument - true or false
  - `lock_up_period` (string (int32)) - Estimated lock up period (day)
  - `min_stake_amt` (string (decimal)) - Minimum stake amount
  - `out_of_stock` (boolean) - Disabled stake - true or false
  - `pre_stake_charge_enable` (boolean) - Is pre stake charge applied - true or false
  - `pre_stake_charge_rate_in_bps` (string (int32)) - Pre stake charge rate in basis point
  - `reward_frequency` (string (int32)) - Estimated reward frequency (day)
  - `reward_inst_name` (string) - Reward instrument name, e.g. SOL.staked
  - `underlying_inst_name` (string) - Underlying instrument name, e.g. SOL

#### Example

```json
{
  "id": "1",
  "method": "private/staking/get-staking-instruments",
  "code": "0",
  "result": {
    "data": [
      {
        "instrument_name": "SOL.staked",
        "underlying_inst_name": "SOL",
        "reward_inst_name": "SOL.staked",
        "out_of_stock": false,
        "block_unstake": false,
        "est_rewards": "0.0661",
        "apr_y": "APR",
        "min_stake_amt": "0.00000001",
        "reward_frequency": "2.5",
        "lock_up_period": "5",
        "is_compound_reward": true,
        "pre_stake_charge_enable": false,
        "pre_stake_charge_rate_in_bps": "0",
        "is_restaked": false,
        "additional_rewards": []
      },
      {
        "instrument_name": "DYDX.staked",
        "underlying_inst_name": "DYDX",
        "reward_inst_name": "DYDX",
        "out_of_stock": false,
        "block_unstake": false,
        "est_rewards": "0.05",
        "apr_y": "APR",
        "min_stake_amt": "0.00000001",
        "reward_frequency": "1",
        "lock_up_period": "31",
        "is_compound_reward": false,
        "pre_stake_charge_enable": false,
        "pre_stake_charge_rate_in_bps": "0",
        "is_restaked": false,
        "additional_rewards": [
          {
            "reward_inst_name": "USD_Stable_Coin"
          }
        ]
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
  "method": "private/staking/get-staking-instruments",
  "code": "40001",
  "message": "BAD_REQUEST"
}
```

### 401 Unauthorized.

#### Example

```json
{
  "id": "1",
  "method": "private/staking/get-staking-instruments",
  "code": "40101",
  "message": "UNAUTHORIZED"
}
```

### 408 Request timeout.

#### Example

```json
{
  "id": "1",
  "method": "private/staking/get-staking-instruments",
  "code": "40801",
  "message": "REQUEST_TIMEOUT"
}
```

### 429 Too many requests.

#### Example

```json
{
  "id": "1",
  "method": "private/staking/get-staking-instruments",
  "code": "42901",
  "message": "TOO_MANY_REQUESTS"
}
```

### 500 Internal server error.

#### Example

```json
{
  "id": "1",
  "method": "private/staking/get-staking-instruments",
  "code": "50001",
  "message": "INTERNAL_SERVER_ERROR"
}
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: private/staking/get-staking-instruments
  version: 1.0.0
servers:
  - url: https://api.crypto.com/exchange/v1
    description: Production
  - url: https://uat-api.3ona.co/exchange/v1
    description: UAT Sandbox
paths:
  /private/staking/get-staking-instruments:
    post:
      tags:
        - Staking
      x-apply-to:
        - rest
      summary: private/staking/get-staking-instruments
      description: Get staking instruments information
      operationId: privateStakingGetStakingInstruments
      x-codeSamples: []
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/PrivateStakingGetStakingInstrumentsRequest"
            example:
              id: "1"
              method: private/staking/get-staking-instruments
              api_key: YOUR_API_KEY
              sig: DIGITAL_SIGNATURE
              nonce: "1739923200000"
              params: {}
      responses:
        "200":
          description: Success.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateStakingGetStakingInstrumentsResponse"
              example:
                id: "1"
                method: private/staking/get-staking-instruments
                code: "0"
                result:
                  data:
                    - instrument_name: SOL.staked
                      underlying_inst_name: SOL
                      reward_inst_name: SOL.staked
                      out_of_stock: false
                      block_unstake: false
                      est_rewards: "0.0661"
                      apr_y: APR
                      min_stake_amt: "0.00000001"
                      reward_frequency: "2.5"
                      lock_up_period: "5"
                      is_compound_reward: true
                      pre_stake_charge_enable: false
                      pre_stake_charge_rate_in_bps: "0"
                      is_restaked: false
                      additional_rewards: []
                    - instrument_name: DYDX.staked
                      underlying_inst_name: DYDX
                      reward_inst_name: DYDX
                      out_of_stock: false
                      block_unstake: false
                      est_rewards: "0.05"
                      apr_y: APR
                      min_stake_amt: "0.00000001"
                      reward_frequency: "1"
                      lock_up_period: "31"
                      is_compound_reward: false
                      pre_stake_charge_enable: false
                      pre_stake_charge_rate_in_bps: "0"
                      is_restaked: false
                      additional_rewards:
                        - reward_inst_name: USD_Stable_Coin
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateStakingGetStakingInstrumentsResponse"
              example:
                id: "1"
                method: private/staking/get-staking-instruments
                code: "40001"
                message: BAD_REQUEST
        "401":
          description: Unauthorized.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateStakingGetStakingInstrumentsResponse"
              example:
                id: "1"
                method: private/staking/get-staking-instruments
                code: "40101"
                message: UNAUTHORIZED
        "408":
          description: Request timeout.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateStakingGetStakingInstrumentsResponse"
              example:
                id: "1"
                method: private/staking/get-staking-instruments
                code: "40801"
                message: REQUEST_TIMEOUT
        "429":
          description: Too many requests.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateStakingGetStakingInstrumentsResponse"
              example:
                id: "1"
                method: private/staking/get-staking-instruments
                code: "42901"
                message: TOO_MANY_REQUESTS
        "500":
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PrivateStakingGetStakingInstrumentsResponse"
              example:
                id: "1"
                method: private/staking/get-staking-instruments
                code: "50001"
                message: INTERNAL_SERVER_ERROR
components:
  schemas:
    PrivateStakingGetStakingInstrumentsRequest:
      type: object
      x-archetype: Request
      required:
        - id
        - method
        - api_key
        - sig
        - nonce
        - params
      description: Request body for private/staking/get-staking-instruments.
      properties:
        id:
          type: string
          format: int64
          description: Request id (echoed in response)
        method:
          type: string
          description: Must be "private/staking/get-staking-instruments"
          example: private/staking/get-staking-instruments
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
          description: No parameters; use empty object {}
          additionalProperties: false
    PrivateStakingGetStakingInstrumentsResponse:
      type: object
      description: |
        Response for private/staking/get-staking-instruments (HTTP 200/4xx/5xx).
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
          description: Present when code === 0. data array of staking instruments.
          properties:
            data:
              type: array
              description: List of staking instruments.
              items:
                $ref: "#/components/schemas/StakingInstrumentItem"
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
    StakingInstrumentItem:
      type: object
      description: One staking instrument in private/staking/get-staking-instruments result.data.
      properties:
        instrument_name:
          type: string
          description: Staking instrument name, e.g. SOL.staked
        underlying_inst_name:
          type: string
          description: Underlying instrument name, e.g. SOL
        reward_inst_name:
          type: string
          description: Reward instrument name, e.g. SOL.staked
        out_of_stock:
          type: boolean
          description: Disabled stake - true or false
        block_unstake:
          type: boolean
          description: Disabled unstake - true or false
        est_rewards:
          type: string
          format: decimal
          description: Estimated rewards
        apr_y:
          $ref: "#/components/schemas/AprUnit"
        min_stake_amt:
          type: string
          format: decimal
          description: Minimum stake amount
        reward_frequency:
          type: string
          format: int32
          description: Estimated reward frequency (day)
        lock_up_period:
          type: string
          format: int32
          description: Estimated lock up period (day)
        is_compound_reward:
          type: boolean
          description: Is reward compounded - true or false
        pre_stake_charge_enable:
          type: boolean
          description: Is pre stake charge applied - true or false
        pre_stake_charge_rate_in_bps:
          type: string
          format: int32
          description: Pre stake charge rate in basis point
        is_restaked:
          type: boolean
          description: Is restaked instrument - true or false
        additional_rewards:
          type: array
          description: Additional reward entries; each has reward_inst_name.
          items:
            type: object
            properties:
              reward_inst_name:
                type: string
                description: Additional reward instrument name
    AprUnit:
      type: string
      enum:
        - APR
        - APY
      description: APR or APY
```
