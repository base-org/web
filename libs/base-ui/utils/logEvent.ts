declare const window: Window &
  typeof globalThis & {
    ClientAnalytics: {
      logEvent: (name: string, event: unknown, importance: string) => void;
      sendScheduledEvents: (importance: string | null) => void;
      flushQueue: () => void;
      AnalyticsEventImportance: {low: 'low', high: 'high'};
    };
  };

export default function logEvent(name: string, event: unknown) {
  const cca = window.ClientAnalytics;
  if (cca) {
    cca?.logEvent(name, event, cca.AnalyticsEventImportance.low);
  }
}

export function logEventAndSend(name: string, event: unknown) {
  const cca = window.ClientAnalytics;
  if (cca) {
    cca?.logEvent(name, event, cca.AnalyticsEventImportance.high);
  }
}

export function identify(event: unknown) {
  const cca = window.ClientAnalytics;
  if (cca) {
    cca?.logEvent('identify', event, cca.AnalyticsEventImportance.low);
  }
}
