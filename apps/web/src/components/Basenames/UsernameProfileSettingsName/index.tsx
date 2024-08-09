'use client';
import { useCallback } from 'react';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Dropdown from 'apps/web/src/components/Dropdown';
import DropdownToggle from 'apps/web/src/components/DropdownToggle';
import DropdownMenu, { DropdownMenuAlign } from 'apps/web/src/components/DropdownMenu';
import DropdownItem from 'apps/web/src/components/DropdownItem';
import { useUsernameProfile } from 'apps/web/src/components/Basenames/UsernameProfileContext';
import useBaseEnsName from 'apps/web/src/hooks/useBaseEnsName';
import useSetPrimaryBasename from 'apps/web/src/hooks/useSetPrimaryBasename';
import { useErrors } from 'apps/web/contexts/Errors';

export default function UsernameProfileSettingsName() {
  // Profile username
  const { profileUsername, profileAddress, currentWalletIsOwner } = useUsernameProfile();

  // Primary username
  const { data: primaryUsername } = useBaseEnsName({
    address: profileAddress,
  });

  // Hook to update primary name
  const { setPrimaryName, isLoading: setPrimaryNameIsLoading } = useSetPrimaryBasename({
    secondaryName: profileUsername,
  });

  // Error & Analytics
  const { logError } = useErrors();

  const setPrimaryUsername = useCallback(() => {
    setPrimaryName().catch((error) => {
      logError(error, 'Failed to update primary name');
    });
  }, [logError, setPrimaryName]);

  const isPrimaryName = currentWalletIsOwner && profileUsername === primaryUsername;
  const isSecondaryName = currentWalletIsOwner && profileUsername !== primaryUsername;

  return (
    <div className="flex flex-col gap-4">
      <div>
        {isPrimaryName && (
          <span className="rounded-md bg-blue-0 px-2 py-1 text-sm font-bold text-blue-60">
            Primary Name
          </span>
        )}
        {isSecondaryName && (
          <span className="rounded-md bg-orange-0 px-2 py-1 text-sm font-bold text-orange-60">
            Secondary Name
          </span>
        )}
      </div>
      <div className="flex w-full items-center justify-between gap-4">
        <span>{profileUsername}</span>
        {isSecondaryName &&
          (setPrimaryNameIsLoading ? (
            <Icon name="spinner" height="1rem" width="1rem" color="currentColor" />
          ) : (
            <Dropdown>
              <DropdownToggle>
                <Icon name="pen" height="1rem" width="1rem" color="currentColor" />
              </DropdownToggle>
              <DropdownMenu align={DropdownMenuAlign.Center}>
                <DropdownItem onClick={setPrimaryUsername}>Set as Primary name</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ))}
      </div>
    </div>
  );
}
