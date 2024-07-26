'use client';
import { Transition } from '@headlessui/react';
import { FloatingENSPills } from 'apps/web/src/components/Basenames/FloatingENSPills';
import {
  RegistrationSteps,
  registrationTransitionDuration,
  useRegistration,
} from 'apps/web/src/components/Basenames/RegistrationContext';
import tempPendingAnimation from 'apps/web/src/components/Basenames/tempPendingAnimation.png';
import classNames from 'classnames';

export default function RegistrationBackground() {
  const { registrationStep } = useRegistration();

  const isSearch = registrationStep === RegistrationSteps.Search;
  const isClaim = registrationStep === RegistrationSteps.Claim;
  const isPending = registrationStep === RegistrationSteps.Pending;
  const isSuccess = registrationStep === RegistrationSteps.Success;

  const claimBackgroundClasses = classNames(
    'pointer-events-none absolute inset-0 w-full h-full bg-cover bg-center -z-10',
  );

  const successBackgroundClasses = classNames(
    'pointer-events-none absolute inset-0 w-full h-full bg-cover bg-center -z-10 bg-blue-600',
  );

  return (
    <>
      <Transition
        appear
        show={isSearch}
        className={classNames('transition-opacity', registrationTransitionDuration)}
        enterFrom={classNames('opacity-0')}
        enterTo={classNames('opacity-100')}
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <FloatingENSPills />
      </Transition>
      <Transition
        appear
        show={isClaim || isPending}
        className={classNames('transition-opacity', registrationTransitionDuration)}
        enterFrom={classNames('opacity-0')}
        enterTo={classNames('opacity-100')}
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {/* TODO: Lottie animation file */}
        <div
          className={claimBackgroundClasses}
          style={{ backgroundImage: `url(${tempPendingAnimation.src})` }}
        />
      </Transition>

      <Transition
        appear
        show={isSuccess}
        className={classNames('transition-opacity', registrationTransitionDuration)}
        enterFrom={classNames('opacity-0')}
        enterTo={classNames('opacity-100')}
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {/* TODO: Lottie animation file */}
        <div className={successBackgroundClasses} />
      </Transition>
    </>
  );
}
