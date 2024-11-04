import { Basename } from '@coinbase/onchainkit/identity';
import { getIpfsGatewayUrl, IpfsUrl, IsValidIpfsUrl } from 'apps/web/src/utils/urls';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import { UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';

export type UseBaseEnsNameProps = {
  name?: BaseEnsNameData;
};

export type BaseEnsNameData = Basename | undefined;

export default function useBaseEnsAvatar({ name }: UseBaseEnsNameProps) {
  const { existingTextRecords, refetchExistingTextRecords, existingTextRecordsIsLoading } =
    useReadBaseEnsTextRecords({
      username: name,
    });

  let avatarURI = existingTextRecords[UsernameTextRecordKeys.Avatar];

  if (IsValidIpfsUrl(avatarURI)) {
    avatarURI = getIpfsGatewayUrl(avatarURI as IpfsUrl) || '';
  }

  return {
    data: avatarURI,
    refetch: refetchExistingTextRecords,
    isLoading: existingTextRecordsIsLoading,
  };
}
