import { UsernamePill, UsernamePillVariants } from 'apps/web/src/components/Basenames/UsernamePill';
import UsernameProfileCard from 'apps/web/src/components/Basenames/UsernameProfileCard';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import UsernameProfileKeywords from 'apps/web/src/components/Basenames/UsernameProfileKeywords';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import { UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';
import { useAccount } from 'wagmi';

export default function UsernameSidebar() {
  const { profileUsername, profileAddress } = useUsernameProfile();
  const { address } = useAccount();

  // TODO: remove once we get proper profile resolution working
  const { existingTextRecords } = useReadBaseEnsTextRecords({
    address: address ?? profileAddress ?? '',
  });

  console.log({ existingTextRecords });

  const textRecordDescription = existingTextRecords[UsernameTextRecordKeys.Description];
  const textRecordKeywords = existingTextRecords[UsernameTextRecordKeys.Keywords];

  return (
    <aside className="flex flex-col gap-8">
      <UsernamePill variant={UsernamePillVariants.Card} name={profileUsername} />
      {!!textRecordDescription && <UsernameProfileCard description={textRecordDescription} />}
      {!!textRecordKeywords && <UsernameProfileKeywords keywords={textRecordKeywords} />}
    </aside>
  );
}
