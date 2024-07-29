import { Transition } from '@headlessui/react';
import { FloatingENSPills } from 'apps/web/src/components/Basenames/FloatingENSPills';
import {
  RegistrationSteps,
  registrationTransitionDuration,
  useRegistration,
} from 'apps/web/src/components/Basenames/RegistrationContext';

import fireworks from './assets/fireworks.webm';
import globe from './assets/globe.webm';
import vortex from './assets/vortex.webm';

import classNames from 'classnames';

export default function RegistrationBackground() {
  const { registrationStep } = useRegistration();

  const isSearch = registrationStep === RegistrationSteps.Search;
  const isClaim = registrationStep === RegistrationSteps.Claim;
  const isPending = registrationStep === RegistrationSteps.Pending;
  const isSuccess = registrationStep === RegistrationSteps.Success;

  const grayVideoBackgroundClasses = classNames(
    'pointer-events-none absolute inset-0 w-full h-full -z-10 bg-[#F7F7F7]',
  );

  const blueVideoBackgroundClasses = classNames(
    'pointer-events-none absolute inset-0 w-full h-full -z-10 bg-[#025cfe]',
  );

  const videoClasses = classNames('absolute w-full h-full mt-[24px] object-cover');

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
        show={isClaim}
        className={classNames(
          'transition-opacity',
          registrationTransitionDuration,
          grayVideoBackgroundClasses,
        )}
        enterFrom={classNames('opacity-0')}
        enterTo={classNames('opacity-100')}
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {/* TODO: Lottie animation file */}

        <Transition
          appear
          show={isClaim}
          className={classNames(
            'transform-gpu transition-all',
            registrationTransitionDuration,
            videoClasses,
          )}
          enterFrom="scale-0"
          enterTo="scale-100"
        >
          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
          <video autoPlay className={videoClasses} loop>
            <source src={globe} type="video/webm" />
          </video>
        </Transition>
      </Transition>

      <Transition
        appear
        show={isPending}
        className={classNames(
          'transition-opacity',
          registrationTransitionDuration,
          grayVideoBackgroundClasses,
        )}
        enterFrom={classNames('opacity-0')}
        enterTo={classNames('opacity-100')}
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {/* TODO: Lottie animation file */}

        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video autoPlay className={videoClasses} loop>
          <source src={vortex} type="video/webm" />
        </video>
      </Transition>

      <Transition
        appear
        show={isSuccess}
        className={classNames(
          'transition-opacity',
          registrationTransitionDuration,
          blueVideoBackgroundClasses,
        )}
        enterFrom={classNames('opacity-0')}
        enterTo={classNames('opacity-100')}
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {/* TODO: Lottie animation file */}

        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
        <video autoPlay className={videoClasses} loop>
          <source src={fireworks} type="video/webm" />
        </video>
      </Transition>
    </>
  );
}
