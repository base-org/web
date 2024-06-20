import { MinusIcon, PlusIcon } from '@heroicons/react/16/solid';
import { useCallback, useState } from 'react';
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import { useRegisterNameCallback } from 'apps/web/src/utils/hooks/useRegisterNameCallback';

type RegistrationFormProps = {
  name: string;
};

export function RegistrationForm({ name }: RegistrationFormProps) {
  const { openConnectModal } = useConnectModal();
  const [years, setYears] = useState(1);
  const increment = useCallback(() => {
    setYears((n) => n + 1);
  }, []);
  const decrement = useCallback(() => {
    setYears((n) => (n > 1 ? n - 1 : n));
  }, []);

  const registerName = useRegisterNameCallback(name, years);

  const buttonClasses = 'text-xl rounded-full py-3 px-8 text-illoblack bg-gray/10 border-line/20';

  return (
    <div className="z-10 mx-4 flex w-screen max-w-[784px] flex-col justify-between gap-4 rounded-xl border border-line/20 bg-[#F7F7F7] p-6 text-gray/60 md:flex-row">
      <div>
        <p className="mb-2 text-sm uppercase">Claim for</p>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={decrement}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-gray/10"
          >
            <MinusIcon width="12" height="12" className="fill-gray/80" />
          </button>
          <span className="mx-2 text-3xl text-black">
            {years} year{years > 1 && 's'}
          </span>
          <button
            type="button"
            onClick={increment}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-gray/10"
          >
            <PlusIcon width="12" height="12" className="fill-gray/80" />
          </button>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm uppercase">Amount</p>
        <div className="flex align-baseline">
          <span className="mx-2 text-3xl text-black">{0.01} ETH</span>
          <span className="text-xl text-gray/60">${3.82}</span>
        </div>
      </div>

      <ConnectButton.Custom>
        {({ account, chain, openChainModal, mounted }) => {
          const ready = mounted;
          const connected = ready && account && chain;

          if (!connected) {
            return (
              <button type="button" className={buttonClasses} onClick={openConnectModal}>
                Connect wallet
              </button>
            );
          }

          if (chain.unsupported) {
            return (
              <button onClick={openChainModal} type="button">
                Wrong network
              </button>
            );
          }

          return (
            <button onClick={registerName} className={buttonClasses} type="button">
              Register name
            </button>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
}
