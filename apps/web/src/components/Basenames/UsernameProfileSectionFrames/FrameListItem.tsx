'use client';

import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/solid';
import * as Popover from '@radix-ui/react-popover';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import { useFrameContext } from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/Context';
import Frame from 'apps/web/src/components/Basenames/UsernameProfileSectionFrames/Frame';
import { useCallback } from 'react';

function removeUrl(urls: string, urlSubstringToRemove: string): string {
  const urlArray = urls.split('|');
  const filteredUrls = urlArray.filter((url) => !url.includes(urlSubstringToRemove));
  return filteredUrls.filter(Boolean).join('|');
}

export default function FrameListItem({ url }: { url: string }) {
  const { frameUrlRecord, setFrameRecord } = useFrameContext();
  const { currentWalletIsProfileOwner } = useUsernameProfile();

  const handleRemoveFrameClick = useCallback(() => {
    const newFrameUrlRecord = removeUrl(frameUrlRecord, url);
    setFrameRecord(newFrameUrlRecord).catch(console.error);
  }, [frameUrlRecord, setFrameRecord, url]);

  return (
    <div className="relative">
      {currentWalletIsProfileOwner && (
        <Popover.Root>
          <Popover.Trigger asChild>
            <button
              type="button"
              aria-label="more"
              className="absolute right-1 top-1 z-2 flex items-center justify-center rounded-lg bg-white p-2 text-gray-80 transition-colors hover:bg-gray-5"
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
                <TrashIcon width="12px" /> Remove frame
              </button>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      )}
      <Frame url={url} />
    </div>
  );
}
