import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

// CCA library loads in _app.tsx
const initCCA = (router) => {
  if (window.ClientAnalytics) {
    const { init, identify, PlatformName, initNextJsTrackPageview } = window.ClientAnalytics;

    init({
      isProd: process.env.NODE_ENV === 'production',
      amplitudeApiKey: publicRuntimeConfig.amplitudeApiKey,
      platform: PlatformName.web,
      projectName: 'base_web',
      showDebugLogging: process.env.NODE_ENV !== 'production',
      version: '1.0.0',
      apiEndpoint: 'https://cca-lite.coinbase.com',
    });

    const STORED_DEVICE_ID = 'base_web_device_id';

    function getDeviceId() {
      let id = localStorage.getItem(STORED_DEVICE_ID);
      if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem(STORED_DEVICE_ID, id);
      }
      return id;
    }

    identify({ deviceId: getDeviceId() });

    initNextJsTrackPageview({
      nextJsRouter: router,
    });
  }
};

export default initCCA;
