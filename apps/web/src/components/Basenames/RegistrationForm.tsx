import { MinusIcon, PlusIcon } from '@heroicons/react/16/solid';
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import { Button, ButtonSizes, ButtonVariants } from 'apps/web/src/components/Button/Button';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import {
  useDiscountedNameRegistrationPrice,
  useNameRegistrationPrice,
} from 'apps/web/src/utils/hooks/useNameRegistrationPrice';
import { useRegisterNameCallback } from 'apps/web/src/utils/hooks/useRegisterNameCallback';
import { useCallback, useState } from 'react';
import { formatEther } from 'viem';
import { base, baseSepolia } from 'viem/chains';
import { useSwitchChain } from 'wagmi';

type RegistrationFormProps = {
  name: string;
  loadingDiscounts: boolean;
  toggleModal: () => void;
  discountKey: `0x${string}` | undefined;
};

const threshold = 0.01;

function formatPrice(price?: bigint) {
  if (!price) {
    return '...';
  }
  const formattedPrice = formatEther(price);
  const value = parseFloat(formattedPrice);

  if (value < threshold) {
    return parseFloat(value.toFixed(6));
  } else {
    return parseFloat(value.toFixed(2));
  }
}

export function RegistrationForm({
  discountKey,
  name,
  loadingDiscounts,
  toggleModal,
}: RegistrationFormProps) {
  const { openConnectModal } = useConnectModal();
  const { switchChain } = useSwitchChain();
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

  const { data: price } = useNameRegistrationPrice(name, years);
  const { data: discountedPrice } = useDiscountedNameRegistrationPrice(name, years, discountKey);
  const registerName = useRegisterNameCallback(
    name,
    discountKey ? discountedPrice : price,
    years,
    discountKey,
  );

  const nameIsFree = false;
  return (
    <div className="bg- mx-auto w-full max-w-[50rem] transition-all duration-500">
      <div className="z-10 mx-4 flex flex-col justify-between gap-4 rounded-2xl bg-[#F7F7F7] p-8 text-gray/60 shadow-xl md:flex-row md:items-center">
        <div>
          <p className="mb-2 text-sm font-bold uppercase text-line">Claim for</p>
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
          <p className="mb-2 text-sm font-bold uppercase text-line">Amount</p>
          <div className="flex items-baseline justify-center md:justify-between">
            <p className="mx-2 whitespace-nowrap text-3xl text-black">{formatPrice(price)} ETH</p>
            {loadingDiscounts ? (
              <div className="flex h-4 items-center justify-center">
                <Icon name="spinner" color="currentColor" />
              </div>
            ) : (
              <span className="whitespace-nowrap text-xl text-gray/60">$--.--</span>
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
                onClick={registerName}
                type="button"
                variant={ButtonVariants.Black}
                size={ButtonSizes.Small}
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
          className="font-bold uppercase text-line underline"
          onClick={toggleModal}
        >
          Learn more
        </button>
      </div>
    </div>
  );
}
