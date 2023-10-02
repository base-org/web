import {
  createContext,
  memo,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useQuery } from 'react-query';
import { useAccount } from 'wagmi';

export type TOSRegion = 'US' | 'EU';

type TOSContextType = {
  isTosAccepted: boolean;
  acceptTos: () => void;
  tosRegion: TOSRegion;
  isTosRegionLoading: boolean;
};

type TOSProviderProps = {
  children: ReactNode;
};

export const TOSContext = createContext<TOSContextType>({
  isTosAccepted: false,
  acceptTos: () => {},
  tosRegion: 'US',
  isTosRegionLoading: false,
});

async function fetchTosRegion(): Promise<{ tosRegion: TOSRegion }> {
  const response = await fetch('/api/tos', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return (await response.json()) as { tosRegion: TOSRegion };
}

export const TOSProvider = memo<TOSProviderProps>(function TOSProvider({
  children,
}: TOSProviderProps) {
  const { address } = useAccount();
  const [isTosAccepted, setIsTosAccepted] = useState(false);
  const { data: tosRegion, isLoading: isTosRegionLoading } = useQuery(
    ['tos'],
    async () => fetchTosRegion(),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      select: (r) => r.tosRegion,
    },
  );

  useEffect(() => {
    if (address) {
      const isTosAcceptedLocally = localStorage.getItem(`tos_accepted_${address}`) === 'true';
      if (isTosAcceptedLocally) {
        setIsTosAccepted(true);
      } else {
        setIsTosAccepted(false);
      }
    }
  }, [address]);

  const acceptTos = useCallback(() => {
    setIsTosAccepted(true);
    localStorage.setItem(`tos_accepted_${address}`, 'true');
  }, [address]);

  const contextValue = useMemo(
    () => ({ isTosAccepted, acceptTos, tosRegion: tosRegion ?? 'US', isTosRegionLoading }),
    [isTosAccepted, acceptTos, tosRegion, isTosRegionLoading],
  );

  return <TOSContext.Provider value={contextValue}>{children}</TOSContext.Provider>;
});

export function useTOSStatus() {
  return useContext(TOSContext);
}
