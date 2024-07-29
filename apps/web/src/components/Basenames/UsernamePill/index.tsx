import { BaseName } from '@coinbase/onchainkit/identity';
import Dropdown from 'apps/web/src/components/Dropdown';
import DropdownItem from 'apps/web/src/components/DropdownItem';
import DropdownMenu from 'apps/web/src/components/DropdownMenu';
import DropdownToggle from 'apps/web/src/components/DropdownToggle';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import ImageWithLoading from 'apps/web/src/components/ImageWithLoading';
import useReadBaseEnsTextRecords from 'apps/web/src/hooks/useReadBaseEnsTextRecords';
import { getUserNamePicture } from 'apps/web/src/utils/usernames';
import classNames from 'classnames';
import { Address } from 'viem';

export enum UsernamePillVariants {
  Inline = 'inline',
  Card = 'card',
}

type UsernamePillProps = {
  variant: UsernamePillVariants;
  username: BaseName;
  address?: Address;
};

export function UsernamePill({ variant, username, address }: UsernamePillProps) {
  const transitionClasses = 'transition-all duration-700 ease-in-out';

  const pillNameClasses = classNames(
    'bg-blue-500 text-white relative leading-[2em] overflow-hidden text-ellipsis max-w-full',
    'shadow-[0px_8px_16px_0px_rgba(0,82,255,0.32),inset_0px_8px_16px_0px_rgba(255,255,255,0.25)]',
    transitionClasses,
    {
      // Note: If you change this py-5, it won't match the dropdown's height
      'rounded-[5rem] py-5 px-8 w-fit': variant === UsernamePillVariants.Inline,
      'rounded-[2rem] py-8 px-10 pt-40 w-full': variant === UsernamePillVariants.Card,
    },
  );

  const avatarClasses = classNames(
    'flex items-center justify-center overflow-hidden rounded-full',
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

  const { existingTextRecords, existingTextRecordsIsLoading } = useReadBaseEnsTextRecords({
    address: address,
    username: username,
  });

  const selectedProfilePicture = existingTextRecords.avatar || getUserNamePicture(username);

  return (
    <div className={pillNameClasses}>
      <ImageWithLoading
        src={selectedProfilePicture}
        alt={username}
        title={username}
        wrapperClassName={avatarClasses}
        imageClassName="object-cover w-full h-full"
        backgroundClassName="bg-blue-500"
        width={4 * 16}
        height={4 * 16}
        forceIsLoading={existingTextRecordsIsLoading}
      />
      <span className={userNameClasses}>{username}</span>
      {address && (
        <div className="absolute right-4 top-4">
          <Dropdown>
            <DropdownToggle>
              <span className="inline-block p-2 opacity-50 hover:opacity-100">
                <Icon name="caret" color="currentColor" width="1.5rem" height="1.5rem" />
              </span>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem copyValue={username}>{username}</DropdownItem>
              <DropdownItem copyValue={address}>{address}</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      )}
    </div>
  );
}
