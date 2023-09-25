import { useEffect, useState } from 'react';
import { providers } from 'ethers';
import { useProvider } from 'wagmi';

export function useGetCode(address?: `0x${string}`) {
  const provider = useProvider<providers.JsonRpcProvider>();
  const [code, setCode] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (address) {
      void (async () => {
        const codeAtAddress = await provider.getCode(address);
        setCode(codeAtAddress);
      })();
    }
  }, [address, provider]);

  return code;
}
