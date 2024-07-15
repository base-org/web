import { useEffect, useState } from 'react';
import { Experiment } from '@amplitude/experiment-js-client';


export default function useVariant(
  flagKey: string,
  deploymentKey = 'client-Wvf63OdaukDZyCBtwgbOvHgGTuASBZFG',
): string {
  const [variant, setVariant] = useState('');

  useEffect(() => {
    try {
      const experiment = Experiment.initialize(deploymentKey);
      const userVariant = experiment.variant(flagKey);
      setVariant(userVariant.value ?? '');
    } catch (exception) {
      console.error(`Error fetching variant for flag ${flagKey}:`, exception);
      setVariant('');
    }
  }, [deploymentKey, flagKey]);

  return variant;
}
