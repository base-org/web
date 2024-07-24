---
title: viem
slug: /tools/viem
description: Documentation for using Viem, a TypeScript interface for EVM-compatible blockchains. This page covers installation, setup, and various functionalities such as reading and writing blockchain data and interacting with smart contracts on Base.
keywords:
  [
    viem,
    Base,
    Base mainnet,
    Base testnet,
    Ethereum,
    smart contracts,
    blockchain,
    RPC URL,
    JavaScript,
    TypeScript,
  ]
hide_table_of_contents: true
---

# viem

:::info

Viem está actualmente disponible solo en la testnet Base Sepolia.

:::

[viem](https://viem.sh/) es una interfaz de TypeScript para Ethereum que proporciona primitivas sin estado de bajo nivel para interactuar con Ethereum.

Puedes usar viem para interactuar con contratos inteligentes desplegados en Base.

---

## Instalar

Para instalar viem, ejecuta el siguiente comando:

```bash
npm install --save viem
```

## Configuración

Antes de que puedas empezar a usar viem, necesitas configurar un [Cliente](https://viem.sh/docs/clients/intro.html) con un [Transporte](https://viem.sh/docs/clients/intro.html) y [Cadena](https://viem.sh/docs/chains/introduction) deseados.

```javascript
import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';

const client = createPublicClient({
  chain: base,
  transport: http(),
});
```

:::info

Para usar Base, debes especificar `base` como la cadena al crear un Cliente.

Para usar Base Sepolia (testnet), reemplaza `base` con `baseSepolia`.

:::

## Leyendo datos de la blockchain

Una vez que hayas creado un cliente, puedes usarlo para leer y acceder a datos de Base usando [Acciones Públicas](https://viem.sh/docs/actions/public/introduction.html)

Las Acciones Públicas son métodos del cliente que se mapean uno a uno con un método RPC "público" de Ethereum (`eth_blockNumber`, `eth_getBalance`, etc.)

Por ejemplo, puedes usar el método del cliente `getBlockNumber` para obtener el último bloque:

```javascript
const blockNumber = await client.getBlockNumber();
```

## Escribiendo datos en la blockchain

Para escribir datos en Base, necesitas crear un cliente de Wallet (`createWalletClient`) y especificar una [`Cuenta`](https://ethereum.org/en/developers/docs/accounts/) para usar.

```javascript
import { createWalletClient, custom } from 'viem'
import { base } from 'viem/chains'

//highlight-start
const [account] = await window.ethereum.request({ method: 'eth_requestAccounts' })
//highlight-end

const client = createWalletClient({
  //highlight-next-line
  account,
  chain: base,
  transport: custom(window.ethereum)
})

client.sendTransaction({ ... })
```

:::info

Además de hacer una solicitud JSON-RPC (`eth_requestAccounts`) para obtener una Cuenta, viem proporciona varios métodos auxiliares para crear una `Cuenta`, incluyendo: [`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey.html), [`mnemonicToAccount`](https://viem.sh/docs/accounts/mnemonic.html), y [`hdKeyToAccount`](https://viem.sh/docs/accounts/hd.html).

Para usar Base Sepolia (testnet), reemplaza `base` con `baseSepolia`.

:::

## Interactuando con contratos inteligentes

Puedes usar viem para interactuar con un contrato inteligente en Base creando una instancia de `Contract` usando [`getContract`](https://viem.sh/docs/contract/getContract.html) y pasándole el ABI del contrato, la dirección del contrato, y el Cliente [Público](https://viem.sh/docs/clients/public.html) y/o [Wallet](https://viem.sh/docs/clients/wallet.html):

```javascript
import { getContract } from 'viem';
import { wagmiAbi } from './abi';
import { publicClient } from './client';

// 1. Create contract instance
const contract = getContract({
  address: 'CONTRACT_ADDRESS',
  abi: wagmiAbi,
  publicClient,
});

// 2. Call contract methods, listen to events, etc.
const result = await contract.read.totalSupply();
```

:::info

`CONTRACT_ADDRESS` es la dirección del contrato desplegado.

:::