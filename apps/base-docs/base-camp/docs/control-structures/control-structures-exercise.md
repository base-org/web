---
title: Control Structures Exercise
description: Exercise - Demonstrate your knowledge of control structures.
hide_table_of_contents: false
---

Create a contract that adheres to the following specifications:

---

## Contract

Create a single contract called `ControlStructures`. It should not inherit from any other contracts and does not need a constructor. It should have the following functions:

### Smart Contract FizzBuzz

Create a function called `fizzBuzz` that accepts a `uint` called `_number` and returns a `string memory`. The function should return:

- "Fizz" if the `_number` is divisible by 3
- "Buzz" if the `_number` is divisible by 5
- "FizzBuzz" if the `_number` is divisible by 3 and 5
- "Splat" if none of the above conditions are true

### Do Not Disturb

Create a function called `doNotDisturb` that accepts a `_uint` called `_time`, and returns a `string memory`. It should adhere to the following properties:

- If `_time` is greater than or equal to 2400, trigger a `panic`
- If `_time` is greater than 2200 or less than 800, `revert` with a custom error of `AfterHours`, and include the time provided
- If `_time` is between `1200` and `1259`, `revert` with a string message "At lunch!"
- If `_time` is between 800 and 1199, return "Morning!"
- If `_time` is between 1300 and 1799, return "Afternoon!"
- If `_time` is between 1800 and 2200, return "Evening!"

---

### Submit your Contract and Earn an NFT Badge! (BETA)

:::warning

Base Goerli does not yet support the new `PUSH0` opcode introduced in _Shanghai_, which is the default target for the Solidity compiler if you use version `0.8.20` or later. You will get an error when you attempt to deploy.

All exercises were built and tested with `0.8.17`. We recommend using this version until the upgrade.

:::

import controlStructuresUnitTestData from "../../assets/deployments/ControlStructuresUT.json";
import CafeUnitTest from '../../../src/components/CafeUnitTest/index.jsx'

<CafeUnitTest deployment={controlStructuresUnitTestData} nftNum={2}/>
