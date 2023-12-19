---
title: Pyth Price Feeds
slug: /guides/using-pyth-price-feeds
description: A guide on using Pyth Price Feeds to access real-time asset data, directly from your smart contracts on the Base testnet.
keywords: [
    Oracle
    Oracles,
    Pyth,
    Pyth Network,
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

# Accessing real-time asset data using Pyth Price Feeds

This page will guide you through the process of creating a smart contract on Base that utilizes Pyth Network oracles to consume a price feed.

---

## Objectives

By the end of this guide you should be able to do the following:

- Set up a smart contract project for Base using Foundry
- Install the Pyth smart contracts
- Consume a Pyth Network price feed within your smart contract
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

## What is Pyth Network?

**Pyth Network** focuses on ultra-low latency and real-time data, making it suitable for financial applications that require sub-second updates. Pyth's design emphasizes performance, and it is designed to provide data for a range of traditional and DeFi assets.

---

## Creating a project

Before you can begin writing smart contracts for Base and consuming Pyth price feeds, you need to set up your development environment by creating a Foundry project.

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

## Installing Pyth smart contracts

To use Pyth price feeds within your project, you need to install Pyth oracle contracts as a project dependency using `forge install`.

To install Pyth oracle contracts, run:

```bash
forge install pyth-network/pyth-sdk-solidity@v2.2.0 --no-git --no-commit
```

Once installed, update your `foundry.toml` file by appending the following line:

```bash
remappings = ['@pythnetwork/pyth-sdk-solidity/=lib/pyth-sdk-solidity’]
```

---

## Writing and compiling the Smart Contract

Once your project has been created and dependencies have been installed, you can now start writing a smart contract.

The Solidity code below defines a smart contract named `ExampleContract`. The code uses the `IPyth` interface from the [Pyth Solidity SDK](https://github.com/pyth-network/pyth-crosschain/tree/main/target_chains/ethereum/sdk/solidity).

An instance of`IPyth` is defined within the contract that provides functions for consuming Pyth price feeds. The constructor for the `IPyth` interface expects a contract address to be provided. This address provided in the code example below (`0xEbe57e8045F2F230872523bbff7374986E45C486`) corresponds to the Pyth contract address for the Base Goerli testnet.

:::info
Pyth also supports other EVM networks, such as Base Mainnet. For a list of all network contract addresses, visit the [Pyth documentation](https://docs.pyth.network/documentation/pythnet-price-feeds/evm).
:::

The contract also contains a function named `getLatestPrice`. This function takes a provided `priceUpdateData` that is used to get updated price data, and returns the price given a `priceId` of a price feed. The smart contract provided below uses a `priceId` of `0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace`, which corresponds to the price feed for `ETH / USD`.

:::info
Pyth provides a number of price feeds. For a list of available price feeds, visit the [Pyth documentation](https://pyth.network/developers/price-feed-ids#pyth-evm-stable).
:::

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@pythnetwork/pyth-sdk-solidity/IPyth.sol";
import "@pythnetwork/pyth-sdk-solidity/PythStructs.sol";

contract ExampleContract {
  IPyth pyth;

  /**
  * Network: Base Goerli (testnet)
  * Address: 0xEbe57e8045F2F230872523bbff7374986E45C486
  */
  constructor() {
    pyth = IPyth(0xEbe57e8045F2F230872523bbff7374986E45C486);
  }

  function getLatestPrice(
    bytes[] calldata priceUpdateData
  ) public payable returns (PythStructs.Price memory) {
    // Update the prices to the latest available values and pay the required fee for it. The `priceUpdateData` data
    // should be retrieved from our off-chain Price Service API using the `pyth-evm-js` package.
    // See section "How Pyth Works on EVM Chains" below for more information.
    uint fee = pyth.getUpdateFee(priceUpdateData);
    pyth.updatePriceFeeds{ value: fee }(priceUpdateData);

    bytes32 priceID = 0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace;
    // Read the current value of priceID, aborting the transaction if the price has not been updated recently.
    // Every chain has a default recency threshold which can be retrieved by calling the getValidTimePeriod() function on the contract.
    // Please see IPyth.sol for variants of this function that support configurable recency thresholds and other useful features.
    return pyth.getPrice(priceID);
  }
}
```

In your project, add the code provided above to a new file named `src/ExampleContract.sol` and delete the `src/Counter.sol` contract that was generated with the project (You can also delete the `test/Counter.t.sol` and `script/Counter.s.sol` files).

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

To deploy the `ExampleContract` smart contract to the Base Goerli test network, run the following command:

```bash
forge create ./src/ExampleContract.sol:ExampleContract --rpc-url $BASE_GOERLI_RPC --account deployer
```

When prompted, enter the password that you set earlier, when you imported your wallet’s private key.

:::info

Your wallet must be funded with ETH on the Base Goerli Testnet to cover the gas fees associated with the smart contract deployment. Otherwise, the deployment will fail.

To get testnet ETH for Base Goerli, see the [prerequisites](#prerequisites).

:::

After running the command above, the contract will be deployed on the Base Goerli test network. You can view the deployment status and contract by using a [block explorer](/tools/block-explorers).

---

## Interacting with the Smart Contract

The `getLatestPrice(bytes[])` function of the deployed contract takes a `priceUpdateData` argument that is used to get the latest price. This data can be fetched using the Hermes web service. Hermes allows users to easily query for recent price updates via a REST API. Make a curl request to fetch the `priceUpdateData` the `priceId`, `0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace`:

```
curl https://hermes.pyth.network/api/latest_vaas?ids[]=0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace
```

Once you have the `priceUpdateData`, you can use Foundry’s `cast` command-line tool to interact with the smart contract and call the `getLatestPrice(bytes[])` function to fetch the latest price of ETH.

To call the `getLatestPrice(bytes[])` function of the smart contract, run the following command, replacing `<DEPLOYED_ADDRESS>` with the address of your deployed contract, and `<PRICE_UPDATE_DATA>` with the `priceUpdateData` returned by the Hermes endpoint:

```bash
cast call <DEPLOYED_ADDRESS> --rpc-url $BASE_GOERLI_RPC "getLatestPrice(bytes[])" <PRICE_UPDATE_DATA>
```

You should receive the latest `ETH / USD` price in hexadecimal form.

---

## Conclusion

Congratulations! You have successfully deployed and interacted with a smart contract that consumes a Pyth Network oracle to access a real-time price feed on Base.

To learn more about Oracles and using Pyth Network price feeds within your smart contracts on Base, check out the following resources:

- [Oracles](https://docs.base.org/tools/oracles)
- [Pyth Network Price Feeds](https://docs.pyth.network/documentation/pythnet-price-feeds/evm)
