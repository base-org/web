import React from 'react';

import styles from './styles.module.css';
import BarChart from './BarChart';
import HeroButton from '../HeroButton';

export default function TreatmentHero() {
  return (
    <header className={styles.heroContainer}>
      <div>
        <h1 className={styles.heroTitle}>Build onchain</h1>
        <h1 className={styles.heroTitleMobile}>Build onchain for less</h1>
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
