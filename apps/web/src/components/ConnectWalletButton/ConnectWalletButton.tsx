import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';
import { Button, ButtonSizes, ButtonVariants } from 'apps/web/src/components/Button/Button';
import { UserAddress } from 'apps/web/src/components/ConnectWalletButton/UserAddress';
import { UserAvatar } from 'apps/web/src/components/ConnectWalletButton/UserAvatar';
import { ShinyButton } from 'apps/web/src/components/ShinyButton/ShinyButton';
import sanitizeEventString from 'base-ui/utils/sanitizeEventString';
import logEvent, {
  ActionType,
  AnalyticsEventImportance,
  ComponentType,
  identify,
} from 'base-ui/utils/logEvent';
import classNames from 'classnames';
import { useCallback, useEffect } from 'react';
import { useAccount } from 'wagmi';

export enum ConnectWalletButtonVariants {
  Default,
  Shiny,
}

type ConnectWalletButtonProps = {
  color: 'white' | 'black';
  className?: string;
  connectWalletButtonVariant?: ConnectWalletButtonVariants;
};

const colorVariant: Record<'white' | 'black', 'white' | 'black'> = {
  white: 'white',
  black: 'black',
};

export function ConnectWalletButton({
  color,
  className,
  connectWalletButtonVariant = ConnectWalletButtonVariants.Shiny,
}: ConnectWalletButtonProps) {
  const { openConnectModal } = useConnectModal();
  const { address, connector } = useAccount();

  useEffect(() => {
    if (address) {
      logEvent(
        'wallet_connected',
        {
          action: ActionType.change,
          context: 'navbar',
          address,
          wallet_type: sanitizeEventString(connector?.name),
        },
        AnalyticsEventImportance.low,
      );
      identify({ userId: address });
    }
  }, [address]);

  const clickConnect = useCallback(() => {
    openConnectModal?.();
    logEvent(
      'connect_wallet',
      {
        action: ActionType.click,
        componentType: ComponentType.button,
        context: 'navbar',
      },
      AnalyticsEventImportance.low,
    );
  }, [openConnectModal]);

  const userAddressClasses = classNames('text-lg', {
    'text-white': color === 'white',
    'text-black': color === 'black',
  });

  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        if (!connected || !address) {
          return connectWalletButtonVariant === ConnectWalletButtonVariants.Shiny ? (
            <ShinyButton variant={colorVariant[color]} onClick={clickConnect}>
              Connect
            </ShinyButton>
          ) : (
            <Button
              variant={ButtonVariants.Black}
              size={ButtonSizes.Small}
              onClick={clickConnect}
              rounded
            >
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
            className={`flex cursor-pointer items-center gap-2 ${className}`}
            onClick={openAccountModal}
            onKeyUp={openAccountModal}
            type="button"
          >
            <UserAvatar />
            <span className={userAddressClasses}>
              <UserAddress address={address} />
            </span>
          </button>
        );
      }}
    </ConnectButton.Custom>
  );
}
