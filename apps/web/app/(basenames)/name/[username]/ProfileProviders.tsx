'use client';

import { BaseName } from '@coinbase/onchainkit/identity';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import UsernameProfileProvider from 'apps/web/src/components/Basenames/UsernameProfileContext';
import { Address } from 'viem';

// Do not change this unless you know what you're doing (it'll break analytics)
const usernameProfileAnalyticContext = 'username_profile';

export default function ProfileProviders({
  children,
  username,
  address,
}: {
  children: React.ReactNode;
  username: BaseName;
  address: Address;
}) {
  return (
    <AnalyticsProvider context={usernameProfileAnalyticContext}>
      <UsernameProfileProvider username={username} address={address}>
        {children}
      </UsernameProfileProvider>
    </AnalyticsProvider>
  );
}
