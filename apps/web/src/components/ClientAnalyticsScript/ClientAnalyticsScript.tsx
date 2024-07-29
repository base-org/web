'use client';
import { useCallback } from 'react';
import { useSavedTrackingPreference, useCookie } from '@coinbase/cookie-manager';
import { useRouter } from 'next/navigation';
import Script from 'next/script';
import initCCA from '../../utils/initCCA';

export default function ClientAnalyticsScript() {
  const router = useRouter();
  const trackingPreference = useSavedTrackingPreference();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [deviceIdCookie, setDeviceIdCookie] = useCookie('base_device_id');

  return (
    <Script
      src="https://static-assets.coinbase.com/js/cca/v0.0.1.js"
      onLoad={useCallback(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        () => initCCA(router, trackingPreference, deviceIdCookie, setDeviceIdCookie),
        [router, trackingPreference, deviceIdCookie, setDeviceIdCookie],
      )}
    />
  );
}
