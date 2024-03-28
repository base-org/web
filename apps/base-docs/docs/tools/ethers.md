---
title: ethers.js
slug: /tools/ethers
description: Documentation for using ethers.js, a JavaScript library for EVM-compatible blockchain interactions. This page covers installation, setup, connecting to the Base network, reading and writing blockchain data, and interacting with smart contracts.
keywords:
  [
    ethers.js,
    JavaScript library,
    Base network,
    Base mainnet,
    Base testnet,
    smart contracts,
    EVM-compatible,
    blockchain,
    JsonRpcProvider,
    Signer,
    ABI,
    interacting with smart contract,
  ]
hide_table_of_contents: true
---

# ethers.js

[ethers.js](https://docs.ethers.org/v5/) is a JavaScript library that allows developers to interact with EVM-compatible blockchain networks.

You can use ethers.js to interact with smart contracts deployed on the Base network.

---

## Install

To install ethers.js run the following command:

```bash
npm install --save ethers
```

## Setup

Before you can start using ethers.js, you need to import it into your project.

Add the following line of code to the top of your file to import ethers.js:

```javascript
const ethers = require('ethers');
```

## Connecting to Base

You can connect to Base by instantiating a new ethers.js `JsonRpcProvider` object with a RPC URL of the Base network:

```javascript
const ethers = require('ethers');

const url = 'https://mainnet.base.org';
const provider = new ethers.providers.JsonRpcProvider(url);
```

:::info

To alternatively connect to Base Sepolia (testnet), change the above URL from `https://mainnet.base.org` to `https://sepolia.base.org`.

:::

## Reading data from the blockchain

Once you have created a provider, you can use it to read data from the Base network.

For example, you can use the `getBlockNumber` method to get the latest block:

```javascript
async function getLatestBlock() {
  const latestBlock = await provider.getBlockNumber();
  console.log(latestBlock);
}
```

## Writing data to the blockchain

In order to write data to the Base network, you need to create a `Signer`.

You can create a `Signer` by instantiating a new ethers.js `Wallet` object, providing it with a private key and `Provider`.

```javascript
const privateKey = 'PRIVATE_KEY';
const signer = new ethers.Wallet(privateKey, provider);
```

:::info

`PRIVATE_KEY` is the private key of the wallet to use when creating the signer.

:::

## Interacting with smart contracts

You can use ethers.js to interact with a smart contract on Base by instantiating a `Contract` object using the ABI and address of a deployed contract:

```javascript
const abi = [
… // ABI of deployed contract
];

const contractAddress = "CONTRACT_ADDRESS"

// read only
const contract = new ethers.Contract(contractAddress, abi, provider);
```

For write-only contracts, provide a `Signer` object instead of a `Provider` object:

```javascript
// write only
const contract = new ethers.Contract(contractAddress, abi, signer);
```

:::info

`CONTRACT_ADDRESS` is the address of the deployed contract.

:::

Once you have created a `Contract` object, you can use it to call desired methods on the smart contract:

```javascript
async function setValue(value) {
  const tx = await contract.set(value);
  console.log(tx.hash);
}

async function getValue() {
  const value = await contract.get();
  console.log(value.toString());
}
```
