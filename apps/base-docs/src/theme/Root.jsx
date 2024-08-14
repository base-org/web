/* eslint-disable */
import '@rainbow-me/rainbowkit/styles.css';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  connectorsForWallets,
  getDefaultConfig,
  RainbowKitProvider,
  cssStringFromTheme,
  lightTheme,
  darkTheme,
  Theme,
} from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { createConfig, WagmiProvider, http } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Provider as CookieManagerProvider, Region } from '@coinbase/cookie-manager';
import { cookieManagerConfig } from '../utils/cookieManagerConfig';
import { CookieBanner } from '@coinbase/cookie-banner';
import { WalletAvatar } from '../components/WalletAvatar';
import { createClient } from 'viem';

import useSprig from 'base-ui/hooks/useSprig';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ExperimentsProvider from 'base-ui/contexts/Experiments';

coinbaseWallet.preference = 'all';

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
  chains: [baseSepolia],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
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

const customTheme = {
  colors: {
    accentColor: 'var(--base-docs-color-fg)',
    accentColorForeground: 'var(--base-docs-color-bg)',
    actionButtonBorder: 'var(--base-docs-color-line-heavy)',
    actionButtonBorderMobile: 'var(--base-docs-color-line-heavy)',
    actionButtonSecondaryBackground: 'var(--base-docs-color-bg)',
    closeButton: 'var(--base-docs-color-fg)',
    closeButtonBackground: 'var(--base-docs-color-bg)',
    connectionIndicator: 'var(--positive)',
    error: 'var(--negative)',
    generalBorder: 'var(--base-docs-color-line-heavy)',
    generalBorderDim: 'var(--base-docs-color-line)',
    modalBackground: 'var(--base-docs-color-fg-negative)',
    modalBorder: 'var(--base-docs-color-line-heavy)',
    modalText: 'var(--base-docs-color-fg)',
    modalTextDim: 'var(--base-docs-color-fg-muted)',
    modalTextSecondary: 'var(--base-docs-color-fg-secondary)',
    profileAction: 'var(--base-docs-color-bg)',
    profileActionHover: 'var(--base-docs-color-bg-alt)',
    profileForeground: 'var(--base-docs-color-fg-negative)',
    selectedOptionBorder: 'var(--base-docs-color-line-heavy)',
  },
  fonts: {
    body: 'CoinbaseMono',
  },
  radii: {
    actionButton: '3px',
    connectButton: '3px',
    menuButton: '3px',
    modal: '3px',
    modalMobile: '3px',
  },
};

export default function Root({ children }) {
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

  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  const sprigEnvironmentId = customFields?.sprigEnvironmentId;

  const handleLogError = useCallback((err) => console.error(err), []);

  useSprig(sprigEnvironmentId);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact" theme={customTheme} avatar={WalletAvatar}>
          <style
            dangerouslySetInnerHTML={{
              __html: `
            :root {
              ${cssStringFromTheme(darkTheme)}
            }

            html[data-theme='light'] {
              ${cssStringFromTheme(lightTheme, {
                extends: darkTheme,
              })}
            }

            html[data-theme='dark'] {
              ${cssStringFromTheme(darkTheme, {
                extends: darkTheme,
              })}
            }
          `,
            }}
          />
          <ExperimentsProvider>
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
          </ExperimentsProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
