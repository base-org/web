---
title: Overview of Providers
description: Learn what providers are and why you need one.
hide_table_of_contents: false
---

Onchain apps need frontends, sometimes called dApps, to enable your users to interact with your smart contracts. A _provider_ makes the connection from frontend to blockchain, and is used to read data and send transactions.

---

## Prerequisites

Before this lesson, you should:

- Be familiar with modern, frontend web development
- Possess a general understanding of the EVM and smart contracts
- Ideally, understand how to build a frontend with [Next.js]

---

## Objectives

By the end of this lesson you should be able to:

- Compare and contrast public providers vs. vendor providers vs. wallet providers
- Select the appropriate provider for several use cases

---

## Types of Providers

In blockchain development, the term _provider_ describes a company or service that provides an API enabling access to the blockchain as a service. This is distinct from the provider in the the React Context API or Redux Provider, though you will also wrap your app with `wagmiConfig` in a similar manner.

These services enable interacting with smart contracts without the developer needing to run and maintain their own blockchain node. Running a node is expensive, complicated, and challenging. In most cases, you'll want to start out with a provider. Once you start to get traction, you can evaluate the need to run your own node, or switch to a more advanced architecture solution, such as utilizing [Subgraph].

Figuring out which type of provider to use can be a little confusing at first. As with everything blockchain, the landscape changes rapidly and search results often return out-of-date information.

:::info

New onchain devs sometimes get the impression that there are free options for connecting their apps to the blockchain. Unfortunately, this is not really true. Blockchain data is still 1's and 0's, fetched by computation and served to the internet via servers.

It costs money to run these and you will eventually need to pay for the service.

:::

You'll encounter providers divided into three general categories: Public Providers, Wallet Providers, and Vendor Providers

### Public Providers

Many tutorials and guides, as well getting started guides for libraries such as [wagmi], will use a _Public Provider_ as the default to get you up and running. Public means that they're open, permissionless, and free, so the guides will also usually warn you that you need to add another provider if you don't want to run into rate limiting. Listen to these warnings! The rate-limits of public providers are severe and you'll start getting limited very quickly.

In wagmi, the `publicClient` is just a wrapper setting up a [JSON RPC] provider using the `chain` and `rpcUrls` listed in Viem's directory of chain information. For example, you can view the [data for Base Goerli here].

Most chains will list this information in their docs as well. For example, on the network information pages for [Base] and [Optimism]. If you wanted, you could manually set up a `jsonRpcProvider` in wagmi using this information.

### Wallet Providers

Many wallets, including Coinbase and Metamask, inject an Ethereum provider into the browser, as defined in [EIP-1193]. The injected provider is accessible via `window.ethereum`.

Under the hood, these are also just JSON RPC providers. Similar to public providers, they are rate-limited.

Older tutorials for early libraries tended to suggest using this method for getting started, so you'll probably encounter references to it. However, it's fallen out of favor and you'll want to use the public provider for your initial connection experiments.

### Vendor Providers

A growing number of vendors provide access to blockchain nodes as a service. Visiting the landing pages for [Quicknode] (formerly Quiknode), [Blockdaemon], or [Alchemy] can be a little confusing. Each of these vendors provides a wide variety of services, SDKs, and information.

Luckily, you can skip most of this if you're just trying to get your frontend connected to you smart contracts, because most of it is handled by wagmi/Viem. You'll just need to sign up for an account and get an endpoint, or a key, and configure your app to connect to the provider(s) you choose.

It is worth digging in to get a better understanding of how these providers charge you for their services. The table below summarizes some of the more important API methods, and how you are charged for them by each of the above providers.

Note that the information below may change, and varies by network. Each provider also has different incentives, discounts, and fees for each level of product. They also have different allowances for calls per second, protocols, and number of endpoints. Please check the source to confirm!

|                 | [Alchemy Costs]  | [Blockdaemon Costs] | [Quicknode Costs] |
| --------------- | ---------------- | ------------------- | ----------------- |
| Free Tier / Mo. | 3M compute units | 3M compute units    | 50M credits       |
| Mid Tier / Mo.  | 1.5B CUs @ $199  | 30M CUs @ $199      | 3B credits @ $299 |
| eth_blocknumber | 10               | 1                   | 20                |
| eth_call        | 26               | 10                  | 20                |
| eth_getlogs     | 75               | 50                  | 20                |
| eth_getbalance  | 19               | 5                   | 20                |

To give you an idea of usage amounts, a single wagmi `useContractRead` hook set to `watch` for changes on a single `view` will call `eth_blocknumber` and `eth_call` one time each, every 4 seconds.

---

## Conclusion

In this article, you've learned how Providers supply blockchain connection as a service, eliminating the need for developers to run and maintain their own nodes. You've also seen three options for vendors and explored the similarities and differences in how they price their services. Finally, you've learned that a public provider will let you do your initial explorations in connecting to your smart contracts, but they are severely rate-limited.

---

[Next.js]: https://nextjs.org/
[Subgraph]: https://thegraph.com/docs/en/developing/creating-a-subgraph/
[wagmi]: https://wagmi.sh/react/getting-started#configure-chains
[data for Base Goerli here]: https://github.com/wagmi-dev/viem/blob/main/src/chains/definitions/baseGoerli.ts
[Base]: https://docs.base.org/network-information
[Optimism]: https://community.optimism.io/docs/useful-tools/networks/
[EIP-1193]: https://eips.ethereum.org/EIPS/eip-1193
[Alchemy]: https://www.alchemy.com/
[Blockdaemon]: https://www.blockdaemon.com/
[Quicknode]: https://www.quicknode.com/
[Alchemy Costs]: https://docs.alchemy.com/reference/compute-unit-costs
[Blockdaemon Costs]: https://docs.blockdaemon.com/reference/ethereum-compute-units
[Quicknode Costs]: https://www.quicknode.com/api-credits/base
