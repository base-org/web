---
title: thirdweb CLI
slug: /tools/thirdweb-cli
description: Documentation for using the thirdweb CLI for creating, deploying, and publishing smart contracts and web3 applications on the Base network, including detailed instructions and options for project creation and deployment.
keywords:
  [
    thirdweb CLI,
    thirdweb,
    CLI,
    Base,
    Base mainnet,
    Base testnet,
    Base network,
    smart contracts,
    deploy smart contract,
    test smart contract,
    debug smart contract,
    web3 applications,
  ]
hide_table_of_contents: true
---

# thirdweb CLI

thirdweb proporciona una interfaz de línea de comandos interactiva, que te permite crear, construir y desplegar tus contratos inteligentes y aplicaciones.

Puedes usar el CLI de thirdweb para crear y desplegar contratos inteligentes en la red Base.

Visita la [documentación de thirdweb](https://portal.thirdweb.com/cli) para más instrucciones sobre cómo usar el CLI de thirdweb.

---

## Crear un proyecto

Crea un nuevo proyecto con thirdweb instalado y configurado:

```bash
npx thirdweb create
```

:::info

Cuando creas un proyecto para contratos inteligentes o aplicaciones web3 hay varias opciones configurables.

**Para contratos, algunas opciones son:**

- Crear un nuevo proyecto de contrato usando [Hardhat](https://hardhat.org/) o [Forge](https://book.getfoundry.sh/)
- Agregar un nuevo contrato a un proyecto existente
- Comenzar desde una base de contrato auditada y agregar [extensiones](https://portal.thirdweb.com/contractkit/extensions) opcionales

**Para contratos, algunas opciones son:**

- Aplicaciones de front-end usando Next, CRA o Vite
- Aplicaciones de back-end usando Node.js o Express.js
- Elección de variantes de TypeScript o JavaScript

:::

---

## Desplegar un contrato inteligente

[Despliega](https://portal.thirdweb.com/deploy) tus contratos inteligentes en la red Base:

```bash
npx thirdweb deploy
```

:::info

Para desplegar en la red Base, después de ejecutar `npx thirdweb deploy`, visita la URL del panel proporcionada y selecciona Base en el menú desplegable de la red.

:::

:::info

Para una guía completa sobre cómo usar el CLI de thirdweb para crear y desplegar contratos en Base, consulta [Desplegar un contrato inteligente en Base testnet](https://blog.thirdweb.com/guides/how-to-deploy-a-smart-contract-to-base-network-testnet-coinbase-l2/).

:::

---

## Publicar un contrato inteligente

[Publica](https://portal.thirdweb.com/publish) y comparte una versión de tu contrato en el registro de thirdweb:

```bash
npx thirdweb publish
```

---