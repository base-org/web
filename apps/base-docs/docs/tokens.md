---
title: Tokens
slug: /tokens/list
description: How to submit ERC-20 tokens for bridging between Ethereum and Base as a token issuer.
keywords:
  [
    Base Token List,
    ERC-20 tokens,
    Ethereum,
    Base Mainnet,
    Base Bridge,
    token bridging,
    token submission,
    Optimism Superchain,
    token deployment,
    add token to Base,
  ]
---

# The Base Token List

This page is intended for token issuers who already have an ERC-20 contract deployed on Ethereum and would like to submit their token for bridging between Ethereum and Base and Base Mainnet to Base Bridge and other bridges. Base uses the [Optimism Superchain token list](https://github.com/ethereum-optimism/ethereum-optimism.github.io) as a reference for tokens that have been deployed on Base.

**_Note - Tokens approved in the Github repository are not necessarily listed on the Base Bridge._**

**_Disclaimer: Base does not endorse any of the tokens that are listed in the Github repository and has conducted only preliminary checks, which includes automated checks listed_** [**_here_**](https://github.com/ethereum-optimism/ethereum-optimism.github.io)**_._**

---

## Adding your token to the list

The steps below explain how to get your token on the Base Token List.

### Step 1: Deploy your token on Base

Select your preferred bridging framework and use it to deploy an ERC-20 for your token on Base. We recommend you use the framework provided by Base's [standard bridge](https://github.com/ethereum-optimism/optimism/blob/develop/specs/bridges.md#standard-bridges) contracts, and furthermore deploy your token using the [OptimismMintableERC20Factory](https://docs.base.org/base-contracts/#l2-contract-addresses). Deploying your token on Base in this manner provides us with guarantees that will smooth the approval process. If you choose a different bridging framework, its interface must be compatible with that of the standard bridge, otherwise it may be difficult for us to support.

### Step 2: Submit details for your token

Follow the instructions in the [GitHub repository](https://github.com/ethereum-optimism/ethereum-optimism.github.io) and submit a PR containing the required details for your token. You must specify in your token's data.json file a section for ‘base-goerli’ and/or ‘base’ . The change you need to submit is particularly simple if your token has already been added to the Optimism token list. For example, [this PR](https://github.com/ethereum-optimism/ethereum-optimism.github.io/commit/27ab9b2d3388f7feba3a152e0a0748c73d732a68) shows the change required for cbETH, which was already on Optimism's token list and relies on the Base standard bridge.

### Step 3: Await final approval

Tokens approved in the Github repository are not necessarily listed on the Base Bridge and are not guaranteed or automatic. Base Bridge reviews are conducted manually by the Base team. For more information, please visit our [Discord](https://base.org/discord).
