import Modal from 'apps/web/src/components/Modal';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/20/solid';

enum ClaimProgression {
  SEARCH,
  CLAIM
}

export default function Usernames() {
  const [progress, setProgress] = useState<ClaimProgression>(ClaimProgression.SEARCH)
  const [learnMoreModalOpen, setLearnMoreModalOpen] = useState(false)
  const toggleModal = useCallback(() => setLearnMoreModalOpen(open => !open), [])
  const selectName = useCallback(() => {
    setProgress(ClaimProgression.CLAIM)
  }, [])
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
        <input type="text" placeholder='search for a username'/>
        <button type='button' onClick={selectName}>option: name1</button>

        {progress === ClaimProgression.CLAIM && <p>
          unlock your username for free! <button type='button' className="underline" onClick={toggleModal}>learn more</button>
        </p>}
        <Modal isOpen={learnMoreModalOpen} onClose={toggleModal} title="Qualify for a free username">
          <p className="text-illoblack mb-6">You will receive your username for free if you connect to a wallet that has <strong>one of the following</strong></p>
          <ul className='flex flex-col gap-3 self-start mb-5'>
            <li className='flex flex-row items-center justify-start'><Image src="/images/usernames/coinbase-verification.svg" alt="criteria icon" width={30} height={30} className="mr-3"/>A Coinbase verification <InformationCircleIcon width={12} height={12} className='fill-[#89909E] ml-1'/></li>
            <li className='flex flex-row items-center justify-start'><Image src="/images/usernames/coinbase-one-verification.svg" alt="criteria icon" width={30} height={30} className="mr-3"/>A Coinbase One verification <InformationCircleIcon width={12} height={12} className='fill-[#89909E] ml-1'/></li>
            <li className='flex flex-row items-center justify-start'><Image src="/images/usernames/sw-verification.svg" alt="criteria icon" width={30} height={30} className="mr-3"/>Deployed a smart wallet <InformationCircleIcon width={12} height={12} className='fill-[#89909E] ml-1'/></li>
            <li className='flex flex-row items-center justify-start'><Image src="/images/usernames/cbid-verification.svg" alt="criteria icon" width={30} height={30} className="mr-3"/>A CB.ID username <InformationCircleIcon width={12} height={12} className='fill-[#89909E] ml-1'/></li>
          </ul>
          <strong>
            Don’t have any of these?&nbsp;
            <Link className="underline" href="https://www.coinbase.com/wallet/smart-wallet">Deploy a smart wallet</Link>
          </strong>
        </Modal>
      </main>
    </>
  )
}