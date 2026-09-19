# Fiat Wallet

URL: https://exchange-developer.crypto.com/exchange/v1/docs/api/rest/fiat-wallet

Manages the user's fiat wallet.

Most of the endpoints are only available at master account level.

Some endpoints requires Withdrawal setting to be enabled for your API Key. If you do not see the option when viewing your API Keys, this feature is not yet available for you.

## Payment Networks and Currencies

This section provides a comprehensive reference table of all supported payment network and currency combinations available for use with the Fiat API endpoints. When making API calls to any of the Fiat service endpoints, use the payment network identifiers listed in this table for the payment\_network or payment\_networks parameters.

### Supported Payment Networks

| Payment Network        | Currency |
| :--------------------- | :------- |
| openpayd_exchange_sepa | EUR      |
| usd_swift              | USD      |
| usd_fedwire            | USD      |
| usd_cubix              | USD      |
| uk_fps                 | GBP      |
| aed_ipi                | AED      |

### Usage Notes

Activate the fiat service in your account before using the API. Go to Wallet page and select fiat currency to activate the fiat service. Bank account for USD need to be added in Crypto.com Wallet before using the API. For other currencies, bank account will be created after deposit. When calling Fiat API endpoints, you can specify payment networks in the following ways:

*   Single Payment Network: `json { "payment_network": "usd_cubix" }`
*   Multiple Payment Networks (comma-separated): `json { "payment_networks": "usd_cubix, usd_swift" }` Refer to the individual API endpoint documentation above for specific parameter requirements and usage examples.