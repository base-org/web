---
title: 'Minting NFTs with Zora'
slug: /minting-nfts-with-zora
description: Learn to use Zora contracts inside your app to create secure, efficient, and feature-rich minting experiences for your users.
author: briandoyle81
keywords: [Solidity, ERC-1155, token, NFT, wagmi, viem, Zora]
tags: ['nft', 'smart wallet']
difficulty: intermediate
hide_table_of_contents: false
displayed_sidebar: null
---

[Zora]'s mission is to make creating on the internet free and valuable. To support this, they've made a number of no-code tools, sdks, and contracts that make creating NFTs easier. They're also a part of the [superchain ecosystem], which means most of their tools also work on Base!

You can interact with Zora's contracts through your own frontend, which makes it easier to create secure, efficient, and feature-rich minting experiences for your users.

For this tutorial, you'll use Zora's [gassless 1155 premint] with [An Onchain App in 100 Components] to allow not-yet-onchain artists to use your app to create and share NFT collections **without** needing a funded wallet. And because the template includes the Coinbase [Smart Wallet], you can help these users create their first wallet and automatically receive their rewards and payments without them needing to figure anything out.

In doing so, you'll help grow the ecosystem of Base users for everyone!

---

## Objectives

By the end of this tutorial you should be able to:

- Programmatically use Zora's [gasless 1155 premint] create ERC-1155 minting experiences on a frontend
- Use the connected wallet address to receive minting rewards and payments

---

## Prerequisites

### ERC-1155 Tokens

This tutorial assumes that you are able to write, test, and deploy your own ERC-1155 tokens using the Solidity programming language. If you need to learn that first, check out our content in [Base Camp].

### Vercel

You'll need to be comfortable deploying your app to [Vercel], or using another solution on your own. Check out our tutorial on [deploying with Vercel] if you need a refresher!

### Onchain Apps

The tutorial assumes you're comfortable with the basics of deploying an app and connecting it to a smart contract. If you're still learning this part, check out our tutorials in [Base Camp] for [Building an Onchain App].

---

## Getting Started

Begin by making a copy of [An Onchain App in 100 Components] by clicking the `Use this Template` button then cloning it locally.

The team recommends using [Bun], so install it if you need to, then install the packages and run the app:

```bash
# Install bun in case you don't have it
bun curl -fsSL <https://bun.sh/install> | bash

# Install packages
bun i

# Run Next app
bun run dev
```

You only need to create

Navigate to `localhost:3000` and confirm the app is working.

## Building the App

This tutorial won't cover all of the frontend development, auth, databases, or other details of making a production app, but it will walk you through the major pieces of enabling your users to use your app to:

- Create a Coinbase Smart Wallet, if they need one
- Create an NFT collection, gaslessly with `Premint`
- Add tokens to that collection
- Allow other people to mint the tokens

Begin by opening `src/app/page.tsx` and doing some cleanup. Delete everything expect the wallet integration, and add some copy that is friendly to non-crypto-native users:

```typescript
'use client';
import WalletComponents from '@/components/WalletComponents';

export default function Page() {
  return (
    <div className="flex w-96 flex-col md:w-[600px]">
      <section className="mb-6 flex w-full flex-col border-b border-sky-800 pb-6">
        <aside className="mb-6 flex">
          <h2 className="text-xl">Wallet</h2>
        </aside>
        <p className="text-body text-white">
          Welcome! Please sign in with your wallet. If you are new at this, you can create a new
          wallet by clicking the "Connect wallet" button and following the instructions!
        </p>
        <WalletComponents />
      </section>
    </div>
  );
}
```

You can also delete the files for the components you removed. You still need `OnchainProviders.tsx` and `WalletComponents.tsx`.

### Creating the Premint from the App

:::info

Gas on Base is currently inexpensive enough that we're doing this tutorial on the live network! Zora supports Base Sepolia as well, so feel free to use that instead.

:::

Open `src/app/wagmi.ts` and convert the references of `baseSepolia` to `base`.

Install the [Zora Protocol SDK].

```bash
bun add @zoralabs/protocol-sdk viem@2.x
```

In `src/app/components` add a folder called `Zora` and file called `CreatePremint.tsx`. Open `CreatePremint.tsx`.

Import dependencies, instantiate a client, and stub out a component.

```typescript
import { createCreatorClient } from '@zoralabs/protocol-sdk';
import { useAccount, useChainId, usePublicClient, useSignTypedData } from 'wagmi';

export default function CreatePremint() {
  const chainId = useChainId();
  const publicClient = usePublicClient()!;
  const { address: creatorAddress } = useAccount();

  const creatorClient = createCreatorClient({ chainId, publicClient });

  return <div>TODO</div>;
}
```

Add a function to `createPremint` with the arguments accepted by the API.

```typescript
async function createPremint(
  contractName: string,
  contractURI: string,
  tokenURI: string,
  createReferral: string,
  maxSupply: bigint,
  maxTokensPerAddress: bigint,
  mintStart: bigint,
  mintDuration: bigint,
  pricePerToken: bigint,
) {
  // TODO
}
```

The example in the [premint docs] goes into detail about the parameters, but they should be largely self-evident.

## Conclusion

---

[Base Camp]: https://base.org.camp
[Building an Onchain App]: https://docs.base.org/base-camp/docs/frontend-setup/overview
[Vercel]: https://vercel.com
[deploying with Vercel]: /tutorials/farcaster-frames-deploy-to-vercel
[OpenZeppelin ERC-721]: https://docs.openzeppelin.com/contracts/2.x/api/token/erc721
[wagmi template]: https://www.smartwallet.dev/guides/create-app/using-wagmi
[superchain ecosystem]: https://www.superchain.eco/chains
[Zora]: https://zora.co/
[An Onchain App in 100 Components]: https://github.com/Zizzamia/an-onchain-app-in-100-components
[Next.js]: https://nextjs.org/
[Coinbase Developer Platform]: https://www.coinbase.com/developer-platform
[Basescan]: https://basescan.org/
[Zora Docs]: https://docs.zora.co/docs/intro
[Zora Protocol SDK]: https://ourzora.github.io/zora-protocol/protocol-sdk/introduction
[Zora 1155 Contracts]: https://docs.zora.co/docs/smart-contracts/creator-tools/Deploy1155Contract
[viem]: https://viem.sh/
[gasless 1155 premint]: https://ourzora.github.io/zora-protocol/protocol-sdk/creator/premint
[Smart Wallet]: https://www.coinbase.com/wallet/smart-wallet
[premint docs]: https://ourzora.github.io/zora-protocol/protocol-sdk/creator/premint
[wagmi]: https://wagmi.sh
