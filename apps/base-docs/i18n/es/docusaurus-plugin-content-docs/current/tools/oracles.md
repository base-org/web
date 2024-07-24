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

# Oráculos

---

## API3

[API3](https://api3.org/) está construyendo oráculos de primera parte seguros para Base.

API3 está en vivo con:

- [dAPIs](https://docs.api3.org/guides/dapis/subscribing-managed-dapis/): Feeds de datos agregados de primera parte obtenidos directamente de los proveedores de datos.
- [Airnode](https://docs.api3.org/guides/airnode/calling-an-airnode/): La solución de oráculo sin servidor de primera parte para llevar cualquier API REST a la cadena.
- [QRNG](https://docs.api3.org/guides/qrng/): Generador de Números Aleatorios Cuánticos para RNG cuántico verificable en la cadena.

#### Redes Soportadas

- Base Mainnet

---

## Chainlink

[Chainlink](https://chain.link/) proporciona una serie de [feeds de precios](https://docs.chain.link/data-feeds/price-feeds/addresses/?network=base) para Base.

Consulta [esta guía](https://docs.chain.link/docs/get-the-latest-price/) para aprender cómo usar los feeds de Chainlink.

:::info

Para usar los feeds de datos de Chainlink, puede que necesites el token [LINK](https://docs.chain.link/resources/link-token-contracts?parent=dataFeeds).

:::

#### Redes Soportadas

- Base Mainnet
- Base Sepolia (Testnet)

---

## Chronicle

[Chronicle](https://chroniclelabs.org/) proporciona una serie de [Oráculos](https://chroniclelabs.org/dashboard) para Base.

Consulta [esta guía](https://docs.chroniclelabs.org/Developers/tutorials/Remix) para aprender cómo usar los oráculos de Chronicle.

#### Redes Soportadas

- Base Mainnet
- Base Sepolia (Testnet)

---

## DIA

[DIA](https://www.diadata.org/) proporciona más de 2000 [feeds de precios](https://www.diadata.org/app/price/) para Base.
Consulta [esta guía](https://docs.diadata.org/introduction/intro-to-dia-oracles/request-an-oracle) para aprender cómo usar los feeds de DIA.

#### Redes Soportadas

- Base Mainnet
- Base Sepolia (Testnet)

---

## Gelato

Gelato VRF (Función Aleatoria Verificable) proporciona un sistema único que ofrece aleatoriedad confiable en Base.

Consulta esta guía para aprender cómo empezar con [Gelato VRF](https://docs.gelato.network/web3-services/vrf/quick-start).

#### Redes Soportadas

- Base Mainnet
- Base Sepolia (Testnet)

---

## Pyth

[Pyth](http://pyth.network/) ofrece más de 250 [feeds de precios](https://pyth.network/price-feeds) para Base.

Consulta [esta guía](https://docs.pyth.network/documentation/pythnet-price-feeds/evm) para aprender cómo usar los feeds de Pyth.

#### Redes Soportadas

- Base Mainnet
- Base Sepolia (Testnet)

---

## RedStone

[RedStone](https://redstone.finance/) proporciona más de 1200 [feeds de precios](https://app.redstone.finance/) para Base.

Consulta [esta guía](https://docs.redstone.finance/) para aprender cómo usar los feeds de RedStone.

#### Redes Soportadas

- Base Mainnet

---

## Supra

[Supra](https://supraoracles.com) proporciona VRF y feeds de precios de oráculos descentralizados que pueden ser utilizados para casos de uso en la cadena y fuera de la cadena, como DEXes spot y perpetuos, protocolos de préstamos y protocolos de pagos. La cadena de oráculos y el algoritmo de consenso de Supra lo convierten en uno de los proveedores de oráculos más rápidos en alcanzar la finalización, con garantías de seguridad de capa 1. El oráculo pull tiene un tiempo de respuesta inferior a un segundo. Además de la velocidad y la seguridad, la arquitectura de nodos rotativos de Supra recopila datos de más de 40 fuentes de datos y aplica una metodología de cálculo robusta para obtener el valor más preciso. La procedencia de los nodos en el panel de datos también proporciona una pista de auditoría histórica completamente transparente. El documento de Acuerdo de Oráculo Distribuido (DORA) de Supra fue aceptado en ICDCS 2023, la conferencia de sistemas distribuidos más antigua.

Visita la [documentación](https://supraoracles.com/docs/) de Supra para aprender más sobre cómo integrar el oráculo y VRF de Supra en tu proyecto Base.

#### Redes Soportadas

- Base Mainnet
- Base Sepolia (Testnet)

---