// Necessary if using App Router to ensure this file runs on the client
'use client';

import { datadogRum } from '@datadog/browser-rum';
import { useEffect } from 'react';

const nextPublicDatadogAppId = process.env.NEXT_PUBLIC_DATADOG_APP_ID ?? '';
const nextPublicDatadogClientToken = process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN ?? '';

export default function DatadogInit() {
  const isDevelopment = process.env.NODE_ENV === 'development';
  useEffect(() => {
    if (!nextPublicDatadogAppId || !nextPublicDatadogClientToken) {
      if (isDevelopment) {
        console.info('Development: Datadog is not configured');
      } else {
        console.warn('Datadog is not configured');
      }

      return;
    }
    datadogRum.init({
      applicationId: process.env.NEXT_PUBLIC_DATADOG_APP_ID ?? '',
      clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN ?? '',
      // `site` refers to the Datadog site parameter of your organization
      // see https://docs.datadoghq.com/getting_started/site/
      site: 'datadoghq.com',
      service: 'base-org',
      env: process.env.NODE_ENV,
      sessionSampleRate: 100,
      sessionReplaySampleRate: 20,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: 'mask',
    });
  }, [isDevelopment]);

  return null;
}
