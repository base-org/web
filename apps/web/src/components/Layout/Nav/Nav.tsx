'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/dist/client/components/navigation';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import DesktopNav from './DesktopNav';
import MobileMenu from './MobileMenu';
import logoBlack from './logoBlack.svg';
import logoWhite from './logoWhite.svg';
import Image, { StaticImageData } from 'next/image';

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
  const logo = color === 'black' ? (logoBlack as StaticImageData) : (logoWhite as StaticImageData);
  return (
    <AnalyticsProvider context="navbar">
      <DynamicBanner
        bannerName="basenamesLaunchBanner"
        href="https://base.org/names?utm_source=dotorg&utm_medium=banner"
        text="Claim Your Basename Today!"
      />
      <nav className="z-10 flex h-24 w-full max-w-[1440px] flex-row items-center justify-between gap-16 self-center bg-transparent p-8">
        <Link href="/" aria-label="Base Homepage">
          <Image src={logo} alt="Base Logo" title="Base Logo" width="106" />
        </Link>
        <DesktopNav color={color} />
        <MobileMenu color={color} />
      </nav>
    </AnalyticsProvider>
  );
}
