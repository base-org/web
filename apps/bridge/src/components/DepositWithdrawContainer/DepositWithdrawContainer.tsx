import { memo } from 'react';
import { BridgeContainer } from 'apps/bridge/src/components/BridgeContainer/BridgeContainer';

type Props = {
  children: React.ReactElement;
};

export const DepositWithdrawContainer = memo(function DepositWithdrawContainer({
  children,
}: Props) {
  return <BridgeContainer>{children}</BridgeContainer>;
});
