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

es + es-translated # Foundry

es + es-translated Foundry is a smart contract development toolchain.

es + es-translated With Foundry you can manage your dependencies, compile your project, run tests, deploy smart contracts, and interact with the chain from the command-line and via Solidity scripts.

es + es-translated Check out the [Foundry Book](https://book.getfoundry.sh/) to get started with using Foundry with Base.

---

es + es-translated # Using Foundry with Base

es + es-translated Foundry supports Base out-of-the-box.

es + es-translated Just provide the Base RPC URL and Chain ID when deploying and verifying your contracts.

es + es-translated ## Mainnet

es + es-translated ### Deploying a smart contract

```bash
forge create ... --rpc-url=https://mainnet.base.org/
```

es + es-translated ### Verifying a smart contract

```bash
forge verify-contract ... --chain-id 8453
```

es + es-translated ## Testnet

es + es-translated ### Deploying a smart contract

```bash
forge create ... --rpc-url=https://sepolia.base.org/
```

es + es-translated ### Verifying a smart contract

```bash
forge verify-contract ... --chain-id 84532
```