import { useAnalytics } from 'apps/web/contexts/Analytics';
import {
  RegistrationSteps,
  useRegistration,
} from 'apps/web/src/components/Basenames/RegistrationContext';
import ShareUsernameModal from 'apps/web/src/components/Basenames/ShareUsernameModal';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';

export default function RegistrationSuccessMessage() {
  const { setRegistrationStep, selectedName, redirectToProfile } = useRegistration();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { logEventWithContext } = useAnalytics();
  const openModal = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      logEventWithContext('open_share_on_social_modal', ActionType.click);
      setIsOpen(true);
    },
    [logEventWithContext],
  );

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const customizeProfileOnClick = useCallback(() => {
    logEventWithContext('customize_profile', ActionType.click);
    setRegistrationStep(RegistrationSteps.Profile);
  }, [logEventWithContext, setRegistrationStep]);

  const goToProfileOnClick = useCallback(() => {
    logEventWithContext('go_to_profile', ActionType.click);
    redirectToProfile();
  }, [logEventWithContext, redirectToProfile]);

  return (
    <>
      <div className="items-left mx-auto flex w-full max-w-[50rem] flex-col justify-between gap-6 rounded-3xl border border-[#266EFF] bg-blue-600 p-10 shadow-xl transition-all duration-500 md:flex-row md:items-center">
        <h1 className="text-3xl font-bold tracking-wider text-white">
          Congrats! This name is yours!
        </h1>
        <div className="flex flex-col gap-4 md:flex-row">
          <Button rounded fullWidth variant={ButtonVariants.Secondary} onClick={goToProfileOnClick}>
            Go to Profile
          </Button>

          <Button rounded fullWidth onClick={customizeProfileOnClick}>
            Customize Profile
          </Button>
        </div>
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
