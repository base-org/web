import React from 'react';

import { useExperiments } from 'base-ui/contexts/Experiments';

import ControlHero from './ControlHero';
import TreatmentHero from './TreatmentHero';

export default function Hero() {
  const { isReady, getUserVariant } = useExperiments();
  const userVariant = getUserVariant('hero-build-onchain-for-less');

  if (!isReady) {
    return '';
  }
  if (userVariant === 'treatment') {
    return <TreatmentHero />;
  }
  return <ControlHero />;
}
