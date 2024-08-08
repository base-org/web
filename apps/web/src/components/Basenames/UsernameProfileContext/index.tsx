'use client';
import { BaseName } from '@coinbase/onchainkit/identity';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Address } from 'viem';
import { useAccount } from 'wagmi';

export enum UsernameProfileSteps {}

export type UsernameProfileContextProps = {
  profileUsername: BaseName;
  profileAddress?: Address;
  currentWalletIsOwner?: boolean;
  showProfileSettings: boolean;
  setShowProfileSettings: Dispatch<SetStateAction<boolean>>;
};

export const UsernameProfileContext = createContext<UsernameProfileContextProps>({
  profileUsername: 'default.basetest.eth',
  profileAddress: undefined,
  currentWalletIsOwner: false,
  showProfileSettings: false,
  setShowProfileSettings: () => undefined,
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

  const [showProfileSettings, setShowProfileSettings] = useState<boolean>(false);
  const { address: connectedAddress } = useAccount();
  const currentWalletIsOwner = connectedAddress === address;

  const values = useMemo(() => {
    return {
      profileAddress: address?.toString() as Address,
      profileUsername,
      currentWalletIsOwner,
      showProfileSettings,
      setShowProfileSettings,
    };
  }, [address, currentWalletIsOwner, profileUsername, showProfileSettings]);

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
