'use client';

import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import * as Popover from '@radix-ui/react-popover';
import { useAnalytics } from 'apps/web/contexts/Analytics';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import { useFrameContext } from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/Context';
import Frame from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/Frame';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import Image, { StaticImageData } from 'next/image';
import { useCallback } from 'react';
import TrashIcon from './assets/trash-icon.svg';

export default function FrameListItem({ url }: { url: string }) {
  const { removeFrame } = useFrameContext();
  const { currentWalletIsProfileOwner } = useUsernameProfile();
  const { logEventWithContext } = useAnalytics();

  const handleRemoveFrameClick = useCallback(() => {
    removeFrame(url)
      .catch(console.error)
      .finally(() => {
        logEventWithContext('basename_profile_frame_removed', ActionType.click, { context: url });
      });
  }, [logEventWithContext, removeFrame, url]);

  return (
    <div className="relative mb-4 break-inside-avoid">
      {currentWalletIsProfileOwner && (
        <Popover.Root>
          <Popover.Trigger asChild>
            <button
              type="button"
              aria-label="more"
              className="absolute right-2.5 top-2.5 z-2 flex items-center justify-center rounded-lg bg-white p-2 text-gray-80 transition-colors hover:bg-gray-5"
            >
              <EllipsisHorizontalIcon width="12px" />
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              align="end"
              className="data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade rounded-xl bg-white p-2 will-change-[transform,opacity]"
              sideOffset={5}
            >
              <button
                type="button"
                aria-label="remove frame"
                onClick={handleRemoveFrameClick}
                className="flex flex-row items-center justify-start gap-2 px-2 py-1"
              >
                <Image alt="" src={TrashIcon as StaticImageData} width={16} /> Remove frame
              </button>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      )}
      <Frame url={url} />
    </div>
  );
}
