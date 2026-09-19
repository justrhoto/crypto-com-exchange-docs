# FIX Session Management

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/fix/fix-session-management

Session-level messages for connection management, authentication, and message recovery.

## Starting a Session

FIX API runs the server side of the FIX connection ("acceptor"). Sequence numbers start at 1 and must be incremented with every message. Messages with duplicate or out-of-order sequence numbers will be rejected. We never reset sequence numbers on the server side during the logon workflow.

**Standard Session Recovery:**

1.  Send 35=2 (ResendRequest) with the needed sequence number range
2.  Receive replay messages with PossDupFlag=Y. Apply the changes based on standard FIX protocol. If a message with this sequence number has been previously received, ignore message; if not, process normally
3.  Continue trading

## Ending a Session

The client may send the server an optional Logout (35=5) message, but the exchange will not interpret its absence as being an abnormal condition.

Under certain conditions, the server may send the client a Logout (35=5) message where the Text (58) field contains the reason.

## FIX Gateway Maintenance

The FIX gateway maintenance (Order Management flow only) will be carried out on the **second Thursday of each month, 07:05-07:15 UTC**.

Please disconnect on 07:04 UTC and reconnect on 07:15 UTC with sequence number 1/1.

**Other options for client preferences:**

*   **Option 1:** Sequence number resets require clients to LOGOFF and then LOGIN again using the Logon (35=A) message with the ResetSeqNumFlag (141) set to 'Y'. This resets the sequence numbers on both sides. Clients are free to perform this action whenever is convenient for their own schedule and set-up.
    
*   **Option 2:** Crypto.com FIX connections shall establish a cap to prevent sequence number counter overflow. Our FIX engine shall trigger disconnection and reset the sequence number to 1/1, when either the inbound or outbound sequence number reaches 2,147,480,000.
    

## Related Documentation

*   [FIX Introduction](/exchange/v1/docs/api/fix/exchange-fix-protocol) — API overview, authentication, endpoints, and message structure