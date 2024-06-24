import Link from 'next/link';
import { useRouter } from 'next/router';

import { Logo } from '../../Logo/Logo';
import DesktopNav from './DesktopNav';
import MobileMenu from './MobileMenu';
import { OcsBanner } from 'apps/web/src/components/Layout/Nav/OcsBanner';

type NavProps = {
  color: 'white' | 'black';
};

export function Nav({ color }: NavProps) {
  const { pathname } = useRouter();

  return (
    <>
      <OcsBanner />
      <nav className="z-20 flex h-24 w-full max-w-[1440px] flex-row items-center justify-between gap-16 self-center bg-transparent p-8">
        <Link href="/" aria-label="Base Homepage">
          <Logo color={color} path={pathname} width="106px" />
        </Link>
        <DesktopNav color={color} />
        <MobileMenu color={color} />
      </nav>
    </>
  );
}
