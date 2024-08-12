'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export type NextJsRouterEventTypes =
  | 'routeChangeStart'
  | 'beforeHistoryChange'
  | 'routeChangeComplete'
  | 'routeChangeError'
  | 'hashChangeStart'
  | 'hashChangeComplete';

export type AnalyticsEventHandler = () => void;

export type NextJSRouter = Record<string, unknown> & {
  events: {
    on: (event: NextJsRouterEventTypes, callback: AnalyticsEventHandler) => void;
  };
};

export default function ClientAnalyticsScript() {
  // Coinbase's CCA is designed for Page Router.
  // CCA cannot use the App router logic, since "router.events.on" is deprecated.
  // As a result we have to mock this behavior

  // CCA expects to call a handler on path change, so we need to

  // 1. Keep track of the path
  const pathname = usePathname();

  // 2. Keep track of the handler
  const onRouteChangeHandler = useRef<AnalyticsEventHandler | null>(null);

  // 4. Call the onRouteChangeHandler on page change via useEffect
  useEffect(() => {
    if (onRouteChangeHandler.current) {
      onRouteChangeHandler.current();
    }
  }, [onRouteChangeHandler, pathname]);

  return null;
}
