'use client';
import '@rainbow-me/rainbowkit/styles.css';
import '@coinbase/onchainkit/styles.css';

import {
  Provider as CookieManagerProvider,
  Region,
  TrackingCategory,
  TrackingPreference,
} from '@coinbase/cookie-manager';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';
import { connectorsForWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
  metaMaskWallet,
  phantomWallet,
  rainbowWallet,
  uniswapWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ExperimentsProvider from 'base-ui/contexts/Experiments';
import useSprig from 'base-ui/hooks/useSprig';
import { useCallback, useRef } from 'react';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { base, baseSepolia, mainnet } from 'wagmi/chains';
import { cookieManagerConfig } from '../src/utils/cookieManagerConfig';
import ClientAnalyticsScript from 'apps/web/src/components/ClientAnalyticsScript/ClientAnalyticsScript';
import dynamic from 'next/dynamic';
import ErrorsProvider from 'apps/web/contexts/Errors';
import { isDevelopment } from 'apps/web/src/constants';
import { logger } from 'apps/web/src/utils/logger';

const DynamicCookieBannerWrapper = dynamic(
  async () => import('apps/web/src/components/CookieBannerWrapper'),
  {
    ssr: false,
  },
);

coinbaseWallet.preference = 'all';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [
        coinbaseWallet,
        metaMaskWallet,
        uniswapWallet,
        rainbowWallet,
        phantomWallet,
        walletConnectWallet,
      ],
    },
  ],
  {
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? 'dummy-id',
    walletConnectParameters: {},
    appName: 'Base.org',
    appDescription: '',
    appUrl: 'https://www.base.org/',
    appIcon: '',
  },
);

const config = createConfig({
  connectors,
  chains: [base, baseSepolia, mainnet],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
    [mainnet.id]: http(),
  },
  ssr: true,
});
const queryClient = new QueryClient();
const sprigEnvironmentId = process.env.NEXT_PUBLIC_SPRIG_ENVIRONMENT_ID;

type AppProvidersProps = {
  children: React.ReactNode;
};

// TODO: Not all pages needs all these components, ideally should be split and put
//       on the sub-layouts
export default function AppProviders({ children }: AppProvidersProps) {
  const trackingPreference = useRef<TrackingPreference | undefined>();

  const setTrackingPreference = useCallback((newPreference: TrackingPreference) => {
    const priorConsent = trackingPreference.current?.consent;
    trackingPreference.current = newPreference;

    if (!priorConsent) {
      // The first time the modal appears, this function is called with nothing present in
      // trackingPreference.current. To avoid an infinite refresh loop, we return early on
      // the first call.
      return;
    }

    const newConsent = newPreference.consent;

    // Check if the preferences have changed.
    const diff = [
      ...priorConsent.filter((elem: TrackingCategory) => !newConsent.includes(elem)),
      ...newConsent.filter((elem: TrackingCategory) => !priorConsent.includes(elem)),
    ];

    // Reload if the preferences have changed.
    if (diff.length > 0) {
      window.location.reload();
    }
  }, []);

  const handleLogError = useCallback(
    (err: Error) => logger.error('Cookie manager provider error', err),
    [],
  );

  const handleCookieManagerLog = useCallback(
    (str: string, options: Record<string, unknown> | undefined) => logger.info(str, options),
    [],
  );

  useSprig(sprigEnvironmentId);

  return (
    <ErrorsProvider context="web">
      <CookieManagerProvider
        projectName="base_web"
        locale="en"
        region={Region.DEFAULT}
        log={handleCookieManagerLog}
        onError={handleLogError}
        onPreferenceChange={setTrackingPreference}
        config={cookieManagerConfig}
      >
        <ClientAnalyticsScript />
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <OnchainKitProvider
              chain={isDevelopment ? baseSepolia : base}
              apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
            >
              <RainbowKitProvider modalSize="compact">
                <TooltipProvider>
                  <ExperimentsProvider>
                    <>
                      {children}
                      <DynamicCookieBannerWrapper />
                    </>
                  </ExperimentsProvider>
                </TooltipProvider>
              </RainbowKitProvider>
            </OnchainKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </CookieManagerProvider>
    </ErrorsProvider>
  );
}
