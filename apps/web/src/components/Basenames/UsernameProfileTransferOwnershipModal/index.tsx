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
import AllOwnershipTransactionsState from 'apps/web/src/components/Basenames/UsernameProfileTransferOwnershipModal/AllOwnershipTransactionsState';
import WalletIdentity from 'apps/web/src/components/WalletIdentity';
import BasenameIdentity from 'apps/web/src/components/BasenameIdentity';

const ownershipStepsTitleForDisplay = {
  [OwnershipSteps.Search]: 'Transfer ownership',
  [OwnershipSteps.OwnershipOverview]: "What you'll be transferring",
  [OwnershipSteps.WalletRequests]: 'Confirm in wallet',
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
    if (currentOwnershipStep === OwnershipSteps.Success) {
      profileOwnerRefetch()
        .then(() => {
          setShowProfileSettings(false);
          onClose();
        })
        .catch((error) => {
          logError(error, 'Failed to refetch Owner');
        });

      return;
    }

    onClose();
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
          <p>Search for a name or ETH address that you want to transfer to. </p>
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
          <p>Transferring token ownership can&apos;t be undone. This will trigger 4 transactions</p>
          <p>You are sending</p>
          <div className="flex items-center gap-4 rounded-2xl border border-gray-40/20 p-4">
            <BasenameIdentity username={profileUsername} />
          </div>
          To
          {isValidRecipientAddress && (
            <div className="flex items-center gap-4 rounded-2xl border border-gray-40/20 p-4">
              <WalletIdentity address={recipientAddress} />
            </div>
          )}
          <p>Transferring ownership cannot be undone. This will trigger 4 transactions:</p>
          <AllOwnershipTransactionsState />
          <Button variant={ButtonVariants.Black} fullWidth rounded onClick={onUpdateOwnershipClick}>
            Continue
          </Button>
        </div>
      )}
      {currentOwnershipStep === OwnershipSteps.WalletRequests && (
        <div className="mt-2 flex flex-col gap-4">
          <p>Use your wallet to confirm the transfers.</p>
          <p>Sending</p>
          <div className="flex items-center gap-4 rounded-2xl border border-gray-40/20 p-4">
            <BasenameIdentity username={profileUsername} />
          </div>
          To
          {isValidRecipientAddress && (
            <div className="flex items-center gap-4 rounded-2xl border border-gray-40/20 p-4">
              <WalletIdentity address={recipientAddress} />
            </div>
          )}
          <p>Use your wallet to confirm the transfers:</p>
          <AllOwnershipTransactionsState />
        </div>
      )}

      {currentOwnershipStep === OwnershipSteps.Success && (
        <div className="mt-2 flex flex-col gap-4">
          <div className="mx-auto flex h-[8rem] w-[8rem] items-center justify-center rounded-full bg-blue-500 text-white">
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
