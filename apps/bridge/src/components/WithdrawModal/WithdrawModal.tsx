import { Modal } from 'apps/bridge/src/components/Modal/Modal';
import { WithdrawProgressBar } from 'apps/bridge/src/components/WithdrawProgressBar/WithdrawProgressBar';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

type WithdrawModalProps = {
  isOpen: boolean;
  onClose: () => void;
  L2TxHash: string;
};

const Titles = {
  WITHDRAW_NOT_STARTED: 'CONFIRM WITHDRAWAL IN WALLET',
  WITHDRAW_STARTED: 'WITHDRAWAL IN PROGRESS',
};

const Icons = {
  WITHDRAW_NOT_STARTED: 'wallet',
  WITHDRAW_STARTED: '',
};

const ModalContents = {
  WITHDRAW_NOT_STARTED: 'Withdrawal will begin after confirmation.',
  WITHDRAW_STARTED: <WithdrawProgressBar status="REQUEST_SENT" />,
};

export function WithdrawModal({ isOpen, onClose, L2TxHash }: WithdrawModalProps) {
  const state = L2TxHash === '' ? 'WITHDRAW_NOT_STARTED' : 'WITHDRAW_STARTED';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={Titles[state]}
      content={ModalContents[state]}
      icon={Icons[state]}
      footer={
        L2TxHash !== '' && (
          <div className="text-center">
            <a
              className="text-md font-sans text-cds-primary"
              href={`${publicRuntimeConfig.l2ExplorerURL}/tx/${L2TxHash}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              View on Basescan
            </a>
          </div>
        )
      }
    />
  );
}
