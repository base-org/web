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

import CafeUnitTest from '../../../src/components/CafeUnitTest/index.jsx'

<CafeUnitTest nftNum={5} />
