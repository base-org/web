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
import logEvent, { AnalyticsEventImportance } from '../utils/logEvent';

declare const window: WindowWithAnalytics;

const ExperimentsContext = createContext<ExperimentsContextProps>({
  experimentClient: null,
  isReady: false,
  getUserVariant: () => '',
});

const experimentClient = Experiment.initialize(ampDeploymentKey, {
  exposureTrackingProvider: {
    track: (exposure) => {
      logEvent('$exposure', exposure, AnalyticsEventImportance.high);
    },
  },
  userProvider: {
    getUser: () => {
      return {
        user_id: window.ClientAnalytics.identity.userId,
        device_id: window.ClientAnalytics.identity.deviceId,
        os: window.ClientAnalytics.identity.device_os,
        language: window.ClientAnalytics.identity.languageCode,
        country: window.ClientAnalytics.identity.countryCode,
      };
    },
  },
});

export default function ExperimentsProvider({ children }: ExperimentsProviderProps) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function startExperiments() {
      try {
        await experimentClient.start();
      } catch (exception) {
        console.log(`Error starting experiments for ${ampDeploymentKey}:`, exception);
      } finally {
        setIsReady(true);
      }
    }
    void startExperiments();
  }, []);

  const getUserVariant = useCallback(
    (flagKey: string): string | undefined => {
      if (!isReady) {
        return undefined;
      }
      if (!experimentClient) {
        console.error('No experiment clients found');
        return undefined;
      }
      const variant = experimentClient.variant(flagKey);
      return variant.value;
    },
    [isReady],
  );

  const values = useMemo(() => {
    return { experimentClient, isReady, getUserVariant };
  }, [isReady, getUserVariant]);

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
  const userVariant = useMemo(() => {
    return getUserVariant(flagKey);
  }, [getUserVariant, flagKey]);

  return { isReady, userVariant };
};

export { useExperiments, useExperiment };

type WindowWithAnalytics = Window &
  typeof globalThis & {
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
