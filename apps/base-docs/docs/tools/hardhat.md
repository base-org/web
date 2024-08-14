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

Hardhat is an Ethereum development environment for flexible, extensible, and fast smart contract development.

You can use Hardhat to edit, compile, debug, and deploy your smart contracts to Base.

---

# Using Hardhat with Base

To configure [Hardhat](https://hardhat.org/) to deploy smart contracts to Base, update your project’s `hardhat.config.ts` file by adding Base as a network:

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

For a complete guide on using Hardhat to deploy contracts on Base, see [Deploying a Smart Contract](/tutorials/deploy-with-hardhat).

:::

---
