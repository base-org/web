import { Transition } from '@headlessui/react';
import { InformationCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { FloatingENSPills } from 'apps/web/src/components/Basenames/FloatingENSPills';
import { RegistrationContext } from 'apps/web/src/components/Basenames/RegistrationContext';
import Input from 'apps/web/src/components/Input';
import Modal from 'apps/web/src/components/Modal';
import Tooltip from 'apps/web/src/components/Tooltip';
import { useIsNameAvailable } from 'apps/web/src/utils/hooks/useIsNameAvailable';
import { useFocusWithin } from 'apps/web/src/utils/hooks/useFocusWithin';
import classNames from 'classnames';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useCallback, useMemo, useState } from 'react';
import { useDebounceValue, useInterval } from 'usehooks-ts';
import { RegistrationForm } from 'apps/web/src/components/Basenames/RegistrationForm';

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
  const [inputFocused, setInputFocused] = useState(false);
  const [selectedName, setSelectedName] = useState('')
  const [searchString, setSearchString] = useState('');

  const selectName = useCallback((name: string) => () => {
    setProgress(ClaimProgression.CLAIM);
    setInputFocused(false)
    setSelectedName(name)
    setSearchString('')
  }, []);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setSearchString(value);
      setInputFocused(true)
    },
    [setSearchString],
  );
  const [debouncedSearchString] = useDebounceValue(searchString, 200);
  const rotatingText = useRotatingText(SEARCH_LABEL_COPY_STRINGS);
  const { ref, focused: searchFocused } = useFocusWithin();

  const classes = useMemo(() => {
    // the 96px here accounts for the header height
    let main =
      'relative flex min-h-[calc(100vh-96px)] w-full flex-col items-center justify-center transition-colors';
    let input =
      'relative w-screen max-w-[587px] border-2 border-line/20  py-5 pl-6 pr-10 outline-0 z-20';
    if (inputFocused) {
      main = classNames(main, 'bg-ocsblue', 'text-white')
      input = classNames(input, ' border-b-0 focus:border-ocsblue')
    }
    if (debouncedSearchString.length > 3) {
      input = classNames(input, 'rounded-t-xl border-b-0')
    } else {
      input = classNames(input, 'rounded-xl')
    }
    return { input, main };
  }, [debouncedSearchString, inputFocused]);

  const [inputIsHovered, setInputIsHovered] = useState(false);
  const handleMouseEnter = useCallback(() => setInputIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setInputIsHovered(false), []);

  const registrationValue = useMemo(
    () => ({ focused: inputFocused || searchFocused, hovered: inputIsHovered }),
    [inputFocused, searchFocused, inputIsHovered],
  );

  const { isLoading: loadingBaseName, data: available, error: errorFetchingNameAvailability } = useIsNameAvailable(debouncedSearchString)
  const suggestions = Boolean(debouncedSearchString && !available && !loadingBaseName) ? [debouncedSearchString + 'asdf', debouncedSearchString + '1234'] : []


  return (
    <>
      <Head>
        <title>Base | Usernames</title>
        <meta
          content="Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain."
          name="description"
        />
      </Head>
      <RegistrationContext.Provider value={registrationValue}>
        <main className={classes.main}>
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
            <div ref={ref} className="relative text-black">
              <Input
                type="text"
                value={searchString}
                onChange={handleSearchChange}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                placeholder="SEARCH FOR A NAME"
                className={classes.input}
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <MagnifyingGlassIcon width={24} height={24} className="z-20" />
              </div>
              {debouncedSearchString.length > 3 && (
                <div className="absolute left-0 right-0 top-0 z-10">
                  <div className={classNames("mt-2 flex flex-col items-start rounded-xl border-2 bg-white pb-3 pt-16", inputIsHovered && 'border-ocsblue', inputFocused ? 'border-ocsblue' : 'border-line/20', 'border-t-0')}>
                    {/*loadingBaseName && <p>loading...</p> */}
                    {!loadingBaseName && <div className='w-11/12 mx-auto mb-3 h-[1px] bg-line/20' />}
                    {!available && (<div className="flex w-full flex-row items-center justify-between px-6 py-2 disabled:text-line">
                      ${debouncedSearchString}.base.eth is unavailable
                    </div>)}
                    <p className="w-full px-6 py-2 text-sm text-line">{available ? 'AVAILABLE' : errorFetchingNameAvailability ? 'ERROR FETCHING NAME AVAILABILITY' : 'SUGGESTED'}</p>
                    {Boolean(available) && <button className="flex w-full flex-row items-center justify-between px-6 py-2 transition-colors active:bg-[#EAEAEB] hover:bg-[#F9F9F9]" type="button" onClick={selectName(debouncedSearchString)}>
                      {debouncedSearchString}.base.eth <ChevronRightIcon width={24} height={24} />
                    </button>}
                    {suggestions?.map((suggestion) => (<button
                      className="flex w-full flex-row items-center justify-between px-6 py-2 transition-colors active:bg-[#EAEAEB] hover:bg-[#F9F9F9]"
                      type="button"
                      key={suggestion}
                      onClick={selectName(suggestion)}
                    >
                      {suggestion}.base.eth <ChevronRightIcon width={24} height={24} />
                    </button>))}
                  </div>
                </div>
              )}
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
              Don’t have any of these?&nbsp;
              <Link className="underline" href="https://www.coinbase.com/wallet/smart-wallet">
                Deploy a smart wallet
              </Link>
            </strong>
          </Modal>
        </main>
      </RegistrationContext.Provider>
    </>
  );
}
