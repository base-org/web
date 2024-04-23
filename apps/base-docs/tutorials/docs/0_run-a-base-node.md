---
title: Running a Base Node
slug: /run-a-base-node
description: A tutorial that teaches how to set up and run a Base Node.
author: taycaldwell & wbnns
keywords:
  [
    Base Node setup,
    running a node,
    Base node,
    run a Base node,
    hardware requirements,
    node synchronization,
    node snapshots,
    Base chain,
    Base blockchain,
    Base network,
    node deployment,
    Ethereum node,
  ]
tags: ['nodes']
difficulty: beginner
displayed_sidebar: null
---

This tutorial will walk you through setting up your own [Base Node].

---

## Objectives

By the end of this tutorial you should be able to:

- Deploy and sync a Base node

---

## Prerequisites

:::caution

Running a node is time consuming, resource expensive, and potentially costly. If you don't already know why you want to run your own node, you probably don't need to.
<br></br>

If you're just getting started and need an RPC URL, you can use our free endpoints:
<br></br>

- **Mainnet**: `https://mainnet.base.org`
- **Testnet (Sepolia)**: `https://sepolia.base.org`

**Note:** Our RPCs are rate-limited, they are not suitable for production apps.

If you're looking to harden your app and avoid rate-limiting for your users, please check out one of our [partners].

:::

### Hardware requirements

We recommend you have this configuration to run a node:

- 8-Core CPU
- at least 16 GB RAM
- an SSD drive with at least 2.5 TB free

:::info

If utilizing Amazon Elastic Block Store (EBS), ensure timing buffered disk reads are fast enough in order to avoid latency issues alongside the rate of new blocks added to Base during the initial synchronization process.

:::

### Docker

This tutorial assumes you are familiar with [Docker] and have it running on your machine.

### L1 RPC URL

You'll need your own L1 RPC URL. This can be one that you run yourself, or via a third-party provider, such as our [partners].

---

## Running a Node

1. Clone the [repo].
2. Ensure you have an Ethereum L1 full node RPC available (not Base), and set `OP_NODE_L1_ETH_RPC` & `OP_NODE_L1_BEACON` (in the `.env.*` file if using `docker-compose`). If running your own L1 node, it needs to be synced before Base will be able to fully sync.
3. Uncomment the line relevant to your network (`.env.sepolia`, or `.env.mainnet`) under the 2 `env_file` keys in `docker-compose.yml`.
4. Run `docker compose up`. Confirm you get a response from:

```bash
curl -d '{"id":0,"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",false]}' \
  -H "Content-Type: application/json" http://localhost:8545
```

:::caution

Syncing your node may take **days** and will consume a vast amount of your requests quota. Be sure to monitor usage and up your plan if needed.

:::

### Snapshots

If you're a prospective or current Base Node operator and would like to restore from a snapshot to save time on the initial sync, it's possible to always get the latest available snapshot of the Base chain on mainnet and/or testnet by using the following CLI commands. The snapshots are updated every week.

#### Restoring from snapshot

In the home directory of your Base Node, create a folder named `geth-data`. If you already have this folder, remove it to clear the existing state and then recreate it. Next, run the following code and wait for the operation to complete.

**Testnet (Full)**

```
wget https://sepolia-full-snapshots.base.org/$(curl https://sepolia-full-snapshots.base.org/latest)
```

**Testnet (Archive)**

```
wget https://sepolia-archive-snapshots.base.org/$(curl https://sepolia-archive-snapshots.base.org/latest)
```

**Mainnet (Full)**

```
wget https://mainnet-full-snapshots.base.org/$(curl https://mainnet-full-snapshots.base.org/latest)
```

**Mainnet (Archive)**

```
wget https://mainnet-archive-snapshots.base.org/$(curl https://mainnet-archive-snapshots.base.org/latest)
```

You'll then need to untar the downloaded snapshot and place the `geth` subfolder inside of it in the `geth-data` folder you created (unless you changed the location of your data directory).

Return to the root of your Base node folder and start your node.

```
cd ..
docker compose up --build
```

Your node should begin syncing from the last block in the snapshot.

Check the latest block to make sure you're syncing from the snapshot and that it restored correctly. If so, you can remove the snapshot archive that you downloaded.

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
