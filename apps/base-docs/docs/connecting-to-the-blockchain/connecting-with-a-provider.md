---
title: Connecting with a Provider
description: Configure several providers and use them to connect to the blockchain.
keywords:
  [
    RainbowKit,
    wagmi React hooks,
    blockchain providers,
    QuickNode,
    Alchemy,
    API keys,
    blockchain connection,
    public provider,
    smart contract development,
    Base,
    Base network,
    Base node providers,
    Base providers,
  ]
hide_table_of_contents: false
---

[RainbowKit] is a popular library that works with [wagmi] to make it easy to connect, disconnect, and change between multiple wallets. It's batteries-included out of the box, and allows for a great deal of customization of the list of wallets and connect/disconnect button.

---

## Objectives

By the end of this guide you should be able to:

- Set up a provider in wagmi and use it to connect a wallet
- Protect API keys that will be exposed to the front end

---

## Connecting to the Blockchain

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

Open up the [WalletConnect] homepage, and create an account and/or sign in using the method of your choice.

Click the `Create` button in the upper right of the `Projects` tab.

![Create Button](../../assets/images/connecting-to-the-blockchain/wallet-connect-create-button.png)

Enter a name for your project, select the `App` option, and click `Create`.

![Project Information](../../assets/images/connecting-to-the-blockchain/add-project-information.png)

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

![RainbowKit modal](../../assets/images/connecting-to-the-blockchain/rainbowkit-modal.png)

You've connected with the Public Provider!

![Connected](../../assets/images/connecting-to-the-blockchain/connected.png)

### QuickNode

Notice that the [`configureChains`] function takes in an array of providers. It will attempt to use each one in the order provided, falling back to the next in the list in order if something goes wrong. You can use this for redundancy, or to smoothly handle scenarios where your app needs to connect with a chain that isn't supported by your preferred provider.

Let's add [QuickNode] to the list. It isn't [included in the library] by default, so you'll need to add it using the generic [JSON RPC provider] import.

```typescript
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
```

Unlike the linked example indicates, you do **not** need to add an import `chain` from `'wagmi'`, unless you're setting up a more complex provider configuration and want to dynamically build RPC urls for multiple chains.

You do need an RPC URL, so open up [QuickNode]'s site and sign up for an account if you need to. The free tier will be adequate for now, you may need to scroll down to see it. Once you're in, click `Endpoints` on the left side, then click `+ Create Endpoint`.

On the next screen, you'll be asked to select a chain. Each endpoint only works for one. Select `Base`, click `Continue`.

![Select Chain](../../assets/images/connecting-to-the-blockchain/quicknode-select-chain.png)

For now, pick `Base Mainnet`, but you'll probably want to delete this endpoint and create a new one for Goerli or Sepolia when you start building. The free tier only allows you to have one at a time.

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

![Alchemy new app](../../assets/images/connecting-to-the-blockchain/alchemy-new-app.png)

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

In this guide, you've learned how to connect your app to the blockchain using several different providers, including the public provider(s). You've also learned that you need to use allowlists to protect your plan usage, because you'll be exposing your keys to the world. Finally, you've learned how wagmi will attempt to use each provider in order, falling back to the next in the list if one fails.

---

[wagmi]: https://wagmi.sh
[RainbowKit]: https://www.rainbowkit.com
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
