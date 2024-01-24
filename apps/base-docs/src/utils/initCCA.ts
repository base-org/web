// The CCA team said this lite version of the library is temporary and not officially supported.
// They recommended disabling linting and type-checking for now, since this version is not typed.
/* eslint-disable */
// @ts-nocheck
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { customFields } from './docusaurusCustomFields';

const isDevelopment = customFields.nodeEnv === 'development';

// Initialize Client Analytics
const initCCA = () => {
  if (ExecutionEnvironment.canUseDOM && window.ClientAnalytics) {
    const { init, identify, PlatformName } = window.ClientAnalytics;

    init({
      isProd: !isDevelopment,
      amplitudeApiKey: isDevelopment
        ? 'ca92bbcb548f7ec4b8ebe9194b8eda81'
        : '2b38c7ac93c0dccc83ebf9acc5107413',
      platform: PlatformName.web,
      projectName: 'base_docs',
      showDebugLogging: isDevelopment,
      version: '1.0.0',
      apiEndpoint: 'https://cca-lite.coinbase.com',
    });

    identify({ deviceId: 'base_docs_device_id' });
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
