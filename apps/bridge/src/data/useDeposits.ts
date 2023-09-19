import { useQuery } from 'react-query';
import { getJSON } from 'apps/bridge/src/http/fetchJSON';
import { BlockExplorerApiResponse, BlockExplorerTransaction } from 'apps/bridge/src/types/API';
import { BridgeTransaction } from 'apps/bridge/src/types/BridgeTransaction';
import { explorerTxToBridgeDeposit } from 'apps/bridge/src/utils/transactions/explorerTxToBridgeDeposit';
import { isETHOrERC20Deposit } from 'apps/bridge/src/utils/transactions/isETHOrERC20Deposit';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

function toDeposits(transactions: BlockExplorerTransaction[]): BridgeTransaction[] {
  return transactions.map((tx) => explorerTxToBridgeDeposit(tx));
}

async function fetchDeposits(address: string) {
  const response = await getJSON<BlockExplorerApiResponse<BlockExplorerTransaction[]>>(
    publicRuntimeConfig.l1ExplorerApiUrl,
    {
      address,
      action: 'txlist',
      module: 'account',
    },
  );

  return toDeposits(response.result.filter((tx) => tx.isError !== '1' && isETHOrERC20Deposit(tx)));
}

const DEFAULT_DEPOSITS: BridgeTransaction[] = [];

export function useDeposits(address: string): {
  deposits: BridgeTransaction[];
  isFetched: boolean;
} {
  const { data, isFetched } = useQuery<BridgeTransaction[]>(
    ['deposits', address],
    async () => fetchDeposits(address),
    {
      enabled: !!address,
      suspense: false, // Does suspense work w/ SSR? We'll just not use it.
      staleTime: 5000, // Stale after 5 seconds
      notifyOnChangeProps: ['data', 'isFetched'],
      refetchInterval: 1000 * 30, // Automatically refetch every 30 seconds
    },
  );

  const depositsToContractAddess = data;
  return {
    deposits: depositsToContractAddess ?? DEFAULT_DEPOSITS,
    isFetched,
  };
}
