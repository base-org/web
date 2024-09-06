import { BASEFRIENDS_ABI } from 'apps/web/src/utils/friends';
import { BASEFRIENDS_ADDRESSES } from 'apps/web/src/addresses/friends';
import { useErrors } from 'apps/web/contexts/Errors';
import { useAnalytics } from 'apps/web/contexts/Analytics';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import { namehash } from 'viem';
import { useAccount, useSwitchChain, useWriteContract } from 'wagmi';
import { useCallback, useMemo } from 'react';
import { ActionType } from 'libs/base-ui/utils/logEvent';

type UseAddFollowsCallbackReturnValue = {
  callback: (follows: string[]) => Promise<void>;
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

  const { data, writeContractAsync, isPending, error } = useWriteContract();

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
        await writeContractAsync({
          address: BASEFRIENDS_ADDRESSES[basenameChain.id],
          abi: BASEFRIENDS_ABI,
          functionName: 'addFollows',
          args: [nameAsNode, followsAsNodes],
          chainId: basenameChain.id,
        });
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
      writeContractAsync,
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
