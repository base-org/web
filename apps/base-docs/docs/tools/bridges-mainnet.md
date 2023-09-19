---
title: Mainnet
slug: /tools/bridges
---

# Bridges

---

## Base Bridge

The [Base Bridge](https://bridge.base.org/) allows you to bridge ETH and certain ERC-20s from Ethereum to Base and vice versa.

To bridge to or from Base:

1. Visit [Base Bridge](https://bridge.base.org/)
2. Click **Connect wallet**
3. Connect your wallet
4. Choose the amount of ETH (or the asset of your choice that's available) you'd like to deposit or withdraw

For frequently asked questions about Base Bridge, be sure to check out the [Bridge FAQ](/tools/bridge-faq/).

---

## Programmatic Bridging

See the [sample code repository](https://github.com/base-org/guides/tree/main/bridge/native) to see how to bridge ETH and ERC-20s from Ethereum to Base.

:::caution

**Double check the token address for ERC-20s** You can use any ERC-20 that is
supported on the network. You can check what assets are on Base and the
corresponding contract address via [this hub](https://github.com/ethereum-optimism/ethereum-optimism.github.io/tree/master/data).
Ensure there is an address for `base`, [example](https://github.com/ethereum-optimism/ethereum-optimism.github.io/blob/master/data/WETH/data.json#L16-L18).
Always test with small amounts to ensure the system is working as expected.

:::

:::caution
This implementation only can bridge assets to Base. Do not attempt to alter the
code to withdraw the assets.

:::

---
