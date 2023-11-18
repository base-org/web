import { Asset } from 'apps/bridge/src/types/Asset';
import { usdFormatter } from 'apps/bridge/src/utils/formatter/balance';
import { useConversionRate } from 'apps/bridge/src/utils/hooks/useConversionRate';
import { formatEther } from 'viem';
import { useFeeData } from 'wagmi';

// prove: ~300_000
// finalize: ~100_000 for ETH, ~215_000 for ERC20, ~170_000 for CCTP

type UseGetWithdrawalFeeEstimatesProps = {
  selectedAsset: Asset;
};

export function useGetWithdrawalFeeEstimates({ selectedAsset }: UseGetWithdrawalFeeEstimatesProps) {
  const { data: feeData } = useFeeData({ chainId: selectedAsset.L1chainId });
  const ethConversionRate = useConversionRate({ asset: 'ethereum', refetch: false });

  const proveGas = selectedAsset.protocol === 'CCTP' ? 0n : 300000n;
  let finalizeGas;
  if (selectedAsset.protocol === 'CCTP') {
    finalizeGas = 170000n;
  } else {
    finalizeGas = selectedAsset.L2symbol === 'ETH' ? 100000n : 215000n;
  }

  const proveEstimate = parseFloat(formatEther((feeData?.maxFeePerGas ?? 0n) * proveGas));
  const finalizeEstimate = parseFloat(formatEther((feeData?.maxFeePerGas ?? 0n) * finalizeGas));

  const proveEstimateFormatted = usdFormatter(proveEstimate * (ethConversionRate ?? 0));
  const finalizeEstimateFormatted = usdFormatter(finalizeEstimate * (ethConversionRate ?? 0));

  const fees = {
    eth: {
      prove: proveEstimate,
      finalize: finalizeEstimate,
    },
    usd: {
      prove: proveEstimateFormatted,
      finalize: finalizeEstimateFormatted,
    },
  };

  return fees;
}
