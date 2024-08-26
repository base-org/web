import { useFrame } from '@frames.js/render/use-frame';
import { useFrameContext } from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/Context';
import { SuggestionCard } from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/SuggestionCard';
import Modal, { ModalSizes } from 'apps/web/src/components/Modal';
import { useXmtpIdentity } from 'apps/web/src/hooks/useXmtpIdentity';
import { StaticImageData } from 'next/image';
import { ChangeEvent, useCallback, useState } from 'react';
import { useAccount } from 'wagmi';

import starActive from './ui/starActive.svg';
import currencies from './ui/currencies.svg';
import email from './ui/email.svg';
import nftProduct from './ui/nftProduct.svg';
import payouts from './ui/payouts.svg';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import { FrameUI } from '@frames.js/render';

import {
  components,
  theme,
} from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/FrameTheme';

export default function AddFrameModal() {
  const { address } = useAccount();

  const { frameModalOpen, closeFrameModal, xmtpFrameContext } = useFrameContext();
  const [frameUrl, setFrameUrl] = useState('');
  const emptyFrameUrl = !frameUrl;

  const onFrameUrlChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setFrameUrl(e.target.value),
    [],
  );

  const xmtpSignerState = useXmtpIdentity();

  const frameState = useFrame({
    connectedAddress: address,
    homeframeUrl: frameUrl,
    frameActionProxy: '/frames',
    frameGetProxy: '/frames',
    onError: (e) => console.error('frame error: ', e),
    signerState: xmtpSignerState,
    specification: 'farcaster',
    frameContext: xmtpFrameContext,
  });

  return (
    <Modal isOpen={frameModalOpen} onClose={closeFrameModal} size={ModalSizes.FlexLarge}>
      <div className="flex flex-col">
        <h1 className="font-display text-3xl font-medium">Pin a frame to your profile</h1>
        <span className="mt-4 text-palette-foregroundMuted">
          Paste a link to your frame, or use one of the suggestions below.
        </span>
        <div className="mt-4 flex w-full flex-row justify-between gap-12">
          <div className="flex flex-col">
            <h3 className="mt-8 font-medium">Suggestions</h3>
            <div className="mt-4 flex max-w-[600px] flex-row gap-4 overflow-x-scroll">
              <SuggestionCard
                imgData={payouts as StaticImageData}
                title="Add by URL"
                description="Add your own Frame by URL"
              />
              <SuggestionCard
                imgData={payouts as StaticImageData}
                title="Pay me"
                description="Allow anyone to easily pay you directly from your Base profile using Paycaster."
              />
              <SuggestionCard
                imgData={starActive as StaticImageData}
                title="Nominate me"
                description="Allow anyone to easily nominate you as a favorite builder on Build.Top."
              />
              <SuggestionCard
                imgData={starActive as StaticImageData}
                title="Buy from me"
                description="Paste a link to a product on Slice.so to let anyone buy it directly from your profile."
              />
              <SuggestionCard
                imgData={nftProduct as StaticImageData}
                title="Subscribe to me"
                description="Paste the link to your Hypersub page to let anyone subscribe directly from your profile."
              />
              <SuggestionCard
                imgData={currencies as StaticImageData}
                title="Mint me"
                description="Paste a link to an NFT on Highlight to let others mint it directly from your profile."
              />
              <SuggestionCard
                imgData={email as StaticImageData}
                title="RSVP me"
                description="Paste a link to an event on Events.xyz to let anyone RSVP directly from your profile."
              />
            </div>
            <h3 className="mt-8 font-medium">Add a link to a frame</h3>
            <input
              placeholder="https://..."
              type="text"
              value={frameUrl}
              onChange={onFrameUrlChange}
              className="mt-4 rounded-[13px] border border-palette-line/20 p-4"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-medium">Preview</span>
            {emptyFrameUrl ? (
              <div className={theme.Error?.className}>
                <span>Choose a card to preview</span>
              </div>
            ) : (
              <FrameUI frameState={frameState} components={components} theme={theme} />
            )}
            <Button
              rounded
              variant={ButtonVariants.Black}
              className="mt-8 self-end justify-self-end"
            >
              Add frame
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
