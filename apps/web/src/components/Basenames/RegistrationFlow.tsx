'use client';

import { Transition } from '@headlessui/react';
import { useAnalytics } from 'apps/web/contexts/Analytics';
import RegistrationBackground from 'apps/web/src/components/Basenames/RegistrationBackground';
import RegistrationBrand from 'apps/web/src/components/Basenames/RegistrationBrand';
import {
  RegistrationSteps,
  registrationTransitionDuration,
  useRegistration,
} from 'apps/web/src/components/Basenames/RegistrationContext';
import RegistrationForm from 'apps/web/src/components/Basenames/RegistrationForm';
import RegistrationProfileForm from 'apps/web/src/components/Basenames/RegistrationProfileForm';
import RegistrationSearchInput, {
  RegistrationSearchInputVariant,
} from 'apps/web/src/components/Basenames/RegistrationSearchInput';
import RegistrationSuccessMessage from 'apps/web/src/components/Basenames/RegistrationSuccessMessage';
import { UsernamePill, UsernamePillVariants } from 'apps/web/src/components/Basenames/UsernamePill';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { formatBaseEthDomain, USERNAME_DOMAINS } from 'apps/web/src/utils/usernames';
import classNames from 'classnames';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';
import { useAccount, useChains, useSwitchChain } from 'wagmi';
import { InformationCircleIcon } from '@heroicons/react/16/solid';
import Tooltip from 'apps/web/src/components/Tooltip';

const isEarlyAccess = process.env.NEXT_PUBLIC_USERNAMES_EARLY_ACCESS == 'true';

export const claimQueryKey = 'claim';

export function RegistrationFlow() {
  const { chain } = useAccount();
  const { logEventWithContext } = useAnalytics();
  const searchParams = useSearchParams();
  const { registrationStep, searchInputFocused, selectedName, setSelectedName } = useRegistration();
  const { basenameChain } = useBasenameChain();
  const { switchChain } = useSwitchChain();
  const chains = useChains();

  const isOnSupportedNetwork = useMemo(() => chain && chains.includes(chain), [chain, chains]);
  const switchToIntendedNetwork = useCallback(
    () => switchChain({ chainId: basenameChain.id }),
    [basenameChain.id, switchChain],
  );

  useEffect(() => {
    if (!chain || !switchToIntendedNetwork) {
      return;
    }

    if (!isOnSupportedNetwork) {
      switchToIntendedNetwork();
    }
  }, [isOnSupportedNetwork, chain, switchToIntendedNetwork]);

  const isSearch = registrationStep === RegistrationSteps.Search;
  const isClaim = registrationStep === RegistrationSteps.Claim;
  const isPending = registrationStep === RegistrationSteps.Pending;
  const isSuccess = registrationStep === RegistrationSteps.Success;
  const isProfile = registrationStep === RegistrationSteps.Profile;

  const layoutPadding = 'px-4 md:px-8';
  const absoluteLayoutPosition = 'top-[40vh] md:top-[50vh]';

  const mainClasses = classNames(
    'w-full relative min-h-screen pb-40',
    'transition-[padding]',
    layoutPadding,
    registrationTransitionDuration,
    {
      'pt-[calc(40vh-24px)] md:pt-[calc(50vh-24px)]': isSearch || isClaim || isPending || isSuccess,
      'delay-500': isSuccess || isProfile,
      'pt-32 md:pt-40': isProfile,
    },
  );

  const currentUsernamePillVariant = isProfile
    ? UsernamePillVariants.Card
    : UsernamePillVariants.Inline;

  useEffect(() => {
    logEventWithContext('initial_render', ActionType.render);
  }, [logEventWithContext]);

  useEffect(() => {
    const claimQuery = searchParams?.get(claimQueryKey);
    if (claimQuery) {
      setSelectedName(claimQuery.replace(`.${USERNAME_DOMAINS[basenameChain.id]}`, ''));
    }
  }, [basenameChain.id, searchParams, setSelectedName]);

  return (
    <main className={mainClasses}>
      {/* 1. Brand & Search */}
      <Transition
        appear
        show={isSearch}
        className={classNames(
          'absolute left-1/2 z-20 mx-auto w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 transform  transition-opacity',
          registrationTransitionDuration,
          absoluteLayoutPosition,
          {
            'text-white': searchInputFocused,
            'text-blue-600': searchInputFocused,
          },
        )}
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className={classNames('relative bottom-full w-full pb-4', layoutPadding)}>
          <RegistrationBrand />
        </div>
        <Transition
          appear
          show={isSearch}
          className={classNames(
            'mx-auto transition-[max-width] ',
            registrationTransitionDuration,
            layoutPadding,
          )}
          leaveFrom="max-w-full"
          leaveTo="max-w-0"
        >
          <RegistrationSearchInput
            variant={RegistrationSearchInputVariant.Large}
            placeholder="Search for a name"
          />
          {isEarlyAccess && (
            <div className="mx-auto mt-6 flex items-center justify-center">
              <p
                className={classNames({
                  'text-white': searchInputFocused,
                  'text-gray-40': !searchInputFocused,
                })}
              >
                You can claim one Basename per wallet for early access.
              </p>
              <Tooltip content="shrekislove.base.eth is already taken.">
                <InformationCircleIcon
                  width={12}
                  height={12}
                  className={classNames('ml-1', {
                    'fill-white': searchInputFocused,
                    'fill-gray-40': !searchInputFocused,
                  })}
                />
              </Tooltip>
            </div>
          )}
        </Transition>
      </Transition>
      {/* 2 - Username Pill */}
      <div className="relative flex w-full max-w-full flex-col items-center justify-center ">
        <Transition
          appear
          show={!isSearch}
          className={classNames(
            'relative z-40 transition-opacity',
            registrationTransitionDuration,
            {
              'w-full max-w-[26rem]': isProfile,
              'max-w-full': !isProfile,
            },
          )}
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {/* 2.1 - Small search input - positioned based on username pill, only for claim  */}
          <Transition
            appear
            show={isClaim}
            className={classNames(
              'absolute left-1/2 z-40 mx-auto w-full max-w-[14rem] -translate-x-1/2 -translate-y-20 transition-opacity',
              registrationTransitionDuration,
            )}
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <RegistrationSearchInput
              variant={RegistrationSearchInputVariant.Small}
              placeholder="Find another name"
            />
          </Transition>

          {/* 2.2 - The pill  */}
          <Transition
            appear
            show={!isSearch}
            className={classNames(
              'transition-[max-width, transform] mx-auto',
              registrationTransitionDuration,
              {
                'scale-90 animate-pulse': isPending,
              },
            )}
            enterFrom="max-w-0"
            enterTo="max-w-full"
          >
            <UsernamePill
              variant={currentUsernamePillVariant}
              username={formatBaseEthDomain(selectedName, basenameChain.id)}
            />
          </Transition>

          {/* 2.2 - Pending registration - positioned based on username pill, only visible when registration is pending*/}
          <Transition
            appear
            show={isPending}
            className={classNames(
              'absolute left-1/2 top-full mt-6 -translate-x-1/2 transform animate-pulse text-center transition-opacity ',
              registrationTransitionDuration,
            )}
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            {isPending && (
              <p className=" text-line text-center font-bold uppercase text-gray-60">
                Registering...
              </p>
            )}
          </Transition>
        </Transition>

        {/* 3. Registration Form */}
        <Transition
          appear
          show={isClaim}
          className={classNames(
            'relative z-40 transition-opacity',
            'mx-auto w-full max-w-[50rem]',
            registrationTransitionDuration,
          )}
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <RegistrationForm />
        </Transition>

        {/* 4. Registration Success Message */}
        <Transition
          appear
          show={isSuccess}
          className={classNames(
            'top-full z-40 pt-20 transition-opacity',
            'mx-auto w-full max-w-[50rem]',
            registrationTransitionDuration,
          )}
          enter={classNames('transition-opacity', registrationTransitionDuration)}
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave={classNames('transition-opacity', 'duration-200 absolute')}
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <RegistrationSuccessMessage />
        </Transition>
      </div>
      {/* 5. Registration: Edit Profile flow */}
      <Transition
        appear
        show={isProfile}
        className={classNames(
          'relative z-50  mx-auto mt-8 transition-opacity',
          'w-full max-w-[26rem]',
          registrationTransitionDuration,
        )}
        enter="delay-1000"
        enterFrom={classNames('opacity-0')}
        enterTo={classNames('opacity-100')}
        leave="transition-all "
        leaveFrom="opacity-100"
        leaveTo="opacity-0 "
      >
        <RegistrationProfileForm />
      </Transition>

      {/* Misc: Animated background for each steps */}
      <RegistrationBackground />
    </main>
  );
}

export default RegistrationFlow;
