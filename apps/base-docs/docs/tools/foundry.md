---
title: Foundry
slug: /tools/foundry
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
forge create ... --rpc-url=https://goerli.base.org/
```

### Verifying a smart contract

```bash
forge verify-contract ... --chain-id 84531
```
