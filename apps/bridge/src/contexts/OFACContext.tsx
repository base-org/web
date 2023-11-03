import { createContext, memo, ReactNode, useContext, useMemo } from 'react';
import { useQuery } from 'react-query';
import getConfig from 'next/config';
import { useAccount } from 'wagmi';

const { publicRuntimeConfig } = getConfig();

type OFACContextType = {
  isOFACAllowed: boolean;
  isOFACAllowedLoading: boolean;
};

type OFACProviderProps = {
  children: ReactNode;
};

export const OFACContext = createContext<OFACContextType>({
  isOFACAllowed: false,
  isOFACAllowedLoading: false,
});

export async function fetchIsAllowed(address?: `0x${string}`): Promise<{ result: boolean }> {
  if (!address) {
    return { result: false };
  }

  const response = await fetch(publicRuntimeConfig.bridgeApiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'verifier_isAllowed',
      params: [address],
      id: 0,
    }),
  });

  return (await response.json()) as { result: boolean };
}

export const OFACProvider = memo<OFACProviderProps>(function OFACProvider({
  children,
}: OFACProviderProps) {
  const { address } = useAccount();

  const { data: isOFACAllowed, isLoading: isOFACAllowedLoading } = useQuery(
    ['isOFACBlocked', address],
    async () => fetchIsAllowed(address),
    {
      select: (r) => r.result,
    },
  );

  const contextValue = useMemo(
    () => ({
      isOFACAllowed: !address || (address && !!isOFACAllowed),
      isOFACAllowedLoading,
    }),
    [isOFACAllowed, isOFACAllowedLoading, address],
  );

  return <OFACContext.Provider value={contextValue}>{children}</OFACContext.Provider>;
});

export function useOFACStatus() {
  return useContext(OFACContext);
}
