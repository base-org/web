import { useEffect, useState } from 'react';
import OptimismPortal from 'apps/bridge/src/contract-abis/OptimismPortal';
import { WithdrawalMessage } from 'apps/bridge/src/types/WithdrawalMessage';
import { getWithdrawalMessage } from 'apps/bridge/src/utils/transactions/getWithdrawalMessage';
import getConfig from 'next/config';
import { usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import { useChainEnv } from 'apps/bridge/src/utils/hooks/useChainEnv';
import { useTOSStatus } from 'apps/bridge/src/contexts/TOSContext';

const { publicRuntimeConfig } = getConfig();

export function usePrepareFinalizeWithdrawal(withdrawalTx: `0x${string}`) {
  const [withdrawalForTx, setWithdrawalForTx] = useState<WithdrawalMessage | null>(null);
  const { isTosAccepted } = useTOSStatus();

  const chainEnv = useChainEnv();
  const isMainnet = chainEnv === 'mainnet';
  const includeTosVersionByte = isMainnet;

  const { data: withdrawalReceipt } = useWaitForTransaction({
    hash: withdrawalTx,
    chainId: parseInt(publicRuntimeConfig.l2ChainID),
  });

  const shouldPrepare = withdrawalForTx && (isTosAccepted || !isMainnet);

  const { config } = usePrepareContractWrite({
    address: shouldPrepare ? publicRuntimeConfig.l1OptimismPortalProxyAddress : undefined,
    abi: OptimismPortal,
    functionName: 'finalizeWithdrawalTransaction',
    chainId: parseInt(publicRuntimeConfig.l1ChainID),
    args: shouldPrepare
      ? [
          {
            nonce: withdrawalForTx.nonce,
            sender: withdrawalForTx.sender,
            target: withdrawalForTx.target,
            value: withdrawalForTx.value,
            gasLimit: withdrawalForTx.gasLimit,
            data: withdrawalForTx.data,
          },
        ]
      : undefined,
    dataSuffix: includeTosVersionByte ? publicRuntimeConfig.tosVersion : undefined,
  });

  useEffect(() => {
    if (withdrawalReceipt) {
      const withdrawalMessage = getWithdrawalMessage(withdrawalReceipt);
      setWithdrawalForTx(withdrawalMessage);
    }
  }, [withdrawalReceipt]);

  return config;
}
