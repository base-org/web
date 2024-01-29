---
title: Biconomy
slug: /guides/account-abstraction-with-biconomy
description: A guide on implementing Account Abstraction into a Base project using Biconomy paymasters, bundlers, and smart accounts.
keywords:
  [
    Account Abstraction,
    AA,
    Biconomy,
    Paymaster,
    Bundler,
    User operations,
    userops,
    Smart contract wallet,
    Smart account,
    Particle Network,
    Particle Auth,
  ]
---

# Account Abstraction on Base using Biconomy

This page will guide you through the process of implementing Account Abstraction in your Base projects using Biconomy paymasters, bundlers, and smart accounts.

---

## Objectives

By the end of this guide you should be able to do the following:

- Set up a smart contract project for Base using Foundry
- Set up a Next.js front-end project using `create next-app`
- Setup user login and authentication using [Particle Network](https://particle.network/)
- Setup a Biconomy paymaster and bundler
- Create a gasless transaction

---

## Prerequisites

### Foundry

This guide requires you to have Foundry installed.

- From the command-line (terminal), run: `curl -L https://foundry.paradigm.xyz | bash`
- Then run `foundryup`, to install the latest (nightly) build of Foundry

For more information, see the Foundry Book [installation guide](https://book.getfoundry.sh/getting-started/installation).

### Coinbase Wallet

This guide requires you to have a wallet. You can create a wallet by downloading the Coinbase Wallet browser extension:

- Download [Coinbase Wallet](https://chrome.google.com/webstore/detail/coinbase-wallet-extension/hnfanknocfeofbddgcijnmhnfnkdnaad?hl=en)

### Wallet funds

To complete this guide, you will need to fund a wallet with ETH on Base Goerli.

The ETH is required for covering gas fees associated with deploying smart contracts to the network.

- To fund your wallet with ETH on Base Goerli, visit a faucet listed on the [Base Faucets](https://docs.base.org/tools/network-faucets) page.

---

## What is Biconomy?

Biconomy is a toolkit that offers a full-stack solution for Account Abstraction, including smart accounts, paymasters for sponsoring gas fees, and bundlers for bundling user operations into a single transaction.

### High-level concepts

#### Account Abstraction

Account Abstraction ([ERC-4337](https://eips.ethereum.org/EIPS/eip-4337)) allows users to use Smart Contract wallets instead of traditional Externally Owned Account (EOA) wallets.

#### Smart Accounts

A smart account (also known as a smart contract wallet) is a wallet that stores and manages digital assets (ERC-20 tokens, NFTs, etc.) using a smart contract.

#### User Operations

A user operation is a pseudo-transaction object sent by a smart account that describes a transaction to be sent. Multiple user operations are eventually bundled together and initiated as a single real transaction by a bundler.

#### Paymaster

A paymaster is a special smart contract that allows applications to “sponsor user operations”, meaning it will pay for the gas fees associated with the resulting transaction.

#### Bundler

A special node that monitors a mempool of user operations and bundles multiple user operations into a single transaction.

:::info

To learn more about Account Abstraction and the concepts outlined above, see [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337).

:::

---

## Creating and deploying a smart contract

Before you begin, you need to set up a smart contract development environment using Foundry.

To create a new project, first create a new directory named `myproject`, and change it to your current working directory:

```bash
mkdir myproject
cd myproject
```

### Creating a Foundry project

Next, within the `myproject` directory create a new directory named `contracts`, and change it to your current working directory:

```bash
mkdir contracts
cd contracts
```

Then create a new Foundry project by running the following command:

```bash
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

The command creates a boilerplate Solidity smart contract file named `src/Counter.sol`. This is the primary contract you will use for this guide.

:::

### Compiling the smart contract

Compile the smart contract to ensure it builds without any errors.

To compile your smart contract, run:

```bash
forge build
```

### Setting up a wallet as the deployer

Before you can deploy your smart contract to various chains you will need to set up a wallet to be used as the deployer.

To do so, you can use the [`cast wallet import`](https://book.getfoundry.sh/reference/cast/cast-wallet-import) command to import the private key of the wallet into Foundry's securely encrypted keystore:

```bash
cast wallet import deployer --interactive
```

After running the command above, you will be prompted to enter your private key, as well as a password for signing transactions.

:::caution

For instructions on how to get your private key from Coinbase Wallet, visit the [Coinbase Wallet documentation](https://docs.cloud.coinbase.com/wallet-sdk/docs/developer-settings#show-private-key). **It is critical that you do NOT commit this to a public repo.**

:::

To confirm that the wallet was imported as the `deployer` account in your Foundry project, run:

```bash
cast wallet list
```

### Deploying the smart contract

To deploy the smart contract, you can use the `forge create` command. The command requires you to specify the smart contract you want to deploy, an RPC URL of the network you want to deploy to, and the account you want to deploy with.

:::info

Your wallet must be funded with ETH on the Base Goerli to cover the gas fees associated with the smart contract deployment. Otherwise, the deployment will fail.

To get testnet ETH, see the [prerequisites](#prerequisites).

:::

To deploy the smart contract to the Base Goerli testnet, run the following command:

```bash
forge create ./src/Counter.sol:Counter --rpc-url https://goerli.base.org --account deployer
```

When prompted, enter the password that you set earlier, when you imported your wallet’s private key.

After running the command above, the contract will be deployed on the Base Goerli test network. You can view the deployment status and contract by using a [block explorer](/tools/block-explorers).

---

## Setting up the Paymaster and Bundler

To setup the paymaster and bundler for your project, you will need to visit the [Biconomy Dashboard](https://dashboard.biconomy.io/) and complete the following steps.

### Registering a paymaster

Add and register a Paymaster by completing the following steps:

1. Visit the sign in to the [Biconomy Dashboard](https://dashboard.biconomy.io/)
1. From the dashboard, select the **Paymasters** tab and click **Add your first Paymaster**
1. Provide a **Name** for your paymaster
1. Select **Base Goerli** from the **Network** dropdown
1. Click **Register**

You should now have a registered Biconomy paymaster.

:::info

The **API Key** and **Paymaster URL** for the paymaster are provided under the **Overview** tab in the [Biconomy Dashboard](https://dashboard.biconomy.io/).

:::

### Setting up the paymaster gas tank

Set up and fund the paymaster's gas tank by completing the following steps:

1. From the [dashboard](https://dashboard.biconomy.io/), navigate to the **Paymasters** tab
1. Click **Setup gas tank** on the paymaster
1. Navigate to **Gas-Tank > Deposit**, and click **Set up gas tank**
1. Sign the message with your connected wallet to set up the gas tank
1. Click **Go to deposit**
1. Enter the amount of ETH you wish to deposit
1. Click **Deposit**

ETH should now be deposited into the gas tank for your paymaster. You can visit the Withdraw tab at a later time if you wish to withdraw the funds.

### Setting up the paymaster policies

Set up and fund the paymaster's gas tank by completing the following steps:

1. From the [dashboard](https://dashboard.biconomy.io/), navigate to the **Paymasters** tab
1. Select the paymaster to configure
1. Navigate to **Policies > Contracts**, and click **Add your first contract**
1. Add the **Name** and the **Smart contract address** for your contract
1. Click **Add Smart Contract**

### Setting up a bundler

1. Visit the sign in to the [Biconomy Dashboard](https://dashboard.biconomy.io/)
1. From the dashboard, select the **Bundlers** tab

:::info

At the time of writing this guide, the Bundler service is still under development, however a **Bundler URL** is provided for testing out UserOperations on test networks. You can specify the chain ID **84531** to use the Bundler URL on **Base Goerli** testnet.

:::

---

## Setting up the front-end

### Creating a Next.js project

After you set up your paymaster and bundler from the Biconomy Dashboard, the next step is to create a Next.js project for your app's front-end.

From the root of the `myproject` directory of your project, create a new Next.js project by running the following command:

```bash
yarn create next-app
cd my-app
```

### Installing the dependencies

To use the paymaster and bundler that were setup from the Biconomy Dashboard, you will need to add a few dependencies to your Next.js project.

To install Biconomy as a dependency to your project, run the following command:

```bash
yarn add @biconomy/account @biconomy/bundler @biconomy/common @biconomy/core-types @biconomy/paymaster ethers@5.7.2
```

Creating Biconomy smart accounts requires a signer from an EIP-1193 provider. Biconomy works with a variety of different social login and embedded wallet onboarding solutions that provide access to a signer that can be used for creating smart accounts. In this guide, you will use Particle Network for user authentication and getting a smart account signer.

To install Particle Network as a dependency to your project, run the following command:

```bash
yarn add @biconomy/particle-auth
```

### Updating the boilerplate code

The main page (`page.tsx`) of the Next.js project created when running the `yarn create next-app` command contains a `Home` component. This component comes with a lot of code that is unnecessary for this guide.

Replace the content of the `page.tsx` file with the following simplified code:

```javascript
export default function Home() {
  return (
    <main>
      <div></div>
    </main>
  );
}
```

---

## Adding social login using Particle Network

### Setting up Particle Network

To get started adding social login into the app using Particle Network, import and initialize the Biconomy Particle Auth module in the `page.tsx` file as shown below:

```javascript
// highlight-next-line
import { ParticleAuthModule, ParticleProvider } from '@biconomy/particle-auth';

export default function Home() {
  // highlight-start
  const particle = new ParticleAuthModule.ParticleNetwork({
    projectId: 'YOUR_PARTICLE_PROJECT_ID',
    clientKey: 'YOUR_PARTICLE_CLIENT_ID',
    appId: 'YOUR_PARTICLE_APP_ID',
    wallet: {
      displayWalletEntry: true,
    },
  });
  // highlight-end

  return (
    <main>
      <div></div>
    </main>
  );
}
```

:::info

You will need to sign up for a Particle Network account and replace `YOUR_PARTICLE_PROJECT_ID`, `YOUR_PARTICLE_CLIENT_ID`, and `YOUR_PARTICLE_APP_ID` with your own project ID, client ID, and app ID respectively. You can find this information on the [Particle Network Dashboard](https://dashboard.particle.network/#/applications).

:::

### Adding login functionality

Next, add a Login button and `login` function that triggers the Particle Network login flow and gets a `Web3Provider`:

```javascript
import { ParticleAuthModule, ParticleProvider } from '@biconomy/particle-auth';
// highlight-next-line
import { ethers } from 'ethers';

export default function Home() {
  const particle = new ParticleAuthModule.ParticleNetwork({
    projectId: 'YOUR_PARTICLE_PROJECT_ID',
    clientKey: 'YOUR_PARTICLE_CLIENT_ID',
    appId: 'YOUR_PARTICLE_APP_ID',
    wallet: {
      displayWalletEntry: true,
    },
  });

  // highlight-start
  const login = async () => {
    try {
      const userInfo = await particle.auth.login();
      const particleProvider = new ParticleProvider(particle.auth);
      const web3Provider = new ethers.providers.Web3Provider(particleProvider, 'any');
    } catch (error) {
      console.error(error);
    }
  };
  // highlight-end

  return (
    <main>
      <div>
        // highlight-next-line
        <button onClick={login}>Login</button>
      </div>
    </main>
  );
}
```

---

## Creating Smart Accounts using Biconomy

### Initializing the paymaster and bundler

Before you can implement the rest of the login flow and create a smart account for the logged in user, you will need to specify a paymaster and bundler.

To initialize the paymaster and bundler, add the following lines of code:

```javascript
import { ParticleAuthModule, ParticleProvider } from '@biconomy/particle-auth';

// highlight-next-line
import { ethers } from 'ethers';

// highlight-start
import { IBundler, Bundler } from '@biconomy/bundler';
import { IPaymaster, BiconomyPaymaster } from '@biconomy/paymaster';
import { ChainId } from '@biconomy/core-types';
import { DEFAULT_ENTRYPOINT_ADDRESS } from '@biconomy/account';
// highlight-end

export default function Home() {
  const particle = new ParticleAuthModule.ParticleNetwork({
    projectId: 'YOUR_PARTICLE_PROJECT_ID',
    clientKey: 'YOUR_PARTICLE_CLIENT_ID',
    appId: 'YOUR_PARTICLE_APP_ID',
    wallet: {
      displayWalletEntry: true,
    },
  });

  // highlight-start
  const paymaster: IPaymaster = new BiconomyPaymaster({
    paymasterUrl: 'YOUR_PAYMASTER_URL',
  });
  // highlight-end

  // highlight-start
  const bundler: IBundler = new Bundler({
    chainId: ChainId.BASE_GOERLI_TESTNET,
    entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
    bundlerUrl: 'YOUR_BUNDLER_URL',
  });
  // highlight-end

  const login = async () => {
    try {
      const userInfo = await particle.auth.login();
      const particleProvider = new ParticleProvider(particle.auth);
      const web3Provider = new ethers.providers.Web3Provider(particleProvider, 'any');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main>
      <div>
        <button onClick={login}>Login</button>
      </div>
    </main>
  );
}
```

:::info

Replace `YOUR_BUNDLER_URL`, `YOUR_BUNDLER_URL` with the URLs for your paymaster and bundler respectively. You can find this information on the [Biconomy Dashboard](https://dashboard.biconomy.io/)

:::

### Creating the smart account

Once the paymaster and bundler instances have been created, you’re ready to create a smart account for the user that is logging in.

You can use the `BiconomySmartAccountV2.create` function to create a new smart account for the user.

To create a smart account for the user on Base Goerli testnet that uses the Biconomy paymaster and bundler add the following code:

```javascript
...
// highlight-start
import {
  BiconomySmartAccountV2,
  DEFAULT_ENTRYPOINT_ADDRESS,
} from "@biconomy/account";
 import {
  ECDSAOwnershipValidationModule,
  DEFAULT_ECDSA_OWNERSHIP_MODULE,
} from "@biconomy/modules";
// highlight-end

export default function Home() {

...

  const login = async () => {
    try {
      const userInfo = await particle.auth.login();
      const particleProvider = new ParticleProvider(particle.auth);
      const web3Provider = new ethers.providers.Web3Provider(
        particleProvider,
        "any",
      );

      // highlight-start
      const validationModule = await ECDSAOwnershipValidationModule.create({
        signer: web3Provider.getSigner(),
        moduleAddress: DEFAULT_ECDSA_OWNERSHIP_MODULE,
      });

      let biconomySmartAccount = await BiconomySmartAccountV2.create({
        chainId: ChainId.BASE_GOERLI_TESTNET,
        bundler: bundler,
        paymaster: paymaster,
        entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
        defaultValidationModule: validationModule,
        activeValidationModule: validationModule,
      });

      const accountAddress = await biconomySmartAccount.getAccountAddress();
      // highlight-end
    } catch (error) {
      console.error(error);
    }
   };


  return (
    <main>
      <div>
      <button onClick={login}>Login</button>
      </div>
    </main>
  );
}
```

### Saving the provider and smart account to state

Later in this guide, you will use the `provider` and user’s `smartAccount` to execute transactions on the deployed smart contract. Store the `provider` and `smartAccount` to React state so you can use it later.

To store the the `provider` and `smartAccount`, add the following code:

```javascript
...
// highlight-next-line
import { useState } from "react";

export default function Home() {

  // highlight-start
  const [loading, setLoading] = useState(false);
  const [provider, setProvider] = useState(null);
  const [smartAccount, setSmartAccount] = useState(null);
  const [address, setAddress] = useState("");
  // highlight-end
...

  const login = async () => {
    try {
      setLoading(true);
      const userInfo = await particle.auth.login();
      const particleProvider = new ParticleProvider(particle.auth);
      const web3Provider = new ethers.providers.Web3Provider(
        particleProvider,
        "any",
      );

      const validationModule = await ECDSAOwnershipValidationModule.create({
        signer: web3Provider.getSigner(),
        moduleAddress: DEFAULT_ECDSA_OWNERSHIP_MODULE,
      });


      let biconomySmartAccount = await BiconomySmartAccountV2.create({
        chainId: ChainId.BASE_GOERLI_TESTNET,
        bundler: bundler,
        paymaster: paymaster,
        entryPointAddress: DEFAULT_ENTRYPOINT_ADDRESS,
        defaultValidationModule: validationModule,
        activeValidationModule: validationModule,
      });

      const accountAddress = await biconomySmartAccount.getAccountAddress();
      // highlight-start
      setProvider(web3Provider);
      setSmartAccount(biconomySmartAccount);
      setAddress(accountAddress);
      setLoading(false);

    } catch (error) {
      console.error(error);
    }
   };

   return (
    <main>
      <div>
      // highlight-start
      {!loading && !address && <button onClick={login}>Login</button>}
      {loading && <p>Loading...</p>}
      {address && <h2>Smart Account Address: {address}</h2>}
      // highlight-end
      </div>
    </main>
  );
}
```

:::info

The code above is also updated to hide and display the login button and smart account address of the user, depending on if the user is logged in or not.

:::

---

## Executing a gasless transaction

Now that the app is able to create smart accounts for each logged in user, lets provide the ability for a user to interact with the deployed smart contract.

### Creating a Counter component

To allow users to interact with the deployed `Counter` smart contract, create a new directory named `src/components` and create a new file named `Counter.tsx` with the following content:

```javascript
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { PaymasterMode } from '@biconomy/paymaster';
import abi from '../utils/abi.json';

const contractAddress = 'YOUR_CONTRACT_ADDRESS';

export default function Counter({ smartAccount, provider }) {
  const [number, setNumber] = useState(0);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const counterContract = new ethers.Contract(contractAddress, abi, provider);
    setContract(counterContract);
  }, []);

  const getNumber = async () => {
    const currentNumber = await contract.number();
    setNumber(currentNumber.toNumber());
  };

  const increment = async () => {
    const incrementTx = new ethers.utils.Interface(['function increment()']);
    const data = incrementTx.encodeFunctionData('increment');

    const transaction = {
      to: contractAddress,
      data: data,
    };

    try {
      const userOp = await smartAccount.buildUserOp([transaction], {
        paymasterServiceData: {
          mode: PaymasterMode.SPONSORED,
        },
      });
      const userOpResponse = await smartAccount.sendUserOp(userOp);
      const transactionDetails = await userOpResponse.wait();
      console.log('Transaction details:', transactionDetails);
      console.log('Transaction hash:', transactionDetails.receipt.transactionHash);
    } catch (e) {
      console.error('Error executing transaction:', e);
    }
  };

  return (
    <>
      <div>Current number: {number}</div>
      <button onClick={() => increment()}>Increment</button>
    </>
  );
}
```

#### Code explanation

The code above is a simple React component that interacts with the deployed `Counter` smart contract.

A contract instance is initialized and stored in React state when the component first renders

```javascript
useEffect(() => {
  const counterContract = new ethers.Contract(contractAddress, abi, provider);
  setContract(counterContract);
}, []);
```

The component also has two functions called `getNumber` and `increment`. `getNumber` reads the `number` member variable of the smart contract, and `increment` makes a call to the `increment` function of the smart contract:

```javascript
const getNumber = async () => {
  const currentNumber = await contract.number();
  setNumber(currentNumber.toNumber());
};

const increment = async () => {
  const incrementTx = new ethers.utils.Interface(['function increment()']);
  const data = incrementTx.encodeFunctionData('increment');

  const transaction = {
    to: contractAddress,
    data: data,
  };

  try {
    const userOp = await smartAccount.buildUserOp([transaction], {
      paymasterServiceData: {
        mode: PaymasterMode.SPONSORED,
      },
    });
    const userOpResponse = await smartAccount.sendUserOp(userOp);
    const transactionDetails = await userOpResponse.wait();
  } catch (e) {
    console.error('Error executing transaction:', e);
  }
};
```

### Adding the contract ABI

Initializing a contract instance requires the contracts ABI to be provided. The code for the Counter component in the previous section imports a file called `abi.json`:

```javascript
import abi from '../utils/abi.json';
```

This file does not exist yet, so you will need to add it.

To add the ABI, create a new directory named `src/utils` and create a new file named `abi.json` with the following content:

```javascript
[
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'newNumber',
        type: 'uint256',
      },
    ],
    name: 'setNumber',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'increment',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'number',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
```

:::info

If your deployed contract is verified, you can also get the ABI for the contract from [BaseScan](https://goerli.basescan.org/).

:::

### Updating the Home component

Now that the `Counter` component has been created, add it to the Home component, and pass it the `provider` and user's `smartAccount`:

```javascript
...


import Counter from "../components/Counter";

export default function Home() {

...

   return (
    <main>
      <div>
      {!loading && !address && <button onClick={login}>Login</button>}
      {loading && <p>Loading...</p>}
      {address && <h2>Smart Account Address: {address}</h2>}
      // highlight-next-line
      <Counter smartAccount={smartAccount} provider={provider}/>
      </div>
    </main>
  );
}
```

### Executing the transaction

With all of the components set up, you are ready to run and test the app by logging in and executing a gasless transaction.

Perform the following steps:

1. Run the application by running `yarn dev`
1. Click the Login button to login and create a smart account
1. Once logged in, click the **Increment** button to execute the `increment()` function of the smart contract
1. Upon a successful transaction, observe the number update.

---

## Conclusion

Congratulations! You have successfully learned how to implement Account Abstraction in your Base projects using Biconomy.

To learn more about Account Abstraction and Biconomy, check out the following resources:

- [Biconomy Documentation](https://docs.biconomy.io/)
- [Account Abstraction on Base](https://docs.base.org/tools/account-abstraction)
