# Rate Limits

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/fix-rate-limits

## Rate Limits

| FIX Endpoint | Limit                    |
| :----------- | :----------------------- |
| Order Entry  | 2500 requests per second |
| Market Data  | 20 requests per second   |

**Important Note:** We recommend adding a 1-second sleep after establishing the FIX connection, and before requests are sent. This will avoid occurrences of rate-limit errors, as the rate limits are pro-rated based on the calendar-second that the connection was opened.