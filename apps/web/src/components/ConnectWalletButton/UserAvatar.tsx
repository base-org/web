import { useAccount, useEnsAvatar, useEnsName } from 'wagmi';
import Image from 'next/image';
import { mainnet } from 'wagmi/chains';
import { getUsernamePictureIndex } from 'apps/web/src/utils/usernames';
import profilePictures1 from './profilesPictures/1.svg';
import profilePictures2 from './profilesPictures/2.svg';
import profilePictures3 from './profilesPictures/3.svg';
import profilePictures4 from './profilesPictures/4.svg';
import profilePictures5 from './profilesPictures/5.svg';
import profilePictures6 from './profilesPictures/6.svg';
import profilePictures7 from './profilesPictures/7.svg';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import classNames from 'classnames';

export enum AvatarSizes {
  Medium,
  None,
}

type UserAvatarProps = { size?: AvatarSizes };

export function UserAvatar({ size = AvatarSizes.None }: UserAvatarProps) {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({
    address,
    chainId: mainnet.id,
  });
  const { data: ensAvatar } = useEnsAvatar({
    name: ensName ?? undefined,
    chainId: mainnet.id,
    assetGatewayUrls: {
      ipfs: 'https://cloudflare-ipfs.com',
    },
  });

  const profilePictures = [
    profilePictures1,
    profilePictures2,
    profilePictures3,
    profilePictures4,
    profilePictures5,
    profilePictures6,
    profilePictures7,
  ];

  // TODO: Resolve address to [name].base.eth when the reverse resolver is setup
  const deterministicName = address ?? 'default-avatar';
  const profilePictureIndex = getUsernamePictureIndex(deterministicName, profilePictures.length);
  const defaultSelectedProfilePicture = profilePictures[
    profilePictureIndex
  ] as unknown as StaticImport;
  const avatar = ensAvatar ?? defaultSelectedProfilePicture;

  const figureClasses = classNames({
    'h-[2rem] max-h-[2rem] min-h-[2rem] w-[2rem] min-w-[2rem] max-w-[2rem]':
      size === AvatarSizes.Medium,
  });

  return (
    <figure className={figureClasses}>
      <Image src={avatar} className="rounded-full" alt="Avatar" />
    </figure>
  );
}
