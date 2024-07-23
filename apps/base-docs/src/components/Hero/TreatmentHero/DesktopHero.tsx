import React, { useCallback } from 'react';

import logEvent from 'base-ui/utils/logEvent';

import HeroButton from '../HeroButton/index';
import BarChart from './BarChart';
import styles from './styles.module.css';

export default function DesktopHero() {
  return (
    <header className={styles.heroContainer}>
      <div>
        <h1 className={styles.heroTitle}>Build onchain</h1>
      </div>
      <div className={styles.chartContainer}>
        <BarChart />
      </div>
      <div className={styles.secondaryContentContainer}>
        <div>
          <div className={styles.ctaText}>
            Keep your costs low and save on gas with every transaction when you build on Base.
          </div>
          <HeroButton />
        </div>
        <div className={styles.secondaryTitleContainer}>
          <h1 className={styles.heroTitle}>for less</h1>
        </div>
      </div>
    </header>
  );
}
