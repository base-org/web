---
title: Oracles
slug: /tools/oracles
description: Documentation for various blockchain oracles for Base. Including support for price feeds and verifiable random functions (VRF).
keywords:
  [
    Oracles,
    Oracle,
    Base,
    Base Mainnet,
    Base Testnet,
    Base network,
    Supra,
    Chainlink,
    Chronicle,
    ORA,
    Pyth,
    VRF,
    Gelato VRF,
    Gelato verifable random function,
    verifiable random function,
    generate random numbers,
    RNG,
    true randomness,
    price feeds,
    data feeds,
  ]
hide_table_of_contents: true
---

# Oracles

---

## API3

The API3 Market provides access to 200+ price feeds on [Base Mainnet](https://market.api3.org/base) and [Base Testnet](https://market.api3.org/base-sepolia-testnet). The price feeds operate as a native push oracle and can be activated instantly via the Market UI.

The price feeds are delivered by an aggregate of [first-party oracles](https://docs.api3.org/explore/airnode/why-first-party-oracles.html) using signed data and support [OEV recapture](https://docs.api3.org/explore/introduction/oracle-extractable-value.html).

Unlike traditional data feeds, reading [API3 price feeds](https://docs.api3.org/guides/dapis/) enables dApps to auction off the right to update the price feeds to searcher bots which facilitates more efficient liquidation processes for users and LPs of DeFi money markets. The OEV recaptured is returned to the dApp.

Apart from data feeds, API3 also provides [Quantum Random Number Generation](https://docs.api3.org/explore/qrng/) on Base Mainnet and Testnet. QRNG is a free-to-use service that provides quantum randomness onchain. It is powered by [Airnode](https://docs.api3.org/reference/airnode/latest/understand/), the first-party oracle that is directly operated by the [QRNG API providers](https://docs.api3.org/reference/qrng/providers.html). Read more about QRNG [here](https://docs.api3.org/reference/qrng).

Check out these guides to learn more:

- [dAPIs](https://docs.api3.org/guides/dapis/subscribing-to-dapis/): First-party aggregated data feeds sourced directly from the data providers.
- [Airnode](https://docs.api3.org/guides/airnode/calling-an-airnode/): The first-party serverless Oracle solution to bring any REST API onchain.
- [QRNG](https://docs.api3.org/guides/qrng/): Quantum Random Number Generator for verifiable quantum RNG onchain.

#### Supported Networks

- Base Mainnet
- Base Sepolia (Testnet)

---

## Chainlink

[Chainlink](https://chain.link/) provides a number of [price feeds](https://docs.chain.link/data-feeds/price-feeds/addresses/?network=base) for Base.

See [this guide](https://docs.chain.link/docs/get-the-latest-price/) to learn how to use the Chainlink feeds.

:::info

To use Chainlink datafeeds, you may need [LINK](https://docs.chain.link/resources/link-token-contracts?parent=dataFeeds) token.

:::

#### Supported Networks

- Base Mainnet
- Base Sepolia (Testnet)

---

## Chronicle

[Chronicle](https://chroniclelabs.org/) provides a number of [Oracles](https://chroniclelabs.org/dashboard) for Base.

See [this guide](https://docs.chroniclelabs.org/Developers/tutorials/Remix) to learn how to use the Chronicle Oracles.

#### Supported Networks

- Base Mainnet
- Base Sepolia (Testnet)

---

## DIA

[DIA](https://www.diadata.org/) provides 2000+ [price feeds](https://www.diadata.org/app/price/) for Base.
See [this guide](https://docs.diadata.org/introduction/intro-to-dia-oracles/request-an-oracle) to learn how to use the DIA feeds.

#### Supported Networks

- Base Mainnet
- Base Sepolia (Testnet)

---

## Gelato

Gelato VRF (Verifiable Random Function) provides a unique system offering trustable randomness on Base.

See this guide to learn how to get started with [Gelato VRF](https://docs.gelato.network/web3-services/vrf/quick-start).

#### Supported Networks

- Base Mainnet
- Base Sepolia (Testnet)

---

## ORA

[ORA](https://ora.io) provides an [Onchain AI Oracle](https://docs.ora.io/doc/oao-onchain-ai-oracle/introduction) for Base.

See [this guide](https://docs.ora.io/doc/oao-onchain-ai-oracle/develop-guide/tutorials/interaction-with-oao-tutorial) to learn how to use ORA Onchain AI Oracle.

#### Supported Networks

- Base Mainnet

---

## Pyth

The [Pyth Network](https://pyth.network/) is one of the largest first-party Oracle network, delivering real-time data across [a vast number of chains](https://docs.pyth.network/price-feeds/contract-addresses). Pyth introduces an innovative low-latency [pull oracle design](https://docs.pyth.network/documentation/pythnet-price-feeds/on-demand), where users can pull price updates onchain when needed, enabling everyone in the onchain environment to access that data point most efficiently. Pyth network updates the prices every **400ms**, making Pyth one of the fastest onchain oracles.

#### Pyth Price Feeds Features:

- 400ms latency
- Efficient and cost-effective Oracle
- [First-party](https://pyth.network/publishers) data sourced directly from financial institutions
- [Price feeds ranging from Crypto, Stock, FX, Metals](https://pyth.network/developers/price-feed-ids)
- [Available on all major chains](https://docs.pyth.network/price-feeds/contract-addresses)

#### Supported Networks for Base (Pyth Price Feeds):
- Base Mainnet: [`0x8250f4aF4B972684F7b336503E2D6dFeDeB1487a`](https://basescan.org/address/0x8250f4aF4B972684F7b336503E2D6dFeDeB1487a) 
- Base Sepolia: [`0xA2aa501b19aff244D90cc15a4Cf739D2725B5729`](https://base-sepolia.blockscout.com/address/0xA2aa501b19aff244D90cc15a4Cf739D2725B5729)


### Pyth Entropy
Pyth Entropy allows developers to quickly and easily generate secure **random numbers** onchain.

Check [how to generate random numbers in EVM contracts](https://docs.pyth.network/entropy/generate-random-numbers/evm) for a detailed walkthrough.

#### Supported Networks for Base (Pyth Entropy):
- Base Mainnet: [`0x6E7D74FA7d5c90FEF9F0512987605a6d546181Bb`](https://basescan.org/address/0x6E7D74FA7d5c90FEF9F0512987605a6d546181Bb) 
- Base Sepolia: [`0x41c9e39574F40Ad34c79f1C99B66A45eFB830d4c`](https://base-sepolia.blockscout.com/address/0x41c9e39574F40Ad34c79f1C99B66A45eFB830d4c)


Check out the following links to get started with Pyth.

- [Pyth Price Feed EVM Integration Guide](https://docs.pyth.network/price-feeds/use-real-time-data/evm)
- [Pyth Docs](https://docs.pyth.network/home)
- [Pyth Price Feed API Reference](https://api-reference.pyth.network/price-feeds/evm/getPrice)
- [Pyth Examples](https://github.com/pyth-network/pyth-examples)
- [Website](https://pyth.network/)
- [Twitter](https://x.com/PythNetwork)

---

## RedStone

[RedStone](https://redstone.finance/) provides 1200+ [price feeds](https://app.redstone.finance/) for Base.

See [this guide](https://docs.redstone.finance/) to learn how to use the RedStone feeds.

#### Supported Networks

- Base Mainnet

---

## Supra

[Supra](https://supraoracles.com) provides VRF and decentralized oracle price feeds that can be used for onchain and offchain use-cases such as spot and perpetual DEXes, lending protocols, and payments protocols. Supra’s oracle chain and consensus algorithm makes it one of the fastest-to-finality oracle providers, with layer-1 security guarantees. The pull oracle has a sub-second response time. Aside from speed and security, Supra’s rotating node architecture gathers data from 40+ data sources and applies a robust calculation methodology to get the most accurate value. The node provenance on the data dashboard also provides a fully transparent historical audit trail. Supra’s Distributed Oracle Agreement (DORA) paper was accepted into ICDCS 2023, the oldest distributed systems conference.

Visit the Supra [documentation](https://supraoracles.com/docs/) to learn more about integrating Supra's oracle and VRF into your Base project.

#### Supported Networks

- Base Mainnet
- Base Sepolia (Testnet)

---
