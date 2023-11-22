import { useQuery } from 'react-query';
import { request } from 'apps/bridge/src/http/fetchJSON';

type UseConversionRateParams = {
  asset: string;
  refetch?: boolean;
};

type CoinGeckoResponseType = Record<
  string,
  {
    usd: number;
  }
>;

export function useConversionRate({
  asset,
  refetch = true,
}: UseConversionRateParams): number | undefined {
  const { data } = useQuery(
    asset,
    async () => {
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${asset}&vs_currencies=usd`;
      const response = await request<CoinGeckoResponseType>(url, undefined, 'get');
      if (!response.body) {
        throw new Error('Network response was not ok');
      }
      return response.body[asset]?.usd;
    },
    {
      suspense: false,
      staleTime: refetch ? 15000 : Infinity,
      refetchInterval: refetch ? 1000 * 30 : false,
      refetchOnMount: refetch,
      refetchOnReconnect: refetch,
      refetchIntervalInBackground: refetch,
    },
  );

  return data;
}
