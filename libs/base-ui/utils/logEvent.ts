declare const window: Window &
  typeof globalThis & {
    ClientAnalytics: {
      logEvent: (name: string, event: unknown, importance: string) => void;
      sendScheduledEvents: (importance: string | null) => void;
      flushQueue: () => void;
      AnalyticsEventImportance: {low: 'low', high: 'high'};
    };
  };

const cca = window.ClientAnalytics;

export default function logEvent(name: string, event: unknown) {
  if (cca) {
    cca?.logEvent(name, event, cca.AnalyticsEventImportance.low);
  }
}

export function logEventAndSend(name: string, event: unknown) {
  if (cca) {
    cca?.logEvent(name, event, cca.AnalyticsEventImportance.high);
  }
}

export function identify(event: unknown) {
  if (cca) {
    cca?.logEvent('identify', event, cca.AnalyticsEventImportance.low);
  }
}
