/* eslint-disable */
import '@rainbow-me/rainbowkit/styles.css';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  connectorsForWallets,
  getDefaultConfig,
  RainbowKitProvider,
  lightTheme,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { createConfig, WagmiProvider } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Provider as CookieManagerProvider, Region } from '@coinbase/cookie-manager';
import { cookieManagerConfig } from '../utils/cookieManagerConfig';
import { CookieBanner } from '@coinbase/cookie-banner';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [coinbaseWallet],
    },
    {
      groupName: 'Others',
      wallets: [rainbowWallet, metaMaskWallet, walletConnectWallet],
    },
  ],
  { appName: 'Base Developer Documentation', projectId: '582a2fc8f61e81e0bd0d18b32229595f' },
);

const config = createConfig({
  autoConnect: true,
  connectors,
  chains: [base, baseSepolia],
  ssr: true,
});

const queryClient = new QueryClient();

const cookieBannerTheme = {
  colors: {
    primary: '#1652F0',
    positive: '#05B169',
    negative: '#DF5F67',
    warning: '#F4C622',
    background: '#FFFFFF',
    backgroundMuted: '#EEF0F3',
    onBackground: '#050F1A',
    onBackgroundMuted: '#0A0B0D',
    onPrimary: '#FFFFFF',
    overlay: 'rgba(17,52,83,0.6)',
  },
  border: {
    border: '1px solid #D8D8D8',
    borderRadius: '4px',
  },
  fontSize: {
    sm: '14px',
    md: '16px',
  },
  fontWeight: {
    regular: '400',
    bold: '500',
  },
  size: {
    xs: '8px',
    sm: '16px',
    md: '24px',
    lg: '32px',
  },
  breakpoints: {
    phone: 560,
    desktop: 992,
    tablet: 768,
  },
  zIndex: {
    high: 2,
    overlay: 1000,
  },
};

export default function Root({ children }) {
  const [mounted, setMounted] = useState(false);

  // Cookie Consent Manager Provider Configuration
  const trackingPreference = useRef();

  const setTrackingPreference = useCallback((newPreference) => {
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
      ...priorConsent.filter((elem) => !newConsent.includes(elem)),
      ...newConsent.filter((elem) => !priorConsent.includes(elem)),
    ];

    // Reload if the preferences have changed.
    if (diff.length > 0) {
      window.location.reload();
    }
  }, []);

  const handleLogError = useCallback((err) => console.error(err), []);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact" theme={darkTheme()}>
          <CookieManagerProvider
            projectName="base_docs"
            locale="en"
            region={Region.DEFAULT}
            log={console.log}
            onError={handleLogError}
            onPreferenceChange={setTrackingPreference}
            config={cookieManagerConfig}
          >
            {children}
            <CookieBanner companyName="Base" link="/cookie-policy" theme={cookieBannerTheme} />
          </CookieManagerProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
