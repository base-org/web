import { BaseName } from '@coinbase/onchainkit/identity';
import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import ImageWithLoading from 'apps/web/src/components/ImageWithLoading';
import useBaseEnsAvatar from 'apps/web/src/hooks/useBaseEnsAvatar';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { getUserNamePicture } from 'apps/web/src/utils/usernames';
import { truncateMiddle } from 'libs/base-ui/utils/string';
import { useEnsAddress } from 'wagmi';

export default function BasenameIdentity({ username }: { username: BaseName }) {
  const { data: basenameAvatar, isLoading: baseEnsAvatarIsLoading } = useBaseEnsAvatar({
    name: username,
  });

  const { basenameChain } = useBasenameChain();

  const { data: basenameAddress, isLoading: basenameAddressIsLoading } = useEnsAddress({
    name: username,
    universalResolverAddress: USERNAME_L2_RESOLVER_ADDRESSES[basenameChain.id],
  });

  const defaultSelectedProfilePicture = getUserNamePicture(username);
  const avatar = basenameAvatar ?? defaultSelectedProfilePicture;
  const isLoading = baseEnsAvatarIsLoading || basenameAddressIsLoading;

  return (
    <div className="flex items-center gap-4">
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
      <div>
        <strong>{username}</strong>
        {basenameAddress && <p className="text-gray-40">{truncateMiddle(basenameAddress, 6, 4)}</p>}
      </div>
    </div>
  );
}
