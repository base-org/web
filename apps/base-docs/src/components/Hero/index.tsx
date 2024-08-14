import React from 'react';
import styles from './styles.module.css';
import HeroButton from './HeroButton/index';


export default function Hero() {
  return (
    <header className={styles.heroContainer}>
      <div className="layout-container">
        <div className={styles.heroTextContainer}>
          <h1 className={styles.heroText}>Everything you need to build onchain</h1>
        </div>
        <HeroButton />
      </div>
    </header>
  );
}
