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

Foundry is a smart contract development toolchain.

With Foundry you can manage your dependencies, compile your project, run tests, deploy smart contracts, and interact with the chain from the command-line and via Solidity scripts.

Check out the [Foundry Book](https://book.getfoundry.sh/) to get started with using Foundry with Base.

---

# Using Foundry with Base

Foundry supports Base out-of-the-box.

Just provide the Base RPC URL and Chain ID when deploying and verifying your contracts.

## Mainnet

### Deploying a smart contract

```bash
forge create ... --rpc-url=https://mainnet.base.org/
```

### Verifying a smart contract

```bash
forge verify-contract ... --chain-id 8453
```

## Testnet

### Deploying a smart contract

```bash
forge create ... --rpc-url=https://sepolia.base.org/
```

### Verifying a smart contract

```bash
forge verify-contract ... --chain-id 84532
```
