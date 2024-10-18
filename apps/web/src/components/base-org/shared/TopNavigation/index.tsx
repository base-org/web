'use client';

import AnalyticsProvider from 'apps/web/contexts/Analytics';
import Link from 'next/link';
import logo from './assets/logo.svg';
import Image, { StaticImageData } from 'next/image';
import {
  ConnectWalletButton,
  ConnectWalletButtonVariants,
} from 'apps/web/src/components/ConnectWalletButton/ConnectWalletButton';
import MenuDesktop from 'apps/web/src/components/base-org/shared/TopNavigation/MenuDesktop';
import MenuMobile from 'apps/web/src/components/base-org/shared/TopNavigation/MenuMobile';
import GasPriceDropdown from 'apps/web/src/components/base-org/shared/TopNavigation/GasPriceDropdown';
import { Suspense } from 'react';

export type SubItem = {
  name: string;
  href: string;
};

export type TopNavigationLink = {
  name: string;
  href: string;
  subItems: SubItem[];
  analyticContext: string;
};

const links: TopNavigationLink[] = [
  {
    name: 'Build',
    analyticContext: 'build',
    href: '/getstarted',
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
    analyticContext: 'explore',
    href: '/ecosystem',
    subItems: [
      { name: 'Apps', href: '/ecosystem' },
      { name: 'Bridge', href: 'https://bridge.base.org' },
    ],
  },
  {
    name: 'Community',
    analyticContext: 'community',
    href: '/',
    subItems: [
      {
        name: 'Grants',
        href: 'https://paragraph.xyz/@grants.base.eth/calling-based-builders',
      },
      {
        name: 'Events',
        href: 'https://lu.ma/BaseMeetups',
      },
    ],
  },
  {
    name: 'About',
    analyticContext: 'about',
    href: '/about',
    subItems: [
      { name: 'Vision', href: '/about' },
      { name: 'Blog', href: 'https://base.mirror.xyz/' },
      { name: 'Jobs', href: '/jobs' },
      { name: 'Media Kit', href: 'https://github.com/base-org/brand-kit' },
    ],
  },
  {
    name: 'Socials',
    analyticContext: 'socials',
    href: '#socials',
    subItems: [
      { name: 'X', href: 'https://x.com/base' },
      { name: 'Farcaster', href: 'https://warpcast.com/~/channel/base' },
      { name: 'Github', href: 'https://github.com/base-org' },
      { name: 'Discord', href: 'https://discord.com/invite/buildonbase' },
    ],
  },
];

export default function TopNavigation() {
  return (
    <AnalyticsProvider context="navbar">
      <nav className="fixed top-0 z-50 w-full shrink-0 px-[1rem] py-4 md:px-[1.5rem] lg:px-[2rem]">
        <div className="flex w-full items-center justify-between gap-2">
          {/* Logo and Gas price section */}
          <div className="relative z-20 flex items-center gap-4 md:min-w-[16rem]">
            <Link href="/" className="flex min-h-[3rem] min-w-[3rem]">
              <Image src={logo as StaticImageData} alt="Base Logo" />
            </Link>
            <GasPriceDropdown />
          </div>

          <div className="hidden md:inline-block">
            <MenuDesktop links={links} />
          </div>

          <div className="mr-auto inline-block md:hidden">
            <MenuMobile links={links} />
          </div>

          {/* Connect Wallet button */}
          <div className="flex items-end justify-end md:min-w-[16rem]">
            <Suspense>
              <ConnectWalletButton
                connectWalletButtonVariant={ConnectWalletButtonVariants.BaseOrg}
              />
            </Suspense>
          </div>
        </div>
      </nav>
    </AnalyticsProvider>
  );
}
