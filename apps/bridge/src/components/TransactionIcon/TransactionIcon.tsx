import { BridgeProtocol } from 'apps/bridge/src/types/Asset';
import type {
  CCTPBridgePhase,
  DepositPhase,
  WithdrawalPhase,
} from 'apps/bridge/src/utils/transactions/phase';
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

const ccptPhasePaths: Record<CCTPBridgePhase, Record<'deposit' | 'withdraw', string>> = {
  INITIATE_CCTP_BRIDGE_PENDING: {
    deposit: '/icons/phases/send.svg',
    withdraw: '/icons/phases/receive.svg',
  },
  INITIATE_CCTP_BRIDGE_FAILED: {
    deposit: '/icons/phases/user_action.svg',
    withdraw: '/icons/phases/user_action.svg',
  },
  FINALIZE_CCTP_BRIDGE: {
    deposit: '/icons/phases/user_action.svg',
    withdraw: '/icons/phases/user_action.svg',
  },
  FINALIZE_CCTP_BRIDGE_PENDING: {
    deposit: '/icons/phases/wait.svg',
    withdraw: '/icons/phases/wait.svg',
  },
  FINALIZE_CCTP_BRIDGE_FAILED: {
    deposit: '/icons/phases/user_action.svg',
    withdraw: '/icons/phases/user_action.svg',
  },
  CCTP_BRIDGE_COMPLETE: {
    deposit: '/icons/phases/send.svg',
    withdraw: '/icons/phases/receive.svg',
  },
};

type Props = {
  phase: DepositPhase | WithdrawalPhase | CCTPBridgePhase;
  protocol?: BridgeProtocol;
  bridgeDirection: 'deposit' | 'withdraw';
  size?: number;
};

export function TransactionIcon({ phase, protocol, bridgeDirection, size = 32 }: Props) {
  const icon =
    protocol === 'CCTP'
      ? ccptPhasePaths[phase as CCTPBridgePhase][bridgeDirection]
      : phaseSvgPaths[phase as DepositPhase | WithdrawalPhase];

  const phaseIcon = <Image src={icon} width={size} height={size} alt={phase.toLowerCase()} />;

  return (
    <div className="relative justify-center pr-2 pt-1">
      {phaseIcon}
      <Image
        className="absolute -bottom-[4px] -right-[2px] rounded-[14px] border-2 border-black"
        src={networkSvgPaths[bridgeDirection]}
        width={20}
        height={20}
        alt={bridgeDirection}
      />
    </div>
  );
}
