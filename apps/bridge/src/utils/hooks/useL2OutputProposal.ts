import L2OutputOracle from 'apps/bridge/src/contract-abis/L2OutputOracle';
import getConfig from 'next/config';
import { useContractRead } from 'wagmi';

const { publicRuntimeConfig } = getConfig();

export function useL2OutputProposal(withdrawalL2OutputIndex?: bigint) {
  const { data: l2OutputProposal } = useContractRead({
    address: withdrawalL2OutputIndex ? publicRuntimeConfig.l2OutputOracleProxyAddress : undefined,
    abi: L2OutputOracle,
    functionName: 'getL2Output',
    args: withdrawalL2OutputIndex ? [withdrawalL2OutputIndex] : undefined,
    chainId: parseInt(publicRuntimeConfig.l1ChainID),
  });

  return l2OutputProposal;
}
