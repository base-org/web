import type { DepositPhase, WithdrawalPhase } from 'apps/bridge/src/utils/transactions/phase';
import Image from 'next/image';

const networkSvgPaths: Record<'deposit' | 'withdraw', string> = {
  deposit: '/icons/eth.svg',
  withdraw: '/icons/base.svg',
};

const phaseSvgPaths: Record<WithdrawalPhase | DepositPhase, string> = {
  PROPOSING_ON_CHAIN: '/icons/phases/wait.svg',
  PROVE: '/icons/phases/user_action.svg',
  PROVE_TX_PENDING: '/icons/phases/user_action.svg',
  PROVE_TX_FAILURE: '/icons/phases/user_action.svg',
  CHALLENGE_WINDOW: '/icons/phases/wait.svg',
  FINALIZE: '/icons/phases/user_action.svg',
  FINALIZE_TX_PENDING: '/icons/phases/user_action.svg',
  FINALIZE_TX_FAILURE: '/icons/phases/user_action.svg',
  FUNDS_WITHDRAWN: '/icons/phases/receive.svg',
  DEPOSIT_TX_PENDING: '/icons/phases/send.svg',
  DEPOSIT_TX_FAILURE: '/icons/phases/send.svg',
  FUNDS_DEPOSITED: '/icons/phases/send.svg',
};

type Props = {
  phase: DepositPhase | WithdrawalPhase;
  bridgeDirection: 'deposit' | 'withdraw';
  size?: number;
};

export function TransactionIcon({ phase, bridgeDirection, size = 32 }: Props) {
  const phaseIcon = (
    <Image src={phaseSvgPaths[phase]} width={size} height={size} alt={phase.toLowerCase()} />
  );

  return (
    <div className="relative justify-center pt-1 pr-2">
      {phaseIcon}
      <Image
        className="absolute -right-[2px] -bottom-[4px] rounded-[14px] border-2 border-black"
        src={networkSvgPaths[bridgeDirection]}
        width={20}
        height={20}
        alt={bridgeDirection}
      />
    </div>
  );
}
