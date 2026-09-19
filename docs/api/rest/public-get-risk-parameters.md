# public/get-risk-parameters

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/public-get-risk-parameters

- **Method:** `GET`
- **Path:** `/public/get-risk-parameters`
- **Tags:** Reference and Market Data

Provides information on risk parameter settings for [Smart Cross Margin](https://crypto.com/exchange/document/margin-rules).

## Responses

### 200 Success.

#### Result

- `base_currency_config` (array of object) - specific risk parameters as shown below
  Array of objects:
  - `collateral_cap_notional` (string (decimal)) - the maximum $notional that is counted towards the margin balance. Any additional token balance would not contribute to the margin balance. Field is omitted if the token is not eligible as collateral
  - `daily_notional_limit` (string (decimal)) - max spot order notional user can place in rolling 24-hour window. If field is omitted
  - `instrument_name` (string)
  - `long_pos_limit_futures` (string (decimal)) - the max long position permitted for futures on this base token
  - `long_pos_limit_perps` (string (decimal)) - the max long position permitted for perpetuals on this base token
  - `max_order_notional_usd` (string (decimal)) - max $notional per spot order on this base token
  - `max_product_leverage_for_futures` (string (decimal)) - the max product leverage for futures on this base token
  - `max_product_leverage_for_perps` (string (decimal)) - the max product leverage for perpetuals on this base token
  - `max_product_leverage_for_spot` (string (decimal)) - the max product leverage for margin trading on this token.
  - `max_short_sell_limit` (string (decimal)) - max negative asset balance user can hold on the base token. If field is omitted means no short sell permitted on the token
  - `min_order_notional_usd` (string (decimal)) - min $notional per spot order on this base token
  - `minimum_haircut` (string (decimal)) - Minimum haircut rate. Field is omitted if the token is not eligible as collateral
  - `order_limit` (string (decimal)) - max $notional per spot order on this base token
  - `short_pos_limit_futures` (string (decimal)) - the max short position permitted for futures on this base token
  - `short_pos_limit_perps` (string (decimal)) - the max short position permitted for perpetuals on this base token
  - `unit_margin_rate` (string (decimal)) - the additional margin rate / haircut rate for holding 1 unit of positions with this base token
- `default_collateral_cap` (string (decimal)) - refer to specified collateral cap for each token in base_currency_config array. Field is omitted if the token is not eligible as collateral
- `default_long_pos_limit_futures` (string (decimal)) - default max long position permitted on futures, unless specified in base_currency_config array. A value of -1 indicates that no position limit applies.
- `default_long_pos_limit_perps` (string (decimal)) - default max long position permitted for perpetual contracts, unless specified in base_currency_config array. A value of -1 indicates that no position limit applies.
- `default_max_product_leverage_for_futures` (string (decimal)) - default max product leverage for futures unless specified in base_currency_config array
- `default_max_product_leverage_for_perps` (string (decimal)) - default max product leverage for perpetuals unless specified in base_currency_config array
- `default_max_product_leverage_for_spot` (string (decimal)) - default max product leverage for margin trading unless specified in base_currency_config array
- `default_short_pos_limit_futures` (string (decimal)) - default max short position permitted on futures, unless specified in base_currency_config array. A value of -1 indicates that no position limit applies.
- `default_short_pos_limit_perps` (string (decimal)) - default max short position permitted for perpetual contracts, unless specified in base_currency_config array. A value of -1 indicates that no position limit applies.
- `default_umr_multiplier_for_futures` (string (decimal))
- `default_umr_multiplier_for_perps` (string (decimal))
- `default_umr_multiplier_for_spot` (string (decimal))
- `default_unit_margin_rate` (string (decimal)) - default additional margin rate / haircut rate for holding 1 unit of positions unless specified in base_currency_config array
- `update_timestamp_ms` (string (int64)) - Last update time (ms).

#### Example

```json
{
  "id": "-1",
  "method": "public/get-risk-parameters",
  "code": "0",
  "result": {
    "default_max_product_leverage_for_spot": "1.0",
    "default_max_product_leverage_for_perps": "20.0",
    "default_max_product_leverage_for_futures": "20.0",
    "default_umr_multiplier_for_spot": "1.0",
    "default_umr_multiplier_for_perps": "1.0",
    "default_umr_multiplier_for_futures": "2.0",
    "default_long_pos_limit_perps": "-1.0",
    "default_short_pos_limit_perps": "-1.0",
    "default_long_pos_limit_futures": "-1.0",
    "default_short_pos_limit_futures": "-1.0",
    "default_unit_margin_rate": "0.05",
    "default_collateral_cap": "0.0",
    "update_timestamp_ms": "1763005542745",
    "base_currency_config": [
      {
        "instrument_name": "1INCH",
        "minimum_haircut": "0",
        "unit_margin_rate": "0.00060",
        "order_limit": "100000.0",
        "max_order_notional_usd": "100000.0",
        "min_order_notional_usd": "1.0"
      },
      {
        "instrument_name": "BTC",
        "collateral_cap_notional": "25000000",
        "minimum_haircut": "0.0625",
        "max_product_leverage_for_spot": "16.0",
        "max_product_leverage_for_perps": "50.0",
        "unit_margin_rate": "0.005",
        "max_short_sell_limit": "200.0",
        "order_limit": "10000000",
        "max_order_notional_usd": "10000000",
        "min_order_notional_usd": "1.0",
        "long_pos_limit_perps": "8800.0",
        "short_pos_limit_perps": "8800.0",
        "long_pos_limit_futures": "512.0",
        "short_pos_limit_futures": "512.0"
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
  "method": "public/get-risk-parameters",
  "code": "40001",
  "message": "BAD_REQUEST"
}
```

### 408 Request timeout.

#### Example

```json
{
  "id": "1",
  "method": "public/get-risk-parameters",
  "code": "40801",
  "message": "REQUEST_TIMEOUT"
}
```

### 429 Too many requests.

#### Example

```json
{
  "id": "1",
  "method": "public/get-risk-parameters",
  "code": "42901",
  "message": "TOO_MANY_REQUESTS"
}
```

### 500 Internal server error.

#### Example

```json
{
  "id": "1",
  "method": "public/get-risk-parameters",
  "code": "50001",
  "message": "INTERNAL_SERVER_ERROR"
}
```

## Code Examples

### cURL

```curl
curl -X GET "https://api.crypto.com/exchange/v1/public/get-risk-parameters" \
  -H "Content-Type: application/json"
```

## OpenAPI Definition

Self-contained OpenAPI specification for this operation:

```yaml
openapi: 3.0.3
info:
  title: public/get-risk-parameters
  version: 1.0.0
servers:
  - url: https://api.crypto.com/exchange/v1
    description: Production
  - url: https://uat-api.3ona.co/exchange/v1
    description: UAT Sandbox
paths:
  /public/get-risk-parameters:
    get:
      tags:
        - Reference and Market Data
      x-apply-to:
        - rest
      summary: public/get-risk-parameters
      description: Provides information on risk parameter settings for [Smart Cross Margin](https://crypto.com/exchange/document/margin-rules).
      operationId: publicGetRiskParameters
      x-codeSamples:
        - lang: cURL
          label: cURL
          source: |
            curl -X GET "https://api.crypto.com/exchange/v1/public/get-risk-parameters" \
              -H "Content-Type: application/json"
      responses:
        "200":
          description: Success.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PublicGetRiskParametersResponse"
              example:
                id: "-1"
                method: public/get-risk-parameters
                code: "0"
                result:
                  default_max_product_leverage_for_spot: "1.0"
                  default_max_product_leverage_for_perps: "20.0"
                  default_max_product_leverage_for_futures: "20.0"
                  default_umr_multiplier_for_spot: "1.0"
                  default_umr_multiplier_for_perps: "1.0"
                  default_umr_multiplier_for_futures: "2.0"
                  default_long_pos_limit_perps: "-1.0"
                  default_short_pos_limit_perps: "-1.0"
                  default_long_pos_limit_futures: "-1.0"
                  default_short_pos_limit_futures: "-1.0"
                  default_unit_margin_rate: "0.05"
                  default_collateral_cap: "0.0"
                  update_timestamp_ms: "1763005542745"
                  base_currency_config:
                    - instrument_name: 1INCH
                      minimum_haircut: "0"
                      unit_margin_rate: "0.00060"
                      order_limit: "100000.0"
                      max_order_notional_usd: "100000.0"
                      min_order_notional_usd: "1.0"
                    - instrument_name: BTC
                      collateral_cap_notional: "25000000"
                      minimum_haircut: "0.0625"
                      max_product_leverage_for_spot: "16.0"
                      max_product_leverage_for_perps: "50.0"
                      unit_margin_rate: "0.005"
                      max_short_sell_limit: "200.0"
                      order_limit: "10000000"
                      max_order_notional_usd: "10000000"
                      min_order_notional_usd: "1.0"
                      long_pos_limit_perps: "8800.0"
                      short_pos_limit_perps: "8800.0"
                      long_pos_limit_futures: "512.0"
                      short_pos_limit_futures: "512.0"
        "400":
          description: Bad request.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PublicGetRiskParametersResponse"
              example:
                id: "1"
                method: public/get-risk-parameters
                code: "40001"
                message: BAD_REQUEST
        "408":
          description: Request timeout.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PublicGetRiskParametersResponse"
              example:
                id: "1"
                method: public/get-risk-parameters
                code: "40801"
                message: REQUEST_TIMEOUT
        "429":
          description: Too many requests.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PublicGetRiskParametersResponse"
              example:
                id: "1"
                method: public/get-risk-parameters
                code: "42901"
                message: TOO_MANY_REQUESTS
        "500":
          description: Internal server error.
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/PublicGetRiskParametersResponse"
              example:
                id: "1"
                method: public/get-risk-parameters
                code: "50001"
                message: INTERNAL_SERVER_ERROR
components:
  schemas:
    PublicGetRiskParametersResponse:
      type: object
      description: |
        Response for public/get-risk-parameters (HTTP 200/4xx/5xx).
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
          description: Present when code === 0. Risk parameters (Smart Cross Margin).
          properties:
            default_max_product_leverage_for_spot:
              type: string
              format: decimal
              description: default max product leverage for margin trading unless specified in base_currency_config array
            default_max_product_leverage_for_perps:
              type: string
              format: decimal
              description: default max product leverage for perpetuals unless specified in base_currency_config array
            default_max_product_leverage_for_futures:
              type: string
              format: decimal
              description: default max product leverage for futures unless specified in base_currency_config array
            default_umr_multiplier_for_spot:
              type: string
              format: decimal
            default_umr_multiplier_for_perps:
              type: string
              format: decimal
            default_umr_multiplier_for_futures:
              type: string
              format: decimal
            default_long_pos_limit_perps:
              type: string
              format: decimal
              description: default max long position permitted for perpetual contracts, unless specified in base_currency_config array. A value of -1 indicates that no position limit applies.
            default_short_pos_limit_perps:
              type: string
              format: decimal
              description: default max short position permitted for perpetual contracts, unless specified in base_currency_config array. A value of -1 indicates that no position limit applies.
            default_long_pos_limit_futures:
              type: string
              format: decimal
              description: default max long position permitted on futures, unless specified in base_currency_config array. A value of -1 indicates that no position limit applies.
            default_short_pos_limit_futures:
              type: string
              format: decimal
              description: default max short position permitted on futures, unless specified in base_currency_config array. A value of -1 indicates that no position limit applies.
            default_unit_margin_rate:
              type: string
              format: decimal
              description: default additional margin rate / haircut rate for holding 1 unit of positions unless specified in base_currency_config array
            default_collateral_cap:
              type: string
              format: decimal
              description: refer to specified collateral cap for each token in base_currency_config array. Field is omitted if the token is not eligible as collateral
            update_timestamp_ms:
              type: string
              format: int64
              description: Last update time (ms).
            base_currency_config:
              type: array
              description: specific risk parameters as shown below
              items:
                type: object
                properties:
                  instrument_name:
                    type: string
                  collateral_cap_notional:
                    type: string
                    format: decimal
                    description: the maximum $notional that is counted towards the margin balance. Any additional token balance would not contribute to the margin balance. Field is omitted if the token is not eligible as collateral
                  minimum_haircut:
                    type: string
                    format: decimal
                    description: Minimum haircut rate. Field is omitted if the token is not eligible as collateral
                  max_product_leverage_for_spot:
                    type: string
                    format: decimal
                    description: the max product leverage for margin trading on this token.
                  max_product_leverage_for_perps:
                    type: string
                    format: decimal
                    description: the max product leverage for perpetuals on this base token
                  max_product_leverage_for_futures:
                    type: string
                    format: decimal
                    description: the max product leverage for futures on this base token
                  unit_margin_rate:
                    type: string
                    format: decimal
                    description: the additional margin rate / haircut rate for holding 1 unit of positions with this base token
                  max_short_sell_limit:
                    type: string
                    format: decimal
                    description: max negative asset balance user can hold on the base token. If field is omitted means no short sell permitted on the token
                  daily_notional_limit:
                    type: string
                    format: decimal
                    description: max spot order notional user can place in rolling 24-hour window. If field is omitted
                    user can trade unlimited on this base token: null
                  order_limit:
                    type: string
                    format: decimal
                    description: max $notional per spot order on this base token
                  max_order_notional_usd:
                    type: string
                    format: decimal
                    description: max $notional per spot order on this base token
                  min_order_notional_usd:
                    type: string
                    format: decimal
                    description: min $notional per spot order on this base token
                  long_pos_limit_perps:
                    type: string
                    format: decimal
                    description: the max long position permitted for perpetuals on this base token
                  short_pos_limit_perps:
                    type: string
                    format: decimal
                    description: the max short position permitted for perpetuals on this base token
                  long_pos_limit_futures:
                    type: string
                    format: decimal
                    description: the max long position permitted for futures on this base token
                  short_pos_limit_futures:
                    type: string
                    format: decimal
                    description: the max short position permitted for futures on this base token
        message:
          type: string
          description: Response message. Contains additional reason when code !== 0.
        original:
          type: string
          description: Present when code !== 0.
```
