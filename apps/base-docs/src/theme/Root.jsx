/* eslint-disable */
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { baseGoerli, baseSepolia } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { Provider as CookieManagerProvider, Region } from '@coinbase/cookie-manager';
import { cookieManagerConfig } from '../utils/cookieManagerConfig';
import { CookieBanner } from '@coinbase/cookie-banner';

export const { chains, publicClient } = configureChains(
  [baseGoerli, baseSepolia],
  [
    jsonRpcProvider({
      rpc: (chain) => ({ http: chain.rpcUrls.default.http[0] }),
    }),
  ],
);

const { wallets } = getDefaultWallets({
  appName: 'Base Camp',
  projectId: '582a2fc8f61e81e0bd0d18b32229595f',
  chains,
});

const connectors = connectorsForWallets(wallets);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

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
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
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
    </WagmiConfig>
  );
}
