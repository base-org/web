import {
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { baseGoerli } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

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
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
}
