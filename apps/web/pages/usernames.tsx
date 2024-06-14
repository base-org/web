import { Transition } from '@headlessui/react';
import { InformationCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import Input from 'apps/web/src/components/Input';
import Modal from 'apps/web/src/components/Modal';
import Tooltip from 'apps/web/src/components/Tooltip';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useCallback, useState } from 'react';
import { useDebounceValue, useInterval } from 'usehooks-ts';

enum ClaimProgression {
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
  const selectName = useCallback(() => {
    setProgress(ClaimProgression.CLAIM);
  }, []);

  const [searchString, setSearchString] = useState('');
  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchString(value);
    },
    [setSearchString],
  );
  const [debouncedSearchString] = useDebounceValue(searchString, 200);
  const rotatingText = useRotatingText(SEARCH_LABEL_COPY_STRINGS);
  return (
    <>
      <Head>
        <title>Base | Usernames</title>
        <meta
          content="Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain."
          name="description"
        />
      </Head>
      {/* this height calc is accounting for the height of the layout's navbar (96px) */}
      <main className="flex min-h-[calc(100vh-96px)] w-full flex-col items-center justify-center bg-white">
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
                <circle cx="7.5" cy="7.5" r="7.5" fill="#0052FF" />
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
          <div className="relative">
            <Input
              type="text"
              value={searchString}
              onChange={handleSearchChange}
              placeholder="SEARCH FOR A NAME"
              className="w-screen max-w-[587px] rounded-xl border-2 border-line py-5 pl-6 pr-10"
            />
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <MagnifyingGlassIcon width={24} height={24} />
            </div>
          </div>
        </div>
        <button type="button" onClick={selectName}>
          option: {debouncedSearchString}
        </button>

        {progress === ClaimProgression.CLAIM && (
          <p>
            unlock your username for free!{' '}
            <button type="button" className="underline" onClick={toggleModal}>
              learn more
            </button>
          </p>
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
            Don’t have any of these?&nbsp;
            <Link className="underline" href="https://www.coinbase.com/wallet/smart-wallet">
              Deploy a smart wallet
            </Link>
          </strong>
        </Modal>
      </main>
    </>
  );
}
