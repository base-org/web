import { useRegistration } from 'apps/web/src/components/Basenames/RegistrationContext';
import { formatBaseEthDomain, getUserNamePicture } from 'apps/web/src/utils/usernames';
import classNames from 'classnames';
import Image from 'next/image';

export enum UsernamePillVariants {
  Inline = 'inline',
  Card = 'card',
}

type UsernamePillProps = {
  variant: UsernamePillVariants;
};

export function UsernamePill({ variant }: UsernamePillProps) {
  const transitionClasses = 'transition-all duration-200 ease-in-out';

  const { selectedName } = useRegistration();
  const pillNameClasses = classNames(
    'bg-blue-500 w-auto max-w-fit	text-white ',
    'relative leading-[2em]',
    'shadow-[0px_8px_16px_0px_rgba(0,82,255,0.32),inset_0px_8px_16px_0px_rgba(255,255,255,0.25)]',
    transitionClasses,
    {
      // Note: If you change this py-5, it won't match the dropdown's height
      'rounded-[5rem] py-5 px-8 min-w-[24.5rem]': variant === UsernamePillVariants.Inline,
      'rounded-[2rem] py-8 px-10 min-w-[26rem] pt-40': variant === UsernamePillVariants.Card,
    },
  );

  const avatarClasses = classNames(
    'inline-block overflow-hidden rounded-full',
    'absolute',
    transitionClasses,
    {
      'h-[4rem] max-h-[4rem] min-h-[4rem] w-[4rem] min-w-[4rem] max-w-[4rem] top-4 left-4':
        variant === UsernamePillVariants.Inline,
      'h-[3rem] max-h-[3rem] min-h-[3rem] w-[3rem] min-w-[3rem] max-w-[3rem] top-10 left-10':
        variant === UsernamePillVariants.Card,
    },
  );

  const userNameClasses = classNames(
    'overflow-y-hidden text-ellipsis whitespace-nowrap',
    transitionClasses,
    {
      'text-5xl pl-[4rem]': variant === UsernamePillVariants.Inline,
      'text-3xl pl-0 mt-20': variant === UsernamePillVariants.Card,
    },
  );

  const selectedProfilePicture = getUserNamePicture(selectedName);

  return (
    <div className={pillNameClasses}>
      <figure className={avatarClasses}>
        <Image
          src={selectedProfilePicture}
          priority
          loading="eager"
          alt={formatBaseEthDomain(selectedName)}
          title={formatBaseEthDomain(selectedName)}
          className="object-fill"
        />
      </figure>
      <span className={userNameClasses}>{formatBaseEthDomain(selectedName)}</span>
    </div>
  );
}
