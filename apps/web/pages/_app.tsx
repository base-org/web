import './global.css';

import { useState, useEffect, useCallback, useRef } from 'react';
import { AppProps } from 'next/app';
import { MotionConfig } from 'framer-motion';
import {
  Provider as CookieManagerProvider,
  Region,
  TrackingCategory,
  TrackingPreference,
} from '@coinbase/cookie-manager';

import { Layout } from '../src/components/Layout/Layout';
import ClientAnalyticsScript from '../src/components/ClientAnalyticsScript/ClientAnalyticsScript';

import { cookieManagerConfig } from '../src/utils/cookieManagerConfig';
import { useSprig } from 'apps/web/src/utils/hooks/useSprig';

export default function StaticApp({ Component, pageProps }: AppProps) {
  // Cookie Manager Provider Configuration
  const [isMounted, setIsMounted] = useState(false);
  const trackingPreference = useRef<TrackingPreference | undefined>();

  const setTrackingPreference = useCallback((newPreference: TrackingPreference) => {
    const priorConsent = trackingPreference.current?.consent;
    trackingPreference.current = newPreference;

    if (!priorConsent) {
      // The first time the modal appears, this function is called with nothing present in
      // trackingPreference.current. To avoid an infinite refresh loop, we return early on
      // the first call.
      return;
    }

    const newConsent = newPreference.consent;

    // Check if the preferences have changed.
    const diff = [
      ...priorConsent.filter((elem: TrackingCategory) => !newConsent.includes(elem)),
      ...newConsent.filter((elem: TrackingCategory) => !priorConsent.includes(elem)),
    ];

    // Reload if the preferences have changed.
    if (diff.length > 0) {
      window.location.reload();
    }
  }, []);

  const handleLogError = useCallback((err: Error) => console.error(err), []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useSprig();

  if (!isMounted) return null;

  return (
    <CookieManagerProvider
      projectName="base_web"
      locale="en"
      region={Region.DEFAULT}
      log={console.log}
      onError={handleLogError}
      onPreferenceChange={setTrackingPreference}
      config={cookieManagerConfig}
    >
      <MotionConfig reducedMotion="user">
        <ClientAnalyticsScript />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MotionConfig>
    </CookieManagerProvider>
  );
}
