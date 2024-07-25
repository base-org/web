import { useAnalytics } from 'apps/web/contexts/Analytics';
import { UsernamePill, UsernamePillVariants } from 'apps/web/src/components/Basenames/UsernamePill';
import UsernameProfileCard from 'apps/web/src/components/Basenames/UsernameProfileCard';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import UsernameProfileEditModal from 'apps/web/src/components/Basenames/UsernameProfileEditModal';
import UsernameProfileKeywords from 'apps/web/src/components/Basenames/UsernameProfileKeywords';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import { UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';
import { ActionType } from 'libs/base-ui/utils/logEvent';
import { useCallback, useState } from 'react';

export default function UsernameSidebar() {
  const { profileUsername, profileAddress, currentWalletIsOwner } = useUsernameProfile();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { logEventWithContext } = useAnalytics();

  const openModal = useCallback(() => {
    logEventWithContext('profile_edit_modal_open', ActionType.render);
    setIsOpen(true);
  }, [logEventWithContext]);

  const closeModal = useCallback(() => {
    logEventWithContext('profile_edit_modal_close', ActionType.render);
    setIsOpen(false);
  }, [logEventWithContext]);

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
      {currentWalletIsOwner && (
        <Button variant={ButtonVariants.Gray} rounded fullWidth onClick={openModal}>
          Manage Profile
        </Button>
      )}
      <UsernameProfileCard />
      {!!textRecordKeywords && <UsernameProfileKeywords keywords={textRecordKeywords} />}
      {currentWalletIsOwner && (
        <UsernameProfileEditModal isOpen={isOpen} toggleModal={closeModal} />
      )}
    </aside>
  );
}
