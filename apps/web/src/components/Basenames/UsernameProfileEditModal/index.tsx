import UsernameDescriptionField from 'apps/web/src/components/Basenames/UsernameDescriptionField';
import UsernameKeywordsField from 'apps/web/src/components/Basenames/UsernameKeywordsField';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import UsernameTextRecordInlineField from 'apps/web/src/components/Basenames/UsernameTextRecordInlineField';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import Fieldset from 'apps/web/src/components/Fieldset';
import Label from 'apps/web/src/components/Label';
import Modal, { ModalSizes } from 'apps/web/src/components/Modal';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import useWriteBaseEnsTextRecords from 'apps/web/src/hooks/useWriteBaseEnsTextRecords';
import {
  textRecordsSocialFieldsEnabled,
  UsernameTextRecordKeys,
  UsernameTextRecords,
} from 'apps/web/src/utils/usernames';
import classNames from 'classnames';
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

  const { existingTextRecords, existingTextRecordsIsLoading, refetchExistingTextRecords } =
    useReadBaseEnsTextRecords({
      address: profileAddress,
      username: profileUsernameFormatted,
    });

  // Write text records
  const { writeTextRecords, writeTextRecordsIsPending, writeTextRecordsTransactionHash } =
    useWriteBaseEnsTextRecords({
      address: profileAddress,
      username: profileUsernameFormatted,
    });

  // Wait for text record transaction to be processed
  const { isFetching: transactionIsFetching, isSuccess: transactionIsSuccess } =
    useWaitForTransactionReceipt({
      hash: writeTextRecordsTransactionHash,
      query: {
        enabled: !!writeTextRecordsTransactionHash,
      },
    });

  const [textRecords, setTextRecords] = useState<UsernameTextRecords>(existingTextRecords);

  useEffect(() => {
    if (transactionIsSuccess) {
      refetchExistingTextRecords()
        .then(() => {
          // TODO: This only closes the modal, a success notification would be nice
          toggleModal();
        })
        .catch(() => {});
    }
  }, [refetchExistingTextRecords, toggleModal, transactionIsSuccess]);

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

      // TODO: We can't really get to this steps, but we should show
      if (!currentWalletIsOwner) return false;
      writeTextRecords(textRecords)
        .then((result) => {
          // We updated some text records
          if (result) {
          } else {
            // no text records had to be updated, close the modal
            toggleModal();
          }
        })
        .catch(() => {
          // TODO: Show an error
        });
    },
    [currentWalletIsOwner, textRecords, toggleModal, writeTextRecords],
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
        </form>
      )}
    </Modal>
  );
}
