---
title: Introduction to Foundry
description: Documentation for Foundry, a toolchain for smart contract development. Provides instructions on setting up your development environment to work with Foundry.
keywords: [Foundry, Forge, Foundry Book, smart contract development, toolchain]
hide_table_of_contents: false
---

In this article, you'll learn how to set up Foundry, the toolchain for smart contract development with Base.

---

## Objectives

By the end of this lesson, you should be able to:

- Install Foundry
- Create my first Foundry project
- Compile your first smart contract using Foundry
- Configure Foundry to work with Base

## Overview

Foundry is a smart contract development toolchain that is composed of multiple small command line tools:

- *[forge]*: Compile, test, and deploy your smart contracts.
- *[cast]*: Interact with the Blockchain over RPC. You can make smart contract calls, send transactions, or retrieve any type of chain data.
- *[chisel]*: A solidity REPL. You can write solidity code directly.
- *[anvil]*: A local Blockchain node for testing and development.

Using Foundry you can manage your dependencies, compile your project, run tests, deploy smart contracts and interact with the chain from the command-line and via Solidity scripts.

For a deep dive on the Foundry features and full capabilities, check out the [Foundry Book].

## Installing Foundry

In order to install Foundry, you can use `Foundryup`, the Foundry's toolchain installer.

To install `Foundryup` you have to run in the terminal:

```bash
$ curl -L https://foundry.paradigm.xyz | bash
```

After `Foundryup` is installed, you can install `Foundry` by running:

```bash
$ foundryup
```

You can verify the installation by trying the following commands:

```bash
$ forge --version
$ cast --version 
$ chisel --version
$ anvil --version
```

## My First Foundry Project

To create a foundry project you can simply run:

```bash
$ forge init hello_foundry_in_base
```

This will create a foundry project with the following structure:

```bash
├── lib          # all the libraries installed
├── script       # scripts folder, e.g., deploy scripts
├── src          # smart contracts folder
├── test         # tests folder
└── foundry.toml # foundry configuration file
```

You will also notice a `.gitsubmodules` file -- this is because `Foundry` handles dependencies using [Git submodules].

By default the Foundry structure stores smart contracts in the `src` folder. You can change this in the `foundry.toml` configuration file.

For instance:

```bash
[profile.default]
src = 'contracts'
```

In order to compile the project, simply run:

```bash
forge build:
```

## Setting up Foundry with Base

In order to work with `Base`, you need to configure a couple of settings in the configuration `foundry.toml` file.

The first thing is the solidity version. 

> As of December 2023, Base does not support the new PUSH0 opcode introduced in Shanghai, which is the default target for the Solidity compiler if you use version 0.8.20 or later. See [Differences between Ethereum and Base] to learn more.

We recommend using 0.8.19 or lower until Base is upgraded with `PUSH0`. Keep in mind that the update has been deployed to Base Goerli and Base Sepolia.

You need to configure your config file as follows:

```bash
[profile.default]
src = 'src'
out = 'out'
libs = ['lib']
solc_version = "0.8.19"
```

Be sure that you modify the pragma of your contracts and simply run `forge build` to ensure everything works well.

We also recommend setting up JSON RPC endpoints for Base and the API key for [Basescan] in the configuration file so that your environment is ready to deploy your smart contracts.

Your configuration file should look like the following:

```bash
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
solc_version = "0.8.19"

[rpc_endpoints]
base = "https://mainnet.base.org"
baseGoerli = "https://goerli.base.org"

[etherscan]
baseGoerli = { key = "${BASESCAN_API_KEY}", url = "https://api-goerli.basescan.org/api" }
base = { key = "${BASESCAN_API_KEY}", url = "https://api.basescan.org/api" }
```

We included 2 JSON RPC endpoints for `Base` and `Base goerli` and similar for the Etherscan section, we included the configuration for `Basescan` for goerli and mainnet. Both rely on the same API Key, `BASESCAN_API_KEY`.

## Conclusion

In this guide, you've embarked on the journey of smart contract development with Base and Foundry. We covered the essential steps, from installing Foundry using the convenient Foundryup toolchain installer to creating your first project and configuring Foundry to seamlessly integrate with Base.

---

## See also

[Foundry Book]: https://book.getfoundry.sh/
[chisel]: https://book.getfoundry.sh/chisel/
[cast]: https://book.getfoundry.sh/cast/
[anvil]: https://book.getfoundry.sh/anvil/
[forge]: https://book.getfoundry.sh/forge/
[Git submodules]: https://git-scm.com/book/en/v2/Git-Tools-Submodules
[OP Stack]: https://stack.optimism.io/
[Differences between Ethereum and Base]: https://docs.base.org/differences/
[Basescan]: https://basescan.org/