'use client';
import { BaseName } from '@coinbase/onchainkit/identity';
import { ReactNode, createContext, useContext, useMemo } from 'react';
import { Address } from 'viem';
import { useAccount } from 'wagmi';

export enum UsernameProfileSteps {}

export type UsernameProfileContextProps = {
  profileUsername: BaseName;
  profileAddress?: Address;
  currentWalletIsOwner?: boolean;
};

export const UsernameProfileContext = createContext<UsernameProfileContextProps>({
  profileUsername: 'default.basetest.eth',
  profileAddress: undefined,
  currentWalletIsOwner: false,
});

type UsernameProfileProviderProps = {
  children: ReactNode;
  username: BaseName;
  address: Address;
};

export default function UsernameProfileProvider({
  children,
  username,
  address,
}: UsernameProfileProviderProps) {
  const profileUsername = username;
  const { address: connectedAddress } = useAccount();
  const currentWalletIsOwner = connectedAddress === address;

  const values = useMemo(() => {
    return {
      profileAddress: address?.toString() as Address,
      profileUsername,
      currentWalletIsOwner,
    };
  }, [address, currentWalletIsOwner, profileUsername]);

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
