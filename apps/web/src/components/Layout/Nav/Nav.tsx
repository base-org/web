import Link from 'next/link';
import { useRouter } from 'next/router';

import { Logo } from '../../Logo/Logo';
import DesktopNav from './DesktopNav';
import MobileMenu from './MobileMenu';
import Banner from 'base-ui/components/Layout/Nav/Banner'

type NavProps = {
  color: 'white' | 'black';
};

export function Nav({ color }: NavProps) {
  const { pathname } = useRouter();

  return (
    <>
      <Banner
        bannerName='onchainKitBanner'
        href="https://onchainkit.xyz/?utm_source=basedotorg&utm_medium=banner"
        text="Build on Base in minutes with OnchainKit!"
      />
      <nav className="bg-transparent z-10 flex h-24 w-full max-w-[1440px] flex-row items-center justify-between gap-16 self-center p-8">
        <Link href="/" aria-label="Base Homepage">
          <Logo color={color} path={pathname} width="106px" />
        </Link>
        <DesktopNav color={color} />
        <MobileMenu color={color} />
      </nav>
    </>
  );
}
