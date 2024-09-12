---
title: Quick Start: Deploy on Base
slug: /quick-start
description: A guide to help you get started with deploying your smart contracts on Base.
keywords:
  [
    Base,
    Base network,
    contracts,
    Base contracts,
    Base quick start,
    smart contracts,
    Base smart contracts,
    Base Mainnet,
    Base Testnet,
  ]
hide_table_of_contents: true
---

# Quick Start: Deploy on Base

Set up your environment to deploy your smart contracts on Base. This guide uses best in class tools to get you started.

## Prerequisites

- None! We'll get you started from scratch.

:::tip What you'll learn

- How to set up your develompent environment to deploy on Base
- How to deploy your smart contracts to Base
- How to interact with your smart contracts on Base
  :::

## Set up your development environment

In a new directory, create a new project:

```bash
mkdir my-base-project && cd my-base-project
```

Install Foundry, a powerful framework for building and deploying smart contracts:

```bash
curl -L https://foundry.paradigm.xyz | bash
```

Run foundryup to install the latest version of Foundry:

```bash
foundryup
```

Initialize a new Solidity project:

```bash
forge init
```
