import { BridgeProtocol } from 'apps/bridge/src/types/Asset';
import { CCTPBridgePhase, WithdrawalPhase } from 'apps/bridge/src/utils/transactions/phase';
import { memo } from 'react';

const PHASE_MAP: Record<WithdrawalPhase | CCTPBridgePhase, number> = {
  PROPOSING_ON_CHAIN: 1,
  PROVE: 2,
  PROVE_TX_PENDING: 2,
  PROVE_TX_FAILURE: 2,
  CHALLENGE_WINDOW: 2,
  FINALIZE: 3,
  FINALIZE_TX_PENDING: 3,
  FINALIZE_TX_FAILURE: 3,
  FUNDS_WITHDRAWN: 4,
  INITIATE_CCTP_BRIDGE_PENDING: 1,
  INITIATE_CCTP_BRIDGE_FAILED: 1,
  FINALIZE_CCTP_BRIDGE: 2,
  FINALIZE_CCTP_BRIDGE_PENDING: 2,
  FINALIZE_CCTP_BRIDGE_FAILED: 2,
  CCTP_BRIDGE_COMPLETE: 3,
};

function generatePhaseIndicator(
  phase: WithdrawalPhase | CCTPBridgePhase,
  protocol?: BridgeProtocol,
): JSX.Element[] {
  const rv: JSX.Element[] = [];
  const totalPhases = protocol === 'CCTP' ? 3 : 4;
  const indicatorWidth = protocol === 'CCTP' ? `w-[calc(8rem/3)]` : `w-[calc(8rem/4)]`;

  for (let i = 0; i < PHASE_MAP[phase]; i += 1) {
    rv.push(<div className={`border-gray-400 border-t-4 ${indicatorWidth}`} key={`fill-${i}`} />);
  }

  for (let i = 0; i < totalPhases - PHASE_MAP[phase]; i += 1) {
    rv.push(
      <div
        className={`border-gray-400 border-t-4 text-cds-background-gray-60 ${indicatorWidth}`}
        key={`back-${i}`}
      />,
    );
  }
  return rv;
}

type BridgePhaseIndicatorProps = {
  phase: WithdrawalPhase | CCTPBridgePhase;
  protocol?: BridgeProtocol;
};

// Component to generate the phase indicator for any multi-step bridge transaction.
// This currently includes OP bridge withdrawals and CCTP bridge transactions in either direction.
export const BridgePhaseIndicator = memo(function BridgePhaseIndicator({
  phase,
  protocol,
}: BridgePhaseIndicatorProps) {
  return (
    <div className="flex h-6 grow flex-row items-center gap-1">
      {generatePhaseIndicator(phase, protocol)}
    </div>
  );
});
