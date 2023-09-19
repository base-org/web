import { memo } from 'react';
import { Modal } from 'apps/bridge/src/components/Modal/Modal';
import { WithdrawProgressBar } from 'apps/bridge/src/components/WithdrawProgressBar/WithdrawProgressBar';
import getConfig from 'next/config';
import { useWaitForTransaction } from 'wagmi';

const { publicRuntimeConfig } = getConfig();

type ProveWithdrawalModalProps = {
  isOpen: boolean;
  onClose: () => void;
  proveTxHash?: `0x${string}`;
};

type State = 'PROOF_NOT_SUBMITTED' | 'PROOF_SUBMITTED' | 'PROOF_RECEIVED';

const Titles = {
  PROOF_NOT_SUBMITTED: 'CONFIRM VERIFICATION IN WALLET',
  PROOF_SUBMITTED: 'VERIFICATION IN PROGRESS',
  PROOF_RECEIVED: 'VERIFICATION IN PROGRESS',
};

const Icons = {
  PROOF_NOT_SUBMITTED: 'confirm_deposit',
  PROOF_SUBMITTED: 'confirm_deposit',
  PROOF_RECEIVED: '',
};

const ModalContents = {
  PROOF_NOT_SUBMITTED: 'Verification will begin after confirmation',
  PROOF_SUBMITTED: 'Waiting for confirmations...',
  PROOF_RECEIVED: <WithdrawProgressBar status="VERIFYING" />,
};

function getState(
  proveTxHash?: string,
  isProofSubmissionLoading?: boolean,
  isProofSubmissionSuccess?: boolean,
): State {
  if (!proveTxHash) {
    return 'PROOF_NOT_SUBMITTED';
  }
  if (isProofSubmissionSuccess) {
    return 'PROOF_RECEIVED';
  }
  if (isProofSubmissionLoading) {
    return 'PROOF_SUBMITTED';
  }
  return 'PROOF_NOT_SUBMITTED';
}

export const ProveWithdrawalModal = memo(function ProveWithdrawalModal({
  isOpen,
  onClose,
  proveTxHash,
}: ProveWithdrawalModalProps) {
  const { isLoading: isProofSubmissionLoading, isSuccess: isProofSubmissionSuccess } =
    useWaitForTransaction({
      hash: proveTxHash,
    });

  const state = getState(proveTxHash, isProofSubmissionLoading, isProofSubmissionSuccess);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={Titles[state]}
      content={ModalContents[state]}
      icon={Icons[state]}
      footer={
        proveTxHash && (
          <div className="text-center">
            <a
              className="text-md font-sans text-cds-primary"
              href={`${publicRuntimeConfig.l1ExplorerURL}/tx/${proveTxHash}`}
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
});
