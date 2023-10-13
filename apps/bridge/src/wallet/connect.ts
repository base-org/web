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
import { configureChains, createConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

const { publicRuntimeConfig } = getConfig();

export function connectWallet(activeChainIds: number[]) {
  const customChains = chainList.filter((chain) => activeChainIds?.includes(chain.id));
  const { chains, publicClient } = configureChains([...customChains], [publicProvider()]);
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
