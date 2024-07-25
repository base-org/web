import React from 'react';

import { useExperiments } from 'base-ui/contexts/Experiments';
import logEvent, {
  ActionType,
  AnalyticsEventImportance,
  ComponentType,
} from 'base-ui/utils/logEvent';

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

  logEvent(
    'exposure__build-onchain-for-less-hero-2024-07-23',
    {
      action: ActionType.view,
      componentType: ComponentType.page,
      variant: userVariant,
    },
    AnalyticsEventImportance.high,
  );
  if (userVariant === 'control') {
    return <ControlHero />;
  }
  return <TreatmentHero />;
}

function HeroLoadingState() {
  return (
    <div className={styles.loadingState}>
      <div className={styles.loadingStateImg}></div>
    </div>
  );
}
