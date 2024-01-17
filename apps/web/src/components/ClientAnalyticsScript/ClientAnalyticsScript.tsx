import { useCallback } from 'react';
import { useSavedTrackingPreference, useCookie } from '@coinbase/cookie-manager';
import { useRouter } from 'next/router';
import Script from 'next/script';
import initCCA from '../../utils/initCCA';

export default function ClientAnalyticsScript() {
  const router = useRouter();
  const trackingPreference = useSavedTrackingPreference();
  const [deviceIdCookie, setDeviceIdCookie] = useCookie('base_device_id');

  return (
    <Script
      src="https://static-assets.coinbase.com/js/cca/v0.0.1.js"
      onLoad={useCallback(
        () => initCCA(router, trackingPreference, deviceIdCookie, setDeviceIdCookie),
        [router, trackingPreference, deviceIdCookie, setDeviceIdCookie],
      )}
    />
  );
}
