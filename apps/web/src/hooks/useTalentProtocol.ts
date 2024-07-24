import { useQuery } from '@tanstack/react-query';

async function fetchPassport(address: `0x${string}`) {
  console.log(process.env.NEXT_PUBLIC_TALENT_PROTOCOL_API_KEY);
  const response = await fetch(`/api/basenames/talentprotocol/${address}`);
  const data = await response.json();
  return data;
}

export function useTalentProtocol(address?: `0x${string}`) {
  const query = useQuery({
    queryKey: ['talent-protocol', address],
    queryFn: async ({ queryKey }) => fetchPassport(queryKey[1] as `0x${string}`),
    enabled: !!address,
  });

  console.log(query.data);

  return query.data;
}
