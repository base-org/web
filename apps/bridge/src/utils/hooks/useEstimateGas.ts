import { useEffect, useState } from 'react';
import { BigNumber, Contract, ContractInterface } from 'ethers';
import { useProvider } from 'wagmi';

type UseEstimateGasProps = {
  chainId: number;
  address: `0x${string}`;
  abi: ContractInterface;
  f: string;
  args: unknown[];
};

export function useEstimateGas({ chainId, address, abi, f, args }: UseEstimateGasProps) {
  const provider = useProvider({ chainId });
  const contract = new Contract(address, abi, provider);
  const [gasEstimate, setGasEstimate] = useState<undefined | BigNumber>(undefined);

  useEffect(() => {
    void (async () => {
      try {
        const estimate = await contract.estimateGas[f](...args);
        setGasEstimate(estimate);
      } catch (e) {
        setGasEstimate(undefined);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, address, args, f]);

  return gasEstimate;
}
