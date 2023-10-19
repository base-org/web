import { CCTPBridgePhase } from 'apps/bridge/src/utils/transactions/phase';
import moment from 'moment';

const withdrawalPhaseText = {
  PROPOSING_ON_CHAIN: 'Proposing onchain',
  PROVE: 'Ready to verify',
  PROVE_TX_PENDING: 'Ready to verify',
  PROVE_TX_FAILURE: 'Ready to verify',
  CHALLENGE_WINDOW: 'Verifying',
  FINALIZE: 'Ready to complete',
  FINALIZE_TX_PENDING: 'Processing',
  FINALIZE_TX_FAILURE: 'Processing',
  FUNDS_WITHDRAWN: 'Funds moved',
};

const depositPhaseText = {
  DEPOSIT_TX_PENDING: 'Funds deposited',
  DEPOSIT_TX_FAILURE: 'Funds deposited',
  FUNDS_DEPOSITED: 'Funds deposited',
};

const cctpBridgePhaseText: Record<CCTPBridgePhase, string> = {
  INITIATE_CCTP_BRIDGE_PENDING: 'Processing',
  INITIATE_CCTP_BRIDGE_FAILED: 'Failed',
  FINALIZE_CCTP_BRIDGE: 'Ready to complete',
  FINALIZE_CCTP_BRIDGE_PENDING: 'Processing',
  FINALIZE_CCTP_BRIDGE_FAILED: 'Failed',
  CCTP_BRIDGE_COMPLETE: 'Funds moved',
};

const withdrawalPhaseStatusText = {
  PROPOSING_ON_CHAIN: 'Wait up to 1 hr',
  PROVE: '',
  PROVE_TX_PENDING: '',
  PROVE_TX_FAILURE: 'Failed',
  CHALLENGE_WINDOW: (challengeWindowEndTime?: number) =>
    challengeWindowEndTime &&
    `Wait ${moment.duration(moment.unix(challengeWindowEndTime).diff(moment())).humanize()}`,
  FINALIZE: '',
  FINALIZE_TX_PENDING: '',
  FINALIZE_TX_FAILURE: 'Failed',
  FUNDS_WITHDRAWN: 'Complete',
};

const depositPhaseStatusText = {
  DEPOSIT_TX_PENDING: '',
  DEPOSIT_TX_FAILURE: 'Failed',
  FUNDS_DEPOSITED: 'Complete',
};

export {
  depositPhaseStatusText,
  depositPhaseText,
  withdrawalPhaseStatusText,
  withdrawalPhaseText,
  cctpBridgePhaseText,
};
