'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useSavedTrackingPreference, useCookie } from '@coinbase/cookie-manager';
import { usePathname } from 'next/navigation';

import Script from 'next/script';
import initCCA from '../../utils/initCCA';

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
  const trackingPreference = useSavedTrackingPreference();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [deviceIdCookie, setDeviceIdCookie] = useCookie('base_device_id');

  const pathname = usePathname();
  const handler = useRef<AnalyticsEventHandler | null>(null);

  // Mock the old router since our CCA doesn't support Next App router yet
  const oldRouterEvent: NextJSRouter = useMemo(() => {
    return {
      events: {
        on: (event: NextJsRouterEventTypes, analyticsHandler: AnalyticsEventHandler) => {
          if (analyticsHandler) {
            handler.current = analyticsHandler;
          }
        },
      },
    };
  }, []);

  useEffect(() => {
    if (handler.current) {
      handler.current();
    }
  }, [handler, pathname]);

  return (
    <Script
      src="https://static-assets.coinbase.com/js/cca/v0.0.1.js"
      onLoad={useCallback(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        () => initCCA(oldRouterEvent, trackingPreference, deviceIdCookie, setDeviceIdCookie),
        [oldRouterEvent, trackingPreference, deviceIdCookie, setDeviceIdCookie],
      )}
    />
  );
}
