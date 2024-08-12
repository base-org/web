'use client';
import '@rainbow-me/rainbowkit/styles.css';

// import {
//   Provider as CookieManagerProvider,
//   Region,
//   TrackingCategory,
//   TrackingPreference,
// } from '@coinbase/cookie-manager';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';
import { connectorsForWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
  uniswapWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorsProvider from 'apps/web/contexts/Errors';
import ClientAnalyticsScript from 'apps/web/src/components/ClientAnalyticsScript/ClientAnalyticsScript';
import { isDevelopment } from 'apps/web/src/constants';
import ExperimentsProvider from 'base-ui/contexts/Experiments';
import useSprig from 'base-ui/hooks/useSprig';
import { MotionConfig } from 'framer-motion';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';

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
  chains: [base, baseSepolia],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
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
  useSprig(sprigEnvironmentId);

  return (
    <ErrorsProvider context="web">
      <MotionConfig reducedMotion="user">
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
                    <div>{children}</div>
                  </ExperimentsProvider>
                </TooltipProvider>
              </RainbowKitProvider>
            </OnchainKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </MotionConfig>
    </ErrorsProvider>
  );
}
