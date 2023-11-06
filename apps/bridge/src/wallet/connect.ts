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
  const customChains = chainList.filter((chain) => activeChainIds?.includes(chain.id));
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
