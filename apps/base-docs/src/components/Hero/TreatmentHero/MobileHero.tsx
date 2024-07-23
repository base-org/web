import React, { useCallback } from 'react';

import logEvent from 'base-ui/utils/logEvent';

import HeroButton from '../HeroButton/index';
import BarChart from './BarChart';
import styles from './styles.module.css';

export default function MobileHero() {
  return (
    <header className={styles.heroContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.heroTitle}>Build onchain for less</h1>
      </div>
      <div className={styles.chartContainerMobile}>
        <BarChart />
      </div>
      <div className={styles.secondaryContentContainerMobile}>
        <div className={styles.ctaContainer}>
          <div className={styles.ctaText}>
            Keep your costs low and save on gas with every transaction when you build on Base.
          </div>
          <HeroButton />
        </div>
      </div>
    </header>
  );
}
