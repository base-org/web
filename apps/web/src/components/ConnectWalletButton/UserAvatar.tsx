import { useAccount, useEnsAvatar, useEnsName } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { getUserNamePicture } from 'apps/web/src/utils/usernames';
import useBaseEnsName from 'apps/web/src/hooks/useBaseEnsName';
import ImageWithLoading from 'apps/web/src/components/ImageWithLoading';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';

export function UserAvatar() {
  const { address } = useAccount();
  const { data: ensName, isLoading: ensNameIsLoading } = useEnsName({
    address,
    chainId: mainnet.id,
  });
  const { data: ensAvatar, isLoading: ensAvatarIsLoading } = useEnsAvatar({
    name: ensName ?? undefined,
    chainId: mainnet.id,
    assetGatewayUrls: {
      ipfs: 'https://cloudflare-ipfs.com',
    },
  });

  const { data: baseEnsName, isLoading: baseEnsNameIsLoading } = useBaseEnsName({
    address,
  });

  const { existingTextRecords, existingTextRecordsIsLoading } = useReadBaseEnsTextRecords({
    address: address,
    username: baseEnsName,
  });

  const deterministicName = baseEnsName ?? ensName ?? address ?? 'default-avatar';
  const defaultSelectedProfilePicture = getUserNamePicture(deterministicName);
  const avatar = (existingTextRecords.avatar || ensAvatar) ?? defaultSelectedProfilePicture;

  const isLoading =
    ensNameIsLoading || ensAvatarIsLoading || baseEnsNameIsLoading || existingTextRecordsIsLoading;

  return (
    <ImageWithLoading
      src={avatar}
      alt="Avatar"
      wrapperClassName="rounded-full h-[2rem] max-h-[2rem] min-h-[2rem] w-[2rem] min-w-[2rem] max-w-[2rem]"
      backgroundClassName="bg-blue-500"
      imageClassName="group-hover:rotate-[-1deg] group-hover:scale-105 object-cover h-full w-full"
      width={32}
      height={32}
      forceIsLoading={isLoading}
    />
  );
}
