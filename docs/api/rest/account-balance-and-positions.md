# Account Balance and Positions

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/account-balance-and-positions

Retrieve real-time and historical snapshots of wallet balances, open positions, margin requirements, and collateral status. Use these endpoints to monitor account health, risk exposure, and available trading capacity.

## Account Balance

The user balance response provides a comprehensive view of the account:

*   **Available balance** — funds available for new positions and withdrawals
*   **Margin balance** — total collateral value (cash + collateral-eligible tokens after haircut)
*   **Initial margin (IM)** — collateral required to open current positions and orders
*   **Maintenance margin (MM)** — minimum collateral threshold to avoid liquidation
*   **Position balance** — per-token breakdown showing quantity, market value, haircut rate, and collateral contribution

If margin balance falls below maintenance margin, the account enters liquidation.

## Positions

The positions endpoint returns all open derivative contracts, including instrument name, quantity (signed to indicate direction), position cost, and session PnL. For real-time mark price, liquidation price, and margin requirements, subscribe to the `user.positions` WebSocket channel.

## Subaccounts

Master accounts can create subaccounts to isolate trading activity. Use the subaccount transfer endpoint to move funds between accounts.