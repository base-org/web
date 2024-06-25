import { formatBaseEthDomain, getUserNamePicture } from 'apps/web/src/utils/usernames';
import classNames from 'classnames';

import Image from 'next/image';

type UsernamePillProps = {
  username: string;
};

export function UsernamePill({ username }: UsernamePillProps) {
  const pillNameClasses = classNames(
    'bg-blue-500 w-auto max-w-fit	pl-6 pr-8 rounded-[5rem] text-5xl text-white ',
    'flex gap-4 items-center',
    'leading-[2em]',
    'shadow-[0px_8px_16px_0px_rgba(0,82,255,0.32),inset_0px_8px_16px_0px_rgba(255,255,255,0.25)]',
  );

  const selectedProfilePicture = getUserNamePicture(username);
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
