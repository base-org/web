'use client';
import { PlusIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import * as Accordion from '@radix-ui/react-accordion';
import { useFrameContext } from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/Context';
import Frame from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/Frame';
import { SuggestionCard } from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/SuggestionCard';
import { Button, ButtonSizes, ButtonVariants } from 'apps/web/src/components/Button/Button';
import Input from 'apps/web/src/components/Input';
import Image, { StaticImageData } from 'next/image';
import { ChangeEvent, useCallback, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { useAccount } from 'wagmi';
import currencies from './ui/currencies.svg';
import email from './ui/email.svg';
import nftProduct from './ui/nftProduct.svg';
import payouts from './ui/payouts.svg';
import previewBackground from './ui/preview-background.svg';
import emptyPreviewFrame from './ui/preview-frame.svg';
import starActive from './ui/starActive.svg';
import swap from './ui/swap.svg';

export default function FrameBuilder() {
  const { address } = useAccount();
  const [frameUrl, setFrameUrl] = useState('');
  const [farcasterUsername, setFarcasterUsername] = useState('');
  const handleFarcasterUsernameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFarcasterUsername(e.target.value);
  }, []);
  const [swapTokenAddress, setSwapTokenAddress] = useState('');
  const handleSwapTokenAddressChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSwapTokenAddress(e.target.value);
  }, []);
  const emptyFrameUrl = !frameUrl;

  const onFrameUrlChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setFrameUrl(e.target.value),
    [],
  );

  const { closeFrameManagerModal, pendingFrameChange, setFrameRecord } = useFrameContext();

  const handlePaycasterClick = useCallback(() => {
    if (farcasterUsername) {
      setFrameUrl(`https://app.paycaster.co/api/frames/users/${farcasterUsername}`);
    } else {
      setFrameUrl('');
    }
  }, [farcasterUsername]);

  const handleBuildTopClick = useCallback(() => {
    if (address) {
      setFrameUrl(`https://build.top/nominate/${address}`);
    } else {
      setFrameUrl('');
    }
  }, [address]);

  const handleAddFrameClick = useCallback(() => {
    setFrameRecord(frameUrl)
      .then(() => {
        closeFrameManagerModal();
      })
      .catch(console.warn);
  }, [frameUrl, setFrameRecord, closeFrameManagerModal]);

  // corresponds to tailwind's md: rule
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const isMobile = useMediaQuery('(max-width: 769px)');

  if (!isDesktop && !isMobile) return null;

  if (isDesktop) {
    return (
      <div className="flex w-full flex-col">
        <h1 className="font-display text-3xl">Choose a frame to pin</h1>
        <div className="mt-4 flex flex-row justify-between gap-12">
          <Accordion.Root
            className="mt-4 flex flex-1 flex-col overflow-x-scroll"
            type="single"
            defaultValue="item-1"
            collapsible
          >
            <SuggestionCard
              imgData={payouts as StaticImageData}
              title="Pay me"
              description="Get paid with Paycaster."
            >
              <p className="text-sm text-palette-foreground">
                Add your farcaster to show a preview.
              </p>
              <div className="mt-3 flex flex-row gap-4">
                <Input
                  placeholder="@username"
                  value={farcasterUsername}
                  onChange={handleFarcasterUsernameChange}
                  type="text"
                  className="mr-3 flex-grow rounded-xl border border-palette-line/20 px-3 py-2"
                />
                <Button
                  rounded
                  variant={ButtonVariants.Black}
                  size={ButtonSizes.Small}
                  onClick={handlePaycasterClick}
                >
                  Show preview
                </Button>
              </div>
            </SuggestionCard>
            <SuggestionCard
              imgData={starActive as StaticImageData}
              title="Nominate me"
              description="Get nominated with build.top"
            >
              <div className="flex flex-row items-center justify-between gap-4">
                <p className="text-sm text-palette-foreground">
                  We’ll use your address to show a preview on{' '}
                  <a
                    href="http://build.top"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    build.top
                  </a>
                </p>
                <Button
                  rounded
                  variant={ButtonVariants.Black}
                  size={ButtonSizes.Small}
                  onClick={handleBuildTopClick}
                >
                  Show preview
                </Button>
              </div>
            </SuggestionCard>
            <SuggestionCard
              icon={<ShoppingCartIcon width={24} height={24} fill="#3CC28A" />}
              title="Buy from me"
              description="Sell products from your Slice shop"
            >
              <ol className="list-inside list-decimal indent-1 text-sm text-palette-foreground">
                <li>
                  Visit your onchain shop on{' '}
                  <a
                    href="http://slice.so"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    slice.so
                  </a>
                </li>
                <li>Paste a link to the product you want to sell on your profile</li>
              </ol>
            </SuggestionCard>
            <SuggestionCard
              imgData={nftProduct as StaticImageData}
              title="Subscribe to me"
              description="Get subscriptions to your Hypersub"
            >
              <ol className="list-inside list-decimal indent-1 text-sm text-palette-foreground">
                <li>
                  Visit{' '}
                  <a
                    href="http://hypersub.xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    hypersub.xyz
                  </a>
                </li>
                <li>Paste a link to your Hypersub Subscription page</li>
              </ol>
            </SuggestionCard>
            <SuggestionCard
              imgData={currencies as StaticImageData}
              title="Mint me"
              description="Mint your NFT on Highlight"
            >
              <ol className="list-inside list-decimal indent-1 text-sm text-palette-foreground">
                <li>
                  Visit{' '}
                  <a
                    href="http://highlight.xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    highlight.xyz
                  </a>
                </li>
                <li>Paste a link to the NFT you want others to mint</li>
              </ol>
            </SuggestionCard>
            <SuggestionCard
              imgData={swap as StaticImageData}
              title="Swap with me"
              description="Buy my bags"
            >
              <p className="text-sm text-palette-foreground">
                Add the Base address of the token you want people to buy
              </p>
              <div className="mt-3 flex flex-row gap-4">
                <Input
                  placeholder="token address"
                  value={swapTokenAddress}
                  onChange={handleSwapTokenAddressChange}
                  type="text"
                  className="flex-grow rounded-xl border border-palette-line/20 px-3 py-2"
                />
                <Button
                  rounded
                  variant={ButtonVariants.Black}
                  size={ButtonSizes.Small}
                  onClick={handlePaycasterClick}
                >
                  Show preview
                </Button>
              </div>
            </SuggestionCard>
            <SuggestionCard
              imgData={email as StaticImageData}
              title="RSVP me"
              description="Get RSVPs to your events on events.xyz"
            >
              <ol className="list-inside list-decimal indent-1 text-sm text-palette-foreground">
                <li>
                  Visit{' '}
                  <a
                    href="http://events.xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    events.xyz
                  </a>
                </li>
                <li>Create a new event, or paste a link to the event you want others to RSVP to</li>
              </ol>
            </SuggestionCard>
            <SuggestionCard
              icon={<PlusIcon width="24px" />}
              title="Add custom frame"
              description="Add a custom link to your frame"
            >
              <Input
                placeholder="https://"
                value={frameUrl}
                onChange={onFrameUrlChange}
                type="text"
                className="mr-3 mt-1 w-full flex-grow rounded-xl border border-palette-line/20 px-3 py-2"
              />
            </SuggestionCard>
          </Accordion.Root>
          <div className="flex flex-1 flex-col">
            <div
              className="flex min-h-96 w-full items-center justify-center rounded-3xl bg-cover bg-center bg-no-repeat p-6"
              style={{ backgroundImage: `url(${previewBackground.src})` }}
            >
              {emptyFrameUrl ? (
                <Image src={emptyPreviewFrame as StaticImageData} alt="preview frame" />
              ) : (
                <Frame url={frameUrl} />
              )}
            </div>
            <Button
              rounded
              variant={ButtonVariants.Black}
              className="mt-4 self-end"
              onClick={handleAddFrameClick}
              disabled={pendingFrameChange}
            >
              Add frame
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return <div>todo: add mobile ux</div>;
}
