---
title: Foundry
slug: /tools/foundry
description: Documentation for Foundry, a toolchain for smart contract development. Provides instructions on deploying and verifying contracts on Base's mainnet and testnet using Foundry.
keywords:
  [
    Foundry,
    Forge,
    Foundry Book,
    smart contract development,
    toolchain,
    Base,
    Base mainnet,
    Base testnet,
    Base network,
    RPC URL,
    chain id,
    deploying contracts,
    verifying contracts,
    mainnet,
    testnet,
  ]
hide_table_of_contents: true
---

# Foundry

Foundry es una cadena de herramientas para el desarrollo de contratos inteligentes.

Con Foundry puedes gestionar tus dependencias, compilar tu proyecto, ejecutar pruebas, desplegar contratos inteligentes e interactuar con la cadena desde la línea de comandos y a través de scripts de Solidity.

Consulta el [Libro de Foundry](https://book.getfoundry.sh/) para comenzar a usar Foundry con Base.

---

# Usando Foundry con Base

Foundry soporta Base de forma nativa.

Solo proporciona la URL RPC de Base y el ID de la Cadena al desplegar y verificar tus contratos.

## Mainnet

### Desplegando un contrato inteligente

```bash
forge create ... --rpc-url=https://mainnet.base.org/
```

### Verificando un contrato inteligente

```bash
forge verify-contract ... --chain-id 8453
```

## Testnet

### Desplegando un contrato inteligente

```bash
forge create ... --rpc-url=https://sepolia.base.org/
```

### Verificando un contrato inteligente

```bash
forge verify-contract ... --chain-id 84532
```