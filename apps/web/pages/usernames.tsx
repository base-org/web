import { InformationCircleIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import Input from 'apps/web/src/components/Input';
import Modal from 'apps/web/src/components/Modal';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { useDebounceValue } from 'usehooks-ts';

enum ClaimProgression {
  SEARCH,
  CLAIM,
}

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
  return (
    <>
      <Head>
        <title>Base | Usernames</title>
        <meta
          content="Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain."
          name="description"
        />
      </Head>
      <main className="flex w-full flex-col items-center bg-white">
        <div>
          <div className="flex flex-row items-center justify-between">
            <h1 className="text-xl">🔵 BASENAMES</h1>
            <p>insert rotating text</p>
          </div>
          <div className="relative">
            <Input
              type="text"
              value={searchString}
              onChange={handleSearchChange}
              placeholder="SEARCH FOR A NAME"
              className="w-screen max-w-[587px] rounded-xl border-2 border-illoblack p-3 pr-10"
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
        <Modal
          isOpen={learnMoreModalOpen}
          onClose={toggleModal}
          title="Qualify for a free username"
        >
          <p className="mb-6 text-illoblack">
            You will receive your username for free if you connect to a wallet that has{' '}
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
              <InformationCircleIcon width={12} height={12} className="ml-1 fill-[#89909E]" />
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
              <InformationCircleIcon width={12} height={12} className="ml-1 fill-[#89909E]" />
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
              <InformationCircleIcon width={12} height={12} className="ml-1 fill-[#89909E]" />
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
              <InformationCircleIcon width={12} height={12} className="ml-1 fill-[#89909E]" />
            </li>
          </ul>
          <strong>
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
