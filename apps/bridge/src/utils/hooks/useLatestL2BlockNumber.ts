import L2OutputOracle from 'apps/bridge/src/contract-abis/L2OutputOracle';
import getConfig from 'next/config';
import { useContractRead } from 'wagmi';

const { publicRuntimeConfig } = getConfig();

export function useLatestL2BlockNumber() {
  const { data: latestL2BlockNumber } = useContractRead({
    address: publicRuntimeConfig.l2OutputOracleProxyAddress,
    abi: L2OutputOracle,
    functionName: 'latestBlockNumber',
    chainId: parseInt(publicRuntimeConfig.l1ChainID),
  });

  return latestL2BlockNumber;
}
