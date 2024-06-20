import React from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { useCallback } from 'react';
import Icon from '../Icon';
import { useLocation } from '@docusaurus/router';

import styles from './styles.module.css';

const href = '/onchainsummer?utm_source=dotorg&utm_campaign=onchainsummer';

export function OcsBanner() {
  const [isBannerVisible, setIsBannerVisible] = useLocalStorage('isOcsBannerVisible', true);
    const { pathname, search, hash } = useLocation();
    console.log({ pathname, search, hash });
  const isOnPage = pathname === href.split('?')[0];

  const hideBanner = useCallback(() => {
    setIsBannerVisible(false);
  }, [setIsBannerVisible]);

  if (!isBannerVisible || isOnPage) {
    return null;
  }

  return (
    // <div className="z-10 flex w-full flex-row justify-center bg-yellow text-black">
    <div className={styles.bannerContainer}>
      {/* <div className="z-10 flex w-full max-w-[1440px] flex-row items-center justify-between self-center bg-yellow p-2 pl-8 pr-6"> */}
      <div className={styles.bannerInner}>
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label="Onchain Summer Buildathon Banner"
        >
            {/* <span className="text-xs  md:text-base">Join the Onchain Summer Buildathon!</span> */}
            <span className={styles.bannerText}>Join the Onchain Summer Buildathon!</span>
        </a>
        {/* <div className="flex flex-row items-center gap-4"> */}
        <div className={styles.bannerIconContainer}>
            <a
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label="Onchain Summer Buildathon Banner"
            >
                {/* <span className="hidden text-xs md:inline md:text-base" /> */}
                <span className={styles.bannerSpacer} />
            </a>
          <button
            // className="cursor-pointer p-2 text-sm"
            className={styles.bannerIconButton}
            onClick={hideBanner}
            onKeyDown={hideBanner}
            type="button"
          >
            <Icon name="close" width="16" height="16" />
          </button>
        </div>
      </div>
    </div>
  );
}
