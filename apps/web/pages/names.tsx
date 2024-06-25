import { Transition } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/20/solid';
import { FloatingENSPills } from 'apps/web/src/components/Basenames/FloatingENSPills';
import { RegistrationContext } from 'apps/web/src/components/Basenames/RegistrationContext';
import { RegistrationForm } from 'apps/web/src/components/Basenames/RegistrationForm';
import { UsernamePill } from 'apps/web/src/components/Basenames/UsernamePill';
import {
  UsernameSearchInput,
  UsernameSearchInputVariant,
} from 'apps/web/src/components/Basenames/UsernameSearchInput';
import tempPendingAnimation from 'apps/web/src/components/Basenames/tempPendingAnimation.png';
import Modal from 'apps/web/src/components/Modal';
import Tooltip from 'apps/web/src/components/Tooltip';
import { ProofTableNamespace } from 'apps/web/src/utils/proofs';
import classNames from 'classnames';
import Head from 'next/head';
import Image from 'next/image';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import { useAccount } from 'wagmi';
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
  NONE,
  CB1,
  COINBASE,
  CBID,
}

/*
test addresses w/ different verifications
  0xB18e4C959bccc8EF86D78DC297fb5efA99550d85 - cb.id 
  0xB18e4C959bccc8EF86D78DC297fb5efA99550d85, 0xB6944B3074F40959E1166fe010a3F86B02cF2b7c- verified account
  0x9C02E8E28D8b706F67dcf0FC7F46A9ee1f9649FA - cb1
*/

export default function Usernames() {
  // const { address } = useAccount();
  const address = '0xB6944B3074F40959E1166fe010a3F86B02cF2b7c';
  const [discount, setDiscount] = useState(Discount.NONE);
  const [loadingDiscounts, setLoadingDiscounts] = useState(false);
  useEffect(() => {
    async function checkAttestations() {
      try {
        setLoadingDiscounts(true);
        const promises = [
          fetch(
            `/api/proofs/cbid?address=${address}&namespace=${ProofTableNamespace.Usernames}`,
          ).then(async (res) => res.json()),
          fetch(`/api/proofs/coinbase?address=${address}`).then(async (res) => res.json()),
        ];
        const data = await Promise.all(promises);
        console.log('jf data', data);
      } catch (e) {
        console.error('jf', e);
      } finally {
        setLoadingDiscounts(false);
      }
    }
    if (address) {
      checkAttestations();
    }
  }, [address]);

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
          <div className="relative mx-auto mb-12 mt-24 w-full w-full max-w-[36rem]">
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
                'absolute left-1/2 top-0 z-10 z-30 mx-auto w-full max-w-[15rem] -translate-x-1/2 -translate-y-12 transform transition-all',
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
                  'absolute left-1/2 top-0 z-20 z-20 mx-auto -translate-x-1/2 transition-all',
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
                  'absolute left-1/2 top-0 z-10 z-20 z-20 mx-auto mx-auto w-full max-w-[36rem] -translate-x-1/2 transition-all',
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
                loadingDiscounts={true || loadingDiscounts}
                toggleModal={toggleModal}
              />
            </Transition>
          </div>
          <Modal isOpen={learnMoreModalOpen} onClose={toggleModal} title="Qualify for a free name">
            <p className="mb-6 text-illoblack">
              You will receive your name for free if you connect to a wallet that has{' '}
              <strong>one of the following</strong>
            </p>
            <ul className="mb-5 flex flex-col gap-3 self-start">
              <li className="flex flex-row items-center justify-start">
                <Image
                  src="/images/usernames/coinbase-verification.svg"
                  alt="criteria icon"
                  width={30}
                  height={30}
                  className="mr-3"
                />
                A Coinbase account verification{' '}
                <Tooltip content="Verifies you have a valid trading account on Coinbase">
                  <InformationCircleIcon
                    width={12}
                    height={12}
                    className="ml-1 fill-[#89909E] transition-colors hover:fill-darkgray"
                  />
                </Tooltip>
              </li>
              <li className="flex flex-row items-center justify-start">
                <Image
                  src="/images/usernames/coinbase-one-verification.svg"
                  alt="criteria icon"
                  width={30}
                  height={30}
                  className="mr-3"
                />
                A Coinbase One subscription verification{' '}
                <Tooltip content="Verifies you have an active Coinbase One subscription">
                  <InformationCircleIcon
                    width={12}
                    height={12}
                    className="ml-1 fill-[#89909E] transition-colors hover:fill-darkgray"
                  />
                </Tooltip>
              </li>
              <li className="flex flex-row items-center justify-start">
                <Image
                  src="/images/usernames/cbid-verification.svg"
                  alt="criteria icon"
                  width={30}
                  height={30}
                  className="mr-3"
                />
                A CB.ID username{' '}
                <Tooltip content="cb.id claimed prior to cutoff date">
                  <InformationCircleIcon
                    width={12}
                    height={12}
                    className="ml-1 fill-[#89909E] transition-colors hover:fill-darkgray"
                  />
                </Tooltip>
              </li>
            </ul>
          </Modal>
        </main>
      </RegistrationContext.Provider>
    </>
  );
}
