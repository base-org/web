import { upload } from '@vercel/blob/client';
import { useAnalytics } from 'apps/web/contexts/Analytics';
import UsernameAvatarField from 'apps/web/src/components/Basenames/UsernameAvatarField';
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
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
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
  const { profileUsername, profileAddress, currentWalletIsOwner } = useUsernameProfile();
  const [avatarFile, setAvatarFile] = useState<File | undefined>();
  const { logEventWithContext } = useAnalytics();
  const { basenameChain } = useBasenameChain(profileUsername);

  const {
    existingTextRecords,
    existingTextRecordsIsLoading,
    refetchExistingTextRecords,
    existingTextRecordsError,
  } = useReadBaseEnsTextRecords({
    address: profileAddress,
    username: profileUsername,
  });

  // Write text records
  const {
    writeTextRecords,
    writeTextRecordsIsPending,
    writeTextRecordsTransactionHash,
    writeTextRecordsError,
  } = useWriteBaseEnsTextRecords({
    address: profileAddress,
    username: profileUsername,
  });

  // Wait for text record transaction to be processed
  const {
    data: transactionData,
    isFetching: transactionIsFetching,
    isSuccess: transactionIsSuccess,
    error: transactionError,
  } = useWaitForTransactionReceipt({
    hash: writeTextRecordsTransactionHash,
    chainId: basenameChain.id,
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

      // TODO: Call to remove the previous avatar for vercel's blob
      refetchExistingTextRecords()
        .then(() => {
          toggleModal();
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

  const uploadAvatar = useCallback(
    async (file: File | undefined) => {
      if (!file) return Promise.resolve();
      if (!currentWalletIsOwner) return false;

      logEventWithContext('avatar_upload_initiated', ActionType.change);

      // TODO: Rename .name to username.[jpeg/webp/svg/png]
      const timestamp = Date.now();
      const newBlob = await upload(
        `basenames/avatar/${profileUsername}/${timestamp}/${file.name}`,
        file,
        {
          access: 'public',
          handleUploadUrl: `/api/basenames/avatar/upload?username=${profileUsername}`,
        },
      );

      updateTextRecords(UsernameTextRecordKeys.Avatar, newBlob.url);

      return newBlob;
    },
    [currentWalletIsOwner, logEventWithContext, profileUsername, updateTextRecords],
  );

  const onClickSave = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();

      // TODO: We can't really get to this steps, but we should show an error
      if (!currentWalletIsOwner) return false;

      let writeTextRecordsRequest = { ...textRecords };

      // TODO: Clean this up
      // Upload the avatar first
      uploadAvatar(avatarFile)
        .then((result) => {
          // set the uploaded result as the url
          if (result) {
            logEventWithContext('avatar_upload_success', ActionType.change);
            writeTextRecordsRequest[UsernameTextRecordKeys.Avatar] = result.url;
          }

          // Write the records
          writeTextRecords(writeTextRecordsRequest)
            .then((transactionResult) => {
              // We updated some text records
              if (transactionResult) {
                logEventWithContext('update_text_records_transaction_approved', ActionType.change);
              } else {
                // No text records had to be updated, simply go to profile
                toggleModal();
              }
            })

            .catch((error) => {
              console.error(error);
              logEventWithContext('update_text_records_transaction_canceled', ActionType.click);
            });
        })
        .catch((e) => {
          console.error(e);
          logEventWithContext('avatar_upload_failed', ActionType.error);
        });

      logEventWithContext('update_text_records_transaction_initiated', ActionType.change);
    },
    [
      avatarFile,
      currentWalletIsOwner,
      logEventWithContext,
      uploadAvatar,
      textRecords,
      toggleModal,
      writeTextRecords,
    ],
  );

  const onChangeTextRecord = useCallback(
    (key: UsernameTextRecordKeys, value: string) => {
      updateTextRecords(key, value);
    },
    [updateTextRecords],
  );

  const onChangeAvatar = useCallback((file: File | undefined) => {
    setAvatarFile(file);
  }, []);

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
          <UsernameAvatarField
            onChange={onChangeAvatar}
            value={textRecords[UsernameTextRecordKeys.Avatar]}
            disabled={isLoading}
            username={profileUsername}
          />
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
          {transactionData && transactionData.status === 'reverted' && (
            <TransactionStatus transaction={transactionData} chainId={transactionData.chainId} />
          )}
        </form>
      )}
    </Modal>
  );
}
