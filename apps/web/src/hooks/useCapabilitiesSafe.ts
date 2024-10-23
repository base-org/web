/*
  A hook to safely check wallet_getCapabilities support

  Responsibilities:
  - Check for unsupported wallets (e.g: metamask)
  - Use experimental useCapabilities
  - Check atomicBatch (batchcall) and paymasterService for a given chain
  - Default to false
*/

import { Chain } from 'viem';
import { base } from 'viem/chains';
import { useAccount } from 'wagmi';
import { useCapabilities } from 'wagmi/experimental';

// To add a new capability, add it to this list
const CAPABILITIES_LIST = ['atomicBatch', 'paymasterService', 'auxiliaryFunds'] as const;

type ListedCapabilities = (typeof CAPABILITIES_LIST)[number];

export type UseCapabilitiesSafeProps = {
  chainId?: Chain['id'];
};

export default function useCapabilitiesSafe({ chainId }: UseCapabilitiesSafeProps) {
  const { connector, isConnected, chainId: currentChainId } = useAccount();

  // Metamask doesn't support wallet_getCapabilities
  const isMetamaskWallet = connector?.id === 'io.metamask';
  const enabled = isConnected && !isMetamaskWallet;

  const { data: rawCapabilities } = useCapabilities({ query: { enabled } });

  const featureChainId = chainId ?? currentChainId ?? base.id;

  function isCapabilitySupported(capability: ListedCapabilities) {
    return (
      (rawCapabilities && rawCapabilities[featureChainId]?.[capability]?.supported === true) ??
      false
    );
  }

  const capabilities = CAPABILITIES_LIST.reduce((acc, capability) => {
    acc[capability] = isCapabilitySupported(capability);
    return acc;
  }, {} as Record<ListedCapabilities, boolean>);

  return capabilities;
}
