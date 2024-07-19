import { MinusIcon, PlusIcon } from '@heroicons/react/16/solid';
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import { useAnalytics } from 'apps/web/contexts/Analytics';
import RegistrationLearnMoreModal from 'apps/web/src/components/Basenames/RegistrationLearnMoreModal';
import { useRegistration } from 'apps/web/src/components/Basenames/RegistrationContext';
import { Button, ButtonSizes, ButtonVariants } from 'apps/web/src/components/Button/Button';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { useEthPriceFromUniswap } from 'apps/web/src/hooks/useEthPriceFromUniswap';
import {
  useDiscountedNameRegistrationPrice,
  useNameRegistrationPrice,
} from 'apps/web/src/hooks/useNameRegistrationPrice';
import { useRegisterNameCallback } from 'apps/web/src/hooks/useRegisterNameCallback';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useCallback, useEffect, useState } from 'react';
import { formatEther } from 'viem';
import TransactionError from 'apps/web/src/components/TransactionError';
import TransactionStatus from 'apps/web/src/components/TransactionStatus';
import { USERNAME_CHAIN_ID } from 'apps/web/src/addresses/usernames';

function formatEtherPrice(price?: bigint) {
  if (price === undefined) {
    return '...';
  }
  const value = parseFloat(formatEther(price));
  if (value < 0.001) {
    return parseFloat(value.toFixed(4));
  } else {
    return parseFloat(value.toFixed(3));
  }
}

function formatUsdPrice(price: bigint, ethUsdPrice: number) {
  if (price === 0n) return '0';
  const parsed = (parseFloat(formatEther(price)) * Number(ethUsdPrice)).toFixed(2);
  if (parsed === '0.00') return '0';
  return parsed;
}

export function RegistrationForm() {
  const { openConnectModal } = useConnectModal();
  const { logEventWithContext } = useAnalytics();
  const {
    transactionData,
    transactionError,
    selectedName,
    setRegisterNameTransactionHash,
    discount,
    loadingDiscounts,
  } = useRegistration();
  const [years, setYears] = useState(1);

  const [learnMoreModalOpen, setLearnMoreModalOpen] = useState(false);

  const toggleLearnMoreModal = useCallback(() => {
    logEventWithContext('open_learn_more_modal', ActionType.change);
    setLearnMoreModalOpen((open) => !open);
  }, [logEventWithContext]);

  const increment = useCallback(() => {
    logEventWithContext('registration_form_increment_year', ActionType.click);

    setYears((n) => n + 1);
  }, [logEventWithContext]);

  const decrement = useCallback(() => {
    logEventWithContext('registration_form_decement_year', ActionType.click);

    setYears((n) => (n > 1 ? n - 1 : n));
  }, [logEventWithContext]);

  const ethUsdPrice = useEthPriceFromUniswap();
  const { data: initialPrice } = useNameRegistrationPrice(selectedName, years);
  const { data: discountedPrice } = useDiscountedNameRegistrationPrice(
    selectedName,
    years,
    discount?.discountKey,
  );

  const price = discountedPrice ?? initialPrice;

  const {
    callback: registerName,
    data: registerNameTransactionHash,
    isPending: registerNameTransactionIsPending,
    error: registerNameError,
  } = useRegisterNameCallback(
    selectedName,
    price,
    years,
    discount?.discountKey,
    discount?.validationData,
  );

  useEffect(() => {
    if (registerNameTransactionHash) {
      logEventWithContext('register_name_transaction_approved', ActionType.change);

      setRegisterNameTransactionHash(registerNameTransactionHash);
    }
  }, [logEventWithContext, registerNameTransactionHash, setRegisterNameTransactionHash]);

  const registerNameCallback = useCallback(() => {
    registerName()
      .then(() => {})
      .catch(() => {});
  }, [registerName]);

  const usdPrice =
    price !== undefined && ethUsdPrice !== undefined ? formatUsdPrice(price, ethUsdPrice) : '--.--';
  const nameIsFree = price === 0n;

  return (
    <>
      <div className="transition-all duration-500">
        <div className="z-10 flex flex-col justify-between gap-4 rounded-2xl bg-[#F7F7F7] p-8 text-gray-60 shadow-xl md:flex-row">
          <div>
            <p className="text-line mb-2 text-sm font-bold uppercase">Claim for</p>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={decrement}
                disabled={years === 1}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DEE1E7]"
              >
                <MinusIcon width="14" height="14" className="fill-[#32353D]" />
              </button>
              <span className="flex w-32 items-center justify-center text-3xl text-black">
                {years} year{years > 1 && 's'}
              </span>
              <button
                type="button"
                onClick={increment}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DEE1E7]"
              >
                <PlusIcon width="14" height="14" className="fill-[#32353D]" />
              </button>
            </div>
          </div>
          <div>
            <p className="text-line mb-2 text-sm font-bold uppercase">Amount</p>
            <div className="flex items-baseline justify-center md:justify-between">
              {discountedPrice !== undefined ? (
                <div className="mr-2 flex flex-row items-baseline justify-around gap-2">
                  <p className="whitespace-nowrap text-3xl text-black line-through">
                    {formatEtherPrice(initialPrice)}
                  </p>
                  <p className="whitespace-nowrap text-3xl text-green-50">
                    {formatEtherPrice(discountedPrice)} ETH
                  </p>
                </div>
              ) : (
                <p className="mr-2 whitespace-nowrap text-3xl text-black">
                  {formatEtherPrice(price)} ETH
                </p>
              )}
              {loadingDiscounts ? (
                <div className="flex h-4 items-center justify-center">
                  <Icon name="spinner" color="currentColor" />
                </div>
              ) : (
                <span className="whitespace-nowrap text-xl text-gray-60">${usdPrice}</span>
              )}
            </div>
            {nameIsFree && <p className="text-sm text-green-50">Free with your verification</p>}
          </div>

          <ConnectButton.Custom>
            {({ account, chain, mounted }) => {
              const ready = mounted;
              const connected = ready && account && chain;

              if (!connected) {
                return (
                  <Button
                    type="button"
                    variant={ButtonVariants.Black}
                    size={ButtonSizes.Small}
                    onClick={openConnectModal}
                    rounded
                  >
                    Connect wallet
                  </Button>
                );
              }

              return (
                <Button
                  onClick={registerNameCallback}
                  type="button"
                  variant={ButtonVariants.Black}
                  size={ButtonSizes.Small}
                  disabled={registerNameTransactionIsPending}
                  isLoading={registerNameTransactionIsPending}
                  rounded
                >
                  Register name
                </Button>
              );
            }}
          </ConnectButton.Custom>
        </div>

        {transactionError !== null && (
          <TransactionError className="mt-4 text-center" error={transactionError} />
        )}
        {registerNameError && (
          <TransactionError className="mt-4 text-center" error={registerNameError} />
        )}
        {transactionData && (
          <TransactionStatus
            className="mt-4 text-center"
            transaction={transactionData}
            chainId={USERNAME_CHAIN_ID}
          />
        )}
        <div className="mt-6 flex w-full justify-center">
          <p className="text mr-2 text-center font-bold uppercase text-[#5B616E]">
            {nameIsFree ? "You've qualified for a free name! " : 'Unlock your username for free! '}
          </p>
          <button
            type="button"
            className="text-line font-bold uppercase underline"
            onClick={toggleLearnMoreModal}
          >
            Learn more
          </button>
        </div>
      </div>
      <RegistrationLearnMoreModal isOpen={learnMoreModalOpen} toggleModal={toggleLearnMoreModal} />
    </>
  );
}
