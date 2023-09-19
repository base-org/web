---
title: Testnet
slug: /tools/bridges-testnet
---

# Bridges

---

## Base Bridge (Testnet)

The [Base Bridge](https://goerli-bridge.base.org/) for testnet allows you to bridge ETH and certain ERC-20s from Ethereum Goerli to Base Goerli and vice versa.

To bridge to or from Base Goerli:

1. Visit [Base Bridge](https://goerli-bridge.base.org/)
2. Click **Connect wallet**
3. Connect your wallet
4. Choose the amount of ETH (or the asset of your choice that's available) you'd like to deposit or withdraw

---

## Programmatic Bridging

See the [sample code repository](https://github.com/base-org/guides/tree/main/bridge/native) to see how to bridge ETH and ERC-20s from Ethereum Goerli to Base Goerli.

:::caution

**Double check the token address for ERC-20s** You can use any ERC-20 that is
supported on the network. You can check what assets are on Base Goerli and the
corresponding contract address via [this hub](https://github.com/ethereum-optimism/ethereum-optimism.github.io/tree/master/data).
Ensure there is an address for `base-goerli`, [example](https://github.com/ethereum-optimism/ethereum-optimism.github.io/blob/master/data/WETH/data.json#L19-L21).
Always test with small amounts to ensure the system is working as expected.

:::

:::caution
This implementation only can bridge assets to Base. Do not attempt to alter the
code to withdraw the assets.

:::

---

## Wormhole

Wormhole's [Token Bridge](https://wormhole-foundation.github.io/example-token-bridge-ui/#/transfer) allows you to send assets from any Wormhole connected chain to Base and vice versa.

To bridge to Base Goerli:

1. Visit Wormhole’s [Token Bridge](https://wormhole-foundation.github.io/example-token-bridge-ui/#/transfer) (testnet)
2. Connect your wallet
3. Choose the chain and asset you’d like to send to Base Goerli then follow the instructions on the [Token Bridge](https://wormhole-foundation.github.io/example-token-bridge-ui/#/transfer)

### Wormhole Testnet Contract

| Chain Name | Wormhole Chain ID | Network ID | Address                                    |
| :--------- | :---------------- | :--------- | :----------------------------------------- |
| Base       | 30                | 84531      | 0x23908A62110e21C04F3A4e011d24F901F911744A |

See more info [here](https://book.wormhole.com/reference/contracts.html).

---
