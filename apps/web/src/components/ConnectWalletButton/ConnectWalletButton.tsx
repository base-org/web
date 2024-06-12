import { ConnectButton } from '@rainbow-me/rainbowkit';
import { UserAvatar } from 'apps/web/src/components/ConnectWalletButton/UserAvatar';
import { ShinyButton } from 'apps/web/src/components/ShinyButton/ShinyButton';

type ConnectWalletButtonProps = {
  color: 'white' | 'black';
  className: string;
};

const colorVariant: Record<'white' | 'black', 'white' | 'black'> = {
  white: 'white',
  black: 'black',
};

export function ConnectWalletButton({ color, className }: ConnectWalletButtonProps) {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        if (!connected) {
          return (
            <ShinyButton variant={colorVariant[color]} onClick={openConnectModal}>
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
