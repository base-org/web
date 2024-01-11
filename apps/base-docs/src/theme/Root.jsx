/* eslint-disable */
import {
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { baseGoerli, baseSepolia } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

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

export default function Root({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
}
