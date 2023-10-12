import { useEffect, useState } from 'react';
import { usePublicClient } from 'wagmi';

export function useGetCode(chainId: number, address?: `0x${string}`) {
  const publicClient = usePublicClient({ chainId });
  const [code, setCode] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (address) {
      void (async () => {
        const codeAtAddress = await publicClient.getBytecode({ address });
        setCode(codeAtAddress);
      })();
    }
  }, [address, publicClient]);

  return code;
}
