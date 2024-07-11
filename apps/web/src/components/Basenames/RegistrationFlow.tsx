import { Transition } from '@headlessui/react';
import { LearnMoreModal } from 'apps/web/src/components/Basenames/LearnMoreModal';
import RegistrationBackground from 'apps/web/src/components/Basenames/RegistrationBackground';
import RegistrationBrand from 'apps/web/src/components/Basenames/RegistrationBrand';
import {
  RegistrationSteps,
  registrationTransitionDuration,
  useRegistration,
} from 'apps/web/src/components/Basenames/RegistrationContext';
import { RegistrationForm } from 'apps/web/src/components/Basenames/RegistrationForm';
import RegistrationProfileForm from 'apps/web/src/components/Basenames/RegistrationProfileForm';
import RegistrationSuccessMessage from 'apps/web/src/components/Basenames/RegistrationSuccessMessage';
import { UsernamePill, UsernamePillVariants } from 'apps/web/src/components/Basenames/UsernamePill';
import UsernameSearchInput, {
  UsernameSearchInputVariant,
} from 'apps/web/src/components/Basenames/UsernameSearchInput';
import {
  findFirstValidDiscount,
  useAggregatedDiscountValidators,
} from 'apps/web/src/hooks/useAggregatedDiscountValidators';
import { formatBaseEthDomain } from 'apps/web/src/utils/usernames';
import classNames from 'classnames';
import { useCallback, useMemo, useState } from 'react';

export enum Discount {
  CBID = 'CBID',
  CB1 = 'CB1',
  COINBASE_VERIFIED_ACCOUNT = 'COINBASE_VERIFIED_ACCOUNT',
}

function isValidDiscount(key: string): key is keyof typeof Discount {
  return Object.values(Discount).includes(key as Discount);
}

/*
test addresses w/ different verifications
  0xB18e4C959bccc8EF86D78DC297fb5efA99550d85 - cb.id 
  0xB18e4C959bccc8EF86D78DC297fb5efA99550d85, 0xB6944B3074F40959E1166fe010a3F86B02cF2b7c- verified account
  0x9C02E8E28D8b706F67dcf0FC7F46A9ee1f9649FA - cb1
*/

export function RegistrationFlow() {
  const { data: discounts, loading: loadingDiscounts } = useAggregatedDiscountValidators();
  const discount = findFirstValidDiscount(discounts);

  const allActiveDiscounts = useMemo(
    () =>
      new Set(
        Object.keys(discounts)
          .filter(isValidDiscount)
          .map((key) => Discount[key]),
      ),
    [discounts],
  );

  const { registrationStep, setRegistrationStep, searchInputFocused, selectedName } =
    useRegistration();

  const [learnMoreModalOpen, setLearnMoreModalOpen] = useState(false);
  const toggleLearnMoreModal = useCallback(() => setLearnMoreModalOpen((open) => !open), []);

  const isSearch = registrationStep === RegistrationSteps.Search;
  const isClaim = registrationStep === RegistrationSteps.Claim;
  const isPending = registrationStep === RegistrationSteps.Pending;
  const isSuccess = registrationStep === RegistrationSteps.Success;
  const isProfile = registrationStep === RegistrationSteps.Profile;

  const mainClasses = classNames(
    'relative z-10 flex min-h-screen w-full overflow-hidden flex-col items-center px-6 pb-40',
    'transition-all',
    registrationTransitionDuration,
    {
      'pt-[calc(50vh-12rem)]': isSearch || isClaim || isPending || isSuccess,
      'pt-0': isProfile,
    },
  );

  const currentUsernamePillVariant = isProfile
    ? UsernamePillVariants.Card
    : UsernamePillVariants.Inline;

  return (
    <main className={mainClasses}>
      {/* TODO: REMOVE ME WHEN DONE TESTING */}
      <div className="absolute right-20 top-40 z-50 w-[10rem] rounded-lg border border-gray-40/20 bg-white p-4 text-black shadow-lg">
        <ul className="flex flex-col gap-2">
          <li>
            <button
              type="button"
              // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
              onClick={() => setRegistrationStep(RegistrationSteps.Search)}
              className="rounded border border-gray-40/20 p-2"
            >
              Search
            </button>
          </li>
          <li>
            <button
              type="button"
              // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
              onClick={() => setRegistrationStep(RegistrationSteps.Claim)}
              className="rounded border border-gray-40/20 p-2"
            >
              Claim
            </button>
          </li>
          <li>
            <button
              type="button"
              // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
              onClick={() => setRegistrationStep(RegistrationSteps.Pending)}
              className="rounded border border-gray-40/20 p-2"
            >
              Pending
            </button>
          </li>
          <li>
            <button
              type="button"
              // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
              onClick={() => setRegistrationStep(RegistrationSteps.Success)}
              className="rounded border border-gray-40/20 p-2"
            >
              Success
            </button>
          </li>
          <li>
            <button
              type="button"
              // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
              onClick={() => setRegistrationStep(RegistrationSteps.Profile)}
              className="rounded border border-gray-40/20 p-2"
            >
              Profile
            </button>
          </li>
        </ul>
      </div>

      <RegistrationBackground />

      {/* TODO: Move this to a component */}
      <div className="relative mx-auto mb-12 mt-24 w-full max-w-[36rem]">
        <Transition
          appear
          show={isSearch}
          className={classNames(
            'absolute flex w-full items-center justify-between transition-all',
            registrationTransitionDuration,
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
          <RegistrationBrand />
        </Transition>
      </div>
      <div className="relative w-full">
        <Transition
          appear
          show={isClaim}
          className={classNames(
            'absolute left-1/2 z-40 mx-auto w-full max-w-[14rem] -translate-x-1/2 -translate-y-20 transition-all',
            registrationTransitionDuration,
          )}
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <UsernameSearchInput
            variant={UsernameSearchInputVariant.Small}
            placeholder="Find another name"
          />
        </Transition>
        <div className="relative mb-40">
          <div>
            <Transition
              appear
              show={!isSearch}
              className={classNames(
                'absolute left-1/2 top-0 z-30 mx-auto -translate-x-1/2 transition-all ',
                registrationTransitionDuration,
                { 'animate-pulse': isPending },
                { 'scale-95': isPending },
                { 'scale-105 ': isSuccess },
                { 'max-w-full': !isProfile },
                { 'w-[26rem]': isProfile },
              )}
              enter="overflow-hidden"
              enterFrom={classNames('opacity-0 max-w-[5rem]')}
              enterTo={classNames('opacity-100 max-w-full')}
              leave="transition-all "
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <UsernamePill
                variant={currentUsernamePillVariant}
                username={formatBaseEthDomain(selectedName)}
              />
              {isPending && (
                <p className="text-line mt-6 text-center font-bold uppercase text-gray-60">
                  Registering...
                </p>
              )}
            </Transition>
            <Transition
              appear
              show={isProfile}
              className={classNames(
                'absolute left-1/2 top-0 z-30 mx-auto -translate-x-1/2 transition-all',
                'mt-[16rem] w-[26rem] rounded-3xl p-8 shadow-xl',
                registrationTransitionDuration,
              )}
              enterFrom={classNames('opacity-0')}
              enterTo={classNames('opacity-100')}
              leave="transition-all "
              leaveFrom="opacity-100"
              leaveTo="opacity-0 "
            >
              <RegistrationProfileForm />
            </Transition>
          </div>
          <Transition
            appear
            show={isSearch}
            className={classNames(
              'absolute left-1/2 top-0 z-20 mx-auto w-full max-w-[36rem] -translate-x-1/2 transition-all',
              registrationTransitionDuration,
            )}
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0 max-w-[5rem]"
          >
            <UsernameSearchInput
              variant={UsernameSearchInputVariant.Large}
              placeholder="Search for a name"
            />
          </Transition>
        </div>
        <Transition
          appear
          show={isClaim}
          enter={classNames('transition-opacity', registrationTransitionDuration)}
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave={classNames('transition-opacity', registrationTransitionDuration)}
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <RegistrationForm
            loadingDiscounts={loadingDiscounts}
            discount={discount}
            toggleModal={toggleLearnMoreModal}
          />
        </Transition>
        <Transition
          appear
          show={isSuccess}
          enter={classNames('transition-opacity', registrationTransitionDuration)}
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave={classNames('transition-opacity', registrationTransitionDuration)}
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <RegistrationSuccessMessage />
        </Transition>
      </div>
      <LearnMoreModal
        discounts={allActiveDiscounts}
        learnMoreModalOpen={learnMoreModalOpen}
        toggleModal={toggleLearnMoreModal}
      />
    </main>
  );
}

export default RegistrationFlow;
