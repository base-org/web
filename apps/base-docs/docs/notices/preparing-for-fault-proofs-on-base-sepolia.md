---
title: Preparing for fault proofs on Base Sepolia
slug: /preparing-for-fault-proofs-on-base-sepolia
description: Fault proofs are expected to go live for Base Sepolia testnet in mid-July.
keywords:
  [
    Fault proofs,
    Base,
    L2 decentralization,
    Permissionless output proposals,
    Permissionless challenges,
    Withdrawals,
    Base Sepolia testnet,
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
    Ethereum Sepolia,
    Bridging logic,
    Testnet funds,
    Decentralized validation,
    Community participation,
  ]
hide_table_of_contents: true
---

# Preparing for fault proofs on Base Sepolia (Testnet)

Fault proofs are a critical implementation in an L2’s path towards decentralization. They enable a more decentralized approach to validating L2 state and pave the way towards more community participation.

They improve decentralization with two important capabilities:

- **Permissionless output proposals:** In an L2 without fault proofs, only the centralized proposer can create and submit output roots about the state of the L2. Now with fault proofs, anyone can make claims about Base's current state instead of relying on a central party.
- **Permissionless challenges to output proposals:** If someone makes a faulty or fraudulent claim, anyone can challenge it.

These changes allow anyone to withdraw funds from Base to L1 without having to rely on centralized actors.

## Preparing for fault proofs

Fault proofs are expected to go live for Base Sepolia (Testnet) in mid-July.

**What’s changing for testnet withdrawals:**

- Withdrawals will involve proving and finalizing based on the fault proof system.
- Withdrawals will no longer be instantaneous: they will take at least seven days to finalize, but can take longer depending on the outcome of the corresponding dispute game used.
- In addition, the 'DisputeGameFactory' will replace the 'L2OutputOracle' as the new contract for proposing output root statements. This change is part of the broader shift towards the fault proofing system, which is expected to enhance the security and reliability of the platform.
   
**If you are in the process of withdrawing your testnet funds from L2 to L1:**

- **Withdrawals _before_ the upgrade in mid-July** will be processed instantaneously.
- **Withdrawals _during_ or _after_ the fault proofs upgrade** for Base Sepolia will take at least seven days to complete.

If your withdrawal of testnet funds from Base Sepolia to Ethereum Sepolia coincides with the upgrade proceeding in mid-July, you will be required to resubmit your withdrawal.

**If your team is operating a bridge on Base Sepolia:**

- Please provide your users with a notice on your UI to inform them that fault proofs will be enabled for Base Sepolia in mid-July.
- Please ensure it’s clear to your users that testnet withdrawals will now take at least seven days.
- Assess and update your bridging logic, and make sure the new L1 contracts are being used.

Fault proof contract upgrades will be completed atomically, meaning all affected L1 contracts will be upgraded in a single transaction. No action will be required from node operators.

Please note, bridge.base.org now redirects to [Superbridge](https://superbridge.app/base) and other bridges (collectively, "Superchain bridges"). Superchain bridges are available to initiate and complete deposits and withdrawals to and from Base. Please refer to our [docs](https://bridge.base.org/deposit) for more information on bridging.
