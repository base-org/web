---
title: Mappings Exercise
description: Exercise - Demonstrate your knowledge of mappings.
hide_table_of_contents: false
---

Create a contract that adheres to the following specifications.

---

## Contract

Create a single contract called `FavoriteRecords`. It should not inherit from any other contracts. It should have the following properties:

### State Variables

The contract should have the following state variables. It is **up to you** to decide if any supporting variables are useful.

- A public mapping `approvedRecords`, which returns `true` if an album name has been added as described below, and `false` if it has not
- A mapping called `userFavorites` that indexes user addresses to a mapping of `string` record names which returns `true` or `false`, depending if the user has marked that album as a favorite

### Loading Approved Albums

Using the method of your choice, load `approvedRecords` with the following:

- Thriller
- Back in Black
- The Bodyguard
- The Dark Side of the Moon
- Their Greatest Hits (1971-1975)
- Hotel California
- Come On Over
- Rumours
- Saturday Night Fever

### Get Approved Records

Add a function called `getApprovedRecords`. This function should return a list of all of the names currently indexed in `approvedRecords`.

### Add Record to Favorites

Create a function called `addRecord` that accepts an album name as a parameter. **If** the album is on the approved list, add it to the list under the address of the sender. Otherwise, reject it with a custom error of `NotApproved` with the submitted name as an argument.

### Users' Lists

Write a function called `getUserFavorites` that retrieves the list of favorites for any address.

### Reset My Favorites

Add a function called `resetUserFavorites` that resets `userFavorites` for the sender.

---

### Submit your Contract and Earn an NFT Badge! (BETA)

:::info

#### Hey, where'd my NFT go!?

[Testnets](../deployment-to-testnet/test-networks) are not permanent! Base Goerli [will soon be sunset](https://base.mirror.xyz/kkz1-KFdUwl0n23PdyBRtnFewvO48_m-fZNzPMJehM4), in favor of Base Sepolia.

We recommend changing the network to **Base Sepolia**, and submitting your contracts there. While it is still supported, you can change the network to Base Goerli to see your existing NFT.

However, as these are separate networks with separate data, your NFTs **will not** transfer over.

**Don't worry!** We've captured the addresses of all NFT owners on Base Goerli and will include them when we release the mechanism to transfer these NFTs to mainnet later this year! You can also redeploy on Sepolia and resubmit if you'd like!

:::

import CafeUnitTest from '../../../src/components/CafeUnitTest/index.jsx'

<CafeUnitTest nftNum={5} />
