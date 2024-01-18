---
title: New Exercise
description: Exercise - Demonstrate your knowledge of the `new` keyword.
hide_table_of_contents: false
---

For this exercise, we're challenging you to build a solution requiring you to use a number of the concepts you've learned so far. Have fun and enjoy!

---

## Contracts

Build a contract that can deploy copies of an address book contract on demand, which allows users to add, remove, and view their contacts.

You'll need to develop two contracts for this exercise and import **at least** one additional contract.

## Imported Contracts

Review the [Ownable] contract from OpenZeppelin. You'll need to use it to solve this exercise.

You may wish to use another familiar contract to help with this challenge.

## AddressBook

Create an `Ownable` contract called `AddressBook`. In it include:

- A `struct` called `Contact` with properties for:
  - `id`
  - `firstName`
  - `lastName`
  - a `uint` array of `phoneNumbers`
- Additional storage for `contacts`
- Any other necessary state variables

It should include the following functions:

### Add Contact

The `addContact` function should be usable only by the owner of the contract. It should take in the necessary arguments to add a given contact's information to `contacts`.

### Delete Contact

The `deleteContact` function should be usable only by the owner and should delete the contact under the supplied `_id` number.

If the `_id` is not found, it should revert with an error called `ContactNotFound` with the supplied id number.

### Get Contact

The `getContact` function returns the contact information of the supplied `_id` number. It reverts with `ContactNotFound` if the contact isn't present.

:::tip Question

For bonus points (that only you will know about), explain why we can't just use the automatically generated getter for `contacts`?

:::

### Get All Contacts

The `getAllContacts` function returns an array with all of the user's current, non-deleted contacts.

:::caution

You shouldn't use `onlyOwner` for the two _get_ functions. Doing so won't prevent a third party from accessing the information, because all information on the blockchain is public. However, it may give the mistaken impression that information is hidden, which could lead to a security incident.

:::

## AddressBookFactory

The `AddressBookFactory` contains one function, `deploy`. It creates an instance of `AddressBook` and assigns the caller as the owner of that instance.

---

## Submit your Contract and Earn an NFT Badge! (BETA)

:::info

#### Hey, where'd my NFT go!?

[Testnets](../deployment-to-testnet/test-networks) are not permanent! Base Goerli [will soon be sunset](https://base.mirror.xyz/kkz1-KFdUwl0n23PdyBRtnFewvO48_m-fZNzPMJehM4), in favor of Base Sepolia.

We recommend changing the network to **Base Sepolia**, and submitting your contracts there. While it is still supported, you can change the network to Base Goerli to see your existing NFT.

However, as these are separate networks with separate data, your NFTs **will not** transfer over.

**Don't worry!** We've captured the addresses of all NFT owners on Base Goerli and will include them when we release the mechanism to transfer these NFTs to mainnet later this year! You can also redeploy on Sepolia and resubmit if you'd like!

:::

import CafeUnitTest from '../../../src/components/CafeUnitTest/index.jsx'

<CafeUnitTest nftNum={12} />

[Ownable]: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol
