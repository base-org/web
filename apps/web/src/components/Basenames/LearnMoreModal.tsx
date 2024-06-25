import { InformationCircleIcon } from '@heroicons/react/20/solid';
import Modal from 'apps/web/src/components/Modal';
import Tooltip from 'apps/web/src/components/Tooltip';
import Image from 'next/image';

export function LearnMoreModal({
  learnMoreModalOpen,
  toggleModal,
}: {
  learnMoreModalOpen: boolean;
  toggleModal: () => void;
}) {
  return (
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
  );
}
