---
title: Arrays Exercise
description: Exercise - Demonstrate your knowledge of arrays.
hide_table_of_contents: false
---

Create a contract that adheres to the following specifications.

---

## Contract

Review the contract in the starter snippet called `ArraysExercise`. It contains an array called `numbers` that is initialized with the numbers 1–10. Copy and paste this into your file.

```solidity
contract ArraysExercise {
    uint[] public numbers = [1,2,3,4,5,6,7,8,9,10];
}
```

Add the following functions:

### Return a Complete Array

The compiler automatically adds a getter for individual elements in the array, but it does not automatically provide functionality to retrieve the entire array.

Write a function called `getNumbers` that returns the entire `numbers` array.

### Reset Numbers

Write a `public` function called `resetNumbers` that resets the `numbers` array to its initial value, holding the numbers from 1-10.

:::note

We'll award the pin for any solution that works, but one that **doesn't** use `.push()` is more gas-efficient!

:::

:::caution

Remember, _anyone_ can call a `public` function! You'll learn how to protect functionality in another lesson.

:::

### Append to an Existing Array

Write a function called `appendToNumbers` that takes a `uint[] calldata` array called `_toAppend`, and adds that array to the `storage` array called `numbers`, already present in the starter.

### Timestamp Saving

At the contract level, add an `address` array called `senders` and a `uint` array called `timestamps`.

Write a function called `saveTimestamp` that takes a `uint` called `_unixTimestamp` as an argument. When called, it should add the address of the caller to the end of `senders` and the `_unixTimeStamp` to `timestamps`.

:::tip

You'll need to research on your own to discover the correct _Special Variables and Functions_ that can help you with this challenge!

:::

### Timestamp Filtering

Write a function called `afterY2K` that takes no arguments. When called, it should return two arrays.

The first should return all timestamps that are more recent than January 1, 2000, 12:00am. To save you a click, the Unix timestamp for this date and time is `946702800`.

The second should return a list of `senders` addresses corresponding to those timestamps.

### Resets

Add `public` functions called `resetSenders` and `resetTimestamps` that reset those storage variables.

---

### Submit your Contract and Earn an NFT Badge! (BETA)

import data from "../../assets/deployments/ArraysUT.json";
import CafeUnitTest from '../../../src/components/CafeUnitTest/index.jsx'

<CafeUnitTest deployment={data} nftNum={4}/>
