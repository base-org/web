import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
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
  const params = useParams<{ username: BaseName }>();
  const profileUsername = params?.username;

  const { address } = useAccount();

  const { basenameChain } = useBasenameChain();

  const { data: profileAddress, isLoading: profileAddressIsLoading } = useEnsAddress({
    name: profileUsername,
    chainId: basenameChain.id,
    universalResolverAddress: USERNAME_L2_RESOLVER_ADDRESSES[basenameChain.id],
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
