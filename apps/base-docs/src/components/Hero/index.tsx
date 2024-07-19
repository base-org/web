import React, { useEffect, useState } from 'react';

import styles from './styles.module.css';
import BarChart from './BarChart/BarChart';

export default function Hero() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  if (windowWidth <= 500) {
    return <MobileHero />;
  }
  return <DesktopHero />;
}

function DesktopHero() {
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
          <button className={styles.ctaButton}>
            <a href="/docs">LEARN MORE</a>
          </button>
        </div>
        <div className={styles.secondaryTitleContainer}>
          <h1 className={styles.heroTitle}>for less</h1>
        </div>
      </div>
    </header>
  );
}

function MobileHero() {
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
          <button className={styles.ctaButton}>
            <a href="/docs">LEARN MORE</a>
          </button>
        </div>
      </div>
    </header>
  );
}
