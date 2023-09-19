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

:::warning

Base Goerli does not yet support the new `PUSH0` opcode introduced in _Shanghai_, which is the default target for the Solidity compiler if you use version `0.8.20` or later. You will get an error when you attempt to deploy.

All exercises were built and tested with `0.8.17`. We recommend using this version until the upgrade.

:::

import data from "../../assets/deployments/ImportsUT.json";
import CafeUnitTest from '../../../src/components/CafeUnitTest/index.jsx'

<CafeUnitTest deployment={data} nftNum={19}/>
