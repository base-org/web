import { useAnalytics } from 'apps/web/contexts/Analytics';
import {
  RegistrationSteps,
  useRegistration,
} from 'apps/web/src/components/Basenames/RegistrationContext';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useCallback } from 'react';

export default function RegistrationSuccessMessage() {
  const { setRegistrationStep, redirectToProfile } = useRegistration();

  const { logEventWithContext } = useAnalytics();

  const customizeProfileOnClick = useCallback(() => {
    logEventWithContext('customize_profile', ActionType.click);
    setRegistrationStep(RegistrationSteps.Profile);
  }, [logEventWithContext, setRegistrationStep]);

  const goToProfileOnClick = useCallback(() => {
    logEventWithContext('go_to_profile', ActionType.click);
    redirectToProfile();
  }, [logEventWithContext, redirectToProfile]);

  return (
    <div className="items-left mx-auto flex w-full max-w-[65rem] flex-col justify-between gap-6 rounded-3xl border border-[#266EFF] bg-blue-600 p-10 shadow-xl transition-all duration-500 md:flex-row md:items-center">
      <h1 className="text-center text-3xl font-bold tracking-wider text-white md:text-left">
        Congrats!
        <br className="md:hidden" /> This name is yours!
      </h1>
      <div className="flex flex-col gap-4 md:flex-row">
        <Button rounded fullWidth onClick={customizeProfileOnClick}>
          Customize Profile
        </Button>
        <Button rounded fullWidth variant={ButtonVariants.Secondary} onClick={goToProfileOnClick}>
          Go to Profile
        </Button>
      </div>
    </div>
  );
}
