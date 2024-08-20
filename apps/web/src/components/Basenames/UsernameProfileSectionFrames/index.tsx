import { createContext, useContext, useState, useCallback, useMemo, ChangeEvent } from 'react';
import { FrameUI, type FrameUIComponents, type FrameUITheme } from '@frames.js/render/ui';
import { useFrame } from '@frames.js/render/use-frame';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import UsernameProfileSectionTitle from 'apps/web/src/components/Basenames/UsernameProfileSectionTitle';
import ImageAdaptive from 'apps/web/src/components/ImageAdaptive';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import { useXmtpFrameContext, XmtpFrameContext } from 'apps/web/src/hooks/useXmtpFrameContext';
import { useXmtpIdentity } from 'apps/web/src/hooks/useXmtpIdentity';
import { UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';
import { zeroAddress } from 'viem';
import { useAccount } from 'wagmi';
import cornerGarnish from './corner-garnish.svg';
import frameIcon from './frame-icon.svg';
import starActive from './ui/starActive.svg';
import currencies from './ui/currencies.svg';
import email from './ui/email.svg';
import nftProduct from './ui/nftProduct.svg';
import payouts from './ui/payouts.svg';
import { StaticImageData } from 'next/image';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import Modal, { ModalSizes } from 'apps/web/src/components/Modal';
import { FrameState } from '@frames.js/render';

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
  Error: {
    className:
      'flex flex-col w-[380px] h-[200px] border border-palette-line/20 rounded-lg overflow-hidden bg-white relative mt-4 items-center justify-center opacity-50',
  },
  Root: {
    className:
      'flex flex-col max-w-[380px] border rounded-lg overflow-hidden bg-white relative mt-6',
  },
  LoadingScreen: {
    className:
      'flex flex-col items-center justify-center border border-gray-90 rounded-lg bg-white absolute top-0 left-0 right-0 bottom-0 z-10',
  },
  ButtonsContainer: {
    className:
      'text-xs sm:text-sm flex sm:py-3 py-2 sm:px-7 px-2 justify-around bg-[#F3F3F3] gap-2 sm:gap-4',
  },
  Button: {
    className:
      'grow py-4 rounded-lg bg-white border border-[#CFD0D2] transition-colors hover:bg-state-b-hovered',
  },
  ImageContainer: {
    className: 'relative w-full h-full border-b border-gray-90 overflow-hidden',
    style: {
      aspectRatio: 'var(--frame-image-aspect-ratio)',
    },
  },
};

type FrameContextValue = {
  frameModalOpen: boolean;
  openFrameModal: () => void;
  closeFrameModal: () => void;
  currentWalletIsOwner?: boolean;
  homeframeUrl: string;
  frameState: FrameState;
  xmtpFrameContext: XmtpFrameContext;
};

// Create the FrameContext
const FrameContext = createContext<FrameContextValue | null>(null);

// Create a custom hook to use the FrameContext
const useFrameContext = () => {
  const context = useContext(FrameContext);
  if (!context) {
    throw new Error('useFrameContext must be used within a FrameProvider');
  }
  return context;
};

// Create the FrameProvider component
function FrameProvider({ children }) {
  const [frameModalOpen, setFrameModalOpen] = useState(true);
  const openFrameModal = useCallback(() => setFrameModalOpen(true), []);
  const closeFrameModal = useCallback(() => setFrameModalOpen(false), []);

  const { address } = useAccount();
  const { profileUsername, profileAddress, currentWalletIsOwner } = useUsernameProfile();
  const { existingTextRecords } = useReadBaseEnsTextRecords({
    address: profileAddress,
    username: profileUsername,
  });

  const homeframeUrl = existingTextRecords[UsernameTextRecordKeys.Frame];
  const { frameContext } = useXmtpFrameContext({
    fallbackContext: {
      conversationTopic: 'base-name-profile',
      participantAccountAddresses: address ? [address, zeroAddress] : [zeroAddress],
    },
  });
  const xmtpSignerState = useXmtpIdentity();

  const frameState = useFrame({
    connectedAddress: address,
    homeframeUrl,
    frameActionProxy: '/frames',
    frameGetProxy: '/frames',
    onError: (e) => console.error('frame error: ', e),
    signerState: xmtpSignerState,
    specification: 'farcaster',
    frameContext,
  });

  const value = useMemo(
    () => ({
      frameModalOpen,
      openFrameModal,
      closeFrameModal,
      currentWalletIsOwner,
      homeframeUrl,
      frameState,
      xmtpSignerState,
      xmtpFrameContext: frameContext,
    }),
    [
      closeFrameModal,
      currentWalletIsOwner,
      frameModalOpen,
      frameState,
      homeframeUrl,
      openFrameModal,
      frameContext,
      xmtpSignerState,
    ],
  );

  return <FrameContext.Provider value={value}>{children}</FrameContext.Provider>;
}

// Update the TryNowHero component
function TryNowHero() {
  const { openFrameModal } = useFrameContext();

  return (
    <section className="relative flex flex-row items-center justify-start gap-2 rounded-xl border border-palette-line/20 pl-1 pr-6">
      <ImageAdaptive alt="" src={frameIcon as StaticImageData} className="z-1" />
      <div className="grow">
        <h1 className="text-xl font-medium text-illoblack">Pin a frame to your profile</h1>
        <p className="max-w-80 text-illoblack">
          Add fun and interactive experiences to your profile with a frame.
        </p>
      </div>
      <Button rounded variant={ButtonVariants.Black} onClick={openFrameModal}>
        Try it now
      </Button>
      <ImageAdaptive
        alt=""
        src={cornerGarnish as StaticImageData}
        className="absolute bottom-0 left-0 z-0 rounded-bl-xl"
      />
    </section>
  );
}

type SuggestionCardProps = {
  imgData: StaticImageData;
  title: string;
  description: string;
  onClick?: () => void;
};

function SuggestionCard({ imgData, title, description, onClick }: SuggestionCardProps) {
  return (
    <div
      className="h-[160px] w-[220px] shrink-0 cursor-pointer rounded-[13px] border border-palette-line/20 p-4 hover:shadow-lg"
      onClick={onClick}
      onKeyDown={onClick}
      role="menuitem"
      tabIndex={0}
    >
      <ImageAdaptive alt="" src={imgData} />
      <span className="mt-4 text-sm font-medium">{title}</span>
      <p className="text-foreground-muted text-sm">{description}</p>
    </div>
  );
}

// Update the AddFrameModal component
function AddFrameModal() {
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

// Update the SectionContent component
function SectionContent() {
  const { currentWalletIsOwner, homeframeUrl, frameState } = useFrameContext();

  if (currentWalletIsOwner && !homeframeUrl) {
    return <TryNowHero />;
  }
  if (!homeframeUrl) return null;
  return (
    <section>
      <div className="flex flex-row justify-between">
        <UsernameProfileSectionTitle title="Frames" />
      </div>
      <FrameUI frameState={frameState} components={components} theme={theme} />
    </section>
  );
}

// Update the main UsernameProfileSectionFrames component
function UsernameProfileSectionFrames() {
  return (
    <FrameProvider>
      <SectionContent />
      <AddFrameModal />
    </FrameProvider>
  );
}

export default UsernameProfileSectionFrames;
