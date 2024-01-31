---
title: Testnet
slug: /tools/bridges-testnet
description: Documentation for bridging assets to the Base testnet. This page covers how to bridge ETH and ERC-20s between Ethereum testnet and Base testnet, with essential cautions and contract information.
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
    Ethereum Goerli,
    Base Goerli,
    Ethereum Sepolia,
    Base Sepolia,
    ETH,
    ERC-20 tokens,
    Base Testnet,
    asset bridging,
  ]
---

# Bridges

---

## Base Bridge (Testnet)

The [Base Bridge](https://sepolia-bridge.base.org/) for testnet allows you to bridge ETH and certain ERC-20s from Ethereum Sepolia to Base Sepolia and vice versa.

To bridge to or from Base Sepolia:

1. Visit [Base Bridge](https://sepolia-bridge.base.org/)
2. Click **Connect wallet**
3. Connect your wallet
4. Choose the amount of ETH (or the asset of your choice that's available) you'd like to deposit or withdraw

---

## Programmatic Bridging

See the [sample code repository](https://github.com/base-org/guides/tree/main/bridge/native) to see how to bridge ETH and ERC-20s from Ethereum Sepolia to Base Sepolia.

:::caution

**Double check the token address for ERC-20s** You can use any ERC-20 that is
supported on the network. You can check what assets are on Base Sepolia and the
corresponding contract address via [this hub](https://github.com/ethereum-optimism/ethereum-optimism.github.io/tree/master/data).
Ensure there is an address for `base-sepolia`, [example](https://github.com/ethereum-optimism/ethereum-optimism.github.io/blob/master/data/WETH/data.json#L19-L21).
Always test with small amounts to ensure the system is working as expected.

:::

:::caution
This implementation only can bridge assets to Base. Do not attempt to alter the
code to withdraw the assets.

:::

---

## Wormhole

Wormhole's [Token Bridge](https://wormhole-foundation.github.io/example-token-bridge-ui/#/transfer) allows you to send assets from any Wormhole connected chain to Base and vice versa.

To bridge to Base Sepolia:

1. Visit Wormhole’s [Token Bridge](https://wormhole-foundation.github.io/example-token-bridge-ui/#/transfer) (testnet)
2. Connect your wallet
3. Choose the chain and asset you’d like to send to Base Sepolia then follow the instructions on the [Token Bridge](https://wormhole-foundation.github.io/example-token-bridge-ui/#/transfer)

See more info [here](https://book.wormhole.com/reference/contracts.html).

---
