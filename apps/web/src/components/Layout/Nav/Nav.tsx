'use client';

import Link from 'next/link';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import DesktopNav from './DesktopNav';
import MobileMenu from './MobileMenu';
import logoWhite from './logoWhite.svg';
import Image, { StaticImageData } from 'next/image';

export default function Nav() {
  const color = 'white';
  const logo = logoWhite as StaticImageData;
  return (
    <AnalyticsProvider context="navbar">
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
