# Common API Reference

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest-common-api-reference

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