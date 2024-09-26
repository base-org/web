---
title: 'Quickstart: Deploy on Base'
slug: /quickstart
description: A guide to help you get started with deploying your smart contracts on Base.
keywords:
  [
    Base,
    Base network,
    contracts,
    Base contracts,
    Base quickstart,
    smart contracts,
    Base smart contracts,
    Base Mainnet,
    Base Testnet,
  ]
hide_table_of_contents: false
---

# Quick Start: Deploy on Base

Welcome to the Base deployment quickstart guide! This comprehensive walkthrough will help you set up your environment and deploy smart contracts on Base. Whether you're a seasoned developer or just starting out, this guide has got you covered.

## What You'll Achieve

By the end of this quickstart, you'll be able to:

- Set up your development environment to deploy on Base
- Deploy your smart contracts to Base
- Connect your frontend to your smart contracts

:::tip Why Base?

Base is a fast, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain. By following this guide, you'll join a vibrant ecosystem of developers, creators, and innovators who are building a global onchain economy.

:::

## Set Up Your Development Environment

1. Create a new project directory

```bash
mkdir my-base-project && cd my-base-project
```

2. Install Foundry, a powerful framework for smart contract development

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

This installs Foundry and updates it to the latest version.

3. Initialize a new Solidity project

```bash
forge init
```

Your Foundry project is now ready. You'll find an example contract in the `src` directory, which you can replace with your own contracts. For the purposes of this guide, we'll use the Counter contract provided in `/src/Counter.sol`

:::tip
Foundry provides a suite of tools for Ethereum application development, including Forge (for testing), Cast (for interacting with the chain), and Anvil (for setting up a local node). You can learn more about Foundry [here](https://book.getfoundry.sh/).
:::

## Configure Foundry with Base

To deploy your smart contracts to Base, you need two key components:

1. A node connection to interact with the Base network
2. A funded private key to deploy the contract

Lets set up both of these:

### 1. Set up your node connection

1. Create a `.env` file in your project's root directory
2. Add the Base network RPC URL to your `.env` file

```bash
BASE_RPC_URL="https://mainnet.base.org"
BASE_SEPOLIA_RPC_URL="https://sepolia.base.org"
```

3. Load your environment variables

```bash
source .env
```

:::tip
Base Sepolia is the test network for Base, which we will use for the rest of this guide. You can obtain free Base Sepolia ETH from one of the [faucets listed here](/docs/tools/network-faucets).
:::

### 2. Secure your private key

1. Store your private key in Foundry's secure keystore

```bash
cast wallet import deployer --interactive
```

2. When prompted enter your private key and a password.

Your private key is stored in `~/.foundry/keystores` which is not tracked by git.

:::warning
Never share or commit your private key. Always keep it secure and handle with care.
:::

## Deploy Your Contracts

Now that your environment is set up, let's deploy your contracts to Base Sepolia.

1. Use the following command to compile and deploy your contract

```bash
forge create ./src/Counter.sol:Counter --rpc-url $BASE_SEPOLIA_RPC_URL --account deployer
```

Note the format of the contract being deployed is `<contract-path>:<contract-name>`.

2. After successful deployment, the transaction hash will be printed to the console output

3. Copy the deployed contract address and add it to your `.env` file

```bash
COUNTER_CONTRACT_ADDRESS="0x..."
```

4. Load the new environment variable

```bash
source .env
```

### Verify Your Deployment

To ensure your contract was deployed successfully:

1. Check the transaction on [Sepolia Basescan](https://sepolia.basescan.org/).
2. Use the `cast` command to interact with your deployed contract from the command line

```bash
cast call $COUNTER_CONTRACT_ADDRESS "number()(uint256)" --rpc-url $BASE_SEPOLIA_RPC_URL
```

This will return the initial value of the Counter contract's `number` storage variable, which will be `0`.

**Congratulations! You've deployed your smart contracts to Base Sepolia!**

## Next Steps

- Use [Onchainkit](https://onchainkit.com) to connect your frontend to your contracts! Onchainkit is a library of ready-to-use React components and Typescript utilities.
- Learn more about interacting with your contracts in the command line using Foundry from our [Foundry tutorial](/tutorials/deploy-with-foundry).

<br/>
<br/>
<br/>
<br/>
