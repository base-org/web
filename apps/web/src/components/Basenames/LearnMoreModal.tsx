import { InformationCircleIcon } from '@heroicons/react/20/solid';
import { Discount } from 'apps/web/src/components/Basenames/RegistrationFlow';
import Modal from 'apps/web/src/components/Modal';
import Tooltip from 'apps/web/src/components/Tooltip';
import classNames from 'classnames';
import Image from 'next/image';

function InfoIcon() {
  return (
    <InformationCircleIcon
      width={12}
      height={12}
      className="ml-1 fill-[#89909E] transition-colors hover:fill-gray-dark"
    />
  );
}

export function LearnMoreModal({
  discounts,
  learnMoreModalOpen,
  toggleModal,
}: {
  discounts: Set<`${Discount}`>;
  learnMoreModalOpen: boolean;
  toggleModal: () => void;
}) {
  const hasDiscount = discounts.size > 0;
  const rowClasses = 'flex flex-row items-center justify-start';
  const CBRowClasses = classNames(rowClasses, {
    'opacity-40': hasDiscount && !discounts.has('COINBASE_VERIFIED_ACCOUNT'),
  });
  const CB1RowClasses = classNames(rowClasses, {
    'opacity-40': hasDiscount && !discounts.has('CB1'),
  });
  const CBIDRowClasses = classNames(rowClasses, {
    'opacity-40': hasDiscount && !discounts.has('CBID'),
  });

  const qualifiedClasses = classNames(
    'flex flex-row items-center justify-center py-3 px-1 h-5 text-xs bg-green-0 rounded ml-3',
  );
  return (
    <Modal isOpen={learnMoreModalOpen} onClose={toggleModal} title="">
      <span className="mb-4 w-full text-2xl font-bold">
        {hasDiscount ? 'You’re getting a free name' : 'Register for free'}
      </span>
      <p className="mb-6 text-illoblack">
        {hasDiscount
          ? 'You’re receiving your name for free (5+ characters for 1 year) because your wallet has one of the following:'
          : 'You’ll receive a name for free (5+ characters for 1 year) if your wallet has any of the following:'}
      </p>
      <ul className="mb-5 flex flex-col gap-3 self-start">
        <li className={CBRowClasses}>
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
          {discounts.has('COINBASE_VERIFIED_ACCOUNT') && (
            <div className={qualifiedClasses}>
              <p className="text-green-60">Qualified</p>
            </div>
          )}
        </li>
        <li className={CB1RowClasses}>
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
          {discounts.has('CB1') && (
            <div className={qualifiedClasses}>
              <p className="text-green-60">Qualified</p>
            </div>
          )}
        </li>
        <li className={CBIDRowClasses}>
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
          {discounts.has('CBID') && (
            <div className={qualifiedClasses}>
              <p className="text-green-60">Qualified</p>
            </div>
          )}
        </li>
      </ul>
      {!hasDiscount && (
        <>
          <p className="mb-6 w-full text-illoblack">
            Your registration will be gasless with{' '}
            <a href="http://wallet.coinbase.com/smart-wallet" className="underline">
              a smart wallet
            </a>
            .
          </p>
          <div className="text-md bg-backgroundAlternate w-full rounded-xl border border-[#CED2DB] p-4 font-medium text-illoblack">
            Don’t have any of these?{' '}
            <a href="https://www.coinbase.com/onchain-verify" className="underline">
              Get a verification
            </a>
          </div>
        </>
      )}
    </Modal>
  );
}
