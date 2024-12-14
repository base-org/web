---
title: Decommissioning Public Geth Archive Snapshots
slug: /decommissioning-public-geth-archive-snapshots
description: Public Geth archive snapshots will be decommissioned on December 15th, 2024.
keywords:
  [
    Geth,
    Archive Node,
    Node Snapshots,
    Ethereum,
    Infrastructure,
    Reth,
    Snapshots,
    Base Node,
    Beacon Endpoint,
    OP Stack,
  ]
hide_table_of_contents: true
---

# Decommissioning Public Geth Archive Snapshots

As part of our ongoing efforts to optimize our services, we will be deprecating the Public Geth Archive Snapshots on _December 15th, 2024_. We understand that this change may affect your operations if you rely on these snapshots for maintaining your Ethereum infrastructure. This notice aims to provide you with a potential path forward and offer solutions to ensure a smooth transition.

## Recommended Path Forward

We recommend switching to Reth going forward. We will continue to maintain the Reth archive snapshot.

If you need continued Geth support, we would advise that you maintain your own snapshot that is specific to your infrastructure e.g. EBS on AWS.

To sync a Geth Archive node to tip:

- Download the latest Geth Archive snapshot ~30 days old
- Use a beacon endpoint with historical blob data
  - Alternatively you can run your own [blob archiver](https://github.com/base-org/blob-archiver) if you don't want to rely on a third party

If you have any questions or would like assistance, please reach out to us on [Discord](https://base.org/discord) or [GitHub](https://github.com/base-org/base-node).
