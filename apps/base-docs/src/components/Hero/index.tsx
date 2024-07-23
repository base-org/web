import React from 'react';

import { useExperiments } from 'base-ui/contexts/Experiments';

import ControlHero from './ControlHero';
import TreatmentHero from './TreatmentHero';
import styles from './styles.module.css';

const EXPERIMENT_KEY = 'build-onchain-for-less-hero-2024-07-23';

export default function Hero() {
  const { isReady, getUserVariant } = useExperiments();
  const userVariant = getUserVariant(EXPERIMENT_KEY);

  if (!isReady) {
    return <HeroLoadingState />;
  }
  if (userVariant === 'treatment') {
    return <TreatmentHero />;
  }
  return <ControlHero />;
}

function HeroLoadingState() {
  return (
    <div className={styles.loadingState}>
      <div className={styles.loadingStateImg}></div>
    </div>
  );
}
