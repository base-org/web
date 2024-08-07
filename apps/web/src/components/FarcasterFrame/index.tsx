'use client';

import { type FarcasterSignerImpersonating, signFrameAction } from '@frames.js/render/farcaster';
import { useFrame } from '@frames.js/render/use-frame';
import { fallbackFrameContext } from '@frames.js/render';
import { FrameUI, type FrameUIComponents, type FrameUITheme } from '@frames.js/render/ui';

import { useState } from 'react';
import { Address } from 'viem';

type StylingProps = {
  className?: string;
  style?: React.CSSProperties;
};

/**
 * You can override components to change their internal logic or structure if you want.
 * By default it is not necessary to do that since the default structure is already there
 * so you can just pass an empty object and use theme to style the components.
 *
 * You can also style components here and completely ignore theme if you wish.
 */
const components: FrameUIComponents<StylingProps> = {};

/**
 * By default there are no styles so it is up to you to style the components as you wish.
 */
const theme: FrameUITheme<StylingProps> = {
  Root: {
    className: 'flex flex-col w-full border rounded-lg overflow-hidden bg-white relative mt-6',
  },
  LoadingScreen: {
    className: 'absolute top-0 left-0 right-0 bottom-0 bg-gray-90 z-10',
  },
  ButtonsContainer: {
    className: 'flex sm:py-3 py-2 sm:px-7 px-2 justify-around bg-[#F3F3F3] gap-2 sm:gap-4',
  },
  Button: {
    className:
      'grow py-4 rounded-lg bg-white border border-[#CFD0D2] transition-colors hover:bg-state-b-hovered',
  },
  ImageContainer: {
    className: 'relative w-full h-full border-b border-gray-90 overflow-hidden',
    style: {
      aspectRatio: 'var(--frame-image-aspect-ratio)', // helps to set the fixed loading skeleton size
    },
  },
};

type FarcasterFrameProps = {
  url: string;
  address: Address;
};

export default function FarcasterFrame({ url, address }: FarcasterFrameProps) {
  const farcasterSigner: FarcasterSignerImpersonating = {
    fid: 1,
    status: 'impersonating',
    publicKey: '0x00000000000000000000000000000000000000000000000000000000000000000',
    privateKey: '0x00000000000000000000000000000000000000000000000000000000000000000',
  };

  const [errorLoadingFrame, setErrorLoadingFrame] = useState(false);

  const frameState = useFrame({
    connectedAddress: address,
    // replace with frame URL
    homeframeUrl: url,
    // corresponds to the name of the route for POST and GET in step 2
    frameActionProxy: '/frames',
    frameGetProxy: '/frames',
    frameContext: fallbackFrameContext,
    onError: () => setErrorLoadingFrame(true),
    // map to your identity if you have one
    signerState: {
      hasSigner: false,
      // farcasterSigner.status === 'approved' || farcasterSigner.status === 'impersonating',
      signer: farcasterSigner,
      isLoadingSigner: false,
      onSignerlessFramePress: () => {
        // Only run if `hasSigner` is set to `false`
        // This is a good place to throw an error or prompt the user to login
        console.log(
          'A frame button was pressed without a signer. Perhaps you want to prompt a login',
        );
      },
      signFrameAction,
      logout() {
        console.log('logout');
      },
    },
  });

  if (!url || errorLoadingFrame) return null;
  return (
    <a href={url} aria-label="link-to-frame" target="_blank" rel="noreferrer">
      <FrameUI frameState={frameState} components={components} theme={theme} />
    </a>
  );
}
