import { useAccount, useEnsAvatar, useEnsName } from 'wagmi';
import { StaticImageData } from 'next/image';
import { mainnet } from 'wagmi/chains';
import { getUserNamePicture } from 'apps/web/src/utils/usernames';
import useBaseEnsName from 'apps/web/src/hooks/useBaseEnsName';
import ImageWithLoading from 'apps/web/src/components/ImageWithLoading';

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

  const deterministicName = baseEnsName ?? ensName ?? address ?? 'default-avatar';
  const defaultSelectedProfilePicture = getUserNamePicture(deterministicName);
  const avatar = ensAvatar ?? defaultSelectedProfilePicture;

  const isLoading = ensNameIsLoading || ensAvatarIsLoading || baseEnsNameIsLoading;

  return (
    <ImageWithLoading
      src={avatar as StaticImageData}
      alt="Avatar"
      wrapperClassName="rounded-full"
      backgroundClassName="bg-blue-500"
      imageClassName="group-hover:rotate-[-1deg] group-hover:scale-105"
      width={32}
      height={32}
      forceIsLoading={isLoading}
    />
  );
}
