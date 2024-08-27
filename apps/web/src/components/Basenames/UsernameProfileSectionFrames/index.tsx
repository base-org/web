'use client';
import { FrameUI } from '@frames.js/render/ui';
import { useFrame } from '@frames.js/render/use-frame';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import AddFrameModal from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/AddFrameModal';
import { useFrameContext } from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/Context';
import FarcasterAccountModal from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/FarcasterAccountModal';
import { theme } from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/FrameTheme';
import UsernameProfileSectionTitle from 'apps/web/src/components/Basenames/UsernameProfileSectionTitle';
import { Button, ButtonSizes, ButtonVariants } from 'apps/web/src/components/Button/Button';
import ImageAdaptive from 'apps/web/src/components/ImageAdaptive';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import { UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';
import { StaticImageData } from 'next/image';
import { FrameProvider } from './Context';
import cornerGarnish from './corner-garnish.svg';
import frameIcon from './frame-icon.svg';

function SectionContent() {
  const { profileUsername, profileAddress, currentWalletIsProfileOwner } = useUsernameProfile();
  const { existingTextRecords } = useReadBaseEnsTextRecords({
    address: profileAddress,
    username: profileUsername,
  });
  const homeframeUrl = existingTextRecords[UsernameTextRecordKeys.Frame];
  const {
    openFrameManagerModal,
    frameConfig,
    frameInteractionError,
    setFrameInteractionError,
    showFarcasterQRModal,
    setShowFarcasterQRModal,
    pendingFrameChange,
  } = useFrameContext();

  const frameState = useFrame({
    ...frameConfig,
    homeframeUrl,
  });

  if (currentWalletIsProfileOwner && !homeframeUrl) {
    return (
      <section className="relative flex flex-row-reverse items-center justify-between gap-0 rounded-xl border border-palette-line/20 pb-5 pl-5 pt-5 lg:flex-row lg:justify-start lg:gap-2 lg:pb-0 lg:pl-1 lg:pr-6 lg:pt-0">
        <ImageAdaptive alt="" src={frameIcon as StaticImageData} className="z-1" />
        <div className="grow">
          <h1 className="text-xl font-medium text-illoblack">Pin a frame to your profile</h1>
          <p className="max-w-80 text-illoblack">
            Add fun and interactive experiences to your profile with a frame.
          </p>
          <Button
            rounded
            disabled={pendingFrameChange}
            variant={ButtonVariants.Black}
            onClick={openFrameManagerModal}
            className="mt-1 lg:hidden"
          >
            Try it now
          </Button>
        </div>
        <Button
          rounded
          variant={ButtonVariants.Black}
          onClick={openFrameManagerModal}
          className="hidden lg:block"
        >
          Try it now
        </Button>
        <ImageAdaptive
          alt=""
          src={cornerGarnish as StaticImageData}
          className="absolute right-0 top-0 z-0 rotate-180 rounded-bl-xl lg:bottom-0 lg:left-0 lg:right-[unset] lg:top-[unset] lg:rotate-0"
        />
      </section>
    );
  }
  if (!homeframeUrl) return null;
  return (
    <section>
      <div className="flex flex-row justify-between">
        <UsernameProfileSectionTitle title="Frames" />
        {currentWalletIsProfileOwner && (
          <Button className="text-sm text-palette-foregroundMuted" onClick={openFrameManagerModal}>
            + Add Frame
          </Button>
        )}
      </div>
      <div>
        <FrameUI frameState={frameState} theme={theme} />
        {frameInteractionError && (
          <Button
            size={ButtonSizes.Small}
            onClick={() => setFrameInteractionError('')}
            className="text-sm text-state-n-hovered"
          >
            {frameInteractionError}
          </Button>
        )}
      </div>
      <FarcasterAccountModal
        farcasterUser={frameConfig.signerState.signer ?? null}
        loading={!!frameConfig.signerState.isLoadingSigner ?? false}
        startFarcasterSignerProcess={frameConfig.signerState.createSigner}
        isOpen={showFarcasterQRModal}
        onClose={() => setShowFarcasterQRModal(false)}
      />
    </section>
  );
}

function UsernameProfileSectionFrames() {
  return (
    <FrameProvider>
      <SectionContent />
      <AddFrameModal />
    </FrameProvider>
  );
}

export default UsernameProfileSectionFrames;
