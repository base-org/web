---
title: Adding tokens to Coinbase Wallet
slug: /tokens/wallet
description: 'A simple step by step guide to ensure ERC-20 tokens show immediately on Coinbase Wallet once deployed.'
keywords:
  [
    'ERC-20',
    'token',
    'memecoin',
    'Base',
    'Coinbase Wallet',
    'build on base',
    'tokens',
    'token issuer',
    'meme coin',
    'swaps',
  ]
hide_table_of_contents: true
---

# How to ensure ERC-20 tokens are immediately swappable in Coinbase Wallet

This page is intended for developers that will or have recently deployed ERC-20 token contracts on Base Mainnet and would like their token details to display as quickly as possible on Coinbase Wallet.

Coinbase Wallet makes any ERC-20 token instantly available for swapping seconds from when the contract is deployed.

Follow the instructions below to ensure your token logo, asset name, and other metadata also appear on Coinbase Wallet.

:::info Disclaimer
Base does not endorse any specific token that is deployed on mainnet and made available for swapping.
:::

---

## Adding your token to the list

The steps below explain how to have your token display quickly on Coinbase Wallet. These instructions work not only for Base, but for any EVM chain supported by Coinbase Wallet (Optimism, Arbitrum, Polygon, Avalanche, Fantom, BNB).

### Step 1: Deploy your ERC-20 Token on Base Mainnet

Write and deploy a compliant ERC-20 token smart contract. Test it and then deploy on Base Mainnet.

Once your ERC-20 contract is deployed, your asset is swappable instantly on Coinbase Wallet in the swap flow. Users can search by contract address or asset name. See below for information on how to show price charts and other metadata.

### Step 2: Prepare your metadata and asset images

Prepare a high-resolution image of your token's logo. Ensure it is clear, identifiable, and representative of your token.

### Step 3: List your cryptocurrency on a listing aggregator
##### **Note:** At this time, being listed and verified on CoinMarketCap is the best way to ensure your token’s name, image, price chart all show up on Coinbase Wallet.

You can pay to be listed AND **verified** on CoinMarketCap following these [instructions](https://support.coinmarketcap.com/hc/en-us/articles/360043659351-Listings-Criteria).

You can list for free on CoinGecko following these [instructions](https://support.coingecko.com/hc/en-us/articles/7291312302617-How-to-list-new-cryptocurrencies-on-CoinGecko).

Once CoinGecko lists your token OR CoinMarketCap lists it as **_verified_**, your asset's image logo and other metadata will flow into Coinbase Wallet and can be seen by users. **It can take 24-48 hours for metadata changes to update.**

## Why does my token display in the “Newer tokens” section?

Tokens that are newly launched and have not had significant trading volume appear in this section. Once your token reaches a market cap of at least $10M on CoinGecko or CoinMarketCap, the **newer token** label inside Coinbase Wallet is removed.

## Why is there no price chart for my token?

Your token must be listed and marked as verified on CoinMarketCap for the price chart to display on Coinbase Wallet.

If the above guidance doesn’t resolve your issue, please submit more information using this [Deform](https://app.deform.cc/form/a331da5a-447b-43e8-b636-ea3b925e115a/).

# Sharing your token
### Custom trading links
By sharing a unique link to your token’s asset page, your community can more easily interact with your token.

How to get your custom link:

**Step 1:** Grab your custom link for your token by navigating to the asset page on Coinbase Wallet

**Step 2:** Click the share button

:::info Disclaimer
New assets with low liquidity may result in failed swaps or may result in a user receiving less of the destination token due to slippage. An important responsibility of the token creator is to communicate to the community these risks.
:::
