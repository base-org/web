import { formatBaseEthDomain } from 'apps/web/src/utils/usernames';
import classNames from 'classnames';

// TODO: Should this be based on the name ?
import tempUsernameAccount from './tempUsernameIcon.svg';
import Image from 'next/image';

type UsernamePillProps = {
  username: string;
};

export function UsernamePill({ username }: UsernamePillProps) {
  // TODO: This font-size/design *will* overflow on mobile devices
  const pillNameClasses = classNames(
    'bg-blue-500 w-auto max-w-fit	py-4 px-6 rounded-[5rem] text-5xl text-white',
    'flex gap-4 items-center',
    'shadow-[0px_8px_16px_0px_rgba(0,82,255,0.32),inset_0px_8px_16px_0px_rgba(255,255,255,0.25)]',
  );

  return (
    <div className={pillNameClasses}>
      <figure className="inline-block h-[4rem] max-h-[4rem] w-[4rem] max-w-[4rem] overflow-hidden rounded-full">
        <Image
          src={tempUsernameAccount}
          priority
          loading="eager"
          alt={formatBaseEthDomain(username)}
          className="object-fill"
        />
      </figure>
      {formatBaseEthDomain(username)}
    </div>
  );
}
