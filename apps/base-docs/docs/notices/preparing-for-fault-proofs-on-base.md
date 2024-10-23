---
title: Preparing for fault proofs on Base
slug: /preparing-for-fault-proofs-on-base
description: Fault proofs are expected to go live on Base Mainnet in late October.
keywords:
  [
    Fault proofs,
    Base,
    L2 decentralization,
    Permissionless output proposals,
    Permissionless challenges,
    Withdrawals,
    Base Mainnet,
    DisputeGameFactory,
    L2OutputOracle,
    Seven-day finalization,
    Dispute game,
    Bridge operators,
    UI updates,
    Contract upgrades,
    Node operators,
    Superbridge,
    Superchain bridges,
    L1 to L2 deposits,
    L2 to L1 withdrawals,
    Mid-July upgrade,
    Ethereum,
    Bridging logic,
    Bridge funds,
    Decentralized validation,
    Community participation,
  ]
hide_table_of_contents: true
---

# Preparing for fault proofs on Base Mainnet

Fault proofs are a critical implementation in an L2’s path towards decentralization. They enable a more decentralized approach to validating L2 state and pave the way towards more community participation.

They improve decentralization with two important capabilities:

- **Permissionless output proposals:** In an L2 without fault proofs, only the centralized proposer can create and submit output roots about the state of the L2. Now with fault proofs, anyone can make claims about Base's current state instead of relying on a central party.
- **Permissionless challenges to output proposals:** If someone makes a faulty or fraudulent claim, anyone can challenge it.

These changes allow anyone to withdraw funds from Base to L1 without having to rely on centralized actors.

## Preparing for fault proofs

Fault proofs are expected to go live for Base Mainnet in late October.

**What’s changing for withdrawals:**

- Withdrawals will involve proving and finalizing based on the fault proof system.
- In addition, the 'DisputeGameFactory' will replace the 'L2OutputOracle' as the new contract for proposing output root statements. This change is part of the broader shift towards the fault proofing system, which is expected to enhance the security and reliability of the platform.

**If you are in the process of withdrawing your funds from L2 to L1:**

- **Withdrawals _before_ the upgrade** must wait the 7-day challenge period before finalization.
- **Withdrawals _during_ or _after_ the fault proofs upgrade** for Base Mainnet will be proven by the Fault Proof system and generally take 7 days to finalize, but could see additional delays if challenged.

**If your team is operating a bridge on Base Mainnet:**

- Please provide your users with a notice on your UI to inform them that fault proofs will be enabled for Base Mainnet in late October.
- Assess and update your bridging logic, and make sure the new L1 contracts are being used.

Fault proof contract upgrades will be completed atomically, meaning all affected L1 contracts will be upgraded in a single transaction. No action will be required from node operators.

Please note, bridge.base.org now redirects to [Superbridge](https://superbridge.app/base) and other bridges (collectively, "Superchain bridges"). Superchain bridges are available to initiate and complete deposits and withdrawals to and from Base. Please refer to our [docs](https://bridge.base.org/deposit) for more information on bridging.
