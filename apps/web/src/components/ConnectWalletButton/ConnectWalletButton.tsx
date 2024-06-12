import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import { UserAvatar } from 'apps/web/src/components/ConnectWalletButton/UserAvatar';
import { ShinyButton } from 'apps/web/src/components/ShinyButton/ShinyButton';
import logEvent from 'apps/web/src/utils/logEvent';
import { useCallback } from 'react';

type ConnectWalletButtonProps = {
  color: 'white' | 'black';
  className: string;
};

const colorVariant: Record<'white' | 'black', 'white' | 'black'> = {
  white: 'white',
  black: 'black',
};

export function ConnectWalletButton({ color, className }: ConnectWalletButtonProps) {
  const { openConnectModal } = useConnectModal();

  const clickConnect = useCallback(() => {
    openConnectModal?.();
    logEvent('ConnectWalletButton_Clicked', {});
  }, [openConnectModal]);

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        if (!connected) {
          return (
            <ShinyButton variant={colorVariant[color]} onClick={clickConnect}>
              Connect
            </ShinyButton>
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
          <button
            className={`cursor-pointer ${className}`}
            onClick={openAccountModal}
            onKeyUp={openAccountModal}
            type="button"
          >
            <UserAvatar />
          </button>
        );
      }}
    </ConnectButton.Custom>
  );
}
