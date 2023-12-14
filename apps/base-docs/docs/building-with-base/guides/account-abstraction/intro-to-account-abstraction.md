---
title: Intro to Account Abstraction
description: Learn what Account Abstraction it, how it works, and what problems it solves.
hide_table_of_contents: false
---

[ERC-4337], also known as _Account Abstraction_, is a standard that allows smart contracts to initiate transactions, thus enabling any logic that users want to implement to be encoded into the smart contract wallet itself for execution on Ethereum.

Account Abstraction has the potential to be a massive game-changer for onchain user experience and many believe it will play a key role in bringing the next billion users onchain.

---

## Prerequisites

Before reading this guide, you should:

- Be familiar with modern web development
- Possess a general understanding of the EVM and smart contracts

---

## Objectives

By the end of this guide you should be able to:

- Explain how Account Abstraction can improve user experience for onchain apps.
- Describe the difference between contract accounts and EOAs, the limitations of contract accounts, and how EIP-4337 uses `UserOperation`s to mitigate these limitations.
- Outline how Account Abstraction works, and how users interact with smart contract wallets.

---

## The Problem Account Abstraction Solves

Onchain applications are difficult to use for many people, as they require a lengthy onboarding process for the average internet user who already onchain.

For example,the preliminary steps a user needs to go through before they can use an onchain app are:

1. Create a wallet wallet (Coinbase Wallet, Metamask, etc)
1. Store the wallet mnemonic safely, without losing it or compromising it
1. Sign a slightly frightening message to connect to an onchain app
1. Try to do anything with the app and get a popup asking them to approve a transaction
1. Attempt to do so, learn transactions cost gas, and they don't have any
1. Learn that gas is a fee that users must pay in ETH to use onchain apps
1. Attempt to buy ETH, possibly buying the wrong flavor of ETH in the wrong location
1. Try the transaction again
1. Repeat until they finally find the correct path

For widespread adoption of onchain applications, this confusing and alienating process has to change.

That's where Account Abstraction comes in. It allows you to improve the onboarding and usage flow for your users:

1. User goes to the onchain app and authenticates (using email, EOA, or social auth)
2. User uses the app
3. Transactions happen under the hood via a smart contract wallet and the app developer sponsors the user's gas fees until after they're onboarded.

To summarize, Account Abstraction enables smart contract accounts to initiate user operations, similar to how an EOA would initiate a transaction. However, unlike EOAs, smart contract accounts are programmable and can enable a number of incredible features, such as:

- **Sponsored Transactions**: Allow application owners to cover the users gas fees with a paymaster or allow a user to use something other than ETH (USDC, for example) to cover gas
- **Arbitrary Verification Logic**: Verify transactions with custom logic
- **Account Recovery**: Create account recovery features for when user lose private keys
- **Batching Transactions**: Change the user experience so that multiple transactions can be submitted at once

---

## Overview of ERC-4337 - Account Abstraction

"Account Abstraction" comes from [ERC-4337]. The proposal itself is a dense read, but one of stated goals of the proposal is to:

> allow users to use smart contract wallets containing arbitrary verification logic instead of EOAs as their primary account. Completely remove any need at all for users to also have EOAs (as status quo SC wallets and EIP-3074 both require)

In other words, the proposal seeks to allow users to use _smart contract wallets_ **instead** of EOAs to transact onchain.

:::info

You're working with something so new that the vocabulary hasn't settled yet. You'll often see the terms "smart contract wallet", "smart contract account" or just "smart account" used interchangeably.

:::

At first glance, you may be asking yourself if using smart contract accounts solve our problem. What's the difference between a smart contract account (or contract account) and an "Externally Owner Account"?

According to [ethereum.org], the differences are:

**Externally Owned Account**

- Creating an account costs nothing
- Can initiate transactions
- Transactions between externally-owned accounts can only be ETH/token transfers
- Made up of a cryptographic pair of keys: public and private keys that control account activities

**Contract Accounts**

- Creating a contract has a cost because you're using network storage
- Can only send transactions in response to receiving a transaction
- Transactions from an external account to a contract account can trigger code which can execute many different actions, such as transferring tokens or even creating a new contract
- Contract accounts don't have private keys. Instead, they are controlled by the logic of the smart contract code

Smart contract wallets _would_ solve our problems, **but**, as stated above, they can't initiate transactions. Since they cannot initiate transactions, users still need EOAs and those EOAs still need to pay for gas with ETH.

There were two options to resolve this problem:

1. Change the protocol - hard fork!

2. Change transactions, upstream (ERC-4337)

In a nutshell, ERC-4337 doesn't change how Ethereum transactions work. Cryptographically signed instructions from accounts still initiate transactions to update the state of the Ethereum network.

What ERC-4337 changes is everything _upstream_ of that signed transaction. It does this by introducing a new _user intent layer_ that acts as a proxy for an EOA. This layer allows users to initiate transactions, with highly customizable smart contract wallets, but without using an EOA. The Ethereum network still receives what it received before - signed transactions.

The result is a better experience for the user without changing the Ethereum protocol.

---

## How Account Abstraction Works

With typical Ethereum transactions an EOA initiates and signs a transaction. That transaction is sent to Ethereum's Public Mempool, is validated and added to a block, onchain.

Note that the following steps are primarily happening **before** any of that.

#### 1. **Smart Contract Wallet Creation**

First, a new smart contract wallet must be created for a user. This wallet is owned by its creator who is designated as the _signer_. This signer must validate any of its future operations.

This wallet may come with a variety of features, but it must be able to at least validate `UserOperations`s with a function called, `validateUserOp`. `validateUserOp` will check each `UserOperation`'s signature, increment the nonce, and handle the operation's fees.

#### 2. **User Operation Creation**

From the smart contract account, `UserOperations`s are created. These are not yet transactions, but rather represent intents from the user. These intents can represent any onchain user operation.

`UserOperation` includes the details of the transaction such as sender, nonce, gas limit, max fee per gas, paymaster data (if applicable), and a signature.

#### 3. **Signature Generation**:

The `UserOperation` is then signed using the private key associated with the initiating account. This signature serves to authenticate the transaction and validate that it was indeed initiated by the owner of the smart contract account.

#### 4. **Alt Mempool**:

ERC-4337 introduces an _Alt Mempool_ where operations are stored until they're picked up by a _Bundler_. The Alt Mempool is not very different from the transaction pool typically used in Ethereum, but this mempool exists earlier on in the transaction and holds user operations, where Ethereum's mempool holds signed transactions.

#### 5. **Bundler and Operation Submission**:

Nodes on the Ethereum network have the option to serve as a _Bundler_, a role that involves collecting multiple signed `UserOperation`s and consolidating them into a single transaction, called a bundle transaction. These bundle transactions are then directed towards a universal smart contract, called the _EntryPoint_.

The submission of the signed `UserOperation` to the EntryPoint contract can be done directly or through a _paymaster_, which is a contract that agrees to cover the cost of operations for certain users.

#### 6. **Operation Validation**:

The Bundler triggers a function named `handleOps` on the EntryPoint smart contract, which receives the bundle transaction. The EntryPoint then calls `validateUserOp` for each account within this bundle transaction.

Each smart contract wallet is then required to implement an additional function and execute the actual operation sent by the EntryPoint contract.

#### 7. **Operation Execution**:

Once the operation has been validated and the fees have been handled, the operation is executed on the Ethereum network.

---

## Conclusion

In this article, you've learned that _Account Abstraction_ is a standard that allows smart contract accounts to initiate transactions, without changing the Ethereum protocol. You've learned that this is a desireable feature as smart contract wallets are far more customizable than EOAs. Because they can be programmed to include user-friendly features, they have the potential to eliminate much of the friction users currently experience when onboarding to onchain applications. Finally, you examined **how** _Account Abstraction_ works, primarily by introducing pseudo-transaction objects called `UserOperation`s.

[ERC-4337]: https://eips.ethereum.org/EIPS/eip-4337
[ethereum.org]: https://ethereum.org/en/developers/docs/accounts/#key-differences
