---
title: 'Event POAPs with Nouns'
slug: /event-poaps-with-nouns
description: Learn how to give attendees of an in-person event a Nouns-based POAP/PFT, even if they're not onchain yet.
author: briandoyle81
keywords: [Solidity, ERC-721, token, NFT, POAP, Nouns, PFP]
tags: ['nft', 'smart contracts']
difficulty: hard
hide_table_of_contents: false
displayed_sidebar: null
---

You've probably seen people in onchain communities use ⌐◨-◨ in their profile names. These are called _Nouns Goggles_, or _Noggles_. They're an ASCII representation of the glasses found on every procedurally generated [Nouns] NFT avatar. The [Nouns Auction] makes one new Noun available for auction every single day - forever!

Ownership of a Noun gives a wallet address membership in the [Nouns DAO]. The [Nouns Protocol] is open-source and the art is public domain, so any builder can leverage the protocol to create their own community. For example, the [Purple DAO] supports [Farcaster].

In this tutorial, you'll learn how to use Nouns and the Coinbase [Smart Wallet] to create an app in which non-crypto-native participants at an IRL event can be onboarded and receive Nounish avatars.

---

## Objectives

By the end of this tutorial you should be able to:

- Deploy a copy of the [Nouns Protocol]
- Construct a web app that can onboard new users with the Coinbase [Smart Wallet] and grand them a Nounish avatar NFT

## Prerequisites

### ERC-721 Tokens

This tutorial assumes that you are able to write, test, and deploy your own ERC-721 tokens using the Solidity programming language. If you need to learn that first, check out our content in [Base Learn] or the sections specific to [ERC-721 Tokens]!

### Vercel

You'll need to be comfortable deploying your app to [Vercel], or using another solution on your own. Check out our tutorial on [deploying with Vercel] if you need a refresher!

### Onchain Apps

The tutorial assumes you're comfortable with the basics of deploying an app and connecting it to a smart contract. If you're still learning this part, check out our tutorials in [Base Learn] for [Building an Onchain App].

---

## The Nouns Protocol

Start by cloning the [Nouns Monorepo]. Open `packages/nouns-contracts` and review the readme, and install dependencies.

```bash
cd packages/nouns-contracts
yarn install
```

## Conclusion

---

[Base Learn]: https://base.org/learn
[ERC-721 Tokens]: https://docs.base.org/base-learn/docs/erc-721-token/erc-721-standard-video
[OpenZeppelin ERC-721]: https://docs.openzeppelin.com/contracts/2.x/api/token/erc721
[OpenZeppelin]: https://www.openzeppelin.com/
[Nouns]: https://nouns.center/intro
[Nouns Auction]: https://nouns.wtf/
[Nouns DAO]: https://nouns.wtf/vote
[Nouns Protocol]: https://nouns.center/dev/nouns-protocol
[Nouns Monorepo]: https://github.com/nounsDAO/nouns-monorepo/
[Purple DAO]: https://nouns.build/dao/base/0x8de71d80eE2C4700bC9D4F8031a2504Ca93f7088/563
[Farcaster]: https://www.farcaster.xyz/
[Smart Wallet]: https://www.smartwallet.dev/why
