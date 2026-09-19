# Staking

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/staking

Stake crypto assets on-chain to earn rewards directly from the Exchange. Staking locks your tokens for a period, during which you earn periodic rewards. Liquid staking tokens (e.g., CDCETH) allow you to maintain liquidity while staking.

## Staking Workflow

**1\. Check Available Instruments** Call [`private/staking/get-staking-instruments`](/exchange/v1/docs/api/rest/private-staking-get-staking-instruments) to retrieve the list of tokens available for staking, including minimum stake amounts and reward rates.

**2\. Stake Tokens** Call [`private/staking/stake`](/exchange/v1/docs/api/rest/private-staking-stake) to lock tokens and begin earning rewards. The request is processed asynchronously.

**3\. Monitor Position** Use [`private/staking/get-staking-position`](/exchange/v1/docs/api/rest/private-staking-get-staking-position) to view your total staked balance and [`private/staking/get-open-stake`](/exchange/v1/docs/api/rest/private-staking-get-open-stake) to track pending stake requests.

**4\. Unstake Tokens** Call [`private/staking/unstake`](/exchange/v1/docs/api/rest/private-staking-unstake) to unlock staked tokens. Unstaking may involve a waiting period depending on the underlying blockchain protocol.

## Liquid Staking

Liquid staking tokens (e.g., CDCETH for staked ETH) represent staked assets and can be traded or held. Use the conversion endpoints to move between staked tokens and liquid staking tokens:

*   [`public/staking/get-conversion-rate`](/exchange/v1/docs/api/rest/public-staking-get-conversion-rate) — get the current conversion rate
*   [`private/staking/convert`](/exchange/v1/docs/api/rest/private-staking-convert) — convert between staked and liquid staking tokens
*   [`private/staking/get-open-convert`](/exchange/v1/docs/api/rest/private-staking-get-open-convert) — track pending conversion requests

## History

| Endpoint                            | Description                     |
| :---------------------------------- | :------------------------------ |
| private/staking/get-stake-history   | Past stake and unstake requests |
| private/staking/get-reward-history  | Earned staking rewards          |
| private/staking/get-convert-history | Past conversion requests        |