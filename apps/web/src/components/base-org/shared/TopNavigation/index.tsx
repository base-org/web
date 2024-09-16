'use client';

import AnalyticsProvider from 'apps/web/contexts/Analytics';
import Link from 'next/link';
import logo from './assets/logo.svg';
import Image, { StaticImageData } from 'next/image';
import { useGasPrice } from 'wagmi';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import {
  ConnectWalletButton,
  ConnectWalletButtonVariants,
} from 'apps/web/src/components/ConnectWalletButton/ConnectWalletButton';
import MenuDesktop from 'apps/web/src/components/base-org/shared/TopNavigation/MenuDesktop';
import MenuMobile from 'apps/web/src/components/base-org/shared/TopNavigation/MenuMobile';

export type SubItem = {
  name: string;
  href: string;
};

export type TopNavigationLink = {
  name: string;
  href: string;
  emoji?: string;
  image?: string;
  subItems: SubItem[];
};

const links: TopNavigationLink[] = [
  {
    name: 'Build',
    href: '/getstarted',
    emoji: '🛠️',
    image:
      'https://images.unsplash.com/photo-1533564810842-e9a55942212f?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    subItems: [
      {
        name: 'Get Started',
        href: '/getstarted',
      },
      { name: 'Docs', href: 'https://docs.base.org' },
      { name: 'Learn', href: 'https://docs.base.org/base-learn/docs/welcome' },
      { name: 'Status Page', href: 'https://status.base.org' },
      { name: 'Block Explorer', href: 'https://base.blockscout.com' },
      { name: 'Bug Bounty', href: 'https://hackerone.com/coinbase' },
      { name: 'Github', href: 'https://github.com/base-org' },
    ],
  },
  {
    name: 'Explore',
    href: '/ecosystem',
    emoji: '🔍',
    subItems: [
      { name: 'Apps', href: '/ecosystem' },
      { name: 'Bridge', href: 'https://bridge.base.org' },
    ],
  },
  {
    name: 'Community',
    href: '/',
    emoji: '👥',
    subItems: [
      { name: 'Grants', href: 'https://paragraph.xyz/@grants.base.eth/calling-based-builders' },
    ],
  },
  {
    name: 'About',
    href: '/about',
    emoji: '📜',
    subItems: [
      { name: 'Vision', href: '/about' },
      { name: 'Blog', href: 'https://base.mirror.xyz/' },
      { name: 'Jobs', href: '/jobs' },
      { name: 'Media Kit', href: 'https://github.com/base-org/brand-kit' },
    ],
  },
  {
    name: 'Socials',
    href: '#socials',
    emoji: '🌐',
    subItems: [
      { name: 'X', href: 'https://x.com/base' },
      { name: 'Farcaster', href: 'https://warpcast.com/~/channel/base' },
      { name: 'Github', href: 'https://github.com/base-org' },
      { name: 'Discord', href: 'https://discord.com/invite/buildonbase' },
    ],
  },
];

export default function TopNavigation() {
  const { data: gasPriceInWei } = useGasPrice({
    query: {
      refetchInterval: 10_000,
    },
  });

  const convertWeiToMwei = (weiValue: bigint): number => {
    // 1 mwei = 10^6 wei
    const mweiValue = Number(weiValue) / 1_000_000;
    return Number(mweiValue.toFixed(2)); // Round to 2 decimal places
  };

  return (
    <AnalyticsProvider context="navbar">
      <nav className="fixed top-0 z-50 w-full shrink-0 px-[1rem] py-4 md:px-[1.5rem] lg:px-[2rem]">
        <div className="flex w-full items-center justify-between gap-2">
          {/* Logo and Gas price section */}
          <div className="relative z-20 flex items-center gap-4">
            <Link href="/" className="flex min-h-[2.875rem] min-w-[2.875rem]">
              <Image src={logo as StaticImageData} alt="Base Logo" />
            </Link>

            {gasPriceInWei && (
              <div className="flex hidden items-center gap-2 rounded-xl bg-black px-4 py-2 md:flex">
                <span className="animate-pulse text-palette-positive">
                  <Icon name="blueCircle" color="currentColor" height="0.75rem" width="0.75rem" />
                </span>
                <strong>{convertWeiToMwei(gasPriceInWei)}</strong>
                <small>Mgwei</small>
              </div>
            )}
          </div>

          <div className="hidden md:inline-block">
            <MenuDesktop links={links} />
          </div>

          <div className="mr-auto inline-block md:hidden">
            <MenuMobile links={links} />
          </div>

          {/* Connect Wallet button */}
          <div className="justify-end">
            <ConnectWalletButton connectWalletButtonVariant={ConnectWalletButtonVariants.BaseOrg} />
          </div>
        </div>
      </nav>
    </AnalyticsProvider>
  );
}
