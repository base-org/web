---
title: 'Account Abstraction: Implementing the Base Paymaster'
slug: /account-abstraction/implementing-the-paymaster
description: Learn how to use Privy for authentication in onchain apps.
author: Brian Doyle
keywords: [Privy, Account Abstraction, Base Paymaster, Account Kit, ERC-4337]
hide_table_of_contents: false
displayed_sidebar: null
---

A _paymaster_ is a type of smart contract account, introduced in [ERC-4337], that is able to pay for gas on behalf of another account. In this step-by-step, you'll modify an example created by [Privy], move it to another onchain app, and use it to call a smart contract function. Along the way, you'll encounter and resolve some of the confusing pitfalls associated with working with smart contract accounts.

:::caution

The tutorial below does not account for recent changes to the [Base Paymaster]. Please reference the linked repo and adjust. We'll update the tutorial soon!

:::

---

## Objectives

By the end of this guide you should be able to:

- Describe how a third party can use a _paymaster_ to sponsor gas
- Modify Privy's Base [paymaster example] example to work in another app, using an EOA to allow a user to call a smart contract function without requiring the user to pay any gas

---

## Reviewing the Example

Start by reviewing the [paymaster example]. The address in the `about` section of the Github page links to a deployed version of the app. It's the same app you get from [Privy's Quick Start], with the addition of a mint button (the versions may be a little older).

The app is limited to social auth, so log in with either your Google account or email. You'll see the dashboard, with the addition of a `Mint NFT` button at the top.

Click the button and you'll see a toast notification informing you of updates to the transaction status. Note that this happens **without** you needing to approve a transaction or fund a wallet!

Click to see the transaction when it's done to open BaseScan. If you missed it, mint another NFT, it's not like you're paying gas!

---

## Reviewing the Transaction and Contract

The transaction page should appear fairly standard. You can see from it that an NFT was minted by the [NFT Contract] and transferred to the smart wallet address listed on the dashboard. Digging in a little more, you'll see some things that might be different than what you'd expect.

### Tokens Transferred and the NFT Contract

In the `ERC-721 Tokens Transferred` section, click the link to `NFT Name (NFT)` to open up the overview page for the token. You'll see a list of transfers, with yours likely on the top. Click the address for the contract to open up the [view for the contract itself].

You may be surprised to see that there are very few transactions listed for this contract, despite the list of transfers you can see on the token page, or the `Events` tab. Currently, Etherscan and BaseScan won't display transactions done via the paymaster.

:::caution

Blockchain explorers are service providers that provide information about the state of various blockchains. They are **not** a source of truth.

It is possible for onchain activity to be missing from these services.

:::

### The Bundler (Transaction Sender)

Return to the transactions summary and look at the `From:` field. It will contain `0x1e6754b227c6ae4b0ca61d82f79d60660737554a`. What is this address? It's not your smart wallet address or signer address. If you mint another NFT from a different login, you'll get the same sender.

This address is the [bundler], which is a special node that bundles user operations from the alt mempool into a single transaction and sends them to the single [EntryPoint] contract.

### EntryPoint

The EntryPoint contract for Base Goerli is located at `0x5ff137d4b0fdcd49dca30c7cf57e578a026d2789`. Strangely, in your transaction receipt you'll see that the transaction includes a transfer of ETH **from** the EntryPoint **to** the bundler. This transaction is how the bundler gets compensated for performing the service of bundling user ops and turning them into transactions -- the EntryPoint calculates the gas used by user ops and multiplies that by the fee percentage and send it to the bundler.

---

## Review the Example Code

Return to the [paymaster example] and review the readme. The section on _Copying into your code_ lists the three files you'll need to copy over to implement the paymaster in your own app. All three are extensively documented via comments. You'll also want to review how the demo app uses these to call a function.

### `SmartAccountContext.tsx`

The first file, [`hooks/SmartAccountContext.tsx`] uses a React Context provider to create a ` SmartAccountProvider`` and pass it into your app. You can see it in use in  `\_app.tsx`, with the regular `PrivyProvider` around it. Review the file in detail.

Starting on line 63, the exported `SmartAccountProvider` does the following:

1. Fetch the user's wallets and find their Privy wallet. This wallet is provided, and if need be created, by the `PrivyProvider`
1. Set up state variables to manage and share connection status and the smart account itself
1. Initialize an RPC client for the [Base Paymaster] (on Goerli). The URL is hardcoded in `lib/constants.ts`
1. Initialize an ERC-4337 RPC client for Alchemy's network. This network is where the bundler address comes from
1. Create a smart wallet. In this case, the `signer` is your EOA embedded wallet created by Privy and fetched in the first step
1. The EOA address is displayed in the example app as `YOUR SIGNER ADDRESS`
1. Initialize an Alchemy provider for the smart account signer, using Alchemy's [Account Kit].
1. This creates the smart account and its address, which is displayed in the example app as `YOUR SMART WALLET ADDRESS`

Finally, the `sendSponsoredUserOperation` function takes a traditional transaction, turns it into a user operation, adds the data for the paymaster to pay the gas, signs it, and sends it. Whew!

If you want a deeper dive into the inner workings of this process, review the helper functions in [`user-operations.ts`].

### How to Call a Smart Contract Function with the Paymaster

Open [`pages/dashboard.tsx`] and take a look at the `onMint` function on line 32. This function is used as the `oncClick` handler for the `Mint` button at the top of the dashboard.

If you're used to working with wagmi, you'll find the process of sending and awaiting for confirmation of a transaction a little on the manual side. Most of this will be familiar if you've used viem directly, or have worked with _Ethers_.

When a user clicks, the app first creates a viem `RpcTransactionRequest` for the `mint` function on the smart contract. The `smartContractAddress` is supplied by the `SmartAccountProvider`, and the `ABI` and contract `NFT_ADDRESS` are loaded from `lib/constants.ts`:

```typescript
{
  from: smartAccountAddress,
  to: NFT_ADDRESS,
  data: encodeFunctionData({
    abi: ABI,
    functionName: "mint",
    args: [smartAccountAddress],
  }),
}
```

The app then updates the toast component to update the users while it `await`s first the `userOpHash`, then the `transactionHash`, indicating that transaction has completed successfully. It then updates the link in the toast to send the user to that transaction on Goerli BaseScan.

---

## Implementing the Paymaster in your own App

Create a new project using Privy's [`create-next-app`] template, and complete the setup instructions in the readme.

Add an environment variable for `NEXT_PUBLIC_ALCHEMY_API_KEY` and paste in the an API key for a Base Goerli app. If you need a key, go to [add an app] and create a new one.

### Copying and Updating the Source Files

Copy the `hooks` and `lib` folders into your _new_ project. You'll need to install some more dependencies. Use `npm` or `yarn` to add:

- viem
- react-dom
- @alchemy/aa-accounts
- @alchemy/aa-alchemy
- @alchemy/aa-core

Open `SmartAccountContext.tsx` in your project. You'll see an error for `getDefaultLightAccountFactory`. The name of this function has been updated to `getDefaultLightAccountFactoryAddress`. Change it in the import, and where it is used in the file in the call to `LightSmartContractAccount`.

### Updating to Use the User's Wallet

The app is currently configured to find and use the user's embedded Privy wallet as the signer. To change this, modify the instantiation of the `SmartAccountProvider`. Instead of `find`ing the user's Privy wallet:

```typescript
// Old code to change

// Get a list of all of the wallets (EOAs) the user has connected to your site
const { wallets } = useWallets();
// Find the embedded wallet by finding the entry in the list with a `walletClientType` of 'privy'
const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === 'privy');
```

Simply grab the first wallet in the list (you'll want to do something more elegant for a production app):

```typescript
// Updated Code

// Get a list of all of the wallets (EOAs) the user has connected to your site
const { wallets } = useWallets();

// Grab the first wallet on the list
// TODO: Implement the option to allow the user to choose another wallet
const wallet = wallets[0];
```

Then, update the call at the bottom of `useEffect` to `createSmartWallet` if there is an `embeddedWallet` to instead create it if there is a `wallet`, using that `wallet`. You'll also need to update the dependency in the dependency array.

```typescript
useEffect(() => {
  // Other code

  if (wallet) createSmartWallet(wallet);
}, [wallet?.address]);
```

### Configuring the PrivyProvider and Adding SmartAccountProvider

By default, the `PrivyProvider` allows logging in with a wallet or email address. To limit it to only the wallet, update the config. You can also set the default chain here. You'll need to import `baseGoerli` to do so.

You also need to import and wrap the app with `SmartAccountProvider`, imported from `hooks/SmartAccountContext.tsx`.

:::warning

The `@alchemy/aa-core` package also exports `SmartAccountProvider` and this export takes precedence when VSCode attempts to help you by automatically adding the import. You'll know you've got the wrong one if `SmartAccountProvider` generates an error that:

```text
'SmartAccountProvider' cannot be used as a JSX component.
Its instance type 'SmartAccountProvider<Transport>' is not a valid JSX element.
```

:::

```typescript
<PrivyProvider
  appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
  onSuccess={() => router.push('/dashboard')}
  config={{
    loginMethods: ['wallet'],
    defaultChain: baseGoerli,
  }}
>
  <SmartAccountProvider>
    <Component {...pageProps} />
  </SmartAccountProvider>
</PrivyProvider>
```

### Checking Progress

Grab the snippet from the original demo that displays the user's addresses, and add it to `dashboard.tsx` in the new project:

```typescript
<p className="mt-6 font-bold uppercase text-sm text-gray-600">
  Your Smart Wallet Address
</p>
<a
  className="mt-2 text-sm text-gray-500 hover:text-violet-600"
  href={`${BASE_GOERLI_SCAN_URL}/address/${smartAccountAddress}#tokentxnsErc721`}
>
  {smartAccountAddress}
</a>
<p className="mt-6 font-bold uppercase text-sm text-gray-600">
  Your Signer Address
</p>
<a
  className="mt-2 text-sm text-gray-500 hover:text-violet-600"
  href={`${BASE_GOERLI_SCAN_URL}/address/${eoa?.address}`}
>
  {eoa?.address}
</a>
```

Paste it above the `<p>` for the `User Object` window.

You'll need to import `BASE_GOERLI_SCAN_URL` from `constants.ts`. The `useSmartAccount` hook returns `smartAccountProvider` and `eoa`. Import it and add it under the `usePrivy` hook. You don't need them just yet, but go ahead and decompose `smartAccountProvider` and `sendSponsoredUserOperation` as well:

```typescript
const router = useRouter();
const {
  ready,
  authenticated,
  user,
  logout,
  linkEmail,
  linkWallet,
  unlinkEmail,
  linkPhone,
  unlinkPhone,
  unlinkWallet,
  linkGoogle,
  unlinkGoogle,
  linkTwitter,
  unlinkTwitter,
  linkDiscord,
  unlinkDiscord,
} = usePrivy();
const { smartAccountAddress, smartAccountProvider, sendSponsoredUserOperation, eoa } =
  useSmartAccount();
```

Run the app. You'll now see your familiar wallet address as `YOUR SIGNER ADDRESS`!

```caution

The app sometimes gets confused with login state after you've made changes to `config`.  If you see the `Log In` button but clicking it does nothing, try manually navigating to `localhost:3000/dashboard` or clearing the cache.

```

### Calling a Smart Contract Function

You've adjusted the foundation of the app to allow you to use the Base Goerli Paymaster with your normal wallet as the signer. Now, it's time to call a smart contract function.

Start by using the `mint` function in the original example. In the `DashboardPage` component, add a state variable holding an empty element:

```typescript
const [transactionLink, setTransactionLink] = useState(<></>);
```

Then, add a variant of the original `onMint` function that sets this variable and has the code related to the toast removed.

**Note:** make sure you change your wallet address in `args` to make sure the NFT is sent to your EOA wallet address!

```typescript
const onMint = async () => {
  // The mint button is disabled if either of these are undefined
  if (!smartAccountProvider || !smartAccountAddress) return;

  try {
    // From a viem `RpcTransactionRequest` (e.g. calling an ERC-721's `mint` method),
    // build and send a user operation. Gas fees will be sponsored by the Base Paymaster.
    const userOpHash = await sendSponsoredUserOperation({
      from: smartAccountAddress,
      to: NFT_ADDRESS,
      data: encodeFunctionData({
        abi: ABI,
        functionName: 'mint',
        args: [eoa?.address],
      }),
    });

    // Once we have a hash for the user operation, watch it until the transaction has
    // been confirmed.
    const transactionHash = await smartAccountProvider.waitForUserOperationTransaction(userOpHash);

    setTransactionLink(
      <a href={`${BASE_GOERLI_SCAN_URL}/tx/${transactionHash}`}>
        Successfully minted! Click here to see your transaction.
      </a>,
    );
  } catch (error) {
    setTransactionLink(<p>{'Mint failed with error: ' + error}</p>);
  }
};
```

Finally, above where you added the addresses, add a button to call the function, and display the link to the transaction:

```typescript
<button
  onClick={onMint}
  className="rounded-md bg-violet-600 px-4 py-2 text-sm text-white hover:bg-violet-700 disabled:bg-violet-400"
  disabled={!smartAccountProvider || !smartAccountAddress}
>
  Mint NFT
</button>;
{
  transactionLink;
}
```

Run it and confirm it works. You need the full transaction receipt for the process to finish, so expect to wait as long as 10 or 15 seconds.

:::caution

For simplicity, we've stripped out the code to disable the button while it is minting. You'll want to implement your own solution to avoid confusing your users!

:::

### Calling Another Function

The [Base Paymaster] on Goerli is very permissive. To call another function, all you need to do is to change the `RpcTransactionRequest` in `sendSponsoredUserOperation` to match the address, abi, function name, and arguments of your function on your smart contract.

For example, to call the `claim` function in the Weighted Voting contract we've used in other guides, you'd simply need to import the Hardhat-style [artifact] for the contract and use it to call the function:

```typescript
const userOpHash = await sendSponsoredUserOperation({
  from: smartAccountAddress,
  to: weightedVoting.address as `0x${string}`,
  data: encodeFunctionData({
    abi: weightedVoting.abi,
    functionName: 'claim',
  }),
});
```

:::caution

The function in this example can only be called once per address. It will then fail, because one wallet cannot claim more than one batch of tokens.

:::

---

## Conclusion

In this guide you've analyzed an implementation of _Account Abstraction_ that uses [Privy] and the [Base Paymaster] to allow users to perform onchain actions **without** having to pay gas. You then modified that example to implement it in a new app and call a different function on a different contract. In doing so, you examined the inner workings of this process and learned how to change it to fit your needs.

[Privy]: https://www.privy.dev/
[https://docs.privy.io/guide/frontend/embedded/overview]: https://docs.privy.io/guide/frontend/embedded/overview
[Alchemy's Account Kit]: https://www.alchemy.com/account-kit
[Privy's Quick Start]: https://docs.privy.io/guide/quickstart
[https://github.com/privy-io/create-next-app]: https://github.com/privy-io/create-next-app
[`PrivyClientConfig`]: https://docs.privy.io/reference/react-auth/modules#privyclientconfig
[documented here]: https://docs.privy.io/reference/react-auth/interfaces/PrivyInterface
[securely stored]: https://docs.privy.io/guide/security#user-data-management
[paymaster example]: https://github.com/privy-io/base-paymaster-example/blob/main/README.md
[ERC-4337]: https://eips.ethereum.org/EIPS/eip-4337
[NFT Contract]: https://goerli.basescan.org/address/0x6527e5052de5521fe370ae5ec0afcc6cd5a221de
[view for the contract itself]: https://goerli.basescan.org/address/0x6527e5052de5521fe370ae5ec0afcc6cd5a221de
[Base Paymaster]: https://github.com/base-org/paymaster
[EntryPoint]: https://github.com/eth-infinitism/account-abstraction/releases
[bundler]: https://www.alchemy.com/overviews/what-is-a-bundler
[`create-next-app`]: https://github.com/privy-io/create-next-app
[add an app]: https://dashboard.alchemy.com/apps
[Account Kit]: https://www.alchemy.com/blog/introducing-account-kit
[`hooks/SmartAccountContext.tsx`]: https://github.com/privy-io/base-paymaster-example/blob/main/hooks/SmartAccountContext.tsx
[`user-operations.ts`]: https://github.com/privy-io/base-paymaster-example/blob/main/lib/user-operations.ts
[`pages/dashboard.tsx`]: https://github.com/privy-io/base-paymaster-example/blob/main/pages/dashboard.tsx
[artifact]: https://gist.github.com/briandoyle81CB/2c2849b5723058792bece666f0a318cb
