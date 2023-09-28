const docusaurusConfig = require('@generated/docusaurus.config');

const { customFields } = docusaurusConfig.default;

// Initialize Client Analytics
const initCCA = () => {
  if (window.ClientAnalytics) {
    const { init, identify, PlatformName } = window.ClientAnalytics;

    init({
      isProd: process.env.NODE_ENV === 'production',
      amplitudeApiKey: customFields.amplitudeApiKey,
      platform: PlatformName.web,
      projectName: 'base_docs',
      showDebugLogging: process.env.NODE_ENV !== 'production',
      version: '1.0.0',
      apiEndpoint: 'https://cca-lite.coinbase.com',
    });

    const STORED_DEVICE_ID = 'base_docs_device_id';

    function getDeviceId() {
      let id = localStorage.getItem(STORED_DEVICE_ID);
      if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem(STORED_DEVICE_ID, id);
      }
      return id;
    }

    identify({ deviceId: getDeviceId() });
  }
};

export default initCCA();

// Track Pageviews
export function onRouteDidUpdate({ location, previousLocation }) {
  if (location.pathname !== previousLocation?.pathname && window.ClientAnalytics) {
    const { logEvent } = window.ClientAnalytics;

    const referrerURL =
      previousLocation?.pathname === null && document.referrer ? document.referrer : null;

    logEvent('pageview', {
      page_path: location.pathname,
      prev_page_path: previousLocation?.pathname,
      referrer_url: referrerURL,
    });
  }
}
