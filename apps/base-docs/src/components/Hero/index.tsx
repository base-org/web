import React from 'react';
import { useExperiment } from 'base-ui/contexts/Experiments';
import ControlHero from './ControlHero';
import TreatmentHero from './TreatmentHero';
import styles from './styles.module.css';

const EXPERIMENT_KEY = 'build-onchain-for-less-hero-2024-07-26';

export default function Hero() {
  const { isReady, userVariant } = useExperiment(EXPERIMENT_KEY);

  if (!isReady) {
    return <HeroLoadingState />;
  }
  if (userVariant === 'control') {
    return <ControlHero />;
  }
  return <TreatmentHero />;
}

function HeroLoadingState() {
  return (
    <div className={styles.loadingState}>
      <div className={styles.loadingStateImg} />
    </div>
  );
}
