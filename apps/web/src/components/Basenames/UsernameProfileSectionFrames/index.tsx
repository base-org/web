'use client';

import UsernameProfileSectionTitle from 'apps/web/src/components/Basenames/UsernameProfileSectionTitle';
import { useAccount } from 'wagmi';
import { UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';

export default function UsernameProfileSectionFrames() {
  const { address } = useAccount();
  const { profileUsername, profileAddress } = useUsernameProfile();

  const { existingTextRecords } = useReadBaseEnsTextRecords({
    address: profileAddress,
    username: profileUsername,
  });

  const homeframeUrl = existingTextRecords[UsernameTextRecordKeys.Frame];

  if (!homeframeUrl) return null;
  return (
    <section>
      <UsernameProfileSectionTitle title="Frames" />
      <iframe
        src={`/farcaster-frame?url=${homeframeUrl}&address=${address}`}
        title="image"
        className="border-1 border-gray/40 aspect-ratio-[1/1.3] min-h-[30rem]"
      />
    </section>
  );
}
