---
title: 'Coinbase Smart Wallet with RainbowKit'
slug: /smart-wallet-and-rainbowkit
description: Learn how to configure RainbowKit to .
author: briandoyle81
keywords:
  [
    JSON RPC,
    RainbowKit,
    wagmi React hooks,
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
    public providers,
    wallet providers,
    vendor providers,
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

In this tutorial, you'll learn how to improve that experience when using [RainbowKit] to connect your users to your app.

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

Start a new project with the RainbowKit [quick start]. Install dependencies, run the project, and attempt to connect with a browser that has the [Coinbase Wallet] browser extension installed. Clicking on `Coinbase` will automatically connect with your EOA browser extension wallet.

![Default Connection](../../assets/images/smart-wallet/rainbowkit-default.png)

What about the smart wallet? Isn't it supposed to work automatically?

It does, but only if the user **does not** have the browser extension installed. Open a private window with extensions disabled and try again. Now, you will be directed to use the smart wallet to log in.

![Default Connection](../../assets/images/smart-wallet/rainbow-smart-wallet.png)

As mentioned above, this experience isn't bad for users of one type of wallet or the other, but it makes things difficult for users who are using both types of wallet and may want to choose one or the other when interacting with your app.

## Customizing the List of Wallets

To fix this UI/UX problem, you can create a [custom wallet list] that has two entries -- one for each wallet. Open `src/wagmi.ts`:

- Change the list imported networks to `base` and `baseSepolia`
- Import `connectorsForWallets` from RainbowKit, instead of `getDefaultConfig`
- Import the `coinbaseWallet`, and any other wallets you wish to support
- Import `createConfig` from wagmi

```tsx
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import { createConfig } from 'wagmi';
import {
  coinbaseWallet,
  metaMaskWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { base, baseSepolia } from 'wagmi/chains';
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
