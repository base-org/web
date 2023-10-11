import { Network } from 'apps/bridge/src/types/Network';

type NetworkLayer = 'L1' | 'L2';

const NETWORK_LAYER_MAP: Record<Network, NetworkLayer> = {
  homestead: 'L1',
  goerli: 'L1',
  sepolia: 'L1',
  base: 'L2',
  'base-goerli': 'L2',
  'base-sepolia': 'L2',
};

export function networkToLayer(network: Network): NetworkLayer {
  return NETWORK_LAYER_MAP[network];
}
