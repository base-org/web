import { useEffect, useMemo, useState } from 'react';
import { hashWithdrawal } from '@eth-optimism/core-utils';
import { useHasWithdrawalBeenFinalized } from 'apps/bridge/src/utils/hooks/useHasWithdrawalBeenFinalized';
import { useHasWithdrawalBeenProven } from 'apps/bridge/src/utils/hooks/useHasWithdrawalBeenProven';
import { useIsFinalizationPeriodElapsed } from 'apps/bridge/src/utils/hooks/useIsFinalizationPeriodElapsed';
import { useL2OutputProposal } from 'apps/bridge/src/utils/hooks/useL2OutputProposal';
import { useProvenWithdrawl } from 'apps/bridge/src/utils/hooks/useProvenWithdrawl';
import { getWithdrawalMessage } from 'apps/bridge/src/utils/transactions/getWithdrawalMessage';
import type { WithdrawalPhase } from 'apps/bridge/src/utils/transactions/phase';
import { BigNumber } from 'ethers';
import getConfig from 'next/config';
import { useWaitForTransaction } from 'wagmi';

const { publicRuntimeConfig } = getConfig();

type UseWithdrawalStateProps = {
  initializeTxHash: `0x${string}`;
  latestL2BlockNumber?: BigNumber;
  isERC20Withdrawal: boolean;
  proveTxHash?: `0x${string}`;
  finalizeTxHash?: `0x${string}`;
};
export function useWithdrawalStatus({
  initializeTxHash,
  latestL2BlockNumber,
  isERC20Withdrawal,
  proveTxHash,
  finalizeTxHash,
}: UseWithdrawalStateProps): { status: WithdrawalPhase; challengeWindowEndTime?: number } {
  const [withdrawalHash, setWithdrawalHash] = useState<string | null>(null);

  const { data: withdrawalReceipt } = useWaitForTransaction({
    hash: initializeTxHash,
    chainId: parseInt(publicRuntimeConfig.l2ChainID),
  });
  const withdrawalHasBeenProven = useHasWithdrawalBeenProven(withdrawalHash);
  const withdrawalHasBeenFinalized = useHasWithdrawalBeenFinalized(withdrawalHash);
  const provenWithdrawal = useProvenWithdrawl(withdrawalHash);
  const { hasElapsed: finalizationPeriodHasElapsedForProvenWithdrawal, challengeWindowEndTime } =
    useIsFinalizationPeriodElapsed(provenWithdrawal?.timestamp?.toNumber());
  const l2OutputProposal = useL2OutputProposal(provenWithdrawal?.l2OutputIndex);
  const finalizationPeriodHasElapsedForL2OutputProposal = useIsFinalizationPeriodElapsed(
    l2OutputProposal?.timestamp?.toNumber(),
  );
  const { isLoading: isProofSubmissionLoading, isError: isProofSubmissionError } =
    useWaitForTransaction({
      hash: proveTxHash,
    });
  const { isLoading: isFinalizationLoading, isError: isFinalizationError } = useWaitForTransaction({
    hash: finalizeTxHash,
  });

  const isWithdrawalReadyToProve = useMemo(
    () =>
      latestL2BlockNumber && withdrawalReceipt?.blockNumber
        ? latestL2BlockNumber.toNumber() >= withdrawalReceipt?.blockNumber
        : false,
    [latestL2BlockNumber, withdrawalReceipt],
  );

  useEffect(() => {
    if (withdrawalReceipt) {
      const withdrawalMessage = getWithdrawalMessage(withdrawalReceipt, isERC20Withdrawal);
      const hashedWithdrawal = hashWithdrawal(
        withdrawalMessage.nonce,
        withdrawalMessage.sender,
        withdrawalMessage.target,
        withdrawalMessage.value,
        withdrawalMessage.gasLimit,
        withdrawalMessage.data,
      );
      setWithdrawalHash(hashedWithdrawal);
    }
  }, [isERC20Withdrawal, withdrawalReceipt]);

  // suppress eslint consistent-return error
  let status: WithdrawalPhase = 'PROPOSING_ON_CHAIN';

  if (proveTxHash && isProofSubmissionLoading) status = 'PROVE_TX_PENDING';
  if (finalizeTxHash && isFinalizationLoading) status = 'FINALIZE_TX_PENDING';

  if (!isWithdrawalReadyToProve) status = 'PROPOSING_ON_CHAIN';
  if (!withdrawalHasBeenProven && isWithdrawalReadyToProve) status = 'PROVE';
  if (!withdrawalHasBeenFinalized && withdrawalHasBeenProven) {
    status =
      finalizationPeriodHasElapsedForProvenWithdrawal &&
      finalizationPeriodHasElapsedForL2OutputProposal
        ? 'FINALIZE'
        : 'CHALLENGE_WINDOW';
  }

  if (withdrawalHasBeenFinalized) status = 'FUNDS_WITHDRAWN';
  if (finalizeTxHash && isFinalizationError) status = 'FINALIZE_TX_FAILURE';
  if (proveTxHash && isProofSubmissionError) status = 'PROVE_TX_FAILURE';

  if (status === 'CHALLENGE_WINDOW') {
    return {
      status,
      challengeWindowEndTime,
    };
  }
  return {
    status,
  };
}
