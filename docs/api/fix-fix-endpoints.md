# FIX Endpoints

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/fix-fix-endpoints

## FIX Endpoints

To establish a FIX session, FIX clients must setup/use the AWS private link connection.

### UAT Sandbox

| FIX Gateway                  | FIX Endpoint                                  | Sender Comp ID                | Target Comp ID |
| :--------------------------- | :-------------------------------------------- | :---------------------------- | :------------- |
| User Data (Order Management) | tcp://uat1-fix-ud-f18a.crypto.local:31301     | UAT1.CLIENT_NAME.UD.00        | UAT1.CDC.UD    |
| User Data (Drop Copy)        | tcp://uat1-fix-uc-f18a.crypto.local:30300     | UAT1.CLIENT_NAME.UC.00        | UAT1.CDC.DC    |
| Market Data (BTC related)    | tcp://uat1-fix-md-f18a.crypto.local:34402     | UAT1.CLIENT_NAME_BTC.MD.00    | UAT1.CDC.MD    |
| Market Data (ETH related)    | tcp://uat1-fix-md-f18a.crypto.local:34403     | UAT1.CLIENT_NAME_ETH.MD.00    | UAT1.CDC.MD    |
| Market Data (OTHERS related) | tcp://uat1-fix-md-f18a.crypto.local:3440[5-7] | UAT1.CLIENT_NAME_OTHERS.MD.00 | UAT1.CDC.MD    |

### Production

| FIX Gateway                  | FIX Endpoint                                  | Sender Comp ID                | Target Comp ID |
| :--------------------------- | :-------------------------------------------- | :---------------------------- | :------------- |
| User Data (Order Management) | tcp://prd3-fix-ud-f18b.crypto.local:31301     | PRD3.CLIENT_NAME.UD.00        | PRD3.CDC.UD    |
| User Data (Drop Copy)        | tcp://prd3-fix-uc-f18b.crypto.local:30300     | PRD3.CLIENT_NAME.UC.00        | PRD3.CDC.UC    |
| Market Data (BTC related)    | tcp://prd3-fix-md-f18b.crypto.local:34402     | PRD3.CLIENT_NAME_BTC.MD.00    | PRD3.CDC.MD    |
| Market Data (ETH related)    | tcp://prd3-fix-md-f18b.crypto.local:34403     | PRD3.CLIENT_NAME_ETH.MD.00    | PRD3.CDC.MD    |
| Market Data (OTHERS related) | tcp://prd3-fix-md-f18b.crypto.local:3440[5-7] | PRD3.CLIENT_NAME_OTHERS.MD.00 | PRD3.CDC.MD    |

### Market Data Port Assignment

*   **BTC related pairs** - Port 34402 (Note: ETH/BTC is NOT included on this instance)
*   **ETH related pairs** - Port 34403 (Note: ETH/BTC is included on this instance)
*   **Others** - Port 34405 \[0-9A-D\], Port 34406 \[E-M\], Port 34407 \[N-Z\]