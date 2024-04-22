import { Button } from 'apps/web/src/components/Button/Button';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { UserAvatar } from 'apps/web/src/components/ConnectWalletButton/UserAvatar';

type ConnectWalletButtonProps = {
  color: 'white' | 'black';
};

const colorVariant: Record<'white' | 'black', 'secondary' | 'secondaryDark'> = {
  white: 'secondary',
  black: 'secondaryDark',
};

export function ConnectWalletButton({ color }: ConnectWalletButtonProps) {
  // return <Button variant={colorVariant[color]}>Connect Wallet</Button>;
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        if (!connected) {
          return (
            <Button variant={colorVariant[color]} onClick={openConnectModal}>
              Connect
            </Button>
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
            className="relative top-3 inline-block cursor-pointer"
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
