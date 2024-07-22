import { USERNAME_CHAIN_ID, USERNAME_L2_RESOLVER_ADDRESS } from 'apps/web/src/addresses/usernames';
import { BaseName } from 'apps/web/src/utils/usernames';
import { useParams } from 'next/navigation';
import { ReactNode, createContext, useContext, useMemo } from 'react';
import { Address } from 'viem';
import { useAccount, useEnsAddress } from 'wagmi';

export enum UsernameProfileSteps {}

export type UsernameProfileContextProps = {
  profileUsername: BaseName;
  profileAddressIsLoading: boolean;
  profileAddress?: Address;
  currentWalletIsOwner?: boolean;
};

export const UsernameProfileContext = createContext<UsernameProfileContextProps>({
  profileUsername: 'default.basetest.eth',
  profileAddressIsLoading: true,
  profileAddress: undefined,
  currentWalletIsOwner: false,
});

type UsernameProfileProviderProps = {
  children: ReactNode;
};

export default function UsernameProfileProvider({ children }: UsernameProfileProviderProps) {
  const { username: profileUsername } = useParams<{ username: BaseName }>();
  const { address } = useAccount();

  const { data: profileAddress, isLoading: profileAddressIsLoading } = useEnsAddress({
    name: profileUsername,
    chainId: USERNAME_CHAIN_ID,
    universalResolverAddress: USERNAME_L2_RESOLVER_ADDRESS,
    query: {
      enabled: !!profileUsername,
    },
  });

  const currentWalletIsOwner = address === profileAddress;

  const values = useMemo(() => {
    return {
      profileAddress: profileAddress?.toString() as Address,
      profileAddressIsLoading,
      profileUsername,
      currentWalletIsOwner,
    };
  }, [currentWalletIsOwner, profileAddress, profileAddressIsLoading, profileUsername]);

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
