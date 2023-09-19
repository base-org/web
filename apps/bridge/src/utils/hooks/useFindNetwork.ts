import chains from 'apps/bridge/chains';
import { Chain } from 'wagmi/chains';

type UseFindChainByNetworkType = {
  network: string;
};

export function useFindChainByNetwork({ network }: UseFindChainByNetworkType) {
  return chains.find((ch) => ch.network === network.toLowerCase()) as Chain;
}
