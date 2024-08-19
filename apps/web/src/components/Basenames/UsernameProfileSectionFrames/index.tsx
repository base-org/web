import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { FrameUI, type FrameUIComponents, type FrameUITheme } from '@frames.js/render/ui';
import { useFrame } from '@frames.js/render/use-frame';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import UsernameProfileSectionTitle from 'apps/web/src/components/Basenames/UsernameProfileSectionTitle';
import ImageAdaptive from 'apps/web/src/components/ImageAdaptive';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import { useXmtpFrameContext } from 'apps/web/src/hooks/useXmtpFrameContext';
import { useXmtpIdentity } from 'apps/web/src/hooks/useXmtpIdentity';
import { UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';
import { zeroAddress } from 'viem';
import { useAccount } from 'wagmi';
import cornerGarnish from './corner-garnish.svg';
import frameIcon from './frame-icon.svg';
import { StaticImageData } from 'next/image';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import Modal from 'apps/web/src/components/Modal';

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
      'flex flex-col w-[380px] h-[200px] border border-gray-90 rounded-lg overflow-hidden bg-white relative mt-6 items-center justify-center opacity-50',
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
  frameState: unknown;
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
  const [frameModalOpen, setFrameModalOpen] = useState(false);
  const openFrameModal = useCallback(() => setFrameModalOpen(true), []);
  const closeFrameModal = useCallback(() => setFrameModalOpen(false), []);

  const { address } = useAccount();
  const { profileUsername, profileAddress, currentWalletIsOwner } = useUsernameProfile();
  const { existingTextRecords } = useReadBaseEnsTextRecords({
    address: profileAddress,
    username: profileUsername,
  });

  const homeframeUrl = existingTextRecords[UsernameTextRecordKeys.Frame];
  const xmtpSignerState = useXmtpIdentity();
  const xmtpFrameContext = useXmtpFrameContext({
    fallbackContext: {
      conversationTopic: 'base-name-profile',
      participantAccountAddresses: address ? [address, zeroAddress] : [zeroAddress],
    },
  });

  const frameState = useFrame({
    connectedAddress: address,
    homeframeUrl,
    frameActionProxy: '/frames',
    frameGetProxy: '/frames',
    onError: (e) => console.error('frame error: ', e),
    signerState: xmtpSignerState,
    specification: 'farcaster',
    frameContext: xmtpFrameContext.frameContext,
  });

  const value = useMemo(
    () => ({
      frameModalOpen,
      openFrameModal,
      closeFrameModal,
      currentWalletIsOwner,
      homeframeUrl,
      frameState,
    }),
    [
      closeFrameModal,
      currentWalletIsOwner,
      frameModalOpen,
      frameState,
      homeframeUrl,
      openFrameModal,
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
          Add fun and interactive experiences to your profile with an frame.
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

// Update the AddFrameModal component
function AddFrameModal() {
  const { frameModalOpen, closeFrameModal } = useFrameContext();

  return <Modal isOpen={frameModalOpen} onClose={closeFrameModal} />;
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
