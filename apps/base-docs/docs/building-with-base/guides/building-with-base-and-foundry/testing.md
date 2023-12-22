---
title: Testing with Foundry
description: Documentation for Foundry, a toolchain for smart contract development. Learn how to test your smart contracts using Foundry.
keywords: [Foundry, Forge, Foundry Book, smart contract development, toolchain, testing, test]
hide_table_of_contents: false
---

In this article, you'll learn how to test your smart contracts using [Foundry], the toolchain for smart contract development.

---

## Objectives

By the end of this guide, you should be able to:

- Understand the increased importance of testing in smart contract development
- Write and execute tests written in Solidity using the Forge Standard Library with Foundry
- Use the `cheatcodes` that Foundry provides to test your smart contracts

## Overview

Testing is a crucial aspect of smart contract development, ensuring the reliability and security of your code. Because it is impossible to patch a smart contract after deployment, you must thoroughly and completely test your code. Foundry provides a robust testing framework that allows developers to create comprehensive test suites for their projects using Solidity.

## My First Test with Foundry

Consider the default test that the `forge init hello_foundry_in_base` command provides in the seed Foundry project.

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/Counter.sol";

contract CounterTest is Test {
    Counter public counter;

    function setUp() public {
        counter = new Counter();
        counter.setNumber(0);
    }

    function testIncrement() public {
        counter.increment();
        assertEq(counter.number(), 1);
    }

    function testSetNumber(uint256 x) public {
        counter.setNumber(x);
        assertEq(counter.number(), x);
    }
}
```

Take note of the following:

- Foundry test files are named following the pattern: `<ContractName>.t.sol`
- Smart contract test files are named following the pattern: `<ContractName>Test`
- All tests inherit from `forge-std/Test.sol`.
- All tests contain a public function called `setUp`, which is executed before each test. This is similar to the `beforeEach` hook in the Mocha/Typescript world.
- Test cases start with the `test` keyword, for instance `testIncrement`.
- Test cases functions are public.

For more information about writing tests in Foundry, you can follow the official guide for [Writing tests]

In order to run the test in Foundry, run:

```bash
$ forge test
```

You should see in the terminal:

```bash
Running 2 tests for test/Counter.t.sol:CounterTest
[PASS] testIncrement() (gas: 28334)
[PASS] testSetNumber(uint256) (runs: 256, μ: 27565, ~: 28343)
Test result: ok. 2 passed; 0 failed; finished in 13.57ms
```

## Using Cheatcodes

Foundry includes a set of [cheatcodes], which are special instructions that are accessible using the `vm` instance in your tests. Cheatcodes allow you to perform various tasks, including:

- Manipulate the state of the blockchain
- Test reverts
- Test events
- Change block number
- Change identity
- And more!

To start, use a cheatcode to modify the `msg.sender` of your tests, and add some console logs via importing the `forge-std/console.sol` contract.

The `Counter` contract should look as follows:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "forge-std/console.sol";

contract Counter {
    uint256 public number;

    function setNumber(uint256 newNumber) public {
        console.log("The sender is %s", msg.sender);
        number = newNumber;
    }

    function increment() public {
        console.log("The sender is %s", msg.sender);
        number++;
    }
}
```

If you run the tests using `forge test`, you will see the following:

```bash
Running 2 tests for test/Counter.t.sol:CounterTest
[PASS] testIncrement() (gas: 31531)
[PASS] testSetNumber(uint256) (runs: 256, μ: 30684, ~: 31540)
Test result: ok. 2 passed; 0 failed; finished in 19.64ms
```

It seems the logs are not being shown. The reason is because the `forge test` command includes a flag that enable you to include more details of the logs emitted during the execution of the tests.

You can control that by including different levels of the verbose flag -- `-vv` up to `-vvvvv`. For more details about the level of verbosity you can refer to the [Logs and Traces] section of the Foundry documentation.

Run the `foundry test -vv`. You should see:

```bash
Running 2 tests for test/Counter.t.sol:CounterTest
[PASS] testIncrement() (gas: 31531)
Logs:
  The sender is 0x7FA9385bE102ac3EAc297483Dd6233D62b3e1496
  The sender is 0x7FA9385bE102ac3EAc297483Dd6233D62b3e1496

[PASS] testSetNumber(uint256) (runs: 256, μ: 30607, ~: 31540)
Logs:
  The sender is 0x7FA9385bE102ac3EAc297483Dd6233D62b3e1496

Test result: ok. 2 passed; 0 failed; finished in 17.89ms
```

Now, modify the test file using `prank` cheatcode, which allow you to modify the `msg.sender` of the next transaction. You will also use the `addr` cheatcode, which allow you to generate an address using any private key, which can simply be a hex number.

Include some `console.log` statements to understand better the execution flow.

The code should look like:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/Counter.sol";

contract CounterTest is Test {
    Counter public counter;

    function setUp() public {
        counter = new Counter();
        console.log("Calling on Setup");
        counter.setNumber(0);
    }

    function testIncrement() public {
        console.log("Calling on testIncrement");
        vm.prank(vm.addr(0x01));
        counter.increment();
        assertEq(counter.number(), 1);
    }

    function testSetNumber(uint256 x) public {
        console.log("Calling on testSetNumber");
        vm.prank(vm.addr(0x02));
        counter.setNumber(x);
        assertEq(counter.number(), x);
    }
}
```

Then if you run the `forge test -vv` command, you should see:

```bash
Running 2 tests for test/Counter.t.sol:CounterTest
[PASS] testIncrement() (gas: 35500)
Logs:
  Calling on Setup
  The sender is 0x7FA9385bE102ac3EAc297483Dd6233D62b3e1496
  Calling on testIncrement
  The sender is 0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf

[PASS] testSetNumber(uint256) (runs: 256, μ: 34961, ~: 35506)
Logs:
  Calling on Setup
  The sender is 0x7FA9385bE102ac3EAc297483Dd6233D62b3e1496

Test result: ok. 2 passed; 0 failed; finished in 48.75ms
```

Notice how you call the cheatcode `vm.prank` before the call to the `counter.increment()` and `counter.setNumber(x)` functions. This allows you to specify a particular address to become the `msg.sender` in the contract. Since the `vm.prank` accepts an address, you simply generate an address using the cheatcode `vm.addr`, where you pass a simple hexadecimal number, which is a valid private key.

## Conclusion

Congratulations! You've successfully completed your first step in your journey of testing smart contracts using Foundry. As you move forward, keep exploring its rich features and functionalities. The ability to write comprehensive tests and leverage cheatcodes ensures the reliability and security of your smart contracts.

Happy coding and testing with Foundry!

---

## See also

[Foundry]: https://book.getfoundry.sh/
[Writing tests]: https://book.getfoundry.sh/forge/writing-tests
[cheatcodes]: https://book.getfoundry.sh/forge/cheatcodes
[Logs and Traces]: https://book.getfoundry.sh/forge/tests?highlight=vvv#logs-and-traces
