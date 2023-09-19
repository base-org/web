import { memo } from 'react';
import { DepositStatus } from 'apps/bridge/src/types/API';

type StatusDotProps = {
  status?: DepositStatus;
};

export const StatusDot = memo(function StatusDot({ status }: StatusDotProps) {
  return (
    <div
      className={`statusDot mr-2 ${
        status === 'Complete' ? 'bg-cds-background-green-60' : 'bg-cds-background-red-60'
      }`}
    />
  );
});
