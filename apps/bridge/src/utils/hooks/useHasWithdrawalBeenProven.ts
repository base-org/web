import OptimismPortal from 'apps/bridge/src/contract-abis/OptimismPortal';
import getConfig from 'next/config';
import { useContractRead } from 'wagmi';

const { publicRuntimeConfig } = getConfig();

export function useHasWithdrawalBeenProven(withdrawalHash: string | null) {
  const { data: provenWithdrawal } = useContractRead({
    address: withdrawalHash ? publicRuntimeConfig.l1OptimismPortalProxyAddress : undefined,
    abi: OptimismPortal,
    functionName: 'provenWithdrawals',
    args: withdrawalHash ? [withdrawalHash as `0x${string}`] : undefined,
    chainId: parseInt(publicRuntimeConfig.l1ChainID),
  });
  const withdrawalHasBeenProven = provenWithdrawal?.[1] !== BigInt(0);

  return withdrawalHasBeenProven;
}
