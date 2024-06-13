import { InformationCircleIcon } from '@heroicons/react/20/solid';
import Modal from 'apps/web/src/components/Modal';
import Tooltip from 'apps/web/src/components/Tooltip';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';

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
        <input type="text" placeholder="search for a username" />
        <button type="button" onClick={selectName}>
          option: name1
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
              <Tooltip content="placeholder">
                <InformationCircleIcon width={12} height={12} className="ml-1 fill-[#89909E] hover:fill-darkgray transition-colors" />
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
              <Tooltip content="placeholder">
                <InformationCircleIcon width={12} height={12} className="ml-1 fill-[#89909E] hover:fill-darkgray transition-colors" />
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
              <Tooltip content="placeholder">
                <InformationCircleIcon width={12} height={12} className="ml-1 fill-[#89909E] hover:fill-darkgray transition-colors" />
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
              <Tooltip content="placeholder">
                <InformationCircleIcon width={12} height={12} className="ml-1 fill-[#89909E] hover:fill-darkgray transition-colors" />
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
