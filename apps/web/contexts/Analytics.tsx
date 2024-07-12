import logEvent, {
  ActionType,
  AnalyticsEventImportance,
  CCAEventData,
} from 'libs/base-ui/utils/logEvent';
import { ReactNode, createContext, useCallback, useContext, useMemo } from 'react';

export type AnalyticsContextProps = {
  logEventWithContext: (eventName: string, action: ActionType, eventData?: CCAEventData) => void;
};

export const AnalyticsContext = createContext<AnalyticsContextProps>({
  logEventWithContext: function () {
    return undefined;
  },
});

type AnalyticsProviderProps = {
  children?: ReactNode;
  context: string; // TODO: This could be an enum in CCAEventData
};

export default function AnalyticsProvider({ children, context }: AnalyticsProviderProps) {
  const logEventWithContext = useCallback(
    (eventName: string, action: ActionType, eventData?: CCAEventData) => {
      const sanitizedEventName = `${context}_${eventName}`.toLocaleLowerCase();
      logEvent(
        sanitizedEventName, // TODO: Do we want context here?
        {
          action: action,
          context: context,
          page_path: window.location.pathname,
          ...eventData,
        },
        AnalyticsEventImportance.high,
      );
    },
    [context],
  );

  const values = useMemo(() => {
    return { logEventWithContext };
  }, [logEventWithContext]);

  return <AnalyticsContext.Provider value={values}>{children}</AnalyticsContext.Provider>;
}

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within a AnalyticsProvider');
  }
  return context;
}
