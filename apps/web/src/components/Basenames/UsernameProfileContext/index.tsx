'use client';
import { BaseName } from '@coinbase/onchainkit/identity';
import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import useBaseEnsName from 'apps/web/src/hooks/useBaseEnsName';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { buildBasenameOwnerContract } from 'apps/web/src/utils/usernames';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Address } from 'viem';
import { useAccount, useEnsAddress, useReadContract } from 'wagmi';

export enum UsernameProfileSteps {}

export type UsernameProfileContextProps = {
  // Profile details
  profileUsername: BaseName;
  profileAddress?: Address;

  // Profile owner
  profileOwnerAddress?: Address;
  profileOwnerUsername?: BaseName;
  profileOwnerRefetch: () => Promise<void>;

  // State
  currentWalletIsProfileOwner: boolean;
  currentWalletIsProfileAddress: boolean;

  // Settings
  showProfileSettings: boolean;
  setShowProfileSettings: Dispatch<SetStateAction<boolean>>;
};

export const UsernameProfileContext = createContext<UsernameProfileContextProps>({
  profileUsername: 'default.basetest.eth',
  profileAddress: undefined,
  profileOwnerAddress: undefined,
  profileOwnerRefetch: async () => undefined,
  currentWalletIsProfileOwner: false,
  currentWalletIsProfileAddress: false,
  showProfileSettings: false,
  setShowProfileSettings: () => undefined,
});

type UsernameProfileProviderProps = {
  children: ReactNode;
  username: BaseName;
};

export default function UsernameProfileProvider({
  children,
  username,
}: UsernameProfileProviderProps) {
  const [showProfileSettings, setShowProfileSettings] = useState<boolean>(false);
  const { basenameChain } = useBasenameChain(username);

  // Current wallet
  const { address: connectedAddress, isConnected } = useAccount();

  // Profile address
  const {
    data: profileAddress,
    isFetching: profileAddressIsFetching,
    refetch: profileAddressRefetch,
  } = useEnsAddress({
    name: username,
    universalResolverAddress: USERNAME_L2_RESOLVER_ADDRESSES[basenameChain.id],
    query: {
      retry: false,
    },
  });

  // Owner address
  const {
    data: profileOwnerAddress,
    isFetching: profileOwnerAddressIsFetching,
    refetch: profileOwnerRefetch,
  } = useReadContract(buildBasenameOwnerContract(username));

  // Owner Basename
  const { data: profileOwnerUsername } = useBaseEnsName({
    address: profileOwnerAddress as Address,
  });

  const currentWalletIsProfileOwner =
    !profileOwnerAddressIsFetching && isConnected && connectedAddress === profileOwnerAddress;
  const currentWalletIsProfileAddress =
    !profileAddressIsFetching && isConnected && connectedAddress === profileAddress;

  const refechOwnerAndAddress = useCallback(async () => {
    await profileAddressRefetch();
    await profileOwnerRefetch();
  }, [profileAddressRefetch, profileOwnerRefetch]);

  const values = useMemo(() => {
    return {
      profileAddress: profileAddress ? profileAddress : undefined,
      profileUsername: username,
      profileOwnerAddress: profileOwnerAddress ? (profileOwnerAddress as Address) : undefined,
      profileOwnerUsername,
      profileOwnerRefetch: refechOwnerAndAddress, // for now we refetch both since ownership sets both
      currentWalletIsProfileOwner,
      currentWalletIsProfileAddress,
      showProfileSettings,
      setShowProfileSettings,
    };
  }, [
    profileAddress,
    username,
    profileOwnerAddress,
    profileOwnerUsername,
    refechOwnerAndAddress,
    currentWalletIsProfileOwner,
    currentWalletIsProfileAddress,
    showProfileSettings,
  ]);

  return (
    <UsernameProfileContext.Provider value={values}>{children}</UsernameProfileContext.Provider>
  );
}

export function useUsernameProfile() {
  const context = useContext(UsernameProfileContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a CountProvider');
  }
  return context;
}
