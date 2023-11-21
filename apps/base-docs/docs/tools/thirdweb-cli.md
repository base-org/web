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
---

# thirdweb CLI

thirdweb provides an interactive command line interface, allowing you to create, build and deploy your smart contracts and apps.

You can use the thirdweb CLI to create and deploy smart contracts to the Base network.

Visit the [thirdweb documentation](https://portal.thirdweb.com/cli) for more instructions on using the thirdweb CLI.

---

## Creating a project

Create a new project with thirdweb installed and configured:

```bash
npx thirdweb create
```

:::info

When you create a project for smart contracts or web3 apps there are various configurable options.

**For contracts, some options are:**

- Create a new contract project using [Hardhat](https://hardhat.org/) or [Forge](https://book.getfoundry.sh/)
- Add a new contract to an existing project
- Start from a audited contract base, and add optional [extensions](https://portal.thirdweb.com/contractkit/extensions)

**For contracts, some options are:**

- Front end applications using Next, CRA or Vite
- Backend applications using Node.js or Express.js
- Choice of TypeScript or JavaScript variants

:::

---

## Deploying a smart contract

[Deploy](https://portal.thirdweb.com/deploy) your smart contracts to the Base network:

```bash
npx thirdweb deploy
```

:::info

To deploy to the Base network, after running `npx thirdweb deploy`, visit the provided dashboard URL and select Base from the Network dropdown.

:::

:::info

For a complete guide on using the thirdweb CLI to create and deploy contracts on Base, see [Deploy a smart contract on Base testnet](https://blog.thirdweb.com/guides/how-to-deploy-a-smart-contract-to-base-network-testnet-coinbase-l2/).

:::

---

## Publishing a smart contract

[Publish](https://portal.thirdweb.com/publish) and share a versioned release of your contract onto thirdweb’s registry:

```bash
npx thirdweb publish
```

---
