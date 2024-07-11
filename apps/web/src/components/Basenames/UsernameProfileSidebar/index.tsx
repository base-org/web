import { UsernamePill, UsernamePillVariants } from 'apps/web/src/components/Basenames/UsernamePill';
import UsernameProfileCard from 'apps/web/src/components/Basenames/UsernameProfileCard';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import UsernameProfileKeywords from 'apps/web/src/components/Basenames/UsernameProfileKeywords';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import { UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';

export default function UsernameSidebar() {
  const { profileUsernameFormatted, profileAddress } = useUsernameProfile();

  const { existingTextRecords } = useReadBaseEnsTextRecords({
    address: profileAddress,
    username: profileUsernameFormatted,
  });

  const textRecordDescription = existingTextRecords[UsernameTextRecordKeys.Description];
  const textRecordKeywords = existingTextRecords[UsernameTextRecordKeys.Keywords];

  return (
    <aside className="flex flex-col gap-6">
      <UsernamePill variant={UsernamePillVariants.Card} username={profileUsernameFormatted} />
      {!!textRecordDescription && <UsernameProfileCard description={textRecordDescription} />}
      {!!textRecordKeywords && <UsernameProfileKeywords keywords={textRecordKeywords} />}
    </aside>
  );
}
