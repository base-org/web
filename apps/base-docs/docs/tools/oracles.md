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

Check out these guides on how to:

- [Use dAPIs on the Market](https://docs.api3.org/guides/dapis/subscribing-to-dapis/)
- [Read a dAPI](https://docs.api3.org/guides/dapis/read-a-dapi/)
- [Get started with QRNG](https://docs.api3.org/guides/qrng/)

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

## Pyth

[Pyth](http://pyth.network/) offers 250+ [price feeds](https://pyth.network/price-feeds) for Base.

See [this guide](https://docs.pyth.network/documentation/pythnet-price-feeds/evm) to learn how to use the Pyth feeds.

#### Supported Networks

- Base Mainnet
- Base Sepolia (Testnet)

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
