---
title: Superchain Bridges
slug: /tools/bridges
description: Documentation for bridging assets to Base. This page covers how to bridge ETH and ERC-20s between Ethereum (L1) and Base along with essential information.
keywords:
  [
    Base,
    Base network,
    bridging,
    bridge to Base,
    bridge ETH,
    bridge ETH to Base,
    Base Bridge,
    Wormhole Token Bridge,
    Ethereum Mainnet,
    Base Mainnet,
    ETH,
    ERC-20 tokens,
    asset bridging,
  ]
hide_table_of_contents: true
---

es + es-translated # Superchain Bridges

---

es + es-translated ## Superbridge

es + es-translated Superbridge enables you to bridge ETH and other supported assets from Ethereum mainnet (L1) directly to Base.

es + es-translated #### Supported Networks

es + es-translated - [Base Mainnet](https://superbridge.app/base)
- [Base Sepolia (Testnet)](https://superbridge.app/base-sepolia)

---

es + es-translated ## Brid.gg

es + es-translated Brid.gg is another option that also helps you bridge ETH and supported assets between Ethereum mainnet (L1) and Base.

es + es-translated #### Supported Networks

es + es-translated - [Base Mainnet](https://brid.gg/base)
- [Base Sepolia (Testnet)](https://testnet.brid.gg/base-sepolia)

---

es + es-translated :::info

es + es-translated Coinbase Technologies, Inc., provides links to the above independent service providers for your convenience but assumes no responsibility for their operations. Any interactions with these providers are solely between you and the provider.

es + es-translated :::

---

es + es-translated ## Programmatic Bridging

es + es-translated See the [sample code repository](https://github.com/base-org/guides/tree/main/bridge/native) to see how to bridge ETH and ERC-20s from Ethereum to Base.

es + es-translated :::caution

es + es-translated **Double check the token address for ERC-20s** You can use any ERC-20 that is
supported on the network. You can check what assets are on Base and the
corresponding contract address via [this hub](https://github.com/ethereum-optimism/ethereum-optimism.github.io/tree/master/data).
Ensure there is an address for `base`, [example](https://github.com/ethereum-optimism/ethereum-optimism.github.io/blob/master/data/WETH/data.json#L16-L18).
Always test with small amounts to ensure the system is working as expected.

es + es-translated :::

es + es-translated :::caution
This implementation only can bridge assets to Base. Do not attempt to alter the
code to withdraw the assets.

es + es-translated :::

---

```

```