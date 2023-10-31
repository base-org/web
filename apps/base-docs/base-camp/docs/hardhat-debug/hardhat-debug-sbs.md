---
title: Debugging with Hardhat
description: Debugging smart contracts with Hardhat.
hide_table_of_contents: false
---

In this article, you'll learn how to debug your smart contracts using the built-in debugging capabilities of Hardhat.

---

## Objectives

By the end of this lesson, you should be able to:

- Use `console.log` to write debugging logs
- List common errors and their resolutions
- Determine if an error is a contract error or an error in the test

---

## Overview

Debugging smart contracts can be a challenging task, especially when dealing with decentralized applications and blockchain technology. Hardhat provides powerful tools to simplify the debugging process.

In this tutorial, you will explore the essential debugging features offered by Hardhat and learn how to effectively identify and resolve common errors in your smart contracts.

## Your first `console.log`

One of the key features of Hardhat is the ability to use `console.log` for writing debugging logs in your smart contracts. In order to use it, you must include `hardhat/console.sol` in the contract you wish to debug.

In the following contract `Lock.sol` for example, you include `hardhat/console.sol` by importing it and adding a few `console.log`s in the constructor with the text "Creating" and the Ether balance of the contract. This can help you not only with tracking that the contract was created successfully but also, more importantly, with the ability to include additional logs such as the balance of the contract after is was created:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "hardhat/console.sol";

contract Lock {
    uint256 public unlockTime;
    address payable public owner;

    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);

        console.log("Creating");
        console.log("Balance", address(this).balance);
    }
}
```

In order to test it, you need to create a new file in the `test` folder called `Lock.test.ts` with the following content:

```solidity
import { expect } from "chai";
import { ethers } from "hardhat";

import { time } from "@nomicfoundation/hardhat-network-helpers";
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'

import { Lock__factory, Lock } from '../typechain-types'

describe("Lock Tests", function () {
  const UNLOCK_TIME = 10000;
  const VALUE_LOCKED = ethers.parseEther("0.01");

  let lastBlockTimeStamp: number;
  let lockInstance: Lock;
  let ownerSigner: SignerWithAddress

  before(async () => {
    lastBlockTimeStamp = await time.latest()

    const signers = await ethers.getSigners()
    ownerSigner = signers[0]

    lockInstance = await new Lock__factory().connect(ownerSigner).deploy(lastBlockTimeStamp + UNLOCK_TIME, {
      value: VALUE_LOCKED
    })
  })

  it('should get the unlockTime value', async () => {
    expect(await lockInstance.unlockTime()).to.equal(lastBlockTimeStamp + UNLOCK_TIME)
  })
});
```

Notice a single test is included in order to get proper logs. However, you're only interested in the creation process that happens in the `before` hook. Then, you can run:

```bash
npx hardhat test
```

You should see the following in the terminal:

```bash
  Lock
Creating
Balance 10000000000000000
    ✔ should get the unlockTime value
```

The terminal shows the text "Creating" and the balance (which is 0.01 Ether) because during the creation, you are depositing Ether in the smart contract via the `value` property.

### A note about `console.log`

In the previous example, you used `console.log` to include some debugging logs. Be aware that the `console.log` version of Solidity is slightly limited compared to the ones that are provided in other programming languages, where you can log almost anything.

`Console.log` can be called with up to four parameters of the following types:

- uint
- string
- bool
- address

Hardhat includes other `console` functions, such as:

- console.logInt(int i)
- console.logBytes(bytes memory b)
- console.logBytes1(bytes1 b)
- console.logBytes2(bytes2 b)
- ...
- console.logBytes32(bytes32 b)

These log functions are handy when the type you intend to log doesn't fall within the default accepted types of `console.log`. For further details, refer to the official [console.log] documentation.

## Identifying common errors

While debugging your smart contracts, it's crucial to be familiar with common errors that can arise during development. Recognizing these errors and knowing how to resolve them is an important skill.

In the [Error Triage] lesson we covered a few errors although some of those errors are identified at compiling time. Other errors such as `reverts` or `index out of bounds errors` can be unexpected during the runtime of the smart contract.

The following explores typical techniques to debug these types of errors.

### Revert errors

When a transaction fails due to a `require` or `revert` statement, you'll need to diagnose why the condition isn't met and then resolve it. Typically, this involves verifying input parameters, state variables, or contract conditions.

The following is the `Lock.sol` contract with a require statement that validates that the parameter you are passing (`_unlockTime`) must be greater than the current `block.timestamp`.

A simple solution to troubleshoot this error is to log the value of `block.timestamp` and `_unlockTime`, which will help you compare these values and then ensure that you are passing the correct ones:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;

    // event Withdrawal(uint amount, uint when);

    constructor(uint _unlockTime) payable {
        console.log("_unlockTime",_unlockTime);
        console.log("block.timestamp",block.timestamp);
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);

        console.log("Creating");
        console.log("Balance", address(this).balance);
    }
}
```

When you run the tests with `npx hardhat test`, you'll then see the following:

```bash
Lock Tests
_unlockTime 1697493891
block.timestamp 1697483892
Creating
Balance 10000000000000000
    ✔ should get the unlockTime value
```

You are now able to see the `block.timestamp` and the value you are passing, which makes it easier to detect the error.

### Unintended behavior errors

Unintended behavior errors occur when you introduce unexpected behavior into the codebase due to a misunderstanding in the way Solidity works.

In the following example, `LockCreator` is a contract that allows anybody to deploy a `Lock.sol` instance. However, the `LockCreator` contains an error: the `createLock` functions are able to accept Ether to be locked but the amount sent is not being transferred to the `Lock` contract:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "hardhat/console.sol";

import {Lock} from "./Lock.sol";

contract LockCreator {

    Lock[] internal locks;

    // Example of bad code, do not use
    function createLock(uint256 _unlockTime) external payable {
        Lock newLock = new Lock(_unlockTime);
        locks.push(newLock);
    }
}
```

You can create a test file `LockCreator.test.ts` that can identify the error and then solve it:

```solidity
import { ethers } from "hardhat";

import { time } from "@nomicfoundation/hardhat-network-helpers";
import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'

import { LockCreator, LockCreator__factory } from '../typechain-types'

describe("LockCreator Tests", function () {
  const UNLOCK_TIME = 10000;
  const VALUE_LOCKED = ethers.parseEther("0.01");

  let lastBlockTimeStamp: number;
  let lockInstance: LockCreator;
  let ownerSigner: SignerWithAddress

  before(async () => {
    const signers = await ethers.getSigners()
    ownerSigner = signers[0]

    lockInstance = await new LockCreator__factory().connect(ownerSigner).deploy()
  })

  it('should create a lock', async () => {
    lastBlockTimeStamp = await time.latest()
    await lockInstance.createLock(lastBlockTimeStamp + UNLOCK_TIME, {
      value: VALUE_LOCKED
    })
  })
});
```

The following appears in the terminal where you can see the balance is `0`:

```bash
  LockCreator Tests
Creating
Balance 0
    ✔ should create a lock (318ms)
```

Although this issue can be avoided by adding more test cases with proper assertions, the re-transfer of Ether from the `LockCreator` was something you may have overlooked.

The solution is to modify the `createLock` function with:

```solidity
function createLock(uint256 _unlockTime) external payable {
    Lock newLock = new Lock{ value: msg.value}(_unlockTime);
    locks.push(newLock);
}
```

### Out-of-bounds errors

Attemping to access arrays at an invalid position can also cause errors.

If you wish to retrieve all the `Lock` contract instances being created in the previous example, you can make the `locks` array public. In order to illustrate this example though, you can create a custom function called `getAllLocks`:

```solidity
contract LockCreator {
    //
    // rest of the code..
    //
    function getAllLocks() external view returns(Lock[] memory result) {
        result = new Lock[](locks.length);
        for(uint i = 0; i <= locks.length; i++){
            result[i] = locks[i];
        }
    }
}
```

The function can be tested with the following test:

```solidity
describe("LockCreator Tests", function () {
  const UNLOCK_TIME = 10000;
  const VALUE_LOCKED = ethers.parseEther("0.01");

  let lastBlockTimeStamp: number;
  let lockInstance: LockCreator;
  let ownerSigner: SignerWithAddress

  before(async () => {
    const signers = await ethers.getSigners()
    ownerSigner = signers[0]

    lockInstance = await new LockCreator__factory().connect(ownerSigner).deploy()

    lastBlockTimeStamp = await time.latest()

    await lockInstance.createLock(lastBlockTimeStamp + UNLOCK_TIME, {
      value: VALUE_LOCKED
    })
  })

  it('should get all locks', async () => {
    const allLocks = await lockInstance.getAllLocks()

    console.log("all locks", allLocks)
  })
});
```

Which will then throw an error:

```bash
LockCreator Tests
Creating
Balance 10000000000000000
    1) should get all locks

  0 passing (3s)
  1 failing

  1) LockCreator Tests
       should get all locks:
     Error: VM Exception while processing transaction: reverted with panic code 0x32 (Array accessed at an out-of-bounds or negative index)
```

You can include some debugging logs to identify the issue:

```solidity
 function getAllLocks() external view returns(Lock[] memory result) {
        result = new Lock[](locks.length);

        console.log("locks length %s", locks.length);

        for(uint i = 0; i <= locks.length; i++){
            console.log("Locks index %s", i);
            result[i] = locks[i];
        }
}
```

Then, you see the following in the terminal:

```bash
 LockCreator Tests
Creating
Balance 10000000000000000
locks length 1
Locks index 0
Locks index 1
1) LockCreator Tests
       should get all locks:
     Error: VM Exception while processing transaction: reverted with panic code 0x32 (Array accessed at an out-of-bounds or negative index)
```

Since arrays are 0 index based, it means the maximum number of elements in the array is actually 1 at the position 0 since the condition in the `if` statement considers `<=`. It will then try to access the position 1, before it crashes.

Here's the simple solution:

```solidity
 function getAllLocks() external view returns(Lock[] memory result) {
        result = new Lock[](locks.length);

        console.log("locks length %s", locks.length);

        for(uint i = 0; i < locks.length; i++){
            console.log("Locks index %s", i);
            result[i] = locks[i];
        }
}
```

Which immediately solves the problem:

```bash
  LockCreator Tests
Creating
Balance 10000000000000000
locks length 1
Locks index 0
all locks Result(1) [ '0x83BA8C2028EE8a6476396145C7692fBD09337acD' ]
    ✔ should get all locks


  1 passing (3s)
```

## Conclusion

In this lesson, you've learned some techniques about how to debug smart contracts using Hardhat. You explored some common cases of various errors and how by simply using `console.log` and a proper test, you can identify and solve the problem.

---

## See also

[Console.log]: https://hardhat.org/hardhat-network/docs/reference#console.log
[Error Triage]: ../error-triage/error-triage.md
