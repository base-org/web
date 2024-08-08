import classNames from 'classnames';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useCallback, useEffect, useState } from 'react';
import { useWaitForTransactionReceipt } from 'wagmi';
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
import TransactionStatus from 'apps/web/src/components/TransactionStatus';
import useBaseEnsAvatar from 'apps/web/src/hooks/useBaseEnsAvatar';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import useWriteBaseEnsTextRecords from 'apps/web/src/hooks/useWriteBaseEnsTextRecords';
import {
  textRecordsSocialFieldsEnabled,
  UsernameTextRecordKeys,
  UsernameTextRecords,
} from 'apps/web/src/utils/usernames';
import Tooltip from 'apps/web/src/components/Tooltip';

export enum SettingsTabs {
  ManageProfile = 'manage-profile',
  Ownership = 'ownership',
  Subdomain = 'subdomain',
}

// We only support this for now

const settingTabsForDisplay = {
  [SettingsTabs.ManageProfile]: 'Manage Profile',
  [SettingsTabs.Ownership]: 'Ownership',
  [SettingsTabs.Subdomain]: 'Subdomain',
};

const allSettingsTabs = [
  SettingsTabs.ManageProfile,
  SettingsTabs.Ownership,
  SettingsTabs.Subdomain,
];
const settingsTabsEnabled = [SettingsTabs.ManageProfile];

export default function UsernameProfileSettings() {
  const { profileUsername, profileAddress, currentWalletIsOwner, setShowProfileSettings } =
    useUsernameProfile();

  const [avatarFile, setAvatarFile] = useState<File | undefined>();
  const { logEventWithContext } = useAnalytics();
  const { logError } = useErrors();
  const { basenameChain } = useBasenameChain(profileUsername);
  const [currentSettingsTab, setCurrentSettingsTab] = useState<SettingsTabs>(
    SettingsTabs.ManageProfile,
  );

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

  // Value
  const { refetch: refetchBaseEnsAvatar } = useBaseEnsAvatar({
    name: profileUsername,
  });

  const closeSettings = useCallback(() => {
    setShowProfileSettings(false);
  }, [setShowProfileSettings]);

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
          refetchBaseEnsAvatar()
            .then(() => {
              closeSettings();
            })
            .catch((error) => {
              logError(error, 'Failed to refetch avatar');
            });
        })
        .catch((error) => {
          logError(error, 'Failed to refetch existing text records');
        });
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
    logError,
    refetchBaseEnsAvatar,
    closeSettings,
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
              }
              // close the modal on success
              closeSettings();
            })

            .catch((error) => {
              logError(error, 'Update text records transaction canceled');
              logEventWithContext('update_text_records_transaction_canceled', ActionType.click);
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
      textRecords,
      uploadAvatar,
      avatarFile,
      logEventWithContext,
      writeTextRecords,
      closeSettings,
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

  const settingTabClass = classNames(
    'flex flex-col justify-between gap-8 text-gray/60 md:items-center p-4 md:p-10 max-h-[40rem] overflow-scroll',
  );

  const isLoading =
    existingTextRecordsIsLoading || writeTextRecordsIsPending || transactionIsFetching;

  console.log({ textRecords });

  return !currentWalletIsOwner ? (
    <p>You don&apos;t have the permission to edit this profile</p>
  ) : (
    <div className="relative mx-auto flex max-w-[60rem] rounded-2xl border border-[#EBEBEB] shadow-lg">
      <div className="border-r border-[#EBEBEB] ">
        <div className="p-4 md:p-10">
          <UsernameAvatarField
            onChangeFile={onChangeAvatarFile}
            onChange={onChangeTextRecord}
            currentAvatarUrl={textRecords[UsernameTextRecordKeys.Avatar]}
            disabled={isLoading}
            username={profileUsername}
          />
        </div>
        <nav className="border-t border-[#EBEBEB] p-4 md:p-10 ">
          <ul className="flex w-full flex-col gap-4">
            {allSettingsTabs.map((settingTab) => (
              <li key={settingTab}>
                {settingsTabsEnabled.includes(settingTab) ? (
                  <button
                    type="button"
                    onClick={() => setCurrentSettingsTab(settingTab)}
                    className={classNames('text-sm font-bold uppercase', {
                      'text-black': settingTab === currentSettingsTab,
                      'text-gray-40': settingTab !== currentSettingsTab,
                    })}
                  >
                    {settingTabsForDisplay[settingTab]}
                  </button>
                ) : (
                  <Tooltip content="Coming soon" className="cursor-default	">
                    <span
                      className={classNames(' mb-2 text-sm font-bold uppercase ', {
                        'text-black': settingTab === currentSettingsTab,
                        'text-gray-40': settingTab !== currentSettingsTab,
                      })}
                    >
                      {settingTabsForDisplay[settingTab]}
                    </span>
                  </Tooltip>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex flex-col">
        {currentSettingsTab === SettingsTabs.ManageProfile && (
          <section className={settingTabClass}>
            <h2 className="w-full text-3xl font-bold text-illoblack">
              {settingTabsForDisplay[currentSettingsTab]}
            </h2>
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
          </section>
        )}

        <div className="border-t border-[#EBEBEB] p-4 md:p-10">
          {writeTextRecordsError && <TransactionError error={writeTextRecordsError} />}
          {existingTextRecordsError && <TransactionError error={existingTextRecordsError} />}
          {transactionError && <TransactionError error={existingTextRecordsError} />}
          {transactionData && transactionData.status === 'reverted' && (
            <TransactionStatus transaction={transactionData} chainId={transactionData.chainId} />
          )}

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
        </div>
      </div>

      <button
        type="button"
        className="absolute right-12 top-10 ml-auto text-xl text-[#0A0B0D]"
        onClick={closeSettings}
        aria-label="Close modal"
      >
        <Icon name="close" width={16} height={16} color="currentColor" />
      </button>
    </div>
  );
}
