# Trading Bot API

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/trading-bot-api

Manage automated trading bots including DCA (Dollar-Cost Averaging), TWAP (Time-Weighted Average Price), GRID, and Funding Arbitrage strategies.

## Bot Types

| Type              | Description                                                                                                                     |
| :---------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| DCA               | Dollar-Cost Averaging - automatically buys or sells at regular intervals over a preset time frame                               |
| TWAP              | Time-Weighted Average Price - executes large orders by splitting them into smaller slices over a defined time window            |
| GRID              | Grid Trading - automatically places buy and sell orders within a defined price range                                            |
| FUNDING_ARBITRAGE | Funding Arbitrage - simultaneously holds a spot position and an opposing perpetual swap position to capture funding rate income |

## Bot States

| State      | Description                                 |
| :--------- | :------------------------------------------ |
| RUNNING    | Bot is actively placing orders              |
| PAUSED     | Bot is paused, no new orders will be placed |
| TERMINATED | Bot has been terminated                     |