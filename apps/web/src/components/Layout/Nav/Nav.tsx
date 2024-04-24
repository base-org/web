import Link from 'next/link';
import { useRouter } from 'next/router';

import { Logo } from '../../Logo/Logo';
import DesktopNav from './DesktopNav';
import MobileMenu from './MobileMenu';
import { useLocalStorage } from 'usehooks-ts';
import { useCallback } from 'react';
import { Icon } from 'apps/web/src/components/Icon/Icon';

type NavProps = {
  color: 'white' | 'black';
};

function NftBanner() {
  const [isBannerVisible, setIsBannerVisible] = useLocalStorage('isNftBannerVisible', true);

  const hideBanner = useCallback(() => {
    setIsBannerVisible(false);
  }, [setIsBannerVisible]);

  if (!isBannerVisible) {
    return null;
  }

  return (
    <div className="z-10 flex w-full flex-row justify-center bg-black">
      <div className="z-10 flex w-full max-w-[1440px] flex-row items-center justify-between self-center bg-black p-2 pl-8 pr-6">
        <Link href="/builder-anniversary-nft" onClick={hideBanner}>
          <span className="text-xs text-white md:text-sm">
            Claim your base builder mainnet NFT!
            <span className="hidden text-white md:inline"> Available for a limited time</span>
          </span>
        </Link>
        <div className="flex flex-row items-center gap-4">
          <Link href="/builder-anniversary-nft" onClick={hideBanner}>
            <span className="text-xs text-white md:text-sm">Go to mint page</span>
          </Link>
          <button
            className="cursor-pointer p-2 text-sm text-white"
            onClick={hideBanner}
            onKeyDown={hideBanner}
            type="button"
          >
            <Icon name="close" color="white" width="16" height="16" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Nav({ color }: NavProps) {
  const { pathname } = useRouter();

  return (
    <>
      <NftBanner />
      <nav className="bg-transparent z-10 flex h-24 w-full max-w-[1440px] flex-row items-center justify-between self-center p-8">
        <Link href="/" aria-label="Base Homepage">
          <Logo color={color} path={pathname} />
        </Link>
        <DesktopNav color={color} />
        <MobileMenu color={color} />
      </nav>
    </>
  );
}
