import { memo } from 'react';
import { TransactionIcon } from 'apps/bridge/src/components/TransactionIcon/TransactionIcon';
import { depositPhaseStatusText, depositPhaseText } from 'apps/bridge/src/constants/phaseText';
import { BridgeTransaction } from 'apps/bridge/src/types/BridgeTransaction';
import { truncateMiddle } from 'apps/bridge/src/utils/string/truncateMiddle';
import type { DepositPhase } from 'apps/bridge/src/utils/transactions/phase';
import {
  blockExplorerUrlForL1Transaction,
  blockExplorerUrlForL2Transaction,
} from 'apps/bridge/src/utils/url/blockExplorer';
import getConfig from 'next/config';
import { formatUnits } from 'viem';
import { useWaitForTransaction } from 'wagmi';
import { formatTimestamp } from 'apps/bridge/src/utils/transactions/formatBlockTimestamp';
import { useGetUSDAmount } from 'apps/bridge/src/utils/hooks/useGetUSDAmount';
import { PendingButton } from 'apps/bridge/src/components/Transactions/PendingButton';

const { publicRuntimeConfig } = getConfig();

const PHASE_TO_STATUS: Record<Exclude<DepositPhase, 'DEPOSIT_TX_PENDING'>, string> = {
  DEPOSIT_TX_FAILURE: depositPhaseStatusText.DEPOSIT_TX_FAILURE,
  FUNDS_DEPOSITED: depositPhaseStatusText.FUNDS_DEPOSITED,
};

type OPDepositRowProps = {
  transaction: BridgeTransaction;
};

// Transactions table row component for deposits made using the OP bridge.
export const OPDepositRow = memo(function OPDepositRow({ transaction }: OPDepositRowProps) {
  const { date, shortDate: dateMonthDayOnly, time } = formatTimestamp(transaction.blockTimestamp);
  const depositAmount = formatUnits(BigInt(transaction.amount), transaction.assetDecimals ?? 18);
  const amountFiat = useGetUSDAmount(transaction.priceApiId, depositAmount);

  const { isLoading: isDepositLoading, isSuccess: isDepositSuccess } = useWaitForTransaction({
    chainId: parseInt(publicRuntimeConfig.l1ChainID),
    hash: transaction.hash,
  });

  const explorerURL =
    transaction.type === 'Deposit'
      ? blockExplorerUrlForL1Transaction(transaction.hash)
      : blockExplorerUrlForL2Transaction(transaction.hash);
  const abridgedHash = truncateMiddle(transaction.hash, 6, 4);

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
        {depositStatus === 'DEPOSIT_TX_PENDING' ? (
          <PendingButton />
        ) : (
          PHASE_TO_STATUS[depositStatus]
        )}
      </td>
    </tr>
  );
});
