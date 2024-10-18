---
title: Basenames + Wagmi Tutorial
slug: /basenames-tutorial-using-wagmi
description: 'A tutorial that teaches how to integrate Basenames to your wagmi/viem App'
author: hughescoin
keywords:
  ['build on base', 'viem', 'wagmi', 'frontend', 'onchain app development']
tags: ['account abstraction']
difficulty: beginner
displayed_sidebar: null
---

# Add Basenames to your onchain app

[Basenames] is now live! But what exactly is it? Basenames allows users to register human-readable names for their addresses and serves as a foundational building block for onchain identity. Think of it as your favorite social media handle, but even bigger. Your Basename is multichain by default and yours forever—no platform can take it away from you (just make sure to pay your fee).

Integrating Basenames into your onchain app enhances the user experience by masking complex wallet addresses. Just as domains simplify IP addresses, Basenames do the same for wallet addresses.

This tutorial shows you how to display Basenames on behalf of your users. We'll walk through setting up the necessary files and configurations to interact with the Basenames ENS resolver directly. Let's begin!

## Objectives

By the end of this tutorial, you should be able to:

- Understand how onchain identity works on the Base network
- Enable users to use their onchain identity in your app
- Pull metadata from your users' Basename profile

## Steps

First, create a directory to store the ABI (Application Binary Interface) for the Basenames ENS resolver. The ABI will allow your project to interact with the smart contract that handles Basenames.

In your project folder, run the following commands:

```bash
mkdir abis
cd abis
touch L2ResolverAbi.ts
```

This will create a new directory named `abis` and a file named L2ResolverAbi.ts within it.

Next, add the following placeholder code to the `L2ResolverAbi.ts` file:

```typescript title="src/abis/L2ResolverAbi.ts"
export default [
  // ABI information goes here
] as const;
```

:::tip

You will need to replace the placeholder comment with the actual ABI. Here is the link to the full [L2ResolverAbi].

:::

To interact with the Base blockchain, you will need to update the wagmi configuration. This will allow your project to connect to the Base network and use its features.

Update your wagmi.ts file as follows:

```typescript tile="wagmi.ts"
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { http, createConfig, WagmiProvider } from 'wagmi';
import { base } from 'wagmi/chains';

export const config = createConfig({
  chains: [base],
  transports: {
    [base.id]: http(),
  },
  ssr: true,
});

const queryClient = new QueryClient();

export default function EthereumProviders({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
```

This code sets up your application to use the Base network, enabling the project to interact with the blockchain.

Next, we'll create a new directory to house the functions that will resolve and interact with Basenames. These functions will be responsible for fetching Basename information from the blockchain.

In your project folder, create the apis directory and add a basenames.tsx file:

:::note What's happening in the code? 

`convertReverseNodeToBytes()`: This function is creating the reverse node so we can look up a name given an address. Each address gets its own reverse record in our registry that's created in a deterministic way.

You can see the implementation of `convertReverseNodeToBytes()` in the [OnchainKit repo]

`BasenameTextRecordKeys`: Metadata (e.g., github, twitter, etc.) are stored as text records so we can look them up based on the enum key.

:::

```typescript title="src/apis/basenames.tsx"
import {
  Address,
  ContractFunctionParameters,
  createPublicClient,
  encodePacked,
  http,
  keccak256,
  namehash,
} from 'viem';
import { base, mainnet } from 'viem/chains';
import L2ResolverAbi from '@/abis/L2ResolverAbi';

// Function to resolve a Basename
export async function getBasename(address: Address) {
  try {
    const addressReverseNode = convertReverseNodeToBytes(address, base.id);
    const basename = await baseClient.readContract({
      abi: L2ResolverAbi,
      address: BASENAME_L2_RESOLVER_ADDRESS,
      functionName: 'name',
      args: [addressReverseNode],
    });
    if (basename) {
      return basename as BaseName;
    }
  } catch (error) {
    // Handle the error accordingly
    console.error('Error resolving Basename:', error);
  }
}
```

This code provides the foundation for resolving Basenames using the Base network.

:::tip

You can find the complete implementation in the full [basenames.tsx] file.

:::

Now that the necessary functions are in place, you can implement the Basenames functionality in your app. For this example, we'll modify the `page.tsx` file to display Basename information on the server and client side.

Here's how to set it up:

```typescript title="src/app/page.tsx"
import {
  BasenameTextRecordKeys,
  getBasename,
  getBasenameAvatar,
  getBasenameTextRecord,
} from '@/apis/basenames';
import BasenameDetails from '@/components/BasenameDetails';
import EthereumProviders from '@/contexts/EthereumProviders';
import { useAccount } from 'wagmi';

// shrek.base.eth

const address = '0x8c8F1a1e1bFdb15E7ed562efc84e5A588E68aD73'; // const account = useAccount(); \n address = account?.address;

async function fetchData() {
  const basename = await getBasename(address);

  if (basename === undefined) throw Error('failed to resolve address to name');

  const avatar = await getBasenameAvatar(basename);

  const description = await getBasenameTextRecord(
    basename,
    BasenameTextRecordKeys.Description
  );

  const twitter = await getBasenameTextRecord(
    basename,
    BasenameTextRecordKeys.Twitter
  );

  return {
    basename,
    avatar,
    description,
    twitter,
  };
}

export default async function Home() {
  const data = await fetchData();

  return (
    <EthereumProviders>
      <main className='flex min-h-screen flex-col gap-12 p-24'>
        <div className='mb-12'>
          <h1 className='text-xl mb-4'>Server-side rendered:</h1>
          <ul className='flex flex-col gap-4'>
            <li className='flex flex-col gap-2'>
              <span>Address</span>
              <strong>{address}</strong>
            </li>
            <li className='flex flex-col gap-2'>
              <span>Basename</span>
              <strong>{data.basename}</strong>
            </li>
            <li className='flex flex-col gap-2'>
              <span>Avatar</span>
              <strong>
                <img
                  src={data.avatar}
                  alt={data.basename}
                  width={100}
                  height={100}
                />
              </strong>
            </li>
            <li className='flex flex-col gap-2'>
              <span>Description</span>
              <strong>{data.description}</strong>
            </li>
            <li className='flex flex-col gap-2'>
              <span>Twitter</span>
              <strong>{data.twitter}</strong>
            </li>
          </ul>
        </div>
        <div>
          <h1 className='text-xl mb-4'>Client-side rendered:</h1>
          <BasenameDetails address={address} />
        </div>
      </main>
    </EthereumProviders>
  );
}
```

In this example, the Home component fetches Basename data and displays it in both server-side and client-side rendered sections. This allows your app to provide a seamless user experience, showing Basename details like the avatar, description, and associated Twitter handle.

## Conclusion

Congratulations! You've successfully integrated Basenames into your project. By setting up the necessary ABI, configuring your wagmi project, and implementing custom functions to resolve and display Basenames, you've enhanced your app's user experience by making wallet addresses more user-friendly. Your users can now enjoy a personalized, recognizable onchain identity across the Base network. Keep exploring and building to unlock even more possibilities with Basenames!

[Basenames]: https://www.base.org/names/
[OnchainKit]: https://onchainkit.xyz/
[L2ResolverAbi]: https://gist.github.com/hughescoin/adf1c90b67cd9b2b913b984a2cc98de9
[basenames.tsx]: https://gist.github.com/hughescoin/95b680619d602782396fa954e981adae
[OnchainKit repo]: https://github.com/coinbase/onchainkit/blob/main/src/identity/utils/convertReverseNodeToBytes.ts
