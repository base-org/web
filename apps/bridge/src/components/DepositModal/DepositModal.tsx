import { Modal } from 'apps/bridge/src/components/Modal/Modal';
import getConfig from 'next/config';
import Link from 'next/link';
import { useWaitForTransaction } from 'wagmi';

const { publicRuntimeConfig } = getConfig();

type DepositModalProps = {
  isOpen: boolean;
  onClose: () => void;
  L1ApproveTxHash: `0x${string}` | undefined;
  L1DepositTxHash: `0x${string}` | undefined;
  isApprovalTx: boolean;
};

type STATE =
  | 'APPROVAL_LOADING'
  | 'APPROVAL_CONFIRMED'
  | 'APPROVAL_NOT_STARTED'
  | 'DEPOSIT_LOADING'
  | 'DEPOSIT_CONFIRMED'
  | 'DEPOSIT_NOT_STARTED';

function getState(
  isApprovalTx: boolean,
  isApproveLoading: boolean,
  isApproveSuccess: boolean,
  isDepositLoading: boolean,
  isDepositSuccess: boolean,
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
    return 'DEPOSIT_CONFIRMED';
  }

  return 'DEPOSIT_NOT_STARTED';
}

const ModalContents = {
  APPROVAL_NOT_STARTED: 'Approval will initiate after confirmation.',
  APPROVAL_LOADING: 'Waiting for confirmations...',
  APPROVAL_CONFIRMED: 'Transaction confirmed.',
  DEPOSIT_NOT_STARTED: 'Deposit will initiate after confirmation.',
  DEPOSIT_LOADING: 'Waiting for confirmations...',
  DEPOSIT_CONFIRMED: (
    <>
      Deposits typically take a few minutes to reach the Base network. When this is complete, you
      can view this transaction at{' '}
      <span className="underline">
        <Link href="/transactions">bridge.base.org/transactions</Link>
      </span>
      .
    </>
  ),
};

const Titles = {
  APPROVAL_NOT_STARTED: 'APPROVE IN YOUR WALLET',
  APPROVAL_LOADING: 'APPROVING',
  APPROVAL_CONFIRMED: 'APPROVED',
  DEPOSIT_NOT_STARTED: 'CONFIRM DEPOSIT IN WALLET',
  DEPOSIT_LOADING: 'CONFIRMING',
  DEPOSIT_CONFIRMED: 'DEPOSIT IN TRANSIT TO BASE',
};

const Icons = {
  APPROVAL_NOT_STARTED: 'wallet',
  APPROVAL_LOADING: 'wallet',
  APPROVAL_CONFIRMED: 'confirm',
  DEPOSIT_NOT_STARTED: 'wallet',
  DEPOSIT_LOADING: 'wallet',
  DEPOSIT_CONFIRMED: 'deposit',
};

export function DepositModal({
  isOpen,
  onClose,
  L1ApproveTxHash,
  L1DepositTxHash,
  isApprovalTx,
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
