import Link from 'next/link';
import { useLocalStorage } from 'usehooks-ts';
import { useCallback } from 'react';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { usePathname } from 'next/navigation';

const href = '/builder-anniversary-nft?utm_source=website';
export function NftBanner() {
  const [isBannerVisible, setIsBannerVisible] = useLocalStorage('isNftBannerVisible', true);
  const pathname = usePathname();
  const isOnMintPage = pathname === '/builder-anniversary-nft';

  const hideBanner = useCallback(() => {
    setIsBannerVisible(false);
  }, [setIsBannerVisible]);

  if (!isBannerVisible || isOnMintPage) {
    return null;
  }

  return (
    <div className="z-10 flex w-full flex-row justify-center bg-yellow-20 text-black">
      <div className="z-10 flex w-full max-w-[1440px] flex-row items-center justify-between self-center bg-yellow-20 p-2 pl-8 pr-6">
        <Link href={href}>
          <span className="text-xs  md:text-base">
            Claim your Base Quest Anniversary NFT today!
          </span>
        </Link>
        <div className="flex flex-row items-center gap-4">
          <Link href={href}>
            <span className="hidden text-xs md:inline md:text-base">
              Check Your Eligibility Here
            </span>
          </Link>
          <button
            className="cursor-pointer p-2 text-sm"
            onClick={hideBanner}
            onKeyDown={hideBanner}
            type="button"
            aria-label="Close banner"
          >
            <Icon name="close" color="black" width="16" height="16" />
          </button>
        </div>
      </div>
    </div>
  );
}
