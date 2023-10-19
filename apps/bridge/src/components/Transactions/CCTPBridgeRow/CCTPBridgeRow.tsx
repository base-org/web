import { TransactionIcon } from 'apps/bridge/src/components/TransactionIcon/TransactionIcon';
import { BridgePhaseIndicator } from 'apps/bridge/src/components/Transactions/BridgePhaseIndicator';
import { CCTPBridgeStatus } from 'apps/bridge/src/components/Transactions/CCTPBridgeRow/CCTPBridgeStatus';
import { cctpBridgePhaseText } from 'apps/bridge/src/constants/phaseText';
import { BridgeTransaction } from 'apps/bridge/src/types/BridgeTransaction';
import { useCCTPBridgeStatus } from 'apps/bridge/src/utils/hooks/useCCTPBridgeStatus';
import { useGetUSDAmount } from 'apps/bridge/src/utils/hooks/useGetUSDAmount';
import { truncateMiddle } from 'apps/bridge/src/utils/string/truncateMiddle';
import { formatTimestamp } from 'apps/bridge/src/utils/transactions/formatBlockTimestamp';
import {
  blockExplorerUrlForL1Transaction,
  blockExplorerUrlForL2Transaction,
} from 'apps/bridge/src/utils/url/blockExplorer';
import { formatUnits } from 'viem';
import { Dispatch, SetStateAction, memo } from 'react';

type CCTPBridgeRowProps = {
  transaction: BridgeTransaction;
  bridgeDirection: 'deposit' | 'withdraw';
  onOpenFinalizeCCTPBridgeModal: () => void;
  onCloseFinalizeCCTPBridgeModal: () => void;
  setModalFinalizeCCTPTxHash: Dispatch<SetStateAction<`0x${string}` | undefined>>;
};

// Transactions table row component for Bridges made using Circle's CCTP.
export const CCTPBridgeRow = memo(function CCTPBridgeRow({
  transaction,
  bridgeDirection,
  onOpenFinalizeCCTPBridgeModal,
  onCloseFinalizeCCTPBridgeModal,
  setModalFinalizeCCTPTxHash,
}: CCTPBridgeRowProps) {
  const { date, shortDate, time } = formatTimestamp(transaction.blockTimestamp);
  const { status, setStatus, message, attestation } = useCCTPBridgeStatus({
    initiateTxHash: transaction.hash,
    bridgeDirection,
  });

  const explorerURL =
    bridgeDirection === 'deposit'
      ? blockExplorerUrlForL1Transaction(transaction.hash)
      : blockExplorerUrlForL2Transaction(transaction.hash);
  const abridgedHash = truncateMiddle(transaction.hash, 6, 4);

  const bridgeAmount = formatUnits(BigInt(transaction.amount), transaction.assetDecimals ?? 18);
  const amountFiat = useGetUSDAmount(transaction.priceApiId, bridgeAmount);

  return (
    <tr className="mb-4 grid grid-cols-2 grid-rows-2 md:table-row">
      <td className="hidden md:table-cell">
        <div className="flex flex-row items-start gap-2">
          <TransactionIcon bridgeDirection={bridgeDirection} phase={status} protocol="CCTP" />
          <div className="flex flex-col">
            <p>{date ?? ''}</p>
            <p>{time ?? ''}</p>
          </div>
        </div>
      </td>
      {/* mobile design - left column */}
      <td className="md:hidden">
        <div className="flex flex-row items-start gap-2">
          <TransactionIcon bridgeDirection={bridgeDirection} phase={status} protocol="CCTP" />
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
              <p>{shortDate ?? ''}</p>
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
      <td className="md:hidden">
        <div className="flex flex-col items-end">
          <div>{`${bridgeAmount} ${transaction.assetSymbol}`}</div>
          <div className="text-cds-background-gray-60">{`${amountFiat} USD`}</div>
        </div>
      </td>
      <td className="hidden md:table-cell">
        <div className="flex flex-col">
          <div>{`${bridgeAmount} ${transaction.assetSymbol}`}</div>
          <div className="text-cds-background-gray-60">{`${amountFiat} USD`}</div>
        </div>
      </td>
      <td className="hidden md:table-cell">
        <div className="flex flex-col">
          <BridgePhaseIndicator phase={status} protocol="CCTP" />
          <div className="text-cds-background-gray-60">{cctpBridgePhaseText[status]}</div>
        </div>
      </td>
      <CCTPBridgeStatus
        phase={status}
        message={message}
        attestation={attestation}
        bridgeDirection={bridgeDirection}
        setStatus={setStatus}
        onOpenFinalizeCCTPBridgeModal={onOpenFinalizeCCTPBridgeModal}
        onCloseFinalizeCCTPBridgeModal={onCloseFinalizeCCTPBridgeModal}
        setModalFinalizeCCTPTxHash={setModalFinalizeCCTPTxHash}
      />
    </tr>
  );
});
