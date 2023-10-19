import { Dispatch, SetStateAction, memo } from 'react';
import { BridgeTransaction } from 'apps/bridge/src/types/BridgeTransaction';
import { CCTPBridgeRow } from 'apps/bridge/src/components/Transactions/CCTPBridgeRow/CCTPBridgeRow';
import { OPWithdrawalRow } from 'apps/bridge/src/components/Transactions/WithdrawalRow/OPWithdrawalRow';

type WithdrawalRowProps = {
  transaction: BridgeTransaction;
  blockNumberOfLatestL2OutputProposal?: bigint;
  onOpenProveWithdrawalModal: () => void;
  onCloseProveWithdrawalModal: () => void;
  onOpenFinalizeWithdrawalModal: () => void;
  onCloseFinalizeWithdrawalModal: () => void;
  onOpenFinalizeCCTPBridgeModal: () => void;
  onCloseFinalizeCCTPBridgeModal: () => void;
  setModalProveTxHash: Dispatch<SetStateAction<`0x${string}` | undefined>>;
  setModalFinalizeOPTxHash: Dispatch<SetStateAction<`0x${string}` | undefined>>;
  setModalFinalizeCCTPTxHash: Dispatch<SetStateAction<`0x${string}` | undefined>>;
};

export const WithdrawalRow = memo(function WithdrawalRow({
  transaction,
  blockNumberOfLatestL2OutputProposal,
  onOpenProveWithdrawalModal,
  onCloseProveWithdrawalModal,
  onOpenFinalizeWithdrawalModal,
  onCloseFinalizeWithdrawalModal,
  onOpenFinalizeCCTPBridgeModal,
  onCloseFinalizeCCTPBridgeModal,
  setModalProveTxHash,
  setModalFinalizeOPTxHash,
  setModalFinalizeCCTPTxHash,
}: WithdrawalRowProps) {
  if (transaction.protocol === 'CCTP') {
    return (
      <CCTPBridgeRow
        transaction={transaction}
        bridgeDirection="withdraw"
        onOpenFinalizeCCTPBridgeModal={onOpenFinalizeCCTPBridgeModal}
        onCloseFinalizeCCTPBridgeModal={onCloseFinalizeCCTPBridgeModal}
        setModalFinalizeCCTPTxHash={setModalFinalizeCCTPTxHash}
      />
    );
  }

  return (
    <OPWithdrawalRow
      transaction={transaction}
      blockNumberOfLatestL2OutputProposal={blockNumberOfLatestL2OutputProposal}
      onOpenProveWithdrawalModal={onOpenProveWithdrawalModal}
      onCloseProveWithdrawalModal={onCloseProveWithdrawalModal}
      onOpenFinalizeWithdrawalModal={onOpenFinalizeWithdrawalModal}
      onCloseFinalizeWithdrawalModal={onCloseFinalizeWithdrawalModal}
      setModalProveTxHash={setModalProveTxHash}
      setModalFinalizeTxHash={setModalFinalizeOPTxHash}
    />
  );
});
