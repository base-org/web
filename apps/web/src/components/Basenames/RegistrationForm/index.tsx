import {
  ExclamationCircleIcon,
  InformationCircleIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/16/solid';
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import { useAnalytics } from 'apps/web/contexts/Analytics';
import { useErrors } from 'apps/web/contexts/Errors';
import { useRegistration } from 'apps/web/src/components/Basenames/RegistrationContext';
import RegistrationLearnMoreModal from 'apps/web/src/components/Basenames/RegistrationLearnMoreModal';
import { Button, ButtonSizes, ButtonVariants } from 'apps/web/src/components/Button/Button';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import TransactionError from 'apps/web/src/components/TransactionError';
import TransactionStatus from 'apps/web/src/components/TransactionStatus';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { useEthPriceFromUniswap } from 'apps/web/src/hooks/useEthPriceFromUniswap';
import {
  useDiscountedNameRegistrationPrice,
  useNameRegistrationPrice,
} from 'apps/web/src/hooks/useNameRegistrationPrice';
import { useRegisterNameCallback } from 'apps/web/src/hooks/useRegisterNameCallback';
import { IS_EARLY_ACCESS } from 'apps/web/src/utils/usernames';
import classNames from 'classnames';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { formatEther } from 'viem';
import { useAccount, useBalance, useChains, useSwitchChain } from 'wagmi';

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

export default function RegistrationForm() {
  const { isConnected, chain: connectedChain, address } = useAccount();
  const chains = useChains();
  const { openConnectModal } = useConnectModal();
  const { logEventWithContext } = useAnalytics();
  const { logError } = useErrors();
  const { basenameChain } = useBasenameChain();
  const { switchChain } = useSwitchChain();
  const switchToIntendedNetwork = useCallback(
    () => switchChain({ chainId: basenameChain.id }),
    [basenameChain.id, switchChain],
  );
  const isOnSupportedNetwork = useMemo(
    () => connectedChain && chains.includes(connectedChain),
    [connectedChain, chains],
  );

  const {
    transactionData,
    transactionError,
    selectedName,
    setRegisterNameTransactionHash,
    setRegisterNameCallsBatchId,
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
    callBatchId,
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
    if (registerNameTransactionHash ?? callBatchId) {
      logEventWithContext('register_name_transaction_approved', ActionType.change);
    }
    if (callBatchId) setRegisterNameCallsBatchId(callBatchId);
    if (registerNameTransactionHash) setRegisterNameTransactionHash(registerNameTransactionHash);
  }, [
    callBatchId,
    logEventWithContext,
    registerNameTransactionHash,
    setRegisterNameCallsBatchId,
    setRegisterNameTransactionHash,
  ]);

  const registerNameCallback = useCallback(() => {
    registerName()
      .then(() => {})
      .catch((error) => {
        logError(error, 'Failed to register name');
      });
  }, [logError, registerName]);

  const { data: balance } = useBalance({ address, chainId: connectedChain?.id });
  const insufficientBalanceToRegister =
    balance?.value !== undefined && price !== undefined && balance?.value < price;
  const usdPrice =
    price !== undefined && ethUsdPrice !== undefined ? formatUsdPrice(price, ethUsdPrice) : '--.--';
  const nameIsFree = price === 0n;

  if (!IS_EARLY_ACCESS || (IS_EARLY_ACCESS && discount)) {
    return (
      <>
        <div className="mt-20 transition-all duration-500">
          <div className="z-10 flex flex-col items-start justify-between gap-6 rounded-2xl bg-[#F7F7F7] p-8 text-gray-60 shadow-xl md:flex-row md:items-center">
            <div className="max-w-[14rem]">
              <p className="text-line mb-2 text-sm font-bold uppercase">Claim for</p>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={decrement}
                  disabled={years === 1}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DEE1E7]"
                  aria-label="Decrement years"
                >
                  <MinusIcon width="14" height="14" className="fill-[#32353D]" />
                </button>
                <span className="flex w-32 items-center justify-center text-3xl font-bold text-black">
                  {years} year{years > 1 && 's'}
                </span>
                <button
                  type="button"
                  onClick={increment}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DEE1E7]"
                  aria-label="Increment years"
                >
                  <PlusIcon width="14" height="14" className="fill-[#32353D]" />
                </button>
              </div>
            </div>
            <div className="min-w-[14rem] text-left">
              <p className="text-line mb-2 text-sm font-bold uppercase">Amount</p>
              <div className="flex items-baseline justify-start gap-4">
                {discountedPrice !== undefined ? (
                  <div className=" flex flex-row items-baseline justify-around gap-2">
                    <p
                      className={classNames('whitespace-nowrap text-3xl text-black line-through', {
                        'text-state-n-hovered': insufficientBalanceToRegister,
                      })}
                    >
                      {formatEtherPrice(initialPrice)}
                    </p>
                    <p
                      className={classNames('whitespace-nowrap text-3xl font-bold text-green-50', {
                        'text-state-n-hovered': insufficientBalanceToRegister,
                      })}
                    >
                      {formatEtherPrice(discountedPrice)} ETH
                    </p>
                  </div>
                ) : (
                  <p
                    className={classNames('whitespace-nowrap text-3xl font-bold text-black', {
                      'text-state-n-hovered': insufficientBalanceToRegister,
                    })}
                  >
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
              {insufficientBalanceToRegister ? (
                <p className="text-sm text-state-n-hovered">your ETH balance is insufficient</p>
              ) : Boolean(nameIsFree && IS_EARLY_ACCESS) ? (
                <p className="text-sm text-green-50">Discounted during Early Access.</p>
              ) : (
                nameIsFree && <p className="text-sm text-green-50">Free with your verification</p>
              )}
            </div>

            <div className="w-full max-w-full md:max-w-[10rem]">
              <ConnectButton.Custom>
                {({ account, chain, mounted }) => {
                  const ready = mounted;
                  const connected = ready && account && chain;

                  if (!connected) {
                    return (
                      <Button
                        type="button"
                        variant={ButtonVariants.Black}
                        size={ButtonSizes.Medium}
                        onClick={openConnectModal}
                        rounded
                      >
                        Connect wallet
                      </Button>
                    );
                  }

                  return (
                    <Button
                      onClick={
                        connectedChain?.id === basenameChain.id
                          ? registerNameCallback
                          : switchToIntendedNetwork
                      }
                      type="button"
                      variant={ButtonVariants.Black}
                      size={ButtonSizes.Medium}
                      disabled={insufficientBalanceToRegister || registerNameTransactionIsPending}
                      isLoading={registerNameTransactionIsPending}
                      rounded
                      fullWidth
                    >
                      {connectedChain?.id === basenameChain.id ? 'Register name' : 'Get based'}
                    </Button>
                  );
                }}
              </ConnectButton.Custom>
            </div>
          </div>

          {transactionError !== null && (
            <TransactionError className="mt-4 text-center" error={transactionError} />
          )}
          {registerNameError && (
            <TransactionError className="mt-4 text-center" error={registerNameError} />
          )}
          {transactionData && transactionData.status === 'reverted' && (
            <TransactionStatus
              className="mt-4 text-center"
              transaction={transactionData}
              chainId={basenameChain.id}
            />
          )}
          {!IS_EARLY_ACCESS && (
            <div className="mt-6 w-full ">
              <p className="text mr-2 text-center font-bold uppercase ">
                <span className="text-[#5B616E]">
                  {nameIsFree
                    ? "You've qualified for a free name! "
                    : 'Unlock your username for free! '}
                </span>

                <button
                  type="button"
                  className="text-line font-bold uppercase text-[] underline"
                  onClick={toggleLearnMoreModal}
                >
                  Learn more
                </button>
              </p>
            </div>
          )}
        </div>
        <RegistrationLearnMoreModal
          isOpen={learnMoreModalOpen}
          toggleModal={toggleLearnMoreModal}
        />
      </>
    );
  }
  if (isConnected) {
    if (isOnSupportedNetwork) {
      return (
        <div className="z-10 mt-8 flex flex-row items-center justify-center ">
          <ExclamationCircleIcon width={12} height={12} className="fill-state-n-hovered" />
          <p className="ml-2 text-state-n-hovered">
            The connected wallet is not eligible for early access.
          </p>
        </div>
      );
    } else {
      return (
        <button
          type="button"
          className="z-10 mx-auto mt-8 flex flex-row items-center justify-center"
          onClick={switchToIntendedNetwork}
        >
          <ExclamationCircleIcon width={12} height={12} className="fill-gray-40" />
          <p className="ml-2 text-gray-40">Switch to Base to register a name.</p>
        </button>
      );
    }
  }

  return (
    <div className="z-10 mx-auto mt-8 flex flex-row items-center justify-center">
      <InformationCircleIcon width={12} height={12} className="fill-gray-40" />
      <p className="ml-2 text-gray-40">Connect a wallet to register a name</p>
    </div>
  );
}
