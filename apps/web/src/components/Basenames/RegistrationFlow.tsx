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
    'relative z-10 flex min-h-screen w-full flex-col items-center',
    'transition-all pb-20',
    registrationTransitionDuration,
    {
      // TODO Bad Math
      'pt-[calc(47vh)]': !isProfile,
      'pt-[8rem]': isProfile,
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

      {/* 1. Brand & Search */}
      <Transition
        appear
        show={isSearch}
        className={classNames(
          'absolute top-1/2 z-20 mx-auto w-full max-w-2xl -translate-y-1/2 transform px-8 transition-opacity',
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
        <div className="mb-4">
          <RegistrationBrand />
        </div>
        <UsernameSearchInput
          variant={UsernameSearchInputVariant.Large}
          placeholder="Search for a name"
        />
      </Transition>

      {/* 2 - Username Pill  */}
      <div className="relative flex w-full max-w-full max-w-full flex-col items-center justify-center px-8">
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
            <UsernameSearchInput
              variant={UsernameSearchInputVariant.Small}
              placeholder="Find another name"
            />
          </Transition>

          {/* 2.2 - The pill  */}
          <UsernamePill
            variant={currentUsernamePillVariant}
            username={formatBaseEthDomain(selectedName)}
          />

          {/* 2.2 - Pending registration - positioned based on username pill, only visible when registration is pending*/}
          <Transition
            appear
            show={isPending}
            className={classNames(
              'absolute left-1/2 top-full mt-6 -translate-x-1/2 transform text-center transition-opacity ',
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
            'relative z-40 mt-20 transition-opacity',
            'mx-auto w-full max-w-[50rem]',
            registrationTransitionDuration,
          )}
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <RegistrationForm
            loadingDiscounts={loadingDiscounts}
            discount={discount}
            toggleModal={toggleLearnMoreModal}
          />
        </Transition>

        {/* 4. Registration Success Message */}
        <Transition
          appear
          show={isSuccess}
          className={classNames(
            'top-full z-40 pt-20 transition-opacity',
            'absolute mx-auto w-full max-w-[50rem]',
            registrationTransitionDuration,
          )}
          enter={classNames('transition-opacity', registrationTransitionDuration)}
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave={classNames('transition-opacity', 'duration-200')}
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
        enter="delay-700"
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

      {/* Misc: Learn more about validation modal */}

      <LearnMoreModal
        discounts={allActiveDiscounts}
        learnMoreModalOpen={learnMoreModalOpen}
        toggleModal={toggleLearnMoreModal}
      />
    </main>
  );
}

export default RegistrationFlow;
