import { useAnalytics } from 'apps/web/contexts/Analytics';
import { USERNAME_CHAIN_ID } from 'apps/web/src/addresses/usernames';
import UsernameDescriptionField from 'apps/web/src/components/Basenames/UsernameDescriptionField';
import UsernameKeywordsField from 'apps/web/src/components/Basenames/UsernameKeywordsField';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import UsernameTextRecordInlineField from 'apps/web/src/components/Basenames/UsernameTextRecordInlineField';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import Fieldset from 'apps/web/src/components/Fieldset';
import Label from 'apps/web/src/components/Label';
import Modal, { ModalSizes } from 'apps/web/src/components/Modal';
import TransactionError from 'apps/web/src/components/TransactionError';
import TransactionStatus from 'apps/web/src/components/TransactionStatus';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import useWriteBaseEnsTextRecords from 'apps/web/src/hooks/useWriteBaseEnsTextRecords';
import {
  textRecordsSocialFieldsEnabled,
  UsernameTextRecordKeys,
  UsernameTextRecords,
} from 'apps/web/src/utils/usernames';
import classNames from 'classnames';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useCallback, useEffect, useState } from 'react';

import { useWaitForTransactionReceipt } from 'wagmi';

export default function UsernameProfileEditModal({
  isOpen,
  toggleModal,
}: {
  isOpen: boolean;
  toggleModal: () => void;
}) {
  const { profileUsernameFormatted, profileAddress, currentWalletIsOwner } = useUsernameProfile();

  const { logEventWithContext } = useAnalytics();

  const {
    existingTextRecords,
    existingTextRecordsIsLoading,
    refetchExistingTextRecords,
    existingTextRecordsError,
  } = useReadBaseEnsTextRecords({
    address: profileAddress,
    username: profileUsernameFormatted,
  });

  // Write text records
  const {
    writeTextRecords,
    writeTextRecordsIsPending,
    writeTextRecordsTransactionHash,
    writeTextRecordsError,
  } = useWriteBaseEnsTextRecords({
    address: profileAddress,
    username: profileUsernameFormatted,
  });

  // Wait for text record transaction to be processed
  const {
    data: transactionData,
    isFetching: transactionIsFetching,
    isSuccess: transactionIsSuccess,
    error: transactionError,
  } = useWaitForTransactionReceipt({
    hash: writeTextRecordsTransactionHash,
    chainId: USERNAME_CHAIN_ID,
    query: {
      enabled: !!writeTextRecordsTransactionHash,
    },
  });

  const [textRecords, setTextRecords] = useState<UsernameTextRecords>(existingTextRecords);

  useEffect(() => {
    if (transactionIsFetching) {
      logEventWithContext('update_text_records_transaction_processing', ActionType.change);
    }
    if (!transactionData) return;

    if (transactionData.status === 'success') {
      logEventWithContext('update_text_records_transaction_success', ActionType.change);
      refetchExistingTextRecords()
        .then(() => {
          // toggleModal() ?
        })
        .catch(() => {});
    }

    if (transactionData.status === 'reverted') {
      logEventWithContext('update_text_records_transaction_reverted', ActionType.change, {
        error: `Transaction reverted: ${transactionData.transactionHash}`,
      });
    }
  }, [
    refetchExistingTextRecords,
    transactionIsSuccess,
    transactionData,
    logEventWithContext,
    transactionIsFetching,
    toggleModal,
  ]);

  useEffect(() => {
    setTextRecords(existingTextRecords);
  }, [existingTextRecords]);

  const updateTextRecords = useCallback((key: UsernameTextRecordKeys, value: string) => {
    setTextRecords((previousTextRecords) => {
      return {
        ...previousTextRecords,
        [key]: value,
      };
    });
  }, []);

  const onClickSave = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      // TODO: We can't really get to this steps, but we should show an error
      if (!currentWalletIsOwner) return false;

      logEventWithContext('update_text_records_transaction_initiated', ActionType.change);

      writeTextRecords(textRecords)
        .then((result) => {
          // We updated some text records
          if (result) {
            logEventWithContext('update_text_records_transaction_approved', ActionType.change);
          } else {
            // No text records had to be updated, simply go to profile
            toggleModal();
          }
        })

        .catch((error) => {
          logEventWithContext('update_text_records_transaction_canceled', ActionType.click, {
            error: JSON.stringify(error),
          });
        });
    },
    [currentWalletIsOwner, logEventWithContext, textRecords, toggleModal, writeTextRecords],
  );

  const onChangeTextRecord = useCallback(
    (key: UsernameTextRecordKeys, value: string) => {
      updateTextRecords(key, value);
    },
    [updateTextRecords],
  );

  const formClasses = classNames(
    'flex flex-col justify-between gap-8 text-gray/60 md:items-center mt-6',
  );

  const isLoading =
    existingTextRecordsIsLoading || writeTextRecordsIsPending || transactionIsFetching;

  return (
    <Modal
      isOpen={isOpen}
      onClose={toggleModal}
      title="Manage Profile"
      titleAlign="left"
      modalAlign="top"
      size={ModalSizes.Large}
    >
      {!currentWalletIsOwner ? (
        <p>You don&apos;t have the permission to edit this profile</p>
      ) : (
        <form className={formClasses}>
          <UsernameDescriptionField
            onChange={onChangeTextRecord}
            value={textRecords[UsernameTextRecordKeys.Description]}
            disabled={isLoading}
          />
          <Fieldset>
            <Label>Socials</Label>
            {textRecordsSocialFieldsEnabled.map((textRecordKey) => (
              <UsernameTextRecordInlineField
                key={textRecordKey}
                textRecordKey={textRecordKey}
                onChange={onChangeTextRecord}
                value={textRecords[textRecordKey]}
                disabled={isLoading}
              />
            ))}
          </Fieldset>
          <div className="mb-2">
            <UsernameKeywordsField
              onChange={onChangeTextRecord}
              value={textRecords[UsernameTextRecordKeys.Keywords]}
              disabled={isLoading}
            />
          </div>
          <Button
            variant={ButtonVariants.Black}
            rounded
            fullWidth
            disabled={isLoading}
            isLoading={isLoading}
            onClick={onClickSave}
          >
            Save
          </Button>
          {writeTextRecordsError && <TransactionError error={writeTextRecordsError} />}
          {existingTextRecordsError && <TransactionError error={existingTextRecordsError} />}
          {transactionError && <TransactionError error={existingTextRecordsError} />}
          {transactionData && (
            <TransactionStatus transaction={transactionData} chainId={transactionData.chainId} />
          )}
        </form>
      )}
    </Modal>
  );
}
