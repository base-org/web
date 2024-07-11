import { UsernamePill, UsernamePillVariants } from 'apps/web/src/components/Basenames/UsernamePill';
import UsernameProfileCard from 'apps/web/src/components/Basenames/UsernameProfileCard';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import UsernameProfileEditModal from 'apps/web/src/components/Basenames/UsernameProfileEditModal';
import UsernameProfileKeywords from 'apps/web/src/components/Basenames/UsernameProfileKeywords';
import { Button, ButtonVariants } from 'apps/web/src/components/Button/Button';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import { UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';
import { useCallback, useState } from 'react';

export default function UsernameSidebar() {
  const { profileUsernameFormatted, profileAddress, currentWalletIsOwner } = useUsernameProfile();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const { existingTextRecords } = useReadBaseEnsTextRecords({
    address: profileAddress,
    username: profileUsernameFormatted,
  });

  const textRecordKeywords = existingTextRecords[UsernameTextRecordKeys.Keywords];

  return (
    <aside className="flex flex-col gap-6">
      <UsernamePill variant={UsernamePillVariants.Card} username={profileUsernameFormatted} />
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
