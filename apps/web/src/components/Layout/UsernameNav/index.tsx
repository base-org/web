'use client';
import Link from 'next/link';
import usernameBaseLogo from './usernameBaseLogo.svg';
import Image from 'next/image';
import {
  ConnectWalletButton,
  ConnectWalletButtonVariants,
} from 'apps/web/src/components/ConnectWalletButton/ConnectWalletButton';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { useAccount, useSwitchChain } from 'wagmi';
import classNames from 'classnames';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { base, baseSepolia } from 'viem/chains';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { useCallback } from 'react';

export default function UsernameNav() {
  const { isConnected } = useAccount();
  const isDevelopment = process.env.NODE_ENV === 'development';
  const { basenameChain } = useBasenameChain();
  const { switchChain } = useSwitchChain();

  const showDevelopmentWarning = isDevelopment && basenameChain.id === base.id;
  const showProductionWarning = !isDevelopment && basenameChain.id === baseSepolia.id;

  const switchToMainnet = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      switchChain({ chainId: base.id });
    },
    [switchChain],
  );

  const switchToTestnet = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      switchChain({ chainId: baseSepolia.id });
    },
    [switchChain],
  );

  const walletStateClasses = classNames('p2 rounded', {
    'bg-white': isConnected,
  });

  const navigationClasses = classNames(
    'flex h-24 w-full max-w-[1440px] flex-row items-center justify-between gap-16 self-center bg-transparent px-4 md:px-8',
  );

  return (
    <div className="absolute top-0 z-20 flex w-full flex-col">
      {showDevelopmentWarning && (
        <div className="flex items-center  justify-center gap-2 bg-orange-10 p-2 text-center text-orange-80">
          <Icon name="info" color="currentColor" height="1rem" />
          <p>
            You are on Base Mainnet.{' '}
            <button
              className="text-orange-90 underline underline-offset-2"
              type="button"
              onClick={switchToTestnet}
            >
              Switch to Testnet
            </button>
            ?
          </p>
        </div>
      )}
      {showProductionWarning && (
        <div className="flex items-center  justify-center gap-2 bg-orange-10 p-2 text-center text-orange-80">
          <Icon name="info" color="currentColor" height="1rem" />
          <p>
            You are on Base Sepolia.{' '}
            <button
              className="text-orange-90 underline underline-offset-2"
              type="button"
              onClick={switchToMainnet}
            >
              Switch to Base Mainnet
            </button>{' '}
            to register a .base.eth name.
          </p>
        </div>
      )}
      <nav className={navigationClasses}>
        <Link href="/">
          <Image src={usernameBaseLogo as StaticImport} alt="Base" />
        </Link>
        <span className={walletStateClasses}>
          <ConnectWalletButton
            color="black"
            connectWalletButtonVariant={ConnectWalletButtonVariants.Default}
          />
        </span>
      </nav>
    </div>
  );
}
