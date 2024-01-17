import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { baseGoerli } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { Provider as CookieManagerProvider, Region } from '@coinbase/cookie-manager';
import { cookieManagerConfig } from '../utils/cookieManagerConfig';
import { CookieBanner } from '@coinbase/cookie-banner';

export const { chains, publicClient } = configureChains(
  [baseGoerli],
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

export default function Root({ children }) {
  // Cookie Consent Manager Provider Configuration
  const [isMounted, setIsMounted] = useState(false);
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

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

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
          <CookieBanner companyName="Base" link="/cookie-policy" />
        </CookieManagerProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
