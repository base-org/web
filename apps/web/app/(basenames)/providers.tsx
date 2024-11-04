'use client';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { connectorsForWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import ErrorsProvider from 'apps/web/contexts/Errors';
import type { Metadata } from 'next';
import { Provider as TooltipProvider } from '@radix-ui/react-tooltip';
import { isDevelopment } from 'apps/web/src/constants';
import {
  coinbaseWallet,
  metaMaskWallet,
  phantomWallet,
  rainbowWallet,
  uniswapWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { base, baseSepolia, mainnet } from 'wagmi/chains';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Basenames`,
  description:
    'Basenames are a core onchain building block that enables anyone to establish their identity on Base by registering human-readable names for their address(es). They are a fully onchain solution which leverages ENS infrastructure deployed on Base.',
  openGraph: {
    type: 'website',
    title: `Basenames`,
    url: `/`,
    images: ['https://base.org/images/base-open-graph.png'],
  },
  twitter: {
    site: '@base',
    card: 'summary_large_image',
  },
};

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

export function Providers({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorsProvider context="basenames">
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <OnchainKitProvider
            chain={isDevelopment ? baseSepolia : base}
            apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          >
            <RainbowKitProvider modalSize="compact">
              <TooltipProvider>{children}</TooltipProvider>
            </RainbowKitProvider>
          </OnchainKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ErrorsProvider>
  );
}
