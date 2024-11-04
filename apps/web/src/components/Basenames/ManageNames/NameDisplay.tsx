import BasenameAvatar from 'apps/web/src/components/Basenames/BasenameAvatar';
import { BaseName } from '@coinbase/onchainkit/identity';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Dropdown from 'apps/web/src/components/Dropdown';
import DropdownItem from 'apps/web/src/components/DropdownItem';
import DropdownMenu from 'apps/web/src/components/DropdownMenu';
import DropdownToggle from 'apps/web/src/components/DropdownToggle';
import classNames from 'classnames';

const transitionClasses = 'transition-all duration-700 ease-in-out';

const pillNameClasses = classNames(
  'bg-blue-500 mx-auto text-white relative leading-[2em] overflow-hidden text-ellipsis max-w-full',
  'shadow-[0px_8px_16px_0px_rgba(0,82,255,0.32),inset_0px_8px_16px_0px_rgba(255,255,255,0.25)]',
  transitionClasses,
  'rounded-[2rem] py-6 px-6 w-full',
);

const avatarClasses = classNames(
  'flex items-center justify-center overflow-hidden rounded-full',
  transitionClasses,
  'h-[2.5rem] w-[2.5rem] md:h-[4rem] md:w-[4rem] top-3 md:top-4 left-4',
);

type NameDisplayProps = {
  domain: string;
  isPrimary: boolean;
  tokenId: string;
  expiresAt: string;
};

export default function NameDisplay({ domain, isPrimary, tokenId, expiresAt }: NameDisplayProps) {
  const expirationText = formatDistanceToNow(parseISO(expiresAt), { addSuffix: true });

  return (
    <li key={tokenId} className={pillNameClasses}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BasenameAvatar
            basename={domain as BaseName}
            wrapperClassName={avatarClasses}
            width={4 * 16}
            height={4 * 16}
          />
          <div>
            <p className="text-lg font-medium">{domain}</p>
            <p className="text-sm opacity-75">Expires {expirationText}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isPrimary && (
            <span className="rounded-full bg-white px-2 py-1 text-sm text-black">Primary</span>
          )}
          <Dropdown>
            <DropdownToggle>
              <Icon name="verticalDots" color="currentColor" width="2rem" height="2rem" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => {}}>Transfer name</DropdownItem>
              <DropdownItem onClick={() => {}}>Set as primary</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </li>
  );
}
