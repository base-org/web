import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import { useParams } from 'next/navigation';
import { ReactNode, createContext, useContext, useMemo } from 'react';
import { GetEnsAddressReturnType } from 'viem';
import { baseSepolia } from 'viem/chains';
import { useEnsAddress } from 'wagmi';

export enum UsernameProfileSteps {}

export type UsernameProfileContextProps = {
  profileUsername: string;
  profileAddressIsLoading: boolean;
  profileAddress?: GetEnsAddressReturnType;
};

export const UsernameProfileContext = createContext<UsernameProfileContextProps>({
  profileUsername: '',
  profileAddressIsLoading: true,
  profileAddress: undefined,
});

type UsernameProfileProviderProps = {
  children: ReactNode;
};

export default function UsernameProfileProvider({ children }: UsernameProfileProviderProps) {
  const { username: profileUsername } = useParams<{ username: string }>();

  const { data: profileAddress, isLoading: profileAddressIsLoading } = useEnsAddress({
    name: 'katzman.basetest.eth', // TODO: for some reason leogalleto.basetest.eth doesn't work
    chainId: baseSepolia.id,
    universalResolverAddress: USERNAME_L2_RESOLVER_ADDRESSES[baseSepolia.id],
    query: {
      enabled: !!profileUsername,
    },
  });

  const values = useMemo(() => {
    return { profileAddress, profileAddressIsLoading, profileUsername };
  }, [profileAddress, profileAddressIsLoading, profileUsername]);

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
