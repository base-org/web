// The CCA team said this lite version of the library is temporary and not officially supported.
// They recommended disabling linting and type-checking for now, since this version is not typed.
/* eslint-disable */
// @ts-nocheck
import { NextRouter } from 'next/router';
import { TrackingPreference } from '@coinbase/cookie-manager';
import { uuid } from 'uuidv4';
import { isDevelopment } from 'apps/web/src/constants';

import { Experiment } from '@amplitude/experiment-js-client';
import logEvent, { AnalyticsEventImportance } from 'libs/base-ui/utils/logEvent';

// CCA library loads in ClientAnalyticsScript component
const initCCA = async (
  router: NextRouter,
  trackingPreference: TrackingPreference | undefined,
  deviceIdCookie: string | undefined,
  setDeviceIdCookie,
) => {
  let deviceId: string | undefined = deviceIdCookie;
  const trackingAllowed: boolean = trackingPreference?.consent.includes('performance');
  const amplitudeApiKey: string = isDevelopment
    ? 'ca92bbcb548f7ec4b8ebe9194b8eda81'
    : '2b38c7ac93c0dccc83ebf9acc5107413';

  if (!trackingAllowed) {
    deviceId = 'base_web_device_id';
  } else if (!deviceId) {
    deviceId = uuid();
    setDeviceIdCookie(deviceId);
  }

  if (window.ClientAnalytics) {
    const { init, identify, identity, PlatformName, initNextJsTrackPageview } =
      window.ClientAnalytics;

    init({
      isProd: !isDevelopment,
      amplitudeApiKey,
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

    const experiment = Experiment.initialize('client-Wvf63OdaukDZyCBtwgbOvHgGTuASBZFG', {
      exposureTrackingProvider: {
        track: (exposure) => {
          logEvent(
            '$exposure',
            {
              ...exposure,
            },
            AnalyticsEventImportance.high,
          );
        },
      },
      userProvider: {
        getUser: () => {
          return {
            user_id: identity.userId,
            device_id: identity.deviceId,
            os: identity.device_os,
            language: identity.languageCode,
            country: identity.countryCode,
          };
        },
      },
    });

    await experiment.start({ device_id: deviceId });
  }
};

export default initCCA;
