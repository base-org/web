import { memo } from 'react';
import { Modal } from 'apps/bridge/src/components/Modal/Modal';
import { useWaitForTransaction } from 'wagmi';
import {
  blockExplorerUrlForL1Transaction,
  blockExplorerUrlForL2Transaction,
} from 'apps/bridge/src/utils/url/blockExplorer';
import { CCTPBridgeProgressBar } from 'apps/bridge/src/components/CCTPBridgeProgressBar/CCTPBridgeProgressBar';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const l2ChainID = parseInt(publicRuntimeConfig.l2ChainID);

type FinalizeCCTPBridgeModalProps = {
  isOpen: boolean;
  onClose: () => void;
  finalizeTxHash?: `0x${string}`;
};

type State = 'FINALIZE_NOT_SUBMITTED' | 'FINALIZE_SUBMITTED' | 'FINALIZE_RECEIVED';

const Titles = {
  FINALIZE_NOT_SUBMITTED: 'CONFIRM COMPLETION IN WALLET',
  FINALIZE_SUBMITTED: 'COMPLETING BRIDGE',
  FINALIZE_RECEIVED: 'COMPLETING BRIDGE',
};

const Icons = {
  FINALIZE_NOT_SUBMITTED: 'confirm_deposit',
  FINALIZE_SUBMITTED: 'confirm_deposit',
  FINALIZE_RECEIVED: '',
};

const ModalContents = {
  FINALIZE_NOT_SUBMITTED: 'Completion will begin after confirmation',
  FINALIZE_SUBMITTED: 'Waiting for confirmations...',
  FINALIZE_RECEIVED: <CCTPBridgeProgressBar status="VERIFIED" />,
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

export const FinalizeCCTPBridgeModal = memo(function FinalizeCCTPBridgeModal({
  isOpen,
  onClose,
  finalizeTxHash,
}: FinalizeCCTPBridgeModalProps) {
  const { isLoading: isFinalizationLoading, isSuccess: isFinalizationSuccess } =
    useWaitForTransaction({
      hash: finalizeTxHash,
    });

  // We don't have access to wheter this is a deposit or withdrawal here, so just
  // see if we can get a receipt for the transaction on L2. If we can, it's a deposit,
  // because deposits are finalized with an L2 tx.
  const { isSuccess: isDeposit, isLoading } = useWaitForTransaction({
    hash: finalizeTxHash,
    chainId: l2ChainID,
  });
  const bridgeDirection = isDeposit ? 'deposit' : 'withdraw';

  const state = getState(finalizeTxHash, isFinalizationLoading, isFinalizationSuccess);

  const explorerURL =
    bridgeDirection === 'withdraw'
      ? blockExplorerUrlForL1Transaction(finalizeTxHash ?? '')
      : blockExplorerUrlForL2Transaction(finalizeTxHash ?? '');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={Titles[state]}
      content={ModalContents[state]}
      icon={Icons[state]}
      footer={
        finalizeTxHash &&
        !isLoading && (
          <div className="text-center">
            <a
              className="text-md font-sans text-cds-primary"
              href={explorerURL}
              target="_blank"
              rel="noreferrer noopener"
            >
              {`View on ${bridgeDirection === 'withdraw' ? 'Etherscan' : 'Basescan'}`}
            </a>
          </div>
        )
      }
    />
  );
});
