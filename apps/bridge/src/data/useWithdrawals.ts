import { useQuery } from 'react-query';
import { getJSON } from 'apps/bridge/src/http/fetchJSON';
import { BlockExplorerApiResponse, BlockExplorerTransaction } from 'apps/bridge/src/types/API';
import { BridgeTransaction } from 'apps/bridge/src/types/BridgeTransaction';
import { useChainEnv } from 'apps/bridge/src/utils/hooks/useChainEnv';
import { explorerTxToBridgeWithdrawal } from 'apps/bridge/src/utils/transactions/explorerTxToBridgeWithdrawal';
import { isETHOrERC20Withdrawal } from 'apps/bridge/src/utils/transactions/isETHOrERCWithdrawal';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

function toWithdrawals(transactions: BlockExplorerTransaction[]): BridgeTransaction[] {
  return transactions.map((tx) => explorerTxToBridgeWithdrawal(tx));
}

async function fetchWithdrawals(address: string, isMainnet: boolean) {
  const response = await getJSON<BlockExplorerApiResponse<BlockExplorerTransaction[]>>(
    // TODO: filter to transactions to the withdraw contract
    publicRuntimeConfig.l2ExplorerApiURL,
    {
      address,
      action: 'txlist',
      module: 'account',
      filterby: 'from',
      startblock: isMainnet ? '2110000' : '0',
    },
  );

  return toWithdrawals(
    response.result.filter((tx) => tx.isError !== '1' && isETHOrERC20Withdrawal(tx)),
  );
}

const DEFAULT_WITHDRAAWLS: BridgeTransaction[] = [];

export function useWithdrawals(address: string): {
  withdrawals: BridgeTransaction[];
  isFetched: boolean;
} {
  const chainEnv = useChainEnv();
  const isMainnet = chainEnv === 'mainnet';

  const { data, isFetched } = useQuery<BridgeTransaction[]>(
    ['withdrawals', address],
    async () => fetchWithdrawals(address, isMainnet),
    {
      enabled: !!address,
      suspense: false, // Does suspense work w/ SSR? We'll just not use it.
      staleTime: 5000, // Stale after 5 seconds
      notifyOnChangeProps: ['data', 'isFetched'],
      refetchInterval: 1000 * 30, // Automatically refetch every 30 seconds
    },
  );

  const transactionsToWithdrawalAddress = data;

  return {
    withdrawals: transactionsToWithdrawalAddress ?? DEFAULT_WITHDRAAWLS,
    isFetched,
  };
}
