import { Transition } from '@headlessui/react';
import { FloatingENSPills } from 'apps/web/src/components/Basenames/FloatingENSPills';
import { LearnMoreModal } from 'apps/web/src/components/Basenames/LearnMoreModal';
import { RegistrationContext } from 'apps/web/src/components/Basenames/RegistrationContext';
import { RegistrationForm } from 'apps/web/src/components/Basenames/RegistrationForm';
import ShareUsernameModal from 'apps/web/src/components/Basenames/ShareUsernameModal';
import { UsernamePill, UsernamePillVariants } from 'apps/web/src/components/Basenames/UsernamePill';
import { UsernameProfileForm } from 'apps/web/src/components/Basenames/UsernameProfileForm';
import {
  UsernameSearchInput,
  UsernameSearchInputVariant,
} from 'apps/web/src/components/Basenames/UsernameSearchInput';
import tempPendingAnimation from 'apps/web/src/components/Basenames/tempPendingAnimation.png';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { Layout, NavigationType } from 'apps/web/src/components/Layout/Layout';
import { useAggregatedDiscountValidators } from 'apps/web/src/utils/hooks/useAggregatedDiscountValidators';
import classNames from 'classnames';
import Head from 'next/head';
import { Fragment, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { useInterval } from 'usehooks-ts';
// TODO: replace appropriate backgrounds w/Lottie files

export enum ClaimProgression {
  SEARCH,
  CLAIM,
  PROFILE,
}

const SEARCH_LABEL_COPY_STRINGS = [
  'Set up a community profile.',
  'Connect with Based people.',
  'Get exclusive onchain perks.',
];

const useRotatingText = (strings: string[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  useInterval(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % strings.length);
  }, 3000);
  return strings[currentIndex];
};

/* eslint-disable @typescript-eslint/prefer-literal-enum-member */
export enum Discount {
  NONE = 0,
  ALREADY_REDEEMED = 1 << 0, // 1
  CB1 = 1 << 1, // 2
  COINBASE_VERIFIED_ACCOUNT = 1 << 2, // 4
  CBID = 1 << 3, // 8
}
/* eslint-enable @typescript-eslint/prefer-literal-enum-member */

/*
test addresses w/ different verifications
  0xB18e4C959bccc8EF86D78DC297fb5efA99550d85 - cb.id 
  0xB18e4C959bccc8EF86D78DC297fb5efA99550d85, 0xB6944B3074F40959E1166fe010a3F86B02cF2b7c- verified account
  0x9C02E8E28D8b706F67dcf0FC7F46A9ee1f9649FA - cb1
*/

export function Usernames() {
  const [discount, setDiscount] = useState<number>(Discount.NONE);
  const addDiscount = useCallback((d: Discount) => setDiscount((prev) => prev | d), []);
  const hasDiscount = useCallback((d: Discount) => (discount & d) !== 0, [discount]);
  const { loading: loadingDiscounts, hasUsedADiscount } = useAggregatedDiscountValidators();

  if (hasUsedADiscount && !hasDiscount(Discount.ALREADY_REDEEMED)) {
    addDiscount(Discount.ALREADY_REDEEMED);
  }

  const [progress, setProgress] = useState<ClaimProgression>(ClaimProgression.SEARCH);
  const [learnMoreModalOpen, setLearnMoreModalOpen] = useState(false);
  const toggleLearnMoreModal = useCallback(() => setLearnMoreModalOpen((open) => !open), []);
  const [shareUsernameModalOpen, setShareUsernameModalOpen] = useState(false);
  const toggleShareUsernameModal = useCallback(
    () => setShareUsernameModalOpen((open) => !open),
    [],
  );

  const [inputFocused, setInputFocused] = useState(false);
  const [inputHovered, setInputHovered] = useState(false);
  const [selectedName, setSelectedName] = useState('');

  const onFocusLargeUsernameSearchInput = useCallback(() => setInputFocused(true), []);
  const onBlurLargeUsernameSearchInput = useCallback(() => setInputFocused(false), []);
  const onMouseEnterLargeUsernameSearchInput = useCallback(() => setInputHovered(true), []);
  const onMouseLeaveLargeUsernameSearchInput = useCallback(() => setInputHovered(false), []);

  const selectName = useCallback((name: string) => {
    setProgress(ClaimProgression.CLAIM);
    setInputFocused(false);
    setSelectedName(name);
  }, []);

  const rotatingText = useRotatingText(SEARCH_LABEL_COPY_STRINGS);

  const isSearch = progress === ClaimProgression.SEARCH;
  const isClaim = progress === ClaimProgression.CLAIM;
  const isProfile = progress === ClaimProgression.PROFILE;

  const transitionDuration = 'duration-700';

  const mainClasses = classNames(
    'relative z-10 flex min-h-screen w-full overflow-hidden flex-col items-center  px-6',
    'transition-all',
    transitionDuration,
    {
      'bg-ocsblue text-white': inputFocused,
      'bg-white text-black': !inputFocused,
      'pt-[calc(50vh-15rem)]': isSearch || isClaim,
      'pt-0': isProfile,
    },
  );

  const claimBackgroundClasses = classNames(
    'pointer-events-none absolute inset-0 w-full h-full bg-cover bg-center -z-10',
  );

  const registrationValue = useMemo(
    () => ({ focused: inputFocused, hovered: inputHovered }),
    [inputFocused, inputHovered],
  );

  const [currentUsernamePillVariant, setCurrentUsernamePillVariant] =
    useState<UsernamePillVariants>(UsernamePillVariants.Inline);

  useEffect(() => {
    if (progress === ClaimProgression.PROFILE) {
      setCurrentUsernamePillVariant(UsernamePillVariants.Card);
    }
  }, [progress]);

  return (
    <>
      <Head>
        <title>Base | names</title>
        <meta
          content="Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain."
          name="description"
        />
      </Head>
      <RegistrationContext.Provider value={registrationValue}>
        <main className={mainClasses}>
          <Transition
            appear
            show={isSearch}
            className={classNames('transition-opacity', transitionDuration)}
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
            className={classNames('transition-opacity', transitionDuration)}
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
          <div className="relative mx-auto mb-12 mt-24 w-full max-w-[36rem]">
            <Transition
              appear
              show={isSearch}
              className={classNames(
                'absolute flex w-full items-center justify-between transition-opacity',
                transitionDuration,
              )}
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="flex items-center gap-1">
                <Icon name="blueCircle" color="currentColor" width={15} height={15} />
                <h1 className="text-md font-bold md:text-xl">Basenames</h1>
              </div>

              {SEARCH_LABEL_COPY_STRINGS.map((string) => (
                <Transition
                  as={Fragment}
                  key={string}
                  show={rotatingText === string}
                  enter={classNames('transform transition delay-500', transitionDuration)}
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave={classNames('transform transition', transitionDuration)}
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <p className="text-md absolute right-0 md:text-xl ">{string}</p>
                </Transition>
              ))}
            </Transition>
          </div>
          <div className="relative w-full">
            <Transition
              appear
              show={isClaim}
              className={classNames(
                'absolute left-1/2 z-40 mx-auto w-full max-w-[14rem] -translate-x-1/2 -translate-y-20 transition-all',
                transitionDuration,
              )}
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <UsernameSearchInput
                variant={UsernameSearchInputVariant.Small}
                placeholder="Find another name"
                selectName={selectName}
              />
            </Transition>
            <div className="relative mb-40">
              <Transition
                appear
                show={isClaim || isProfile}
                className={classNames(
                  'absolute left-1/2 top-0 z-30 mx-auto -translate-x-1/2 transition-all',
                  transitionDuration,
                )}
                enter="overflow-hidden"
                enterFrom={classNames('opacity-0 max-w-[5rem]')}
                enterTo={classNames('opacity-100 max-w-full')}
                leave="transition-all "
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <UsernamePill username={selectedName} variant={currentUsernamePillVariant} />
              </Transition>

              <Transition
                appear
                show={isProfile}
                className={classNames(
                  'absolute left-1/2 top-0 z-30 mx-auto -translate-x-1/2 transition-all',
                  transitionDuration,
                )}
                enter="overflow-hidden"
                enterFrom={classNames('opacity-0 max-w-[5rem]')}
                enterTo={classNames('opacity-100 max-w-full')}
                leave="transition-all "
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="mt-[16rem] w-full">
                  <UsernameProfileForm />
                </div>
              </Transition>
              <Transition
                appear
                show={isSearch}
                className={classNames(
                  'absolute left-1/2 top-0 z-20 mx-auto w-full max-w-[36rem] -translate-x-1/2 transition-all',
                  transitionDuration,
                )}
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0 max-w-[5rem]"
              >
                <UsernameSearchInput
                  variant={UsernameSearchInputVariant.Large}
                  placeholder="Search for a name"
                  selectName={selectName}
                  onFocus={onFocusLargeUsernameSearchInput}
                  onBlur={onBlurLargeUsernameSearchInput}
                  onMouseEnter={onMouseEnterLargeUsernameSearchInput}
                  onMouseLeave={onMouseLeaveLargeUsernameSearchInput}
                />
              </Transition>
            </div>
            <Transition
              appear
              show={isClaim}
              enter={classNames('transition-opacity', transitionDuration)}
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave={classNames('transition-opacity', transitionDuration)}
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <RegistrationForm
                name={selectedName}
                loadingDiscounts={loadingDiscounts}
                discount={discount}
                hasDiscount={hasDiscount}
                toggleModal={toggleLearnMoreModal}
              />
            </Transition>
          </div>
          <LearnMoreModal
            learnMoreModalOpen={learnMoreModalOpen}
            toggleModal={toggleLearnMoreModal}
          />
          <ShareUsernameModal
            isOpen={shareUsernameModalOpen}
            username="ultrabased"
            toggleModal={toggleShareUsernameModal}
          />
        </main>
      </RegistrationContext.Provider>
    </>
  );
}

Usernames.getLayout = function getLayout(page: ReactElement) {
  return <Layout navigationType={NavigationType.Username}>{page}</Layout>;
};

export default Usernames;
