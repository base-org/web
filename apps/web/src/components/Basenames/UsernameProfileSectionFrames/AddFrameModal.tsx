import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { useFrameContext } from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/Context';
import Frame from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/Frame';
import { theme } from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/FrameTheme';
import { SuggestionCard } from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/SuggestionCard';
import { Button, ButtonSizes, ButtonVariants } from 'apps/web/src/components/Button/Button';
import Input from 'apps/web/src/components/Input';
import Modal, { ModalSizes } from 'apps/web/src/components/Modal';
import { StaticImageData } from 'next/image';
import { ChangeEvent, useCallback, useState } from 'react';
import { useAccount } from 'wagmi';
import currencies from './ui/currencies.svg';
import email from './ui/email.svg';
import nftProduct from './ui/nftProduct.svg';
import payouts from './ui/payouts.svg';
import starActive from './ui/starActive.svg';
import swap from './ui/swap.svg';

export default function AddFrameModal() {
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

  const { frameManagerModalOpen, closeFrameManagerModal, pendingFrameChange, setFrameRecord } =
    useFrameContext();

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

  return (
    <Modal
      isOpen={frameManagerModalOpen}
      onClose={closeFrameManagerModal}
      size={ModalSizes.FlexLarge}
    >
      <div className="flex flex-col">
        <h1 className="font-display text-3xl font-medium">Pin a frame to your profile</h1>
        <span className="mt-4 text-palette-foregroundMuted">
          Paste a link to your frame, or use one of the suggestions below.
        </span>
        <div className="mt-4 flex flex-row justify-between gap-12">
          <div className="flex max-w-md flex-col self-start rounded-xl border border-palette-line/20 bg-[#F3F3F3] p-4">
            <h3 className="font-medium">Suggestions</h3>
            <div className="mt-4 flex flex-col overflow-x-scroll">
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
                <div className="flex flex-row items-center gap-4">
                  <p className="max-w-80 text-sm text-palette-foreground">
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
                  <li>
                    Create a new event, or paste a link to the event you want others to RSVP to
                  </li>
                </ol>
              </SuggestionCard>
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="font-medium">Link to a frame</h3>
            <Input
              placeholder="https://..."
              type="text"
              value={frameUrl}
              onChange={onFrameUrlChange}
              className="mt-2 rounded-xl border border-palette-line/20 p-4"
            />
            <span className="mt-6 font-medium">Preview</span>
            {emptyFrameUrl ? (
              <div className={theme.Error?.className}>
                <span>Choose a card to preview</span>
              </div>
            ) : (
              <Frame url={frameUrl} />
            )}
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
    </Modal>
  );
}
