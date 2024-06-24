import { formatBaseEthDomain, getUsernamePictureIndex } from 'apps/web/src/utils/usernames';
import classNames from 'classnames';
import profilePictures1 from './profilesPictures/1.svg';
import profilePictures2 from './profilesPictures/2.svg';
import profilePictures3 from './profilesPictures/3.svg';
import profilePictures4 from './profilesPictures/4.svg';
import profilePictures5 from './profilesPictures/5.svg';
import profilePictures6 from './profilesPictures/6.svg';
import profilePictures7 from './profilesPictures/7.svg';
import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

type UsernamePillProps = {
  username: string;
};

export function UsernamePill({ username }: UsernamePillProps) {
  const pillNameClasses = classNames(
    'bg-blue-500 w-auto max-w-fit	py-4 px-6 rounded-[5rem] text-5xl text-white ',
    'flex gap-4 items-center',
    'leading-[1.2em]',
    'shadow-[0px_8px_16px_0px_rgba(0,82,255,0.32),inset_0px_8px_16px_0px_rgba(255,255,255,0.25)]',
  );

  const profilePictures = [
    profilePictures1,
    profilePictures2,
    profilePictures3,
    profilePictures4,
    profilePictures5,
    profilePictures6,
    profilePictures7,
  ];
  const profilePictureIndex = getUsernamePictureIndex(username, profilePictures.length);

  const selectedProfilePicture = profilePictures[profilePictureIndex] as unknown as StaticImport;

  return (
    <div className={pillNameClasses}>
      <figure className="inline-block h-[4rem] max-h-[4rem] min-h-[4rem] w-[4rem] min-w-[4rem] max-w-[4rem] overflow-hidden rounded-full">
        <Image
          src={selectedProfilePicture}
          priority
          loading="eager"
          alt={formatBaseEthDomain(username)}
          title={formatBaseEthDomain(username)}
          className="object-fill"
        />
      </figure>
      <span className="overflow-y-hidden text-ellipsis whitespace-nowrap">
        {formatBaseEthDomain(username)}
      </span>
    </div>
  );
}
