import { useQuery } from 'react-query';
import { getJSON } from 'apps/bridge/src/http/fetchJSON';
import { BlockExplorerApiResponse, BlockExplorerTransaction } from 'apps/bridge/src/types/API';
import { BridgeTransaction } from 'apps/bridge/src/types/BridgeTransaction';
import { explorerTxToBridgeDeposit } from 'apps/bridge/src/utils/transactions/explorerTxToBridgeDeposit';
import { isETHOrERC20Deposit } from 'apps/bridge/src/utils/transactions/isETHOrERC20Deposit';
import getConfig from 'next/config';
import { DepositItem } from '@eth-optimism/indexer-api';
import { indexerTxToBridgeDeposit } from 'apps/bridge/src/utils/transactions/indexerTxToBridgeDeposit';

const { publicRuntimeConfig } = getConfig();

function indexerTxToBridgeDeposits(transactions: DepositItem[]): BridgeTransaction[] {
  return transactions.map((tx) => indexerTxToBridgeDeposit(tx));
}

function explorerTxToBridgeDeposits(transactions: BlockExplorerTransaction[]): BridgeTransaction[] {
  return transactions.map((tx) => explorerTxToBridgeDeposit(tx));
}

async function fetchOPDeposits(address: string) {
  const response = await fetch(publicRuntimeConfig.bridgeApiURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'indexer_getAllDepositsByAddress',
      params: [address, parseInt(publicRuntimeConfig.l1ChainID)],
      id: 0,
    }),
  });

  const { result: deposits } = (await response.json()) as { result: DepositItem[] };

  return indexerTxToBridgeDeposits(deposits);
}

async function fetchCCTPDeposits(address: string) {
  const response = await getJSON<BlockExplorerApiResponse<BlockExplorerTransaction[]>>(
    publicRuntimeConfig.l1ExplorerApiUrl,
    {
      address,
      action: 'txlist',
      module: 'account',
    },
  );

  return explorerTxToBridgeDeposits(
    response.result.filter((tx) => tx.isError !== '1' && isETHOrERC20Deposit(tx)),
  );
}

export function useDeposits(address: string): {
  deposits: BridgeTransaction[];
  isFetched: boolean;
} {
  const { data: opDeposits, isFetched: isOPDepositsFetched } = useQuery<BridgeTransaction[]>(
    ['opDeposits', address],
    async () => fetchOPDeposits(address),
    {
      enabled: !!address,
      suspense: false, // Does suspense work w/ SSR? We'll just not use it.
      staleTime: 5000, // Stale after 5 seconds
      notifyOnChangeProps: ['data', 'isFetched'],
      refetchInterval: 1000 * 30, // Automatically refetch every 30 seconds
    },
  );

  const { data: cctpDeposits, isFetched: isCCTPDepositsFetched } = useQuery<BridgeTransaction[]>(
    ['cctpDeposits', address],
    async () => fetchCCTPDeposits(address),
    {
      enabled: !!address,
      suspense: false, // Does suspense work w/ SSR? We'll just not use it.
      staleTime: 5000, // Stale after 5 seconds
      notifyOnChangeProps: ['data', 'isFetched'],
      refetchInterval: 1000 * 30, // Automatically refetch every 30 seconds
    },
  );
  return {
    deposits: [...(opDeposits ?? []), ...(cctpDeposits ?? [])],
    isFetched: isOPDepositsFetched && isCCTPDepositsFetched,
  };
}
