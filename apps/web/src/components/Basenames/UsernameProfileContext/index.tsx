import { USERNAME_L2_RESOLVER_ADDRESSES } from 'apps/web/src/addresses/usernames';
import { BaseSepoliaName, formatBaseEthDomain } from 'apps/web/src/utils/usernames';
import { useParams } from 'next/navigation';
import { ReactNode, createContext, useContext, useMemo } from 'react';
import { Address } from 'viem';
import { baseSepolia } from 'viem/chains';
import { useEnsAddress } from 'wagmi';

export enum UsernameProfileSteps {}

export type UsernameProfileContextProps = {
  profileUsername: string;
  profileUsernameFormatted: BaseSepoliaName;
  profileAddressIsLoading: boolean;
  profileAddress?: Address;
};

export const UsernameProfileContext = createContext<UsernameProfileContextProps>({
  profileUsername: '',
  profileUsernameFormatted: formatBaseEthDomain('default'),
  profileAddressIsLoading: true,
  profileAddress: undefined,
});

type UsernameProfileProviderProps = {
  children: ReactNode;
};

export default function UsernameProfileProvider({ children }: UsernameProfileProviderProps) {
  const { username: profileUsername } = useParams<{ username: string }>();
  const profileUsernameFormatted = formatBaseEthDomain(profileUsername);
  const { data: profileAddress, isLoading: profileAddressIsLoading } = useEnsAddress({
    name: formatBaseEthDomain(profileUsername),
    chainId: baseSepolia.id,
    universalResolverAddress: USERNAME_L2_RESOLVER_ADDRESSES[baseSepolia.id],
    query: {
      enabled: !!profileUsername,
    },
  });

  const values = useMemo(() => {
    return {
      profileAddress: profileAddress?.toString() as Address,
      profileAddressIsLoading,
      profileUsername,
      profileUsernameFormatted,
    };
  }, [profileAddress, profileAddressIsLoading, profileUsername, profileUsernameFormatted]);

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
