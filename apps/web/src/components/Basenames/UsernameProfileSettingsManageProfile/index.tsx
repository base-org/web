'use client';
import classNames from 'classnames';
import { useCallback } from 'react';
import { useErrors } from 'apps/web/contexts/Errors';
import UsernameDescriptionField from 'apps/web/src/components/Basenames/UsernameDescriptionField';
import UsernameKeywordsField from 'apps/web/src/components/Basenames/UsernameKeywordsField';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import UsernameTextRecordInlineField from 'apps/web/src/components/Basenames/UsernameTextRecordInlineField';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import Fieldset from 'apps/web/src/components/Fieldset';
import Label from 'apps/web/src/components/Label';
import TransactionError from 'apps/web/src/components/TransactionError';
import useWriteBaseEnsTextRecords from 'apps/web/src/hooks/useWriteBaseEnsTextRecords';
import {
  textRecordsSocialFieldsEnabled,
  UsernameTextRecordKeys,
} from 'apps/web/src/utils/usernames';

export default function UsernameProfileSettingsManageProfile() {
  const { profileUsername, profileAddress, currentWalletIsOwner, setShowProfileSettings } =
    useUsernameProfile();

  const { logError } = useErrors();

  const closeSettings = useCallback(() => {
    setShowProfileSettings(false);
  }, [setShowProfileSettings]);

  // Write text records
  const {
    updateTextRecords,
    updatedTextRecords,
    writeTextRecords,
    writeTextRecordsIsPending,
    writeTextRecordsError,
    hasChanged,
  } = useWriteBaseEnsTextRecords({
    address: profileAddress,
    username: profileUsername,
    onSuccess: closeSettings,
  });

  const onClickSave = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (!currentWalletIsOwner) return false;
      writeTextRecords().catch((error) => {
        logError(error, 'Failed to write text records');
      });
    },
    [currentWalletIsOwner, writeTextRecords, logError],
  );

  const onChangeTextRecord = useCallback(
    (key: UsernameTextRecordKeys, value: string) => {
      updateTextRecords(key, value);
    },
    [updateTextRecords],
  );

  const settingTabClass = classNames(
    'flex flex-col justify-between gap-8 text-gray/60 md:items-center p-4 md:p-8',
  );

  return (
    <>
      <section className={settingTabClass}>
        <UsernameDescriptionField
          onChange={onChangeTextRecord}
          value={updatedTextRecords[UsernameTextRecordKeys.Description]}
          disabled={writeTextRecordsIsPending}
        />
        <Fieldset>
          <Label>Socials</Label>
          {textRecordsSocialFieldsEnabled.map((textRecordKey) => (
            <UsernameTextRecordInlineField
              key={textRecordKey}
              textRecordKey={textRecordKey}
              onChange={onChangeTextRecord}
              value={updatedTextRecords[textRecordKey]}
              disabled={writeTextRecordsIsPending}
            />
          ))}
        </Fieldset>
        <div className="mb-2">
          <UsernameKeywordsField
            onChange={onChangeTextRecord}
            value={updatedTextRecords[UsernameTextRecordKeys.Keywords]}
            disabled={writeTextRecordsIsPending}
          />
        </div>
      </section>
      {/* Settings UI: The save section  */}
      <div className="md:p-center flex items-center justify-between gap-4 border-t border-[#EBEBEB] p-4 md:p-8">
        {writeTextRecordsError && <TransactionError error={writeTextRecordsError} />}
        <Button
          variant={ButtonVariants.Black}
          rounded
          disabled={writeTextRecordsIsPending || !hasChanged}
          className="ml-auto"
          isLoading={writeTextRecordsIsPending}
          onClick={onClickSave}
        >
          Save
        </Button>
      </div>
    </>
  );
}
