import { Transition } from '@headlessui/react';
import { CoinbaseProofResponse } from 'apps/web/pages/api/proofs/coinbase';
import RegistrarControllerABI from 'apps/web/src/abis/RegistrarControllerABI.json';
import { USERNAME_REGISTRAR_CONTROLLER_ADDRESS } from 'apps/web/src/addresses/usernames';
import { FloatingENSPills } from 'apps/web/src/components/Basenames/FloatingENSPills';
import { RegistrationContext } from 'apps/web/src/components/Basenames/RegistrationContext';
import { RegistrationForm } from 'apps/web/src/components/Basenames/RegistrationForm';
import { UsernamePill } from 'apps/web/src/components/Basenames/UsernamePill';
import {
  UsernameSearchInput,
  UsernameSearchInputVariant,
} from 'apps/web/src/components/Basenames/UsernameSearchInput';
import tempPendingAnimation from 'apps/web/src/components/Basenames/tempPendingAnimation.png';
import { ProofTableNamespace } from 'apps/web/src/utils/proofs';
import classNames from 'classnames';
import Head from 'next/head';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import { Address } from 'viem';
import { base, baseSepolia } from 'viem/chains';
import { useAccount, useReadContract } from 'wagmi';
import { LearnMoreModal } from '../src/components/Basenames/LearnMoreModal';
import {
  useCheckCBIDAttestations,
  useCheckCoinbaseAttestations,
} from 'apps/web/src/utils/hooks/useAttestations';
// TODO: replace appropriate backgrounds w/Lottie files

export enum ClaimProgression {
  SEARCH,
  CLAIM,
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

enum Discount {
  NONE = 0,
  ALREADY_REDEEMED = 1 << 0, // 1
  CB1 = 1 << 1, // 2
  COINBASE_VERIFIED_ACCOUNT = 1 << 2, // 4
  CBID = 1 << 3, // 8
}

/*
test addresses w/ different verifications
  0xB18e4C959bccc8EF86D78DC297fb5efA99550d85 - cb.id 
  0xB18e4C959bccc8EF86D78DC297fb5efA99550d85, 0xB6944B3074F40959E1166fe010a3F86B02cF2b7c- verified account
  0x9C02E8E28D8b706F67dcf0FC7F46A9ee1f9649FA - cb1
*/

export default function Usernames() {
  const { chainId } = useAccount();
  const [discount, setDiscount] = useState<number>(Discount.NONE);
  const addDiscount = useCallback((d: Discount) => setDiscount((prev) => prev | d), []);
  const hasDiscount = useCallback((d: Discount) => (discount & d) !== 0, [discount]);

  const { data: CBIDData, loading: loadingCBIDAttestations } = useCheckCBIDAttestations();
  console.log('useCheckCBIDAttestations data: ', CBIDData);
  const { data: coinbaseData, loading: loadingCoinbaseAttestations } =
    useCheckCoinbaseAttestations();
  const loadingDiscounts = loadingCoinbaseAttestations || loadingCBIDAttestations;

  const network = chainId === baseSepolia.id ? chainId : base.id;
  const linkedAddresses = coinbaseData?.result.linkedAddresses;
  // const coinbaseSignedMessage = coinbaseData?.result.signedMessage;
  // const coinbaseAttestations = coinbaseData?.result.attestations;
  const hasRegisteredArgs = useMemo(
    () => ({
      address: USERNAME_REGISTRAR_CONTROLLER_ADDRESS[network],
      abi: RegistrarControllerABI,
      functionName: 'hasRegisteredWithDiscount',
      args: [linkedAddresses],
      chainId: network,
    }),
    [network, linkedAddresses],
  );
  const { data: hasAlreadyUsedADiscount } = useReadContract(hasRegisteredArgs);
  if (hasAlreadyUsedADiscount && !hasDiscount(Discount.ALREADY_REDEEMED)) {
    addDiscount(Discount.ALREADY_REDEEMED);
  }

  const [progress, setProgress] = useState<ClaimProgression>(ClaimProgression.SEARCH);
  const [learnMoreModalOpen, setLearnMoreModalOpen] = useState(false);
  const toggleModal = useCallback(() => setLearnMoreModalOpen((open) => !open), []);

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

  const transitionDuration = 'duration-500';

  // the 96px here accounts for the header height
  const mainClasses = classNames(
    'relative z-10 flex min-h-[calc(100vh-96px)] w-full flex-col items-center pb-32 pt-32 px-6',
    'transition-all',
    transitionDuration,
    {
      'bg-ocsblue text-white': inputFocused,
      'bg-white text-black': !inputFocused,
    },
  );

  const claimBackgroundClasses = classNames(
    'pointer-events-none absolute inset-0 w-full h-full bg-cover bg-center -z-10',
  );

  const registrationValue = useMemo(
    () => ({ focused: inputFocused, hovered: inputHovered }),
    [inputFocused, inputHovered],
  );

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
            show={progress === ClaimProgression.SEARCH}
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
            show={progress === ClaimProgression.CLAIM}
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
              show={progress === ClaimProgression.SEARCH}
              className={classNames(
                'absolute flex w-full items-center justify-between transition-opacity',
                transitionDuration,
              )}
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="flex items-center">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-1"
                >
                  <circle
                    cx="7.5"
                    cy="7.5"
                    r="7.5"
                    className={inputFocused ? 'fill-white' : 'fill-ocsblue'}
                  />
                </svg>
                <h1 className="text-xl">Basenames</h1>
              </div>

              {SEARCH_LABEL_COPY_STRINGS.map((string) => (
                <Transition
                  as={Fragment}
                  key={string}
                  show={rotatingText === string}
                  enter={classNames('transform transition', transitionDuration)}
                  enterFrom="opacity-0 -translate-y-4"
                  enterTo="opacity-100 translate-y-0"
                  leave={classNames('transform transition', transitionDuration)}
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-4"
                >
                  <p className="absolute right-0">{string}</p>
                </Transition>
              ))}
            </Transition>
          </div>
          <div className="relative w-full">
            <Transition
              appear
              show={progress === ClaimProgression.CLAIM}
              className={classNames(
                'absolute left-1/2 top-0 z-30 mx-auto w-full max-w-[15rem] -translate-x-1/2 -translate-y-12 transform transition-all',
                transitionDuration,
              )}
              enterFrom={classNames('opacity-0 translate-y-0')}
              enterTo={classNames('opacity-100')}
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
                show={progress === ClaimProgression.CLAIM}
                className={classNames(
                  'absolute left-1/2 top-0 z-20 mx-auto -translate-x-1/2 transition-all',
                  transitionDuration,
                )}
                enter="overflow-hidden"
                enterFrom={classNames('opacity-0 max-w-[5rem]')}
                enterTo={classNames('opacity-100 max-w-full')}
                leave="transition-all "
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <UsernamePill username={selectedName} />
              </Transition>
              <Transition
                appear
                show={progress === ClaimProgression.SEARCH}
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
              show={progress === ClaimProgression.CLAIM}
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
                toggleModal={toggleModal}
              />
            </Transition>
          </div>
          {<LearnMoreModal learnMoreModalOpen={learnMoreModalOpen} toggleModal={toggleModal} />}
        </main>
      </RegistrationContext.Provider>
    </>
  );
}
