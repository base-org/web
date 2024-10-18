---
title: Sending messages from Base to other chains using Axelar GMP
slug: /cross-chain-with-axelar
description: A tutorial that teaches how to use Axelar General Message Passing to perform cross-chain messaging from Base Sepolia testnet to Optimism Sepolia testnet.
author: idris-olubisi
keywords:
  [
    Cross-chain,
    Crosschain,
    multichain,
    Axelar,
    Axelar GMP,
    Axelar General Message Passing,
    Axelar GMP Solidity SDK,
    cross-chain messaging,
    send message across chains,
  ]
tags: ['cross-chain']
difficulty: intermediate
displayed_sidebar: null
---

This tutorial will guide you through the process of sending messages from a Base smart contract to another smart contract on a different chain using Axelar's General Message Passing.

---

## Objectives

By the end of this tutorial, you should be able to:

- Set up a smart contract project for Base using Hardhat
- Use Axelar GMP to send messages to contract on other different chains
- Setup an RPC for deployment
- Deploy and test your smart contracts on the Base testnet

## Prerequisites

### Node.js

You will need **[Node.js](https://nodejs.org/en/)** and its package manager NPM version 18\*. Verify that Node.js is installed by running the following terminal command:

```bash
node -v && npm -v
```

### Hardhat

[Hardhat](https://hardhat.org/hardhat-runner/docs/getting-started) is a development environment for Ethereum software. Install it using the following command:

```bash
npm install --save-dev hardhat
```

### Coinbase wallet

In order to deploy a smart contract, you will first need a wallet. You can create a wallet by downloading the [Coinbase Wallet browser extension](https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad?hl=en).

### Wallet funds

For this tutorial, you will need to fund your wallet with ETH on Base Sepolia and Optimism Sepolia. The ETH is required to cover gas fees associated with deploying and interacting smart contracts to the blockchain.

- To fund your wallet with ETH on Base Sepolia, visit a faucet listed on the [Base Faucets](https://docs.base.org/tools/network-faucets) page.
- To fund your wallet with ETH on Optimism Goerli, visit a faucet listed on the [Optimism Faucets](https://docs.optimism.io/builders/tools/faucets) page.

## What is Axelar GMP?

**[Axelar General Message Passing (GMP)](https://docs.axelar.dev/dev/general-message-passing/overview)** empowers developers by enabling them to call any function on interconnected chains seamlessly.

With GMP, developers gain the ability to:

1. Call a contract on chain A and interact with a contract on chain B.
2. Execute cross-chain transactions by calling a contract on chain A and sending tokens to chain B.

### How does it work?

- Chains A and B must be EVM or [Cosmos](https://docs.axelar.dev/dev/cosmos-gmp) blockchains with an [`AxelarGateway`](https://github.com/axelarnetwork/axelar-cgp-solidity/blob/main/contracts/AxelarGateway.sol) contract deployed on them.
- The application’s executable contract must be deployed on the destination contract.
- The application must be on one of Axelar’s supported EVM chains. See [chain names](https://docs.axelar.dev/dev/reference/mainnet-chain-names) for a list of EVM chains that have an Axelar Gateway deployed. The list is updated as new chains are added.

### **Gateway interface**

In your smart contract, you’ll be interacting with the `callContract()` or `callContractWithToken()` methods of the [Gateway contract](https://etherscan.io/address/0x4F4495243837681061C4743b74B3eEdf548D56A5#writeProxyContract).

```solidity
function callContract(
    string calldata destinationChain,
    string calldata destinationContractAddress,
    bytes calldata payload
) external {
    emit ContractCall(msg.sender, destinationChain, destinationContractAddress, keccak256(payload), payload);
}

function callContractWithToken(
    string calldata destinationChain,
    string calldata destinationContractAddress,
    bytes calldata payload,
    string calldata symbol,
    uint256 amount
) external {
    _burnTokenFrom(msg.sender, symbol, amount);
    emit ContractCallWithToken(msg.sender, destinationChain, destinationContractAddress, keccak256(payload), payload, symbol, amount);
}

function _execute(string calldata sourceChain, string calldata sourceAddress, bytes calldata payload) internal virtual {}

```

### On the source chain

1. Call either the `callContract()` or the `callContractWithToken()` function on the `AxelarGateway` contract to initiate a call. Once the call is initiated, you can see its status at https://axelarscan.io/gmp/[txHash](https://axelarscan.io/gmp/%5BtxHash) or programmatically track it via the [AxelarJS SDK](https://docs.axelar.dev/dev/axelarjs-sdk/tx-status-query-recovery#query-transaction-status-by-txhash).
2. Prepay the [gas for the decentralized Axelar consensus](https://docs.axelar.dev/dev/general-message-passing/gas-services/pay-gas) and the transactions for approving and executing on the destination chain.
3. The call will enter the Axelar Gateway from the source chain.

### On the Axelar network

1. The Axelar network confirms the call and utilizes funds from the source chain’s native token reserves to cover the gas costs on both the Axelar blockchain and the destination chain. You can [monitor and recover your transaction](https://docs.axelar.dev/dev/general-message-passing/monitoring) if the paid gas is insufficient for approving or executing on the destination chain.

### On the destination chain

1. The call is approved (Axelar validators come to a consensus by voting, and their votes and signatures are then available to pass to the destination chain), and the approval is relayed to the Axelar Gateway on the destination chain.
2. The executor service relays and executes the approved call to the application’s [`AxelarExecutable`](https://github.com/axelarnetwork/axelar-gmp-sdk-solidity/blob/main/contracts/executable/AxelarExecutable.sol) interface.

## Creating a project

Before you begin, you’ll need to set up your smart contract development environment. For this tutorial, you will use Hardhat.

To create a new Hardhat project, first create a new directory:

```bash
mkdir myproject
```

Then run:

```bash
cd myproject
npx hardhat@2.22.3
```

Go with the following options:

```
What do you want to do?
✔ Create A JavaScript Project
✔ Hardhat project root:
? Do you want to add a .gitignore? (Y/n) › y
? Do you want to install this sample project's dependencies with npm (hardhat @nomicfoundation/hardhat-toolbox)? (Y/n) › y
```

This will create a Hardhat project with a basic layout:

```bash
├── contracts
├── ignition
├── hardhat.config.js
└── test
```

:::info

You can delete the `contracts/Lock.sol`, `test/Lock.js`, and `ignition/modules/Lock.js` boilerplate files that were generated with the project, as you won’t need them.

:::

## Installing Axelar SDK

To integrate the Axelar SDK into your application, you must install the Axelar GMP Solidity SDK, dotenv, and the AxelarJS SDK for gas estimation with the following command:

```bash
npm i @axelar-network/axelar-gmp-sdk-solidity@3.6.1 @axelar-network/axelarjs-sdk@0.14.2 dotenv
```

## Writing the smart contract

Create a new file with the name `SendMessage.sol` inside the `contracts` folder.

### Import the Axelar SDKs

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {AxelarExecutable} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol";
import {IAxelarGateway} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol";
import {IAxelarGasService} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol";

/**
 * @title SendMessage
 * @notice Send a message from chain A to chain B
 */
contract SendMessage is AxelarExecutable {}
```

In the code snippet above, you have:

- `AxelarExecutable` – This contract manages the message on the destination chain after a transaction is sent to the Axelar network.
- `IAxelarGateway` – The [Axelar Gateway](https://docs.axelar.dev/learn#gateway-smart-contracts) contract.
- `IAxelarGasService` – The [Axelar Gas Service](https://docs.axelar.dev/learn#gas-receiver) contract.
- `SendMessage` – The contract that extends the Axelar executable.

### Declare state variables and include constructor

Next, you will declare state variables and initialize the constructor:

```solidity
//...

/**
 * @title SendMessage
 * @notice Send a message from chain A to chain B
 */
contract SendMessage is AxelarExecutable {
    string public message;
    string public sourceChain;
    string public sourceAddress;

    IAxelarGasService public immutable gasService;

    /**
     *
     * @param _gateway Address of Axelar Gateway on-chain
     * @param _gasReceiver Address of Axelar Gas Service on-chain
     */
    constructor(
        address _gateway,
        address _gasReceiver
    ) AxelarExecutable(_gateway) {
        gasService = IAxelarGasService(_gasReceiver);
    }
}
```

### Add send message function

```solidity

//...

/**
 * @title SendMessage
 * @notice Send a message from chain A to chain B
 */
contract SendMessage is AxelarExecutable {
	//...

/**
 * @notice Send message from chain A to chain B
 * @dev Message param is passed in as a GMP message
 * @param destinationChain Name of the dest chain (ex. "Fantom")
 * @param destinationAddress Address on dest chain the transaction is going to
 * @param _message Message to be sent
 */
function setRemoteValue(
    string calldata destinationChain,
    string calldata destinationAddress,
    string calldata _message
) external payable {
    require(msg.value > 0, "Gas payment is required");

    bytes memory payload = abi.encode(_message);

    gasService.payNativeGasForContractCall{value: msg.value}(
        address(this),
        destinationChain,
        destinationAddress,
        payload,
        msg.sender
    );
    gateway.callContract(destinationChain, destinationAddress, payload);
}

}
```

In the code snippet above, you:

- Created a function called `setRemoteValue()` to send a message from chain A to chain B
- Required gas payment to ensure that gas is paid for the multichain interaction
- Encoded the message to be sent
- Paid the gas using the `payNativeGasForContractCall()` function from the Axelar Gas Service
- Invoked the `callContract()` function to send the message with the encoded payload

### Add an `_execute()` function

```solidity
//...

 /**
 * @notice Logic to be executed on dest chain
 * @dev Triggered automatically by the relayer
 * @param _sourceChain Blockchain where the transaction is originating from
 * @param _sourceAddress Address on src chain where transaction is originating from
 * @param _payload Encoded GMP message sent from src chain
 */
function _execute(
    string calldata _sourceChain,
    string calldata c,
    bytes calldata _payload
) internal override {
    (message) = abi.decode(_payload, (string));
    sourceChain = _sourceChain;
    sourceAddress = _sourceAddress;
}
```

Adding this code means that the `_execute()` function will be triggered automatically. Once the transaction has been received on the destination chain, the contract will have the message as encoded bytes. The function will then:

- Decode the `_payload` and save it to a `message` variable as a string
- save the `_sourceChain` and `_sourceAddress`

### The complete contract code

Check to make sure that your contract code matches the following:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {AxelarExecutable} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol";
import {IAxelarGateway} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol";
import {IAxelarGasService} from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol";

/**
 * @title SendMessage
 * @notice Send a message from chain A to chain B
 */
contract SendMessage is AxelarExecutable {
    string public message;
    string public sourceChain;
    string public sourceAddress;

    IAxelarGasService public immutable gasService;

    /**
     *
     * @param _gateway Address of Axelar Gateway on-chain
     * @param _gasReceiver Address of Axelar Gas Service on-chain
     */
    constructor(
        address _gateway,
        address _gasReceiver
    ) AxelarExecutable(_gateway) {
        gasService = IAxelarGasService(_gasReceiver);
    }

    /**
		 * @notice Send message from chain A to chain B
		 * @dev Message param is passed in as a GMP message
		 * @param destinationChain Name of the dest chain (ex. "Fantom")
		 * @param destinationAddress Address on dest chain the transaction is going to
		 * @param _message Message to be sent
     */
    function setRemoteValue(
        string calldata destinationChain,
        string calldata destinationAddress,
        string calldata _message
    ) external payable {
        require(msg.value > 0, "Gas payment is required");

        bytes memory payload = abi.encode(_message);

        gasService.payNativeGasForContractCall{value: msg.value}(
            address(this),
            destinationChain,
            destinationAddress,
            payload,
            msg.sender
        );
        gateway.callContract(destinationChain, destinationAddress, payload);
    }

     /**
		 * @notice Logic to be executed on dest chain
		 * @dev Triggered automatically by the relayer
		 * @param _sourceChain Blockchain where the transaction is originating from
		 * @param _sourceAddress Address on src chain where transaction is originating from
		 * @param _payload Encoded GMP message sent from src chain
		 */
    function _execute(
        string calldata _sourceChain,
        string calldata _sourceAddress,
        bytes calldata _payload
    ) internal override {
        (message) = abi.decode(_payload, (string));
        sourceChain = _sourceChain;
        sourceAddress = _sourceAddress;
    }
}
```

## Compiling your smart contract

Run the following command to compile the `SendMessage` contract:

```solidity
npx hardhat compile
```

You should be able to compile the code without any errors.

## Setting up an RPC for deployment

Next, set up an RPC for the Base Sepolia and Optimism Sepolia testnets.

### Create an `.env` file

To make sure you’re not accidentally publishing your private key, create a [`.env`](https://blog.bitsrc.io/a-gentle-introduction-to-env-files-9ad424cc5ff4) file to store it in:

```bash
touch .env
```

### Add your private key to `.env` and update `hardhat.config.js`

[Export your private key](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) and add it to the `.env` file you just created:

```bash
PRIVATE_KEY= // Add your account private key here
```

Then, update `hardhat.config.js` with the following code snippet:

```jsx
require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config({ path: '.env' });

const PRIVATE_KEY = process.env.PRIVATE_KEY;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.18',
  networks: {
    base: {
      url: 'https://base-sepolia-rpc.publicnode.com',
      chainId: 84532,
      accounts: [PRIVATE_KEY],
    },
    optimism: {
      url: 'https://optimism-sepolia.blockpi.network/v1/rpc/public',
      chainId: 11155420,
      accounts: [PRIVATE_KEY],
    },
  },
};
```

## Deploying your smart contract

Now that you have successfully created, compiled your contract, and set up RPC for deployment, you will proceed to to deploy the contract in this section.

### Create a deployment script

Create a new file with the name `deploy.js` inside `modules` folder and add the following code:

```jsx
const hre = require('hardhat');

async function main() {
  const sendMessage = await hre.ethers.deployContract('SendMessage', ['', '']);

  await sendMessage.waitForDeployment();

  console.log(`SendMessage contract deployed to: ${await sendMessage.getAddress()}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
```

### Add the Base Sepolia Gateway and Gas Service addresses

To deploy to the Base Sepolia testnet, add the Gateway and Gas Service address specified in the contract constructor. You can find a list of these addresses for all testnets [here](https://docs.axelar.dev/resources/contract-addresses/testnet). Update the script with the following code:

```jsx
const sendMessage = await hre.ethers.deployContract('SendMessage', [
  '0xe432150cce91c13a887f7D836923d5597adD8E31', // Gateway address
  '0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6', // Gas Service address
]);

//..
```

Next, run the command below to deploy:

```jsx
npx hardhat run ignition/modules/deploy.js --network base
```

You should see something similar to the following on your console:

```bash
Compiled 5 Solidity files successfully (evm target: paris).
SendMessage contract deployed to: 0x0Ca3CA4454Ca30432d4E8179d2ad43Cf334552f8
```

This indicates that your contract has been successfully deployed on the Base Sepolia testnet.

### Check the transaction on the Base Sepolia testnet scanner

Check the [Base Sepolia testnet](https://sepolia.basescan.org/) scanner to see it yourself. Here is an [example](https://sepolia.basescan.org/address/0x0Ca3CA4454Ca30432d4E8179d2ad43Cf334552f8).

### Add the Optimism Sepolia Gateway and Gas Service addresses

To deploy to the Optimism Sepolia testnet, add the Gateway and Gas Service addresses specified in the contract constructor. You can find a list of these addresses for all testnets [here](https://docs.axelar.dev/resources/contract-addresses/testnet). Update the script with the following code:

```jsx
const sendMessage = await hre.ethers.deployContract('SendMessage', [
  '0xe432150cce91c13a887f7D836923d5597adD8E31', // Gateway address
  '0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6', // Gas Service address
]);

//..
```

Next, deploy your contract:

```jsx
npx hardhat run ignition/modules/deploy.js --network optimism
```

You should see something similar to the following on your console:

```bash
SendMessage contract deployed to: 0xE7f68096eCE2A240AAe02093cD96D0112dbAF850
```

This indicates that your contract has been successfully deployed on the Optimism Sepolia testnet.

### Check the transaction on the Base Sepolia testnet scanner

Check the [Optimism Sepolia testnet](https://sepolia-optimism.etherscan.io/) scanner to see it yourself. Here is an [example](https://sepolia-optimism.etherscan.io/address/0xE7f68096eCE2A240AAe02093cD96D0112dbAF850).

## Sending a message with your smart contract

To start interacting with your smart contract, create a new file with the name `execute.js` inside the `modules` folder.

### Import Axelarjs SDK and contract address

Inside the `execute.js` file, add the following code to import the required package and the contract addresses you deployed earlier.

```bash
const hre = require("hardhat");
const {
  AxelarQueryAPI,
  Environment,
  EvmChain,
  GasToken,
} = require("@axelar-network/axelarjs-sdk");

const api = new AxelarQueryAPI({ environment: Environment.TESTNET });

const BASE_CONTRACT_ADDRESS = "0x0Ca3CA4454Ca30432d4E8179d2ad43Cf334552f8";
const OPTIMISM_CONTRACT_ADDRESS = "0xE7f68096eCE2A240AAe02093cD96D0112dbAF850";
```

### Estimate gas for multichain call

Multichain interactions require gas, which you can estimate using the AxelarJS SDK with the following code:

```jsx
//...

async function gasEstimator() {
  try {
    const gasFee = await api.estimateGasFee(
      EvmChain.BASE_SEPOLIA,
      EvmChain.OPTIMISM_SEPOLIA,
      GasToken.BASE_SEPOLIA,
      700000,
      1.1,
    );
    return gasFee;
  } catch (error) {
    console.error('Failed to estimate gas:', error);
    // Handle error gracefully
    return null; // Return null as a fallback value
  }
}
```

### Add a `sendMessage()` function

Create a `sendMessage()` function to send messages from the Base Sepolia to the Optimism Sepolia testnet.

```jsx
//...

async function sendMessage() {
  try {
    const SendMessage = await hre.ethers.getContractFactory('SendMessage');
    const baseContract = SendMessage.attach(BASE_CONTRACT_ADDRESS);
    const optimismContract = SendMessage.attach(OPTIMISM_CONTRACT_ADDRESS);

    console.log(`Current message from Optimism Sepolia: '${await optimismContract.message()}'`);

    // Estimate gas fee
    const gasFee = await gasEstimator();
    if (gasFee === null) {
      console.error('Gas estimation failed. Aborting message sending.');
      return;
    }

    // Send message
    const tx = await baseContract.setRemoteValue(
      'optimism-sepolia',
      OPTIMISM_CONTRACT_ADDRESS,
      'Hello World!',
      { value: gasFee },
    );
    await tx.wait();

    console.log(`Message sent with tx hash: ${tx.hash}`);
  } catch (error) {
    console.error('An error occurred during message sending:', error);
  }
}

async function execute() {
  const action = process.env.ACTION;

  if (action === 'send') {
    await sendMessage();
  } else {
    console.error("Invalid action. Use 'send' or 'read'.");
    process.exit(1);
  }
}

execute().then(() => process.exit(0));
```

Run this command to send the message:

```jsx
ACTION=send npx hardhat run ignition/modules/execute.js --network base
```

You should see something similar to the following on your console:

```bash
Current message from Optimism Sepolia: ''
Message sent with tx hash: 0x5491cb5779282011052bb18d5cc3e2926469c520838bdfd82a2659a3401e7bec
```

### Check the transaction on the Axelar testnet scanner

Check the [Axelarscan testnet scanner](https://testnet.axelarscan.io/) to see if you have successfully initiated sending a “Hello World!” message from Base Sepolia to Optimism Sepolia Testnet. It should look something like [this](https://testnet.axelarscan.io/gmp/0x5491cb5779282011052bb18d5cc3e2926469c520838bdfd82a2659a3401e7bec). Make sure that Axelar shows a successful transaction before continuing on to the next step.

## Read your message on the destination chain

You have successfully sent “Hello World!” from Base Sepolia to Optimism Sepolia but let’s check if the message have been received in the destination chain.

:::info

The Base Sepolia testnet typically takes about 28 minutes to reach finality. Therefore, you will see something similar when you check the transaction on the Axelarscan testnet. You can find a list of the finality times for all chains [here](https://axelarscan.io/interchain).

:::

### Add a `readMessage()` function

Once you confirm that the transaction was successfully executed in the previous step without errors, you can proceed to read the message on the destination chain. Do this by adding the following code to the `execute.js` script:

```jsx
//...

async function readMessage() {
  try {
    const SendMessage = await hre.ethers.getContractFactory('SendMessage');
    const sendMessageFromOptimism = SendMessage.attach(OPTIMISM_CONTRACT_ADDRESS);

    const message = await sendMessageFromOptimism.message();
    console.log(`Message from Optimism Sepolia: '${message}'`);
  } catch (error) {
    console.error('An error occurred during message reading:', error);
  }
}
```

Update the `execute()` function:

```jsx
//...

async function execute() {
  const action = process.env.ACTION;

  if (action === 'send') {
    await sendMessage();
  } else if (action === 'read') {
    await readMessage();
  } else {
    console.error("Invalid action. Use 'send' or 'read'.");
    process.exit(1);
  }
}
```

Next, run this command to send a message:

```jsx
ACTION=read npx hardhat run ignition/modules/execute.js --network optimism
```

You should see something similar to the following on your console:

```bash
Message from Optimism Sepolia: 'Hello World!'
```

## Conclusion and references

Congratulations! You've successfully navigated through the process of sending messages from one blockchain to another using Axelar. You've learned about setting up your environment, writing smart contracts, deploying them on Base Sepolia and Optimism Sepolia test networks, and interacting with them.

If you’d like to go further, check out the following:

- [Base cross-chain documentation](https://docs.base.org/tools/cross-chain)
- [Axelar developer documentation](https://docs.axelar.dev/)
- [AxelarJS SDK GitHub repository](https://github.com/axelarnetwork/axelarjs-sdk)
- [Axelar General Message Passing (GMP) documentation](https://docs.axelar.dev/dev/general-message-passing/overview)
