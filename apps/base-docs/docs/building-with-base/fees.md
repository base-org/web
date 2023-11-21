---
title: Fees
slug: /fees
description: Documentation about network fees on Base. This page covers details of the two-component cost system involving L2 execution fees and L1 security fees, and offers insights on fee variations and cost-saving strategies.
keywords:
  [
    Base fees,
    transaction fees,
    network fees,
    Base network fees,
    L2 execution fee,
    L1 security fee,
    transaction costs,
    gas fees,
    fee calculation,
    cost-saving,
    transaction timing,
    fee variations,
    Base platform,
  ]
---

# Fees

## How do network fees on Base work?

Every Base transaction consists of two costs: an L2 (execution) fee and an L1
(security) fee. The L2 fee is the cost to execute your transaction on the L2,
and the L1 fee is the estimated cost to publish the transaction on the L1.
Typically the L1 security fee is higher than the L2 execution fee.

The L1 fee will vary depending on the amount of transactions on the L1. If the
timing of your transaction is flexible, you can save costs by submitting
transactions during periods of lower gas on the L1 (for example, over the
weekend)

Similarly, the L2 fee can increase and decrease depending on how many
transactions are being submitted to the L2. This adjustment mechanism has the
same implementation as the L1; you can read more about it
[here](https://help.coinbase.com/en/coinbase/getting-started/crypto-education/eip-1559).

For additional details about fee calculation on Base, please refer to the
[op-stack developer
documentation](https://community.optimism.io/docs/developers/build/transaction-fees/).
