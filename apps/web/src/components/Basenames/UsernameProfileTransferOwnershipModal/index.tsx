'use client';
import { useCallback, useEffect, useMemo } from 'react';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import Modal from 'apps/web/src/components/Modal';
import SearchAddressInput from 'apps/web/src/components/SearchAddressInput';
import { isAddress } from 'viem';
import { useAccount } from 'wagmi';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import { useErrors } from 'apps/web/contexts/Errors';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import {
  OwnershipSteps,
  useProfileTransferOwnership,
} from 'apps/web/src/components/Basenames/UsernameProfileTransferOwnershipModal/context';
import WalletIdentity from 'apps/web/src/components/WalletIdentity';
import BasenameIdentity from 'apps/web/src/components/BasenameIdentity';
import { OwnershipTransactionState } from 'apps/web/src/components/Basenames/UsernameProfileTransferOwnershipModal/OwnershipTransactionState';

const ownershipStepsTitleForDisplay = {
  [OwnershipSteps.Search]: 'Send name',
  [OwnershipSteps.OwnershipOverview]: "You'll be sending",
  [OwnershipSteps.WalletRequests]: 'Confirm transactions',
  [OwnershipSteps.Success]: '',
};

type UsernameProfileTransferOwnershipModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function UsernameProfileTransferOwnershipModal({
  isOpen,
  onClose,
}: UsernameProfileTransferOwnershipModalProps) {
  // Hooks
  const { address } = useAccount();
  const { profileOwnerRefetch, setShowProfileSettings, profileUsername } = useUsernameProfile();
  const { logError } = useErrors();
  const {
    isSuccess,
    currentOwnershipStep,
    setCurrentOwnershipStep,
    recipientAddress,
    setRecipientAddress,
    ownershipSettings,
    batchTransactionsEnabled,
  } = useProfileTransferOwnership();

  // States
  const isValidRecipientAddress = isAddress(recipientAddress);

  // Callbacks
  const onChangeSearchAddress = useCallback(
    (value: string) => {
      setRecipientAddress(value);
    },
    [setRecipientAddress],
  );

  const onConfirmRecipientAddress = useCallback(() => {
    setCurrentOwnershipStep(OwnershipSteps.OwnershipOverview);
  }, [setCurrentOwnershipStep]);

  const onBackClick = useCallback(() => {
    if (currentOwnershipStep === OwnershipSteps.OwnershipOverview)
      setCurrentOwnershipStep(OwnershipSteps.Search);
  }, [currentOwnershipStep, setCurrentOwnershipStep]);

  const onUpdateOwnershipClick = useCallback(() => {
    if (!address) return;
    if (!isValidRecipientAddress) return;

    setCurrentOwnershipStep(OwnershipSteps.WalletRequests);
  }, [address, isValidRecipientAddress, setCurrentOwnershipStep]);

  const handleOnClose = useCallback(() => {
    if (currentOwnershipStep !== OwnershipSteps.Success) {
      onClose();
      return;
    }

    profileOwnerRefetch()
      .then(() => {
        setShowProfileSettings(false);
        onClose();
      })
      .catch((error) => {
        logError(error, 'Failed to refetch Owner');
      });
  }, [currentOwnershipStep, logError, onClose, profileOwnerRefetch, setShowProfileSettings]);

  // Memos
  const onBack = useMemo(() => {
    if (currentOwnershipStep === OwnershipSteps.OwnershipOverview) return onBackClick;
  }, [currentOwnershipStep, onBackClick]);

  // Effects
  useEffect(() => {
    if (isSuccess) {
      setCurrentOwnershipStep(OwnershipSteps.Success);
    }
  }, [isSuccess, setCurrentOwnershipStep]);

  return (
    <Modal
      isOpen={isOpen}
      title={ownershipStepsTitleForDisplay[currentOwnershipStep]}
      onClose={handleOnClose}
      onBack={onBack}
      titleAlign="left"
    >
      {currentOwnershipStep === OwnershipSteps.Search && (
        <div className="mt-2 flex flex-col gap-4">
          <p>Enter the ETH address or name you want to send your name to. </p>
          <SearchAddressInput onChange={onChangeSearchAddress} />
          <Button
            disabled={!isValidRecipientAddress}
            variant={ButtonVariants.Black}
            fullWidth
            rounded
            onClick={onConfirmRecipientAddress}
          >
            Continue
          </Button>
        </div>
      )}

      {currentOwnershipStep === OwnershipSteps.OwnershipOverview && (
        <div className="mt-2 flex flex-col gap-4">
          <div className="flex items-center gap-4 rounded-2xl border border-gray-40/20 p-4">
            <BasenameIdentity username={profileUsername} />
          </div>
          <h2 className="w-full text-3xl font-bold text-illoblack">To</h2>
          {isValidRecipientAddress && (
            <div className="flex items-center gap-4 rounded-2xl border border-gray-40/20 p-4">
              <WalletIdentity address={recipientAddress} />
            </div>
          )}
          <hr className="mb-4 mt-4 border-t border-gray-40/20" />
          <p>What you&apos;ll send</p>
          <div className="flex items-center gap-4 rounded-2xl border border-gray-40/20 p-6">
            <ul className="flex w-full flex-col gap-4">
              {ownershipSettings.map((ownershipSetting) => (
                <li key={ownershipSetting.id} className="flex items-baseline gap-4">
                  <div className="flex flex-col gap-1">
                    <span>{ownershipSetting.name}</span>
                    <p className="text-gray-40">{ownershipSetting.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <Button variant={ButtonVariants.Black} fullWidth rounded onClick={onUpdateOwnershipClick}>
            Continue
          </Button>
        </div>
      )}
      {currentOwnershipStep === OwnershipSteps.WalletRequests && (
        <div className="mt-2 flex flex-col gap-4">
          {batchTransactionsEnabled ? (
            <p>Confirm the transaction in your wallet to send this name.</p>
          ) : (
            <p>You will need to confirm all four transactions in your wallet to send this name. </p>
          )}

          <ul className="flex w-full flex-col gap-4">
            {ownershipSettings.map((ownershipSetting) => (
              <li key={ownershipSetting.id} className="flex items-baseline gap-4">
                <OwnershipTransactionState ownershipSetting={ownershipSetting} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {currentOwnershipStep === OwnershipSteps.Success && (
        <div className="mt-2 flex flex-col gap-4">
          <div className="mx-auto mb-8 flex h-[8rem] w-[8rem] items-center justify-center rounded-full bg-blue-500 text-white">
            <Icon name="checkmark" color="currentColor" width="2rem" height="2rem" />
          </div>
          {isValidRecipientAddress && (
            <div className="flex items-center gap-4 rounded-2xl border border-gray-40/20 p-4">
              <WalletIdentity address={recipientAddress} />
            </div>
          )}
          <div className="text-center">
            <p>Has received the transfer!</p>
          </div>
        </div>
      )}
    </Modal>
  );
}
