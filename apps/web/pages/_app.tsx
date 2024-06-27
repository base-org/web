import './global.css';

import {
  Provider as CookieManagerProvider,
  Region,
  TrackingCategory,
  TrackingPreference,
} from '@coinbase/cookie-manager';
import { connectorsForWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
  uniswapWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import useSprig from 'base-ui/hooks/useSprig';
import { MotionConfig } from 'framer-motion';
import { AppProps } from 'next/app';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { base, baseSepolia, mainnet, sepolia } from 'wagmi/chains';
import ClientAnalyticsScript from '../src/components/ClientAnalyticsScript/ClientAnalyticsScript';
import { Layout } from '../src/components/Layout/Layout';
import { cookieManagerConfig } from '../src/utils/cookieManagerConfig';

coinbaseWallet.preference = 'all';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [coinbaseWallet, metaMaskWallet, uniswapWallet, rainbowWallet, walletConnectWallet],
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
  chains: [mainnet, base, sepolia, baseSepolia],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http(),
    [baseSepolia.id]: http(),
  },
  ssr: true,
});

const queryClient = new QueryClient();
const sprigEnvironmentId = process.env.NEXT_PUBLIC_SPRIG_ENVIRONMENT_ID;

export default function StaticApp({ Component, pageProps }: AppProps) {
  // Cookie Manager Provider Configuration
  const [isMounted, setIsMounted] = useState(false);
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

  const handleLogError = useCallback((err: Error) => console.error(err), []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useSprig(sprigEnvironmentId);

  if (!isMounted) return null;

  return (
    <CookieManagerProvider
      projectName="base_web"
      locale="en"
      region={Region.DEFAULT}
      log={console.log}
      onError={handleLogError}
      onPreferenceChange={setTrackingPreference}
      config={cookieManagerConfig}
    >
      <MotionConfig reducedMotion="user">
        <ClientAnalyticsScript />
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider modalSize="compact">
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </MotionConfig>
    </CookieManagerProvider>
  );
}
