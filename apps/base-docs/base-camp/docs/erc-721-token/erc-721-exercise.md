---
title: ERC-721 Tokens Exercise
description: Exercise - Create your own NFT!
hide_table_of_contents: false
---

Create a contract that adheres to the following specifications.

---

## Contract

Create a contract called `HaikuNFT`. Add the following to the contract:

- A `struct` called `Haiku` to store the `address` of the `author` and `line1`, `line2`, and `line3`
- A public array to store these `haikus`
- A public `mapping` to relate `sharedHaikus` from the `address` of the wallet shared with, to the id of the Haiku NFT shared
- A public `counter` to use as the id and to track and share the total number of Haikus minted
  - If 10 Haikus have been minted, the counter should be at 11, to serve as the next id
  - Do **NOT** assign an id of 0 to a haiku
- Other variables as necessary to complete the task

Add the following functions.

### Constructor

As appropriate.

### Mint Haiku

Add an `external` function called `mintHaiku` that takes in the three lines of the poem. This function should mint an NFT for the minter and save their Haiku.

Haikus must be **unique**! If any line in the Haiku has been used as any line of a previous Haiku, revert with `HaikuNotUnique()`.

You **don't** have to count syllables, but it would be neat if you did! (No promises on whether or not we counted the same as you did)

### Share Haiku

Add a `public` function called `shareHaiku` that allows the owner of a Haiku NFT to share that Haiku with the designated `address` they are sending it `_to`. Doing so should add it to that address's entry in `sharedHaikus`.

If the sender isn't the owner of the Haiku, instead revert with an error of `NotYourHaiku`. Include the id of the Haiku in the error.

:::danger

Remember, everything on the blockchain is public. This sharing functionality can be expanded for features similar to allowing an app user to display the selected shared haiku on their profile.

It does nothing to prevent anyone and everyone from seeing or copy/pasting the haiku!

:::

### Get Your Shared Haikus

Add a `public` function called `getMySharedHaikus`. When called, it should return an array containing all of the haikus shared with the caller.

If there are no haikus shared with the caller's wallet, it should revert with a custom error of `NoHaikusShared`, with no arguments.

---

:::caution

The contract specification contains actions that can only be performed once by a given address. As a result, the unit tests for a passing contract will only be successful the **first** time you test.

**You may need to submit a fresh deployment to pass**

:::

### Submit your Contract and Earn an NFT Badge! (BETA)

:::warning

Base Goerli does not yet support the new `PUSH0` opcode introduced in _Shanghai_, which is the default target for the Solidity compiler if you use version `0.8.20` or later. You will get an error when you attempt to deploy.

All exercises were built and tested with `0.8.17`. We recommend using this version until the upgrade.

:::

import data from "../../assets/deployments/ERC721UT.json";
import CafeUnitTest from '../../../src/components/CafeUnitTest/index.jsx'

<CafeUnitTest deployment={data} nftNum={15}/>
