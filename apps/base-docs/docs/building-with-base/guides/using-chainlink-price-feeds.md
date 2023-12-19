---
title: Chainlink Data Feeds
slug: /guides/using-chainlink-price-feeds
description: A guide on using Chainlink Data Feeds to access real-world data, such as asset prices, directly from your smart contracts on the Base testnet.
keywords: [
    Oracle
    Oracles,
    Chainlink,
    price feeds,
    data feeds,
    smart contract,
    Base blockchain,
    Base network,
    Base testnet,
    Base test network,
    app development,
    dapp development,
    build a dapp on Base,
    build on Base,
  ]
---

# Accessing real-world data using Chainlink Data Feeds

This page will guide you through the process of creating a smart contract on Base that utilizes Chainlink Data Feeds to access real-world data, such as asset prices, directly from your smart contracts.

---

## Objectives

By the end of this guide you should be able to do the following:

- Set up a smart contract project for Base using Foundry
- Install the Chainlink smart contracts
- Consume a Chainlink price data feed within your smart contract
- Deploy and test your smart contracts on Base

---

## Prerequisites

### Foundry

This guide requires you to have Foundry installed.

- From the command-line (terminal), run: `curl -L https://foundry.paradigm.xyz | bash`
- Then run `foundryup`, to install the latest (nightly) build of Foundry

For more information, see the Foundry Book [installation guide](https://book.getfoundry.sh/getting-started/installation).

### Coinbase Wallet

In order to deploy a smart contract, you will first need a wallet. You can create a wallet by downloading the Coinbase Wallet browser extension.

- Download [Coinbase Wallet](https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad?hl=en)

### Wallet funds

Deploying contracts to the blockchain requires a gas fee. Therefore, you will need to fund your wallet with ETH to cover those gas fees.

For this guide, you will be deploying a contract to the Base Goerli test network. You can fund your wallet with Base Goerli ETH using one of the faucets listed on the Base [Network Faucets](https://docs.base.org/tools/network-faucets) page.

---

## What are Chainlink Data Feeds?

Accurate price data is essential in DeFi applications. However, blockchain networks lack the capability to directly fetch external real-world data, leading to the "[Oracle Problem](https://chain.link/education-hub/oracle-problem)".

Chainlink Data Feeds offer a solution to this problem by serving as a secure middleware layer that bridges the gap between real-world asset prices and onchain smart contracts.

---

## Creating a project

Before you can begin writing smart contracts for Base and consuming Chainlink data feeds, you need to set up your development environment by creating a Foundry project.

To create a new Foundry project, first create a new directory:

```bash
mkdir myproject
```

Then run:

```bash
cd myproject
forge init
```

This will create a Foundry project, which has the following basic layout:

```bash
.
├── foundry.toml
├── script
 │   └── Counter.s.sol
├── src
 │   └── Counter.sol
└── test
    └── Counter.t.sol
```

---

## Installing Chainlink smart contracts

To use Chainlink's data feeds within your project, you need to install Chainlink smart contracts as a project dependency using `forge install`.

To install Chainlink smart contracts, run:

```bash
forge install smartcontractkit/chainlink --no-commit
```

Once installed, update your `foundry.toml` file by appending the following line:

```bash
remappings = ['@chainlink/contracts/=lib/chainlink/contracts']
```

---

## Writing and compiling the Smart Contract

Once your project has been created and dependencies have been installed, you can now start writing a smart contract.

The Solidity code below defines a smart contract named `DataConsumerV3`. The code uses the `AggregatorV3Interface` interface from the [Chainlink contracts library](https://docs.chain.link/data-feeds/api-reference#aggregatorv3interface) to provide access to price feed data.

The smart contract passes an address to `AggregatorV3Interface`. This address (`0xcD2A119bD1F7DF95d706DE6F2057fDD45A0503E2`) corresponds to the `ETH/USD` price feed on the Base Goerli network.

:::info
Chainlink provides a number of price feeds for Base. For a list of available price feeds on Base, visit the [Chainlink documentation](https://docs.chain.link/data-feeds/price-feeds/addresses/?network=base&page=1).
:::

```solidity
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.0;

   import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

   contract DataConsumerV3 {
       AggregatorV3Interface internal priceFeed;

      /**
       * Network: Base Goerli
       * Aggregator: ETH/USD
       * Address: 0xcD2A119bD1F7DF95d706DE6F2057fDD45A0503E2
       */
       constructor() {
           priceFeed = AggregatorV3Interface(0xcD2A119bD1F7DF95d706DE6F2057fDD45A0503E2);
       }

       function getLatestPrice() public view returns (int) {
           (
               /* uint80 roundID */,
               int price,
               /* uint startedAt */,
               /* uint timeStamp */,
               /* uint80 answeredInRound */
           ) = priceFeed.latestRoundData();
           return price;
       }
   }
```

In your project, add the code provided above to a new file named `src/DataConsumerV3.sol`, and delete the `src/Counter.sol` contract that was generated with the project. (you can also delete the `test/Counter.t.sol` and `script/Counter.s.sol` files).

To compile the new smart contract, run:

```bash
forge build
```

---

## Deploying the smart contract

### Setting up your wallet as the deployer

Before you can deploy your smart contract to the Base network, you will need to set up a wallet to be used as the deployer.

To do so, you can use the [`cast wallet import`](https://book.getfoundry.sh/reference/cast/cast-wallet-import) command to import the private key of the wallet into Foundry's securely encrypted keystore:

```bash
cast wallet import deployer --interactive
```

After running the command above, you will be prompted to enter your private key, as well as a password for signing transactions.

:::caution

For instructions on how to get your private key from Coinbase Wallet, visit the [Coinbase Wallet documentation](https://docs.cloud.coinbase.com/wallet-sdk/docs/developer-settings#show-private-key).

**It is critical that you do NOT commit this to a public repo**.

:::

To confirm that the wallet was imported as the `deployer` account in your Foundry project, run:

```bash
cast wallet list
```

### Setting up environment variables for Base Goerli

To setup your environment for deploying to the Base network, create an `.env` file in the home directory of your project, and add the RPC URL for the Base Goerli testnet:

```
BASE_GOERLI_RPC="https://goerli.base.org"
```

Once the `.env` file has been created, run the following command to load the environment variables in the current command line session:

```bash
source .env
```

### Deploying the smart contract to Base Goerli

With your contract compiled and environment setup, you are ready to deploy the smart contract to the Base Goerli Testnet!

For deploying a single smart contract using Foundry, you can use the `forge create` command. The command requires you to specify the smart contract you want to deploy, an RPC URL of the network you want to deploy to, and the account you want to deploy with.

To deploy the `DataConsumerV3` smart contract to the Base Goerli test network, run the following command:

```bash
forge create ./src/DataConsumerV3.sol:DataConsumerV3 --rpc-url $BASE_GOERLI_RPC --account deployer
```

When prompted, enter the password that you set earlier, when you imported your wallet's private key.

:::info

Your wallet must be funded with ETH on the Base Goerli Testnet to cover the gas fees associated with the smart contract deployment. Otherwise, the deployment will fail.

To get testnet ETH for Base Goerli, see the [prerequisites](#prerequisites).

:::

After running the command above, the contract will be deployed on the Base Goerli test network. You can view the deployment status and contract by using a [block explorer](/tools/block-explorers).

---

## Interacting with the Smart Contract

Foundry provides the `cast` command-line tool that can be used to interact with the smart contract that was deployed and call the `getLatestPrice()` function to fetch the latest price of ETH.

To call the `getLatestPrice()` function of the smart contract, run:

```bash
cast call <DEPLOYED_ADDRESS> --rpc-url $BASE_GOERLI_RPC "getLatestPrice()"
```

You should receive the latest `ETH / USD` price in hexadecimal form.

---

## Conclusion

Congratulations! You have successfully deployed and interacted with a smart contract that consumes a Chainlink price feed on the Base blockchain network.

To learn more about Oracles and using Chainlink to access real-world data within your smart contracts on Base, check out the following resources:

- [Oracles](https://docs.base.org/tools/oracles)
- [Chainlink Data Feeds on Base](https://docs.chain.link/data-feeds/price-feeds/addresses?network=base&page=1&search=#networks)
