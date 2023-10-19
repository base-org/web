import { CCTPBridgeProgressBar } from 'apps/bridge/src/components/CCTPBridgeProgressBar/CCTPBridgeProgressBar';
import { Modal } from 'apps/bridge/src/components/Modal/Modal';
import { BridgeProtocol } from 'apps/bridge/src/types/Asset';
import getConfig from 'next/config';
import Link from 'next/link';
import { ReactNode } from 'react';
import { useWaitForTransaction } from 'wagmi';

const { publicRuntimeConfig } = getConfig();

type DepositModalProps = {
  isOpen: boolean;
  onClose: () => void;
  L1ApproveTxHash: `0x${string}` | undefined;
  L1DepositTxHash: `0x${string}` | undefined;
  isApprovalTx: boolean;
  protocol: BridgeProtocol;
};

type STATE =
  | 'APPROVAL_LOADING'
  | 'APPROVAL_CONFIRMED'
  | 'APPROVAL_NOT_STARTED'
  | 'DEPOSIT_LOADING'
  | 'OP_DEPOSIT_STARTED'
  | 'CCTP_DEPOSIT_STARTED'
  | 'DEPOSIT_NOT_STARTED';

function getState(
  isApprovalTx: boolean,
  isApproveLoading: boolean,
  isApproveSuccess: boolean,
  isDepositLoading: boolean,
  isDepositSuccess: boolean,
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
  if (!isApprovalTx && isDepositLoading) {
    return 'DEPOSIT_LOADING';
  }
  if (!isApprovalTx && isDepositSuccess) {
    return protocol === 'CCTP' ? 'CCTP_DEPOSIT_STARTED' : 'OP_DEPOSIT_STARTED';
  }

  return 'DEPOSIT_NOT_STARTED';
}

const ModalContents: Record<STATE, ReactNode> = {
  APPROVAL_NOT_STARTED: 'Approval will initiate after confirmation.',
  APPROVAL_LOADING: 'Waiting for confirmations...',
  APPROVAL_CONFIRMED: 'Transaction confirmed.',
  DEPOSIT_NOT_STARTED: 'Deposit will initiate after confirmation.',
  DEPOSIT_LOADING: 'Waiting for confirmations...',
  OP_DEPOSIT_STARTED: (
    <>
      Deposits typically take a few minutes to reach the Base network. When this is complete, you
      can view this transaction at{' '}
      <span className="underline">
        <Link href="/transactions">bridge.base.org/transactions</Link>
      </span>
      .
    </>
  ),
  CCTP_DEPOSIT_STARTED: <CCTPBridgeProgressBar status="REQUEST_SENT" />,
};

const Titles: Record<STATE, string> = {
  APPROVAL_NOT_STARTED: 'APPROVE IN YOUR WALLET',
  APPROVAL_LOADING: 'APPROVING',
  APPROVAL_CONFIRMED: 'APPROVED',
  DEPOSIT_NOT_STARTED: 'CONFIRM DEPOSIT IN WALLET',
  DEPOSIT_LOADING: 'CONFIRMING',
  OP_DEPOSIT_STARTED: 'DEPOSIT IN TRANSIT TO BASE',
  CCTP_DEPOSIT_STARTED: 'DEPOSIT IN PROGRESS',
};

const Icons: Record<STATE, string> = {
  APPROVAL_NOT_STARTED: 'wallet',
  APPROVAL_LOADING: 'wallet',
  APPROVAL_CONFIRMED: 'confirm',
  DEPOSIT_NOT_STARTED: 'wallet',
  DEPOSIT_LOADING: 'wallet',
  OP_DEPOSIT_STARTED: 'deposit',
  CCTP_DEPOSIT_STARTED: '',
};

export function DepositModal({
  isOpen,
  onClose,
  L1ApproveTxHash,
  L1DepositTxHash,
  isApprovalTx,
  protocol,
}: DepositModalProps) {
  const { isLoading: isApproveLoading, isSuccess: isApproveSuccess } = useWaitForTransaction({
    hash: L1ApproveTxHash,
  });

  const { isLoading: isDepositLoading, isSuccess: isDepositSuccess } = useWaitForTransaction({
    hash: L1DepositTxHash,
  });

  const state = getState(
    isApprovalTx,
    isApproveLoading,
    isApproveSuccess,
    isDepositLoading,
    isDepositSuccess,
    protocol,
  );

  const L1TxHash = isApprovalTx ? L1ApproveTxHash : L1DepositTxHash;
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={Titles[state]}
      content={ModalContents[state]}
      icon={Icons[state]}
      footer={
        L1TxHash && (
          <div className="text-center">
            <a
              className="text-md font-sans text-cds-primary"
              href={`${publicRuntimeConfig.l1ExplorerURL}/tx/${L1TxHash}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              View on Etherscan
            </a>
          </div>
        )
      }
    />
  );
}
