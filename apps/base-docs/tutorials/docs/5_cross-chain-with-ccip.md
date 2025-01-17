---
title: Sending messages and tokens from Base to other chains using Chainlink CCIP
slug: /cross-chain-with-ccip
description: A tutorial that teaches how to use Chainlink CCIP to perform cross-chain messaging and token transfers from Base Goerli testnet to Optimism Goerli testnet.
author: taycaldwell
keywords:
  [
    Cross-chain,
    Omni-chain,
    Crosschain,
    OmniChain,
    Chainlink,
    Chainlink CCIP,
    CCIP,
    cross-chain messaging,
    transfer tokens across chains,
  ]
tags: ['cross-chain']
difficulty: intermediate
displayed_sidebar: null
---

This tutorial will guide you through the process of sending messages and tokens from a Base smart contract to another smart contract on a different chain using Chainlink's Cross-chain Interoperability Protocol (CCIP).

---

## Objectives

By the end of this tutorial you should be able to do the following:

- Set up a smart contract project for Base using Foundry
- Install Chainlink CCIP as a dependency
- Use Chainlink CCIP within your smart contract to send messages and/or tokens to contracts on other different chains
- Deploy and test your smart contracts on Base testnet

:::info

Chainlink CCIP is in an “Early Access” development stage, meaning some of the functionality described within this tutorial is under development and may change in later versions.

:::

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

For this tutorial you will need to fund your wallet with both ETH and LINK on Base Goerli and Optimism Goerli.

The ETH is required for covering gas fees associated with deploying smart contracts to the blockchain, and the LINK token is required to pay for associated fees when using CCIP.

- To fund your wallet with ETH on Base Goerli, visit a faucet listed on the [Base Faucets](https://docs.base.org/tools/network-faucets) page.
- To fund your wallet with ETH on Optimism Goerli, visit a faucet listed on the [Optimism Faucets](https://docs.optimism.io/builders/tools/faucets) page.
- To fund your wallet with LINK, visit the [Chainlink Faucet](https://faucets.chain.link/base-sepolia).

:::info

If you are interested in building on Mainnet, you will need to [apply for Chainlink CCIP mainnet access](https://chainlinkcommunity.typeform.com/ccip-form?#ref_id=ccip_docs).

:::

---

## What is Chainlink CCIP?

Chainlink CCIP (Cross-chain Interoperability Protocol) provides a solution for sending message data and transferring tokens across different chains.

The primary way for users to interface with Chainlink CCIP is through smart contracts known as [Routers](https://docs.chain.link/ccip/architecture#router). A Router contract is responsible for initiating cross-chain interactions.

Users can interact with [Routers](https://docs.chain.link/ccip/architecture#router) to perform the following cross-chain capabilities:

| Capability                   | Description                                                                                  | Supported receivers     |
| :--------------------------- | :------------------------------------------------------------------------------------------- | :---------------------- |
| Arbitrary messaging          | Send arbitrary (encoded) data from one chain to another.                                     | Smart contracts only    |
| Token transfers              | Send tokens from one chain to another.                                                       | Smart contracts or EOAs |
| Programmable token transfers | Send tokens and arbitrary (encoded) data from one chain to another, in a single transaction. | Smart contracts only    |

:::danger

Externally owned accounts (EOAs) on EVM blockchains are unable to receive message data, because of this, only smart contracts are supported as receivers when sending arbitrary messages or programmable token transfers. Any attempt to send a programmable token transfer (data and tokens) to an EOA, will result in only the tokens being received.

:::

### High-level concepts

Although [Routers](https://docs.chain.link/ccip/architecture#router) are the primary interface users will interact with when using CCIP, this section will cover what happens after instructions for a cross-chain interaction are sent to a Router.

#### OnRamps

Once a Router receives an instruction for a cross-chain interaction, it passes it on to another contract known as an [OnRamp](https://docs.chain.link/ccip/architecture#onramp). OnRamps are responsible for a variety of tasks, including: verifying message size and gas limits, preserving the sequencing of messages, managing any fee payments, and interacting with the [token pool](https://docs.chain.link/ccip/architecture#token-pools) to `lock` or `burn` tokens if a token transfer is being made.

#### OffRamps

The destination chain will have a contract known as an [OffRamp](https://docs.chain.link/ccip/architecture#offramp). OffRamps are responsible for a variety of tasks, including: ensuring the authenticity of a message, making sure each transaction is only executed once, and transmitting received messages to the Router contract on the destination chain.

#### Token pools

A [token pool](https://docs.chain.link/ccip/architecture#token-pools) is an abstraction layer over ERC-20 tokens that facilitates OnRamp and OffRamp token-related operations. They are configured to use either a `Lock and Unlock` or `Burn and Mint` mechanism, depending on the type of token.

For example, because blockchain-native gas tokens (i.e. ETH, MATIC, AVAX) can only be minted on their native chains, a `Lock and Mint` mechanism must be used. This mechanism locks the token at the source chain, and mints a synthetic asset on the destination chain.

In contrast, tokens that can be minted on multiple chains (i.e. USDC, USDT, FRAX, etc.), token pools can use a `Burn and Mint` mechanism, where the token is burnt on the source chain and minted on the destination chain.

#### Risk Management Network

Between instructions for a cross-chain interaction making its way from an OnRamp on the source chain to an OffRamp on the destination chain, it will pass through the [Risk Management Network](https://docs.chain.link/ccip/concepts#risk-management-network).

The Risk Management Network is a secondary validation service built using a variety of offchain and onchain components, with the responsibilities of monitoring all chains against abnormal activities.

:::info

A deep-dive on the technical details of each of these components is too much to cover in this tutorial, but if interested you can learn more by visiting the [Chainlink documentation](https://docs.chain.link/ccip/architecture).

:::

---

## Creating a project

Before you begin, you need to set up your smart contract development environment. You can setup a development environment using tools like [Hardhat](/docs/tools/hardhat) or [Foundry](/docs/tools/foundry). For this tutorial you will use Foundry.

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

## Installing Chainlink smart contracts

To use Chainlink CCIP within your Foundry project, you need to install Chainlink CCIP smart contracts as a project dependency using `forge install`.

To install Chainlink CCIP smart contracts, run:

```bash
forge install smartcontractkit/ccip --no-commit
```

Once installed, update your `foundry.toml` file by appending the following line:

```bash
remappings = ['@chainlink/contracts-ccip/=lib/ccip/contracts']
```

---

## Writing the smart contracts

The most basic use case for Chainlink CCIP is to send data and/or tokens between smart contracts on different blockchains.

To accomplish this, in this tutorial, you will need to create two separate smart contracts:

- `Sender` contract: A smart contract that interacts with CCIP to send data and tokens.
- `Receiver` contract: A smart contract that interacts with CCIP to receive data and tokens.

### Creating a Sender contract

The code snippet below is for a basic smart contract that uses CCIP to send data:

```solidity
pragma solidity ^0.8.0;

import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {OwnerIsCreator} from "@chainlink/contracts-ccip/src/v0.8/shared/access/OwnerIsCreator.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {IERC20} from "@chainlink/contracts-ccip/src/v0.8/vendor/openzeppelin-solidity/v4.8.3/contracts/token/ERC20/IERC20.sol";

contract Sender is OwnerIsCreator {

   IRouterClient private router;
   IERC20 private linkToken;

   /// @notice Initializes the contract with the router and LINK token address.
   /// @param _router The address of the router contract.
   /// @param _link The address of the link contract.
   constructor(address _router, address _link) {
       router = IRouterClient(_router);
       linkToken = IERC20(_link);
   }

   /// @notice Sends data to receiver on the destination chain.
   /// @param destinationChainSelector The identifier (aka selector) for the destination blockchain.
   /// @param receiver The address of the recipient on the destination blockchain.
   /// @param text The string text to be sent.
   /// @return messageId The ID of the message that was sent.
   function sendMessage(
       uint64 destinationChainSelector,
       address receiver,
       string calldata text
   ) external onlyOwner returns (bytes32 messageId) {
       Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
           receiver: abi.encode(receiver), // Encode receiver address
           data: abi.encode(text), // Encode text to send
           tokenAmounts: new Client.EVMTokenAmount[](0), // Empty array indicating no tokens are being sent
           extraArgs: Client._argsToBytes(
               Client.EVMExtraArgsV1({gasLimit: 200_000}) // Set gas limit
           ),
           feeToken: address(linkToken) // Set the LINK as the feeToken address
       });

       // Get the fee required to send the message
       uint256 fees = router.getFee(
           destinationChainSelector,
           message
       );

       // Revert if contract does not have enough LINK tokens for sending a message
       require(linkToken.balanceOf(address(this)) > fees, "Not enough LINK balance");

       // Approve the Router to transfer LINK tokens on contract's behalf in order to pay for fees in LINK
       linkToken.approve(address(router), fees);

       // Send the message through the router
       messageId = router.ccipSend(destinationChainSelector, message);

       // Return the messageId
       return messageId;
   }
}
```

Create a new file under your project's `src/` directory named `Sender.sol` and copy the code above into the file.

#### Code walkthrough

The sections below provide a detailed explanation for the code for the `Sender` contract provided above.

##### Initializing the contract

In order to send data using CCIP, the `Sender` contract will need access to the following dependencies:

1. **The `Router` contract**: This contract serves as the primary interface when using CCIP to send and receive messages and tokens.
2. **The fee token contract**: This contract serves as the contract for the token that will be used to pay fees when sending messages and tokens. For this tutorial, the contract address for LINK token is used.

The `Router` contract address and LINK token address are passed in as parameters to the contract's constructor and stored as member variables for later for sending messages and paying any associated fees.

```solidity
contract Sender is OwnerIsCreator {

   IRouterClient private router;
   IERC20 private linkToken;

   /// @notice Initializes the contract with the router and LINK token address.
   /// @param _router The address of the router contract.
   /// @param _link The address of the link contract.
   constructor(address _router, address _link) {
       router = IRouterClient(_router);
       linkToken = IERC20(_link);
   }
```

The `Router` contract provides two important methods that can be used when sending messages using CCIP:

- `getFee`: Given a chain selector and message, returns the fee amount required to send the message.
- `ccipSend`: Given a chain selector and message, sends the message through the router and returns an associated message ID.

The next section describes how these methods are utilized to send a message to another chain.

##### Sending a message

The `Sender` contract defines a custom method named `sendMessage` that utilizes the methods described above in order to:

1. Construct a message using the `EVM2AnyMessage` method provided by the `Client` CCIP library, using the following data:
   1. `receiver`: The receiver contract address (encoded).
   1. `data`: The text data to send with the message (encoded).
   1. `tokenAmounts`: The amount of tokens to send with the message. For sending just an arbitrary message this field is defined as an empty array (`new Client.EVMTokenAmount[](0)`), indicating that no tokens will be sent.
   1. `extraArgs`: Extra arguments associated with the message, such as `gasLimit`.
   1. `feeToken`: The `address` of the token to be used for paying fees.
1. Get the fees required to send the message using the `getFee` method provided by the `Router` contract.
1. Check that the contract holds an adequate amount of tokens to cover the fee. If not, revert the transaction.
1. Approve the `Router` contract to transfer tokens on the `Sender` contracts behalf in order to cover the fees.
1. Send the message to a specified chain using the `Router` contract's `ccipSend` method.
1. Return a unique ID associated with the sent message.

```solidity
/// @param receiver The address of the recipient on the destination blockchain.
/// @param text The string text to be sent.
/// @return messageId The ID of the message that was sent.
function sendMessage(
    uint64 destinationChainSelector,
    address receiver,
    string calldata text
) external onlyOwner returns (bytes32 messageId) {
    Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
        receiver: abi.encode(receiver), // Encode receiver address
        data: abi.encode(text), // Encode text to send
        tokenAmounts: new Client.EVMTokenAmount[](0), // Empty array indicating no tokens are being sent
        extraArgs: Client._argsToBytes(
            Client.EVMExtraArgsV1({gasLimit: 200_000}) // Set gas limit
        ),
        feeToken: address(linkToken) // Set the LINK as the feeToken address
    });

    // Get the fee required to send the message
    uint256 fees = router.getFee(
        destinationChainSelector,
        message
    );

    // Revert if contract does not have enough LINK tokens for sending a message
    require(linkToken.balanceOf(address(this)) > fees, "Not enough LINK balance");

    // Approve the Router to transfer LINK tokens on contract's behalf in order to pay for fees in LINK
    linkToken.approve(address(router), fees);
    // Send the message through the router
    messageId = router.ccipSend(destinationChainSelector, message);

    // Return the messageId
    return messageId;
}
```

### Creating a Receiver contract

The code snippet below is for a basic smart contract that uses CCIP to receive data:

```solidity
pragma solidity ^0.8.0;

import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";

contract Receiver is CCIPReceiver {

   bytes32 private _messageId;
   string private _text;

   /// @notice Constructor - Initializes the contract with the router address.
   /// @param router The address of the router contract.
   constructor(address router) CCIPReceiver(router) {}

   /// @notice Handle a received message
   /// @param message The cross-chain message being received.
   function _ccipReceive(
       Client.Any2EVMMessage memory message
   ) internal override {
       _messageId = message.messageId; // Store the messageId
       _text = abi.decode(message.data, (string)); // Decode and store the message text
   }

    /// @notice Gets the last received message.
    /// @return messageId The ID of the last received message.
    /// @return text The last received text.
    function getMessage()
        external
        view
        returns (bytes32 messageId, string memory text)
    {
        return (_messageId, _text);
    }
}
```

Create a new file under your project’s `src/` directory named `Receiver.sol` and copy the code above into the file.

#### Code walkthrough

The sections below provide a detailed explanation for the code for the `Receiver` contract provided above.

##### Initializing the contract

In order to receive data using CCIP, the `Receiver` contract will need to extend to the`CCIPReceiver` interface. Extending this interface allows the `Receiver` contract to initialize the contract with the router address from the constructor, as seen below:

```solidity
import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";

contract Receiver is CCIPReceiver {

   /// @notice Constructor - Initializes the contract with the router address.
   /// @param router The address of the router contract.
   constructor(address router) CCIPReceiver(router) {}
}
```

##### Receiving a message

Extending the `CCIPReceiver` interface also allows the `Receiver` contract to override the `_ccipReceive` handler method for when a message is received and define custom logic.

```solidity
/// @notice Handle a received message
/// @param message The cross-chain message being received.
function _ccipReceive(
    Client.Any2EVMMessage memory message
) internal override {
    // Add custom logic here
}
```

The `Receiver` contract in this tutorial provides custom logic that stores the `messageId` and `text` (decoded) as member variables.

```solidity
contract Receiver is CCIPReceiver {

   bytes32 private _messageId;
   string private _text;

   /// @notice Constructor - Initializes the contract with the router address.
   /// @param router The address of the router contract.
   constructor(address router) CCIPReceiver(router) {}

   /// @notice Handle a received message
   /// @param message The cross-chain message being received.
   function _ccipReceive(
       Client.Any2EVMMessage memory message
   ) internal override {
       _messageId = message.messageId; // Store the messageId
       _text = abi.decode(message.data, (string)); // Decode and store the message text
   }
}
```

##### Retrieving a message

The `Receiver` contract defines a custom method named `getMessage` that returns the details of the last received message `_messagId` and `_text`. This method can be called to fetch the message data details after the `_ccipReceive` receives a new message.

```solidity
/// @notice Gets the last received message.
/// @return messageId The ID of the last received message.
/// @return text The last received text.
function getMessage()
    external
    view
    returns (bytes32 messageId, string memory text)
{
    return (_messageId, _text);
}
```

---

## Compiling the smart contracts

To compile your smart contracts, run:

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

For instructions on how to get your private key from Coinbase Wallet, visit the [Coinbase Wallet documentation](https://docs.cloud.coinbase.com/wallet-sdk/docs/developer-settings#show-private-key). **It is critical that you do NOT commit this to a public repo**.

:::

To confirm that the wallet was imported as the `deployer` account in your Foundry project, run:

```bash
cast wallet list
```

### Setting up environment variables

To setup your environment, create an `.env` file in the home directory of your project, and add the RPC URLs, [CCIP chain selectors](https://docs.chain.link/ccip/supported-networks/v1_2_0/testnet), [CCIP router addresses](https://docs.chain.link/ccip/supported-networks/v1_2_0/testnet), and [LINK token addresses](https://docs.chain.link/resources/link-token-contracts) for both Base Goerli and Optimism Goerli testnets:

```bash
BASE_GOERLI_RPC="https://goerli.base.org"
OPTIMISM_GOERLI_RPC="https://goerli.optimism.io"

BASE_GOERLI_CHAIN_SELECTOR=5790810961207155433
OPTIMISM_GOERLI_CHAIN_SELECTOR=2664363617261496610

BASE_GOERLI_ROUTER_ADDRESS="0x80AF2F44ed0469018922c9F483dc5A909862fdc2"
OPTIMISM_GOERLI_ROUTER_ADDRESS="0xcc5a0B910D9E9504A7561934bed294c51285a78D"

BASE_GOERLI_LINK_ADDRESS="0x6D0F8D488B669aa9BA2D0f0b7B75a88bf5051CD3"
OPTIMISM_GOERLI_LINK_ADDRESS="0xdc2CC710e42857672E7907CF474a69B63B93089f"
```

Once the `.env` file has been created, run the following command to load the environment variables in the current command line session:

```bash
source .env
```

### Deploying the smart contracts

With your contracts compiled and environment setup, you are ready to deploy the smart contracts.

To deploy a smart contract using Foundry, you can use the `forge create` command. The command requires you to specify the smart contract you want to deploy, an RPC URL of the network you want to deploy to, and the account you want to deploy with.

:::info

Your wallet must be funded with ETH on the Base Goerli and Optimism Goerli to cover the gas fees associated with the smart contract deployment. Otherwise, the deployment will fail.

To get testnet ETH for Base Goerli and Optimism Goerli, see the [prerequisites](#prerequisites).

:::

#### Deploying the Sender contract to Base Goerli

To deploy the `Sender` smart contract to the Base Goerli testnet, run the following command:

```bash
forge create ./src/Sender.sol:Sender --rpc-url $BASE_GOERLI_RPC --constructor-args $BASE_GOERLI_ROUTER_ADDRESS $BASE_GOERLI_LINK_ADDRESS --account deployer
```

When prompted, enter the password that you set earlier, when you imported your wallet's private key.

After running the command above, the contract will be deployed on the Base Goerli test network. You can view the deployment status and contract by using a [block explorer](/docs/tools/block-explorers).

#### Deploying the Receiver contract to Optimism Goerli

To deploy the `Receiver` smart contract to the Optimism Goerli testnet, run the following command:

```bash
forge create ./src/Receiver.sol:Receiver --rpc-url $OPTIMISM_GOERLI_RPC --constructor-args $OPTIMISM_GOERLI_ROUTER_ADDRESS --account deployer
```

When prompted, enter the password that you set earlier, when you imported your wallet's private key.

After running the command above, the contract will be deployed on the Optimism Goerli test network. You can view the deployment status and contract by using the [OP Goerli block explorer](https://goerli-optimism.etherscan.io/).

### Funding your smart contracts

In order to pay for the fees associated with sending messages, the `Sender` contract will need to hold a balance of LINK tokens.

Fund your contract directly from your wallet, or by running the following `cast` command:

```bash
cast send $BASE_GOERLI_LINK_ADDRESS --rpc-url $BASE_GOERLI_RPC "transfer(address,uint256)" <SENDER_CONTRACT_ADDRESS> 5 --account deployer
```

The above command sends `5` LINK tokens on Base Goerli testnet to the `Sender` contract.

:::info

Replace `<SENDER_CONTRACT_ADDRESS>` with the contract address of your deployed `Sender` contract before running the provided `cast` command.

:::

---

## Interacting with the smart contract

Foundry provides the `cast` command-line tool that can be used to interact with deployed smart contracts and call their functions.

### Sending data

The `cast` command can be used to call the `sendMessage(uint64, address, string)` function on the `Sender` contract deployed to Base Goerli in order to send message data to the `Receiver` contract on Optimism Goerli.

To call the `sendMessage(uint64, address, string)` function of the `Sender` smart contract, run:

```bash
cast send <SENDER_CONTRACT_ADDRESS> --rpc-url $BASE_GOERLI_RPC "sendMessage(uint64, address, string)" $OPTIMISM_GOERLI_CHAIN_SELECTOR <RECEIVER_CONTRACT_ADDRESS> "Based" --account deployer
```

The command above calls the `sendMessage(uint64, address, string)` to send a message. The parameters passed in to the method include: The chain selector to the destination chain (Optimism Goerli), the `Receiver` contract address, and the text data to be included in the message (`Based`).

:::info

Replace `<SENDER_CONTRACT_ADDRESS>` and `<RECEIVER_CONTRACT_ADDRESS>` with the contract addresses of your deployed `Sender` and `Receiver` contracts respectively before running the provided `cast` command.

:::

After running the command, a unique `messageId` should be returned.

Once the transaction has been finalized, it will take a few minutes for CCIP to deliver the data to Optimism Goerli and call the `ccipReceive` function on the `Receiver` contract.

:::info

You can use the [CCIP explorer](https://ccip.chain.link/) to see the status of the CCIP transaction.

:::

### Receiving data

The `cast` command can also be used to call the `getMessage()` function on the `Receiver` contract deployed to Optimism Goerli in order to read the received message data.

To call the `getMessage()` function of the `Receiver` smart contract, run:

```bash
cast send <RECEIVER_CONTRACT_ADDRESS> --rpc-url $OPTIMISM_GOERLI_RPC "getMessage()" --account deployer
```

:::info

Replace `<RECEIVER_CONTRACT_ADDRESS>` with the contract addresses of your deployed `Receiver` contract before running the provided `cast` command.

:::

After running the command, the `messageId` and `text` of the last received message should be returned.

If the transaction fails, ensure the status of your `ccipSend` transaction has been finalized. You can using the [CCIP explorer](https://ccip.chain.link/).

---

## Conclusion

Congratulations! You have successfully learned how to perform cross-chain messaging on Base using Chainlink CCIP.

To learn more about cross-chain messaging and Chainlink CCIP, check out the following resources:

- [Cross-chain](https://docs.base.org/docs/tools/cross-chain)
- [Chainlink CCIP](https://docs.chain.link/ccip)

---
