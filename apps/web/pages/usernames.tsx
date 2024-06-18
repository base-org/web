import { Transition } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/20/solid';
import { FloatingENSPills } from 'apps/web/src/components/Basenames/FloatingENSPills';
import Modal from 'apps/web/src/components/Modal';
import Tooltip from 'apps/web/src/components/Tooltip';
import classNames from 'classnames';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { RegistrationForm } from 'apps/web/src/components/Basenames/RegistrationForm';
import { Fragment, useCallback, useState } from 'react';
import { useInterval } from 'usehooks-ts';
import { LargeSearchInput } from 'apps/web/src/components/Basenames/LargeSearchInput';

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

export default function Usernames() {
  const [progress, setProgress] = useState<ClaimProgression>(ClaimProgression.SEARCH);
  const [learnMoreModalOpen, setLearnMoreModalOpen] = useState(false);
  const toggleModal = useCallback(() => setLearnMoreModalOpen((open) => !open), []);
  const [inputFocused, setInputFocused] = useState(false);
  const [selectedName, setSelectedName] = useState('');

  const selectName = useCallback(
    (name: string) => () => {
      setProgress(ClaimProgression.CLAIM);
      setInputFocused(false);
      setSelectedName(name);
    },
    [],
  );

  const rotatingText = useRotatingText(SEARCH_LABEL_COPY_STRINGS);

  // the 96px here accounts for the header height
  const mainClasses = classNames(
    'relative flex min-h-[calc(100vh-96px)] w-full flex-col items-center pt-60 transition-colors',
    'transition-all duration-500',
    {
      'bg-ocsblue text-white': inputFocused,
    },
  );

  return (
    <>
      <Head>
        <title>Base | Usernames</title>
        <meta
          content="Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain."
          name="description"
        />
      </Head>
      {/* <RegistrationContext.Provider value={registrationValue}> */}
      <main className={mainClasses}>
        <FloatingENSPills />
        <div>
          <div className="relative mb-4 flex items-center justify-between">
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
              <h1 className="text-xl">BASENAMES</h1>
            </div>
            {SEARCH_LABEL_COPY_STRINGS.map((string) => (
              <Transition
                as={Fragment}
                key={string}
                show={rotatingText === string}
                enter="transform transition duration-500"
                enterFrom="opacity-0 -translate-y-4"
                enterTo="opacity-100 translate-y-0"
                leave="transform transition duration-500"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-4"
              >
                <p className="absolute right-0">{string}</p>
              </Transition>
            ))}
          </div>
          <div className="relative mb-12 text-black">
            <LargeSearchInput
              selectedName={selectedName}
              selectName={selectName}
              inputFocused={inputFocused}
              setInputFocused={setInputFocused}
            />
          </div>
        </div>


          {progress === ClaimProgression.CLAIM && (
            <>
              <RegistrationForm name={selectedName} /> 
            <p>
              unlock your username for free!{' '}
              <button type="button" className="underline" onClick={toggleModal}>
                learn more
              </button>
            </p>
          </>
        )}

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
              A Coinbase verification{' '}
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
              A Coinbase One verification{' '}
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
                src="/images/usernames/sw-verification.svg"
                alt="criteria icon"
                width={30}
                height={30}
                className="mr-3"
              />
              Deployed a smart wallet{' '}
              <Tooltip content="Smart wallet deployed from Coinbase Wallet">
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
          <strong className="self-start">
            Don&apos;t have any of these?&nbsp;
            <Link className="underline" href="https://www.coinbase.com/wallet/smart-wallet">
              Deploy a smart wallet
            </Link>
          </strong>
        </Modal>
      </main>
      {/* </RegistrationContext.Provider> */}
    </>
  );
}
