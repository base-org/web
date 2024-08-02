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

# Puentes Superchain

---

## Superbridge

Superbridge te permite puentear ETH y otros activos compatibles desde la red principal de Ethereum (L1) directamente a Base.

#### Redes compatibles

- [Base Mainnet](https://superbridge.app/base)
- [Base Sepolia (Testnet)](https://superbridge.app/base-sepolia)

---

## Brid.gg

Brid.gg es otra opción que también te ayuda a puentear ETH y activos compatibles entre la red principal de Ethereum (L1) y Base.

#### Redes compatibles

- [Base Mainnet](https://brid.gg/base)
- [Base Sepolia (Testnet)](https://testnet.brid.gg/base-sepolia)

---

:::info

Coinbase Technologies, Inc., proporciona enlaces a los proveedores de servicios independientes mencionados anteriormente para tu conveniencia, pero no asume ninguna responsabilidad por sus operaciones. Cualquier interacción con estos proveedores es únicamente entre tú y el proveedor.

:::

---

## Puenteo programático

Consulta el [repositorio de código de ejemplo](https://github.com/base-org/guides/tree/main/bridge/native) para ver cómo puentear ETH y ERC-20s desde Ethereum a Base.

:::caution

**Verifica dos veces la dirección del token para ERC-20s** Puedes usar cualquier ERC-20 que esté
soportado en la red. Puedes verificar qué activos están en Base y la
dirección del contrato correspondiente a través de [este hub](https://github.com/ethereum-optimism/ethereum-optimism.github.io/tree/master/data).
Asegúrate de que haya una dirección para `base`, [ejemplo](https://github.com/ethereum-optimism/ethereum-optimism.github.io/blob/master/data/WETH/data.json#L16-L18).
Siempre prueba con pequeñas cantidades para asegurarte de que el sistema funcione como se espera.

:::

:::caution
Esta implementación solo puede puentear activos a Base. No intentes alterar el
código para retirar los activos.

:::

---

```

```