import { useChainModal, useConnectModal } from '@rainbow-me/rainbowkit';
import { Button, ButtonSizes, ButtonVariants } from 'apps/web/src/components/Button/Button';
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
import { useAccount, useChains } from 'wagmi';
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import { Name, Identity, EthBalance } from '@coinbase/onchainkit/identity';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import useBaseEnsName from 'apps/web/src/hooks/useBaseEnsName';
import Link from 'next/link';

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

  // Wagmi
  const { address, connector, isConnected, isConnecting, isReconnecting, chain } = useAccount();
  const chains = useChains();
  const chainSupported = !!chain && chains.includes(chain);
  const { basenameChain } = useBasenameChain();

  const { data: baseName, isLoading } = useBaseEnsName({ address });

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
  }, [address, connector?.name]);

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

  if (isConnecting || isReconnecting) {
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
      <button className="px-2 py-1" onClick={openChainModal} type="button">
        Wrong network
      </button>
    );
  }

  const onchainKitDropdownClasse = classNames(
    'cursor-pointer bg-ock-default active:bg-ock-default-active hover:bg-ock-default-hover',
    'flex items-center gap-2 px-4 py-2',
  );

  return (
    <Wallet>
      <ConnectWallet withWalletAggregator className="bg-transparent p-2 hover:bg-gray-40/20">
        <UserAvatar />
        <Name chain={basenameChain} className={userAddressClasses} />
      </ConnectWallet>
      <WalletDropdown>
        <Identity className={classNames('px-4 pb-2 pt-3', className)} hasCopyAddressOnClick>
          <UserAvatar />
          <Name chain={basenameChain} />
          <EthBalance />
        </Identity>
        {!isLoading && baseName && (
          <Link href={`/name/${baseName}`} className={onchainKitDropdownClasse}>
            <div className="flex w-full flex-row items-center gap-2">
              <span className="pl-1 text-blue-500">
                <Icon name="blueCircle" color="currentColor" height="0.8rem" width="0.8rem" />
              </span>
              <span>Go to your profile</span>
            </div>
          </Link>
        )}

        {!isLoading && !baseName && (
          <Link href="/names" className={onchainKitDropdownClasse}>
            <div className="flex w-full flex-row items-center gap-2">
              <span className="pl-1 text-blue-500">
                <Icon name="blueCircle" color="currentColor" height="0.8rem" width="0.8rem" />
              </span>
              <span>Claim a Basename</span>
              <span className="ml-auto animate-pulse pt-[2px] text-xs	font-bold	tracking-widest text-blue-500">
                NEW
              </span>
            </div>
          </Link>
        )}
        <WalletDropdownLink icon="wallet" href="https://wallet.coinbase.com">
          Go to Wallet Dashboard
        </WalletDropdownLink>
        <WalletDropdownDisconnect />
      </WalletDropdown>
    </Wallet>
  );
}
