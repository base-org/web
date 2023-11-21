---
title: Intro to Account Abstraction
description:
hide_table_of_contents: false
---

ERC-4337, also known as "Account Abstraction", is a standard that allows smart contracts to initiate transactions, thus enabling any logic that users want to implement to be encoded into the smart contract wallet itself for execution on Ethereum.

Account Abstraction has the potential to be a massive game changer for onchain user experience and many believe it will play a key role in bringing the next billion users onchain.

---

## Prerequisites

Before reading this guide, you should:

- Be familiar with modern web development
- Possess a general understanding of the EVM and smart contracts

---

## Objectives

By the end of this lesson you should be able to:

- Explain what Account Abstraction is and what problems it solves, primarily onchain UX.
- Describe the difference between contract accounts and EOAs and the limitations of contract accounts (i.e. they cannot initiate transactions) and how 4337 solves that particuilarly with `UserOperation`s.
- Outline how Account Abstraction works, particularly how users interact with smart contract wallets.

---

## The Problem Account Abstraction Solves

Onchain applications are difficult to use for most as they require a lengthly onboarding process for the average internet user who isn't used to being onchain.

For example, here are the prelimenary steps a user needs to go through before they can use an onchain app:

1. Create an account/learn to use a wallet (Coinbase Wallet, Metamask, etc).
2. Store private key.
3. Initiate a transaction in the onchain app.
4. Realize that transactions cost gas.
5. Learn what gas it.
6. Buy ETH on an exchange (yes, it has to be ETH - you can only pay for gas with ETH).
7. Try the transaction again.

For widespread adoption of onchain applications, this tedious process has to change.

That's where Account Abstraction comes in.

What if we could make the user flow look something like the following instead? For example:

1. User goes to the onchain app and authenticates (using email, EOA, Google, whatever). If they do this with an EOA, they don't necessarily need any ETH.
2. User users the app.
3. Transactions happen under the hood via a smart contract wallet and the app developer sponsors the user's gas fees.

So simple.

This is exactly the kind of thing that Account Abstraction enables.

To summarize, Account Abstraction enables smart contract accounts to initiate user operations, similar to how an EOA would initiate a transaction. However, unlike EOAs, smart contract accounts are programmable and can enable a number of incredible features, such as:

- **Sponsored transactions**: Allow application owners to cover the users gas fees with a paymaster or allow a user to use something other than ETH (USDC, for example) to cover gas.
- **Arbitrary verification logic**: Verify transactions with custom logic.
- **Account recovery**: Create account recovery features for when user lose private keys.
- **Batching transactions**: Change the user experience so that multiple transactions can be submitted at once.

And more!

Let's dive into how Account Abstraction enables this.

---

## Overview of ERC-4337 - Account Abstraction

"Account Abstraction" comes from [ERC-4337](https://eips.ethereum.org/EIPS/eip-4337). The proposal itself is a dense read, but one of stated goals of the proposal is to,

> allow users to use smart contract wallets containing arbitrary verification logic instead of EOAs as their primary account. Completely remove any need at all for users to also have EOAs (as status quo SC wallets and EIP-3074 both require)

In other words, the propsal seeks to allow users to use "smart contract wallets" _instead_ of EOAs to transact onchain.

By the way, you'll often see the terms "smart contract wallet", "smart contract account" or just "smart account" used interchangeably.

At first glance, you may be asking yourself if using smart contract accounts solve our problem. What's the difference between a smart contract account (or contract account) and an "Externally Owner Account"?

According to [https://ethereum.org/en/developers/docs/accounts/#key-differences](https://ethereum.org/en/developers/docs/accounts/#key-differences), the differences are:

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

As we stated before, smart contract wallets _would_ solve our problems, **but**, according to the information above, they can't initiate transactions. And since they cannot initiate transactions, we still need EOAs and those EOAs still need to pay for gas with ETH.

There are a couple options to solve for this:

1. Change the protocol - hard fork! This would be a massive undertaking and most would agree that it is not a viable option.

2. Change transactions, upstream (ERC-4337).

In a nutshell, ERC-4337 doesn't change how Ethereum transactions work. Cryptographically signed instructions from accounts still initiate transactions to update the state of the Ethereum network.

What ERC-4337 changes is everything _upstream_ of that signed transaction. It does this by introducting a new "user intent layer" that acts as a proxy for an EOA. This allows users to initiate transactions, with highly customizable smart contract wallets, but without using an EOA. Ethereum still recieves what it recieved before - signed transactions.

The result is a better experience for the user without changing the Ethereum protocol.

---

## How Account Abstraction Works

With typical Ethereum transactions an EOA initiates and signs a transaction. That transaction is sent to Ethereum's Public Mempool, is validated and added to a block, onchain.

Note that the following steps are primarily happening _before_ any of that.

#### 1. **Smart Contract Wallet Creation**

First, a new smart contract wallet must be created for a user. This wallet is owned by it's creator who is designated as the "signer". This signer must validate any of it's future operations.

As mentioned, this wallet may come with a variety of features, but it must be able to at least validate `UserOperations`s with a function called, `validateUserOp`. `validateUserOp` will check each `UserOpartion`'s signature, increment nonce, and handle the operation's fees.

#### 2. **User Operation Creation**

From the smart contract account, `UserOperations`s are created. Note that these are not yet transactions, but rather represent intents from the user. These intents can represent any onchain user operation.

`UserOperation` includes the details of the transaction such as sender, nonce, gas limit, max fee per gas, paymaster data (if applicable), and a signature.

#### 3. **Signature Generation**:

The `UserOperation` is then signed using the private key associated with the initiating account. This signature serves to authenticate the transaction and validate that it was indeed initiated by the owner of the smart contract account.

#### 4. **Alt Mempool**:

ERC-4337 introduces an "Alt Mempool" where operations are stored until they're picked up by a "Bundler". This mempool is not very different from the transaction pool typically used in Ethereum, but note that this mempool exists earlier on in the transaction and holds user operations where Ethereum's mempool will hold signed transactions.

#### 5. **Bundler and Operation Submission**:

Nodes on the Ethereum network have the option to serve as a "Bundler," a role that involves collecting multiple signed `UserOperation`s and consolidating them into a single transaction, referred to as a bundle transaction. These bundle transactions are then directed towards a universal smart contract, known as the "EntryPoint".

The submission of the signed `UserOperation` to the "EntryPoint" can be done directly or through a paymaster, which is a contract that agrees to cover the cost of operations for certain users.

#### 6. **Operation Validation**:

The Bundler triggers a function named `handleOps` on the EntryPoint smart contract, which receives the bundle transaction. The EntryPoint then calls `validateUserOp` for each account within this bundle transaction.

Each smart contract wallet is then required to implement an additional function and execute the actual operation sent by the EntryPoint contract.

#### 7. **Operation Execution**:

Once the operation has been validated and the fees have been handled, the operation is executed on the Ethereum network.

---

## Conclusion

In this article, we've learned that "Account Abstraction" is a standard that allows smart contract accounts to initiate transcations, without changing the Ethereum protocol. We explained that this is a desireable feature as smart contract wallets are far more customizable than EOAs. And because they can be programmed to include user-friendly features, they have the potential to elminate much of the friction users currently experience when onboarding to onchain applications. Finally, we broke down _how_ Account Abstraction works primarily by introducing psudeo-transacation objects called `UserOpartion`s.
