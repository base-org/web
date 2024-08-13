import { useAnalytics } from 'apps/web/contexts/Analytics';
import { UsernamePill } from 'apps/web/src/components/Basenames/UsernamePill';
import { UsernamePillVariants } from '../UsernamePill/types';
import UsernameProfileCard from 'apps/web/src/components/Basenames/UsernameProfileCard';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import UsernameProfileKeywords from 'apps/web/src/components/Basenames/UsernameProfileKeywords';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import { UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useCallback } from 'react';

export default function UsernameSidebar() {
  const {
    profileUsername,
    profileAddress,
    currentWalletIsProfileOwner,
    showProfileSettings,
    setShowProfileSettings,
  } = useUsernameProfile();

  const { logEventWithContext } = useAnalytics();

  const toggleSettings = useCallback(() => {
    if (!currentWalletIsProfileOwner) return;
    logEventWithContext('profile_edit_modal_open', ActionType.render);
    setShowProfileSettings(!showProfileSettings);
  }, [
    currentWalletIsProfileOwner,
    logEventWithContext,
    setShowProfileSettings,
    showProfileSettings,
  ]);

  const { existingTextRecords } = useReadBaseEnsTextRecords({
    address: profileAddress,
    username: profileUsername,
  });

  const textRecordKeywords = existingTextRecords[UsernameTextRecordKeys.Keywords];

  return (
    <aside className="flex flex-col gap-6">
      <UsernamePill
        variant={UsernamePillVariants.Card}
        username={profileUsername}
        address={profileAddress}
      />
      {currentWalletIsProfileOwner && (
        <Button variant={ButtonVariants.Gray} rounded fullWidth onClick={toggleSettings}>
          {showProfileSettings ? 'Back to Profile' : 'Manage Profile'}
        </Button>
      )}
      <UsernameProfileCard />
      {!!textRecordKeywords && <UsernameProfileKeywords keywords={textRecordKeywords} />}
    </aside>
  );
}
