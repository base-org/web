import ImageWithLoading from 'apps/web/src/components/ImageWithLoading';
import useBaseEnsAvatar from 'apps/web/src/hooks/useBaseEnsAvatar';
import useBaseEnsName from 'apps/web/src/hooks/useBaseEnsName';
import { CLOUDFARE_IPFS_PROXY } from 'apps/web/src/utils/urls';
import { getUserNamePicture } from 'apps/web/src/utils/usernames';
import { truncateMiddle } from 'libs/base-ui/utils/string';
import { Address } from 'viem';
import { mainnet } from 'viem/chains';
import { useEnsAvatar, useEnsName } from 'wagmi';

export default function WalletIdentity({ address }: { address: Address }) {
  const { data: basename, isLoading: basenameIsLoading } = useBaseEnsName({
    address: address,
  });

  const { data: basenameAvatar, isLoading: baseEnsAvatarIsLoading } = useBaseEnsAvatar({
    name: basename,
  });

  const { data: ensName, isLoading: ensNameIsLoading } = useEnsName({
    address,
    chainId: mainnet.id,
    query: {
      retry: false,
    },
  });

  const { data: ensAvatar, isLoading: ensAvatarIsLoading } = useEnsAvatar({
    name: ensName ?? undefined,
    chainId: mainnet.id,
    assetGatewayUrls: {
      ipfs: CLOUDFARE_IPFS_PROXY,
    },
    query: {
      retry: false,
    },
  });

  const deterministicName = basename ?? ensName ?? address ?? 'default-avatar';
  const defaultSelectedProfilePicture = getUserNamePicture(deterministicName);
  const avatar = basenameAvatar ?? ensAvatar ?? defaultSelectedProfilePicture;

  const isLoading =
    basenameIsLoading || baseEnsAvatarIsLoading || ensNameIsLoading || ensAvatarIsLoading;

  return (
    <div className="flex items-center gap-4">
      <ImageWithLoading
        src={avatar}
        alt={deterministicName}
        title={deterministicName}
        wrapperClassName="rounded-full h-[3rem] max-h-[3rem] min-h-[3rem] w-[3rem] min-w-[3rem] max-w-[3rem] border-4 border-white"
        imageClassName="object-cover w-full h-full"
        backgroundClassName="bg-blue-500"
        width={4 * 16}
        height={4 * 16}
        forceIsLoading={isLoading}
      />
      <div>
        <strong>{basename ?? truncateMiddle(address, 6, 4)}</strong>
        {!!basename && <p className="text-gray-40">{truncateMiddle(address, 6, 4)}</p>}
      </div>
    </div>
  );
}
