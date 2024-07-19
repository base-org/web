import React from 'react';
import styles from './styles.module.css';

export default function ControlHero() {
  return (
    <header className={styles.heroContainer}>
      <div className="layout-container">
        <div className={styles.heroTextContainer}>
          <h1 className={styles.heroText}>EVERYTHING YOU NEED TO BUILD ONCHAIN</h1>
        </div>
        <button className={styles.ctaButton}>
          <a href="/docs">LEARN MORE</a>
        </button>
      </div>
    </header>
  );
}
