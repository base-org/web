import { EthBalance, Identity, Name } from '@coinbase/onchainkit/identity';
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownBaseName,
  WalletDropdownDisconnect,
  WalletDropdownLink,
} from '@coinbase/onchainkit/wallet';
import { useChainModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { Button, ButtonSizes, ButtonVariants } from 'apps/web/src/components/Button/Button';
import { UserAvatar } from 'apps/web/src/components/ConnectWalletButton/UserAvatar';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { ShinyButton } from 'apps/web/src/components/ShinyButton/ShinyButton';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import logEvent, {
  ActionType,
  AnalyticsEventImportance,
  ComponentType,
  identify,
} from 'base-ui/utils/logEvent';
import sanitizeEventString from 'base-ui/utils/sanitizeEventString';
import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { useCopyToClipboard } from 'usehooks-ts';
import { useAccount, useChains } from 'wagmi';

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
  // Rainbow kit
  const { openConnectModal } = useConnectModal();
  const { openChainModal } = useChainModal();
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Wagmi
  const { address, connector, isConnected, isConnecting, isReconnecting, chain } = useAccount();
  const chains = useChains();
  const chainSupported = !!chain && chains.includes(chain);
  const { basenameChain } = useBasenameChain();
  const [, copy] = useCopyToClipboard();
  const copyAddress = useCallback(() => void copy(address ?? ''), [address, copy]);

  useEffect(() => {
    if (address) {
      logEvent(
        'wallet_connected',
        {
          action: ActionType.change,
          context: 'navbar',
          address,
          wallet_type: sanitizeEventString(connector?.name),
          wallet_connector_id: connector?.id,
        },
        AnalyticsEventImportance.low,
      );
      identify({ userId: address });
    }
  }, [address, connector]);

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

  const userAddressClasses = classNames('text-lg font-display', {
    'text-white': color === 'white',
    'text-black': color === 'black',
  });

  if (isConnecting || isReconnecting || !isMounted) {
    return <Icon name="spinner" color="currentColor" />;
  }

  if (!isConnected) {
    const shinyButton = connectWalletButtonVariant === ConnectWalletButtonVariants.Shiny;
    return shinyButton ? (
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

  if (!chainSupported) {
    return (
      <Button
        variant={ButtonVariants.Black}
        size={ButtonSizes.Small}
        onClick={openChainModal}
        rounded
      >
        Wrong network, get based
      </Button>
    );
  }

  return (
    <Wallet>
      <ConnectWallet
        withWalletAggregator
        className="rounded-none bg-transparent p-2 hover:bg-gray-40/20"
      >
        <UserAvatar />
        <Name chain={basenameChain} className={userAddressClasses} />
      </ConnectWallet>
      <WalletDropdown className="rounded bg-white font-sans shadow-md">
        <Identity className={classNames('px-4 pb-2 pt-3 font-display', className)}>
          <UserAvatar />
          <Name
            onClick={copyAddress}
            chain={basenameChain}
            className="cursor-pointer font-display transition-all hover:opacity-65"
          />
          <EthBalance className="font-display" />
        </Identity>
        <WalletDropdownBaseName className="font-display hover:bg-gray-40/20" />
        <WalletDropdownLink
          icon="wallet"
          href="https://wallet.coinbase.com"
          target="_blank"
          className="font-display hover:bg-gray-40/20"
        >
          Go to Wallet Dashboard
        </WalletDropdownLink>
        <WalletDropdownDisconnect className="font-display hover:bg-gray-40/20" />
      </WalletDropdown>
    </Wallet>
  );
}
