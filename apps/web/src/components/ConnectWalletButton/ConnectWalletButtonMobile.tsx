import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { UserAvatar } from 'apps/web/src/components/ConnectWalletButton/UserAvatar';
import { UserAddress } from 'apps/web/src/components/ConnectWalletButton/UserAddress';
import { useAccount } from 'wagmi';

type ConnectWalletButtonProps = {
  color: 'white' | 'black';
  className: string;
};

const colorVariant: Record<'white' | 'black', ButtonVariants> = {
  white: ButtonVariants.Secondary,
  black: ButtonVariants.SecondaryDark,
};

// I don't think this is used at all
export function ConnectWalletButton({ color, className }: ConnectWalletButtonProps) {
  const { address } = useAccount();
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        if (!connected || !address) {
          return (
            <Button variant={colorVariant[color]} onClick={openConnectModal} className="w-full">
              Connect
            </Button>
          );
        }

        if (chain.unsupported) {
          return (
            <button className="px-2 py-1" onClick={openChainModal} type="button">
              Wrong network
            </button>
          );
        }

        return (
          <div className="flex items-center gap-6 border-b border-t border-solid border-translucent-200 pb-4 pt-4 text-white">
            <button
              className={`cursor-pointer ${className}`}
              onClick={openAccountModal}
              onKeyUp={openAccountModal}
              type="button"
              aria-label="Open account modal"
            >
              <UserAvatar />
            </button>
            <UserAddress address={address} />
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
