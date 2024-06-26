import { InformationCircleIcon } from '@heroicons/react/20/solid';
import Modal from 'apps/web/src/components/Modal';
import Tooltip from 'apps/web/src/components/Tooltip';
import Image from 'next/image';

function InfoIcon() {
  return (
    <InformationCircleIcon
      width={12}
      height={12}
      className="ml-1 fill-[#89909E] transition-colors hover:fill-darkgray"
    />
  );
}

export function LearnMoreModal({
  learnMoreModalOpen,
  toggleModal,
}: {
  learnMoreModalOpen: boolean;
  toggleModal: () => void;
}) {
  return (
    <Modal isOpen={learnMoreModalOpen} onClose={toggleModal} title="">
      <span className="mb-4 w-full text-2xl font-bold">Register for free</span>
      <p className="mb-6 text-illoblack">
        You’ll receive a name for free (5+ characters only) if your wallet has any of the following:
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
          Coinbase verification{' '}
          <Tooltip content="Verifies you have a valid trading account on Coinbase">
            <InfoIcon />
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
          Coinbase One verification{' '}
          <Tooltip content="Verifies you have an active Coinbase One subscription">
            <InfoIcon />
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
          A cb.id username{' '}
          <Tooltip content="cb.id claimed prior to cutoff date">
            <InfoIcon />
          </Tooltip>
        </li>
      </ul>
      <p className="mb-6 w-full text-illoblack">
        Your registration will be gasless with <a className="underline">a smart wallet</a>.
      </p>
      <div className="text-md mb-4 w-full rounded-[13px] border border-[#CED2DB] bg-backgroundAlternate p-4 font-medium text-illoblack">
        Don’t have any of these? <a className="underline">Get a verification</a>
      </div>
    </Modal>
  );
}
