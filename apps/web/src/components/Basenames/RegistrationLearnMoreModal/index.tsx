import { InformationCircleIcon } from '@heroicons/react/20/solid';
import { useRegistration } from 'apps/web/src/components/Basenames/RegistrationContext';
import Modal from 'apps/web/src/components/Modal';
import Tooltip from 'apps/web/src/components/Tooltip';
import { Discount } from 'apps/web/src/utils/usernames';
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

export default function RegistrationLearnMoreModal({
  isOpen,
  toggleModal,
}: {
  isOpen: boolean;
  toggleModal: () => void;
}) {
  const { allActiveDiscounts } = useRegistration();

  const hasDiscount = allActiveDiscounts.size > 0;
  const rowClasses = 'flex flex-row items-center justify-start';
  const CBRowClasses = classNames(rowClasses, {
    'opacity-40': hasDiscount && !allActiveDiscounts.has(Discount.COINBASE_VERIFIED_ACCOUNT),
  });
  const CB1RowClasses = classNames(rowClasses, {
    'opacity-40': hasDiscount && !allActiveDiscounts.has(Discount.CB1),
  });
  const CBIDRowClasses = classNames(rowClasses, {
    'opacity-40': hasDiscount && !allActiveDiscounts.has(Discount.CBID),
  });

  const qualifiedClasses = classNames(
    'flex flex-row items-center justify-center py-3 px-1 h-5 text-xs bg-green-0 rounded ml-3',
  );
  return (
    <Modal isOpen={isOpen} onClose={toggleModal} title="">
      <span className="mb-4 w-full text-2xl font-bold">
        {hasDiscount ? "You're getting a free name" : 'Register for free'}
      </span>
      <p className="mb-6 text-illoblack">
        {hasDiscount
          ? "You're receiving your name for free (5+ characters for 1 year) because your wallet has one of the following:"
          : "You'll receive a name for free (5+ characters for 1 year) if your wallet has any of the following:"}
      </p>
      <ul className="mb-5 flex flex-col gap-3 self-start">
        <li className="flex items-center">
          <Image
            src="/images/usernames/coinbase-verification.svg"
            alt="criteria icon"
            width={30}
            height={30}
            className={classNames(CBRowClasses, 'mr-3')}
          />
          <p className={classNames(CBRowClasses)}>Coinbase verification </p>
          <Tooltip content="Verifies you have a valid trading account on Coinbase">
            <InfoIcon />
          </Tooltip>
          {allActiveDiscounts.has(Discount.COINBASE_VERIFIED_ACCOUNT) && (
            <div className={qualifiedClasses}>
              <p className="text-green-60">Qualified</p>
            </div>
          )}
        </li>
        <li className="flex items-center">
          <Image
            src="/images/usernames/coinbase-one-verification.svg"
            alt="criteria icon"
            width={30}
            height={30}
            className={classNames(CB1RowClasses, 'mr-3')}
          />
          <p className={classNames(CB1RowClasses)}>Coinbase One verification </p>
          <Tooltip content="Verifies you have an active Coinbase One subscription">
            <InfoIcon />
          </Tooltip>
          {allActiveDiscounts.has(Discount.CB1) && (
            <div className={qualifiedClasses}>
              <p className="text-green-60">Qualified</p>
            </div>
          )}
        </li>
        <li className="flex items-center">
          <Image
            src="/images/usernames/cbid-verification.svg"
            alt="criteria icon"
            width={30}
            height={30}
            className={classNames(CBIDRowClasses, 'mr-3')}
          />
          <p className={classNames(CBIDRowClasses)}>A cb.id username </p>
          <Tooltip content="cb.id claimed prior to cutoff date">
            <InfoIcon />
          </Tooltip>
          {allActiveDiscounts.has(Discount.CBID) && (
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
            Don&apos;t have any of these?{' '}
            <a href="https://www.coinbase.com/onchain-verify" className="underline">
              Get a verification
            </a>
          </div>
        </>
      )}
    </Modal>
  );
}
