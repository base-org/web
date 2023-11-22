import { Asset } from 'apps/bridge/src/types/Asset';
import { usdFormatter } from 'apps/bridge/src/utils/formatter/balance';
import { useConversionRate } from 'apps/bridge/src/utils/hooks/useConversionRate';
import { formatEther } from 'viem';
import { useFeeData } from 'wagmi';

// prove: ~300_000
// finalize: ~100_000 for ETH, ~215_000 for ERC20, ~170_000 for CCTP
const OP_PROVE_GAS = 300000n;
const OP_FINALIZE_ETH_GAS = 100000n;
const OP_FINALIZE_ERC20_GAS = 215000n;
const CCTP_FINALIZE_GAS = 170000n;

type UseGetWithdrawalFeeEstimatesProps = {
  selectedAsset: Asset;
};

export function useGetWithdrawalFeeEstimates({ selectedAsset }: UseGetWithdrawalFeeEstimatesProps) {
  const { data: feeData } = useFeeData({ chainId: selectedAsset.L1chainId });
  const ethConversionRate = useConversionRate({ asset: 'ethereum', refetch: false });

  const proveGas = selectedAsset.protocol === 'CCTP' ? 0n : OP_PROVE_GAS;
  let finalizeGas;
  if (selectedAsset.protocol === 'CCTP') {
    finalizeGas = CCTP_FINALIZE_GAS;
  } else {
    finalizeGas = selectedAsset.L2symbol === 'ETH' ? OP_FINALIZE_ETH_GAS : OP_FINALIZE_ERC20_GAS;
  }

  const proveEstimate = parseFloat(formatEther((feeData?.gasPrice ?? 0n) * proveGas));
  const finalizeEstimate = parseFloat(formatEther((feeData?.gasPrice ?? 0n) * finalizeGas));

  const proveEstimateFormatted = proveEstimate * (ethConversionRate ?? 0);
  const finalizeEstimateFormatted = finalizeEstimate * (ethConversionRate ?? 0);

  const fees = {
    eth: {
      prove: proveEstimate.toFixed(4),
      finalize: finalizeEstimate.toFixed(4),
      total: (proveEstimate + finalizeEstimate).toFixed(4),
    },
    usd: {
      prove: usdFormatter(proveEstimateFormatted),
      finalize: usdFormatter(finalizeEstimateFormatted),
      total: usdFormatter(proveEstimateFormatted + finalizeEstimateFormatted),
    },
  };

  return fees;
}
