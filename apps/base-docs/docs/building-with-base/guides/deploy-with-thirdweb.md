---
title: Using thirdweb
slug: /guides/deploy-with-thirdweb
---

# Deploying a Smart Contract using thirdweb

[thirdweb](https://thirdweb.com) is a development framework that allows you to build web3 functionality into your applications.

In this guide, we'll give you an overview of using the [thirdweb CLI](https://portal.thirdweb.com/cli) to deploy a contract to the Base Goerli test network.

---

## Objectives

By the end of this lesson you should be able to:

- Create a project with a smart contract using thirdweb
- Deploy smart contracts using thirdweb
- Interact with deployed smart contracts using thirdweb

---

## Prerequisites

The interactive thirdweb [command line interface](https://portal.thirdweb.com/cli) has everything you need to create, build and deploy smart contracts and apps to Base.

We recommend using npx to always get the latest version. Alternatively, you can install the CLI as a global command on your machine:

```bash
npm i -g @thirdweb-dev/cli
```

---

## Creating a project

You can use the thirdweb [CLI](https://portal.thirdweb.com/cli) to create a new project that contains a smart contract, alternatively, you can deploy a prebuilt contract for NFTs, Tokens or Marketplace directly from the thirdweb [Explore](http://thirdweb.com/explore) page.

To create a new project using the CLI, run:

```bash
npx thirdweb create contract
```

This will kick off an interactive series of questions to help you get started:

- Give your project a name
- Select `Hardhat` as the framework
- Select `ERC721` as the base contract
- Select None for optional [extensions](https://portal.thirdweb.com/contractkit/extensions)

### Exploring the project

The create command generates a new directory with your project name. Open this directory in your text editor.

Inside the `contracts` folder, you'll find a `Contract.sol` file; this is our smart contract written in Solidity!

If we take a look at the code, you can see that our contract is inheriting the functionality of [`ERC721Base`](https://portal.thirdweb.com/contractkit/base-contracts/erc-721/erc721base), by:

1. [Importing](https://solidity-by-example.org/import/) the contract
2. [Inheriting](https://docs.soliditylang.org/en/v0.8.17/contracts.html#inheritance) the contract; by declaring that our contract is ERC721Base
3. Implementing any [required methods](https://portal.thirdweb.com/contractkit/base-contracts/erc-721/erc721base#implementing-the-contract) such as the [constructor](https://docs.soliditylang.org/en/v0.8.17/contracts.html#constructors).

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@thirdweb-dev/contracts/base/ERC721Base.sol";

contract Contract is ERC721Base {
    constructor(
        string memory _name,
        string memory _symbol,
        address _royaltyRecipient,
        uint128 _royaltyBps
    ) ERC721Base(_name, _symbol, _royaltyRecipient, _royaltyBps) {}
}
```

This inheritance pattern lets us use functionality from other contracts inside of ours, modify it, and add custom logic.

For example, our contract currently implements all of the logic inside the [`ERC721Base.sol`](https://github.com/thirdweb-dev/contracts/blob/main/contracts/base/ERC721Base.sol) contract; which implements the [`ERC721A`](https://github.com/thirdweb-dev/contracts/blob/main/contracts/eip/ERC721A.sol) standard with several useful [extensions](https://portal.thirdweb.com/contractkit/extensions).

---

## Deploying the contract

You can use the thirdweb [CLI](https://portal.thirdweb.com/cli) to deploy a smart contract to Base.

To deploy your smart contracts, from the root directory of your project, run:

```bash
npx thirdweb deploy
```

Running this command will:

- Compile all the contracts in the current directory.
- Allow you to select which contract(s) you want to deploy.
- Uploads your contract source code ([ABI](https://docs.soliditylang.org/en/v0.8.17/abi-spec.html)) to [IPFS](https://docs.ipfs.tech/concepts/what-is-ipfs/)
- Open the deploy flow in the dashboard

From the dashboard, you will need to first enter the values for our contract's constructor:

- `_name`: The name of our contract
- `_symbol`: The symbol or "ticker" given to our contracts tokens
- `_royaltyRecipient`: The wallet address that will receive the royalties from secondary sales
- `_royaltyBps`: The basis points (bps) that will be given to the royalty recipient for each secondary sale, e.g. 500 = 5%

Finally, select the Base Goerli test network as the [network](https://blog.thirdweb.com/guides/which-network-should-you-use/) you want to deploy to, and click **Deploy Now**.

:::info

For production / mainnet deployments select `Base` (mainnet) as the network rather than `Base Goerli`.

:::

Once your contract is deployed, you'll be redirected to a [dashboard](https://portal.thirdweb.com/dashboard) for managing your contract.

---

## Interacting with your contract

Thirdweb provides SDKs for various programming languages, including [React](https://portal.thirdweb.com/react), [React Native](https://portal.thirdweb.com/react-native), [TypeScript](https://portal.thirdweb.com/typescript), [Python](https://portal.thirdweb.com/python), [Go](https://portal.thirdweb.com/go), and [Unity](https://portal.thirdweb.com/unity).

To interact with your smart contract, you can use the thirdweb [CLI](https://portal.thirdweb.com/cli) to create a web application that is pre-configured with the [thirdweb React SDK](https://portal.thirdweb.com/react).

To create a web application preconfigured with the thirdweb SDK, run:

```bash
npx thirdweb create app –evm
```

This will kick off an interactive series of questions to help you get started:

- Give your project a name
- Select [`Create React App`](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app) as the framework
- Select `TypeScript` as the language

### Exploring the project

The create command generates a new directory with your project name. Open this directory in your text editor.

Inside the [`index.tsx`](https://github.com/thirdweb-example/cra-typescript-starter/blob/main/src/index.tsx#L17-L19) file, you'll find the [`ThirdwebProvider`](https://portal.thirdweb.com/sdk/set-up-the-sdk/frontend#manual-installation) wrapping the entire application.

This wrapper allows us to use all of the [React SDK](https://portal.thirdweb.com/react)'s hooks and [UI Components](https://portal.thirdweb.com/react/react.web3button) throughout the application, as well as configure an `activeChain`; which declares which chain our smart contracts are deployed to.

Since we deployed our smart contract to the Base network, we'll set the `activeChain` to `BaseGoerli`:

```javascript
...
import { BaseGoerli } from "@thirdweb-dev/chains";
import { ThirdwebProvider } from "@thirdweb-dev/react";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
 <React.StrictMode>
   <ThirdwebProvider activeChain={BaseGoerli}>
     <App />
   </ThirdwebProvider>
 </React.StrictMode>
);

```

### Interacting with the contract

To connect to your smart contract in the application, provide your smart contract address (which you can get from the [dashboard](https://portal.thirdweb.com/dashboard)) to the [`useContract`](https://portal.thirdweb.com/sdk/interacting-with-contracts/custom-contracts/getting-a-contract#connect-to-a-contract) hook like so:

```javascript
import { useContract } from '@thirdweb-dev/react';

export default function Home() {
  const { contract } = useContract('<CONTRACT_ADDRESS>');

  // Now you can use the contract in the rest of the component!
}
```

You can now call any function on your smart contract with [`useContractRead`](https://portal.thirdweb.com/sdk/interacting-with-contracts/custom-contracts/using-contracts#read-contract-data) and [`useContractWrite`](https://portal.thirdweb.com/sdk/interacting-with-contracts/custom-contracts/using-contracts#write-transactions) hooks.

For example, you can call `useContractRead` to get the name of the contract:

```javascript
const { data, isLoading } = useContractRead(contract, 'name');
```

The thirdweb SDK also provides hooks for various interfaces and [extensions](https://portal.thirdweb.com/contractkit/extensions) that make reading and writing data easier. For example, we could use the [ERC721 hooks](https://portal.thirdweb.com/sdk/interacting-with-contracts/erc721) to fetch the metadata for our NFT contract.

For more information on interacting with smart contracts using the thirdweb SDK, visit the [thirdweb developer documentation](https://portal.thirdweb.com/react).

### Deploying the project

To [host your application on IPFS](https://blog.thirdweb.com/guides/how-to-host-your-web-app-on-ipfs/), run the following command:

```bash
yarn deploy
```

This command uses [Storage](https://portal.thirdweb.com/storage) to:

- Create a production build of your application
- Upload the build to IPFS
- Generate a URL where your app is permanently hosted.

That's it! You now have a web application that interacts with smart contracts deployed to Base!

---
