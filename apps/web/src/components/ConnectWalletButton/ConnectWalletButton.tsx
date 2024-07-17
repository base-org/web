import { useCallback, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton, useConnectModal } from '@rainbow-me/rainbowkit';

import { UserAvatar } from 'apps/web/src/components/ConnectWalletButton/UserAvatar';
import { ShinyButton } from 'apps/web/src/components/ShinyButton/ShinyButton';
import logEvent, {
  ActionType,
  AnalyticsEventImportance,
  ComponentType,
  identify,
} from 'base-ui/utils/logEvent';

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
  const { address, connector } = useAccount();

  useEffect(() => {
    if (address) {
      logEvent(
        'wallet_connected',
         {
          action: ActionType.change,
          context: 'navbar',
          address,
          walletType: connector?.id,
         },
         AnalyticsEventImportance.low
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
        context: 'navbar'
      },
      AnalyticsEventImportance.low
    );
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
