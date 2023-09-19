import { memo, useCallback } from 'react';
import { BridgeButton } from 'apps/bridge/src/components/BridgeButton/BridgeButton';
import { useDisconnect } from 'wagmi';

export const DisconnectWalletButton = memo(function DisconnectWalletButton() {
  const { disconnect } = useDisconnect();

  const disconnectFn = useCallback(() => disconnect(), [disconnect]);

  return (
    <BridgeButton
      className="inline-block flex w-full items-center justify-center rounded border border-[#8A919E] bg-transparent p-4 px-7 font-sans text-base font-bold uppercase text-white disabled:bg-stone-400"
      onClick={disconnectFn}
      variant="secondary"
    >
      Disconnect wallet
    </BridgeButton>
  );
});
