import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';
import { Experiment, ExperimentClient } from '@amplitude/experiment-js-client';

type ExperimentsContextProps = {
  experimentClient: ExperimentClient | null;
  getUserVariant: (flagKey: string) => string;
};

type ExperimentsProviderProps = {
  children: ReactNode;
  deploymentKey: string;
};

const ExperimentsContext = createContext<ExperimentsContextProps>({
  experimentClient: null,
  getUserVariant: () => '',
});

export default function ExperimentsProvider({ children, deploymentKey }: ExperimentsProviderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [experimentClient, setExperimentClient] = useState<ExperimentClient | null>(null);

  useEffect(() => {
    setIsLoading(true);
    try {
      const experiment = Experiment.initialize(deploymentKey);
      setExperimentClient(experiment);
    } catch (exception) {
      console.log(`Error initializing experiments client for ${deploymentKey}:`, exception);
      setExperimentClient(null);
    } finally {
      setIsLoading(false);
    }
  }, [deploymentKey]);

  const getUserVariant = useCallback(
    (flagKey: string): string => {
      if (isLoading) {
        return '';
      }
      if (!experimentClient) {
        console.error('No experiment clients found');
        return '';
      }
      const variant = experimentClient.variant(flagKey);
      return variant.value ?? '';
    },
    [isLoading, experimentClient],
  );

  const values = useMemo(() => {
    return { experimentClient, getUserVariant };
  }, [experimentClient, getUserVariant]);

  return <ExperimentsContext.Provider value={values}>{children}</ExperimentsContext.Provider>;
}

const useExperiments = () => {
  const context = useContext(ExperimentsContext);
  if (context === undefined) {
    throw new Error('useExperiments must be used within an ExperimentsProvider');
  }
  return context;
};

export { useExperiments };
