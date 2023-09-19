---
title: 'Deployment Exercise'
description: Exercise - Deploy your basic math contract and earn an NFT.
hide_table_of_contents: false
---

You've already built and deployed your [Basic Math] contract for this exercise. Now it's time to submit the address and earn an NFT pin to commemorate your accomplishment!

:::caution

We're currently in beta, so you'll only need to pay testnet funds to submit your contract, but this means you'll be getting a testnet NFT.

Stay tuned for updates!

:::

### Submit your Contract and Earn an NFT Badge! (BETA)

:::warning

Base Goerli does not yet support the new `PUSH0` opcode introduced in _Shanghai_, which is the default target for the Solidity compiler if you use version `0.8.20` or later. You will get an error when you attempt to deploy.

All exercises were built and tested with `0.8.17`. We recommend using this version until the upgrade.

:::

import basicMathUnitTestData from "../../assets/deployments/BasicMathUnitTest.json";
import CafeUnitTest from '../../../src/components/CafeUnitTest/index.jsx'

<CafeUnitTest deployment={basicMathUnitTestData} nftNum={1}/>

---

[basic math]: ../contracts-and-basic-functions/basic-functions-exercise
