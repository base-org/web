import { BASEFRIENDS_ABI } from 'apps/web/src/utils/friends';
import { BASEFRIENDS_ADDRESSES } from 'apps/web/src/addresses/friends';
import { useErrors } from 'apps/web/contexts/Errors';
import { useAnalytics } from 'apps/web/contexts/Analytics';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { namehash } from 'viem';
import { useAccount, useSwitchChain, useWriteContract } from 'wagmi';
import { useCapabilities, useWriteContracts } from 'wagmi/experimental';
import { useCallback, useMemo } from 'react';
import { ActionType } from 'libs/base-ui/utils/logEvent';

type UseAddFollowsCallbackReturnValue = {
  callback: () => Promise<void>;
  data: `0x${string}` | undefined;
  isPending: boolean;
  error: string | undefined | null;
};

// Names and follows are expected to be of the form `zen.base.eth`
// so that `namehash` returns the correct namehash node.
export function useAddFollowsCallback(name: string): UseAddFollowsCallbackReturnValue {
  const { address, chainId, isConnected } = useAccount();
  const { basenameChain } = useBasenameChain();
  const { logError } = useErrors();
  const { writeContractsAsync } = useWriteContracts();

  const { data: availableCapacities } = useCapabilities({
    account: address,
    query: { enabled: isConnected },
  });

  const { data, writeContractAsync, isPending, error } = useWriteContract();

  const capabilities = useMemo(() => {
    if (!isConnected || !chainId || !availableCapacities) {
      return {};
    }
    return {};
  }, [availableCapacities, chainId, isConnected]);

  const { switchChainAsync } = useSwitchChain();
  const { logEventWithContext } = useAnalytics();

  const addFollows = useCallback(
    async (follows: string[]) => {
      if (!address) return;
      if (chainId !== basenameChain.id) {
        await switchChainAsync({ chainId: basenameChain.id });
        return;
      }

      const nameAsNode = namehash(name);
      const followsAsNodes = follows.map((follow) => namehash(follow));

      logEventWithContext('add_follows_transaction_initiated', ActionType.click);

      try {
        if (!capabilities || Object.keys(capabilities).length === 0) {
          await writeContractAsync({
            address: BASEFRIENDS_ADDRESSES[basenameChain.id],
            abi: BASEFRIENDS_ABI,
            functionName: 'addFollows',
            args: [nameAsNode, followsAsNodes],
            chainId: basenameChain.id,
          });
        } else {
          await writeContractsAsync({
            contracts: [
              {
                address: BASEFRIENDS_ADDRESSES[basenameChain.id],
                abi: BASEFRIENDS_ABI,
                functionName: 'addFollows',
                args: [nameAsNode, followsAsNodes],
              },
            ],
            capabilities: capabilities,
            chainId: basenameChain.id,
          });
        }
      } catch (e) {
        logError(e, 'Add Follow transaction canceled');
        logEventWithContext('add_follows_transaction_canceled', ActionType.change);
      }
    },
    [
      address,
      chainId,
      basenameChain.id,
      name,
      logEventWithContext,
      switchChainAsync,
      capabilities,
      writeContractAsync,
      writeContractsAsync,
      logError,
    ],
  );

  return {
    callback: addFollows,
    data,
    isPending: isPending,
    // @ts-expect-error error will be string renderable
    error: error,
  };
}
