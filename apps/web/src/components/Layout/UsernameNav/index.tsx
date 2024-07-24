import Link from 'next/link';
import usernameBaseLogo from './usernameBaseLogo.svg';
import Image from 'next/image';
import {
  ConnectWalletButton,
  ConnectWalletButtonVariants,
} from 'apps/web/src/components/ConnectWalletButton/ConnectWalletButton';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { useAccount } from 'wagmi';
import classNames from 'classnames';

export default function UsernameNav() {
  const { isConnected } = useAccount();

  const walletStateClasses = classNames('p2 rounded', {
    'bg-white': isConnected,
  });
  return (
    <nav className="absolute top-0 z-20 flex h-24 w-full max-w-[1440px] flex-row items-center justify-between gap-16 self-center bg-transparent px-4 md:px-8">
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
  );
}
