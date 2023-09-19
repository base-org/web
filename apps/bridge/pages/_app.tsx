import './global.css';
import '@rainbow-me/rainbowkit/styles.css';

// eslint-disable-next-line @cbhq/react-prefer-named-module-import
import React, { Fragment } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginReact from '@bugsnag/plugin-react';
import localFont from '@next/font/local';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { Header } from 'apps/bridge/src/components/Header/Header';
import { Layout } from 'apps/bridge/src/components/Layout/Layout';
import { Sidebar } from 'apps/bridge/src/components/Sidebar/Sidebar';
import { OFACProvider } from 'apps/bridge/src/contexts/OFACContext';
import { TOSProvider } from 'apps/bridge/src/contexts/TOSContext';
import { connectWallet } from 'apps/bridge/src/wallet/connect';
import App, { AppContext, AppProps } from 'next/app';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { WagmiConfig } from 'wagmi';

const DEFAULT_LOCALE = 'en';
const { publicRuntimeConfig } = getConfig();

if (publicRuntimeConfig.bugsnagApiKey) {
  Bugsnag.start({
    apiKey: publicRuntimeConfig.bugsnagApiKey,
    endpoints: {
      notify: publicRuntimeConfig.bugsnagNotifyUrl,
      sessions: publicRuntimeConfig.bugsnagSessionsUrl,
    },
    releaseStage: publicRuntimeConfig.appStage,
    enabledReleaseStages: ['production'],
    appVersion: publicRuntimeConfig.buildId,
    autoTrackSessions: false,
    plugins: [new BugsnagPluginReact()],
  });
}

const ErrorBoundary = Bugsnag?.getPlugin('react')?.createErrorBoundary(React) ?? Fragment;

// https://nextjs.org/docs/advanced-features/custom-app
export async function getInitialProps(context: AppContext) {
  const appProps = await App.getInitialProps(context);

  return appProps;
}

const queryClient = new QueryClient();

const coinbaseDisplay = localFont({
  src: [
    {
      path: '../src/fonts/CoinbaseDisplay-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../src/fonts/CoinbaseDisplay-Medium.woff2',
      weight: '500 800',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-coinbase-display',
});

const coinbaseSans = localFont({
  src: [
    {
      path: '../src/fonts/CoinbaseSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../src/fonts/CoinbaseSans-Medium.woff2',
      weight: '500 800',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-coinbase-sans',
});

const coinbaseMono = localFont({
  src: [
    {
      path: '../src/fonts/CoinbaseMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../src/fonts/CoinbaseMono-Medium.woff2',
      weight: '500 800',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-coinbase-mono',
});

const allowedPaths = new Set(['/withdraw', '/deposit', '/transactions']);

function Root({ Component, pageProps }: AppProps) {
  const { pathname } = useRouter();
  const { ...props } = pageProps as { props: unknown };

  const { chains: providerChains, wagmiClient } = connectWallet([
    parseInt(publicRuntimeConfig.l1ChainID),
    parseInt(publicRuntimeConfig.l2ChainID),
  ]);

  return (
    <>
      <style jsx global>{`
        :root {
          --font-coinbase-sans: ${coinbaseSans.style.fontFamily};
          --font-coinbase-mono: ${coinbaseMono.style.fontFamily};
        }
      `}
      </style>

      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={providerChains} modalSize="compact">
              <TOSProvider>
                <OFACProvider>
                  <Layout>
                    <div
                      className={`${coinbaseDisplay.variable} ${coinbaseSans.variable} ${coinbaseMono.variable}`}
                    >
                      {(pathname === '/' || !allowedPaths.has(pathname)) && (
                        <Component {...props} />
                      )}
                      {allowedPaths.has(pathname) && (
                        <Sidebar>
                          <>
                            <Header />
                            <div className="m-0 w-full p-0 sm:h-[calc(100vh-72px)]">
                              <Component {...props} />
                            </div>
                          </>
                        </Sidebar>
                      )}
                    </div>
                  </Layout>
                </OFACProvider>
              </TOSProvider>
            </RainbowKitProvider>
          </WagmiConfig>
        </QueryClientProvider>
      </ErrorBoundary>
    </>
  );
}

Root.getInitialProps = getInitialProps;

export default Root;
