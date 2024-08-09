'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import { StaticImport } from 'apps/web/node_modules/next/dist/shared/lib/get-img-props';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import { ButtonWithLinkAndEventLogging } from '../../Button/ButtonWithLinkAndEventLogging';
import { Icon } from '../../Icon/Icon';
import HomepageModal from './HomepageModal';
import modalImage from './basenames-modal.svg';

export default function BasenamesHomepageModal() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);
  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <AnalyticsProvider context="basenames_modal">
      <HomepageModal isOpen={isModalOpen} onClose={closeModal}>
        <div className="flex max-w-[441px] flex-col justify-center font-display">
          <div className="relative h-[258px]">
            <Image
              src={modalImage as StaticImport}
              alt="claim your basename today"
              className="h-full w-full object-cover"
            />
            <div className="absolute right-6 top-6">
              <button type="button" onClick={closeModal}>
                <Icon name="close" color="white" width="16px" height="16px" />
                <span className="hidden">x</span>
              </button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center bg-gray-90 p-6 text-center text-white">
            <h1 className="text-5xl font-normal leading-[56px]">Basenames</h1>
            <h1 className="text-5xl font-normal leading-[56px]">are here!</h1>
            <span className="mt-3 w-[384px] font-sans leading-6">
              Connect with other Based builders and start building your unique onchain identity on
              Base with a .base.eth username.
            </span>
            <ButtonWithLinkAndEventLogging
              href="/names"
              eventName="get_a_basename"
              buttonClassNames="mb-2 mt-8 flex w-[378px] flex-col items-center rounded-[3px] text-center font-medium leading-7"
            >
              Get your basename
            </ButtonWithLinkAndEventLogging>
          </div>
        </div>
      </HomepageModal>
    </AnalyticsProvider>
  );
}
