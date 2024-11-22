'use client';
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from 'react';
import { Experiment, ExperimentClient } from '@amplitude/experiment-js-client';

import { ampDeploymentKey } from '../constants';
import logEvent, { ActionType, AnalyticsEventImportance, ComponentType } from '../utils/logEvent';

declare const window: WindowWithAnalytics;

const ExperimentsContext = createContext<ExperimentsContextProps>({
  experimentClient: null,
  isReady: false,
  getUserVariant: () => '',
});

export default function ExperimentsProvider({ children }: ExperimentsProviderProps) {
  const [isReady, setIsReady] = useState(false);
  const [experimentClient, setExperimentClient] = useState<ExperimentClient | undefined>();

  useEffect(() => {
    const initializeExperimentClient = async () => {
      try {
        const client = Experiment.initialize(ampDeploymentKey, {
          exposureTrackingProvider: {
            track: (exposure) => {
              logEvent(
                `exposure__${exposure.flag_key}`,
                {
                  action: ActionType.view,
                  componentType: ComponentType.page,
                  variant: exposure.variant,
                  flag_key: exposure.flag_key,
                  experiment_key: exposure.experiment_key,
                },
                AnalyticsEventImportance.high,
              );
            },
          },
          userProvider: {
            getUser: () => ({
              user_id: window.ClientAnalytics.identity.userId,
              device_id: window.ClientAnalytics.identity.deviceId,
              os: window.ClientAnalytics.identity.device_os,
              language: window.ClientAnalytics.identity.languageCode,
              country: window.ClientAnalytics.identity.countryCode,
            }),
          },
        });

        setExperimentClient(client);
      } catch (error) {
        console.error('Error initializing the experiment client:', error);
      }
    };

    initializeExperimentClient();
  }, []); // This effect now runs only once on component mount.

  const startExperiment = useCallback(async () => {
    if (experimentClient) {
      try {
        await experimentClient.start();
        setIsReady(true);
      } catch (error) {
        console.error(`Error starting experiments for ${ampDeploymentKey}:`, error);
      }
    }
  }, [experimentClient]);

  // Optimization: effects are now triggered by client initialization and experiment start.
  useEffect(() => {
    if (experimentClient) {
      startExperiment();
    }
  }, [experimentClient, startExperiment]); // Dependency on experimentClient.

  const getUserVariant = useCallback(
    (flagKey: string): string | undefined => {
      if (!isReady) {
        console.warn('Experiment client is not ready yet');
        return undefined;
      }
      if (!experimentClient) {
        console.error('Experiment client is not initialized');
        return undefined;
      }
      return experimentClient.variant(flagKey)?.value;
    },
    [experimentClient, isReady],
  );

  const values = useMemo(() => ({ experimentClient, isReady, getUserVariant }), [
    isReady,
    getUserVariant,
    experimentClient,
  ]);

  return <ExperimentsContext.Provider value={values}>{children}</ExperimentsContext.Provider>;
}

const useExperiments = () => {
  const context = useContext(ExperimentsContext);
  if (context === undefined) {
    throw new Error('useExperiments must be used within an ExperimentsProvider');
  }
  return context;
};

const useExperiment = (flagKey: string): UseExperimentReturnValue => {
  const { isReady, getUserVariant } = useExperiments();
  const userVariant = useMemo(() => getUserVariant(flagKey), [getUserVariant, flagKey]);

  return { isReady, userVariant };
};

export { useExperiments, useExperiment };

type WindowWithAnalytics = Window & {
  ClientAnalytics: {
    identity: {
      userId: string;
      deviceId: string;
      device_os: string;
      languageCode: string;
      countryCode: string;
    };
  };
};

type ExperimentsContextProps = {
  experimentClient: ExperimentClient | null;
  isReady: boolean;
  getUserVariant: (flagKey: string) => string | undefined;
};

type ExperimentsProviderProps = {
  children: ReactNode;
};

type UseExperimentReturnValue = {
  isReady: boolean;
  userVariant: string | undefined;
};
