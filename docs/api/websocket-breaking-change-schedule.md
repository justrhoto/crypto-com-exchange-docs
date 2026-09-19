# Breaking Change Schedule

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/websocket-breaking-change-schedule

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