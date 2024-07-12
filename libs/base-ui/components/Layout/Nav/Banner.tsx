import React from 'react';
import Link from 'next/link';
import { useLocalStorage } from 'usehooks-ts';
import { useCallback } from 'react';
import { usePathname } from 'next/navigation';

import { Icon } from 'libs/base-ui/index';

type BannerProps = {
  href: string;
  text: string;
};

export default function Banner({ href, text }: BannerProps) {
  const [isBannerVisible, setIsBannerVisible] = useLocalStorage('isOcsBannerVisible', true);
  const pathname = usePathname();
  const isOnPage = pathname === href.split('?')[0];

  const hideBanner = useCallback(() => {
    setIsBannerVisible(false);
  }, [setIsBannerVisible]);

  if (!isBannerVisible || isOnPage) {
    return null;
  }

  return (
    <div className="bg-yellow-20 z-10 flex w-full flex-row justify-center text-black">
      <div className="bg-yellow-20 z-10 flex w-full max-w-[1440px] flex-row items-center justify-between self-center p-2 pl-8 pr-6">
        <Link href={href}>
          <span className="text-xs  md:text-base">{text}</span>
        </Link>
        <div className="flex flex-row items-center gap-4">
          <button
            className="cursor-pointer p-2 text-sm"
            onClick={hideBanner}
            onKeyDown={hideBanner}
            type="button"
          >
            <Icon name="close" color="black" width="16" height="16" />
          </button>
        </div>
      </div>
    </div>
  );
}
