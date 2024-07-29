'use client';

import { BaseName } from '@coinbase/onchainkit/identity';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import UsernameProfileProvider from 'apps/web/src/components/Basenames/UsernameProfileContext';
import { formatBaseEthDomain, USERNAME_DOMAINS } from 'apps/web/src/utils/usernames';
import { Address } from 'viem';
import { base, baseSepolia } from 'viem/chains';

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
  let formattedUsername = username;

  // Resolve domainless name to .base.eth
  if (
    formattedUsername &&
    !formattedUsername.endsWith(`.${USERNAME_DOMAINS[baseSepolia.id]}`) &&
    !formattedUsername.endsWith(`.${USERNAME_DOMAINS[base.id]}`)
  ) {
    formattedUsername = formatBaseEthDomain(username, base.id);
  }

  return (
    <AnalyticsProvider context={usernameProfileAnalyticContext}>
      <UsernameProfileProvider username={formattedUsername} address={address}>
        {children}
      </UsernameProfileProvider>
    </AnalyticsProvider>
  );
}
