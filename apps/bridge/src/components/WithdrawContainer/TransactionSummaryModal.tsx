import { Modal } from 'apps/bridge/src/components/Modal/Modal';
import { Asset, BridgeProtocol } from 'apps/bridge/src/types/Asset';
import { usdFormatter } from 'apps/bridge/src/utils/formatter/balance';
import { useConversionRate } from 'apps/bridge/src/utils/hooks/useConversionRate';
import { useGetWithdrawalFeeEstimates } from 'apps/bridge/src/utils/hooks/useGetWithdrawalFeeEstimates';
import { Tooltip } from 'apps/bridge/src/components/Tooltip/Tooltip';

const chainIdToNetwork: Record<number, string> = {
  1: 'Ethereum Mainnet',
  5: 'Goerli Testnet',
  11155111: 'Sepolia Testnet',
};

const chainIdToTransferTime: Record<number, string> = {
  1: 'About 7 days',
  5: 'A few minutes',
  11155111: 'A few minutes',
};

type TransactionSummaryModalProps = {
  selectedAsset: Asset;
  amount: string;
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  protocol: BridgeProtocol;
};

export function TransactionSummaryModal({
  selectedAsset,
  amount,
  isOpen,
  onClose,
  onProceed,
  protocol,
}: TransactionSummaryModalProps) {
  const { eth: feesInETH, usd: feesInUSD } = useGetWithdrawalFeeEstimates({ selectedAsset });
  const assetConversionRate = useConversionRate({ asset: selectedAsset.apiId });
  const fiatAmount = usdFormatter(parseFloat(amount) * (assetConversionRate ?? 0));

  const proveTooltipText =
    'In order to complete a withdrawal, you must submit two additional L1 transactions, each of which requires enough ETH to pay for L1 gas fees charged by the Ethereum network.';
  const finalizeTooltipText =
    selectedAsset.protocol === 'CCTP'
      ? 'In order to complete a withdrawal, you must submit an additional L1 transaction which requires enough ETH to pay for L1 gas fees charged by the Ethereum network.'
      : 'In order to complete a withdrawal, you must submit two additional L1 transactions, each of which requires enough ETH to pay for L1 gas fees charged by the Ethereum network.';

  const content = (
    <div className="flex w-96 flex-col space-y-4">
      <div className="flex w-full flex-row items-center justify-between pt-8">
        <div className="flex flex-col items-start">
          <span className="text-white">Receive {selectedAsset.L1symbol}</span>
          <span>On {chainIdToNetwork[selectedAsset.L1chainId]}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-white">
            {amount} {selectedAsset.L1symbol}
          </span>
          <span>{fiatAmount}</span>
        </div>
      </div>
      <div className="flex w-full flex-row items-center justify-between pt-8">
        <div className="flex flex-col items-start">
          <span className="text-white">Transfer time</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-white">
            {selectedAsset.protocol === 'CCTP'
              ? 'A few minutes'
              : chainIdToTransferTime[selectedAsset.L1chainId]}
          </span>
        </div>
      </div>
      {protocol === 'OP' && (
        <div className="flex w-full flex-row items-center justify-between pt-8">
          <div className="flex flex-row items-center space-x-2">
            <span className="text-white">Verification fee (est.)</span>
            <Tooltip>{proveTooltipText}</Tooltip>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-white">{feesInETH.prove} ETH</span>
            <span>{feesInUSD.prove}</span>
          </div>
        </div>
      )}
      <div className="flex w-full flex-row items-center justify-between pt-8">
        <div className="flex flex-row items-center space-x-2">
          <span className="text-white">Completion fee (est.)</span>
          <Tooltip>{finalizeTooltipText}</Tooltip>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-white">{feesInETH.finalize} ETH</span>
          <span>{feesInUSD.finalize}</span>
        </div>
      </div>
      <div className="flex w-full flex-row items-center justify-between pt-8">
        <div className="flex flex-col items-start">
          <span className="text-white">Fee total (est.)</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-white">{feesInETH.total} ETH</span>
          <span>{feesInUSD.total}</span>
        </div>
      </div>
    </div>
  );

  const footer = (
    <div className="flex flex-row justify-center space-x-12">
      <button
        className="w-48 border border-white bg-black py-2 text-lg text-white"
        type="button"
        onClick={onClose}
      >
        Cancel
      </button>
      <button className="w-48 bg-white py-2 text-lg text-black" type="button" onClick={onProceed}>
        Continue
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Transaction Summary"
      content={content}
      footer={footer}
    />
  );
}
