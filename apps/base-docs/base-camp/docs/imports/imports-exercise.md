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

`shruggieHaiku` should use the library to add 🤷 to the end of `line3`. It must **not** modify the original haiku.

---

## Submit your Contract and Earn an NFT Badge! (BETA)

:::info

#### Hey, where'd my NFT go!?

[Testnets](../deployment-to-testnet/test-networks) are not permanent! Base Goerli will soon be sunset, in favor of Base Sepolia.

We recommend changing the network to **Base Sepolia**, and submitting your contracts there. While it is still supported, you can change the network to Base Goerli to see your existing NFT.

However, as these are separate networks with separate data, your NFTs **will not** transfer over.

**Don't worry!** We've captured the addresses of all NFT owners on Base Goerli and will include them when we release the mechanism to transfer these NFTs to mainnet later this year! You can also redeploy on Sepolia and resubmit if you'd like!

:::

import CafeUnitTest from '../../../src/components/CafeUnitTest/index.jsx'

<CafeUnitTest nftNum={19}/>
