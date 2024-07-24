---
title: viem
slug: /tools/viem
description: Documentation for using Viem, a TypeScript interface for EVM-compatible blockchains. This page covers installation, setup, and various functionalities such as reading and writing blockchain data and interacting with smart contracts on Base.
keywords:
  [
    viem,
    Base,
    Base mainnet,
    Base testnet,
    Ethereum,
    smart contracts,
    blockchain,
    RPC URL,
    JavaScript,
    TypeScript,
  ]
hide_table_of_contents: true
---

es + es-translated # viem

es + es-translated :::info

es + es-translated Viem is currently only available on Base Sepolia testnet.

es + es-translated :::

es + es-translated [viem](https://viem.sh/) a TypeScript interface for Ethereum that provides low-level stateless primitives for interacting with Ethereum.

es + es-translated You can use viem to interact with smart contracts deployed on Base.

---

es + es-translated ## Install

es + es-translated To install viem run the following command:

```bash
npm install --save viem
```

es + es-translated ## Setup

es + es-translated Before you can start using viem, you need to setup a [Client](https://viem.sh/docs/clients/intro.html) with a desired [Transport](https://viem.sh/docs/clients/intro.html) and [Chain](https://viem.sh/docs/chains/introduction).

```javascript
import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';

const client = createPublicClient({
  chain: base,
  transport: http(),
});
```

es + es-translated :::info

es + es-translated To use Base, you must specify `base` as the chain when creating a Client.

es + es-translated To use Base Sepolia (testnet), replace `base` with `baseSepolia`.

es + es-translated :::

es + es-translated ## Reading data from the blockchain

es + es-translated Once you have created a client, you can use it to read and access data from Base using [Public Actions](https://viem.sh/docs/actions/public/introduction.html)

es + es-translated Public Actions are client methods that map one-to-one with a "public" Ethereum RPC method (`eth_blockNumber`, `eth_getBalance`, etc.)

es + es-translated For example, you can use the `getBlockNumber` client method to get the latest block:

```javascript
const blockNumber = await client.getBlockNumber();
```

es + es-translated ## Writing data to the blockchain

es + es-translated In order to write data to Base, you need to create a Wallet client (`createWalletClient`) and specify an [`Account`](https://ethereum.org/en/developers/docs/accounts/) to use.

```javascript
import { createWalletClient, custom } from 'viem'
import { base } from 'viem/chains'

//highlight-start
const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
//highlight-end

const client = createWalletClient({
  //highlight-next-line
  account,
  chain: base,
  transport: custom(window.ethereum)
})

client.sendTransaction({ ... })
```

es + es-translated :::info

es + es-translated In addition to making a JSON-RPC request (`eth_requestAccounts`) to get an Account, viem provides various helper methods for creating an `Account`, including: [`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey.html), [`mnemonicToAccount`](https://viem.sh/docs/accounts/mnemonic.html), and [`hdKeyToAccount`](https://viem.sh/docs/accounts/hd.html).

es + es-translated To use Base Sepolia (testnet), replace `base` with `baseSepolia`.

es + es-translated :::

es + es-translated ## Interacting with smart contracts

es + es-translated You can use viem to interact with a smart contract on Base by creating a `Contract` instance using [`getContract`](https://viem.sh/docs/contract/getContract.html) and passing it the contract ABI, contract address, and [Public](https://viem.sh/docs/clients/public.html) and/or [Wallet](https://viem.sh/docs/clients/wallet.html) Client:

```javascript
import { getContract } from 'viem';
import { wagmiAbi } from './abi';
import { publicClient } from './client';

// 1. Create contract instance
const contract = getContract({
  address: 'CONTRACT_ADDRESS',
  abi: wagmiAbi,
  publicClient,
});

// 2. Call contract methods, listen to events, etc.
const result = await contract.read.totalSupply();
```

es + es-translated :::info

es + es-translated `CONTRACT_ADDRESS` is the address of the deployed contract.

es + es-translated :::