import { memo } from 'react';
import { PendingButton } from 'apps/bridge/src/components/Transactions/PendingButton';
import { CCTPBridgePhase } from 'apps/bridge/src/utils/transactions/phase';
import { FinalizeCCTPBridgeButton } from 'apps/bridge/src/components/Transactions/CCTPBridgeRow/FinalizeCCTPBridgeButton';

type CCTPBridgeStatusProps = {
  phase: CCTPBridgePhase;
  message?: `0x${string}`;
  attestation?: `0x${string}`;
  bridgeDirection: 'deposit' | 'withdraw';
  setStatus: (status: CCTPBridgePhase) => void;
};

export const CCTPBridgeStatus = memo(function CCTPBridgeStatus({
  phase,
  message,
  attestation,
  bridgeDirection,
  setStatus,
}: CCTPBridgeStatusProps) {
  const isPending =
    phase === 'INITIATE_CCTP_BRIDGE_PENDING' || phase === 'FINALIZE_CCTP_BRIDGE_PENDING';
  // If the finalize tx failed we can just try again
  const isReadyToFinazlie =
    phase === 'FINALIZE_CCTP_BRIDGE' || phase === 'FINALIZE_CCTP_BRIDGE_FAILED';
  const isFailed = phase === 'INITIATE_CCTP_BRIDGE_FAILED';

  // Return pending button if initiate or finalize tx is pending
  if (isPending) return <PendingButton />;

  // Return 'Ready to finalize' if finalize tx is ready to be sent
  if (isReadyToFinazlie)
    return (
      <FinalizeCCTPBridgeButton
        message={message}
        attestation={attestation}
        bridgeDirection={bridgeDirection}
        setStatus={setStatus}
      />
    );

  // Return 'Failed' if initiate tx failed
  if (isFailed) return 'Failed';

  // Otherwise the bridge is complete
  return 'Funds moved';
});
