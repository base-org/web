'use client';

import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import AddFrameModal from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/AddFrameModal';
import { useFrameContext } from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/Context';
import FarcasterAccountModal from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/FarcasterAccountModal';
import Frame from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/Frame';
import UsernameProfileSectionTitle from 'apps/web/src/components/Basenames/UsernameProfileSectionTitle';
import { Button, ButtonSizes, ButtonVariants } from 'apps/web/src/components/Button/Button';
import ImageAdaptive from 'apps/web/src/components/ImageAdaptive';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import { UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';
import { StaticImageData } from 'next/image';
import { useCallback } from 'react';
import { FrameProvider } from './Context';
import cornerGarnish from './corner-garnish.svg';
import frameIcon from './frame-icon.svg';
import Link from 'next/link';

function SectionContent() {
  const { profileUsername, profileAddress, currentWalletIsProfileOwner } = useUsernameProfile();
  const { existingTextRecords, existingTextRecordsIsLoading } = useReadBaseEnsTextRecords({
    address: profileAddress,
    username: profileUsername,
  });
  const homeframeUrl = existingTextRecords[UsernameTextRecordKeys.Frame];
  const { frameInteractionError, setFrameInteractionError, pendingFrameChange } = useFrameContext();

  const handleErrorClick = useCallback(
    () => setFrameInteractionError(''),
    [setFrameInteractionError],
  );

  if (currentWalletIsProfileOwner && !homeframeUrl && !existingTextRecordsIsLoading) {
    return (
      <section className="relative flex flex-row-reverse items-center justify-between gap-0 rounded-xl border border-palette-line/20 pb-5 pl-5 pt-5 lg:flex-row lg:justify-start lg:gap-2 lg:pb-0 lg:pl-1 lg:pr-6 lg:pt-0">
        <ImageAdaptive alt="" src={frameIcon as StaticImageData} className="z-1" />
        <div className="grow">
          <h1 className="text-xl font-medium text-illoblack">Pin a frame to your profile</h1>
          <p className="max-w-80 text-illoblack">
            Add fun and interactive experiences to your profile with a frame.
          </p>
          <Link
            href={`/name/${profileUsername}/configure-frames`}
            className="mt-1 rounded-xl bg-illoblack text-white lg:hidden"
          >
            Try it now
          </Link>
        </div>
        <Link
          href={`/name/${profileUsername}/configure-frames`}
          className="hidden rounded-xl bg-illoblack text-white lg:block"
        >
          Try it now
        </Link>
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
          <Link
            className="text-sm text-palette-foregroundMuted"
            href={`/name/${profileUsername}/configure-frames`}
          >
            + Add Frame
          </Link>
        )}
      </div>
      <div>
        <Frame url={homeframeUrl} />
        {frameInteractionError && (
          <Button
            size={ButtonSizes.Small}
            onClick={handleErrorClick}
            className="text-sm text-state-n-hovered"
          >
            {frameInteractionError}
          </Button>
        )}
      </div>
    </section>
  );
}

function UsernameProfileSectionFrames() {
  return (
    <FrameProvider>
      <SectionContent />
      <AddFrameModal />
      <FarcasterAccountModal />
    </FrameProvider>
  );
}

export default UsernameProfileSectionFrames;
