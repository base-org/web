'use client';

import { useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import { StaticImport } from 'apps/web/node_modules/next/dist/shared/lib/get-img-props';
import AnalyticsProvider from '../../../../contexts/Analytics';
import { IS_EARLY_ACCESS } from 'apps/web/src/utils/usernames';
import { ButtonWithLinkAndEventLogging } from '../../Button/ButtonWithLinkAndEventLogging';
import HomepageModal from './HomepageModal';
import modalImage from './basenames-modal.svg';
import ModalClose from './ModalClose';

const modalContainerClasses = `
  flex flex-col justify-center
  max-w-[300px] md:max-w-[441px]
  font-display
`;

const modalImageContainerClasses = `
  relative
  h-auto max-h-[258px]
`;

const modalContentContainerClasses = `
  flex flex-col items-center justify-center p-6
  bg-gray-90
  text-center text-white
`;

const modalCtaClasses = `
  flex flex-col items-center
  mt-8 w-full
  text-center font-medium leading-7
  rounded-[3px]
`;

export default function BasenamesHomepageModal() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const SHOW_BANNER = !IS_EARLY_ACCESS;

  useEffect(() => {
    setIsMounted(true);
    const storedValue = localStorage.getItem('BasenamesLaunchModalVisible');
    if (storedValue === null) {
      setIsModalOpen(true);
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    localStorage.setItem('BasenamesLaunchModalVisible', 'false');
  }, []);

  if (!SHOW_BANNER || !isModalOpen || !isMounted) {
    return null;
  }

  return (
    <AnalyticsProvider context="basenames_modal">
      <HomepageModal isOpen={isModalOpen} onClose={closeModal}>
        <div className={modalContainerClasses}>
          <div className={modalImageContainerClasses}>
            <Image
              src={modalImage as StaticImport}
              alt="claim your basename today"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute right-6 top-6">
              <ModalClose setIsModalOpen={setIsModalOpen} />
            </div>
          </div>
          <div className={modalContentContainerClasses}>
            <h1 className="text-5xl font-normal leading-[56px]">
              Basenames
              <br />
              are here
            </h1>
            <div className="mb-2 mt-3 w-full px-4">
              <span className="font-sans leading-6">
                Connect with other Based builders and start building your unique onchain identity on
                Base with a .base.eth username.
              </span>
              <ButtonWithLinkAndEventLogging
                href="/names"
                eventName="get_a_basename"
                buttonClassNames={modalCtaClasses}
              >
                Get your basename
              </ButtonWithLinkAndEventLogging>
            </div>
          </div>
        </div>
      </HomepageModal>
    </AnalyticsProvider>
  );
}
