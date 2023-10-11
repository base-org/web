import L2OutputOracle from 'apps/bridge/src/contract-abis/L2OutputOracle';
import getConfig from 'next/config';
import { useContractRead } from 'wagmi';

const { publicRuntimeConfig } = getConfig();

export function useBlockNumberOfLatestL2OutputProposal() {
  const { data: blockNumberOfLatestL2OutputProposal } = useContractRead({
    address: publicRuntimeConfig.l2OutputOracleProxyAddress,
    abi: L2OutputOracle,
    functionName: 'latestBlockNumber',
    chainId: parseInt(publicRuntimeConfig.l1ChainID),
  });

  return blockNumberOfLatestL2OutputProposal;
}
