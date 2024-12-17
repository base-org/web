---
title: 'Create Onchain Subscription Payments with Spend Permissions'
slug: /create-subscription-payments-with-spend-permissions
description: Learn how to implement a smart wallet signer for a subscription payment application.
author: hughescoin
keywords: [smart wallet, onchain, spend permissions, smart account, account abstraction]
tags: ['frontend', 'account abstraction']
difficulty: medium
hide_table_of_contents: false
displayed_sidebar: null
---

# Create Onchain Subscription Payments with Spend Permissions

Before Smart Wallets, onchain apps primarily prompted users to sign and approve transactions. Now, apps can have their own wallets (App Wallets), enabling them to do more onchain. This is possible through Smart Wallets (ERC-4337).

In this guide, we'll integrate an App Wallet to facilitate subscription payments for users purchasing goods from a fictitious e-commerce store.

Your App Wallet can be any public/private keypair wallet. However, our App Wallet will be an ERC-4337 smart account. Using a smart wallet provides advantages such as the programmability to facilitate payouts, gas sponsorship with paymasters, and the ability to avoid storing funds directly in the wallet. Additionally, with a paymaster and a smart wallet, gas costs can be covered by the app or funded using the user's payment method, including ERC-20 tokens.

## Prerequisites:

### Coinbase CDP account[​](https://docs.base.org/tutorials/gasless-transaction-on-base-using-a-paymaster/#coinbase-cdp-account "Direct link to Coinbase CDP account")

This is your access point to the Coinbase Cloud Developer Platform, where you can manage projects and utilize tools like the Paymaster. 

### Familiarity with Smart Accounts and ERC 4337[​](https://docs.base.org/tutorials/gasless-transaction-on-base-using-a-paymaster/#familiarity-with-smart-accounts-and-erc-4337 "Direct link to Familiarity with Smart Accounts and ERC 4337")

Understand the basics of Smart Accounts and the ERC-4337 standard for advanced transaction patterns and account abstractions.

### Familiarity with wagmi/viem

Wagmi/viem are two libraries that enable smart contract interaction using typescript. It makes onchain development smoother and what you will use to create smart accounts, functions, etc. It easily allows onchain developers to use the same skillsets from Javascript/typescript and frontend development and bring it onchain.


## Objectives

* Create a smart account from a public/private keypair.
* Enable a smart account to receive subscription payments.
* Set up the App Wallet with a paymaster.

## Template Project

Let's first start at a common place. Clone the template e-commerce store:

```bash
git clone https://github.com/hughescoin/healing-honey.git

bun install
```
If you don’t have an existing keypair, follow these steps to generate one using Foundry:

Install foundry if you don't have it.
```sh
curl -L https://foundry.paradigm.xyz | bash
```

Then, create a private key pair:
```bash
cast wallet new
```

It should output something similar to this:
```bash
Successfully created new keypair.

Address: 0x48155Eca1EC9e6986Eef6129A0024f84B8483B59

Private key: 0xcd57753bb4e308ba0c6f574e8af04a7bae0ca0aff5750ddd6275460f49635527
```

Excellent, now that you have your keypair, let's start building out our `.env` file with the appropriate values.

Open the `.env` file from Healing Honey project and add the private key to the file 

```bash
SPENDER_PRIVATE_KEY=0xcd57753bb4e308ba0c6f574e8af04a7bae0ca0aff5750ddd6275460f49635527
```
Now let's get the other environment variable values.

Navigate to [CDP](https://portal.cdp.coinbase.com/) to get your Paymaster URL and API key.

They can be found by navigating to Onchain Tools > [Paymaster] > Configuration.  

![cdp-config](apps/base-docs/assets/images/paymaster-tutorials/cdp-copy-endpoint.png)

Copy the **Base Sepolia** (Base testnet) Paymaster URL and API Key then update your .env file:

```bash
BASE_SEPOLIA_PAYMASTER_URL=https://api.developer.coinbase.com/rpc/v1/base-sepolia/YOUR_API_KEY
CDP_API_KEY=YOUR_API_KEY
NEXT_PUBLIC_ONCHAINKIT_API_KEY=YOUR_API_KEY
```

:::tip
For your `CDP_API_KEY` and `NEXT_PUBLIC_ONCHAINKIT_API_KEY`, extract the alphanumeric string that comes **after the `base-sepolia` path** in your Paymaster URL.

For example, if your Paymaster URL is: `https://api.developer.coinbase.com/rpc/v1/base-sepolia/JJ8uIiSMZWgCOyL0EpJgNAf0qPegLMC0`


The API key would be: `JJ8uIiSMZWgCOyL0EpJgNAf0qPegLMC0`
:::


Your  `.env` file should look like this:

```bash
COINBASE_COMMERCE_API_KEY="f3cbce52-6f03-49b1-ab34-4fe9e1311d9a"

CDP_API_KEY="JJ8uIiSMZWgCOyL0EpJgNAf0qPegLMC0"

NEXT_PUBLIC_ENVIRONMENT=localhost

SPENDER_PRIVATE_KEY=0xa72d316dd59a9e9a876b80fa2bbe825a9836e66fd45d87a2ea3c9924a5b131a1

NEXT_PUBLIC_SPENDER_ADDRESS=

NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME=Healing Honey Shop

NEXT_PUBLIC_ONCHAINKIT_API_KEY="JJ8uIiSMZWgCOyL0EpJgNAf0qPegLMC0"

BASE_SEPOLIA_PAYMASTER_URL=https://api.developer.coinbase.com/rpc/v1/base-sepolia/JJ8uIiSMZWgCOyL0EpJgNAf0qPegLMC0
```

You'll notice that the `NEXT_PUBLIC_SPENDER_ADDRESS` is empty. this is because we will need to compute the public address. Let's do that now

To create a Smart Contract Account (also known as [Smart Wallets](https://www.coinbase.com/wallet/smart-wallet)) from a private key, we'll need to use the account abstraction tools provided by Viem that takes our `SPENDER_PRIVATE_KEY` as the parameter and converts. this to a smart account. Once the smart account is created, we'll log it's address in our console and then add it to your `.env` file.  

First, update the `tsconfig.jso`n file: Change the `module` type to `commonjs`:

```bash
"module": "commonjs"
```

With your `module` set to `commonjs` you can now create a file to run the script.

In the root of your project create a file called `generateSmartWalletAddress.ts` and add the following code:
```ts
import { createPublicClient, Hex, http } from 'viem';
import { baseSepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import { toCoinbaseSmartAccount } from 'viem/account-abstraction';
import dotenv from 'dotenv';

dotenv.config();

export async function logSpenderSmartContractWalletAddress() {
  const client = createPublicClient({
    chain: baseSepolia,
    transport: http(),
  });

  const spenderAccountOwner = privateKeyToAccount(
    process.env.SPENDER_PRIVATE_KEY! as Hex
  );
  console.log('spenderAccountOwner', spenderAccountOwner.address);

  const spenderAccount = await toCoinbaseSmartAccount({
    client,
    owners: [spenderAccountOwner],
  });
  console.log('Spender Smart Wallet Address:', spenderAccount.address);
}

async function main() {
  await logSpenderSmartContractWalletAddress();
}

if (require.main === module) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
  }
```

Save it then run the following:

```bash
bun install -g ts-node typescript @types/node dotenv && ts-node generateSmartWalletAddress.ts
```

This script installs ts-node along with typescript and runs the script made in the previous step.

Your terminal should output something similar to this:

```bash
spenderAccountOwner 0x2a83b0e4462449660B6E7567b2C808Bud04d877D
Spender Smart Wallet Address: 0x2269Cc26eBEc78C0fB04c26edDdc65FE15807C8E
```

You may now add the Spender Smart Wallet Address to the `.env` file :

```bash
NEXT_PUBLIC_SPENDER_ADDRESS=0x2269Cc26eBEc78C0fB04c26edDdc65FE15807C8E
```

Revert the module changes made in the `tsconfig.json` file  back to `esnext`

## Creating the Smart Spender

Create a file `smartSpender.ts` under `app/lib`

```ts
import { createPublicClient, createWalletClient, Hex, http } from 'viem';
import { baseSepolia } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';
import {
  createBundlerClient,
  createPaymasterClient,
  toCoinbaseSmartAccount,
} from 'viem/account-abstraction';

export async function getPublicClient() {
  const client = createPublicClient({
    chain: baseSepolia,
    transport: http(),
  });
  return client;
}
export async function getSpenderBundlerClient() {
  const client = createPublicClient({
    chain: baseSepolia,
    transport: http(),
  });

  const spenderAccountOwner = privateKeyToAccount(
    process.env.SPENDER_PRIVATE_KEY! as Hex
  );

  console.log({ spenderAccountOwner });
  const spenderAccount = await toCoinbaseSmartAccount({
    client,
    owners: [spenderAccountOwner],
  });
  console.log({ spenderAccount: spenderAccount });
  const paymasterClient = createPaymasterClient({
    transport: http(process.env.BASE_SEPOLIA_PAYMASTER_URL),
  });

  const spenderBundlerClient = createBundlerClient({
    account: spenderAccount,
    client,
    paymaster: paymasterClient,
    transport: http(process.env.BASE_SEPOLIA_PAYMASTER_URL),
  });

  return spenderBundlerClient;
}
```

Now that you have a `smartSpender` set up with an address you will need to create a function that tells your app to transfer the user's subscription payment to the `smartSpender`'s wallet in the `collect/route.tsx` file.

Currently the `route.tsx` file is programmed to have our Spender make onchain actions using a Externally Owned Account (EOA) which is the more common/traditional wallet.  This can be observed by looking at the `getSpenderWalletClient()` which requries a private key in order to interact onchain.

:::tip

An easy way to tell if a function is making onchain calls using a Smart Wallet is if it uses a [userOperation](https://www.biconomy.io/post/decoding-entrypoint-and-useroperation-with-erc-4337-part1). EOAs do not use userOperations; instead, they sign transactions themselves and post them directly onchain.

:::

You want the application to use the Smart Account while still maintaining functionality for EOAs in the future. To achieve this, let's create two functions: one for making calls using an EOA and another for using a Smart Account.

Create a function called `transactUsingEOA` that takes two parameters: `spendPermission` (of type `any`) and `signature` (of type `any`). Then, paste the logic from the current `POST` function into the `transactUsingEOA` function.

Your `transactUsingEOA` function should look like this:


```ts
async function transactUsingEOA(spendPermission: any, signature: any) {
  const spenderBundlerClient = await getSpenderWalletClient();
  const publicClient = await getPublicClient();

  const approvalTxnHash = await spenderBundlerClient.writeContract({
    address: spendPermissionManagerAddress,
    abi: spendPermissionManagerAbi,
    functionName: "approveWithSignature",
    args: [spendPermission, signature],
  });

  const approvalReceipt = await publicClient.waitForTransactionReceipt({
    hash: approvalTxnHash,
  });

  const spendTxnHash = await spenderBundlerClient.writeContract({
    address: spendPermissionManagerAddress,
    abi: spendPermissionManagerAbi,
    functionName: "spend",
    args: [spendPermission, "1"],
  });

  const spendReceipt = await publicClient.waitForTransactionReceipt({
    hash: spendTxnHash,
  });

  return {
    success: spendReceipt.status == "success",
    transactionHash: spendReceipt.transactionHash,
  };
}
```

Now let's create a function for transacting using the Smart Account you created earlier.

In the same file, create a function named `transactUsingSmartWallet` that takes the same parameters.


```ts
async function transactUsingSmartWallet(spendPermission: any, signature: any) {
  const spenderBundlerClient = await getSpenderBundlerClient();
  const userOpHash = await spenderBundlerClient.sendUserOperation({
    calls: [
      {
        abi: spendPermissionManagerAbi,
        functionName: "approveWithSignature",
        to: spendPermissionManagerAddress,
        args: [spendPermission, signature],
      },
      {
        abi: spendPermissionManagerAbi,
        functionName: "spend",
        to: spendPermissionManagerAddress,
        args: [spendPermission, BigInt(1)], // spend 1 wei
      },
    ],
  });

  const userOpReceipt = await spenderBundlerClient.waitForUserOperationReceipt({
    hash: userOpHash,
  });

  return {
    success: userOpReceipt.success,
    transactionHash: userOpReceipt.receipt.transactionHash,
  };
}
```

You'll notice that this function uses userOperations, a clear giveaway that you are using a Smart Wallet and **not** an EOA.

Now that we have separate functions for transacting with an EOA and a Smart Wallet, let's update the `POST` function to use the Smart Wallet for transactions.

```ts
export async function POST(request: NextRequest) {
  const spenderBundlerClient = await getSpenderWalletClient();
  const publicClient = await getPublicClient();
  try {
    const body = await request.json();
    const { spendPermission, signature } = body;
    const { success, transactionHash } = await transactUsingSmartWallet(
      spendPermission,
      signature
    );
 return NextResponse.json({
      status: success ? "success" : "failure",
      transactionHash: transactionHash,
      transactionUrl: `https://sepolia.basescan.org/tx/${transactionHash}`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({}, { status: 500 });
  }
}
```
> The full code sample is available [here](https://github.com/ilikesymmetry/spend-permissions-quickstart/blob/main/app/collect/route.tsx#L38)

Excellent! You just added a Smart Wallet as a backend app wallet. Now, when users click the `Subscribe` button, the component will call the `handleCollectSubscription` function, and the request will be handled by the `transactUsingSmartWallet` function.

I know what you're thinking: how can I see the valid (non-revoked) spend permissions for each user (wallet)? That's an easy one. Base provides an endpoint that allows you to retrieve valid spend permissions for an account by polling the utility API at: https://rpc.wallet.coinbase.com.

An optional step you can take is to create a "My Subscriptions" tab on your site to present users with their valid spend permissions. Below is an example of the curl request to the RPC endpoint. A sample response can be found [here](https://gist.github.com/hughescoin/d1566557f85cb2fafd281833affbe022).


```bash
curl --location 'https://rpc.wallet.coinbase.com' \
--header 'Content-Type: application/json' \
--data '{
  "jsonrpc": "2.0",
  "method": "coinbase_fetchPermissions",
  "params": [
    {
      "account": "0xfB2adc8629FC9F54e243377ffcECEb437a42934C",
      "chainId": "0x14A34",
      "spender": "0x2a83b0e4462449660b6e7567b2c81ac6d04d877d"
    }
  ],
  "id": 1
}'
```


## Conclusion 
In this tutorial you created a smart wallet by converting a private key (EOA) to a smart wallet, enableed functionality of your app to have a backend signer be a smartWallet or a traditional EOA.

Remember, our app is designed to allow for users to purchase a good repeatedly without having to sign for the transaction or make additional requests. 

---
[Paymaster]: https://portal.cdp.coinbase.com/products/bundler-and-paymaster