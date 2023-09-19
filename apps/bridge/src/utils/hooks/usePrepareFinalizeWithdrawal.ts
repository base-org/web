import { useEffect, useState } from 'react';
import OptimismPortal from 'apps/bridge/src/contract-abis/OptimismPortal';
import { WithdrawalMessage } from 'apps/bridge/src/types/WithdrawalMessage';
import { getWithdrawalMessage } from 'apps/bridge/src/utils/transactions/getWithdrawalMessage';
import getConfig from 'next/config';
import { usePrepareContractWrite, useWaitForTransaction } from 'wagmi';

const { publicRuntimeConfig } = getConfig();

export function usePrepareFinalizeWithdrawal(
  withdrawalTx: `0x${string}`,
  isERC20Withdrawal = false,
) {
  const [withdrawalForTx, setWithdrawalForTx] = useState<WithdrawalMessage | null>(null);
  const { data: withdrawalReceipt } = useWaitForTransaction({
    hash: withdrawalTx,
    chainId: parseInt(publicRuntimeConfig.l2ChainID),
  });

  const { config } = usePrepareContractWrite({
    address: withdrawalForTx ? publicRuntimeConfig.l1OptimismPortalProxyAddress : undefined,
    abi: OptimismPortal,
    functionName: 'finalizeWithdrawalTransaction',
    chainId: parseInt(publicRuntimeConfig.l1ChainID),
    args: withdrawalForTx
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
  });

  useEffect(() => {
    if (withdrawalReceipt) {
      const withdrawalMessage = getWithdrawalMessage(withdrawalReceipt, isERC20Withdrawal);
      setWithdrawalForTx(withdrawalMessage);
    }
  }, [isERC20Withdrawal, withdrawalReceipt]);

  return config;
}
