'use client';

import { ReactNode, createContext, useCallback, useContext, useMemo } from 'react';
import logEvent, {
  ActionType,
  AnalyticsEventImportance,
  CCAEventData,
  AnalyticsContextType,
} from 'libs/base-ui/utils/logEvent';

export type AnalyticsContextProps = {
  logEventWithContext: (eventName: string, action: ActionType, eventData?: CCAEventData) => void;
  fullContext: string;
};

export const AnalyticsContext = createContext<AnalyticsContextProps>({
  logEventWithContext: function () {
    return undefined;
  },
  fullContext: '',
});

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within a AnalyticsProvider');
  }
  return context;
}

type AnalyticsProviderProps = {
  children?: ReactNode;
  context: AnalyticsContextType;
  parentContext?: string;
};

export default function AnalyticsProvider({ children, context, parentContext = '' }: AnalyticsProviderProps) {
  const fullContext = useMemo(() => {
    return [parentContext, context].filter((c) => !!c).join('_');
  }, [parentContext, context]);

  const logEventWithContext = useCallback(
    (eventName: string, action: ActionType, eventData?: CCAEventData) => {
      const sanitizedEventName = eventName.toLocaleLowerCase();
      if (typeof window === 'undefined') return;
      logEvent(
        sanitizedEventName,
        {
          action: action,
          context: fullContext,
          page_path: window.location.pathname,
          ...eventData,
        },
        AnalyticsEventImportance.high,
      );
    },
    [fullContext],
  );

  const values = useMemo(() => {
    return { logEventWithContext, context, fullContext };
  }, [context, fullContext, logEventWithContext]);

  return <AnalyticsContext.Provider value={values}>{children}</AnalyticsContext.Provider>;
}
