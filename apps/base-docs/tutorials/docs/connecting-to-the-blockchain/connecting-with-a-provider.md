---
<<<<<<<< HEAD:apps/base-docs/tutorials/docs/intro-to-providers.md
title: 'Introduction to Providers'
slug: /intro-to-providers
description: Learn what providers are and why you need one, and configure several providers and use them to connect to the blockchain.
author: Brian Doyle
========
title: 'Connecting to the Blockchain: Connecting with a Provider'
slug: /connecting-to-the-blockchain/connecting-with-a-provider
description: Configure several providers and use them to connect to the blockchain.
>>>>>>>> 2d5ba37 (Add tutorials; initial commit):apps/base-docs/tutorials/docs/connecting-to-the-blockchain/connecting-with-a-provider.md
keywords:
  [
    blockchain providers,
    JSON RPC,
    RainbowKit,
    wagmi React hooks,
    viem,
    frontend,
    smart contract development,
    EVM,
    Next.js,
    Base,
    Base network,
    Base node providers,
    Base providers,
    blockchain development,
    dApps,
    smart contracts,
    providers,
    public providers,
    wallet providers,
    vendor providers,
    rate limits,
    blockchain API,
    Ethereum provider,
    Base,
    Base network,
    Base node providers,
    Base providers,
    QuickNode,
    Alchemy,
    API keys,
    blockchain connection,
    public provider,
    smart contract development,
  ]
hide_table_of_contents: false
displayed_sidebar: null
---

# Introduction to Providers

This guide provides an introduction to providers and shows you how to connect your frontend to the blockchain using JSON RPC blockchain providers, and the [RainbowKit], [wagmi], and [viem] stack.

---

## Objectives

By the end of these guides, you should be able to:

- Compare and contrast public providers vs. vendor providers vs. wallet providers
- Select the appropriate provider for several use cases
- Set up a provider in wagmi and use it to connect a wallet
- Protect API keys that will be exposed to the front end

---

## Prerequisites

### 1. Be familiar with modern, frontend web development

In this guide, we'll be working with a React frontend built with [Next.js]. While you don't need to be an expert, we'll assume that you're comfortable with the basics.

### 2. Possess a general understanding of the EVM and smart contract development

This guide assumes that you're reasonably comfortable writing basic smart contracts. If you're just getting started, jump over to our [Basecamp] guides and start learning!

---

## Types of Providers

Onchain apps need frontends, sometimes called dApps, to enable your users to interact with your smart contracts. A _provider_ makes the connection from frontend to the blockchain, and is used to read data and send transactions.

In blockchain development, the term _provider_ describes a company or service that provides an API enabling access to the blockchain as a service. This is distinct from the providers you wrap your app in using the [React Context API], though you'll use one of those to pass your blockchain provider deeply into your app.

These services enable interacting with smart contracts without the developer needing to run and maintain their own blockchain node. Running a node is expensive, complicated, and challenging. In most cases, you'll want to start out with a provider. Once you start to get traction, you can evaluate the need to [run your own node], or switch to a more advanced architecture solution, such as utilizing [Subgraph].

Figuring out which type of provider to use can be a little confusing at first. As with everything blockchain, the landscape changes rapidly, and search results often return out-of-date information.

:::info

New onchain devs sometimes get the impression that there are free options for connecting their apps to the blockchain. Unfortunately, this is not really true. Blockchain data is still 1's and 0's, fetched by computation and served to the internet via servers.

It costs money to run these, and you will eventually need to pay for the service.

:::

You'll encounter providers divided into three general categories: Public Providers, Wallet Providers, and Vendor Providers

### Public Providers

Many tutorials and guides, including the getting started guide for [wagmi], use a _Public Provider_ as the default to get you up and running. Public means that they're open, permissionless, and free, so the guides will also usually warn you that you need to add another provider if you don't want to run into rate limiting. Listen to these warnings! The rate-limits of public providers are severe, and you'll start getting limited very quickly.

In wagmi, the `publicClient` is just a wrapper setting up a [JSON RPC] provider using the `chain` and `rpcUrls` listed in Viem's directory of chain information. For example, you can view the [data for Base Sepolia here].

Most chains will list this information in their docs as well. For example, on the network information pages for [Base] and [Optimism]. If you wanted, you could manually set up a `jsonRpcProvider` in wagmi using this information.

### Wallet Providers

Many wallets, including Coinbase Wallet and MetaMask, inject an Ethereum provider into the browser, as defined in [EIP-1193]. The injected provider is accessible via `window.ethereum`.

Under the hood, these are also just JSON RPC providers. Similar to public providers, they are rate-limited.

Older tutorials for early libraries tended to suggest using this method for getting started, so you'll probably encounter references to it. However, it's fallen out of favor, and you'll want to use the public provider for your initial connection experiments.

### Vendor Providers

A growing number of vendors provide access to blockchain nodes as a service. Visiting the landing pages for [QuickNode] or [Alchemy] can be a little confusing. Each of these vendors provides a wide variety of services, SDKs, and information.

Luckily, you can skip most of this if you're just trying to get your frontend connected to your smart contracts. You'll just need to sign up for an account, and get an endpoint, or a key, and configure your app to connect to the provider(s) you choose.

It is worth digging in to get a better understanding of how these providers charge you for their services. The table below summarizes some of the more important API methods, and how you are charged for them by each of the above providers.

Note that the information below may change, and vary by network. Each provider also has different incentives, discounts, and fees for each level of product. They also have different allowances for calls per second, protocols, and number of endpoints. Please check the source to confirm!

|                 | [Alchemy Costs]  | [QuickNode Costs] |
| :-------------- | :--------------- | :---------------- |
| Free Tier / Mo. | 3M compute units | 50M credits       |
| Mid Tier / Mo.  | 1.5B CUs @ $199  | 3B credits @ $299 |
| eth_blocknumber | 10               | 20                |
| eth_call        | 26               | 20                |
| eth_getlogs     | 75               | 20                |
| eth_getbalance  | 19               | 20                |

To give you an idea of usage amounts, a single wagmi `useContractRead` hook set to `watch` for changes on a single `view` will call `eth_blocknumber` and `eth_call` one time each, every 4 seconds.

---

## Connecting to the Blockchain

[RainbowKit] is a popular library that works with [wagmi] to make it easy to connect, disconnect, and change between multiple wallets. It's batteries-included out of the box, and allows for a great deal of customization of the list of wallets and connect/disconnect button.

We'll be using RainbowKit's [quick start] to scaffold a new project for this guide.

:::info

The script doesn't allow you to use `.` to create a project in the root of the folder you run it from, so you'll want to run it from your `src` directory, or wherever you keep your project folders.

It will create a folder with the project name you give, and create the files inside.

:::

Open up a terminal and run:

```bash
yarn create @rainbow-me/rainbowkit
```

Give your project a name, and wait for the script to build it. It will take a minute or two.

### Scaffolded App

Open your new project in the editor of your choice, and open `pages/_app.tsx`. Here, you'll find a familiar Next.js app wrapped in [context providers] for RainbowKit and wagmi.

```typescript
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <wagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </wagmiConfig>
  );
}
```

Note that these providers are using React's context feature to pass the blockchain providers and configuration into your app. It can be confusing to have the word _provider_ meaning two different things in the same file, or even the same line of code!

Before you can do anything else, you need to obtain a _WalletConnect_ `projectId`.

Open up the [WalletConnect] homepage, and create an account, and/or sign in using the method of your choice.

Click the `Create` button in the upper right of the `Projects` tab.

![Create Button](../../../assets/images/connecting-to-the-blockchain/wallet-connect-create-button.png)

Enter a name for your project, select the `App` option, and click `Create`.

![Project Information](../../../assets/images/connecting-to-the-blockchain/add-project-information.png)

Copy the _Project ID_ from the project information page, and paste it in as the `projectId` in `getDefaultWallets`.

```typescript
const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});
```

:::caution

Remember, anything you put on the frontend is public! That includes this id, even if you use environment variables to better manage this type of data. Next.js reminds you of the risk, by requiring you to prepend `NEXT_PUBLIC_` to any environment variables that can be read by the browser.

Before you deploy, make sure you configure the rest of the items in the control panel to ensure only your site can use this id.

:::

### Public Provider

By default, the setup script will configure your app to use the `publicProvider()`, and connect to a number of popular chains. To simply matters, remove all but `mainnet` and `base`.

```typescript
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, base],
  [publicProvider()],
);
```

Open the terminal and start the app with:

```bash
yarn run dev
```

Click the `Connect Wallet` button, select your wallet from the modal, approve the connection, and you should see your network, token balance, and address or ENS name at the top of the screen. Select your wallet from the modal.

![RainbowKit modal](../../../assets/images/connecting-to-the-blockchain/rainbowkit-modal.png)

You've connected with the Public Provider!

![Connected](../../../assets/images/connecting-to-the-blockchain/connected.png)

### QuickNode

Notice that the [`configureChains`] function takes in an array of providers. It will attempt to use each one in the order provided, falling back to the next in the list in order if something goes wrong. You can use this for redundancy, or to smoothly handle scenarios where your app needs to connect with a chain that isn't supported by your preferred provider.

Let's add [QuickNode] to the list. It isn't [included in the library] by default, so you'll need to add it using the generic [JSON RPC provider] import.

```typescript
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
```

Unlike the linked example indicates, you do **not** need to add an import `chain` from `'wagmi'`, unless you're setting up a more complex provider configuration and want to dynamically build RPC urls for multiple chains.

You do need an RPC URL, so open up [QuickNode]'s site and sign up for an account if you need to. The free tier will be adequate for now, you may need to scroll down to see it. Once you're in, click `Endpoints` on the left side, then click `+ Create Endpoint`.

On the next screen, you'll be asked to select a chain. Each endpoint only works for one. Select `Base`, click `Continue`.

![Select Chain](../../../assets/images/connecting-to-the-blockchain/quicknode-select-chain.png)

For now, pick `Base Mainnet`, but you'll probably want to delete this endpoint and create a new one for Sepolia when you start building. The free tier only allows you to have one at a time.

If you haven't already picked a tier, you'll be asked to do so, then you'll be taken to the endpoints page, which will display your endpoints for HTTP and WSS.

:::caution

As with your WalletConnect Id, these endpoints will be visible on the frontend. Be sure to configure the allowlist!

:::

Use these endpoints to add a `jsonRpcProvider` to your array of providers:

```typescript
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, base],
  [
    jsonRpcProvider({
      rpc: () => ({
        http: 'https://endpoint-name.quiknode.pro/<key>/',
        webSocket: 'wss://endpoint-name.quiknode.pro/<key>/',
      }),
    }),
    publicProvider(),
  ],
);
```

Now, the app will use your QuickNode endpoint for the Base network, and fall back to the public provider for others.

To test this out, comment out `publicProvider()`, and switch networks a few times. Unfortunately, wagmi won't generate an error when you try to connect to a network unsupported by the provider, but you will notice that the wallet balance is only shown correctly for Base, and no longer updates when you switch to other networks.

### Alchemy

[Alchemy] is [baked into wagmi], but you still need an account and a key. Create an account and/or sign in, navigate to the `Apps` section in the left sidebar, and click `Create new app`.

![Alchemy new app](../../../assets/images/connecting-to-the-blockchain/alchemy-new-app.png)

Select Base Mainnet, and give your app a name.

:::caution

Once again, remember to configure the [allowlist] when you publish your app, as you'll be exposing your key to the world!

:::

On the dashboard for your new app, click the `API key` button, and copy the key to the clipboard.

Import `alchemyProvider`, then add it to your list of providers:

```typescript
import { alchemyProvider } from 'wagmi/providers/alchemy';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, base],
  [
    // other providers
    alchemyProvider({ apiKey: 'yourAlchemyApiKey' }),
    publicProvider(),
  ],
);
```

As before, you can confirm the Alchemy Provider is working by commenting out the others and changing the network.

---

## Conclusion

In this guide, you've learned how Providers supply blockchain connection as a service, eliminating the need for developers to run and maintain their own nodes. You also learned how to connect your app to the blockchain using several different providers, including the public provider(s).

---

[Basecamp]: https://base.org/camp
[Next.js]: https://nextjs.org/
[RainbowKit]: https://rainbowkit.com/
[wagmi]: https://wagmi.sh/
[viem]: https://viem.sh/
[wagmi]: https://wagmi.sh
[quick start]: https://www.rainbowkit.com/docs/installation
[context providers]: https://react.dev/learn/passing-data-deeply-with-context
[WalletConnect]: https://cloud.walletconnect.com/
[`configureChains`]: https://wagmi.sh/react/providers/configuring-chains
[included in the library]: https://github.com/wagmi-dev/wagmi/tree/main/packages/core/src/providers
[JSON RPC provider]: https://wagmi.sh/react/providers/jsonRpc
[Alchemy]: https://www.alchemy.com/
[QuickNode]: https://www.quicknode.com/
[allowlist]: https://docs.alchemy.com/docs/how-to-add-allowlists-to-your-apps-for-enhanced-security
[baked into wagmi]: https://wagmi.sh/react/providers/alchemy
[smart contract development]: https://base.org/camp
[Subgraph]: https://thegraph.com/docs/en/developing/creating-a-subgraph/
[data for Base Sepolia here]: https://github.com/wagmi-dev/viem/blob/main/src/chains/definitions/baseSepolia.ts
[Base]: https://docs.base.org/network-information
[Optimism]: https://community.optimism.io/docs/useful-tools/networks/
[EIP-1193]: https://eips.ethereum.org/EIPS/eip-1193
[QuickNode]: https://www.quicknode.com/
[Alchemy Costs]: https://docs.alchemy.com/reference/compute-unit-costs
[QuickNode Costs]: https://www.quicknode.com/api-credits/base
[smart contract development]: https://base.org/camp
[run your own node]: https://docs.base.org/guides/run-a-base-node
[React Context API]: https://react.dev/learn/passing-data-deeply-with-context
