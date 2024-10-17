/*
  A hook to safely check wallet_getCapabilities support

  Responsabilities:
  - Check for unsupported wallets (e.g: metamask)
  - Use experimental useCapabilities
  - Check atomicBatch (batchcall) and paymasterService for a given chain
  - Default to false
*/

import { Chain } from 'viem';
import { useAccount } from 'wagmi';
import { useCapabilities } from 'wagmi/experimental';

export type UseCapabilitiesSafeProps = {
  chain: Chain;
};

export default function useCapabilitiesSafe({ chain }: UseCapabilitiesSafeProps) {
  const { connector, isConnected } = useAccount();

  // Metamask doesn't support wallet_getCapabilities
  const isMetamaskWallet = connector?.id === 'io.metamask';
  const enabled = isConnected && !isMetamaskWallet;

  const { data: capabilities } = useCapabilities({ query: { enabled } });

  const atomicBatchEnabled =
    (capabilities && capabilities[chain.id]?.atomicBatch?.supported === true) ?? false;
  const paymasterServiceEnabled =
    (capabilities && capabilities[chain.id]?.paymasterService?.supported === true) ?? false;

  return {
    atomicBatchEnabled,
    paymasterServiceEnabled,
  };
}
