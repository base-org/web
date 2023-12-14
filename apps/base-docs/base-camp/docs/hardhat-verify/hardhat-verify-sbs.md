---
title: Verifying Smart Contracts
description: Verifying smart contracts with Hardhat.
hide_table_of_contents: false
---

In this article, you'll learn how to verify smart contracts in Etherscan with hardhat and the hardhat deploy plugin.

---

## Objectives

By the end of this lesson, you should be able to:

- Verify a deployed smart contract on Etherscan
- Connect a wallet to a contract in Etherscan
- Use etherscan to interact with your own deployed contact

---

## Overview

Verifying smart contracts plays an important role in providing security and certainty to the users of your decentralized applications. By offering full visibility of the source code of your smart contract, you provide confidence and transparency of the intention of the code that is being executed.

The way smart contracts are verified is by simply uploading the source code and contract address to services such as Etherscan.

Once the contract is verified, the Etherscan explorer shows a status like the following image:

![Verified contract](../../assets/images/hardhat-verify/hardhat-verify.png)

Luckily, Hardhat and Hardhat-deploy already contain a built-in capability to do this task easily on your behalf.

This process involves the following steps:

1. Getting an Etherscan key
2. Configuring Hardhat
3. Verifying

## Getting an Etherscan key

In order to obtain an Etherscan API key, visit [Etherscan](https://etherscan.io/) and create an account.

Then, go to [https://etherscan.io/myapikey](https://etherscan.io/myapikey) and create an API key by clicking the **Add** button:

![Add key](../../assets/images/hardhat-verify/harhat-verify-create-key.png)

Bear in mind that different networks have other Blockchain explorers. For example:

- [Base](https://goerli.basescan.org/)
- [Goerli](https://goerli.etherscan.io/)
- [Polygon](https://polygonscan.com/)

You'll need to go to that particular explorer and get the API Key following a similar process as mentioned previously (except for Goerli Etherscan, where you can use the Etherscan mainnet one instead).

## Configuring Hardhat

You can configure the Etherscan API Key for each different network. For example, include the following to the `hardhat.config.ts` file for base goerli:

```typescript
base_goerli: {
      url: "https://goerli.base.org",
      accounts: {
        mnemonic: process.env.MNEMONIC ?? ""
      },
      verify: {
        etherscan: {
          apiUrl: "https://api-goerli.basescan.org",
          apiKey: process.env.ETHERSCAN_API_KEY ?? "ETHERSCAN_API_KEY"
        }
      }
}
```

Be aware that at this point an API Key for base goerli is not required, so you can simply define a placeholder like `"ETHERSCAN_API_KEY"`.

However, for other networks, you might have to include in your `.env` file the following:

```
ETHERSCAN_API_KEY=<YOUR_ETHERSCAN_API_KEY>
```

## Verifying

You verify in base, and to do so, simply run the following command:

```bash
npx hardhat --network base_goerli etherscan-verify
```

You should receive the following response:

```
verifying Lock ...
waiting for result...
 => contract Lock is now verified
```

You can now go to Basescan and search for your contract address, where you'll see the following:

![Base scan success](../../assets/images/hardhat-verify/hardhat-verify-success.png)

## Conclusion

In this lesson, you've learned how to verify smart contracts using Hardhat and Hardhat-deploy. You learned how to configure Hardhat to support multiple networks and verify by using a simple command.

---

## See also

[Solidity Docs]: https://docs.soliditylang.org/en/v0.8.17/
[Remix Project]: https://remix-project.org/
[Hardhat Deploy]: https://github.com/wighawag/hardhat-deploy
