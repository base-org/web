---
title: 'Account Abstraction: Intro to Privy'
slug: /account-abstraction/intro-to-privy
description: Learn how to use Privy for authentication in onchain apps.
author: Brian Doyle
keywords: [Privy, Account Abstraction, Base Paymaster, Account Kit, ERC-4337]
hide_table_of_contents: false
displayed_sidebar: null
---

[Privy] makes authentication and user-management in onchain apps easier by bridging onchain and offchain user data. In preparation to dive into our Base Paymaster example app, this lesson will cover the basics of Privy.

In this guide, you'll quick start and review a sample application where users can authenticate with [Privy].

---

## Objectives

By the end of this guide you should be able to:

- Implement Privy's quick start to add onchain authentication to a NextJS application
- Compare Privy's progressive authentication strategy with traditional wallet-based authentication
- Use Privy's `PrivyProvider` context and `usePrivy` hook to implement basic authentication via an email address, SMS, EOA, and/or social auth
- Utilize Privy's Embedded Wallets to enable users to utilize wallet-based actions without having to connect to an external wallet or leave your application

---

## Overview of Privy

Privy self-describes as "a simple toolkit for progressive authentication in web3". In this app, you'll primarily use Privy for its authentication and user-handling capabilities, but some of Privy's most popular features include:

**Authentication Options**: Privy allows developers to configure how users authenticate. This can be with a crypto wallet, an email address, phone number or social profiles. Conveniently, Privy handles sessions and provides all necessary authentication methods.

**Progressive Onboarding**: Privy creates a `user` object for each session. Before authentication, this `user` object is `null`, but as the user interacts with your application it will progressively associate more user information with this object. For example, users can start by authenticating with their email address and later add their wallet address or any other user information as the application requires.

**Embedded Wallets**: Embedded wallets are "self-custodial Ethereum wallets that are embedded into your app. This allows your users to take wallet-based actions without ever leaving your site. Embedded wallets are the easiest way to unlock your full product experience for users who don't have, or don't want to connect, their own wallet." Developers can simply configure Privy to automatically created an Embedded Wallet on `login` or they can be pregenerated on the backend.

:::caution

_Embedded wallets_ are still EOAs and should not be confused with _smart contract wallets_. A user may have both. During development, this division can lead to confusing situations where `msg.sender` is **not** the address you were expecting.

:::

---

## Privy Quick Start

As with most onchain frontend connector libraries, you can use [Privy's Quick Start] to jump start your development with their platform. In this example, you'll use the NextJS starter.

### Setup

First, navigate to the repository: [https://github.com/privy-io/create-next-app] and clone the repo.

```bash
git clone https://github.com/privy-io/create-next-app
```

Next, `cd create-next-app` and install dependencies with `yarn`.

### Setting Your App Id

To use Privy, you'll need your own environment variables. In your terminal, run:

```bash
cp .env.example .env.local
```

This will create a `.env.local` file in your project's root. This is where you'll add your Privy App ID:

```text
NEXT_PUBLIC_PRIVY_APP_ID=<your-privy-app-id>
```

:::info

Note - to get an App ID, you'll need to request one and access it at [https://console.privy.io/]. This process can take a while, but for the Base community, Privy will expedite this process! Developers can send an email to `base@privy.io` with:

- Your app name
- The email address you want as admin
- A one liner on what you're building

:::

### Starting the App

Finally, run `yarn dev` and navigate to [http://localhost:3000] to see the starter application.

---

## Privy Login Walkthrough

Before exploring the code, test the app. First, you should see this login page:

![Privy Login Page](../../../assets/images/account-abstraction/privy-login-page.png)

After clicking "Log in" you'll see the following modal:

![Privy Login Modal](../../../assets/images/account-abstraction/privy-login-modal.png)

By default, you can login with a wallet, or email.

After logging in, you'll be redirected to the `/dashboard` page, where the demo app will allow you to connect a number of other accounts to your `user` object:

![Privy Dashboard Page](../../../assets/images/account-abstraction/privy-dashboard-page.png)

If you navigate to [console.privy.io](https://console.privy.io/), you'll see that Privy stores all your users and their data here.

![Privy Console](../../../assets/images/account-abstraction/privy-console.png)

---

## PrivyProvider

Diving into the code, first look at the `PrivyProvider` inside of `_app.jsx`:

```typescript
<PrivyProvider
  appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
  onSuccess={() => router.push('/dashboard')}
>
  <Component {...pageProps} />
</PrivyProvider>
```

`PrivyProvider` uses React Context and wraps any components that will use the `usePrivy` hook.

Additionally, it's here that you can pass an optional `config` property to enable more authentication methods.

Add a `config` property to the `<PrivyProvider />` in `_app.jsx` with `'github'` and `'sms'` as the login options:

```typescript
<PrivyProvider
  appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
  onSuccess={() => router.push('/dashboard')}
  config={{
    loginMethods: ['github', 'sms'],
  }}
>
  <Component {...pageProps} />
</PrivyProvider>
```

Refresh to see that authentication is only possible now through Github or SMS:

![Privy Login Methods](../../../assets/images/account-abstraction/privy-login-methods.png)

You can find a full list of `loginMethods` in the docs for [`PrivyClientConfig`].

---

## The `usePrivy` Hook

The primary method you'll use to utilize Privy's authentication features is `usePrivy`. Open `pages/dashboard.tsx` to see the methods decomposed from `usePrivy` in the starter, and how they are used.

A full list of the fields and methods returned from `usePrivy` are [documented here].

---

## The `useWallets` Hook

To access wallet data for currently authenticated user, use the `useWallets` hook:

```typescript
import { ConnectedWallet, useWallets } from '@privy-io/react-auth';

const { wallets } = useWallets();

// wallets = [
//   {
//     "address": "0x<address>",
//     "type": "wallet",
//     "verifiedAt": "2023-11-28T19:01:41.000Z",
//     "chainType": "ethereum",
//     "chainId": "eip155:84531",
//     "walletClient": "unknown",
//     "walletClientType": "coinbase_wallet",
//     "connectorType": "coinbase_wallet"
//   },
//   {
//     "address": "0x<address>",
//     "type": "wallet",
//     "verifiedAt": "2023-11-28T20:09:23.000Z",
//     "chainType": "ethereum",
//     "chainId": "eip155:1",
//     "walletClient": "unknown",
//     "walletClientType": "metamask",
//     "connectorType": "injected"
//   },
// ],
```

As you can see, a user may connect multiple wallets to Privy, including Embedded Wallets.

---

## Embedded Wallets

Lastly, configure your starter app to create an Embedded Wallet for your users on login.

As stated in the Privy docs,

> Embedded wallets are self-custodial Ethereum wallets that are embedded into your app. This allows your users to take wallet-based actions without ever leaving your site. Embedded wallets are the easiest way to unlock your full product experience for users who don't have, or don't want to connect, their own wallet.

When configuring your app to create embedded wallets on login, you have 2 options:

- `users-without-wallets`: This will create embedded wallets for all use who did not login with an external wallet
- `all-users`: This will create an additional embedded wallet for all users, regardless if they have linked an external wallet

Inside of `_app.tsx`, update your `PrivyProvider`:

```typescript
<PrivyProvider
  appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID || ''}
  onSuccess={() => router.push('/dashboard')}
  config={{
    embeddedWallets: {
      createOnLogin: 'all-users'
    }
  }}
>
```

Log out of your application, then log in again and see that your user has an additional `linkedAccount` which is the Privy Embedded Wallet:

```typescript
{
  "address": "0xD5063967BA703D485e3Ca40Ecd61882dfa5F49b2",
  "type": "wallet",
  "verifiedAt": "2023-11-28T20:52:22.000Z",
  "chainType": "ethereum",
  "chainId": "eip155:1",
  "walletClient": "privy",
  "walletClientType": "privy",
  "connectorType": "embedded",
  "recoveryMethod": "privy"
},
```

More information on Privy's Embedded Wallets, including information about the addresses, signing transactions, funding the wallet and more, can be found here: [https://docs.privy.io/guide/frontend/embedded/overview]

---

## Conclusion

You've learned how you can use Privy to make onboarding users to your applications is easier for new users. You've also learned that offchain user data is [securely stored] by Privy, while onchain data is stored onchain via a user's connected wallet. Finally, you've learned how to configure Privy to enable or disable several login methods, and to create an embedded wallet for your users.

[Privy]: https://www.privy.dev/
[https://docs.privy.io/guide/frontend/embedded/overview]: https://docs.privy.io/guide/frontend/embedded/overview
[Alchemy's Account Kit]: https://www.alchemy.com/account-kit
[https://console.privy.io/]: https://console.privy.io/
[http://localhost:3000]: http://localhost:3000/
[Privy's Quick Start]: https://docs.privy.io/guide/quickstart
[https://github.com/privy-io/create-next-app]: https://github.com/privy-io/create-next-app
[`PrivyClientConfig`]: https://docs.privy.io/reference/react-auth/modules#privyclientconfig
[documented here]: https://docs.privy.io/reference/react-auth/interfaces/PrivyInterface
[securely stored]: https://docs.privy.io/guide/security#user-data-management
