import { memo } from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { BridgeButton } from 'apps/bridge/src/components/BridgeButton/BridgeButton';

type ConnectWalletButtonProps = {
  className?: string;
};

export const ConnectWalletButton = memo(function ConnectWalletButton({
  className,
}: ConnectWalletButtonProps) {
  const { openConnectModal } = useConnectModal();
  return (
    <BridgeButton className={className} onClick={openConnectModal}>
      Connect wallet
    </BridgeButton>
  );
});
