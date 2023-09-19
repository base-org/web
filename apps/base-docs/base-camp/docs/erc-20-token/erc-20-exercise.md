---
title: ERC-20 Tokens Exercise
description: Exercise - Create your own ERC-20 token!
hide_table_of_contents: false
---

Create a contract that adheres to the following specifications.

---

## Contract

Create a contract called `WeightedVoting`. Add the following:

- A `maxSupply` of 1,000,000
- Errors for:
  - `TokensClaimed`
  - `AllTokensClaimed`
  - `NoTokensHeld`
  - `QuorumTooHigh`, returning the quorum amount proposed
  - `AlreadyVoted`
  - `VotingClosed`
- A struct called `Issue` containing:
  - An OpenZeppelin Enumerable Set storing addresses called `voters`
  - A string `issueDesc`
  - Storage for the number of `votesFor`, `votesAgainst`, `votesAbstain`, `totalVotes`, and `quorum`
  - Bools storing if the issue is `passed` and `closed`
- An array of `Issue`s called `issues`
- An `enum` for `Votes` containing:
  - `AGAINST`
  - `FOR`
  - `ABSTAIN`
- Anything else needed to complete the tasks

Add the following functions.

### Constructor

Initialize the ERC-20 token and burn the zeroeth element of `issues`.

### Claim

Add a `public` function called `claim`. When called, so long as a number of tokens equalling the `maximumSupply` have not yet been distributed, any wallet _that has not made a claim previously_ should be able to claim 100 tokens. If a wallet tries to claim a second time, it should revert with `TokensClaimed`.

Once all tokens have been claimed, this function should revert with an error `AllTokensClaimed`.

:::caution

In our simple token, we used `totalSupply` to mint our tokens up front. The ERC20 implementation we're using also tracks `totalSupply`, but does it differently.

Review the docs and code comments to learn how.

:::

### Create Issue

Implement an `external` function called `createIssue`. It should add a new `Issue` to `issues`, allowing the user to set the description of the issue, and `quorum` - which is how many votes are needed to close the issue.

Only token holders are allowed to create issues, and issues cannot be created that require a `quorum` greater than the current total number of tokens.

This function must return the index of the newly-created issue.

### Get Issue

Add an `external` function called `getIssue` that can return all of the data for the issue of the provided `_id`.

`EnumerableSet` has a `mapping` underneath, so it can't be returned outside of the contract. You'll have to figure something else out.

:::info Hint

The return type for this function should be a `struct` very similar to the one that stores the issues.

:::

### Vote

Add a `public` function called `vote` that accepts an `_issueId` and the token holder's vote. The function should revert if the issue is closed, or the wallet has already voted on this issue.

Holders must vote all of their tokens for, against, or abstaining from the issue. This amount should be added to the appropriate member of the issue and the total number of votes collected.

If this vote takes the total number of votes to or above the `quorum` for that vote, then:

- The issue should be set so that `closed` is true
- If there are **more** votes for than against, set `passed` to `true`

---

### Submit your Contract and Earn an NFT Badge! (BETA)

:::warning

Base Goerli does not yet support the new `PUSH0` opcode introduced in _Shanghai_, which is the default target for the Solidity compiler if you use version `0.8.20` or later. You will get an error when you attempt to deploy.

All exercises were built and tested with `0.8.17`. We recommend using this version until the upgrade.

:::

:::caution

The contract specification contains actions that can only be performed once by a given address. As a result, the unit tests for a passing contract will only be successful the **first** time you test.

**You may need to submit a fresh deployment to pass**

:::

import data from "../../assets/deployments/ERC20UT.json";
import CafeUnitTest from '../../../src/components/CafeUnitTest/index.jsx'

<CafeUnitTest deployment={data} nftNum={14}/>
