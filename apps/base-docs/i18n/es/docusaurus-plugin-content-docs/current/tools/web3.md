---
title: web3.js
slug: /tools/web3
description: Documentation for using web3.js, a JavaScript library for interacting with EVM-compatible blockchains. This page covers installation, setup, connecting to the Base network and interacting with smart contracts.
keywords:
  [
    web3.js,
    Base,
    Base mainnet,
    Base testnet,
    Base network,
    JavaScript,
    EVM,
    client library,
    blockchain,
    smart contracts,
    Ethereum,
    RPC URL,
  ]
hide_table_of_contents: true
---

# web3.js

[web3.js](https://web3js.org/) es una biblioteca de JavaScript que permite a los desarrolladores interactuar con redes blockchain compatibles con EVM.

Puedes usar web3.js para interactuar con contratos inteligentes desplegados en la red Base.

---

## Instalación

Para instalar web3.js ejecuta el siguiente comando:

```bash
npm install web3
```

## Configuración

Antes de que puedas empezar a usar web3.js, necesitas importarlo en tu proyecto.

Agrega la siguiente línea de código al inicio de tu archivo para importar web3.js:

```javascript
//web3.js v1
const Web3 = require('web3');

//web3.js v4
const { Web3 } = require('web3');
```

## Conectando a Base

Puedes conectarte a Base instanciando un nuevo objeto `Web3` de web3.js con una URL RPC de la red Base:

```javascript
const { Web3 } = require('web3');

const web3 = new Web3('https://mainnet.base.org');
```

:::info

Para conectarte alternativamente a Base Sepolia (testnet), cambia la URL anterior de `https://mainnet.base.org` a `https://sepolia.base.org`.

:::

## Accediendo a datos

Una vez que hayas creado un proveedor, puedes usarlo para leer datos de la red Base.

Por ejemplo, puedes usar el método `getBlockNumber` para obtener el último bloque:

```javascript
async function getLatestBlock(address) {
  const latestBlock = await web3.eth.getBlockNumber();
  console.log(latestBlock.toString());
}
```

## Desplegando contratos

Antes de que puedas desplegar un contrato en la red Base usando web3.js, primero debes crear una cuenta.

Puedes crear una cuenta usando `web3.eth.accounts`:

```javascript
const privateKey = “PRIVATE_KEY”;
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
```

:::info

`PRIVATE_KEY` es la clave privada de la billetera a usar al crear la cuenta.

:::

## Interactuando con contratos inteligentes

Puedes usar web3.js para interactuar con un contrato inteligente en Base instanciando un objeto `Contract` usando el ABI y la dirección de un contrato desplegado:

```javascript
const abi = [
… // ABI of deployed contract
];

const contractAddress = "CONTRACT_ADDRESS"

const contract = new web3.eth.Contract(abi, contractAddress);
```

Una vez que hayas creado un objeto `Contract`, puedes usarlo para llamar a los métodos deseados en el contrato inteligente:

```javascript
async function setValue(value) {
  // write query
  const tx = await contract.methods.set(value).send();
  console.log(tx.transactionHash);
}

async function getValue() {
  // read query
  const value = await contract.methods.get().call();
  console.log(value.toString());
}
```

:::info

Para más información sobre el despliegue de contratos en Base, consulta [Desplegando un Contrato Inteligente](/guides/deploy-smart-contracts).

:::