import { Dispatch, SetStateAction, memo } from 'react';
import { BridgeTransaction } from 'apps/bridge/src/types/BridgeTransaction';
import { OPDepositRow } from 'apps/bridge/src/components/Transactions/DepositRow/OPDepositRow';
import { CCTPBridgeRow } from 'apps/bridge/src/components/Transactions/CCTPBridgeRow/CCTPBridgeRow';

type DepositRowProps = {
  transaction: BridgeTransaction;
  onOpenFinalizeCCTPBridgeModal: () => void;
  onCloseFinalizeCCTPBridgeModal: () => void;
  setModalFinalizeCCTPTxHash: Dispatch<SetStateAction<`0x${string}` | undefined>>;
};

export const DepositRow = memo(function DepositRow({
  transaction,
  onOpenFinalizeCCTPBridgeModal,
  onCloseFinalizeCCTPBridgeModal,
  setModalFinalizeCCTPTxHash,
}: DepositRowProps) {
  if (transaction.protocol === 'CCTP') {
    return (
      <CCTPBridgeRow
        transaction={transaction}
        bridgeDirection="deposit"
        onOpenFinalizeCCTPBridgeModal={onOpenFinalizeCCTPBridgeModal}
        onCloseFinalizeCCTPBridgeModal={onCloseFinalizeCCTPBridgeModal}
        setModalFinalizeCCTPTxHash={setModalFinalizeCCTPTxHash}
      />
    );
  }

  return <OPDepositRow transaction={transaction} />;
});
