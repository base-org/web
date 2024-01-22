---
title: Overview
description: What's in this learning material.
keywords:
  [
    Privy,
    viem,
    frontend,
    smart contract development,
    EVM,
    Next.js,
    Base,
    Base network,
    account abstraction,
    Base paymaster,
    embedded wallet,
  ]
hide_table_of_contents: false
about:
  duration: 30 minutes
  updated: January 22nd 2024
  author:
    name: Brian Doyle
    title: Developer Relations Engineer
    url: https://github.com/briandoyle81CB
    image_url: https://github.com/briandoyle81CB.png
---

# Overview of Privy and the Base Paymaster

These guides show you how to use [Privy], [Alchemy's Account Kit], and the [Base Paymaster] to enable your users to use onchain apps without creating a wallet on their own, or even needing to pay for gas fees!

---

## Objectives

By the end of these guides, you should be able to:

### Intro to Account Abstraction

- Explain how Account Abstraction can improve user experience for onchain apps
- Describe the difference between contract accounts and EOAs, the limitations of contract accounts, and how EIP-4337 uses `UserOperation`s to mitigate these limitations
- Outline how Account Abstraction works, and how users interact with smart contract wallets

### Intro to Privy

- Implement Privy's quick start to add onchain authentication to a NextJS application
- Compare Privy's progressive authentication strategy with traditional wallet-based authentication
- Use Privy's `PrivyProvider` context and `usePrivy` hook to implement basic authentication via an email address, SMS, EOA, and/or social auth
- Utilize Privy's Embedded Wallets to enable users to utilize wallet-based actions without having to connect to an external wallet or leave your application

### Implementing the Paymaster

- Describe how a third party can use a _paymaster_ to sponsor gas
- Modify Privy's Base [paymaster example] example to work in another app, using an EOA to allow a user to call a smart contract function without requiring the user to pay any gas

---

## Prerequisites

### 1. Be familiar with modern, frontend web development

In this guide, we'll be working with a React frontend built with [Next.js]. While you don't need to be an expert, we'll assume that you're comfortable with the basics.

### 2. Possess a general understanding of the EVM and smart contract development

These guides assume that you're reasonably comfortable writing basic smart contracts. If you're just getting started, jump over to our [Basecamp] guides and start learning!

[Basecamp]: https://base.org/camp
[Next.js]: https://nextjs.org/
[Base Paymaster]: https://github.com/base-org/paymaster
[Privy]: https://www.privy.dev/
[Alchemy's Account Kit]: https://www.alchemy.com/account-kit
