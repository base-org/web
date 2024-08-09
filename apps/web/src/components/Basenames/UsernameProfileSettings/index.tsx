'use client';
import classNames from 'classnames';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useCallback, useState } from 'react';
import { upload } from '@vercel/blob/client';
import { useAnalytics } from 'apps/web/contexts/Analytics';
import { useErrors } from 'apps/web/contexts/Errors';
import UsernameAvatarField from 'apps/web/src/components/Basenames/UsernameAvatarField';
import UsernameDescriptionField from 'apps/web/src/components/Basenames/UsernameDescriptionField';
import UsernameKeywordsField from 'apps/web/src/components/Basenames/UsernameKeywordsField';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import UsernameTextRecordInlineField from 'apps/web/src/components/Basenames/UsernameTextRecordInlineField';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import Fieldset from 'apps/web/src/components/Fieldset';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Label from 'apps/web/src/components/Label';
import TransactionError from 'apps/web/src/components/TransactionError';
import useWriteBaseEnsTextRecords from 'apps/web/src/hooks/useWriteBaseEnsTextRecords';
import {
  textRecordsSocialFieldsEnabled,
  UsernameTextRecordKeys,
} from 'apps/web/src/utils/usernames';

import {
  SettingsTabs,
  settingTabsForDisplay,
  useUsernameProfileSettings,
} from 'apps/web/src/components/Basenames/UsernameProfileSettingsContext';
import UsernameProfileSettingsMenu from 'apps/web/src/components/Basenames/UsernameProfileSettingsMenu';
import UsernameProfileSettingsName from 'apps/web/src/components/Basenames/UsernameProfileSettingsName';

// TODO: This component is too big, gotta split in
// - UsernameProfileSettingsTextRecords

export default function UsernameProfileSettings() {
  const { profileUsername, profileAddress, currentWalletIsOwner, setShowProfileSettings } =
    useUsernameProfile();

  const { currentSettingsTab } = useUsernameProfileSettings();
  const [avatarFile, setAvatarFile] = useState<File | undefined>();
  const { logEventWithContext } = useAnalytics();
  const { logError } = useErrors();

  logEventWithContext('settings_loaded', ActionType.render);

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
    onSuccess: () => {
      closeSettings();
    },
  });

  const closeSettings = useCallback(() => {
    setShowProfileSettings(false);
  }, [setShowProfileSettings]);

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

      let writeTextRecordsRequest = { ...updatedTextRecords };

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
          writeTextRecords()
            .then()
            .catch((error) => {
              logError(error, 'Failed to write text records');
            });
        })
        .catch((error) => {
          logError(error, 'Failed to upload avatar');
          logEventWithContext('avatar_upload_failed', ActionType.error);
        });

      logEventWithContext('update_text_records_transaction_initiated', ActionType.change);
    },
    [
      currentWalletIsOwner,
      updatedTextRecords,
      uploadAvatar,
      avatarFile,
      logEventWithContext,
      writeTextRecords,
      logError,
    ],
  );

  const onChangeTextRecord = useCallback(
    (key: UsernameTextRecordKeys, value: string) => {
      updateTextRecords(key, value);
    },
    [updateTextRecords],
  );

  const onChangeAvatarFile = useCallback((file: File | undefined) => {
    setAvatarFile(file);
  }, []);

  const settingTabWrapperClass = classNames('p-4 md:p-8');

  const settingTabClass = classNames(
    'flex flex-col justify-between gap-8 text-gray/60 md:items-center ',
  );

  return !currentWalletIsOwner ? (
    <p>You don&apos;t have the permission to edit this profile</p>
  ) : (
    // Settings layout
    <div className="items-left mx-auto flex w-full max-w-[60rem] flex-col">
      {/* Back to profile */}
      <div className="mb-6">
        <button type="button" onClick={closeSettings} className="flex items-center gap-2">
          <Icon name="backArrow" color="currentColor" height="1rem" width="1rem" />
          Back to profile
        </button>
      </div>

      {/* Settings UI: borders, layout & shadow  */}
      <div className="relative flex flex-col rounded-2xl border border-[#EBEBEB] shadow-lg md:flex-row">
        {/* Settings UI: Left side  */}
        <div className="w-full border-b border-[#EBEBEB] md:max-w-[21rem] md:border-r">
          {/* Settings UI: Avatar  */}
          <div className="flex w-full flex-col gap-6 p-4 md:p-8">
            <UsernameAvatarField
              onChangeFile={onChangeAvatarFile}
              onChange={onChangeTextRecord}
              currentAvatarUrl={updatedTextRecords[UsernameTextRecordKeys.Avatar]}
              disabled={writeTextRecordsIsPending}
              username={profileUsername}
            />

            {/* Settings UI: Primary or Secondary badge  */}
            <UsernameProfileSettingsName />
          </div>

          {/* Settings UI: Menu  */}
          <div className="border-t border-[#EBEBEB] p-4 md:p-8 ">
            <UsernameProfileSettingsMenu />
          </div>
        </div>

        {/* Settings UI: Right side  */}
        <div className="w-full">
          {/* Settings UI: The current settings content  */}
          <div className={settingTabWrapperClass}>
            <h2 className="mb-8 w-full text-3xl font-bold text-illoblack">
              {settingTabsForDisplay[currentSettingsTab]}
            </h2>

            {/* Settings UI: Manage profile, TODO: Move this to its own component  */}
            {currentSettingsTab === SettingsTabs.ManageProfile && (
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
            )}
          </div>

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
        </div>
      </div>
    </div>
  );
}
