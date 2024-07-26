---
title: 'Coinbase Smart Wallet with OnchainKit'
slug: /smart-wallet-and-onchainkit
description: Learn how to use OnchainKit to easily handle the Coinbase Smart Wallet and EOA wallets including the Coinbase wallet, at the same time.
author: briandoyle81
keywords:
  [
    JSON RPC,
    RainbowKit,
    OnchainKit,
    frontend,
    Next.js,
    Base,
    Base network,
    Base node providers,
    Base providers,
    blockchain development,
    dApps,
    smart contracts,
    providers,
    Base,
    Base network,
    blockchain connection,
    smart contract development,
    smart wallet,
    Coinbase smart wallet,
  ]
tags: ['account abstraction', 'frontend']
difficulty: beginner
hide_table_of_contents: false
displayed_sidebar: null
---

The [Coinbase Smart Wallet] is a great way to onboard new users to onchain apps, and offers a number of experiential improvements to existing crypto users as well. As we're in a period of adoption and transition, a pain point has developed where a user with both the Smart Wallet and a browser-extension EOA can't always select the wallet they want while connecting to an app.

In this tutorial, you'll learn how to more easily improve that experience by using [Wallet] component from [OnchainKit] to connect your users to your app.

---

## Objectives

By the end of this tutorial, you should be able to:

- Give users the option to select the [Coinbase Smart Wallet] or EOA while connecting to your app with RainbowKit

---

## Prerequisites

### Be familiar with modern, frontend web development

In this tutorial, you'll be working with a React frontend built with [Next.js]. While you don't need to be an expert, we'll assume that you're comfortable with the basics.

### Possess a general understanding of the EVM and smart contract development

This tutorial assumes that you're reasonably comfortable writing basic smart contracts. If you're just getting started, jump over to our [Base Learn] guides and start learning!

### Understand providers and connectors

You'll need to be familiar with how to connect an onchain app to the blockchain with a provider. If you're not, start with the [Onchain App Development] section of [Base Learn], or at least complete the tutorial [Introduction to Providers].

### Coinbase Wallets

You need to have both the [Coinbase Wallet] and [Coinbase Smart Wallet] for this tutorial. You need to set up the [Coinbase Wallet] in advance, but you can create a smart wallet during the tutorial.

---

## The Default Experience

Begin by using [An Onchain App in 100 Components] as a template to quickstart a new app. Click the green `Use this template` button, create a new repo, download it, install dependencies, and run the app.

```bash
bun install
bun run dev
```

The demo app contains sections showing a number of [OnchainKit] components, including the [Wallet]. Click `Connect Wallet` in your browser with the Coinbase wallet active, and you'll get the expected experience for an EOA wallet user with the browser extension.

![Default eoa](../../assets/images/smart-wallet/onchainkit-default-eoa.png)

Next, open the app in a private browser window with extensions disabled, and try again. This time, you'll get the Smart Wallet experience. If you don't have one already, you can create one now. They're neat!

![Default smart wallet](../../assets/images/smart-wallet/onchainkit-default-smart.png)

Unfortunately, now that you've realized that the smart wallet is great, you've got a problem. Because you already have a Coinbase EOA wallet via the browser extension, you **can't** connect with your smart wallet **unless** you open a private window.

## Customizing the List of Wallets

Luckily, it isn't too hard to fix this with the [Wallet Aggregator]. Open `src/app/page.tsx`. Start by clearing out all the demo components except for the one with `<WalletComponents />`:

```tsx
'use client';
import WalletComponents from '@/components/WalletComponents';

export default function Page() {
  return (
    <div className="flex w-96 flex-col md:w-[600px]">
      <section className="mb-6 flex w-full flex-col border-b border-sky-800 pb-6">
        <aside className="mb-6 flex">
          <h2 className="text-xl">Wallet</h2>
        </aside>
        <WalletComponents />
      </section>
    </div>
  );
}
```

Open `src/components/WalletComponents.tsx` and `src/components/OnchainProviders.tsx`. Take a quick look at `WalletComponents`. You'll see that it's a simple implementation that invokes a default experience without customization. You can update this, but first you'll need to make some changes to `OnchainProviders.tsx`.

Install [RainbowKit] and its dependencies:

```bash
bun add @rainbow-me/rainbowkit wagmi viem@2.x @tanstack/react-query
```

---

## Conclusion

In this tutorial, you've learned how

---

[Base Learn]: https://base.org/learn
[Next.js]: https://nextjs.org/
[RainbowKit]: https://rainbowkit.com/
[wagmi]: https://wagmi.sh/
[viem]: https://viem.sh/
[quick start]: https://www.rainbowkit.com/docs/installation
[WalletConnect]: https://cloud.walletconnect.com/
[smart contract development]: https://base.org/learn
[Base]: https://docs.base.org/network-information
[smart contract development]: https://base.org/camp
[`createConfig`]: https://wagmi.sh/react/api/createConfig
[Introduction to Providers]: /intro-to-providers
[Onchain App Development]: https://docs.base.org/base-learn/docs/frontend-setup/overview
[Coinbase Wallet]: https://www.coinbase.com/wallet
[Coinbase Smart Wallet]: https://www.coinbase.com/wallet/smart-wallet
[custom wallet list]: https://www.rainbowkit.com/docs/custom-wallet-list
[OnchainKit]: https://onchainkit.xyz
[Wallet]: https://onchainkit.xyz/wallet/wallet
[An Onchain App in 100 Components]: https://github.com/Zizzamia/an-onchain-app-in-100-components
[Wallet Aggregator]: https://onchainkit.xyz/wallet/wallet#use-wallet-aggregator
