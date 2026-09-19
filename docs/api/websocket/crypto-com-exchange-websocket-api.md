# Crypto.com Exchange WebSocket API

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket/crypto-com-exchange-websocket-api

Version: 1.0.0

## Welcome

Welcome to the Crypto.com Exchange API v1 reference documentation.

The Crypto.com Exchange API v1 provides developers with a **REST** and **WebSocket** API. The majority of API calls are available across both mediums in the **same** request and response formats, allowing smooth transition and a reduced learning curve between the two platforms.

The majority of API calls are available across both mediums in the same request and response formats, allowing smooth transition and a reduced learning curve between the two platforms.

Where applicable, all API calls come with detailed information on both the request and response parameters, all in a simple JSON format, as well as sample requests and code snippets in JavaScript, Python which can be viewed on the right.

### Notes on Exchange Upgrade and API Versions

*   Exchange v1 API is the latest version of API which can trade Spot / Derivatives / Margin.
*   Derivatives v1 API has been upgraded into Exchange v1 API with additional capabilities for Spot Trading / Margin Trading / Wallet Management. As Exchange v1 API is a superset of Derivatives v1 API, existing customer can continue using the same for trading.
*   For full details about the exchange upgrade, please refer to this (blog post)\[[https://crypto.com/product-news/introducing-the-gen-3-0-crypto-com-exchange](https://crypto.com/product-news/introducing-the-gen-3-0-crypto-com-exchange)\] with FAQ documents.

## Breaking Change Schedule

*   On 2025-12-17 8:00 UTC,  
    The current trigger order creation/cancellation will be migrated to Advanced Order Management API.
    
*   On 2025-02-27 8:00 UTC,  
    For `book.{instrument_name}.{depth}`, the full snapshot subscription (`book_subscription_type=SNAPSHOT`) `100ms` frequency is removed.  
    Customers wishing to continue with the faster `100ms` frequency should switch to the delta subscription (`book_subscription_type=SNAPSHOT_AND_UPDATE`).  
    This higher performing subscription benefits the user with reduced bandwidth/processing compared to the snapshot subscription.  
    For a transition period, users subscribing to the removed `100ms` snapshot will receive the `500ms` subscription.
    
    The `book.{instrument_name}` subscription (default depth) will be removed.  
    Customers should use the explicit `book.{instrument_name}.{depth}` subscription and specify the required depth.
    
    For a transition period, users subscribing to the removed subscription will receive the default `50` depth subscription.
    
*   These changes will take place around 17 December 2023 8:00 UTC.
    
*   Market Data wildcard ticker subscription will be removed. Users should use the instrument specific subscription.
    

## Change Log

*   **2026-05-21**
    *   `public/get-instruments` response updated, new field `product_type` was added
    *   Trading Bot API section was added: `private/bot/create-trading-bot` (DCA, TWAP, GRID, FUNDING\_ARBITRAGE) `private/bot/terminate-trading-bot` `private/bot/update-trading-bot` `private/bot/pause-trading-bot` `private/bot/resume-trading-bot` `private/bot/get-trading-bots` `private/bot/get-trading-bot-executions`
*   **2026-05-07**
    *   Advanced Order Management API section was updated for DerivAttach
    *   `private/advanced/create-oto` and `private/advanced/create-otoco` — contingency type is now resolved from instrument type: spot instruments create SPOT\_ATTACH, derivative instruments create DERIV\_ATTACH. DerivAttach supports `isolation_id`, `leverage`, `isolated_margin_amount` on the primary leg and `ISOLATED_MARGIN` in `exec_inst`. Trigger legs inherit isolation mode from the parent.
    *   `private/advanced/create-order` — `attach_order_id` now applies to both SpotAttach and DerivAttach. New optional field `attach_isolation_id` for DerivAttach attach-to-position (derivatives only).
    *   `private/advanced/cancel-oto` and `private/advanced/cancel-otoco` — updated to cover both SPOT\_ATTACH and DERIV\_ATTACH.
    *   `private/advanced/cancel-all-orders` — new optional field `position_type` (CROSS\_MARGIN, ISOLATED\_MARGIN).
    *   `private/advanced/get-open-orders`, `private/advanced/get-order-detail`, `private/advanced/get-order-history`, and `user.advance.order` — response attributes extended with `exchange_order_id`, `ref_price`, `ref_price_type`, `reject_reason`, `attach_isolation_id`, `isolation_id`, `isolation_type`, `leverage`, `isolated_margin_amount`. `contingency_type` now includes DERIV\_ATTACH.
    *   `private/advanced/amend-order` — corrected required/optional flags: `new_price` is Y, `new_quantity` is Y, `new_ref_price` is N.
*   **2026-04-29**
    *   Fee Credits
    *   `private/get-fee-credit-balances` was added
    *   `private/get-trades` response updated, new field `fee_credits` was added
    *   `user.trade.{instrument_name}` response updated, new field `fee_credits` was added
*   **2026-04-07**
    *   `private/get-accounts` response updated, new field `hierarchy` was added
*   **2026-04-01**
    *   `private/create-order` request updated, `REDUCE_ONLY` was added to `exec_inst`
*   **2026-01-08**
    *   Add support for isolated position
    *   `private/create-isolated-margin-transfer` was added
    *   `private/change-isolated-margin-leverage` was added
    *   `private/user-balance` response updated, new fields `total_isolated_cash_balance` and `isolated_positions` were added
    *   `private/user-balance-history` response updated, new field `i` was added
    *   `private/get-subaccount-balances` response updated, new fields `total_isolated_cash_balance` and `isolated_positions` were added
    *   `private/get-positions` response updated, new fields `isolation_id` and `isolation_type` were added
    *   `private/create-order` request updated, new optional fields `isolation_id`, `leverage`, `isolated_margin_amount` were added, `exec_inst` added support for `ISOALTED_MARGIN`
    *   `private/close-position` request updated, new optional field `isolation_id` was added
    *   `private/get-open-orders` response updated, new fields `isolation_id` and `isolation_type` were added
    *   `private/get-order-detail` response updated, new fields `isolation_id` and `isolation_type` were added
    *   `private/get-order-history` request updated, new optional field `isolation_id` was added, response updated, new fields `isolation_id` and `isolation_type` were added
    *   `private/get-trades` request updated, new optional field `isolation_id` was added, response updated, new fields `isolation_id` and `isolation_type` were added
    *   `private/get-transactions` request updated, new optional field `isolation_id` was added, response updated, new fields `isolation_id` and `isolation_type` were added
    *   `user.order.{instrument_name}` response updated, new fields `isolation_id` and `isolation_type` were added
    *   `user.trade.{instrument_name}` response updated, new fields `isolation_id` and `isolation_type` were added
    *   `user.balance` response updated, new fields `total_isolated_cash_balance` and `isolated_positions` were added
    *   `user.positions` response updated, new fields `isolation_id`, `leverage`, `isolation_type`, `liquidation_price` and `isolated_margin_balance` were added
    *   `user.account_risk` response updated, new fields `total_isolated_cash_balance`, `isolated_positions` were added
    *   `user.position_balance` response updated, new field `isolated_positions` was added
*   **2025-03-26**
    *   `transaction_time` was added into `user.order.{instrument_name}`
*   **2025-11-18**
    *   `public/get-risk-parameters` was added new columns
*   **2025-10-16**
    *   `Advanced Order Management API` section was updated
*   **2025-07-17**
    *   `private/fiat/fiat-deposit-info` was added
    *   `private/fiat/fiat-deposit-history` was added
    *   `private/fiat/fiat-withdraw-history` was added
    *   `private/fiat/fiat-create-withdraw` was added
    *   `private/fiat/fiat-get-bank-accounts` was added
    *   `private/fiat/fiat-transaction-quota` was added
    *   `private/fiat/fiat-transaction-limit` was added
*   **2025-07-04**
    *   `private/create-order` exec\_inst was added `SMART_POST_ONLY`
    *   `private/create-order-list (LIST)` exec\_inst was added `SMART_POST_ONLY`
    *   `private/get-open-orders` exec\_inst was added `SMART_POST_ONLY`
    *   `private/get-order-detail` was added, exec\_inst was added `SMART_POST_ONLY`
    *   `private/get-order-history` exec\_inst was added `SMART_POST_ONLY`
*   **2025-06-10**
    *   `private/amend-order` was added
    *   `public/get-announcements` was added
*   **2025-05-29**
    *   transaction\_time\_ns field was added into `user.order.{instrument_name}` response
*   **2025-03-14**
    *   Removed deprecated attributes system\_label in `private/get-accounts`
*   **2025-03-06**
    *   Removed deprecated `book.{instrument_name}` default book subscription
    *   Removed deprecated 100ms interval from full snapshot `book.{instrument_name}.{depth}` book subscription
*   **2025-03-04**
    *   Remove section: `Unified Wallet and System Label`
*   **2025-01-27**
    *   `book.{instrument_name}.{depth}` - The following additional update frequencies are now supported:  
        Full snapshot subscription (`book_subscription_type=SNAPSHOT`) `500ms`  
        Delta subscription (`book_subscription_type=SNAPSHOT_AND_UPDATE`) `100ms`
*   **2024-12-11**
    *   `private/create-order` fee\_instrument\_name was added
*   **2024-10-02**
    *   `public/get-risk-parameters` was added
*   **2024-08-15**
    *   `private/get-fee-rate` was added
    *   `private/get-instrument-fee-rate` was added
*   **2024-07-12**
    *   Staking API added:  
        `private/staking/stake`  
        `private/staking/unstake`  
        `private/staking/get-staking-position`  
        `private/staking/get-staking-instruments`  
        `private/staking/get-open-stake`  
        `private/staking/get-stake-history`  
        `private/staking/get-reward-history`  
        `private/staking/convert`  
        `private/staking/get-open-convert`  
        `private/staking/get-convert-history`  
        `public/staking/get-conversion-rate`
*   **2024-06-27**
    *   `private/create-order` self-trade prevent (STP) was added
    *   `private/create-order-list (LIST)` self-trade prevent (STP) was added
*   **2024-02-12**
    *   `public/get-trades`, `trade.{instrument_name}` subscription, clarification for the public trade side field
    *   Side is the side of the taker order
    *   `book.{instrument_name}.{depth}` clarifications for book delta sequence number handling and re-subscription
*   **2024-01-04**
    *   Market data websocket subscription enhancements:
    *   `book.{instrument_name}` - The `subscription` result value is now explicit  
        e.g. previous `"subscription": "book.BTC_USD"` -> new `"subscription": "book.BTC_USD.50"`
    *   `book.{instrument_name}.{depth}` - For delta updates, the fixed 500ms delta full book snapshot heartbeat is replaced with empty delta in the case of no book changes
    *   `ticker` - Documented existing 'bs' and 'ks' fields (bid/ask size)
    *   `settlement` - For wildcard subscription, the `subscription` result value is now explicit  
        e.g. previous `"subscription": "settlement"` -> new `"subscription": "settlement.BTCUSD-231124"`
    *   Applied consistent field ordering for all market data subscriptions (`book`, `ticker`, `trade`, `candlestick`, `index`, `mark`, `settlement`, `funding`, `estimatedfunding`).  
        Result fields are always in the following order:  
        `id, method, code, instrument_name, subscription, channel`
    *   Market data REST `public/get-trades`
    *   Added additional `tn` nanoseconds timestamp field to the trade response
    *   Clarified timestamp pagination parameters
*   **2023-12-18**
    *   Market Data wildcard ticker subscription removed. Users should use the instrument specific subscription.
*   **2023-12-11**
    *   Introduced Market Data subscription limiting. Refer to Market Data Websocket Subscription Limits for more details
*   **2023-10-31**
    *   `user.balance`, `private/user-balance` will be updated:
        1.  Existing field total\_margin\_balance will represent new margin balance calculation without haircut.
        2.  Existing field total\_initial\_margin previously is made up of position IM only. On effective date, this field will represent the total sum of total\_position\_im + total\_haircut
        3.  New field total\_position\_im will be introduced to represent initial margin requirement to support open positions and orders
        4.  New field total\_haircut will be introduced to represent the total haircut on eligible collateral token assets. Refer to [Smart Cross Margin Enhancement Guide](https://static2.crypto.com/exchange/assets/documents/Exchange%20Smart%20Cross%20Margin%20Enhancement%20Guide%202023.pdf) for details
    *   `user.balance`, `user.account_risk`, `private/user-balance`, `private/get-subaccount-balances` will be updated:
        1.  New field collateral\_eligible will be introduced to indicate if token is eligible Collateral
        2.  collateral\_weight will be deprecated
        3.  New field haircut will be introduced to show haircut of eligible collateral token instead of collateral Weight. Refer to [Smart Cross Margin Enhancement Guide](https://static2.crypto.com/exchange/assets/documents/Exchange%20Smart%20Cross%20Margin%20Enhancement%20Guide%202023.pdf) for details
*   **2023-08-11**
    *   `private/create-order-list (LIST)` for batch order creation added
    *   `private/cancel-order-list (LIST)` for batch order cancel added
*   **2023-07-31**
    *   Market Data Websocket Subscriptions is effective:
    *   `funding.{instrument_name}` - channel will return the fixed hourly rate that will settle at the end of the hour.
    *   `estimatedfunding.{instrument_name}` - channel will return the estimated hourly rate that will begin in the next interval.
    *   Added new "funding\_rate" and "estimated\_funding\_rate" valuation types for public/get-valuations
*   **2023-06-28**
    *   `private/get-deposit-history` added
    *   `private/get-withdrawal-history` added
*   **2022-11-30**
    *   Support using `client_oid` to query in `private/get-order-detail` REST API
*   **2022-11-10**
    *   `USD_Stable_Coin` (aka USD Bundle), will be renamed as `USD`. Customer can test the change in UAT from 2022-11-10 before the change is effective in PROD. Target date for PROD is TBD.
    *   Customer can input both `USD` and `USD_Stable_Coin` to mean the same USD Bundle.
    *   However, on response, `USD` will be used to mean USD Bundle, instead of `USD_Stable_Coin`.
*   **2022-10-31**
    *   Added `private/create-order-list`, `private/create-subaccount-transfer` REST APIs
    *   Added `user.account_risk` and `user.position_balance` WebSocket subscriptions
    *   Added more `period` in `public/get-candlestick` `candlestick.{time_frame}.{instrument_name}` WebSocket subscription
*   **2022-09-21** - Added **Unified Wallet and System Label** section, to illustrate the transition from multiple wallets into unified wallet.
*   **2022-09-21** - Added new sub-account management endpoints: `private/get-accounts`, `private/create-subaccount-transfer`
*   **2022-09-21** - Added new exchange wallet management endpoints: `private/create-withdrawal`, `private/get-deposit-address`, `private/get-curency-networks`
*   **2022-09-21** - First publish, based on Derivative Exchange API v1.

## Common API References

### Naming Conventions

*   All **methods and URLs** in **dash-case**
*   All **parameters** in **snake\_case**
*   **Enums** in full **UPPERCASE** and **snake\_case**

### Generating the API Key

Before sending any requests, generate a new API key on the Exchange website under **User Center** → **API**. Note down:

*   **API Key**
*   **Secret Key**

Default settings are "Can Read" only; you can add or remove permissions via the Web UI. You may optionally specify a whitelist of IP addresses; if set, the API can only be used from those IPs.

### REST API Root Endpoints

REST API requests must be sent with **Content-Type: application/json**.

| Environment | REST API                                     |
| :---------- | :------------------------------------------- |
| UAT Sandbox | https://uat-api.3ona.co/exchange/v1/{method} |
| Production  | https://api.crypto.com/exchange/v1/{method}  |

### Websocket Root Endpoints

| Environment | Websocket (User API)                      |
| :---------- | :---------------------------------------- |
| UAT Sandbox | wss://uat-stream.3ona.co/exchange/v1/user |
| Production  | wss://stream.crypto.com/exchange/v1/user  |

| Environment | Websocket (Market Data)                     |
| :---------- | :------------------------------------------ |
| UAT Sandbox | wss://uat-stream.3ona.co/exchange/v1/market |
| Production  | wss://stream.crypto.com/exchange/v1/market  |

### Rate Limits

#### REST API

For authenticated calls, rate limits are per API method, per API key:

| Method                                                              | Limit                      |
| :------------------------------------------------------------------ | :------------------------- |
| private/create-order,private/cancel-order,private/cancel-all-orders | 15 requests per 100ms each |
| private/get-order-detail                                            | 30 requests per 100ms      |
| private/get-trades                                                  | 1 request per second       |
| private/get-order-history                                           | 1 request per second       |
| All others                                                          | 3 requests per 100ms each  |

For public market data calls, rate limits are per API method, per IP address:

| Method | Limit                        |
| :----- | :--------------------------- |
| All    | 100 requests per second each |

#### Staking

| Method | Limit                       |
| :----- | :-------------------------- |
| All    | 50 requests per second each |

#### Websocket

| Method      | Limit                   |
| :---------- | :---------------------- |
| User API    | 150 requests per second |
| Market Data | 100 requests per second |

### Request Format

The following information applies to both REST API and websockets commands:

| Name    | Type   | Required | Description                                                                       |
| :------ | :----- | :------- | :-------------------------------------------------------------------------------- |
| id      | long   | Y        | Request identifier (0 to 9,223,372,036,854,775,807). Response echoes the same id. |
| method  | string | Y        | The method to be invoked (e.g. private/get-order-detail).                         |
| params  | object | Y        | Parameters for the method. Use {} when a method has no parameters.                |
| api_key | string | Depends  | API key. Required for private methods (see Digital Signature).                    |
| sig     | string | Depends  | Digital signature. Required for private methods.                                  |
| nonce   | long   | Y        | Current timestamp in milliseconds since the Unix epoch.                           |

**⚠️ All numbers must be strings, and must be wrapped in double quotes. e.g. "12.34", instead of 12.34.**

### Digital Signature

For REST API, only private methods require a digital signature (as `sig`) and API key (as `api_key`) to be passed in. These private endpoints are only accessible by authenticated users.

For WebSocket (User API), the `public/auth` command has to be invoked once per session, with the digital signature (as `sig`) and API key (as `api_key`) as part of the request. Once authenticated, you will gain access to user-specific commands and no longer need to pass in the digital signature and API key for the duration of the session.

The authentication is based on the pairing of the API Key, along with the HMAC-SHA256 hash of the request parameters using the API Secret as the cryptographic key.

**⚠️ You should NEVER explicitly include the API Secret Key in plain-text in your request**

The algorithm for generating the HMAC-SHA256 signature is as follows:

1.  If "params" exist in the request, sort the request parameter keys in ascending order.
2.  Combine all the ordered parameter keys as key + value (no spaces, no delimiters). Let's call this the parameter string
3.  Next, do the following: method + id + api\_key + parameter string + nonce
4.  Use HMAC-SHA256 to hash the above using the API Secret as the cryptographic key
5.  Encode the output as a hex string -- this is your Digital Signature

Since all parameters for calculating the HMAC-SHA256 hash are present in the request except the API Secret, the server-side will independently calculate the Digital Signature as well, and if done correctly, the computed hashes will match.

Besides, for JavaScript client calling `private/get-order-detail` API, it is highly recommended to use STRING format of `order_id` in the JSON request payload, in order to guarantee the correctness of Digital Signature.

#### JavaScript Example

```javascript
const crypto = require("crypto-js");

const signRequest = (request_body, api_key, secret) => {
  const { id, method, params, nonce } = request_body;

  function isObject(obj) {
    return obj !== undefined && obj !== null && obj.constructor == Object;
  }
  function isArray(obj) {
    return obj !== undefined && obj !== null && obj.constructor == Array;
  }
  function arrayToString(obj) {
    return obj.reduce((a,b) => { return a + (isObject(b) ? objectToString(b) : (isArray(b) ? arrayToString(b) : b)); }, "");
  }
  function objectToString(obj) {
    return (obj == null ? "" : Object.keys(obj).sort().reduce((a, b) => {
      return a + b + (isArray(obj[b]) ? arrayToString(obj[b]) : (isObject(obj[b]) ? objectToString(obj[b]) : obj[b]));
    }, ""));
  }

  const paramsString = objectToString(params);

  const sigPayload = method + id + api_key + paramsString + nonce;
  request_body.sig = crypto.HmacSHA256(sigPayload, secret).toString(crypto.enc.Hex);

  return request_body;
};

const apiKey = "token"; /* User API Key */
const apiSecret = "secretKey"; /* User API Secret */

let request = {
  id: "11",
  method: "private/get-order-detail",
  api_key: apiKey,
  params: {
    order_id: "53287421324"
  },
  nonce: "1587846358253",
};

const requestBody = JSON.stringify(signRequest(request, apiKey, apiSecret));
```

#### Python Example

```python
import hmac
import hashlib
import time

API_KEY = "API_KEY"
SECRET_KEY = "SECRET_KEY"

req = {
    "id": "14",
    "method": "private/create-order-list",
    "api_key": API_KEY,
    "params": {
        "contingency_type": "LIST",
        "order_list": [
            {
                "instrument_name": "ONE_USDT",
                "side": "BUY",
                "type": "LIMIT",
                "price": "0.24",
                "quantity": "1.0"
            },
            {
                "instrument_name": "ONE_USDT",
                "side": "BUY",
                "type": "STOP_LIMIT",
                "price": "0.27",
                "quantity": "1.0",
                "trigger_price": "0.26"
            }
        ]
    },
    "nonce": str(int(time.time() * 1000))
}

# First ensure the params are alphabetically sorted by key
param_str = ""

MAX_LEVEL = 3

def params_to_str(obj, level):
    if level >= MAX_LEVEL:
        return str(obj)

    return_str = ""
    for key in sorted(obj):
        return_str += key
        if obj[key] is None:
            return_str += 'null'
        elif isinstance(obj[key], list):
            for subObj in obj[key]:
                return_str += params_to_str(subObj, level + 1)
        else:
            return_str += str(obj[key])
    return return_str

if "params" in req:
    param_str = params_to_str(req['params'], 0)

payload_str = req['method'] + str(req['id']) + req['api_key'] + param_str + str(req['nonce'])

req['sig'] = hmac.new(
    bytes(str(SECRET_KEY), 'utf-8'),
    msg=bytes(payload_str, 'utf-8'),
    digestmod=hashlib.sha256
).hexdigest()
```

#### C# Example

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

private const string API_KEY = "YOUR_API_KEY";
private const string API_SECRET = "YOUR_API_SECRET";

private static string GetSign(Dictionary<string, object> request)
{
  var paramsDict = request["params"] as Dictionary<string, object>;

  // Ensure the params are alphabetically sorted by key
  // Note: For nested objects or lists, implement recursive sorting similar to JS/Python examples
  string paramString = paramsDict != null
    ? string.Join("", paramsDict.Keys.OrderBy(key => key).Select(key => key + paramsDict[key]))
    : "";

  string sigPayload = request["method"].ToString()
    + request["id"].ToString()
    + API_KEY
    + paramString
    + request["nonce"].ToString();

  using (var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(API_SECRET)))
  {
    var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(sigPayload));
    return BitConverter.ToString(hash).Replace("-", "").ToLowerInvariant();
  }
}
```

#### Java Example

```java
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiRequestJson {
  private Long id;
  private String method;
  private Map<String, Object> params;
  private String sig;

  @JsonProperty("api_key")
  private String apiKey;

  private Long nonce;
}

//------------

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import org.apache.commons.codec.binary.Hex;

public class SigningUtil {

  private static final String HMAC_SHA256 = "HmacSHA256";
  private static final int MAX_LEVEL = 3;

  public static boolean verifySignature(ApiRequestJson apiRequestJson, String secret) {
    try {
      return genSignature(apiRequestJson, secret).equalsIgnoreCase(apiRequestJson.getSig());
    } catch (Exception e) {
      return false;
    }
  }

  @SuppressWarnings("unchecked")
  public static String getParamString(final Object paramObject) {
    StringBuilder sb = new StringBuilder();
    appendParamString(sb, paramObject, 0);
    return sb.toString();
  }

  @SuppressWarnings("unchecked")
  private static void appendParamString(final StringBuilder paramsStringBuilder, final Object paramObject, final int level) {
    if (level >= MAX_LEVEL) {
      paramsStringBuilder.append(paramObject.toString());
      return;
    }

    if (paramObject instanceof Map) {
      TreeMap<String, Object> params = new TreeMap<>((Map) paramObject);
      for (Map.Entry<String, Object> entry : params.entrySet()) {
        if (entry.getValue() instanceof Double) {
          paramsStringBuilder
              .append(entry.getKey())
              .append((new BigDecimal(entry.getValue().toString()))
                  .stripTrailingZeros()
                  .toPlainString());
        } else if (entry.getValue() instanceof List || entry.getValue() instanceof Map) {
          paramsStringBuilder
              .append(entry.getKey());
          appendParamString(paramsStringBuilder, entry.getValue(), level + 1);
        } else {
          paramsStringBuilder
              .append(entry.getKey())
              .append(entry.getValue());
        }
      }
    } else if (paramObject instanceof List) {
      List list = (List) paramObject;
      for (Object o : list) {
        appendParamString(paramsStringBuilder, o, level + 1);
      }
    } else {
      paramsStringBuilder.append(paramObject.toString());
    }
  }

  public static String genSignature(ApiRequestJson apiRequestJson, String secret)
      throws NoSuchAlgorithmException, InvalidKeyException {
    final byte[] byteKey = secret.getBytes(StandardCharsets.UTF_8);
    Mac mac = Mac.getInstance(HMAC_SHA256);
    SecretKeySpec keySpec = new SecretKeySpec(byteKey, HMAC_SHA256);
    mac.init(keySpec);

    String paramsString = "";

    if (apiRequestJson.getParams() != null) {
      paramsString += getParamString(apiRequestJson.getParams());
    }

    String sigPayload =
        apiRequestJson.getMethod()
            + apiRequestJson.getId()
            + apiRequestJson.getApiKey()
            + paramsString
            + (apiRequestJson.getNonce() == null ? "" : apiRequestJson.getNonce());

    byte[] macData = mac.doFinal(sigPayload.getBytes(StandardCharsets.UTF_8));

    return Hex.encodeHexString(macData);
  }

  public static ApiRequestJson sign(ApiRequestJson apiRequestJson, String secret)
      throws InvalidKeyException, NoSuchAlgorithmException {
    apiRequestJson.setSig(genSignature(apiRequestJson, secret));

    return apiRequestJson;
  }

  public static void main(String[] argv) throws InvalidKeyException, NoSuchAlgorithmException {
    ApiRequestJson apiRequestJson = ApiRequestJson.builder()
            .id(11L)
            .apiKey("token")
            .method("public/auth")
            .nonce(1589594102779L)
            .build();

    System.out.println(genSignature(apiRequestJson, "secretKey"));

    System.out.println(sign(apiRequestJson, "secretKey"));

  }
}
```

### Response Format

| Name     | Type   | Description                                                     |
| :------- | :----- | :-------------------------------------------------------------- |
| id       | long   | Original request identifier (or -1 if omitted in request).      |
| method   | string | Method invoked.                                                 |
| result   | object | Result object (present on success).                             |
| code     | int    | 0 for success; see Response and Reason Codes                    |
| message  | string | Optional; server or error message.                              |
| original | string | Optional; original request as escaped string (for error cases). |

### Response and Reason Codes

#### 200 OK

| HTTP Status | Code  | Message Code / Description                                  |
| :---------- | :---- | :---------------------------------------------------------- |
| 200         | 0     | --:Success                                                  |
| 200         | 40401 | NOT_FOUND:Not found                                         |
| 200         | 43012 | SELF_TRADE_PREVENTION:Canceled due to Self Trade Prevention |

#### 400 Bad Request

| HTTP Status | Code  | Message Code / Description                                                                          |
| :---------- | :---- | :-------------------------------------------------------------------------------------------------- |
| 400         | 202   | ACCOUNT_IS_SUSPENDED:Account is suspended                                                           |
| 400         | 204   | DUPLICATE_CLORDID:Duplicate client order id                                                         |
| 400         | 207   | NO_MARK_PRICE:No mark price                                                                         |
| 400         | 208   | INSTRUMENT_NOT_TRADABLE:Instrument is not tradable                                                  |
| 400         | 209   | INVALID_INSTRUMENT:Instrument is invalid                                                            |
| 400         | 213   | INVALID_ORDERQTY:Invalid order quantity                                                             |
| 400         | 218   | INVALID_ORDTYPE:Invalid order_type                                                                  |
| 400         | 220   | INVALID_SIDE:Invalid side                                                                           |
| 400         | 221   | INVALID_TIF:Invalid time_in_force                                                                   |
| 400         | 222   | STALE_MARK_PRICE:Stale mark price                                                                   |
| 400         | 223   | NO_CLORDID:No client order id                                                                       |
| 400         | 224   | REJ_BY_MATCHING_ENGINE:Rejected by matching engine                                                  |
| 400         | 225   | EXCEED_MAXIMUM_ENTRY_LEVERAGE:Exceeds maximum entry leverage                                        |
| 400         | 226   | INVALID_LEVERAGE:Invalid leverage                                                                   |
| 400         | 227   | INVALID_SLIPPAGE:Invalid slippage                                                                   |
| 400         | 228   | INVALID_FLOOR_PRICE:Invalid floor price                                                             |
| 400         | 229   | INVALID_REF_PRICE:Invalid ref price                                                                 |
| 400         | 230   | INVALID_REF_PRICE_TYPE:Invalid ref price type                                                       |
| 400         | 308   | INVALID_PRICE:Invalid price                                                                         |
| 400         | 314   | EXCEEDS_MAX_ORDER_SIZE:Exceeds max order size                                                       |
| 400         | 315   | FAR_AWAY_LIMIT_PRICE:Far away limit price                                                           |
| 400         | 318   | EXCEEDS_MAX_ALLOWED_ORDERS:Exceeds max allowed orders                                               |
| 400         | 319   | EXCEEDS_MAX_POSITION_SIZE:Exceeds max position size                                                 |
| 400         | 401   | ACCOUNT_DOES_NOT_EXIST:Account does not exist                                                       |
| 400         | 408   | MARGIN_UNIT_IS_SUSPENDED:Margin unit is suspended                                                   |
| 400         | 30024 | MAX_AMOUNT_VIOLATED:If create-withdrawal call quantity > max_withdrawal_balance in user-balance api |
| 400         | 40001 | BAD_REQUEST:Bad request                                                                             |
| 400         | 40002 | METHOD_NOT_FOUND:Method not found                                                                   |
| 400         | 40003 | INVALID_REQUEST:Invalid request                                                                     |
| 400         | 40004 | MISSING_OR_INVALID_ARGUMENT:Required argument is blank or missing                                   |
| 400         | 40005 | INVALID_DATE:Invalid date                                                                           |
| 400         | 40006 | DUPLICATE_REQUEST:Duplicate request received                                                        |
| 400         | 40102 | INVALID_NONCE:Nonce value differs by more than 60 seconds                                           |
| 400         | 40107 | EXCEED_MAX_SUBSCRIPTIONS:Session subscription limit has been exceeded                               |
| 400         | 50001 | ERR_INTERNAL:Internal error                                                                         |
| 400         | 50002 | DW_CREDIT_LINE_NOT_MAINTAINED:If create-withdrawal call breaches credit line check                  |

#### 401 Unauthorized

| HTTP Status | Code  | Message Code / Description                                 |
| :---------- | :---- | :--------------------------------------------------------- |
| 401         | 40101 | UNAUTHORIZED:Not authenticated, or key/signature incorrect |
| 401         | 40103 | IP_ILLEGAL:IP address not whitelisted                      |
| 401         | 40104 | USER_TIER_INVALID:Disallowed based on user tier            |

#### 408 Request Timeout

| HTTP Status | Code  | Message Code / Description            |
| :---------- | :---- | :------------------------------------ |
| 408         | 40801 | REQUEST_TIMEOUT:Request has timed out |

#### 429 Too Many Requests

| HTTP Status | Code  | Message Code / Description                           |
| :---------- | :---- | :--------------------------------------------------- |
| 429         | 42901 | TOO_MANY_REQUESTS:Requests have exceeded rate limits |

#### 500 Internal Server Error

| HTTP Status | Code   | Message Code / Description                                                                                                                            |
| :---------- | :----- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| 500         | 201    | NO_POSITION:No position                                                                                                                               |
| 500         | 203    | ACCOUNTS_DO_NOT_MATCH:Accounts do not match                                                                                                           |
| 500         | 205    | DUPLICATE_ORDERID:Duplicate order id                                                                                                                  |
| 500         | 206    | INSTRUMENT_EXPIRED:Instrument has expired                                                                                                             |
| 500         | 210    | INVALID_ACCOUNT:Account is invalid                                                                                                                    |
| 500         | 211    | INVALID_CURRENCY:Currency is invalid                                                                                                                  |
| 500         | 212    | INVALID_ORDERID:Invalid order id                                                                                                                      |
| 500         | 214    | INVALID_SETTLE_CURRENCY:Invalid settlement currency                                                                                                   |
| 500         | 215    | INVALID_FEE_CURRENCY:Invalid fee currency                                                                                                             |
| 500         | 216    | INVALID_POSITION_QTY:Invalid position quantity                                                                                                        |
| 500         | 217    | INVALID_OPEN_QTY:Invalid open quantity                                                                                                                |
| 500         | 219    | INVALID_EXECINST:Invalid exec_inst                                                                                                                    |
| 500         | 301    | ACCOUNT_IS_IN_MARGIN_CALL:Account is in margin call                                                                                                   |
| 500         | 302    | EXCEEDS_ACCOUNT_RISK_LIMIT:Exceeds account risk limit                                                                                                 |
| 500         | 303    | EXCEEDS_POSITION_RISK_LIMIT:Exceeds position risk limit                                                                                               |
| 500         | 304    | ORDER_WILL_LEAD_TO_IMMEDIATE_LIQUIDATION:Order will lead to immediate liquidation                                                                     |
| 500         | 305    | ORDER_WILL_TRIGGER_MARGIN_CALL:Order will trigger margin call                                                                                         |
| 500         | 306    | INSUFFICIENT_AVAILABLE_BALANCE:Insufficient available balance                                                                                         |
| 500         | 307    | INVALID_ORDSTATUS:Invalid order status                                                                                                                |
| 500         | 309    | MARKET_IS_NOT_OPEN:Market is not open                                                                                                                 |
| 500         | 310    | ORDER_PRICE_BEYOND_LIQUIDATION_PRICE:Order price beyond liquidation price                                                                             |
| 500         | 311    | POSITION_IS_IN_LIQUIDATION:Position is in liquidation                                                                                                 |
| 500         | 312    | ORDER_PRICE_GREATER_THAN_LIMITUPPRICE:Order price is greater than the limit up price                                                                  |
| 500         | 313    | ORDER_PRICE_LESS_THAN_LIMITDOWNPRICE:Order price is less than the limit down price                                                                    |
| 500         | 316    | NO_ACTIVE_ORDER:No active order                                                                                                                       |
| 500         | 317    | POSITION_NO_EXIST:Position does not exist                                                                                                             |
| 500         | 320    | EXCEEDS_INITIAL_MARGIN:Exceeds initial margin                                                                                                         |
| 500         | 321    | EXCEEDS_MAX_AVAILABLE_BALANCE:Exceeds maximum available balance                                                                                       |
| 500         | 406    | ACCOUNT_IS_NOT_ACTIVE:Account is not active                                                                                                           |
| 500         | 407    | MARGIN_UNIT_DOES_NOT_EXIST:Margin unit does not exist                                                                                                 |
| 500         | 409    | INVALID_USER:Invalid user                                                                                                                             |
| 500         | 410    | USER_IS_NOT_ACTIVE:User is not active                                                                                                                 |
| 500         | 411    | USER_NO_DERIV_ACCESS:User does not have derivative access                                                                                             |
| 500         | 412    | ACCOUNT_NO_DERIV_ACCESS:Account does not have derivative access                                                                                       |
| 500         | 415    | BELOW_MIN_ORDER_SIZE:Below Min. Order Size                                                                                                            |
| 500         | 501    | EXCEED_MAXIMUM_EFFECTIVE_LEVERAGE:Exceeds maximum effective leverage                                                                                  |
| 500         | 604    | INVALID_COLLATERAL_PRICE:Invalid collateral price                                                                                                     |
| 500         | 605    | INVALID_MARGIN_CALC:Invalid margin calculation                                                                                                        |
| 500         | 606    | EXCEED_ALLOWED_SLIPPAGE:Exceed allowed slippage                                                                                                       |
| 500         | 613    | INVALID_ISOLATION_ID:Invalid isolation ID                                                                                                             |
| 500         | 614    | EXCEEDS_ISOLATED_POSITION_LIMIT:Exceeds maximum allowed number of isolated position                                                                   |
| 500         | 615    | ACCOUNT_DOES_NOT_SUPPORT_ISOLATED_POSITION:Account does not support isolated position                                                                 |
| 500         | 616    | CREATE_ISOLATED_POSITION_FAILED:Failed to create isolated position                                                                                    |
| 500         | 617    | DUPLICATED_INSTRUMENT_ORDER_FOR_ISOLATED_MARGIN:Account already have isolated position with same instrument                                           |
| 500         | 618    | TOO_MANY_PENDING_ISOLATED_MARGIN_REQUESTS:Exceeds request limit for isolated margin order                                                             |
| 500         | 619    | UNSUPPORTED_OPERATION_ON_ISOLATED_POSITION:Unsupported operation on isolated position                                                                 |
| 500         | 620    | CREATE_ISOLATED_POSITION_TIMEOUT:Request for create isolated position has timed out                                                                   |
| 400         | 1110   | REDUCE_ONLY_REJECTED:Rejected REDUCE_ONLY create-order request                                                                                        |
| 500         | 43003  | FILL_OR_KILL:FOK order has not been filled and cancelled                                                                                              |
| 500         | 43004  | IMMEDIATE_OR_CANCEL:IOC order has not been filled and cancelled                                                                                       |
| 500         | 43005  | POST_ONLY_REJ:Rejected POST_ONLY create-order request (normally happened when exec_inst contains POST_ONLY but time_in_force is NOT GOOD_TILL_CANCEL) |
| 500         | 120009 | REJECTED:Request rejected by upstream service                                                                                                         |
| 500         | 130008 | NON_APPLICABLE:Operation not applicable for current state                                                                                             |

### Websocket Termination Codes

| Code | Description                                                                       |
| :--- | :-------------------------------------------------------------------------------- |
| 1000 | Normal disconnection by server, usually when the heartbeat isn't handled properly |
| 1006 | Abnormal disconnection                                                            |
| 1013 | Server restarting -- try again later                                              |

### Error Response Format

Due to the asynchronous nature of websocket requests, a robust and consistent error response is crucial in order to match the response with the request.

To ensure API consistency for websocket error responses, if the `id` and `method` is omitted in the original request, `id` will have a value of `-1` and `method` will have a value of ERROR.

The original request will be returned as an escaped string in the `original` field.

### Common Issues

#### TOO\_MANY\_REQUESTS After Websocket Connects

Websocket rate limits are pro-rated based on the calendar-second that the websocket connection was opened.

This means, depending on the fraction of the calendar-second that the connection was established, the rate limit could be pro-rated to a small number.

By adding a 1-second sleep after establishing the websocket connection, and before requests are sent, this will ensure the rate limit is properly reset and sync'd to your session.

This will avoid occurrences of rate-limit (TOO\_MANY\_REQUESTS) errors.

#### INVALID\_NONCE On All Requests

The nonce should be the UTC Unix timestamp in milliseconds.

If this has been carefully checked, then the issue occurs when the system clock of the client machine is greater than 60 seconds in the future / past.

Usually, re-syncing with the NTP time server on the client machine will correct the issue.

If the issue persists, you can try deliberately subtracting N seconds from the nonce to force it to be N seconds in the past, which is still within the 60-second past tolerance.