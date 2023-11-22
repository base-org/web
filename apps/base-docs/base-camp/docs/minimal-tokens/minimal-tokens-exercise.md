---
title: Minimal Tokens Exercise
description: Exercise - Create your own token!
hide_table_of_contents: false
---

Create a contract that adheres to the following specifications.

---

## Contract

Create a contract called `UnburnableToken`. Add the following in storage:

- A public mapping called `balances` to store how many tokens are owned by each address
- A `public uint` to hold `totalSupply`
- A `public uint` to hold `totalClaimed`
- Other variables as necessary to complete the task

Add the following functions.

### Constructor

Add a constructor that sets the total supply of tokens to 100,000,000.

### Claim

Add a `public` function called `claim`. When called, so long as a number of tokens equalling the `totalSupply` have not yet been distributed, any wallet _that has not made a claim previously_ should be able to claim 1000 tokens. If a wallet tries to claim a second time, it should revert with `TokensClaimed`.

The `totalClaimed` should be incremented by the claim amount.

Once all tokens have been claimed, this function should revert with an error `AllTokensClaimed`. (We won't be able to test this, but you'll know if it's there!)

### Safe Transfer

Implement a `public` function called `safeTransfer` that accepts an address `_to` and an `_amount`. It should transfer tokens from the sender to the `_to` address, **only if**:

- That address is not the zero address
- That address has a balance of greater than zero Base Goerli Eth

A failure of either of these checks should result in a revert with an `UnsafeTransfer` error, containing the address.

---

### Submit your Contract and Earn an NFT Badge! (BETA)

:::caution

The contract specification contains actions that can only be performed once by a given address. As a result, the unit tests for a passing contract will only be successful the **first** time you test.

**You may need to submit a fresh deployment to pass**

:::

import data from "../../assets/deployments/MinimalTokenUT.json";
import CafeUnitTest from '../../../src/components/CafeUnitTest/index.jsx'

<CafeUnitTest deployment={data} nftNum={13}/>
