import React from 'react';

import HeroButton from '../HeroButton';
import styles from './styles.module.css';

export default function ControlHero() {
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
