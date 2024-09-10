---
title: Basenames FAQ
slug: /tools/basenames-faq
description: 'Frequently asked questions on basenames.'
keywords: ['basenames', 'faq']
tags: ['basenames']
displayed_sidebar: null
---

## FAQ

### 1. What are Basenames?

[Basenames](https://base.org/names) are a core onchain building block that enable builders to establish their identity on Base by registering human-readable names for their wallet address(es). They are fully onchain, built on the same technology powering ENS names and deployed on Base. These human-readable names can be used when connecting to onchain apps, and sending and receiving on Base and any other EVM chain. Get your Basename at [base.org/names](https://base.org/names).

### 2. What are the Basename registration fees?

Basenames are priced based on name length, and are designed to be globally accessible. Annual registration fees are as follows:

| Letters | Annual fee |
| ------- | ---------- |
| 3       | 0.1 ETH    |
| 4       | 0.01 ETH   |
| 5-9     | 0.001 ETH  |
| 10+     | 0.0001 ETH |

### 3. How do I get a free or discounted Basename?

You can get one free Basename (5+ letters) for one year if you meet any of the below criteria:

- [Coinbase Verification](http://coinbase.com/onchain-verify)
- [Coinbase One Verification](http://coinbase.com/onchain-verify) (free renewals with active subscription)
- [Summer Pass Level 3 NFT](https://wallet.coinbase.com/ocs)
- [Buildathon participant NFT](https://onchain-summer.devfolio.co/)
- [base.eth NFT holder](https://opensea.io/collection/base-org-base-eth)
- cb.id username (acquired prior to Fri Aug 9, 2024)
- [BNS name owner](http://basename.app) - free 4+ letter name (basename.app)

An equivalent-value discount of 0.001 ETH will be applied if registering a shorter name, or registering for more than 1 year, with the exception of the BNS name owner discount (valued at 0.01 ETH per unique address). You will need to pay the standard registration fees if you wish to keep your Basename after your initial discount has been fully applied. Discounts are only applied once, and are limited to one per address. Even if you meet multiple criteria, you will only be eligible for a single discount on one Basename. If you satisfy multiple criteria, we will automatically apply the highest-value discount to your registration.

We are always looking to add more discounts. If you or your project have ideas for more discounts, please reach out.

### 4. Why is there an auction at launch, and how does it work?

Upon initial launch, there will be a temporary premium placed on all Basenames in the form of a Dutch auction, to ensure a fair and quality distribution of names, and to maximize everyone's chance of getting a name they like without being outcompeted by bots. The premium will start at 100 ETH and decay exponentially over the course of 36 hours. Premiums will be added on to the total registration cost of a Basename. Please note: the premium is intentionally designed to be high so that names can't be instantly bought by bots or traders, and can instead enable fairer access and price discovery for the general public.

### 5. Do I have to pay gas to register a Basename?

If registering with a Smart Wallet, registrations will be gasless, sponsored by Base.

### 6. How long can I register a Basename for?

There is no limit to registration length, but there is a minimum of 1 year.

### 7. How can I use my Basename?

You can use your Basename across apps in the Base ecosystem, starting with base.org, Onchain Registry, and Onchain Summer Pass. You can also use it for sending and receiving on Base and other EVM chains.

### 8. Is my profile information published onchain?

Basenames are fully onchain, and therefore any information you publish is recorded onchain, requires a transaction, and will be broadly composable with the rest of the ecosystem. Please do not publish any information you do not wish to be onchain.

### 9. How do I set my Basename as my primary name for my address?

You can set your Name as your primary name by updating this in Profile Management. If you set your Basename as your primary name, it will be displayed on any wallet or app that has added support for Basenames.

### 10. How do I transfer my Basename to another address?

You can transfer your Basename to another address through Profile Management:

1. Transfer token ownership - transfers ownership of the Basename token and associated permissions.
2. Transfer management - transfers ability to manage and update profile records.
3. Change address resolution - Basename will resolve to a new address.

Transferring all 3 to the same address will fully transfer ownership of the Basename to that address.

### 11. What happens if I forget to renew my Basename?

If you forget to renew your Name, it will enter a grace period of 90 days, during which you can still renew it. If not renewed during this period, the Basename will become available for others to register.

### 12. What happens if a Basename is not renewed during the grace period?

If a Basename is not renewed after the 90 day grace period, it will be subject to a [temporary premium](https://support.ens.domains/en/articles/7900612-temporary-premium) in the form of a Dutch auction. This premium starts at 100ETH and will decay exponentially over the course of 21 days.

### 13. Can I link multiple addresses to my Basename?

Currently, only one address at a time can be linked to a Basename. However, we plan to support multi-address linking in the future.

### 14. I am a builder. How do I integrate Basenames to my app?

If you're a builder looking to integrate Basenames into your app, [OnchainKit](https://onchainkit.xyz/wallet/wallet-dropdown-base-name) is the easiest way to get started (tutorial [here](https://docs.base.org/docs/tools/basenames-tutorial)). If you have ideas for new features or badges that you'd like to integrate with Basenames, we'd love to [hear from you](https://app.deform.cc/form/b9c1c39f-f238-459e-a765-5093ca638075/?page_number=0).

### 15. How do I get a Basename for my app or project?

You can register a Basename for your app just like any other Basename. If a Basename for your app or project is not available, there is a good chance it was reserved. Please reach out to our team or fill out this [form](https://app.deform.cc/form/20372eb6-ec97-4d37-967f-d36f4b7f4eb2) and we will reach out with instructions.

### 16. How are Basenames built?

Basenames are built using the Ethereum Name Service (ENS) protocol, leveraging its decentralized architecture to ensure secure and efficient name resolution.

### 17. Do Basenames work on different chains?

Yes, your Name will work on any chain as long as the app is ENSIP-10 compliant. Note that when sending money or interacting across different chains, you should ensure the receiving platform supports ENS.
