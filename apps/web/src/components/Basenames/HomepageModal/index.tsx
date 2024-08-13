'use client';

import { useCallback } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import Image from 'next/image';
import { StaticImport } from 'apps/web/node_modules/next/dist/shared/lib/get-img-props';
import AnalyticsProvider from '../../../../contexts/Analytics';
import { IS_EARLY_ACCESS } from 'apps/web/src/utils/usernames';
import HomepageModal from './HomepageModal';
import modalImage from './basenames-modal.svg';
import ModalClose from './ModalClose';
import ModalCta from './ModalCta';

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
  const [isModalOpen, setIsModalOpen] = useLocalStorage('BasenamesLaunchModalVisible', true);
  const SHOW_BANNER = !IS_EARLY_ACCESS;

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  if (!SHOW_BANNER || !isModalOpen) {
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
              <ModalCta buttonClassNames={modalCtaClasses} setIsModalOpen={setIsModalOpen} />
            </div>
          </div>
        </div>
      </HomepageModal>
    </AnalyticsProvider>
  );
}
