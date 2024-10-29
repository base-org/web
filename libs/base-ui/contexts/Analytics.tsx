'use client';

import { isDevelopment } from '../constants';
import logEvent, { ActionType, AnalyticsEventImportance, CCAEventData } from '../utils/logEvent';
import React, { ReactNode, createContext, useCallback, useContext, useMemo } from 'react';

export type AnalyticsContextProps = {
  logEventWithContext: (eventName: string, action: ActionType, eventData?: CCAEventData) => void;
  fullContext: string;
};

export const AnalyticsContext = createContext<AnalyticsContextProps>({
  logEventWithContext: () => undefined,
  fullContext: '',
});

export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}

type AnalyticsProviderProps = {
  children?: ReactNode;
  context: string;
};

export default function AnalyticsProvider({ children, context }: AnalyticsProviderProps) {
  const fullContext = context ? context : '';
  
  const logEventWithContext = useCallback(
    (eventName: string, action: ActionType, eventData?: CCAEventData) => {
      const sanitizedEventName = eventName.toLowerCase();
      if (typeof window === 'undefined') return;

      if (isDevelopment) {
        console.log('\nlogEventWithContext:', {
          eventName,
          sanitizedEventName,
          action,
          fullContext,
          page_path: window.location.pathname,
          ...eventData,
        });
      } else {
        logEvent(
          sanitizedEventName,
          {
            action,
            context: fullContext,
            page_path: window.location.pathname,
            ...eventData,
          },
          AnalyticsEventImportance.high,
        );
      }
    },
    [fullContext],
  );

  const values = useMemo(() => ({ logEventWithContext, fullContext }), [
    fullContext,
    logEventWithContext,
  ]);

  return <AnalyticsContext.Provider value={values}>{children}</AnalyticsContext.Provider>;
}
