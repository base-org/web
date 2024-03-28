---
title: Building an Onchain App
description: Learn step-by-step how to turn a regular template app into an onchain app with a wallet connection.
hide_table_of_contents: false
---

While it's convenient and fast to start from a template, the template may not fit your needs. Whether you prefer a different stack, or have already started building the traditional web components of your app, it's common to need to manually add onchain libraries to get your app working.

In this guide, we'll build the beginnings of an app similar to the one created by the [RainbowKit] quick start, but we'll do it piece by piece. You can follow along, and swap out any of our library choices with the ones you prefer.

:::caution

The frontend tutorials are currently based on version 1.X of Wagmi. Version 2 has recently been released and is a near complete rewrite of the library. We are working on updates. In the meantime, please use Version 1, or review the [migration guide](https://wagmi.sh/react/guides/migrate-from-v1-to-v2).

:::

---

## Objectives

By the end of this guide you should be able to:

- Identify the role of a wallet aggregator in an onchain app
- Debate the pros and cons of using a template
- Add a wallet connection to a standard template app

---

## Creating the Traditional App

Start by running the [Next.js] script to create a Next.js 13 app:

```bash
npx create-next-app@13 --use-yarn
```

:::info
We're using specific versions of Next.js, wagmi, and viem to ensure things work as expected. It's generally a good idea to give new major versions a few months to settle, and in the fast-moving world of onchain apps, this is doubly true.
:::

This script will accept `.`, if you want to add the project to the root of a folder you've already created. Otherwise, name your project. Select each option in the generation script as you see fit. We recommend the following selections:

- Use Typescript?: Yes
- Use ESLint?: Yes
- Use Tailwind?: Your preference
- Use `src/` directory?: Yes
- Use App Router?: **No**
- Customize the default import alias?: No

:::caution
For now, we recommend that you **DO NOT** use App Router. If you do, you'll need to debug some additional config and dependency issues that are out of the scope of this guide.
:::

:::info

The default Next.js script installs [Tailwind]. [RainbowKit]'s does not.

:::

Run your app with `yarn dev` to make sure it generated correctly.

### Manually Installing RainbowKit, Wagmi, and Viem

The [quick start] guide for RainbowKit also contains step-by-step instructions for manual install. We'll be following an adjusted version here. Most of the setup is actually for configuring [wagmi], which sits on top of [viem] and makes it much easier to write React that interacts with the blockchain.

Start by installing the dependencies. Once again, we'll use specific versions to ensure compatibility. Update your `package.json` dependencies to include:

```json
    "@rainbow-me/rainbowkit": "^1.3.0",
    "viem": "^1.19.7",
    "wagmi": "^1.4.5"
```

Then run:

```bash
yarn install
```

:::info
Onchain libraries and packages tend to require very current versions of Node. If you're not already using it, you may want to install [nvm].
:::

## Adding Imports, Connectors, Config

In Next.js 13 with the pages router, the root of your app is found in `src/pages/_app_.tsx`, if you followed the recommended setup options. As we want the blockchain provider context to be available for the entire app, we'll add it here.

### Imports

Start with the imports:

```typescript
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, base, baseSepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
```

:::caution
If you're adapting this guide to a different set of libraries or platforms, you may need to import `styles.css` differently. You'll know this is the case if you get ugly text at the bottom of the page instead of a nice modal when you click the connect button.
:::

### Connectors

Now, we'll configure the chains, wallet connectors, and providers for your app. We'll use the [`publicProvider`] for now, to get started. See our guide on [Connecting to the Blockchain] for more information on blockchain providers.

```typescript
const { chains, publicClient } = configureChains([mainnet, base, baseSepolia], [publicProvider()]);
```

The default connectors provided by RainbowKit automatically enable the most popular wallets, so we'll add that next:

```typescript
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});
```

You'll need a `projectId` from [Wallet Connect Cloud], which you can get for free on their site. Make sure to insert it in the appropriate place.

```danger
Remember, everything on the frontend is public!  Be sure to configure the allowlist for your WalletConnect id!
```

### Config

Finally, add the config for wagmi:

```typescript
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
```

Setting `autoConnect` to `true` will allow your app to automatically reconnect users once they connect for the first time. Most people want this.

## Wrapping Context Providers

You can now wrap your app with the context providers for RainbowKit and wagmi. This will make your connection to the blockchain available throughout your entire app without needing to pass anything through props.

```typescript
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
```

## Adding the Connect Button

You're now ready to add your connect button. You can do this anywhere in your app, thanks to the `RainbowKitProvider`. Common practice would be to place the button in your app's header. Since the Next.js template doesn't have one, we'll just add it to the top of the automatically generated page, rather than spending time implementing React components.

Open up `index.tsx`, and import the `ConnectButton`:

```typescript
import { ConnectButton } from '@rainbow-me/rainbowkit';
```

Then, simply add the `ConnectButton` component at the top of the first `<div>`:

```typescript
// This function has been simplified to save space.
export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <ConnectButton />
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/pages/index.tsx</code>
        </p>
      </div>
    </main>
  );
}
```

Run your app with `yarn dev`, and you should be able to use the RainbowKit connect button to connect with your wallet and switch between networks.

You use the [Connect Button] props to modify its properties, or you can [customize the connect button] extensively. Some users dislike having the connect button display their token balance. Try disabling it with:

```typescript
<ConnectButton showBalance={false} />
```

---

## Conclusion

In this guide, you've learned how to assemble your onchain app from several pieces. You can use this knowledge to integrate a wallet connection with an existing site, or adjust the stack to meet your preferences. Finally, you've learned how to insert and customize the connect button.

If you're looking to quickly bootstrap a simple app, you can always use a script, such as the RainbowKit [quit start]. If you're looking for a robust start for a consumer application, check out our [Build Onchain Apps] template!

---

[RainbowKit]: https://www.rainbowkit.com/
[wagmi]: https://wagmi.sh/
[viem]: https://viem.sh/
[quick start]: https://www.rainbowkit.com/docs/installation
[Next.js]: https://nextjs.org/
[Tailwind]: https://tailwindcss.com/
[nvm]: https://github.com/nvm-sh/nvm
[WalletConnect]: https://cloud.walletconnect.com/
[Connecting to the Blockchain]: https://docs.base.org/connecting-to-the-blockchain/overview
[Wallet Connect Cloud]: https://cloud.walletconnect.com/
[`publicProvider`]: https://wagmi.sh/react/providers/public
[Connect Button]: https://www.rainbowkit.com/docs/connect-button
[customize the connect button]: https://www.rainbowkit.com/docs/custom-connect-button
[Build Onchain Apps]: https://github.com/coinbase/build-onchain-apps
