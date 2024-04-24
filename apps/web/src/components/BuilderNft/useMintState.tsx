import { useAccount, useWriteContract } from 'wagmi';
import { createContext, useCallback, useContext, useEffect } from 'react';
import { base } from 'viem/chains';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { contractABI, contractAddress } from 'apps/web/src/components/BuilderNft/constants';

class HttpError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export type MintStatus =
  | 'disconnected'
  | 'loading-proof'
  | 'not-eligible'
  | 'eligible'
  | 'minting'
  | 'minted'
  | 'mint-error';

export type MintState = {
  status: MintStatus;
  mint?: () => void;
  error?: Error;
  txHash?: `0x${string}`;
};

export function useProofQuery(): UseQueryResult<{ result: string[] }> {
  const { address, status } = useAccount();

  return useQuery({
    queryKey: ['proof', address],
    retry: (failureCount: number, error: HttpError) => failureCount < 3 && error.status !== 404,
    queryFn: async () => {
      const response = await fetch(`/api/checkNftProof`, {
        method: 'POST',
        body: JSON.stringify({ address }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new HttpError(response.status, 'Proof lookup failed');
      }

      return response.json();
    },
    enabled: status === 'connected',
  });
}

export function useMintState(): MintState {
  const { status, address } = useAccount();

  useEffect(() => {
    if (window.ClientAnalytics && address) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      window.ClientAnalytics?.logEvent('connected_wallet', {
        address,
      });
    }
  }, [address]);

  const proofQuery = useProofQuery();
  const proof = proofQuery.data?.result;
  console.log({ proof });

  const { writeContract, isPending, isSuccess, error, data: txHash } = useWriteContract();

  const mint = useCallback(() => {
    if (contractAddress) {
      writeContract({
        abi: contractABI,
        address: contractAddress,
        functionName: 'mint',
        args: [proof],
        chainId: base.id,
      });
    }
  }, [proof, writeContract]);

  if (isPending) {
    return {
      status: 'minting',
    };
  }

  if (isSuccess) {
    return {
      status: 'minted',
      txHash,
    };
  }

  if (error) {
    console.log({ error });
    return {
      status: 'mint-error',
      error,
    };
  }

  if (status !== 'connected') {
    return {
      status: 'disconnected',
    };
  }

  if (proofQuery.isLoading) {
    return {
      status: 'loading-proof',
    };
  }

  if (proofQuery.isError) {
    return {
      status: 'not-eligible',
    };
  }

  return { status: 'eligible', mint };
}

export const MintStateContext = createContext<MintState>({
  status: 'disconnected',
  mint: undefined,
});

export function useMintStateContext() {
  return useContext(MintStateContext);
}
