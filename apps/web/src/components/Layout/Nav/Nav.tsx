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
    <div className=" flex w-full flex-col">
      <div className="w-full bg-black px-8 py-3 text-center font-sans text-sm text-white">
        <span className="font-bold">Important:</span> Base’s testnet migration from Goerli to
        Sepolia will be finalized on 2/9/2024. Please{' '}
        <a href="https://goerli-bridge.base.org/withdraw" className="text-blue-400">
          withdraw
        </a>{' '}
        any testnet funds you want off of Base Goerli prior to this date. For more information,
        please read our{' '}
        <a
          href="https://base.mirror.xyz/-1DzslYOS7HRrbOrHdcz5sZmfIF_tpxJ-NRvcMmZ75c"
          className="text-blue-400"
        >
          post
        </a>
        .
      </div>
      <nav className="bg-transparent z-10 flex h-24 w-full max-w-[1440px] flex-row justify-between self-center p-8">
        <Link href="/">
          <Logo color={color} path={pathname} />
        </Link>
        <DesktopNav color={color} />
        <MobileMenu color={color} />
      </nav>
    </div>
  );
}
