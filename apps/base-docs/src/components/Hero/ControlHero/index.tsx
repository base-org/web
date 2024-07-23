import React from 'react';

import HeroButton from '../HeroButton';
import styles from './styles.module.css';

export default function ControlHero() {
  return (
    <header className={styles.heroContainer}>
      <div className="layout-container">
        <div className={styles.heroTextContainer}>
          <h1 className={styles.heroText}>EVERYTHING YOU NEED TO BUILD ONCHAIN</h1>
        </div>
        <HeroButton />
      </div>
    </header>
  );
}
