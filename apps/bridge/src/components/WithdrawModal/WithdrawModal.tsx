import { CCTPBridgeProgressBar } from 'apps/bridge/src/components/CCTPBridgeProgressBar/CCTPBridgeProgressBar';
import { Modal } from 'apps/bridge/src/components/Modal/Modal';
import { WithdrawProgressBar } from 'apps/bridge/src/components/WithdrawProgressBar/WithdrawProgressBar';
import { BridgeProtocol } from 'apps/bridge/src/types/Asset';
import getConfig from 'next/config';
import { ReactNode } from 'react';
import { useWaitForTransaction } from 'wagmi';

const { publicRuntimeConfig } = getConfig();

type WithdrawModalProps = {
  isOpen: boolean;
  onClose: () => void;
  L2ApproveTxHash: `0x${string}` | undefined;
  L2WithdrawTxHash: `0x${string}` | undefined;
  isApprovalTx: boolean;
  protocol: BridgeProtocol;
};

type STATE =
  | 'APPROVAL_LOADING'
  | 'APPROVAL_CONFIRMED'
  | 'APPROVAL_NOT_STARTED'
  | 'WITHDRAWAL_LOADING'
  | 'OP_WITHDRAWAL_STARTED'
  | 'CCTP_WITHDRAWAL_STARTED'
  | 'WITHDRAWAL_NOT_STARTED';

function getState(
  isApprovalTx: boolean,
  isApproveLoading: boolean,
  isApproveSuccess: boolean,
  isWithdrawalLoading: boolean,
  isWithdrawalSuccess: boolean,
  protocol: BridgeProtocol,
): STATE {
  if (isApprovalTx && isApproveLoading) {
    return 'APPROVAL_LOADING';
  }
  if (isApprovalTx && isApproveSuccess) {
    return 'APPROVAL_CONFIRMED';
  }
  if (isApprovalTx) {
    return 'APPROVAL_NOT_STARTED';
  }
  if (!isApprovalTx && isWithdrawalLoading) {
    return 'WITHDRAWAL_LOADING';
  }
  if (!isApprovalTx && isWithdrawalSuccess) {
    return protocol === 'CCTP' ? 'CCTP_WITHDRAWAL_STARTED' : 'OP_WITHDRAWAL_STARTED';
  }

  return 'WITHDRAWAL_NOT_STARTED';
}

const Titles: Record<STATE, string> = {
  APPROVAL_NOT_STARTED: 'APPROVE IN YOUR WALLET',
  APPROVAL_LOADING: 'APPROVING',
  APPROVAL_CONFIRMED: 'APPROVED',
  WITHDRAWAL_NOT_STARTED: 'CONFIRM WITHDRAWAL IN WALLET',
  WITHDRAWAL_LOADING: 'CONFIRMING',
  OP_WITHDRAWAL_STARTED: 'WITHDRAWAL IN PROGRESS',
  CCTP_WITHDRAWAL_STARTED: 'WITHDRAWAL IN PROGRESS',
};

const Icons: Record<STATE, string> = {
  APPROVAL_NOT_STARTED: 'wallet',
  APPROVAL_LOADING: 'wallet',
  APPROVAL_CONFIRMED: 'confirm',
  WITHDRAWAL_NOT_STARTED: 'wallet',
  WITHDRAWAL_LOADING: 'wallet',
  OP_WITHDRAWAL_STARTED: '',
  CCTP_WITHDRAWAL_STARTED: '',
};

const ModalContents: Record<STATE, ReactNode> = {
  APPROVAL_NOT_STARTED: 'Approval will initiate after confirmation.',
  APPROVAL_LOADING: 'Waiting for confirmations...',
  APPROVAL_CONFIRMED: 'Transaction confirmed.',
  WITHDRAWAL_NOT_STARTED: 'Withdrawal will initiate after confirmation.',
  WITHDRAWAL_LOADING: 'Waiting for confirmations...',
  OP_WITHDRAWAL_STARTED: <WithdrawProgressBar status="REQUEST_SENT" />,
  CCTP_WITHDRAWAL_STARTED: <CCTPBridgeProgressBar status="REQUEST_SENT" />,
};

export function WithdrawModal({
  isOpen,
  onClose,
  L2ApproveTxHash,
  L2WithdrawTxHash,
  isApprovalTx,
  protocol,
}: WithdrawModalProps) {
  const { isLoading: isApproveLoading, isSuccess: isApproveSuccess } = useWaitForTransaction({
    hash: L2ApproveTxHash,
  });

  const { isLoading: isWithdrawalLoading, isSuccess: isWithdrawalSuccess } = useWaitForTransaction({
    hash: L2WithdrawTxHash,
  });

  const state = getState(
    isApprovalTx,
    isApproveLoading,
    isApproveSuccess,
    isWithdrawalLoading,
    isWithdrawalSuccess,
    protocol,
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={Titles[state]}
      content={ModalContents[state]}
      icon={Icons[state]}
      footer={
        L2WithdrawTxHash && (
          <div className="text-center">
            <a
              className="text-md font-sans text-cds-primary"
              href={`${publicRuntimeConfig.l2ExplorerURL}/tx/${L2WithdrawTxHash}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              View Transaction
            </a>
          </div>
        )
      }
    />
  );
}
