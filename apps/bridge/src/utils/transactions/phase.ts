type WithdrawalPhase =
  | 'PROPOSING_ON_CHAIN'
  | 'PROVE'
  | 'PROVE_TX_PENDING'
  | 'PROVE_TX_FAILURE'
  | 'CHALLENGE_WINDOW'
  | 'FINALIZE'
  | 'FINALIZE_TX_PENDING'
  | 'FINALIZE_TX_FAILURE'
  | 'FUNDS_WITHDRAWN';

type DepositPhase = 'DEPOSIT_TX_PENDING' | 'FUNDS_DEPOSITED' | 'DEPOSIT_TX_FAILURE';
export type { DepositPhase, WithdrawalPhase };
