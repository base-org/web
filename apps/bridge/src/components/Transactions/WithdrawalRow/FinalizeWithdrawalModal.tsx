import { memo } from 'react';
import { Modal } from 'apps/bridge/src/components/Modal/Modal';
import { WithdrawProgressBar } from 'apps/bridge/src/components/WithdrawProgressBar/WithdrawProgressBar';
import getConfig from 'next/config';
import { useWaitForTransaction } from 'wagmi';

const { publicRuntimeConfig } = getConfig();

type FinalizeWithdrawalModalProps = {
  isOpen: boolean;
  onClose: () => void;
  finalizeTxHash?: `0x${string}`;
};

type State = 'FINALIZE_NOT_SUBMITTED' | 'FINALIZE_SUBMITTED' | 'FINALIZE_RECEIVED';

const Titles = {
  FINALIZE_NOT_SUBMITTED: 'CONFIRM COMPLETION IN WALLET',
  FINALIZE_SUBMITTED: 'COMPLETING WITHDRAWAL',
  FINALIZE_RECEIVED: 'COMPLETING WITHDRAWAL',
};

const Icons = {
  FINALIZE_NOT_SUBMITTED: 'confirm_deposit',
  FINALIZE_SUBMITTED: 'confirm_deposit',
  FINALIZE_RECEIVED: '',
};

const ModalContents = {
  FINALIZE_NOT_SUBMITTED: 'Completion will begin after confirmation',
  FINALIZE_SUBMITTED: 'Waiting for confirmations...',
  FINALIZE_RECEIVED: <WithdrawProgressBar status="VERIFIED" />,
};

function getState(
  finalizeTxHash?: string,
  isFinalizationLoading?: boolean,
  isFinalizationSuccess?: boolean,
): State {
  if (!finalizeTxHash) {
    return 'FINALIZE_NOT_SUBMITTED';
  }
  if (isFinalizationSuccess) {
    return 'FINALIZE_RECEIVED';
  }
  if (isFinalizationLoading) {
    return 'FINALIZE_SUBMITTED';
  }
  return 'FINALIZE_NOT_SUBMITTED';
}

export const FinalizeWithdrawalModal = memo(function FinalizeWithdrawalModal({
  isOpen,
  onClose,
  finalizeTxHash,
}: FinalizeWithdrawalModalProps) {
  const { isLoading: isFinalizationLoading, isSuccess: isFinalizationSuccess } =
    useWaitForTransaction({
      hash: finalizeTxHash,
    });

  const state = getState(finalizeTxHash, isFinalizationLoading, isFinalizationSuccess);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={Titles[state]}
      content={ModalContents[state]}
      icon={Icons[state]}
      footer={
        finalizeTxHash && (
          <div className="text-center">
            <a
              className="text-md font-sans text-cds-primary"
              href={`${publicRuntimeConfig.l1ExplorerURL}/tx/${finalizeTxHash}`}
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
