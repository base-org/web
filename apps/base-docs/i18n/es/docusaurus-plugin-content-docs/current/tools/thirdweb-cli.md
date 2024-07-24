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

es + es-translated # thirdweb CLI

es + es-translated thirdweb provides an interactive command line interface, allowing you to create, build and deploy your smart contracts and apps.

es + es-translated You can use the thirdweb CLI to create and deploy smart contracts to the Base network.

es + es-translated Visit the [thirdweb documentation](https://portal.thirdweb.com/cli) for more instructions on using the thirdweb CLI.

---

es + es-translated ## Creating a project

es + es-translated Create a new project with thirdweb installed and configured:

```bash
npx thirdweb create
```

es + es-translated :::info

es + es-translated When you create a project for smart contracts or web3 apps there are various configurable options.

es + es-translated **For contracts, some options are:**

es + es-translated - Create a new contract project using [Hardhat](https://hardhat.org/) or [Forge](https://book.getfoundry.sh/)
- Add a new contract to an existing project
- Start from an audited contract base, and add optional [extensions](https://portal.thirdweb.com/contractkit/extensions)

es + es-translated **For contracts, some options are:**

es + es-translated - Front end applications using Next, CRA or Vite
- Backend applications using Node.js or Express.js
- Choice of TypeScript or JavaScript variants

es + es-translated :::

---

es + es-translated ## Deploying a smart contract

es + es-translated [Deploy](https://portal.thirdweb.com/deploy) your smart contracts to the Base network:

```bash
npx thirdweb deploy
```

es + es-translated :::info

es + es-translated To deploy to the Base network, after running `npx thirdweb deploy`, visit the provided dashboard URL and select Base from the Network dropdown.

es + es-translated :::

es + es-translated :::info

es + es-translated For a complete guide on using the thirdweb CLI to create and deploy contracts on Base, see [Deploy a smart contract on Base testnet](https://blog.thirdweb.com/guides/how-to-deploy-a-smart-contract-to-base-network-testnet-coinbase-l2/).

es + es-translated :::

---

es + es-translated ## Publishing a smart contract

es + es-translated [Publish](https://portal.thirdweb.com/publish) and share a versioned release of your contract onto thirdweb’s registry:

```bash
npx thirdweb publish
```

---