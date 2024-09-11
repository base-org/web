'use client';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { PlusIcon, ShoppingCartIcon } from '@heroicons/react/24/solid';
import * as Accordion from '@radix-ui/react-accordion';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import { useFrameContext } from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/Context';
import Frame from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/Frame';
import { SuggestionCard } from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/SuggestionCard';
import { Button, ButtonSizes, ButtonVariants } from 'apps/web/src/components/Button/Button';
import Input from 'apps/web/src/components/Input';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import { UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useState } from 'react';
import { useDebounceValue, useMediaQuery } from 'usehooks-ts';
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
  const params = useParams();
  const router = useRouter();
  const basename = params?.username ?? '';
  const [newFrameUrl, setNewFrameUrl] = useState('');
  const [debouncedNewFrameUrl] = useDebounceValue(newFrameUrl, 250);

  const [step, setStep] = useState<'select' | 'preview'>('select');
  const handleNextStep = useCallback(() => {
    setStep('preview');
    scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  const handlePrevStep = useCallback(() => {
    setStep('select');
    scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const { profileUsername, profileAddress } = useUsernameProfile();
  const { existingTextRecords } = useReadBaseEnsTextRecords({
    address: profileAddress,
    username: profileUsername,
  });
  const homeframeUrlString = existingTextRecords[UsernameTextRecordKeys.Frame] ?? '';

  const [swapTokenAddress, setSwapTokenAddress] = useState('');
  const handleSwapTokenAddressChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSwapTokenAddress(e.target.value);
  }, []);
  const emptyFrameUrl = !debouncedNewFrameUrl;

  const onFrameUrlChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setNewFrameUrl(e.target.value),
    [],
  );

  const { pendingFrameChange, setFrameRecord } = useFrameContext();

  const handlePaycasterClick = useCallback(() => {
    if (basename) {
      setNewFrameUrl(`https://app.paycaster.co/api/frames/users/${basename}`);
    } else {
      setNewFrameUrl('');
    }
  }, [basename]);

  const handleBuildTopClick = useCallback(() => {
    if (address) {
      setNewFrameUrl(`https://build.top/nominate/${address}`);
    } else {
      setNewFrameUrl('');
    }
  }, [address]);

  const handleAddFrameClick = useCallback(() => {
    if (!newFrameUrl) return;
    setFrameRecord(homeframeUrlString ? `${homeframeUrlString}|${newFrameUrl}` : newFrameUrl)
      .then(() => {
        router.push(`/name/${basename}`);
      })
      .catch(console.warn);
  }, [newFrameUrl, setFrameRecord, homeframeUrlString, router, basename]);

  // corresponds to tailwind's md: rule
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const isMobile = useMediaQuery('(max-width: 769px)');

  if (!isDesktop && !isMobile) return null;

  const suggestionCards = (
    <>
      <SuggestionCard
        imgData={payouts as StaticImageData}
        title="Pay me"
        description="Let others pay your Basename with Paycaster.co."
      >
        <div className="flex flex-row items-center justify-between gap-4">
          <p className="text-sm text-palette-foreground">
            We will use your basename to show a preview from{' '}
            <a
              href="https://paycaster.co/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              paycaster.co
            </a>
          </p>
          <Button
            rounded
            variant={ButtonVariants.Black}
            size={ButtonSizes.Tiny}
            onClick={handlePaycasterClick}
          >
            Show preview
          </Button>
        </div>
      </SuggestionCard>
      <SuggestionCard
        imgData={starActive as StaticImageData}
        title="Nominate me"
        description="Let others nominate you as a builder using your Basename address."
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
            size={ButtonSizes.Tiny}
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
        <p className="text-sm">To pin a frame:</p>
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
        <Input
          placeholder="https://"
          value={newFrameUrl}
          onChange={onFrameUrlChange}
          type="text"
          className="mr-3 mt-3 w-full flex-grow rounded-xl border border-palette-line/20 px-3 py-2"
        />
      </SuggestionCard>
      <SuggestionCard
        imgData={nftProduct as StaticImageData}
        title="Subscribe to me"
        description="Get subscriptions to your Hypersub"
      >
        <p className="text-sm">To pin a frame:</p>
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
        <Input
          placeholder="https://"
          value={newFrameUrl}
          onChange={onFrameUrlChange}
          type="text"
          className="mr-3 mt-3 w-full flex-grow rounded-xl border border-palette-line/20 px-3 py-2"
        />
      </SuggestionCard>
      <SuggestionCard
        imgData={currencies as StaticImageData}
        title="Mint me"
        description="Mint your NFT on Highlight"
      >
        <p className="text-sm">To pin a frame:</p>
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
        <Input
          placeholder="https://"
          value={newFrameUrl}
          onChange={onFrameUrlChange}
          type="text"
          className="mr-3 mt-3 w-full flex-grow rounded-xl border border-palette-line/20 px-3 py-2"
        />
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
            size={ButtonSizes.Tiny}
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
        <p className="text-sm">To pin a frame:</p>
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
        <Input
          placeholder="https://"
          value={newFrameUrl}
          onChange={onFrameUrlChange}
          type="text"
          className="mr-3 mt-3 w-full flex-grow rounded-xl border border-palette-line/20 px-3 py-2"
        />
      </SuggestionCard>
      <SuggestionCard
        icon={<PlusIcon width="24px" />}
        title="Add custom frame"
        description="Add a custom link to your frame"
      >
        <Input
          placeholder="https://"
          value={newFrameUrl}
          onChange={onFrameUrlChange}
          type="text"
          className="mr-3 mt-1 w-full flex-grow rounded-xl border border-palette-line/20 px-3 py-2"
        />
      </SuggestionCard>
    </>
  );

  if (isDesktop) {
    return (
      <div className="flex w-full flex-col">
        <Link
          href={`/name/${basename}`}
          className="mb-8 flex max-w-36 items-center justify-start gap-2 text-base font-medium hover:underline"
        >
          <ArrowLeftIcon width="12px" /> Back to profile
        </Link>
        <h1 className="font-display text-3xl">Choose a frame to pin</h1>
        <div className="mt-4 flex flex-row justify-between gap-12">
          <Accordion.Root
            className="mt-4 flex flex-1 flex-col overflow-x-scroll"
            type="single"
            defaultValue="item-1"
            collapsible
          >
            {suggestionCards}
          </Accordion.Root>
          <div className="flex flex-1 flex-col">
            <div
              className="flex min-h-96 w-full items-center justify-center rounded-3xl bg-cover bg-center bg-no-repeat p-6"
              style={{ backgroundImage: `url(${previewBackground.src})` }}
            >
              {emptyFrameUrl ? (
                <Image
                  className="pointer-events-none select-none"
                  src={emptyPreviewFrame as StaticImageData}
                  alt="preview frame"
                />
              ) : (
                <Frame url={debouncedNewFrameUrl} />
              )}
            </div>
            <Button
              rounded
              variant={ButtonVariants.Black}
              className="mt-4 self-end"
              onClick={handleAddFrameClick}
              disabled={pendingFrameChange || !newFrameUrl}
            >
              Add frame
            </Button>
          </div>
        </div>
      </div>
    );
  }
  const mobileContent = {
    select: (
      <>
        <Link
          href={`/name/${basename}`}
          className="mb-3 flex max-w-36 items-center justify-start gap-2 text-base hover:underline"
        >
          <ArrowLeftIcon width="12px" /> Back to profile
        </Link>
        <h1 className="mb-4 font-display text-2xl">Choose a frame to pin</h1>
        <Accordion.Root
          className="mt-2 flex flex-col overflow-y-scroll"
          type="single"
          defaultValue="item-1"
          collapsible
        >
          {suggestionCards}
        </Accordion.Root>
        <Button
          rounded
          variant={ButtonVariants.Black}
          className="mx-auto mt-4"
          onClick={handleNextStep}
          disabled={emptyFrameUrl}
        >
          Preview
        </Button>
      </>
    ),
    preview: (
      <>
        <div className="mb-4 flex flex-col items-start">
          <Button
            variant={ButtonVariants.Gray}
            size={ButtonSizes.Small}
            rounded
            className="mb-4"
            onClick={handlePrevStep}
          >
            <ArrowLeftIcon width="12px" /> Back
          </Button>
          <h1 className="mb-4 font-display text-2xl">Preview your frame</h1>
          <div
            className="flex w-full items-center justify-center rounded-3xl bg-cover bg-center bg-no-repeat p-6"
            style={{ backgroundImage: `url(${previewBackground.src})` }}
          >
            {emptyFrameUrl ? (
              <Image
                className="pointer-events-none select-none"
                src={emptyPreviewFrame as StaticImageData}
                alt="preview frame"
              />
            ) : (
              <Frame url={debouncedNewFrameUrl} />
            )}
          </div>
        </div>
        <Button
          rounded
          variant={ButtonVariants.Black}
          className="mx-auto mt-4"
          onClick={handleAddFrameClick}
        >
          Add Frame
        </Button>
      </>
    ),
  };

  return <div className="p-4">{mobileContent[step]}</div>;
}
