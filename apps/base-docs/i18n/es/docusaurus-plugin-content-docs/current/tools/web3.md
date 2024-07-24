---
title: web3.js
slug: /tools/web3
description: Documentation for using web3.js, a JavaScript library for interacting with EVM-compatible blockchains. This page covers installation, setup, connecting to the Base network and interacting with smart contracts.
keywords:
  [
    web3.js,
    Base,
    Base mainnet,
    Base testnet,
    Base network,
    JavaScript,
    EVM,
    client library,
    blockchain,
    smart contracts,
    Ethereum,
    RPC URL,
  ]
hide_table_of_contents: true
---

es + es-translated # web3.js

es + es-translated [web3.js](https://web3js.org/) is a JavaScript library that allows developers to interact with EVM-compatible blockchain networks.

es + es-translated You can use web3.js to interact with smart contracts deployed on the Base network.

---

es + es-translated ## Install

es + es-translated To install web3.js run the following command:

```bash
npm install web3
```

es + es-translated ## Setup

es + es-translated Before you can start using web3.js, you need to import it into your project.

es + es-translated Add the following line of code to the top of your file to import web3.js:

```javascript
//web3.js v1
const Web3 = require('web3');

//web3.js v4
const { Web3 } = require('web3');
```

es + es-translated ## Connecting to Base

es + es-translated You can connect to Base by instantiating a new web3.js `Web3` object with a RPC URL of the Base network:

```javascript
const { Web3 } = require('web3');

const web3 = new Web3('https://mainnet.base.org');
```

es + es-translated :::info

es + es-translated To alternatively connect to Base Sepolia (testnet), change the above URL from `https://mainnet.base.org` to `https://sepolia.base.org`.

es + es-translated :::

es + es-translated ## Accessing data

es + es-translated Once you have created a provider, you can use it to read data from the Base network.

es + es-translated For example, you can use the `getBlockNumber` method to get the latest block:

```javascript
async function getLatestBlock(address) {
  const latestBlock = await web3.eth.getBlockNumber();
  console.log(latestBlock.toString());
}
```

es + es-translated ## Deploying contracts

es + es-translated Before you can deploy a contract to the Base network using web3.js, you must first create an account.

es + es-translated You can create an account by using `web3.eth.accounts`:

```javascript
const privateKey = “PRIVATE_KEY”;
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
```

es + es-translated :::info

es + es-translated `PRIVATE_KEY` is the private key of the wallet to use when creating the account.

es + es-translated :::

es + es-translated ## Interacting with smart contracts

es + es-translated You can use web3.js to interact with a smart contract on Base by instantiating a `Contract` object using the ABI and address of a deployed contract:

```javascript
const abi = [
… // ABI of deployed contract
];

const contractAddress = "CONTRACT_ADDRESS"

const contract = new web3.eth.Contract(abi, contractAddress);
```

es + es-translated Once you have created a `Contract` object, you can use it to call desired methods on the smart contract:

```javascript
async function setValue(value) {
  // write query
  const tx = await contract.methods.set(value).send();
  console.log(tx.transactionHash);
}

async function getValue() {
  // read query
  const value = await contract.methods.get().call();
  console.log(value.toString());
}
```

es + es-translated :::info

es + es-translated For more information on deploying contracts on Base, see [Deploying a Smart Contract](/guides/deploy-smart-contracts).

es + es-translated :::