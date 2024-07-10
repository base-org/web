import React, { useCallback } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import Icon from '../Icon';
import logEvent, {
  ActionType,
  AnalyticsEventImportance,
  ComponentType,
} from 'base-ui/utils/logEvent';

import styles from './styles.module.css';

const href = 'https://www.base.org/onchainsummer?utm_source=DocsSite&utm_campaign=onchainsummer';

export function OcsBanner() {
  const [isBannerVisible, setIsBannerVisible] = useLocalStorage('isOcsBannerVisible', true);

  const linkClick = useCallback(() => {
    logEvent(
      'ocsbanner',
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
          <span className={styles.bannerText}>Build Onchain this Summer!</span>
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
            <Icon name="close" width="16" height="16" />
          </button>
        </div>
      </div>
    </div>
  );
}
