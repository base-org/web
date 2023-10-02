import { memo } from 'react';
import { TransactionIcon } from 'apps/bridge/src/components/TransactionIcon/TransactionIcon';
import { depositPhaseStatusText, depositPhaseText } from 'apps/bridge/src/constants/phaseText';
import { BridgeTransaction } from 'apps/bridge/src/types/BridgeTransaction';
import { usdFormatter } from 'apps/bridge/src/utils/formatter/balance';
import { useChainEnv } from 'apps/bridge/src/utils/hooks/useChainEnv';
import { useConversionRate } from 'apps/bridge/src/utils/hooks/useConversionRate';
import { truncateMiddle } from 'apps/bridge/src/utils/string/truncateMiddle';
import type { DepositPhase } from 'apps/bridge/src/utils/transactions/phase';
import {
  blockExplorerUrlForL1Transaction,
  blockExplorerUrlForL2Transaction,
} from 'apps/bridge/src/utils/url/blockExplorer';
import { utils } from 'ethers';
import getConfig from 'next/config';
import { useWaitForTransaction } from 'wagmi';

const { publicRuntimeConfig } = getConfig();

type DepositRowProps = {
  transaction: BridgeTransaction;
};

export const DepositRow = memo(function WithdrawalRow({ transaction }: DepositRowProps) {
  const date = transaction.blockTimestamp
    ? new Date(Number(transaction.blockTimestamp) * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : undefined;
  const dateMonthDayOnly = transaction.blockTimestamp
    ? new Date(Number(transaction.blockTimestamp) * 1000).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })
    : undefined;
  const time = transaction.blockTimestamp
    ? new Date(Number(transaction.blockTimestamp) * 1000).toLocaleTimeString('en-US', {
        timeStyle: 'short',
      })
    : undefined;
  const depositAmount = utils.formatUnits(
    transaction.amount,
    // TODO: get decimals from asset list
    transaction.assetSymbol === 'USDC' ? 6 : 18,
  );

  const conversionRateData = useConversionRate({
    asset: transaction.priceApiId,
  });

  const amountFiat =
    conversionRateData && depositAmount
      ? usdFormatter(conversionRateData * +depositAmount)
      : '$0.00';

  const { isLoading: isDepositLoading, isSuccess: isDepositSuccess } = useWaitForTransaction({
    chainId: parseInt(publicRuntimeConfig.l1ChainID),
    hash: transaction.hash,
  });

  const explorerURL =
    transaction.type === 'Deposit'
      ? blockExplorerUrlForL1Transaction(transaction.hash)
      : blockExplorerUrlForL2Transaction(transaction.hash);
  const abridgedHash = truncateMiddle(transaction.hash, 6, 4);

  const pendingButton = (
    <button type="button" className="w-32 rounded bg-white py-2 font-sans text-sm text-black">
      <svg
        aria-hidden="true"
        className="text-gray-200 dark:text-gray-600 mr-2 inline h-4 w-4 animate-spin fill-blue-600"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="grey"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="black"
        />
      </svg>
      Pending
    </button>
  );

  const PHASE_TO_STATUS = {
    DEPOSIT_TX_PENDING: pendingButton,
    DEPOSIT_TX_FAILURE: depositPhaseStatusText.DEPOSIT_TX_FAILURE,
    FUNDS_DEPOSITED: depositPhaseStatusText.FUNDS_DEPOSITED,
  };

  let depositStatus: DepositPhase;
  if (isDepositLoading) {
    depositStatus = 'DEPOSIT_TX_PENDING';
  } else if (isDepositSuccess) {
    depositStatus = 'FUNDS_DEPOSITED';
  } else {
    depositStatus = 'DEPOSIT_TX_FAILURE';
  }

  return (
    <tr className="mb-4 grid grid-cols-2 grid-rows-2 md:table-row">
      <td className="hidden md:table-cell">
        <div className="flex flex-row items-start gap-2">
          <TransactionIcon bridgeDirection="deposit" phase={depositStatus} />
          <div className="flex flex-col">
            <p>{date ?? ''}</p>
            <p>{time ?? ''}</p>
          </div>
        </div>
      </td>
      {/* mobile design - left column */}
      <td className="md:hidden">
        <div className="flex flex-row items-start gap-2">
          <TransactionIcon bridgeDirection="deposit" phase={depositStatus} />
          <div className="flex flex-col">
            <a
              target="_blank"
              href={explorerURL}
              rel="noreferrer noopener"
              className="whitespace-nowrap font-sans text-sm"
            >
              {abridgedHash}
            </a>
            <div className="flex flex-row text-cds-background-gray-60">
              {transaction.type}
              <h3>&#8226;</h3>
              <p>{dateMonthDayOnly ?? ''}</p>
            </div>
          </div>
        </div>
      </td>
      <td className="hidden md:table-cell">
        <div className="flex flex-col">
          {transaction.type}
          <a
            target="_blank"
            href={explorerURL}
            rel="noreferrer noopener"
            className="text-cds-background-gray-60 underline"
          >
            {abridgedHash}
          </a>
        </div>
      </td>
      {/* mobile design - right column */}
      <td className="md:table-cell md:hidden">
        <div className="flex flex-col items-end">
          <div>{`${depositAmount} ${transaction.assetSymbol}`}</div>
          <div className="text-cds-background-gray-60">{`${amountFiat} USD`}</div>
        </div>
      </td>
      <td className="hidden md:table-cell">
        <div className="flex flex-col">
          <div>{`${depositAmount} ${transaction.assetSymbol}`}</div>
          <div className="text-cds-background-gray-60">{`${amountFiat} USD`}</div>
        </div>
      </td>
      <td className="hidden md:table-cell">
        <div className="flex flex-col">
          <div className="flex h-6 grow flex-row items-center gap-2">
            <div className="border-gray-400 w-36 border-t-4" />
          </div>
          <div className="text-cds-background-gray-60">{depositPhaseText[depositStatus]}</div>
        </div>
      </td>
      <td className="hidden text-end text-cds-background-gray-60 md:table-cell md:text-start">
        {PHASE_TO_STATUS[depositStatus]}
      </td>
    </tr>
  );
});
