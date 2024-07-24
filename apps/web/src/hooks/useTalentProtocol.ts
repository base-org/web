import { useQuery } from '@tanstack/react-query';

async function fetchPassport(address: `0x${string}`) {
  const response = await fetch(`https://api.talentprotocol.com/api/v2/passports/${address}`, {
    method: 'GET',
    headers: {},
  });
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
