---
title: Quick Start: Deploy on Base
slug: /quick-start
description: A guide to help you get started with deploying your smart contracts on Base.
keywords:
  [
    Base,
    Base network,
    contracts,
    Base contracts,
    Base quick start,
    smart contracts,
    Base smart contracts,
    Base Mainnet,
    Base Testnet,
  ]
hide_table_of_contents: true
---

# Quick Start: Deploy on Base

Set up your environment to deploy your smart contracts on Base. This guide uses best in class tools to get you started.

## Prerequisites

- None! We'll get you started from scratch.

:::tip What you'll learn

- How to set up your develompent environment to deploy on Base
- How to deploy your smart contracts to Base
  :::

## Set up your development environment

In a new directory, create a new project:

```bash
mkdir my-base-project && cd my-base-project
```

Install Foundry, a powerful framework for building and deploying smart contracts:

```bash
curl -L https://foundry.paradigm.xyz | bash
```

Run foundryup to install the latest version of Foundry:

```bash
foundryup
```

Initialize a new Solidity project:

```bash
forge init
```

Your Foundry project is now initialized. The `src` directory contains an example contract, you can replace this with your own contracts.

## Configure Foundry with Base

To deploy your smart contracts to Base, you need two pieces of infrastructure:

1. A node connection to interact with the Base network
2. A funded private key

### Set up your node connection

Create a `.env` file in the root of our project and add the Base network RPC URL

```bash
BASE_RPC_URL="https://mainnet.base.org"
BASE_SEPOLIA_RPC_URL="https://sepolia.base.org"
```

:::tip
Base Sepolia is the test network for Base. You can fund your private key with free Base Sepolia ETH by using one of the [faucets listed here](/tools/network-faucets).
:::

To load your environment variables, run the following command:

```bash
source .env
```

### Secure your private key

To securely store your private key within Foundry's secure keystore you may run the following command:

```bash
cast wallet import deployer --interactive
```

You will be prompted to enter your private key and a password. Your private key is stored in `~/.foundry/keystores` which is not tracked by git.

## Deploy your smart contracts

To deploy your smart contracts to Base, you can use the following command:

```bash
forge create ./src/Counter.sol:Counter --rpc-url $BASE_SEPOLIA_RPC_URL --account deployer
```

This will compile your contracts and deploy your contract to the Base Sepolia network. The transaction hash will be printed to the console. Grab the address the contract was deployed to and add it to your `.env` file as `COUNTER_CONTRACT_ADDRESS`.

```bash
COUNTER_CONTRACT_ADDRESS="0x..."
```

Then load the new environment variable:

```bash
source .env
```

**Congratulations! You've deployed your smart contracts to Base!**

## Next Steps

- Connect your frontend to your smart contracts with [onchainkit](https://onchainkit.com)! A library of ready-to-use React components and Typescrip utilities
- Learn more about interacting with your contracts in the command line using foundry from our [foundry tutorial](../../src/pages/tutorials/docs/0_deploy-with-foundry.md)
