import ExponentialPremiumPriceOracleABI from 'apps/web/src/abis/ExponentialPremiumPriceOracle';
import { EXPONENTIAL_PREMIUM_PRICE_ORACLE } from 'apps/web/src/addresses/usernames';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { useBasenamesLaunchTime } from 'apps/web/src/hooks/useBasenamesLaunchTime';
import { useMemo } from 'react';
import { parseEther } from 'viem';
import { useReadContract } from 'wagmi';

export function useActiveEthPremiumAmountjf() {
  const { basenameChain } = useBasenameChain();
  const { data: launchTimeSeconds } = useBasenamesLaunchTime();

  const timeSinceLaunch = useMemo(
    () => (launchTimeSeconds ? BigInt(Math.floor(Date.now() / 1000)) - launchTimeSeconds : null),
    [launchTimeSeconds],
  );

  return useReadContract({
    abi: ExponentialPremiumPriceOracleABI,
    address: EXPONENTIAL_PREMIUM_PRICE_ORACLE[basenameChain.id],
    functionName: 'decayedPremium',
    args: [timeSinceLaunch as bigint],
    query: {
      enabled: typeof timeSinceLaunch === 'bigint',
    },
  });
}

export function useActiveEthPremiumAmount() {
  return { data: parseEther('10') };
}
