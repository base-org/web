import L2OutputOracle from 'apps/bridge/src/contract-abis/L2OutputOracle';
import getConfig from 'next/config';
import { useContractRead } from 'wagmi';

const { publicRuntimeConfig } = getConfig();

// reference:
// https://github.com/ethereum-optimism/optimism/blob/2d04a15ebde0baf885b17760f11496cf54efe55f/packages/contracts-bedrock/contracts/L1/OptimismPortal.sol#L504
export function useIsFinalizationPeriodElapsed(timestamp: bigint | undefined) {
  const { data: FINALIZATION_PERIOD_SECONDS } = useContractRead({
    address: publicRuntimeConfig.l2OutputOracleProxyAddress,
    abi: L2OutputOracle,
    functionName: 'FINALIZATION_PERIOD_SECONDS',
    chainId: parseInt(publicRuntimeConfig.l1ChainID),
  });

  if (FINALIZATION_PERIOD_SECONDS && timestamp) {
    return {
      hasElapsed: Math.floor(Date.now() / 1000) > timestamp + FINALIZATION_PERIOD_SECONDS,
      challengeWindowEndTime: timestamp + FINALIZATION_PERIOD_SECONDS,
    };
  }
  return {
    hasElapsed: false,
    challengeWindowEndTime: BigInt(0),
  };
}
