'use client';

import AnalyticsProvider from 'apps/web/contexts/Analytics';
import RegistrationProvider from 'apps/web/src/components/Basenames/RegistrationContext';

const usernameRegistrationAnalyticContext = 'username_registration';

export default function RegistrationProviders({ children }: { children: React.ReactNode }) {
  return (
    <AnalyticsProvider context={usernameRegistrationAnalyticContext}>
      <RegistrationProvider>{children}</RegistrationProvider>
    </AnalyticsProvider>
  );
}
