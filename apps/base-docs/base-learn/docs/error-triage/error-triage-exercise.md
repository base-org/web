---
title: Error Triage Exercise
description: Exercise - Demonstrate your debugging skill.
hide_table_of_contents: false
---

Copy the starter code into a new file in Remix.

Debug the existing functions in the provided contract.

```solidity
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract ErrorTriageExercise {
    /**
     * Finds the difference between each uint with it's neighbor (a to b, b to c, etc.)
     * and returns a uint array with the absolute integer difference of each pairing.
     */
    function diffWithNeighbor(
        uint _a,
        uint _b,
        uint _c,
        uint _d
    ) public pure returns (uint[] memory) {
        uint[] memory results = new uint[](3);

        results[0] = _a - _b;
        results[1] = _b - _c;
        results[2] = _c - _d;

        return results;
    }

    /**
     * Changes the _base by the value of _modifier.  Base is always >= 1000.  Modifiers can be
     * between positive and negative 100;
     */
    function applyModifier(
        uint _base,
        int _modifier
    ) public pure returns (uint) {
        return _base + _modifier;
    }

    /**
     * Pop the last element from the supplied array, and return the popped
     * value (unlike the built-in function)
     */
    uint[] arr;

    function popWithReturn() public returns (uint) {
        uint index = arr.length - 1;
        delete arr[index];
        return arr[index];
    }

    // The utility functions below are working as expected
    function addToArr(uint _num) public {
        arr.push(_num);
    }

    function getArr() public view returns (uint[] memory) {
        return arr;
    }

    function resetArr() public {
        delete arr;
    }
}

```

---

## Submit your Contract and Earn an NFT Badge! (BETA)

:::info

#### Hey, where'd my NFT go!?

[Testnets](../deployment-to-testnet/test-networks) are not permanent! Base Goerli [will soon be sunset](https://base.mirror.xyz/kkz1-KFdUwl0n23PdyBRtnFewvO48_m-fZNzPMJehM4), in favor of Base Sepolia.

As these are separate networks with separate data, your NFTs **will not** transfer over.

**Don't worry!** We've captured the addresses of all NFT owners on Base Goerli and will include them when we release the mechanism to transfer these NFTs to mainnet later this year! You can also redeploy on Sepolia and resubmit if you'd like!

:::

import CafeUnitTest from '../../../src/components/CafeUnitTest/index.jsx'

<CafeUnitTest nftNum={10}/>
