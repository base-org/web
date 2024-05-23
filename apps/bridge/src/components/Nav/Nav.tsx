import Link from 'next/link';

import { Logo } from '../Logo/Logo';
import DesktopNav from './DesktopNav';
import MobileMenu from './MobileMenu';

type NavProps = {
  color: 'white' | 'black';
};

export function Nav({ color }: NavProps) {
  return (
    <nav className="z-10 flex h-24 w-full max-w-[1440px] flex-row items-center justify-between gap-16 self-center bg-transparent p-8">
      <Link href="https://base.org" aria-label="Base Homepage">
        <Logo color={color} width="106px" />
      </Link>
      <DesktopNav color={color} />
      <MobileMenu color={color} />
    </nav>
  );
}
