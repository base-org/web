import { Asset, CustomChain } from 'apps/bridge/src/types/Asset';
import { Network } from 'apps/bridge/src/types/Network';
import { formatCryptoBalance, usdFormatter } from 'apps/bridge/src/utils/formatter/balance';
import { useConversionRate } from 'apps/bridge/src/utils/hooks/useConversionRate';
import { useFindChainByNetwork } from 'apps/bridge/src/utils/hooks/useFindNetwork';
import { networkToLayer } from 'apps/bridge/src/utils/networks/networkToLayer';
import getConfig from 'next/config';
import { useFeeData } from 'wagmi';

const { publicRuntimeConfig } = getConfig();

type DepositSummaryProps = {
  outputNetwork: Network;
  balance: string;
  header: string;
  chainId: string;
  selectedAsset: Asset;
  isDeposit: boolean;
};

const challengeWindow = publicRuntimeConfig.l1ChainID === '1' ? '7 days' : '12 seconds';

export function TransactionSummary({
  balance,
  outputNetwork,
  header,
  chainId,
  selectedAsset,
  isDeposit,
}: DepositSummaryProps) {
  const outputChain = useFindChainByNetwork({ network: outputNetwork }) as CustomChain;
  const ethConversionRate = useConversionRate({ asset: selectedAsset.apiId });
  const { data: feeData } = useFeeData({
    formatUnits: 'ether',
    chainId: parseInt(chainId),
  });
  const gasPrice = parseFloat(feeData?.formatted?.gasPrice ?? '0');
  const cryptoBalance = balance && +balance > 0 ? formatCryptoBalance(balance) : 0;
  const transactionTotal = balance && +balance > 0 ? gasPrice + +balance : 0;
  const fiatBalance =
    ethConversionRate && +balance > 0 ? usdFormatter(ethConversionRate * +balance) : '$0';

  const networkLayer = networkToLayer(outputNetwork);
  const selectedAssetSymbol =
    networkLayer === 'L1' ? selectedAsset.L1symbol : selectedAsset.L2symbol;

  return (
    <div className="flex max-w-xl flex-col border-t font-sans">
      <div className="text-md p-6 font-mono text-white">{header}</div>
      <div className="relative flex w-full flex-row justify-between p-6 pb-0">
        <div className="has-tooltip">
          {selectedAsset.L1symbol === 'USDC' && (
            <a
              href="https://help.coinbase.com/en/coinbase/getting-started/crypto-education/usd-base-coin"
              target="_blank"
              rel="noreferrer noopener"
              className="tooltip -mt-10 ml-6 rounded-lg bg-cds-background-gray-90 p-2 text-black underline shadow-lg"
            >
              Learn more
            </a>
          )}
          <div className="flex grow flex-col text-white">
            <span className="font-medium">Receive {selectedAssetSymbol}</span>
            <p className="text-stone-400">On {outputChain.summary.location}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-white">
            {cryptoBalance} {selectedAssetSymbol}
          </span>
          <p className="text-stone-400">{fiatBalance}</p>
        </div>
      </div>
      <div className="flex w-full flex-row justify-between p-6 pb-0 text-white">
        <div className="flex grow flex-col text-white">
          <span className="font-medium">Transfer time</span>
          <p className="text-stone-400">
            {isDeposit ? '' : `Withdrawals take about ${challengeWindow} to finalize on Base`}
          </p>
        </div>
        <p className="text-right">{isDeposit ? 'A few minutes' : `About ${challengeWindow}`}</p>
      </div>
      <div className="flex w-full flex-row justify-between p-6 pb-0 text-white">
        <span className="font-medium">Network fee (est.) </span>
        <div className="text-right">
          <span>{gasPrice.toFixed(9)} ETH</span>
          <p className="text-stone-400">
            {ethConversionRate ? usdFormatter(gasPrice * ethConversionRate, 6) : '$0'} USD
          </p>
        </div>
      </div>
      <div className="flex w-full flex-row justify-between p-6 pb-0 text-white">
        <span className="font-medium">Total with (est.) fee</span>
        <div className="text-right">
          <span>{transactionTotal.toFixed(9)} ETH</span>
          <p className="text-stone-400">
            {ethConversionRate ? usdFormatter(transactionTotal * ethConversionRate, 6) : '$0'} USD
          </p>
        </div>
      </div>
    </div>
  );
}
