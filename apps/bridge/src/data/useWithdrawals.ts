import { useQuery } from 'react-query';
import { getJSON } from 'apps/bridge/src/http/fetchJSON';
import { BlockExplorerApiResponse, BlockExplorerTransaction } from 'apps/bridge/src/types/API';
import { BridgeTransaction } from 'apps/bridge/src/types/BridgeTransaction';
import { useChainEnv } from 'apps/bridge/src/utils/hooks/useChainEnv';
import { explorerTxToBridgeWithdrawal } from 'apps/bridge/src/utils/transactions/explorerTxToBridgeWithdrawal';
import {
  isExplorerTxETHOrERC20Withdrawal,
  isIndexerTxETHOrERC20Withdrawal,
} from 'apps/bridge/src/utils/transactions/isETHOrERCWithdrawal';
import getConfig from 'next/config';
import { WithdrawalItem } from '@eth-optimism/indexer-api';
import { indexerTxToBridgeWithdrawal } from 'apps/bridge/src/utils/transactions/indexerTxToBridgeWithdrawal';

const { publicRuntimeConfig } = getConfig();

function indexerTxToBridgeWithdrawals(transactions: WithdrawalItem[]): BridgeTransaction[] {
  return transactions.map((tx) => indexerTxToBridgeWithdrawal(tx));
}

function explorerTxToBridgeWithdrawals(
  transactions: BlockExplorerTransaction[],
): BridgeTransaction[] {
  return transactions.map((tx) => explorerTxToBridgeWithdrawal(tx));
}

async function fetchOPWithdrawals(address: string) {
  const response = await fetch(publicRuntimeConfig.bridgeApiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'indexer_getAllWithdrawalsByAddress',
      params: [address, parseInt(publicRuntimeConfig.l2ChainID)],
      id: 0,
    }),
  });

  const { result: withdrawals } = (await response.json()) as { result: WithdrawalItem[] };

  return indexerTxToBridgeWithdrawals(
    withdrawals.filter((withdrawal) => isIndexerTxETHOrERC20Withdrawal(withdrawal)),
  );
}

async function fetchCCTPWithdrawals(address: string, isMainnet: boolean) {
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

  return explorerTxToBridgeWithdrawals(
    response.result.filter((tx) => tx.isError !== '1' && isExplorerTxETHOrERC20Withdrawal(tx)),
  );
}

export function useWithdrawals(address: string): {
  withdrawals: BridgeTransaction[];
  isFetched: boolean;
} {
  const chainEnv = useChainEnv();
  const isMainnet = chainEnv === 'mainnet';

  const { data: opWithdrawals, isFetched: isOPWithdrawalsFetched } = useQuery<BridgeTransaction[]>(
    ['opWithdrawals', address],
    async () => fetchOPWithdrawals(address),
    {
      enabled: !!address,
      suspense: false, // Does suspense work w/ SSR? We'll just not use it.
      staleTime: 5000, // Stale after 5 seconds
      notifyOnChangeProps: ['data', 'isFetched'],
      refetchInterval: 1000 * 30, // Automatically refetch every 30 seconds
    },
  );

  const { data: cctpWithdrawals, isFetched: isCCTPWithdrawalsFetched } = useQuery<
    BridgeTransaction[]
  >(['cctpWithdrawals', address], async () => fetchCCTPWithdrawals(address, isMainnet), {
    enabled: !!address,
    suspense: false, // Does suspense work w/ SSR? We'll just not use it.
    staleTime: 5000, // Stale after 5 seconds
    notifyOnChangeProps: ['data', 'isFetched'],
    refetchInterval: 1000 * 30, // Automatically refetch every 30 seconds
  });

  return {
    withdrawals: [...(opWithdrawals ?? []), ...(cctpWithdrawals ?? [])],
    isFetched: isOPWithdrawalsFetched && isCCTPWithdrawalsFetched,
  };
}
