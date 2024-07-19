// The CCA team said this lite version of the library is temporary and not officially supported.
// They recommended disabling linting and type-checking for now, since this version is not typed.
/* eslint-disable */
// @ts-nocheck
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { setCookie, getCookie, deserializeCookie } from './cookieManagement';
import { TrackingPreference } from '@coinbase/cookie-manager';
import { isDevelopment, amplitudeApiKey } from '../constants';


// Initialize Client Analytics
const initCCA = () => {
  if (ExecutionEnvironment.canUseDOM) {
    let deviceId: string | undefined = deserializeCookie(getCookie('base_device_id'));

    const trackingPreference: TrackingPreference | undefined = deserializeCookie(
      getCookie('cm_default_preferences'),
    );
    const trackingAllowed = trackingPreference?.consent.includes('performance');

    if (!trackingAllowed) {
      deviceId = 'base_docs_device_id';
    } else if (!deviceId) {
      deviceId = crypto?.randomUUID();
      setCookie('base_device_id', deviceId, 365);
    }

    if (window.ClientAnalytics) {
      const { init, identify, PlatformName } = window.ClientAnalytics;

      init({
        isProd: !isDevelopment,
        amplitudeApiKey: amplitudeApiKey,
        platform: PlatformName.web,
        projectName: 'base_docs',
        showDebugLogging: isDevelopment,
        version: '1.0.0',
        apiEndpoint: 'https://cca-lite.coinbase.com',
      });

      identify({ deviceId: deviceId });
    }
  }
};

export default initCCA();

// Track Pageviews
export function onRouteDidUpdate({ location, previousLocation }) {
  if (location.pathname !== previousLocation?.pathname && window.ClientAnalytics) {
    const { logEvent } = window.ClientAnalytics;

    let path: string = location.pathname;
    let prevPath: string = previousLocation?.pathname;

    // Remove trailing slashes
    if (path !== '/' && path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    if (prevPath && prevPath !== '/' && prevPath.endsWith('/')) {
      prevPath = prevPath.slice(0, -1);
    }

    logEvent('pageview', {
      page_path: path,
      prev_page_path: prevPath,
    });
  }
}
