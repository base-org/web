---
title: Running a Base Node
slug: /guides/run-a-base-node
---

This guide will walk you through setting up your own [Base Node].

---

## Objectives

By the end of this guide you should be able to:

- Deploy and sync a Base node

---

## Prerequisites

:::caution

Running a node is time consuming, resource expensive, and potentially costly. If you don't already know why you want to run your own node, you probably don't need to.

If you're just getting started and need an RPC URL, you can use our free endpoint at `https://mainnet.base.org` (or if you're setting up a node on testnet, `https://goerli.base.org`). **Note:** Our RPCs are rate-limited, they are not suitable for production apps.

If you're looking to harden your dapp and avoid rate-limiting for your users, please check out one of our [partners].

:::

### Hardware requirements

We recommend you have this configuration to run a node:

- at least 16 GB RAM
- an SSD drive with at least 1 TB free

:::info

If utilizing Amazon Elastic Block Store (EBS), ensure timing buffered disk reads are fast enough in order to avoid latency issues alongside the rate of new blocks added to Base during the initial synchronization process.

:::

### Docker

This guide assumes you are familiar with [Docker] and have it running on your machine.

### L1 RPC URL

You'll need your own L1 RPC URL. This can be one that you run yourself, or via a third-party provider, such as our [partners].

---

## Running a Node

Clone the [repo].

Open `docker-compose.yml`. Both for `geth` and `node`, uncomment the line under `env_file` for the desired network.

Run `docker compose up`. Confirm you get a response from:

```bash
curl -d '{"id":0,"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",false]}' \
  -H "Content-Type: application/json" http://localhost:8545
```

:::caution

Syncing your node may take **days** and will consume a vast amount of your requests quota. Be sure to monitor usage and up your plan if needed.

:::

### Snapshots

If you're a prospective or current Base Node operator and would like to restore from a snapshot to save time on the initial sync, it's possible to always get the latest available snapshot of the Base chain on mainnet and/or testnet by using the following CLI commands. The snapshots are updated every hour.

**Mainnet**

```
wget https://base-mainnet-archive-snapshots.s3.us-east-1.amazonaws.com/$(curl https://base-mainnet-archive-snapshots.s3.us-east-1.amazonaws.com/latest)
```

**Testnet**

```
wget https://base-goerli-archive-snapshots.s3.us-east-1.amazonaws.com/$(curl https://base-goerli-archive-snapshots.s3.us-east-1.amazonaws.com/latest)
```

### Syncing

You can monitor the progress of your sync with:

```bash
echo Latest synced block behind by: $((($(date +%s)-$( \
  curl -d '{"id":0,"jsonrpc":"2.0","method":"optimism_syncStatus"}' \
  -H "Content-Type: application/json" http://localhost:7545 | \
  jq -r .result.unsafe_l2.timestamp))/60)) minutes
```

You'll also know that the sync hasn't completed if you get `Error: nonce has already been used` if you try to deploy using your node.

---

[docker]: https://www.docker.com/
[base node]: https://github.com/base-org/node
[repo]: https://github.com/base-org/node
[partners]: /tools/node-providers
