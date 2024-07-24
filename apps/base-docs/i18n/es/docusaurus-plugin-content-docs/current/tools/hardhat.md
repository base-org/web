---
title: Hardhat
slug: /tools/hardhat
description: Documentation for configuring Hardhat for smart contract development on Base, including setup instructions for mainnet, testnet, and local development environments.
keywords:
  [
    Hardhat,
    Base,
    Base network,
    Base mainnet,
    Base testnet,
    hardhat config,
    hardhat configuration,
    Ethereum development,
    smart contract,
    deployment,
    mainnet,
    testnet,
    local development,
  ]
hide_table_of_contents: true
---

# Hardhat

Hardhat es un entorno de desarrollo de Ethereum para el desarrollo de contratos inteligentes flexible, extensible y rápido.

Puedes usar Hardhat para editar, compilar, depurar y desplegar tus contratos inteligentes en Base.

---

# Usando Hardhat con Base

Para configurar [Hardhat](https://hardhat.org/) para desplegar contratos inteligentes en Base, actualiza el archivo `hardhat.config.ts` de tu proyecto agregando Base como una red:

```tsx
networks: {
   // for mainnet
   "base-mainnet": {
     url: 'https://mainnet.base.org',
     accounts: [process.env.PRIVATE_KEY as string],
     gasPrice: 1000000000,
   },
   // for Sepolia testnet
   "base-sepolia": {
     url: "https://sepolia.base.org",
     accounts: [process.env.PRIVATE_KEY as string],
     gasPrice: 1000000000,
   },
   // for local dev environment
   "base-local": {
     url: "http://localhost:8545",
     accounts: [process.env.PRIVATE_KEY as string],
     gasPrice: 1000000000,
   },
 },
 defaultNetwork: "base-local",
```

:::info

Para una guía completa sobre cómo usar Hardhat para desplegar contratos en Base, consulta [Desplegando un Contrato Inteligente](/guides/deploy-smart-contracts).

:::

---