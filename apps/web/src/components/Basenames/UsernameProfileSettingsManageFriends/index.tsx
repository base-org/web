'use client';
import classNames from 'classnames';
import { useCallback } from 'react';
import { useErrors } from 'apps/web/contexts/Errors';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import FriendSearchInput from 'apps/web/src/components/Basenames/FriendSearchInput';
import { FriendSearchInputVariant } from 'apps/web/src/components/Basenames/FriendSearchInput/types';
import { useReadFollows } from 'apps/web/src/hooks/useReadFollows';

const settingTabClass = classNames(
  'flex flex-col justify-between gap-8 text-gray/60 md:items-center p-4 md:p-8',
);

export default function UsernameProfileSettingsManageProfile() {
  const { profileUsername, profileAddress, currentWalletIsProfileEditor, setShowProfileSettings } =
    useUsernameProfile();
  const { data: follows, ...rest } = useReadFollows(profileUsername);

  console.log({ follows, rest });

  const { logError } = useErrors();

  const closeSettings = useCallback(() => {
    setShowProfileSettings(false);
  }, [setShowProfileSettings]);

  // const onClickSave = useCallback(
  //   (event: React.MouseEvent<HTMLButtonElement>) => {
  //     event.preventDefault();
  //     if (!currentWalletIsProfileEditor) return false;
  //     writeTextRecords().catch((error) => {
  //       logError(error, 'Failed to write text records');
  //     });
  //   },
  //   [currentWalletIsProfileEditor, writeTextRecords, logError],
  // );

  // const onChangeTextRecord = useCallback(
  //   (key: UsernameTextRecordKeys, value: string) => {
  //     updateTextRecords(key, value);
  //   },
  //   [updateTextRecords],
  // );

  return (
    <>
      <section className={settingTabClass}>
        <span>Manage Friends</span>
        <FriendSearchInput
          variant={FriendSearchInputVariant.Small}
          placeholder="Search for a friend"
        />
      </section>
      <div className="md:p-center flex items-center justify-between gap-4 border-t border-[#EBEBEB] p-4 md:p-8">
        {follows?.map((follow) => (
          <div key={follow}>{follow}</div>
        ))}
      </div>
    </>
  );
}
