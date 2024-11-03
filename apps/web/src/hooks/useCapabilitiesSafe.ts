/*
  A hook to safely check wallet_getCapabilities support

  Responsabilities:
  - Check for unsupported wallets (e.g: metamask)
  - Use experimental useCapabilities
  - Check atomicBatch (batchcall) and paymasterService for a given chain
  - Default to false
*/

import { Chain } from 'viem';
import { base } from 'viem/chains';
import { useAccount } from 'wagmi';
import { useCapabilities } from 'wagmi/experimental';

export type UseCapabilitiesSafeProps = {
  chainId?: Chain['id'];
};

export default function useCapabilitiesSafe({ chainId }: UseCapabilitiesSafeProps) {
  const { connector, isConnected, chainId: currentChainId } = useAccount();

  // Metamask doesn't support wallet_getCapabilities
  const isMetamaskWallet = connector?.id === 'io.metamask';
  const enabled = isConnected && !isMetamaskWallet;

  const { data: capabilities } = useCapabilities({ query: { enabled } });

  const featureChainId = chainId ?? currentChainId ?? base.id;

  const atomicBatchEnabled =
    (capabilities && capabilities[featureChainId]?.atomicBatch?.supported === true) ?? false;
  const paymasterServiceEnabled =
    (capabilities && capabilities[featureChainId]?.paymasterService?.supported === true) ?? false;

  return {
    atomicBatchEnabled,
    paymasterServiceEnabled,
  };
}
