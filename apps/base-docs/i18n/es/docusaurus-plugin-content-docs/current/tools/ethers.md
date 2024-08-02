---
title: ethers.js
slug: /tools/ethers
description: Documentation for using ethers.js, a JavaScript library for EVM-compatible blockchain interactions. This page covers installation, setup, connecting to the Base network, reading and writing blockchain data, and interacting with smart contracts.
keywords:
  [
    ethers.js,
    JavaScript library,
    Base network,
    Base mainnet,
    Base testnet,
    smart contracts,
    EVM-compatible,
    blockchain,
    JsonRpcProvider,
    Signer,
    ABI,
    interacting with smart contract,
  ]
hide_table_of_contents: true
---

# ethers.js

[ethers.js](https://docs.ethers.org/v5/) es una biblioteca de JavaScript que permite a los desarrolladores interactuar con redes blockchain compatibles con EVM.

Puedes usar ethers.js para interactuar con contratos inteligentes desplegados en la red Base.

---

## Instalar

Para instalar ethers.js ejecuta el siguiente comando:

```bash
npm install --save ethers
```

## Configuración

Antes de que puedas empezar a usar ethers.js, necesitas importarlo en tu proyecto.

Agrega la siguiente línea de código en la parte superior de tu archivo para importar ethers.js:

```javascript
const ethers = require('ethers');
```

## Conectarse a Base

Puedes conectarte a Base instanciando un nuevo objeto `JsonRpcProvider` de ethers.js con una URL RPC de la red Base:

```javascript
const ethers = require('ethers');

const url = 'https://mainnet.base.org';
const provider = new ethers.providers.JsonRpcProvider(url);
```

:::info

Para conectarse alternativamente a Base Sepolia (testnet), cambia la URL anterior de `https://mainnet.base.org` a `https://sepolia.base.org`.

:::

## Leer datos de la blockchain

Una vez que hayas creado un proveedor, puedes usarlo para leer datos de la red Base.

Por ejemplo, puedes usar el método `getBlockNumber` para obtener el último bloque:

```javascript
async function getLatestBlock() {
  const latestBlock = await provider.getBlockNumber();
  console.log(latestBlock);
}
```

## Escribir datos en la blockchain

Para escribir datos en la red Base, necesitas crear un `Signer`.

Puedes crear un `Signer` instanciando un nuevo objeto `Wallet` de ethers.js, proporcionándole una clave privada y un `Provider`.

```javascript
const privateKey = 'PRIVATE_KEY';
const signer = new ethers.Wallet(privateKey, provider);
```

:::info

`PRIVATE_KEY` es la clave privada de la billetera a usar al crear el firmante.

:::

## Interactuar con contratos inteligentes

Puedes usar ethers.js para interactuar con un contrato inteligente en Base instanciando un objeto `Contract` usando el ABI y la dirección de un contrato desplegado:

```javascript
const abi = [
… // ABI of deployed contract
];

const contractAddress = "CONTRACT_ADDRESS"

// read only
const contract = new ethers.Contract(contractAddress, abi, provider);
```

Para contratos de solo escritura, proporciona un objeto `Signer` en lugar de un objeto `Provider`:

```javascript
// write only
const contract = new ethers.Contract(contractAddress, abi, signer);
```

:::info

`CONTRACT_ADDRESS` es la dirección del contrato desplegado.

:::

Una vez que hayas creado un objeto `Contract`, puedes usarlo para llamar a los métodos deseados en el contrato inteligente:

```javascript
async function setValue(value) {
  const tx = await contract.set(value);
  console.log(tx.hash);
}

async function getValue() {
  const value = await contract.get();
  console.log(value.toString());
}
```