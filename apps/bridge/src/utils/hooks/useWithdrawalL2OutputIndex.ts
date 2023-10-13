import L2OutputOracle from 'apps/bridge/src/contract-abis/L2OutputOracle';
import getConfig from 'next/config';
import { useContractRead } from 'wagmi';

const { publicRuntimeConfig } = getConfig();

export function useWithdrawalL2OutputIndex(blockNumber?: bigint) {
  const { data: withdrawalL2OutputIndex } = useContractRead({
    address: blockNumber ? publicRuntimeConfig.l2OutputOracleProxyAddress : undefined,
    abi: L2OutputOracle,
    functionName: 'getL2OutputIndexAfter',
    args: blockNumber ? [blockNumber] : undefined,
    chainId: parseInt(publicRuntimeConfig.l1ChainID),
  });

  return withdrawalL2OutputIndex;
}
