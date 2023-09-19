---
title: Truffle
slug: /tools/truffle
---

# Truffle

Truffle is a comprehensive suite of tools for smart contract development.

You can use Truffle to quickly build, test, debug, and deploy your smart contracts to Base.

---

# Using Truffle with Base

To configure [Truffle](https://trufflesuite.com/docs/truffle/) to deploy smart contracts to Base:

1. Install Truffle by running the following command:

   ```bash
   npm install -g truffle
   ```

2. Create a new Truffle project by running the following command:

   ```bash
   truffle init
   ```

3. Update your project's `truffle-config.js` file by adding Base as a network:

   ```javascript
   const HDWalletProvider = require('@truffle/hdwallet-provider');

   module.exports = {
     networks: {
       'base-mainnet': {
         provider: function () {
           return new HDWalletProvider('MNEMONIC', 'https://mainnet.base.org');
         },
       },
       'base-goerli': {
         provider: function () {
           return new HDWalletProvider('MNEMONIC', 'https://goerli.base.org');
         },
       },
       'base-local': {
         host: 'localhost',
         port: 8545,
         network_id: '*',
       },
     },
   };
   ```

   :::info

   `MNEMONIC` is the mnemonic secret phrase of the account to use when deploying a contract.

   :::

4. Compile and deploy your smart contract by running the following command:

   ```bash
   truffle migrate --network base-goerli
   ```

   **Note:** When you're ready to compile and deploy to mainnet, simply change `base-goerli` to `base-mainnet` and rerun the command.

   :::info

   For more information on deploying contracts on Base, see [Deploying a smart contract](/guides/deploy-smart-contracts).

   :::

---
