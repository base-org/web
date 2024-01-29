// The CCA team said this lite version of the library is temporary and not officially supported.
// They recommended disabling linting and type-checking for now, since this version is not typed.
/* eslint-disable */
// @ts-nocheck
import getConfig from 'next/config';
import { NextRouter } from 'next/router';
import { TrackingPreference } from '@coinbase/cookie-manager';
import { uuid } from 'uuidv4';

const { publicRuntimeConfig } = getConfig();
const isDevelopment = publicRuntimeConfig.nodeEnv === 'development';

// CCA library loads in ClientAnalyticsScript component
const initCCA = (
  router: NextRouter,
  trackingPreference: TrackingPreference | undefined,
  deviceIdCookie: string | undefined,
  setDeviceIdCookie,
) => {
  let deviceId: string | undefined = deviceIdCookie;
  const trackingAllowed: boolean = trackingPreference?.consent.includes('performance');
  const cookieDomain = isDevelopment ? document.location.hostname : 'base.org';

  if (!trackingAllowed) {
    deviceId = 'base_web_device_id';
  } else if (!deviceId) {
    deviceId = uuid();
    setDeviceIdCookie(deviceId, { domain: cookieDomain });
  }

  if (window.ClientAnalytics) {
    const { init, identify, PlatformName, initNextJsTrackPageview } = window.ClientAnalytics;

    init({
      isProd: !isDevelopment,
      amplitudeApiKey: isDevelopment
        ? 'ca92bbcb548f7ec4b8ebe9194b8eda81'
        : '2b38c7ac93c0dccc83ebf9acc5107413',
      platform: PlatformName.web,
      projectName: 'base_web',
      showDebugLogging: isDevelopment,
      version: '1.0.0',
      apiEndpoint: 'https://cca-lite.coinbase.com',
    });

    identify({ deviceId: deviceId });

    initNextJsTrackPageview({
      nextJsRouter: router,
    });
  }
};

export default initCCA;
