// Necessary if using App Router to ensure this file runs on the client
'use client';

import { datadogRum } from '@datadog/browser-rum';
import { datadogLogs } from '@datadog/browser-logs';
import { isDevelopment } from 'apps/web/src/constants';
import { useEffect } from 'react';

const nextPublicDatadogAppId = process.env.NEXT_PUBLIC_DATADOG_APP_ID ?? '';
const nextPublicDatadogClientToken = process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN ?? '';

export default function DatadogInit() {
  useEffect(() => {
    // Disabled for development
    if (isDevelopment) return;

    if (!nextPublicDatadogAppId || !nextPublicDatadogClientToken) {
      console.warn('Datadog is not configured');
      return;
    }
    datadogRum.init({
      applicationId: nextPublicDatadogAppId,
      clientToken: nextPublicDatadogClientToken,
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
    datadogLogs.init({
      clientToken: process.env.nextPublicDatadogClientToken as string,
      env: process.env.NODE_ENV as string,
      site: 'datadoghq.com',
      forwardConsoleLogs: ['error', 'info'],
      forwardErrorsToLogs: true,
      sessionSampleRate: 100,
      service: 'base-org',
    });
  }, []);

  return null;
}
