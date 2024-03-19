---
title: 'HyperFrames'
slug: /hyperframes
description: Learn how to make cross-linked hyperframes in an organized manner.
author: Brian Doyle
hide_table_of_contents: false
displayed_sidebar: null
---

[Frames] on [Farcaster] are getting more complex. Developers are now building interactions that require a handful, or even dozens of frames in response to various user states, inputs, and actions. HyperFrames are a system to organize navigation for large numbers of frames, using [OnchainKit]. In this tutorial, we'll use making the navigation for an [old-school adventure game] fully in a frame. You can use this same technique for many other intents with your Frames, such as games, stores, customized mints, etc.

:::caution

Frames are brand new and tools for building them are evolving quickly. Check the [Frames] docs and OnchainKit [changelog]!

:::

---

## Objectives

By the end of this lesson, you should be able to:

- Build hyperframes - connected [Farcaster] Frames that manage significant numbers of cross-linked frames in an organized fashion
- Add management of conditional states to the navigation system

---

## Prerequisites

### Vercel

You'll need to be comfortable deploying your app to [Vercel], or using another solution on your own. Check out our tutorial on [deploying with Vercel] if you need a refresher!

### Farcaster

You must have a [Farcaster] account with a connected wallet. Check out the [Base channel] to stay in the loop when we release guides like this!

### Frames

You should be comfortable with the basics of creating Farcaster [Frames]. If you aren't, check out our tutorial on [NFT Minting Frame].

---

## Getting Started

This tutorial assumes you're using [a-frame-in-100-lines] as the base for your project. It's a very lightweight template, so with minor modifications, you can adapt this technique to any project.

You'll also need to create or find a handful of images to use for each frame. AI tools are wonderful for this type of prototyping, or you can right-click and save the images from the [old-school adventure game].

## Creating the First Frame

Open `page.tsx`. Modify the `getFrameMetadata` for the first frame to match the frame in the example.

![First Frame](../../assets/images/frames/first-frame.png)

```typescript
const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Road',
    },
    {
      label: 'Woods',
    },
    {
      label: 'Cave',
    },
    {
      action: 'link',
      label: 'TODO',
      target: 'https://www.google.com',
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/frame-1-forest.webp`,
    aspectRatio: '1:1',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=start`,
});
```

**Note** the query parameter in the `postUrl`. You'll use this to identify which frame is sending the request to your endpoint.

Configure the rest of the metadata as you see fit. Remember, this won't show up in your frame, but it will appear if someone links your site to another platform that uses the standard Open Graph metadata.

```typescript
export const metadata: Metadata = {
  title: 'HyperFrames!',
  description: 'Time is a flat circle.',
  openGraph: {
    title: 'HyperFrames!',
    description: 'Time is a flat circle.',
    images: [`${NEXT_PUBLIC_URL}/frame-1-forest.webp`],
  },
  other: {
    ...frameMetadata,
  },
};
```

## Setting up the Route

The route you'll construct is similar to the example in [`app/api/route.ts`] of the 100-lines example. It will use OnchainKit to retrieve and validate the message from the frame. In doing so, it will collect:

- The user's address
- The button clicked by the user to get here
- Text, if the previous frame had a text box

Stub out the route, but remove the conditionals and the existing response:

```typescript
import { FrameRequest, getFrameMessage, getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  let accountAddress: string | undefined = '';
  let text: string | undefined = '';

  const body: FrameRequest = await req.json();
  const { isValid, message } = await getFrameMessage(body, { neynarApiKey: 'NEYNAR_ONCHAIN_KIT' });

  return new NextResponse();
  // TODO: Return a frame
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
```

### Identifying the Sending Frame

:::warning

A clever user could potentially manipulate your Frame by hitting your endpoint with different query parameters. Don't use this method alone for anything sensitive!

:::

To identify which frame sent the request to the endpoint, you can use [query string] parameters. In anticipation of using this technique, extract a query parameter called `frame` from the url of the request:

```typescript
const url = new URL(req.url);
const queryParams = url.searchParams;
const frame = queryParams.get('frame');
```

## HyperFrames

Add a file called `hyperframes.ts` to the `app` folder. Import:

```typescript
import { getFrameHtmlResponse } from '@coinbase/onchainkit';
import { NEXT_PUBLIC_URL } from './config';
```

Next, add an interface for the `HyperFrame`:

```typescript
interface HyperFrame {
  frame: string;
  1: string;
  2?: string;
  3?: string;
  4?: string;
}
```

The interface contains properties to track the frame itself, and the identifier for which frame each button is mapped to. These are all strings, because you'll use string identifiers for your frames, and because the frame returned by `getFrameHtmlResponse` is formatted as a string.

## The getHyperFrame Function

You'll put all of your hyperframes inside of a function, to make it easier to keep the pieces of information you need to route the user to the next frame in scope. This function will take in the identifier for the calling frame, and return the next frame needed depending on which button is pressed:

```typescript
export default function getHyperFrame(frame: string, text: string, button: number) {
  // Build hyperframes here

  const currentFrame = frames[frame];
  const nextFrameId = currentFrame[button as keyof HyperFrame] as string;

  return frames[nextFrameId].frame;
}
```

To store the hyperframes, use the `Record` type to build a mapping of `string` names of frames, to their data. Then add your first and second frames. To create the frames themselves, use `getFrameHtmlResponse` to build the frame, and add the names of the frames you have created, or will create, to the appropriate button.

```typescript
const frames: Record<string, HyperFrame> = {};

frames['start'] = {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'Road',
      },
      {
        label: 'Woods',
      },
      {
        label: 'Cave',
      },
      {
        action: 'link',
        label: 'TODO',
        target: 'https://www.google.com',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/frame-1-forest.webp`,
      aspectRatio: '1:1',
    },
    postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=start`,
  }),
  1: 'road',
  2: 'woods-bear',
  3: 'cave-1',
};

frames['road'] = {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'Go Back',
      },
      {
        label: 'Shack',
      },
      {
        label: 'Forward',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/road.png`,
      aspectRatio: '1:1',
    },
    postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=road`,
  }),
  1: 'start',
  2: 'shack',
  3: 'desert-road',
};
```

Above, you've created two hyperframes. The first, has three buttons, mapped to the frames named `road`, `woods-bear`, and `cave-1`. Only the first will work, because you haven't built the other hyperframes, or error handling.

The second, also has three buttons, mapped to frames as well. Only `start` is implemented as of yet.

**Critically**, the frames return a `postUrl` with their identifier as a query parameter. By doing this, you'll ensure that the route knows which frame sent the request, and can send that frame to `getHyperFrame` to retrieve and return the next frame.

## Calling `getHyperFrame`

Return to `route.ts`. To avoid TypeScript errors, you'll need to implement at least a minimum of error handling for the event that the `frame` query parameter or `button` are not present:

```typescript
if (!frame) {
  return new NextResponse('Frame not found', { status: 404 });
}

// There should always be a button number
if (!message?.button) {
  return new NextResponse('Button not found', { status: 404 });
}
```

Then, simply import and call `getHyperFrame` as the `NextResponse`:

```typescript
return new NextResponse(getHyperFrame(frame as string, text || '', message?.button));
```

Deploy, test with the [Frame Validator], and debug!

## Adding Conditionals

It's not very interesting for everyone to be able to explore without restriction, so add a lock with a password! To do so, add a function inside of the `getHyperFrame` function to store and retrieve a mapping of passwords to hyperframe identifiers.

```typescript
function checkForCorrectText(room: string, text: string): boolean {
  switch (room) {
    case 'shack':
      return text === 'All our Base are belong to you';
  }

  return false;
}
```

Combine this with a ternary in the appropriate button property, and additional frames to support, and you can handle situations where the user does or doesn't submit the appropriate password. The password in the linked example is implemented with a frame for the first time the user enters, a frame for after they enter a bad password, and a frame for a new room if they enter the correct password:

```typescript
frames['shack'] = {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'Go Back',
      },
      {
        label: 'Door',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/shack.png`,
      aspectRatio: '1:1',
    },
    input: {
      text: 'What is the password?',
    },
    postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=shack`,
  }),
  1: 'road',
  2: checkForCorrectText('shack', text) ? 'key' : 'shack-bad-password',
};

frames['shack-bad-password'] = {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'Go Back',
      },
      {
        label: 'Door',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/shack.png`,
      aspectRatio: '1:1',
    },
    input: {
      text: 'Try again. What is the password?',
    },
    postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=shack-bad-password`,
  }),
  1: 'road',
  2: checkForCorrectText('shack', text) ? 'key' : 'shack-bad-password',
};

frames['key'] = {
  frame: getFrameHtmlResponse({
    buttons: [
      {
        label: 'Go Back',
      },
      {
        label: 'TODO',
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/key.png`,
      aspectRatio: '1:1',
    },
    postUrl: `${NEXT_PUBLIC_URL}/api/frame?frame=key`,
  }),
  1: 'shack',
};
```

---

## Conclusion

In this tutorial, you learned how to implement a system of hyperframes - frames that are easily cross-linkable. You also learned how to add variety and depth to this system by adding conditionals for the button linking one frame to another.

---

[Farcaster]: https://www.farcaster.xyz/
[a-frame-in-100-lines]: https://github.com/Zizzamia/a-frame-in-100-lines
[OnchainKit]: https://github.com/coinbase/onchainkit
[Vercel]: https://vercel.com
[Frame Validator]: https://warpcast.com/~/developers/frames
[deploying with Vercel]: /building-with-base/guides/deploy-frame-on-vercel
[Frames]: https://docs.farcaster.xyz/learn/what-is-farcaster/frames
[viem]: https://viem.sh/
[NFT Minting Frame]: /building-with-base/guides/nft-minting-frame
[old-school adventure game]: https://warpcast.com/briandoyle81/0x108f1cdb
[query string]: https://en.wikipedia.org/wiki/Query_string
[changelog]: https://github.com/coinbase/onchainkit/blob/main/CHANGELOG.md
[`app/api/route.ts`]: https://github.com/Zizzamia/a-frame-in-100-lines/blob/main/app/api/frame/route.ts
