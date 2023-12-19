---
title: Using Foundry
slug: /guides/deploy-with-foundry
description: "A guide on deploying a smart contract on the Base test network using Foundry. Includes instructions for
setting up the environment, compiling, and deploying the smart contract."
keywords: ["Foundry", "smart contract", "ERC-721", "Base", "Base test network", "Base testnet", "Rust", "Solidity", "smart contract deployment",
"deploy a smart contract", "build on base", "write smart contract", "smart contract development"]
---

# Deploying a Smart Contract using Foundry

This article will provide an overview of the [Foundry](https://book.getfoundry.sh/) development toolchain, and show you how to deploy a contract to **Base Goerli** testnet.

Foundry is a powerful suite of tools to develop, test, and debug your smart contracts. It is comprised of several individual tools:
- `forge`: the main workhorse of Foundry — for developing, testing, compiling, and deploying smart contracts
- `cast`: a command-line tool for performing Ethereum RPC calls (e.g. interacting with contracts, sending transactions, and getting onchain data)
- `anvil`: a local testnet node, for testing contract behavior from a frontend or over RPC
- `chisel`: a Solidity [REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop), for trying out Solidity snippets on a local or forked network

Foundry offers extremely fast feedback loops (due to the under-the-hood Rust implementation) and less context switching — because we'll be writing our contracts, tests, and deployment scripts **All** in Solidity!

:::info

For production / mainnet deployments the steps below in this guide will be almost identical, however, you'll want to ensure that you've configured `Base` (mainnet) as the network rather than `Base Goerli` (testnet).

:::

---

## Objectives

By the end of this guide you should be able to do the following:

- Setup Foundry for Base
- Create an NFT smart contract for Base
- Compile a smart contract for Base (using `forge`)
- Deploy a smart contract to Base (also with `forge`)
- Interact with a smart contract deployed on Base (using `cast`)

---

## Prerequisites

### Foundry

This guide requires you have Foundry installed.

- From the command-line (terminal), run: `curl -L https://foundry.paradigm.xyz | bash`
- Then run `foundryup`, to install the latest (nightly) build of Foundry

For more information, see the Foundry Book [installation guide](https://book.getfoundry.sh/getting-started/installation).

### Coinbase Wallet

In order to deploy a smart contract, you will first need a web3 wallet. You can create a wallet by downloading the Coinbase Wallet browser extension.

- Download [Coinbase Wallet](https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad?hl=en)

### Wallet funds

Deploying contracts to the blockchain requires a gas fee. Therefore, you will need to fund your wallet with ETH to cover those gas fees.

For this guide, you will be deploying a contract to the Base Goerli test network. You can fund your wallet with Base Goerli ETH using the following options:

- [Coinbase Faucet | Base Goerli](https://www.coinbase.com/faucets/base-ethereum-goerli-faucet)
- [Coinbase Wallet Faucets](https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad)

For more detailed steps on funding your wallet with Base Goerli ETH, see [Network Faucets](/tools/network-faucets).

---

## Creating a project

Before you can begin deploying smart contracts to Base, you need to set up your development environment by creating a Foundry project.

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
 │   └── Counter.s.sol
├── src
 │   └── Counter.sol
└── test
    └── Counter.t.sol
```

---

## Compiling the smart contract

Below is a simple NFT smart contract ([ERC-721](https://eips.ethereum.org/EIPS/eip-721)) written in the Solidity programming language:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721 {
    uint256 public currentTokenId;

    constructor() ERC721("NFT Name", "NFT") {}

    function mint(address recipient) public payable returns (uint256) {
        uint256 newItemId = ++currentTokenId;
        _safeMint(recipient, newItemId);
        return newItemId;
    }
}
```

The Solidity code above defines a smart contract named `NFT`. The code uses the `ERC721` interface provided by the [OpenZeppelin Contracts library](https://docs.openzeppelin.com/contracts/5.x/) to create an NFT smart contract. OpenZeppelin allows developers to leverage battle-tested smart contract implementations that adhere to official ERC standards.

To add the OpenZeppelin Contracts library to your project, run:

```bash
forge install openzeppelin/openzeppelin-contracts
```

In your project, delete the `src/Counter.sol` contract that was generated with the project and add the above code in a new file called `contracts/NFT.sol`. (You can also delete the `test/Counter.t.sol` and `script/Counter.s.sol` files, but you should add your own tests ASAP!).

To compile our basic NFT contract using Foundry, run:

```bash
forge build
```

---

## Configuring Foundry with Base

Next we will configure your Foundry project to deploy smart contracts to the Base network. First we'll store your private key in an encrypted keystore, then we'll add Base as a network.

### Storing your private key

The following command will import your private key to Foundry's secure keystore. You will be prompted to enter your private key, as well as a password for signing transactions:

```bash
cast wallet import deployer --interactive
```

:::caution

For instructions on how to get your private key from Coinbase Wallet, visit the [Coinbase Wallet documentation](https://docs.cloud.coinbase.com/wallet-sdk/docs/developer-settings#show-private-key). **It is critical that you do NOT commit this to a public repo**.

:::

Run this command to confirm that the 'deployer' account is setup in Foundry:

```bash
cast wallet list
```

### Adding Base as a network

Now create a `.env` file in the home directory of your project to add the Base network and an API key for verifying your contract on Basescan:

```
BASE_MAINNET_RPC="https://mainnet.base.org"
BASE_GOERLI_RPC="https://goerli.base.org"
ETHERSCAN_API_KEY="PLACEHOLDER_STRING"
```

 Note that even though we're using Basescan as our block explorer, Foundry expects the API key to be defined as `ETHERSCAN_API_KEY`.

:::info

When verifying a contract with Basescan on testnet (Goerli), an API key is not required. You can leave the value as `PLACEHOLDER_STRING`. On mainnet, you can get your Basescan API key from [here](https://basescan.org/myapikey) after you sign up for an account.

:::

### Loading environment variables

Now that you've created the above `.env` file, run the following command to load the environment variables in the current command line session:

```bash
source .env
```

---

## Deploying the smart contract
With your contract compiled and your environment configured, you are ready to deploy to the Base Goerli test network!

Today we'll use the `forge create` command, which is a straightforward way to deploy a single contract at a time. In the future, you may want to look into [`forge script`](https://book.getfoundry.sh/tutorials/solidity-scripting), which enables scripting onchain transactions and deploying more complex smart contract projects.

You'll need testnet ETH in your wallet. See the [prerequisites](#prerequisites) if you haven't done that yet. Otherwise, the deployment attempt will fail.

To deploy the contract to the Base Goerli test network, run the following command. You will be prompted to enter the password that you set earlier, when you imported your private key:

```bash
forge create ./src/NFT.sol:NFT --rpc-url $BASE_GOERLI_RPC --account deployer
```

The contract will be deployed on the Base Goerli test network. You can view the deployment status and contract by using a [block explorer](/tools/block-explorers) and searching for the address returned by your deploy script. If you've deployed an exact copy of the NFT contract above, it will already be verified and you'll be able to read and write to the contract using the web interface.

:::info

If you'd like to deploy to mainnet, you'll modify the command like so:

```bash
forge create ./src/NFT.sol:NFT --rpc-url $BASE_MAINNET_RPC --account deployer
```

:::

Regardless of the network you're deploying to, if you're deploying a new or modified contract, you'll need to verify it.

---

## Verifying the Smart Contract
In web3, it's considered best practice to verify your contracts so that users and other developers can inspect the source code, and be sure that it matches the deployed bytecode on the blockchain.

Further, if you want to allow others to interact with your contract using the block explorer, it first needs to be verified. The above contract has already been verified, so you should be able to view your version on a block explorer already, but we'll still walk through how to verify a contract on Base Goerli testnet.

:::info

When verifying a contract with Basescan on testnet (Goerli), an API key is not required. You can leave the value as `PLACEHOLDER_STRING`. On mainnet, you can get your Basescan API key from [here](https://basescan.org/myapikey) after you sign up for an account.

:::

Grab the deployed address and run:

```bash
forge verify-contract <DEPLOYED_ADDRESS> ./src/NFT.sol:NFT --chain 84531 --watch
```

You should see an output similar to:

```
Start verifying contract `0x71bfCe1172A66c1c25A50b49156FAe45EB56E009` deployed on base-goerli

Submitting verification for [src/NFT.sol:NFT] 0x71bfCe1172A66c1c25A50b49156FAe45EB56E009.
Submitted contract for verification:
        Response: `OK`
        GUID: `3i9rmtmtyyzkqpfvy7pcxj1wtgqyuybvscnq8d7ywfuskss1s7`
        URL:
        https://goerli.basescan.org/address/0x71bfce1172a66c1c25a50b49156fae45eb56e009
Contract verification status:
Response: `NOTOK`
Details: `Pending in queue`
Contract verification status:
Response: `OK`
Details: `Pass - Verified`
Contract successfully verified
```

Search for your contract on [Basescan](https://goerli.basescan.org/) to confirm it is verified.

:::info

You can't re-verify a contract identical to one that has already been verified. If you attempt to do so, such as verifying the above contract, you'll get an error similar to:

```text
Start verifying contract `0x71bfCe1172A66c1c25A50b49156FAe45EB56E009` deployed on base-goerli

Contract [src/NFT.sol:NFT] "0x71bfCe1172A66c1c25A50b49156FAe45EB56E009" is already verified. Skipping verification.
```

:::

## Interacting with the Smart Contract

If you verified on Basescan, you can use the `Read Contract` and `Write Contract` sections under the `Contract` tab to interact with the deployed contract. To use `Write Contract`, you'll need to connect your wallet first, by clicking the `Connect to Web3` button (sometimes this can be a little finicky, and you'll need to click `Connect` twice before it shows your wallet is successfully connected). 

To practice using the `cast` command-line tool which Foundry provides, we'll perform a call without publishing a transaction (a read), then sign and publish a transaction (a write).

### Performing a call
A key component of the Foundry toolkit, `cast` enables us to interact with contracts, send transactions, and get onchain data using Ethereum RPC calls. First we will perform a call from your account, without publishing a transaction.

From the command-line, run:

```bash
cast call <DEPLOYED_ADDRESS> --rpc-url $BASE_GOERLI_RPC "balanceOf(address)" <YOUR_ADDRESS_HERE>
```

You should receive `0x0000000000000000000000000000000000000000000000000000000000000000` in response, which equals `0` in hexadecimal. And that makes sense — while you've deployed the NFT contract, no NFTs have been minted yet and therefore your account's balance is zero.

### Signing and publishing a transaction
Now let's sign and publish a transaction, calling the `mint(address)` function on the NFT contract we just deployed.

Run the following command:

```bash
cast send <DEPLOYED_ADDRESS> --rpc-url=$BASE_GOERLI_RPC "mint(address)" <YOUR_ADDRESS_HERE> --account deployer
```

:::info

Note that in this `cast send` command, we had to include our private key, but this is not required for `cast call`, because that's for calling view-only contract functions and therefore we don't need to sign anything.

:::

If successful, Foundry will respond with information about the transaction, including the `blockNumber`, `gasUsed`, and `transactionHash`.

Finally, let's confirm that we did indeed mint ourselves one NFT. If we run the first `cast call` command again, we should see that our balance increased from 0 to 1:

```bash
cast call <DEPLOYED_ADDRESS> --rpc-url $BASE_GOERLI_RPC "balanceOf(address)" <YOUR_ADDRESS_HERE>
```

And the response: `0x0000000000000000000000000000000000000000000000000000000000000001` (`1` in hex) — congratulations, you deployed a contract and minted an NFT with Foundry!

---

## Conclusion

Phew, that was a lot! We learned how to setup a project, deploy to Base, and interact with our smart contract using Foundry. The process is the same for real networks, just more expensive — and of course, you'll want to invest time and effort testing your contracts, to reduce the likelihood of user-impacting bugs before deploying.

For all things Foundry, check out the [Foundry book](https://book.getfoundry.sh/), or head to the official Telegram [dev chat](https://t.me/foundry_rs) or [support chat](https://t.me/foundry_support).

---

<!-- Add reference style links here.  These do not render on the page. -->

[`goerli.basescan.org`]: https://goerli.basescan.org/
[`basescan.org`]: https://basescan.org/
[coinbase]: https://www.coinbase.com/wallet
[MetaMask]: https://metamask.io/
[coinbase settings]: https://docs.cloud.coinbase.com/wallet-sdk/docs/developer-settings
[etherscan]: https://etherscan.io/
[faucets on the web]: https://coinbase.com/faucets
[Foundry]: https://book.getfoundry.sh/
