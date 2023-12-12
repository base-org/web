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

- Understand the importance of testing in smart contract development.
- Write and execute tests for smart contracts using the Forge Standard Library with Foundry.
- Use some of the `cheatcodes` that Foundry provides.

## Overview

Testing is a crucial aspect of smart contract development, ensuring the reliability and security of your code. Foundry provides a robust testing framework that allows developers to create comprehensive test suites for their projects using Solidity.

## My First Test with Foundry

Considering the default test that the `forge init hello_foundry_in_base` command provides in the seed Foundry project.

```javascript
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

We can identify the following:

- Test files in Foundry are named following the pattern: <ContractName>.t.sol.
- Test files are smart contracts named following the pattern: <ContractName>Test.
- All the tests inherit from `forge-std/Test.sol`.
- All the tests contain a public function called `setUp`, which is executed before each test. This is similar to the `beforeEach` hook in the Mocha/Typescript world.
- Test cases start with the `test` keyword, for instance `testIncrement`.
- Test cases functions are public.

For more information about writing tests in Foundry, you can follow the official guide for [Writing tests]

In order to run the test in Foundry, we simply run:

```bash
$ forge test
```

And we should see in the terminal:

```bash
Running 2 tests for test/Counter.t.sol:CounterTest
[PASS] testIncrement() (gas: 28334)
[PASS] testSetNumber(uint256) (runs: 256, μ: 27565, ~: 28343)
Test result: ok. 2 passed; 0 failed; finished in 13.57ms
```

## Using Cheatcodes

Foundry includes a set of [Cheatcodes], which are special instructions that are accessible using the `vm` instance in your tests. Cheatcodes allows you to perform various tasks, including:

- Manipulate the state of the blockchain
- Test reverts
- Test events
- Change block number
- Change identity 
- And more !

Let's use our first Cheatcode to modify the `msg.sender` of our tests. 

To do so, let's modify the smart contract to include some `console.log` that are also available in Foundry by importing the `forge-std/console.sol` contract.

Our `Counter` contract should look as follows:

```javascript
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

If we run the tests using `forge test` we should see the following:

```bash
Running 2 tests for test/Counter.t.sol:CounterTest
[PASS] testIncrement() (gas: 31531)
[PASS] testSetNumber(uint256) (runs: 256, μ: 30684, ~: 31540)
Test result: ok. 2 passed; 0 failed; finished in 19.64ms
```

It seems the logs are not being shown. The reason is because we `forge test` command includes a flag that enable us to include more details of the logs emmited during the execution of the tests.

We can control that by including `-vv` up until `-vvvvv`. For more details about the level of verbosity you can refer to the [Logs and Traces] section of the Foundry documentation.

If we then run the `foundry test -vv` we should see:

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

Now, let's modify the test file and we will use the `prank` cheatcode, which allow us to modify the `msg.sender` of the next transaction. We will also use the `addr` cheatcode, which allow us to generate an address using any private key, which can simply be an hex number.

We will include some `console.log` statements to understand better the execution flow.

The code should look like:

```javascript
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

Then if we run the `forge test -vv` command, we should see:

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

Notice how we call the cheatcode `vm.prank` before the call to the `counter.increment()` and `counter.setNumber(x)` functions. This will allow us to specify a particular address to become the `msg.sender` in the contract. Since the `vm.prank` accepts an address, we simply generate an address using the cheatcode `vm.addr`, where we pass a simple hexadecimal number, which is a valid private key.

## Conclusion

Congratulations! You've successfully completed your first step in your journey of testing smart contracts using Foundry. As you move forward, keep exploring its rich features and functionalities. The ability to write comprehensive tests and leverage cheatcodes enhances your capabilities in ensuring the reliability and security of your smart contracts.

Happy coding and testing with Foundry!

---

## See also

[Foundry]: https://book.getfoundry.sh/
[Writing tests]: https://book.getfoundry.sh/forge/writing-tests
[Cheatcodes]: https://book.getfoundry.sh/forge/cheatcodes
[Logs and Traces]: https://book.getfoundry.sh/forge/tests?highlight=vvv#logs-and-traces