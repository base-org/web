/*
  A hook to safely check wallet_getCapabilities support

  Responsibilities:
  - Check for unsupported wallets (e.g: metamask)
  - Use experimental useCapabilities
  - Check atomicBatch (batchcall) and paymasterService for a given chain
  - Default to false
*/

import { Chain } from 'viem';
import { useAccount } from 'wagmi';
import { useCapabilities } from 'wagmi/experimental';

// To add a new capability, add it to this list
const capabilitiesList = ['atomicBatch', 'paymasterService', 'auxiliaryFunds'] as const;

type ListedCapabilities = (typeof capabilitiesList)[number];

export type UseCapabilitiesSafeProps = {
  chain?: Chain;
};

export default function useCapabilitiesSafe({
  chain: paramChain,
}: UseCapabilitiesSafeProps): Record<ListedCapabilities, boolean> {
  const { connector, isConnected, chain: accountChain } = useAccount();
  const chain = paramChain ?? accountChain;

  // Metamask doesn't support wallet_getCapabilities
  const isMetamaskWallet = connector?.id === 'io.metamask';
  const enabled = isConnected && !isMetamaskWallet;

  const { data: rawCapabilities } = useCapabilities({ query: { enabled } });

  function isCapabilitySupported(capability: ListedCapabilities) {
    return (
      (chain && rawCapabilities && rawCapabilities[chain.id]?.[capability]?.supported === true) ??
      false
    );
  }

  const capabilities = capabilitiesList.reduce((acc, capability) => {
    acc[capability] = isCapabilitySupported(capability);
    return acc;
  }, {} as Record<ListedCapabilities, boolean>);

  return capabilities;
}
