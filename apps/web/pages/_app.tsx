import './global.css';

import { useState, useEffect, useCallback, useRef } from 'react';
import App, { AppContext, AppProps } from 'next/app';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { MotionConfig } from 'framer-motion';

import { Provider, Region, TrackingCategory, TrackingPreference } from '@coinbase/cookie-manager';
import { Layout } from '../src/components/Layout/Layout';

import { cookieManagerConfig } from '../src/utils/cookieManagerConfig';
import initCCA from '../src/utils/initCCA';

/* Adding this to force NextJS to render the app on the server at runtime instead of statically
which allows us to use ENV vars in the way we expect (Codeflow does not insert ENV vars at Dockerfile build time, so statically rendered pages don't have access) */
export async function getInitialProps(context: AppContext) {
  const appProps = await App.getInitialProps(context);
  return appProps;
}

export default function StaticApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const handleScriptLoad = useCallback(() => initCCA(router), [router]);

  // Cookie Consent Manager Provider Configuration
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

  if (!isMounted) return null;

  return (
    <Provider
      projectName="base_web"
      locale="en"
      region={Region.DEFAULT}
      log={console.log}
      onError={handleLogError}
      onPreferenceChange={setTrackingPreference}
      config={cookieManagerConfig}
    >
      <MotionConfig reducedMotion="user">
        <Script
          src="https://static-assets.coinbase.com/js/cca/v0.0.1.js"
          onLoad={handleScriptLoad}
        />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MotionConfig>
    </Provider>
  );
}

StaticApp.getInitialProps = getInitialProps;
