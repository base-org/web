---
title: thirdweb SDK
slug: /tools/thirdweb-sdk
description: Documentation for using the thirdweb SDK for building web3 applications and interacting with smart contracts on Base. This page covers installation, initialization, and functionalities in various programming languages.
keywords:
  [
    thirdweb SDK,
    thirdweb,
    Base,
    Base mainnet,
    Base testnet,
    Base network,
    web3 applications,
    smart contracts,
    React,
    TypeScript,
  ]
hide_table_of_contents: true
---

# thirdweb SDK

thirdweb SDK es una biblioteca que permite a los desarrolladores construir aplicaciones web3 e interactuar con cualquier blockchain compatible con EVM.

Puedes usar el thirdweb SDK para construir aplicaciones e interactuar con contratos inteligentes desplegados en la red Base.

El thirdweb SDK está disponible en varios lenguajes de programación, incluyendo: [React](https://portal.thirdweb.com/react), [React Native](https://portal.thirdweb.com/react-native), [TypeScript](https://portal.thirdweb.com/typescript), [Python](https://portal.thirdweb.com/python), [Go](https://portal.thirdweb.com/go) y [Unity](https://portal.thirdweb.com/unity).

Visita la [documentación de thirdweb](https://portal.thirdweb.com/cli) para más instrucciones sobre el uso de los SDKs de thirdweb.

---

## Instalar

Para instalar el thirdweb SDK, ejecuta:

```bash
npm install @thirdweb-dev/sdk ethers@5
```

---

## Inicializando el SDK con Base

Para comenzar a usar el SDK, primero debes inicializar una instancia de `ThirdWebSDK`, y conectarte a la red Base pasando la cadena `Base`.

Para inicializar el SDK con la red Base y obtener un contrato:

```javascript
import { Base } from '@thirdweb-dev/chains';
import { ThirdwebSDK } from '@thirdweb-dev/sdk/evm';

const sdk = new ThirdwebSDK(Base);
const contract = await sdk.getContract('0x0000000000000000000000000000000000000000');
```

:::info

El fragmento de código anterior usa el [React SDK](https://portal.thirdweb.com/react). Los SDKs de thirdweb también están disponibles en [React Native](https://portal.thirdweb.com/react-native), [TypeScript](https://portal.thirdweb.com/typescript), [Python](https://portal.thirdweb.com/python), [Go](https://portal.thirdweb.com/go) y [Unity](https://portal.thirdweb.com/unity).

Si prefieres inicializar el SDK con Base Sepolia (testnet), usa el siguiente código en su lugar:

```javascript
import { BaseSepoliaTestnet } from '@thirdweb-dev/chains';
import { ThirdwebSDK } from '@thirdweb-dev/sdk/evm';

const sdk = new ThirdwebSDK(BaseSepoliaTestnet);
const contract = await sdk.getContract('0x0000000000000000000000000000000000000000');
```

:::

---

## Interactuando con contratos inteligentes

Una vez que inicialices el SDK y te conectes a un contrato inteligente desplegado en Base, puedes comenzar a llamar funciones en él usando el SDK.

:::info

Cualquier interacción que hagas con un contrato inteligente se realizará automáticamente desde la billetera conectada.

:::

### Usando funciones de extensión de contrato

El thirdweb SDK proporciona funciones de conveniencia cuando tu contrato inteligente usa [extensiones](https://portal.thirdweb.com/contractkit/extensions). Esta es la forma más fácil de leer datos y escribir transacciones con tus contratos inteligentes.

Por ejemplo, si tu contrato implementa la extensión [ERC721](https://portal.thirdweb.com/contractkit/erc721), puedes utilizar todas las funciones del [estándar erc721 correspondiente](https://portal.thirdweb.com/sdk/interacting-with-contracts/erc721) en el SDK.

Como ejemplo, a continuación se muestra un fragmento de código que usa el hook [`useOwnedNFTs`](https://portal.thirdweb.com/react/react.useownednfts) para obtener una lista de NFTs propiedad de una sola dirección de billetera:

```javascript
import { useOwnedNFTs } from '@thirdweb-dev/react';

const { data, isLoading, error } = useOwnedNFTs(contract, '{{wallet_address}}');
```

#### Uso

```javascript
import { useOwnedNFTs, useContract, useAddress } from '@thirdweb-dev/react';

// Your smart contract address
const contractAddress = '{{contract_address}}';

function App() {
  const address = useAddress();
  const { contract } = useContract(contractAddress);
  const { data, isLoading, error } = useOwnedNFTs(contract, address);
}
```

Para más ejemplos sobre el uso de funciones de extensión de contrato, visita la [documentación para desarrolladores de thirdweb](https://portal.thirdweb.com/sdk/interacting-with-contracts#using-contract-extensions).

### Leyendo datos del contrato

Si tu contrato no usa ninguna [extensión](https://portal.thirdweb.com/contractkit/extensions), o deseas llamar directamente a funciones en tu contrato inteligente para leer datos, puedes usar el hook [`useContractRead`](https://portal.thirdweb.com/react/react.usecontractread).

Lee datos en tu contrato desde una billetera conectada:

```javascript
const { contract } = useContract('{{contract_address}}');
const { data: myData, isLoading } = useContractRead(contract, 'myFunction');
```

### Escribiendo transacciones

Si tu contrato no usa ninguna [extensión](https://portal.thirdweb.com/contractkit/extensions), o deseas llamar directamente a funciones en tu contrato inteligente para escribir datos, puedes usar el hook [`useContractWrite`](https://portal.thirdweb.com/react/react.usecontractwrite).

Realiza transacciones en tu contrato desde una billetera conectada:

```javascript
const { contract } = useContract('{{contract_address}}');
const { mutateAsync: myFunctionAsync } = useContractWrite(contract, 'myFunction');
const tx = await myFunctionAsync(['argument1', 'argument2']); // Call the function
```