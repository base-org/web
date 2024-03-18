---
title: 'Advanced Frame Behavior'
slug: /advanced-frame-behavior
description: Make a Farcaster frame that only allows users to access part of the frame after they have completed different actions.
keywords: [farcaster, frames, farcaster frames]
hide_table_of_contents: false
displayed_sidebar: null
---

As [Frames] on [Farcaster] grow in popularity, developers are building more complex interactions to meet the community's expectation for new and exciting things to do. [OnchainKit], and our [a-frame-in-100-lines] demo give you a number of tools to build complex interactions within a frame.

:::caution

Frames are brand new and tools are evolving quickly. Check the links above for changelogs!

:::

---

## Objectives

By the end of this lesson, you should be able to:

- Build a [Farcaster] Frame that gates content behind a requirement that the user follows, recasts, or likes you or your frame
- Create frames that use the text field and extract it from the message
- Construct redirect buttons in Frames
- Create multiple paths within a Frame based on the button clicked by a user

---

## Prerequisites

### Onchain App Development

You'll need to be comfortable building onchain apps.

### Vercel

You'll need to be comfortable deploying your app to [Vercel], or using another solution on your own. Check out our tutorial on [deploying with Vercel] if you need a refresher!

### Farcaster

You must have a [Farcaster] account with a connected wallet. Check out the [Base channel] to stay in the loop when we release guides like this!

### Frames

You should be comfortable with the basics of creating Farcaster [Frames]. If you aren't, check out our tutorial on [NFT Minting Frame].

---

## Setting Up a Copy of A Frame in 100 Lines

If you've been working in the early days of Frames, you may have an existing fork of [a-frame-in-100-lines] that you don't want to alter because it contains live frames.

You can create a copy that is not a fork to take advantage of the newest developments without risking prior work. Note that this copy will not behave as a fork.

First, create a bare clone of the template:

```bash
git clone --bare git@github.com:Zizzamia/a-frame-in-100-lines.git new-frames-project
```

Create a new, empty repo on GitHub, then mirror-push to that repo.

```bash
cd new-frames-project
git push --mirror git@github.com:<YOUR_NAME_HERE>/new-frames-project.git
```

Delete the `new-frames-project` folder, then clone as normal from the repo on GitHub.

Now you've got a fresh copy to work with!

## Deploy and Test

Add your new repo to Vercel and deploy. If you need a refresher, check out [deploying with Vercel]. Open the [Frame Validator] and test the current version of the template. Remember, this may have changed since the time of writing! We're moving fast!

## A Quick Overview of Features

![100 Lines](../../assets/images/frames/updated-100-lines.png)

The demo now has examples of text entry and redirects.

### Text Entry

The frame now has a text entry field. Try it out! When you click the `Story Time!` button, the text will be preserved, and will appear in the button on the next frame.

![Story Time](../../assets/images/frames/story-time.png)

The text input field is created by adding the `input` property to `getFrameMetadata`.

In this example, it's in `app/page.tsx` on line 24:

```typescript
import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { NEXT_PUBLIC_URL } from './config';

const frameMetadata = getFrameMetadata({
  buttons: [
    {
      label: 'Story time!',
    },
    {
      action: 'link',
      label: 'Link to Google',
      target: 'https://www.google.com',
    },
    {
      label: 'Redirect to pictures',
      action: 'post_redirect',
    },
  ],
  image: {
    src: `${NEXT_PUBLIC_URL}/park-3.png`,
    aspectRatio: '1:1',
  },
  input: {
    text: 'Tell me a boat story',
  },
  postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
});
```

When the user enters the text, it gets included in the frame message. You can see how it is retrieved in `api/frame/route.ts`. the `getFrameMessageBody` extracts the frame message from the request, and validates it. The returned `message` contains a number of useful properties that can be seen where it is defined in [OnchainKit], in `src/core/types.ts`:

```typescript
export interface FrameValidationData {
  button: number; // Number of the button clicked
  following: boolean; // Indicates if the viewer clicking the frame follows the cast author
  input: string; // Text input from the viewer typing in the frame
  interactor: {
    fid: number; // Viewer Farcaster ID
    custody_address: string; // Viewer custody address
    verified_accounts: string[]; // Viewer account addresses
  };
  liked: boolean; // Indicates if the viewer clicking the frame liked the cast
  raw: NeynarFrameValidationInternalModel;
  recasted: boolean; // Indicates if the viewer clicking the frame recasted the cast
  valid: boolean; // Indicates if the frame is valid
}
```

The demo makes use of the `input` property to add the story text to the button in the next frame:

```typescript
//api/frames/route.ts

// Extract the input:
if (message?.input) {
  text = message.input;
}

// Other code

// Return a new frame, with the story `text`
return new NextResponse(
  getFrameHtmlResponse({
    buttons: [
      {
        label: `🌲☀️ ${text} 🌲🌲`,
      },
    ],
    image: {
      src: `${NEXT_PUBLIC_URL}/park-1.png`,
    },
    postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
  }),
);
```

### Link Button

You can now add outbound links to buttons. To do this with [OnchainKit], simply create a button with an `action` property of `link`, and a `target` of the desired url:

```typescript
{
  action: 'link',
  label: 'Link to Google',
  target: 'https://www.google.com',
},
```

### Redirect Button

The third button contains a `Redirect to pictures ↗`. The way it works is a little tricky. Start with the `buttons` defined in the original frame in `page.tsx`. The third button is a `post_redirect`:

```typescript
{
  label: 'Redirect to pictures',
  action: 'post_redirect',
},
```

Clicking this button hits the `postUrl`, with the requirement that you return a `redirect` response with a status of 302, and a link. You can see that in `route.ts`:

```typescript
if (message?.button === 3) {
  return NextResponse.redirect(
    'https://www.google.com/search?q=cute+dog+pictures&tbm=isch&source=lnms',
    { status: 302 },
  );
}
```

Try changing it to your favorite link!

## Creating Gates

The `message`, shown above, has properties that make it easy to design interactions based on whether or not the user interacting with the frame has liked or recast your post, or if they follow the original caster.

!!!caution

The community is evolving quickly and many people are fatigued with "Like, follow, recast" spam in their feeds. These are useful tools, but some consideration should be given for designing an experience for the current culture of the community you are trying to reach.

!!!

### Like Gate

To require the user to "like" the cast before seeing images of puppies, simply modify the conditional for the redirect to include that check:

```typescript
if (message?.button === 3 && message?.liked) {
  return NextResponse.redirect(
    'https://www.google.com/search?q=cute+dog+pictures&tbm=isch&source=lnms',
    { status: 302 },
  );
}
```

If they haven't, return a version of the original frame with a new message in the third button. In doing so, you've created a loop with a behavior condition for the user to exit:

```typescript
if (message?.button === 3 && message.liked) {
  return NextResponse.redirect(
    'https://www.google.com/search?q=cute+dog+pictures&tbm=isch&source=lnms',
    { status: 302 },
  );
} else if (message?.button === 3) {
  return new NextResponse(
    getFrameHtmlResponse({
      buttons: [
        {
          label: 'Story time!',
        },
        {
          action: 'link',
          label: 'Link to Google',
          target: 'https://www.google.com',
        },
        {
          label: 'Redirect to pictures',
          action: 'post_redirect',
        },
      ],
      image: {
        src: `${NEXT_PUBLIC_URL}/park-3.png`,
        aspectRatio: '1:1',
      },
      input: {
        text: 'Tell me a boat story',
      },
      postUrl: `${NEXT_PUBLIC_URL}/api/frame`,
    }),
  );
}
```

Note that we're returning a `getFrameHtmlResponse` here, **not** a `getFrameMetadata`!

To test this, you'll need to actually cast the Frame. It won't work in the developer tool!

### Follow and Recast Gates

On your own, try changing the "like" gate to require the user to follow you, recast, or all three!

## Conclusion

In this tutorial, you learned how to use the newest features of Frames - text input, link buttons, and redirects. You also learned how to use new features in [OnchainKit] to require your users to perform certain actions to unlock features in your Frame. Finally, you learned how to create a loop in your Frame's behavior, which can be used to create very complicated Frames!

---

[Base Camp]: https://docs.base.org/base-camp/docs/welcome
[Farcaster]: https://www.farcaster.xyz/
[a-frame-in-100-lines]: https://github.com/Zizzamia/a-frame-in-100-lines
[OnchainKit]: https://github.com/coinbase/onchainkit
[Vercel]: https://vercel.com
[Frame Validator]: https://warpcast.com/~/developers/frames
[Base channel]: https://warpcast.com/~/channel/base
[deploying with Vercel]: /building-with-base/guides/deploy-frame-on-vercel
[NFT Minting Frame]: /building-with-base/guides/nft-minting-frame
[Frames]: https://warpcast.notion.site/Farcaster-Frames-4bd47fe97dc74a42a48d3a234636d8c5
[viem]: https://viem.sh/
[Basescan]: https://basescan.org/
