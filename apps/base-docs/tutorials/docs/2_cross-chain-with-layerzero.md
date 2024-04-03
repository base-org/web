---
title: Sending messages from Base to other chains using LayerZero V2
slug: /cross-chain-with-layerzero
description: A tutorial that teaches how to use LayerZero V2 to perform cross-chain messaging from Base Goerli testnet to Optimism Goerli testnet.
author: taycaldwell
eywords:
  [
    Cross-chain,
    Omni-chain,
    Crosschain,
    OmniChain,
    LayerZero,
    LayerZero V2,
    lz,
    cross-chain messaging,
    transfer tokens across chains,
  ]
displayed_sidebar: null
---

# Sending messages from Base to other chains using LayerZero V2

This tutorial will guide you through the process of sending cross-chain message data from a Base smart contract to another smart contract on a different chain using LayerZero V2.

---

## Objectives

By the end of this tutorial you should be able to do the following:

- Set up a smart contract project for Base using Foundry
- Install the LayerZero smart contracts as a dependency
- Use LayerZero to send messages and from smart contracts on Base to smart contracts on different chains
- Deploy and test your smart contracts on Base testnet

---

## Prerequisites

### Foundry

This tutorial requires you to have Foundry installed.

- From the command-line (terminal), run: `curl -L https://foundry.paradigm.xyz | bash`
- Then run `foundryup`, to install the latest (nightly) build of Foundry

For more information, see the Foundry Book [installation guide](https://book.getfoundry.sh/getting-started/installation).

### Coinbase Wallet

In order to deploy a smart contract, you will first need a wallet. You can create a wallet by downloading the Coinbase Wallet browser extension.

- Download [Coinbase Wallet](https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad?hl=en)

### Wallet funds

To complete this tutorial, you will need to fund a wallet with ETH on Base Goerli and Optimism Goerli.

The ETH is required for covering gas fees associated with deploying smart contracts to each network.

- To fund your wallet with ETH on Base Goerli, visit a faucet listed on the [Base Faucets](https://docs.base.org/tools/network-faucets) page.
- To fund your wallet with ETH on Optimism Goerli, visit a faucet listed on the [Optimism Faucets](https://docs.optimism.io/builders/tools/faucets) page.

---

## What is LayerZero?

LayerZero is an interoperability protocol that allows developers to build applications (and tokens) that can connect to multiple blockchains. LayerZero defines these types of applications as "omnichain" applications.

The LayerZero protocol is made up of immutable on-chain [Endpoints](https://docs.layerzero.network/explore/layerzero-endpoint), a configurable [Security Stack](https://docs.layerzero.network/explore/decentralized-verifier-networks), and a permissionless set of [Executors](https://docs.layerzero.network/explore/executors) that transfer messages between chains.

### High-level concepts

#### Endpoints

Endpoints are immutable LayerZero smart contracts that implement a standardized interface for your own smart contracts to use and in order to manage security configurations and send and receive messages.

#### Security Stack (DVNs)

The [Security Stack](https://docs.layerzero.network/explore/decentralized-verifier-networks) is a configurable set of required and optional Decentralized Verifier Networks (DVNs). The DVNs are used to verify message payloads to ensure integrity of your application's messages.

#### Executors

[Executors](https://docs.layerzero.network/explore/executors) are responsible for initiating message delivery. They will automatically execute the `lzReceive` function of the endpoint on the destination chain once a message has been verified by the Security Stack.

---

## Creating a project

Before you begin, you need to set up your smart contract development environment by creating a Foundry project.

To create a new Foundry project, first create a new directory:

```bash
mkdir myproject
```

Then run:

```bash
cd myproject
forge init
```

This will create a Foundry project with the following basic layout:

```bash
.
├── foundry.toml
├── script
├── src
└── test
```

:::info

You can delete the `src/Counter.sol`, `test/Counter.t.sol`, and `script/Counter.s.sol` boilerplate files that were generated with the project, as you will not be needing them.

:::

---

## Installing the LayerZero smart contracts

To use LayerZero within your Foundry project, you need to install the LayerZero smart contracts and their dependencies using `forge install`.

To install LayerZero smart contracts and their dependencies, run the following commands:

```bash
forge install GNSPS/solidity-bytes-utils --no-commit
forge install OpenZeppelin/openzeppelin-contracts@v4.9.4 --no-commit
forge install LayerZero-Labs/LayerZero-v2 --no-commit
```

Once installed, update your `foundry.toml` file by appending the following lines:

```bash
remappings = [
    '@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts',
    'solidity-bytes-utils/=lib/solidity-bytes-utils',
    '@layerzerolabs/lz-evm-oapp-v2/=lib/LayerZero-v2/oapp',
    '@layerzerolabs/lz-evm-protocol-v2/=lib/LayerZero-v2/protocol',
    '@layerzerolabs/lz-evm-messagelib-v2/=lib/LayerZero-v2/messagelib',
]

```

---

## Getting started with LayerZero

LayerZero provides a smart contract standard called [OApp](https://docs.layerzero.network/contracts/oapp) that is intended for omnichain messaging and configuration.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { OAppSender } from "./OAppSender.sol";
import { OAppReceiver, Origin } from "./OAppReceiver.sol";
import { OAppCore } from "./OAppCore.sol";

abstract contract OApp is OAppSender, OAppReceiver {
   constructor(address _endpoint) OAppCore(_endpoint, msg.sender) {}

   function oAppVersion() public pure virtual returns (uint64 senderVersion, uint64 receiverVersion) {
       senderVersion = SENDER_VERSION;
       receiverVersion = RECEIVER_VERSION;
   }
}
```

:::info

You can view the source code for this contract on [GitHub](https://github.com/LayerZero-Labs/LayerZero-v2/blob/main/oapp/contracts/oapp/OApp.sol).

:::

To get started using LayerZero, developers simply need to inherit from the [OApp](https://github.com/LayerZero-Labs/LayerZero-v2/blob/main/oapp/contracts/oapp/OApp.sol) contract, and implement the following two inherited functions:

- `_lzSend`: A function used to send an omnichain message
- `_lzReceive`: A function used to receive an omnichain message

In this tutorial, you will be implementing the [OApp](https://docs.layerzero.network/contracts/oapp) standard into your own project to add the capability to send messages from a smart contract on Base to a smart contract on Optimism.

:::info

An extension of the [OApp](https://docs.layerzero.network/contracts/oapp) contract standard known as [OFT](https://docs.layerzero.network/contracts/oft) is also available for supporting omnichain fungible token transfers.

:::

:::info

For more information on transferring tokens across chains using LayerZero, visit the [LayerZero documentation](https://docs.layerzero.network/contracts/oft).

:::

---

## Writing the smart contract

To get started, create a new Solidity smart contract file in your project's `src/` directory named `ExampleContract.sol`, and add the following content:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { OApp, Origin, MessagingFee } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oapp/OApp.sol";

contract ExampleContract is OApp {
   constructor(address _endpoint, address _owner) OApp(_endpoint, _owner) {}
}
```

The code snippet above defines a new smart contract named `ExampleContract` that extends the `OApp` contract standard.

The contract's constructor expects two arguments:

- `_endpoint`: The [LayerZero Endpoint](https://docs.layerzero.network/explore/layerzero-endpoint) `address` for the chain the smart contract is deployed to.
- `_owner`: The `address` of the owner of the smart contract.

:::info

[LayerZero Endpoints](https://docs.layerzero.network/explore/layerzero-endpoint) are smart contracts that expose an interface for OApp contracts to manage security configurations and send and receive messages via the LayerZero protocol.

:::

### Implementing message sending (`_lzSend`)

To send messages to another chain, your smart contract must call the `_lzSend` function inherited from the [OApp](https://docs.layerzero.network/contracts/oapp) contract.

Add a new custom function named `sendMessage` to your smart contract that has the following content:

```solidity
/// @notice Sends a message from the source chain to the destination chain.
/// @param _dstEid The endpoint ID of the destination chain.
/// @param _message The message to be sent.
/// @param _options The message execution options (e.g. gas to use on destination).
function sendMessage(uint32 _dstEid, string memory _message, bytes calldata _options) external payable {
   bytes memory _payload = abi.encode(_message); // Encode the message as bytes
   _lzSend(
       _dstEid,
       _payload,
       _options,
       MessagingFee(msg.value, 0), // Fee for the message (nativeFee, lzTokenFee)
       payable(msg.sender) // The refund address in case the send call reverts
   );
}
```

The `sendMessage` function above calls the inherited `_lzSend` function, while passing in the following expected data:

| Name             | Type                                                                                                                                                                      | Description                                                                                                                                                      |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_dstEid`        | `uint32`                                                                                                                                                                  | The [endpoint ID](https://docs.layerzero.network/contracts/endpoint-addresses) of the destination chain to send the message to.                                  |
| `_payload`       | `bytes`                                                                                                                                                                   | The message (encoded) to send.                                                                                                                                   |
| `_options`       | `bytes`                                                                                                                                                                   | [Additional options](https://docs.layerzero.network/contracts/options) when sending the message, such as how much gas should be used when receiving the message. |
| `_fee`           | [`MessagingFee`](https://github.com/LayerZero-Labs/LayerZero-v2/blob/c3213200dfe8fabbf7d92c685590d34e6e70da43/protocol/contracts/interfaces/ILayerZeroEndpointV2.sol#L24) | The calculated fee for sending the message.                                                                                                                      |
| `_refundAddress` | `address`                                                                                                                                                                 | The `address` that will receive any excess fee values sent to the endpoint in case the `_lzSend` execution reverts.                                              |

### Implementing gas fee estimation (`_quote`)

As shown in the table provided in the last section, the `_lzSend` function expects an estimated gas [fee](https://github.com/LayerZero-Labs/LayerZero-v2/blob/c3213200dfe8fabbf7d92c685590d34e6e70da43/protocol/contracts/interfaces/ILayerZeroEndpointV2.sol#L24) to be provided when sending a message (`_fee`).

Therefore, sending a message using the `sendMessage` function of your contract, you first need to estimate the associated gas fees.

There are multiple fees incurred when sending a message across chains using LayerZero, including: paying for gas on the source chain, fees paid to DVNs validating the message, and gas on the destination chain. Luckily, LayerZero bundles all of these fees together into a single fee to be paid by the `msg.sender`, and LayerZero Endpoints expose a `_quote` function to estimate this fee.

Add a new function to your `ExampleContract` contract called `estimateFee` that calls the `_quote` function, as shown below:

```solidity
/// @notice Estimates the gas associated with sending a message.
/// @param _dstEid The endpoint ID of the destination chain.
/// @param _message The message to be sent.
/// @param _options The message execution options (e.g. gas to use on destination).
/// @return nativeFee Estimated gas fee in native gas.
/// @return lzTokenFee Estimated gas fee in ZRO token.
function estimateFee(
   uint32 _dstEid,
   string memory _message,
   bytes calldata _options
) public view returns (uint256 nativeFee, uint256 lzTokenFee) {
   bytes memory _payload = abi.encode(_message);
   MessagingFee memory fee = _quote(_dstEid, _payload, _options, false);
   return (fee.nativeFee, fee.lzTokenFee);
}
```

The `estimateFee` function above calls the inherited `_quote` function, while passing in the following expected data:

| Name            | Type     | Description                                                                                                                                                      |
| :-------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `_dstEid`       | `uint32` | The [endpoint ID](https://docs.layerzero.network/contracts/endpoint-addresses) of the destination chain the message will be sent to.                             |
| `_payload`      | `bytes`  | The message (encoded) that will be sent.                                                                                                                         |
| `_options`      | `bytes`  | [Additional options](https://docs.layerzero.network/contracts/options) when sending the message, such as how much gas should be used when receiving the message. |
| `_payInLzToken` | `bool`   | Boolean flag for which token to use when returning the fee (native or ZRO token).                                                                                |

:::info

Your contract’s `estimateFee` function should always be called immediately before calling `sendMessage` to accurately estimate associated gas fees.

:::

### Implementing message receiving (`_lzReceive`)

To receive messages on the destination chain, your smart contract must override the `_lzReceive` function inherited from the [OApp](https://docs.layerzero.network/contracts/oapp) contract.

Add the following code snippet to your `ExampleContract` contract to override the `_lzReceive` function:

```solidity
/// @notice Entry point for receiving messages.
/// @param _origin The origin information containing the source endpoint and sender address.
///  - srcEid: The source chain endpoint ID.
///  - sender: The sender address on the src chain.
///  - nonce: The nonce of the message.
/// @param _guid The unique identifier for the received LayerZero message.
/// @param _message The payload of the received message.
/// @param _executor The address of the executor for the received message.
/// @param _extraData Additional arbitrary data provided by the corresponding executor.
function _lzReceive(
   Origin calldata _origin,
   bytes32 _guid,
   bytes calldata payload,
   address _executor,
   bytes calldata _extraData
   ) internal override {
       data = abi.decode(payload, (string));
       // other logic
}
```

The overridden `_lzReceive` function receives the following arguments when receiving a message:

| Name          | Type      | Description                                                                                                           |
| :------------ | :-------- | :-------------------------------------------------------------------------------------------------------------------- |
| `_origin`     | `Origin`  | The origin information containing the source endpoint and sender address.                                             |
| `_guid`       | `bytes32` | The unique identifier for the received LayerZero message.                                                             |
| `payload`     | `bytes`   | The payload of the received message (encoded).                                                                        |
| `_executor`   | `address` | The `address` of the [Executor](https://docs.layerzero.network/explore/executors) for the received message.           |
| `_extraData ` | `bytes`   | Additional arbitrary data provided by the corresponding [Executor](https://docs.layerzero.network/explore/executors). |

Note that the overridden method decodes the message payload, and stores the string into a variable named `data` that you can read from later to fetch the latest message.

Add the `data` field as a member variable to your contract:

```solidity
contract ExampleContract is OApp {

    // highlight-next-line
    string public data;

    constructor(address _endpoint) OApp(_endpoint, msg.sender) {}
}
```

:::info

Overriding the `_lzReceive` function allows you to provide any custom logic you wish when receiving messages, including making a call back to the source chain by invoking `_lzSend`. Visit the LayerZero [Message Design Patterns](https://docs.layerzero.network/contracts/message-design-patterns) for common messaging flows.

:::

### Final code

Once you complete all of the steps above, your contract should look like this:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import { OApp, Origin, MessagingFee } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oapp/OApp.sol";

contract ExampleContract is OApp {

 string public data;

  constructor(address _endpoint) OApp(_endpoint, msg.sender) {}

  /// @notice Sends a message from the source chain to the destination chain.
  /// @param _dstEid The endpoint ID of the destination chain.
  /// @param _message The message to be sent.
  /// @param _options The message execution options (e.g. gas to use on destination).
  function sendMessage(uint32 _dstEid, string memory _message, bytes calldata _options) external payable {
     bytes memory _payload = abi.encode(_message); // Encode the message as bytes
     _lzSend(
           _dstEid,
           _payload,
           _options,
           MessagingFee(msg.value, 0), // Fee for the message (nativeFee, lzTokenFee)
           payable(msg.sender) // The refund address in case the send call reverts
     );
  }

  /// @notice Estimates the gas associated with sending a message.
  /// @param _dstEid The endpoint ID of the destination chain.
  /// @param _message The message to be sent.
  /// @param _options The message execution options (e.g. gas to use on destination).
  /// @return nativeFee Estimated gas fee in native gas.
  /// @return lzTokenFee Estimated gas fee in ZRO token.
  function estimateFee(
     uint32 _dstEid,
     string memory _message,
     bytes calldata _options
  ) public view returns (uint256 nativeFee, uint256 lzTokenFee) {
     bytes memory _payload = abi.encode(_message);
     MessagingFee memory fee = _quote(_dstEid, _payload, _options, false);
     return (fee.nativeFee, fee.lzTokenFee);
  }

  /// @notice Entry point for receiving messages.
  /// @param _origin The origin information containing the source endpoint and sender address.
  ///  - srcEid: The source chain endpoint ID.
  ///  - sender: The sender address on the src chain.
  ///  - nonce: The nonce of the message.
  /// @param _guid The unique identifier for the received LayerZero message.
  /// @param _message The payload of the received message.
  /// @param _executor The address of the executor for the received message.
  /// @param _extraData Additional arbitrary data provided by the corresponding executor.
  function _lzReceive(
     Origin calldata _origin,
     bytes32 _guid,
     bytes calldata payload,
     address _executor,
     bytes calldata _extraData
     ) internal override {
        data = abi.decode(payload, (string));
  }
}
```

---

## Compiling the smart contract

Compile the smart contract to ensure it builds without any errors.

To compile your smart contract, run:

```bash
forge build
```

---

## Deploying the smart contract

### Setting up your wallet as the deployer

Before you can deploy your smart contract to various chains you will need to set up a wallet to be used as the deployer.

To do so, you can use the [`cast wallet import`](https://book.getfoundry.sh/reference/cast/cast-wallet-import) command to import the private key of the wallet into Foundry's securely encrypted keystore:

```bash
cast wallet import deployer --interactive
```

After running the command above, you will be prompted to enter your private key, as well as a password for signing transactions.

:::caution

For instructions on how to get your private key from Coinbase Wallet, visit the [Coinbase Wallet documentation](https://docs.cloud.coinbase.com/wallet-sdk/docs/developer-settings#show-private-key). **It is critical that you do NOT commit this to a public repo**.

:::

To confirm that the wallet was imported as the `deployer` account in your Foundry project, run:

```bash
cast wallet list
```

### Setting up environment variables

To setup your environment, create an `.env` file in the home directory of your project, and add the RPC URLs and [LayerZero Endpoint](https://docs.layerzero.network/contracts/endpoint-addresses) information for both Base Goerli and Optimism Goerli testnets:

```bash
BASE_GOERLI_RPC="https://goerli.base.org"
BASE_GOERLI_LZ_ENDPOINT=0x464570adA09869d8741132183721B4f0769a0287
BASE_GOERLI_LZ_ENDPOINT_ID=40184

OPTIMISM_GOERLI_RPC="https://goerli.optimism.io"
OPTIMISM_GOERLI_LZ_ENDPOINT=0x464570adA09869d8741132183721B4f0769a0287
OPTIMISM_GOERLI_LZ_ENDPOINT_ID=40132
```

Once the `.env` file has been created, run the following command to load the environment variables in the current command line session:

```
source .env
```

With your contract compiled and environment setup, you are now ready to deploy the smart contract to different networks.

### Deploying the smart contract to Base Goerli

To deploy a smart contract using Foundry, you can use the `forge create` command. The command requires you to specify the smart contract you want to deploy, an RPC URL of the network you want to deploy to, and the account you want to deploy with.

:::info

Your wallet must be funded with ETH on the Base Goerli and Optimism Goerli to cover the gas fees associated with the smart contract deployment. Otherwise, the deployment will fail.

To get testnet ETH, see the [prerequisites](#prerequisites).

:::

To deploy the `ExampleContract` smart contract to the Base Goerli testnet, run the following command:

```bash
forge create ./src/ExampleContract.sol:ExampleContract --rpc-url $BASE_GOERLI_RPC --constructor-args $BASE_GOERLI_LZ_ENDPOINT --account deployer
```

When prompted, enter the password that you set earlier, when you imported your wallet's private key.

After running the command above, the contract will be deployed on the Base Goerli test network. You can view the deployment status and contract by using a [block explorer](/tools/block-explorers).

### Deploying the smart contract to Optimism Goerli

To deploy the `ExampleContract` smart contract to the Optimism Goerli testnet, run the following command:

```bash
forge create ./src/ExampleContract.sol:ExampleContract --rpc-url $OPTIMISM_GOERLI_RPC --constructor-args $OPTIMISM_GOERLI_LZ_ENDPOINT --account deployer
```

When prompted, enter the password that you set earlier, when you imported your wallet's private key.

After running the command above, the contract will be deployed on the Optimism Goerli test network. You can view the deployment status and contract by using the [OP Goerli block explorer](https://goerli-optimism.etherscan.io/).

## Opening the messaging channels

Once your contract has been deployed to Base Goerli and Optimism Goerli, you will need to open the messaging channels between the two contracts so that they can send and receive messages from one another. This is done by calling the `setPeer` function on the contract.

The `setPeer` function expects the following arguments:

| Name    | Type      | Description                                                                                              |
| :------ | :-------- | :------------------------------------------------------------------------------------------------------- |
| `_eid`  | `uint32`  | The [endpoint ID](https://docs.layerzero.network/contracts/endpoint-addresses) of the destination chain. |
| `_peer` | `bytes32` | The contract address of the OApp contract on the destination chain.                                      |

### Setting the peers

Foundry provides the `cast` command-line tool that can be used to interact with deployed smart contracts and call their functions.

To set the peer of your `ExampleContract` contracts, you can use `cast` to call the `setPeer` function while providing the [endpoint ID](https://docs.layerzero.network/contracts/endpoint-addresses) and address (in bytes) of the deployed contract on the respective destination chain.

To set the peer of the Base Goerli contract to the Optimism Goerli contract, run the following command:

```bash
cast send <BASE_GOERLI_CONTRACT_ADDRESS> --rpc-url $BASE_GOERLI_RPC "setPeer(uint32, bytes32)" $OPTIMISM_GOERLI_LZ_ENDPOINT_ID <OPTIMISM_GOERLI_CONTRACT_ADDRESS> --account deployer
```

:::info

Replace `<BASE_GOERLI_CONTRACT_ADDRESS>` with the contract address of your deployed `ExampleContract` contract on Base Goerli, and`<OPTIMISM_GOERLI_CONTRACT_ADDRESS>` with the contract address (as bytes) of your deployed `ExampleContract` contract on Optimism Goerli before running the provided `cast` command.

:::

To set the peer of the Optimism Goerli contract to the Base Goerli contract, run the following command:

```bash
cast send <OPTIMISM_GOERLI_CONTRACT_ADDRESS> --rpc-url $OPTIMISM_GOERLI_RPC "setPeer(uint32, bytes32)" $BASE_GOERLI_LZ_ENDPOINT_ID <BASE_GOERLI_CONTRACT_ADDRESS> --account deployer
```

:::info

Replace `<OPTIMISM_GOERLI_CONTRACT_ADDRESS>` with the contract address of your deployed `ExampleContract` contract on Optimism Goerli, and`<BASE_GOERLI_CONTRACT_ADDRESS>` with the contract address (as bytes) of your deployed `ExampleContract` contract on Base Goerli before running the provided `cast` command.

:::

---

## Sending messages

Once peers have been set on each contract, they are now able to send and receive messages from one another.

Sending a message using the newly created `ExampleContract` contract can be done in three steps:

1. Build [message options](https://docs.layerzero.network/contracts/options) to specify logic associated with the message transaction
2. Call the `estimateFee` function to estimate the gas fee for sending a message
3. Call the `sendMessage` function to send a message

### Building message options

The `estimateFee` and `sendMessage` custom functions of the `ExampleContract` contract both require a [message options](https://docs.layerzero.network/contracts/options) (`_options`) argument to be provided.

Message options allow you to specify arbitrary logic as part of the message transaction, such as the gas amount the [Executor](https://docs.layerzero.network/explore/executors) pays for message delivery, the order of message execution, or dropping an amount of gas to a destination address.

LayerZero provides a [Solidity](https://github.com/LayerZero-Labs/LayerZero-v2/blob/ccfd0d38f83ca8103b14ab9ca77f32e0419510ff/oapp/contracts/oapp/libs/OptionsBuilder.sol#L12) library and [TypeScript SDK](https://docs.layerzero.network/contracts/options) for building these message options.

As an example, below is a Foundry script that uses OptionsBuilder from the Solidity library to generate message options (as `bytes`) that set the gas amount that the Executor will pay upon message delivery to `200000` wei:

```solidity
pragma solidity ^0.8.0;

import {Script, console2} from "forge-std/Script.sol";
import { OptionsBuilder } from "@layerzerolabs/lz-evm-oapp-v2/contracts/oapp/libs/OptionsBuilder.sol";

contract OptionsScript is Script {
    using OptionsBuilder for bytes;

    function setUp() public {}

    function run() public {
        bytes memory options = OptionsBuilder.newOptions().addExecutorLzReceiveOption(200000, 0);
        console2.logBytes(options);
    }
}
```

The output of this script results in:

```bash
0x00030100110100000000000000000000000000030d40
```

For this tutorial, rather than building and generating your own message options, you can use the bytes output provided above.

:::info

Covering all of the different message options in detail is out of scope for this tutorial. If you are interested in learning more about the different message options and how to build them, visit the [LayerZero developer documentation](https://docs.layerzero.network/contracts/options).

:::

### Estimating the gas fee

Before you can send a message from your contract on Base Goerli, you need to estimate the fee associated with sending the message. You can use the `cast` command to call the `estimateFee()` function of the `ExampleContract` contract.

To estimate the gas fee for sending a message from Base Goerli to Optimism Goerli, run the following command:

```bash
cast send <BASE_GOERLI_CONTRACT_ADDRESS> --rpc-url $BASE_GOERLI_RPC "estimateFee(uint32, string, bytes)" $OPTIMISM_GOERLI_LZ_ENDPOINT_ID "Hello World" 0x00030100110100000000000000000000000000030d40 --account deployer
```

:::info

Replace `<BASE_GOERLI_CONTRACT_ADDRESS>` with the contract address of your deployed `ExampleContract` contract on Base Goerli before running the provided `cast` command.

:::

The command above calls `estimateFee(uint32, string, bytes, bool)`, while providing the required arguments, including: the endpoint ID of the destination chain, the text to send, and the message options (generated in the last section).

### Sending the message

Once you have fetched the estimated gas for sending your message, you can now call `sendMessage` and provide the value returned as the `msg.value`.

For example, to send a message from Base Goerli to Optimism Goerli with an estimated gas fee, run the following command:

```bash
cast send <BASE_GOERLI_CONTRACT_ADDRESS> --rpc-url $BASE_GOERLI_RPC --value <GAS_ESTIMATE_IN_WEI> "sendMessage(uint32, string, bytes)" $OPTIMISM_GOERLI_LZ_ENDPOINT_ID "Hello World" 0x00030100110100000000000000000000000000030d40 --account deployer
```

:::info

Replace `<BASE_GOERLI_CONTRACT_ADDRESS>` with the contract address of your deployed `ExampleContract` contract on Base Goerli, and `<GAS_ESTIMATE_IN_WEI>` with the gas estimate (in wei) returned by the call to estimateFee, before running the provided `cast` command.

:::

You can view the status of your cross-chain transaction on [LayerZero Scan](https://layerzeroscan.com/).

### Receiving the message

Once the message has been sent and received on the destination chain, the \_Receive function will be called on the `ExampleContract` and the message payload will be stored in the contract's public `data` variable.

You can use the `cast` command to read the latest message received by the `ExampleContract` stored in the `data` variable.

To read the latest received message data that was sent to Optimism Goerli from Base Goerli, run the following command:

```bash
cast send <OPTIMISM_GOERLI_CONTRACT_ADDRESS> --rpc-url $OPTIMISM_GOERLI_RPC "data" --account deployer
```

The returned data should match the message text payload you sent in your message.

You can view the status of your cross-chain transaction on [LayerZero Scan](https://layerzeroscan.com/).

---

## Conclusion

Congratulations! You have successfully learned how to perform cross-chain messaging between Base and other chains (i.e. Optimism) using LayerZero V2.

To learn more about cross-chain messaging and LayerZero V2, check out the following resources:

- [Cross-chain](https://docs.base.org/tools/cross-chain)
- [LayerZero V2](https://docs.layerzero.network)

---
