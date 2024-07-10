import {
  RegistrationSteps,
  useRegistration,
} from 'apps/web/src/components/Basenames/RegistrationContext';
import ShareUsernameModal from 'apps/web/src/components/Basenames/ShareUsernameModal';
import { Button } from 'apps/web/src/components/Button/Button';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';

export default function RegistrationSuccessMessage() {
  const { setRegistrationStep, selectedName } = useRegistration();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const customizeProfileOnClick = useCallback(() => {
    setRegistrationStep(RegistrationSteps.Profile);
  }, [setRegistrationStep]);

  return (
    <>
      <div className="mx-auto flex w-full max-w-[50rem] items-center justify-between rounded-3xl border border-[#266EFF] bg-blue-600 p-10 shadow-xl transition-all duration-500">
        <h1 className="text-3xl font-bold tracking-wider text-white">
          Congrats! This name is yours!
        </h1>
        <Button rounded onClick={customizeProfileOnClick}>
          Customize Profile
        </Button>
      </div>
      <ShareUsernameModal selectedName={selectedName} isOpen={isOpen} toggleModal={closeModal} />
      <p className="mt-6 text-center">
        <Link
          href="#share"
          className="font-bold uppercase tracking-wider text-white underline underline-offset-4"
          onClick={openModal}
        >
          Share your name on socials
        </Link>
      </p>
    </>
  );
}
