'use client';

import AnalyticsProvider from 'apps/web/contexts/Analytics';
import UsernameProfileProvider from 'apps/web/src/components/Basenames/UsernameProfileContext';

// Do not change this unless you know what you're doing (it'll break analytics)
const usernameProfileAnalyticContext = 'username_profile';

export default function ProfileProviders({
  children,
  username,
}: {
  children: React.ReactNode;
  username: string;
}) {
  return (
    <AnalyticsProvider context={usernameProfileAnalyticContext}>
      <UsernameProfileProvider username={username}>{children}</UsernameProfileProvider>
    </AnalyticsProvider>
  );
}
