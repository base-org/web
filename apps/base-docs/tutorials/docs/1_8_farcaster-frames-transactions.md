---
title: 'Farcaster Frames: Making transactions'
slug: /farcaster-frames-transactions
description: A tutorial that teaches how to invoke a wallet transaction from a Farcaster Frame.
author: briandoyle81
keywords: [farcaster, frames, farcaster frames, wallet, transaction, Base]
tags: ['frames', 'OnchainKit']
difficulty: intermediate
hide_table_of_contents: false
displayed_sidebar: null
---

[Frames] on [Farcaster] support wallet transactions invoked directly from the buttons in a Frame! [OnchainKit] supports this feature. In this tutorial, you'll learn how to set up a frame that will allow your users to complete a simple transaction.

---

## Objectives

By the end of this tutorial, you should be able to:

- Build a [Farcaster] Frame that invokes a smart contract transaction from a button

---

## Prerequisites

### Onchain App Development

You'll need to be comfortable building onchain apps.

### Vercel

You'll need to be comfortable deploying your app to [Vercel], or using another solution on your own. Check out our tutorial on [deploying with Vercel] if you need a refresher!

### Farcaster

You must have a [Farcaster] account with a connected wallet. Check out the [Base channel] to stay in the loop when we release tutorials like this!

### Frames

You should be comfortable with the basics of creating Farcaster [Frames]. If you aren't, check out our tutorials for how to build a [no-code NFT mint Frame] or [NFT airdrop Frame].

### Smart Contracts

You'll need a smart contract with at least one `public` function that is **not** `pure` or `view`. It needs to change state, so that it costs gas to execute. You can use your own, or the one that we've provided below.

---

## An Overview of the Transaction Process

As outlined in the [Public Draft V2], transactions in frames work through a multi-step process between the frame developer's endpoint, and the Warpcast (or other) app. A slightly more detailed breakdown of the process:

1. Any frame can have a button with `'tx'` assigned as the `action`. If this is the case, the `target` must be a URL for an endpoint that can process the request, and return `calldata` for an onchain transaction
1. When the user clicks the button, a POST request is sent to the endpoint with the usual set of data you get from the frame
1. The endpoint uses that data, such as the user's attached wallet address, to build a transaction and send it back to the Farcaster client app
1. The app then redirects the user to their wallet with the provided `calldata`, which opens the normal flow for the user to review and approve or deny a transaction
1. If successful, the wallet returns the user to the app with the transaction id
1. The app then automatically makes another POST request to the **same** `target`, this time with the transaction id. **Make sure you handle this second call appropriately!**

## Setting up the Smart Contract

Before you can build a frame that calls a smart contract transaction, you need to have a smart contract! You can use your own, deploy your own copy of our _Click the Button_ smart contract, or use our deployment.

The contract contains a simple game where players can "click the button" and pay a few cents worth of ether to get a point. That's it! No rewards, no complexity, just a tempting big red button, and a leaderboard that can be retrieved **unsorted**.

- `function clickTheButton()`
  - `public` and `payable`
  - Cost is 10000 gwei, or 0.00001 ether
  - Adds 1 point to the score of `msg.sender`
- `function getMyClicks()`
  - `public`
  - Returns the number of clicks for `msg.sender`
- `function getAllClicks()`
  - `public`
  - Returns an **unsorted** list of each address and their score
- `function withdraw()`
  - `public` and `onlyOwner`
  - Withdraw all funds to the owner address

We've deployed an [instance of the contract] on testnet, and [on mainnet]. You can use this if you like.

## Building the Frame

Start a new project using [a-frame-in-100-lines] as a template or guide, or open an existing one. Make sure the version of [OnchainKit] is current.

### The First Frame and Page

Add a new page to the Next.js [App Router] by adding a new folder in `app` called `buttonclicker` and a file called `page.tsx` inside the new folder. Doing so will automatically place the new page at `yourappname.vercel.app/buttonclicker`.

Using the sample page as a guide, set up a new frame, and stub for a new page:

```tsx
import { getFrameMetadata } from '@coinbase/onchainkit/frame';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      action: 'tx',
      label: 'Click the Button',
      target: `${NEXT_PUBLIC_URL}/api/buttonclicker`,
    },
    {
      action: 'link',
      label: 'Leaderboard',
      target: `${NEXT_PUBLIC_URL}/buttonclicker`,
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/button.webp`,
    aspectRatio: '1:1',
  },
  input: {
    text: "Don't click the button!",
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/aftertx`,
});

export const metadata: Metadata = {
  title: 'Click the Button',
  description: "Don't click the button!",
  openGraph: {
    title: 'Click the Button',
    description: "Don't click the button!",
    images: [`${NEXT_PUBLIC_URL}/button.webp`],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>Leaderboard</h1>
      <p>TODO</p>
    </>
  );
}
```

A few notes:

- The naming conventions and organization of OnchainKit are evolving as frames evolve. Check the [OnchainKit] repo and docs if the imports don't work
- You'll make the api endpoint for the button clicker game next
- Feel free to adjust the text. We're just having fun by making it give conflicting instructions
- The button to show the leaderboard simply goes to your page. You could render an svg to png in the frame endpoint to show it in frames as well
- You'll have to do the leaderboard on your own. Check out the frontend content in [Base Learn] if you need a hand learning how to interact with your contracts!

## Adding the Transaction Endpoints

**The transaction endpoints must handle two scenarios:**

- A POST request to the endpoint providing the user's information and expecting transaction `calldata` in return
- A POST to the `postUrl` endpoint after the transaction is successful, containing the transaction id. The second POST should return a valid frame
- These can be the same or different endpoints

### Setting up the Transaction Endpoint

Add a new folder called `buttonclicker` containing a file called `route.ts` inside the `api` folder of your `app` router. This will automatically create a new route at `https://yourapp.vercel.app/buttonclicker`.

You'll need to import the standard Frames functions you've been using, as well as some utilities from [viem]. You'll also need a new `type` from [OnchainKit].

```tsx
import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { encodeFunctionData, formatEther, parseGwei } from 'viem';
import { base } from 'viem/chains';
import type { FrameTransactionResponse } from '@coinbase/onchainkit/frame';
```

Finally, you'll need to import the ABI and address for your contract. If you're using a tool that exports the ABI as an object, you can add it as below after adding the folder and file for the ABI. Make sure you have `const abi =` before the array containing the ABI, and `export default abi;`.

You also need to add the contract address to `config.ts`.

If you're using Hardhat json artifacts, add those to your project and import from there.

```tsx
import ClickTheButtonABI from '../../_contracts/ClickTheButtonAbi';
import { CLICK_THE_BUTTON_CONTRACT_ADDR } from '../../config';
```

The `getResponse` function works similar to other frames. Stub it out first:

```tsx
async function getResponse(req: NextRequest): Promise<NextResponse | Response> {
  const body: FrameRequest = await req.json();
  const { isValid } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (!isValid) {
    return new NextResponse('Message not valid', { status: 500 });
  }

  // TODO
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
```

To begin, you'll need to build the `data` for the transaction. You'll use `encodeFunctionData` from viem to do this, the same as any other onchain app using viem:

```tsx
const data = encodeFunctionData({
  abi: ClickTheButtonABI,
  functionName: 'clickTheButton',
});
```

Next, use `FrameTransactionResponse` from [OnchainKit] to build the response the app expects:

```tsx
const txData: FrameTransactionResponse = {
  chainId: `eip155:${base.id}`,
  method: 'eth_sendTransaction',
  params: {
    abi: [],
    data,
    to: CLICK_THE_BUTTON_CONTRACT_ADDR,
    value: parseGwei('10000').toString(), // 0.00001 ETH
  },
};
```

Finally, return the transaction as a `NextResponse`:

```tsx
return NextResponse.json(txData);
```

:::info

If you find Warpcast errors or spins forever after receiving your transaction data, it can be handy to simulate the transaction on your service first. It makes debugging much easier and will rule out any errors in forming the transaction arguments. To learn how, check out viem's documentation on [Simulating Contract Interactions](https://viem.sh/docs/contract/simulateContract#simulatecontract).

:::

### Setting Up the After Transaction Endpoint

You can use a different `postUrl` to separate concerns with generating the transaction, and returning a frame after. You've already named this endpoint `aftertx` in the first frame's `postUrl`. Add it now to the `api` folder, and open `aftertx/route.ts`.

In this case, simply return the original frame with slightly updated buttons and text:

```tsx
import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit/frame';
import { NextRequest, NextResponse } from 'next/server';
import { NEXT_PUBLIC_URL } from '../../config';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  if (!isValid) {
    return new NextResponse('Message not valid', { status: 500 });
  }

  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          action: 'tx',
          label: 'Click Again!',
          target: `${NEXT_PUBLIC_URL}/api/buttonclicker`,
        },
        {
          action: 'link',
          label: 'Leaderboard',
          target: `${NEXT_PUBLIC_URL}/buttonclicker`,
        },
      ],
      image: {
        src: `${NEXT_PUBLIC_URL}/button.webp`,
        aspectRatio: '1:1',
      },
      input: {
        text: 'Noooo, why did you click!?',
      },
      postUrl: `${NEXT_PUBLIC_URL}/api/aftertx`,
    }),
  );
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
```

:::info

In certain applications you might want to monitor the status of the transaction at this point. It's possible it fails, takes a while, and/or you may want to do another operation _only after_ it has been confirmed. To do so you can make use of `message.transaction.hash` and build a frame flow that checks the status of the transaction by fetching the [transaction receipt](https://viem.sh/docs/actions/public/getTransactionReceipt#gettransactionreceipt).

:::

## Conclusion

In this tutorial, you've learned how to invoke a smart contract transaction from a frame! You used it to implement a simple game.

## Click the Button Source Code

This contract uses Remix-style imports. You'll need to update them for other toolchains!

```solidity
// SPDX-License-Identifier: MIT

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/structs/EnumerableMap.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

pragma solidity 0.8.20;

error WrongValue();

contract ClickTheButton is Ownable {
    uint constant COST = 10000 gwei;
    using EnumerableMap for EnumerableMap.AddressToUintMap;

    EnumerableMap.AddressToUintMap private timesClicked;

    constructor() Ownable(msg.sender) {}

    struct Clicker {
        address user;
        uint clicks;
    }

    function clickTheButton() public payable {
        if(msg.value != COST) {
            revert WrongValue();
        }
        (, uint clicks) = timesClicked.tryGet(msg.sender);
        timesClicked.set(msg.sender, clicks+1);
    }

    function getMyClicks() public view returns (uint) {
        (, uint clicks) = timesClicked.tryGet(msg.sender);
        return clicks;
    }

    function getAllClicks() public view returns (Clicker[] memory) {
        address[] memory keys = timesClicked.keys();
        Clicker[] memory allClicks = new Clicker[](keys.length);

        for(uint i = 0; i < keys.length; i++) {
            address user = address(keys[i]);
            allClicks[i] = Clicker(user, timesClicked.get(user));
        }

        return allClicks;
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
```

---

[Base Learn]: https://docs.base.org/base-learn/docs/welcome
[Farcaster]: https://www.farcaster.xyz/
[a-frame-in-100-lines]: https://github.com/Zizzamia/a-frame-in-100-lines
[OnchainKit]: https://onchainkit.xyz/?utm_source=basedocs&utm_medium=tutorials&campaign=farcaster-frames-transactions
[Vercel]: https://vercel.com
[Frame Validator]: https://warpcast.com/~/developers/frames
[Base channel]: https://warpcast.com/~/channel/base
[deploying with Vercel]: /tutorials/farcaster-frames-deploy-to-vercel
[NFT airdrop Frame]: /tutorials/farcaster-frames-nft-minting
[Frames]: https://warpcast.notion.site/Farcaster-Frames-4bd47fe97dc74a42a48d3a234636d8c5
[viem]: https://viem.sh/
[instance of the contract]: https://sepolia.basescan.org/address/0x863632e7607150d550a92502c0375802047eaa48#code
[no-code NFT mint Frame]: /tutorials/farcaster-frames-nocode-minting
[App Router]: https://nextjs.org/docs/app
[Public Draft V2]: https://www.notion.so/warpcast/Frame-Transactions-Public-Draft-v2-9d9f9f4f527249519a41bd8d16165f73
[on mainnet]: https://basescan.org/address/0x303e6ea2b939ce1be24ab16d66020696097910af#code
