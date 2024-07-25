---
title: Imports Exercise
description: Exercise - Demonstrate your knowledge of imports.
hide_table_of_contents: false
---

Create a contract that adheres to the following specifications.

---

## Contract

Create a contract called `ImportsExercise`. It should `import` a copy of `SillyStringUtils`

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

library SillyStringUtils {

    struct Haiku {
        string line1;
        string line2;
        string line3;
    }

    function shruggie(string memory _input) internal pure returns (string memory) {
        return string.concat(_input, unicode" 🤷");
    }
}
```

Add a public instance of `Haiku` called `haiku`.

Add the following two functions.

### Save Haiku

`saveHaiku` should accept three strings and save them as the lines of `haiku`.

### Get Haiku

`getHaiku` should return the haiku as a `Haiku` type.

:::info

Remember, the compiler will automatically create a getter for `public` `struct`s, but these return each member individually. Create your own getters to return the type.

:::

### Shruggie Haiku

`shruggieHaiku` should use the library to add 🤷 to the end of `line3`. It must **not** modify the original haiku. It should return the modified `Haiku`.

---

## Submit your Contract and Earn an NFT Badge! (BETA)

:::caution

#### Contract Verification Best Practices

To simplify the verification of your contract on a blockchain explorer like BaseScan.org, consider these two common strategies:

1. **Flattening**: This method involves combining your main contract and all of its imported dependencies into a single file. This makes it easier for explorers to verify the code since they only have to process one file.

2. **Modular Deployment**: Alternatively, you can deploy each imported contract separately and then reference them in your main contract via their deployed addresses. This approach maintains the modularity and readability of your code. Each contract is deployed and verified independently, which can facilitate easier updates and reusability.

3. **Use Desktop Tools**: Forge and Hardhat both have tools to write scripts that both deploy and verify your contracts.

:::

:::info

#### Hey, where'd my NFT go!?

[Testnets](../deployment-to-testnet/test-networks) are not permanent! Base Goerli [will soon be sunset](https://base.mirror.xyz/kkz1-KFdUwl0n23PdyBRtnFewvO48_m-fZNzPMJehM4), in favor of Base Sepolia.

As these are separate networks with separate data, your NFTs **will not** transfer over.

**Don't worry!** We've captured the addresses of all NFT owners on Base Goerli and will include them when we release the mechanism to transfer these NFTs to mainnet later this year! You can also redeploy on Sepolia and resubmit if you'd like!

:::

import CafeUnitTest from '../../../src/components/CafeUnitTest/index.jsx'

<CafeUnitTest nftNum={19}/>
