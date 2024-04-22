import Link from 'next/link';
import { useRouter } from 'next/router';

import { Logo } from '../../Logo/Logo';
import DesktopNav from './DesktopNav';
import MobileMenu from './MobileMenu';

type NavProps = {
  color: 'white' | 'black';
};

export function Nav({ color }: NavProps) {
  const { pathname } = useRouter();

  return (
    <nav className="bg-transparent z-10 flex h-24 w-full max-w-[1440px] flex-row items-center justify-between self-center p-8">
      <Link href="/">
        <Logo color={color} path={pathname} />
      </Link>
      <DesktopNav color={color} />
      <MobileMenu color={color} />
    </nav>
  );
}
