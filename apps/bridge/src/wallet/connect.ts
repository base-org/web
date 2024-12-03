import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  braveWallet,
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  rabbyWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import chainList from 'apps/bridge/chains';
import getConfig from 'next/config';
import { Chain, configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

const { publicRuntimeConfig } = getConfig();

function configureBackupJsonRpcProvider<TChain extends Chain>(url: string) {
  return jsonRpcProvider<TChain>({
    rpc: (chain) => {
      if (chain.id !== 1) return null;
      return { http: url };
    },
  });
}

export function connectWallet(activeChainIds: number[]) {
  // Validate chain configuration
  if (!activeChainIds?.length) {
    throw new Error(
      'Chain configuration is missing. Please check your environment variables L1_CHAIN_ID and L2_CHAIN_ID.',
    );
  }

  // Validate WalletConnect project ID
  if (!publicRuntimeConfig.walletConnectProjectId) {
    throw new Error(
      'WalletConnect project ID is missing. Please add WALLET_CONNECT_PROJECT_ID to your .env file.\n' +
        'You can get a project ID from https://cloud.walletconnect.com',
    );
  }

  const customChains = chainList.filter((chain) => activeChainIds?.includes(chain.id));

  // Validate that chains were found
  if (!customChains.length) {
    throw new Error(
      `No chains found for IDs: ${activeChainIds.join(
        ', ',
      )}. Please check your chain configuration.`,
    );
  }

  const { chains, publicClient } = configureChains(
    [...customChains],
    [
      publicProvider(),
      configureBackupJsonRpcProvider('https://cloudflare-eth.com'),
      configureBackupJsonRpcProvider('https://eth.llamarpc.com'),
    ],
  );

  let autoConnect = false;
  if (typeof window !== 'undefined') {
    autoConnect = localStorage.getItem('autoconnect') === '1';
  }

  const connectors = connectorsForWallets([
    {
      groupName: 'Recommended',
      wallets: [
        coinbaseWallet({
          chains,
          appName: 'Bridge',
        }),
        injectedWallet({ chains }),
        rainbowWallet({ chains, projectId: publicRuntimeConfig.walletConnectProjectId }),
        rabbyWallet({ chains }),
        walletConnectWallet({ chains, projectId: publicRuntimeConfig.walletConnectProjectId }),
        metaMaskWallet({ chains, projectId: publicRuntimeConfig.walletConnectProjectId }),
        braveWallet({ chains }),
      ],
    },
  ]);

  const wagmiConfig = createConfig({
    autoConnect,
    connectors,
    publicClient,
  });

  return { chains, wagmiConfig };
}
