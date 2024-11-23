import React, { useCallback } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import Icon from '../Icon';
import logEvent, {
  ActionType,
  AnalyticsEventImportance,
  ComponentType,
} from 'base-ui/utils/logEvent';

import styles from './styles.module.css';

type BannerName = `${string}Banner`;

type BannerProps = {
  href: string;
  text: string;
  bannerName: BannerName;
};

export default function Banner({ href, text, bannerName }: BannerProps) {
  const [isBannerVisible, setIsBannerVisible] = useLocalStorage(`${bannerName}Visible`, true);

  const linkClick = useCallback(() => {
    logEvent(
      bannerName,
      {
        action: ActionType.click,
        componentType: ComponentType.banner,
        context: 'navbar',
      },
      AnalyticsEventImportance.low,
    );
  }, [logEvent, ActionType, ComponentType, AnalyticsEventImportance]);

  const hideBanner = useCallback(() => {
    setIsBannerVisible(false);
  }, [setIsBannerVisible]);

  if (!isBannerVisible) {
    return null;
  }

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerInner}>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label="Onchain Summer Buildathon Banner"
          onClick={linkClick}
        >
          <span className={styles.bannerText}>{text}</span>
        </a>
        <div className={styles.bannerIconContainer}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label="Onchain Summer Buildathon Banner"
            onClick={linkClick}
          >
            <span className={styles.bannerSpacer} />
          </a>
          <button
            className={styles.bannerIconButton}
            onClick={hideBanner}
            onKeyDown={hideBanner}
            type="button"
          >
            <Icon name="close" width="16" height="16" color="black" />
          </button>
        </div>
      </div>
    </div>
  );
}
