'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/dist/client/components/navigation';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import { Logo } from '../../Logo/Logo';
import DesktopNav from './DesktopNav';
import MobileMenu from './MobileMenu';

const DynamicBanner = dynamic(async () => import('base-ui/components/Layout/Nav/Banner'), {
  ssr: false,
});

const BLACK_NAV_PATHS = [
  '/',
  '/jobs/apply',
  '/cookie-policy',
  '/third-party-cookies',
  '/onchainsummer',
  '/name',
];

export default function Nav() {
  const pathname = usePathname();
  const color = pathname && BLACK_NAV_PATHS.includes(pathname) ? 'black' : 'white';
  return (
    <AnalyticsProvider context='navbar'>
      <DynamicBanner
        bannerName="onchainKitBanner"
        href="https://onchainkit.xyz/?utm_source=basedotorg&utm_medium=banner"
        text="Build on Base in minutes with OnchainKit!"
      />
      <nav className="z-10 flex h-24 w-full max-w-[1440px] flex-row items-center justify-between gap-16 self-center bg-transparent p-8">
        <Link href="/" aria-label="Base Homepage">
          <Logo color={color} width="106px" />
        </Link>
        <DesktopNav color={color} />
        <MobileMenu color={color} />
      </nav>
    </AnalyticsProvider>
  );
}
