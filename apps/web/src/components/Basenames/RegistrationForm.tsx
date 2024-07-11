import { MinusIcon, PlusIcon } from '@heroicons/react/16/solid';
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import { useRegistration } from 'apps/web/src/components/Basenames/RegistrationContext';
import { Button, ButtonSizes, ButtonVariants } from 'apps/web/src/components/Button/Button';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { DiscountData } from 'apps/web/src/hooks/useAggregatedDiscountValidators';
import { useEthPriceFromUniswap } from 'apps/web/src/hooks/useEthPriceFromUniswap';
import {
  useDiscountedNameRegistrationPrice,
  useNameRegistrationPrice,
} from 'apps/web/src/hooks/useNameRegistrationPrice';
import { useRegisterNameCallback } from 'apps/web/src/hooks/useRegisterNameCallback';
import { useCallback, useEffect, useState } from 'react';
import { formatEther } from 'viem';
import { base, baseSepolia } from 'viem/chains';
import { useSwitchChain } from 'wagmi';

type RegistrationFormProps = {
  loadingDiscounts: boolean;
  toggleModal: () => void;
  discount?: DiscountData;
};

const threshold = 0.01;

function formatPrice(price?: bigint) {
  if (!price) {
    return '...';
  }
  const formattedPrice = formatEther(price);
  const value = parseFloat(formattedPrice);

  if (value < threshold) {
    return parseFloat(value.toFixed(3));
  } else {
    return parseFloat(value.toFixed(2));
  }
}

function formatUsdPrice(price: bigint, ethUsdPrice: number) {
  const parsed = (parseFloat(formatEther(price)) * Number(ethUsdPrice)).toFixed(2);
  if (parsed === '0.00') return '0';
  return parsed;
}

export function RegistrationForm({
  discount,
  loadingDiscounts,
  toggleModal,
}: RegistrationFormProps) {
  const { openConnectModal } = useConnectModal();
  const { switchChain } = useSwitchChain();

  const { selectedName, setRegisterNameTransactionHash } = useRegistration();
  const [years, setYears] = useState(1);
  const increment = useCallback(() => {
    setYears((n) => n + 1);
  }, []);
  const decrement = useCallback(() => {
    setYears((n) => (n > 1 ? n - 1 : n));
  }, []);

  const switchChainToBase = useCallback(() => {
    switchChain({ chainId: base.id });
  }, [switchChain]);

  const ethUsdPrice = useEthPriceFromUniswap();
  const { data: price } = useNameRegistrationPrice(selectedName, years);
  const { data: discountedPrice } = useDiscountedNameRegistrationPrice(
    selectedName,
    years,
    discount?.discountKey,
  );

  const finalPrice = discount?.discountKey ? discountedPrice : price;
  const {
    callback: registerName,
    data: registerNameTransactionHash,
    isPending: registerNameTransactionIsPending,
  } = useRegisterNameCallback(
    selectedName,
    finalPrice,
    years,
    discount?.discountKey,
    discount?.validationData,
  );

  useEffect(() => {
    if (registerNameTransactionHash) setRegisterNameTransactionHash(registerNameTransactionHash);
  }, [registerNameTransactionHash, setRegisterNameTransactionHash]);

  const registerNameCallback = useCallback(() => {
    registerName()
      .then(() => {})
      .catch(() => {});
  }, [registerName]);

  const usdPrice = ethUsdPrice && finalPrice ? formatUsdPrice(finalPrice, ethUsdPrice) : '--.--';
  const nameIsFree = finalPrice === 0n;

  return (
    <div className="bg- mx-auto w-full max-w-[50rem] transition-all duration-500">
      <div className="z-10 mx-4 flex flex-col justify-between gap-4 rounded-2xl bg-[#F7F7F7] p-8 text-gray-60 shadow-xl md:flex-row md:items-center">
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
            {discountedPrice ? (
              <div className="mr-2 flex flex-row items-baseline justify-around gap-2">
                <p className="whitespace-nowrap text-3xl text-black line-through">
                  {formatPrice(price)}
                </p>
                <p className="whitespace-nowrap text-3xl text-green-50">
                  {formatPrice(finalPrice)} ETH
                </p>
              </div>
            ) : (
              <p className="mr-2 whitespace-nowrap text-3xl text-black">
                {formatPrice(finalPrice)} ETH
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

            if (!([base.id, baseSepolia.id] as number[]).includes(chain.id)) {
              return (
                <Button
                  onClick={switchChainToBase}
                  type="button"
                  variant={ButtonVariants.Black}
                  size={ButtonSizes.Small}
                  rounded
                >
                  Switch network
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
      <div className="mt-6 flex w-full justify-center">
        <p className="text mr-2 text-center font-bold uppercase text-[#5B616E]">
          {nameIsFree ? "You've qualified for a free name! " : 'Unlock your username for free! '}
        </p>
        <button
          type="button"
          className="text-line font-bold uppercase underline"
          onClick={toggleModal}
        >
          Learn more
        </button>
      </div>
    </div>
  );
}
