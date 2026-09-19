# OTC RFQ for Taker

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/otc-rfq-for-taker

## RFQ Trading Flow

1.  Taker can firstly subscribe to the following WebSocket channels:
    
    *   [`user.otc_qr.requests`](/exchange/v1/docs/api/websocket/ws-channel-user-otc-qr-requests)
    *   [`user.otc_qr.quotes`](/exchange/v1/docs/api/websocket/ws-channel-user-otc-qr-quotes)
    *   [`user.otc.deals`](/exchange/v1/docs/api/websocket/ws-channel-user-otc-deals)
2.  Taker can create a quote request via WebSocket: [`private/otc/request-quote`](/exchange/v1/docs/api/websocket/ws-user-api-private-otc-request-quote-rfq)
    
3.  Taker, who will be notified of quotes from the WebSocket channel [`user.otc_qr.quotes`](/exchange/v1/docs/api/websocket/ws-channel-user-otc-qr-quotes), can create a deal request upon Quote message with [`private/otc/request-deal`](/exchange/v1/docs/api/rest/private-otc-request-deal-rfq)
    
4.  Taker will receive confirmation of the deal's status on WebSocket channel [`user.otc.deals`](/exchange/v1/docs/api/websocket/ws-channel-user-otc-deals)
    
5.  Taker can get the rejected or completed quote request from [Quote Query API](/exchange/v1/docs/api/rest/private-otc-get-quote-request-history)
    
6.  Taker can get the rejected or completed deal from [Deal Query API](/exchange/v1/docs/api/rest/private-otc-get-deal-history-rfq)
    

## Quote Request Lifecycle

| Status    | Description                                                                                                               |
| :-------- | :------------------------------------------------------------------------------------------------------------------------ |
| ACTIVE    | user may receive a quote and user may call request-deal to execute a trade                                                |
| COMPLETED | quote request duration has expired and no longer valid. User will not receive quote nor able to call request-deal anymore |
| REJECTED  | rejected due to various reasons; quote request is no longer valid                                                         |

## Quote Lifecycle

| Status    | Description                            |
| :-------- | :------------------------------------- |
| ACTIVE    | Quote is valid                         |
| EXPIRED   | Quote has exceeded its TTL             |
| CANCELLED | Liquidity provider cancelled the quote |

## Deal History

Use the deal history endpoint to retrieve executed trades. Deal statuses:

| Status    | Description                                                       |
| :-------- | :---------------------------------------------------------------- |
| ACCEPTED  | Deal request accepted by the system.                              |
| CONFIRMED | Liquidity provider has executed the deal.                         |
| SETTLED   | Deal settled and funds transferred.                               |
| REJECTED  | Deal request rejected (quote expired, insufficient balance, etc.) |