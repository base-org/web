import { getAttestations } from '@coinbase/onchainkit/identity';
import { useQuery } from '@tanstack/react-query';
import { base } from 'viem/chains';

const COINBASE_VERIFIED_ACCOUNT_SCHEMA_ID =
  '0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9';

const attestationsOptions = {
  schemas: [COINBASE_VERIFIED_ACCOUNT_SCHEMA_ID],
};

export async function getCoinbaseVerifications(address: `0x${string}`) {
  const attestations = await getAttestations(address, base, attestationsOptions);
  return attestations;
}

export function useCoinbaseVerification(address: `0x${string}`) {
  const attestations = useQuery({
    queryKey: ['coinbase-attestations', address],
    queryFn: async ({ queryKey }) => getCoinbaseVerifications(queryKey[1] as `0x${string}`),
  });

  return attestations;
}
