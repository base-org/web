import { memo, useCallback } from 'react';
import { usePrepareFinalizeCCTPBridge } from 'apps/bridge/src/utils/hooks/usePrepareFinalizeCCTPBridge';
import { useIsPermittedToBridge } from 'apps/bridge/src/utils/hooks/useIsPermittedToBridge';
import { useContractWrite, useNetwork, useSwitchNetwork } from 'wagmi';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const l1ChainID = parseInt(publicRuntimeConfig.l1ChainID);
const l2ChainID = parseInt(publicRuntimeConfig.l2ChainID);

type FinalizeCCTPBridgeButtonProps = {
  message?: `0x${string}`;
  attestation?: `0x${string}`;
  bridgeDirection: 'deposit' | 'withdraw';
};

export const FinalizeCCTPBridgeButton = memo(function FinalizeCCTPBridgeButton({
  message,
  attestation,
  bridgeDirection,
}: FinalizeCCTPBridgeButtonProps) {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const isPermittedToBridge = useIsPermittedToBridge();

  const finalizeCCTPBridgeConfig = usePrepareFinalizeCCTPBridge({
    isPermittedToBridge,
    message,
    attestation,
    bridgeDirection,
  });
  const { writeAsync: finalizeCCTPBridge } = useContractWrite(finalizeCCTPBridgeConfig);

  const handleSwitchToCorrectNetwork = useCallback(() => {
    switchNetwork?.(bridgeDirection === 'deposit' ? l2ChainID : l1ChainID);
  }, [bridgeDirection, switchNetwork]);

  const handleFinalizeCCTPBridge = useCallback(() => {
    // TODO: reset finalize tx hash and open modal
    void (async () => {
      try {
        if (isPermittedToBridge) {
          const finalizeResult = await finalizeCCTPBridge?.();
          if (finalizeResult?.hash) {
            // const finalizeTxHash = finalizeResult.hash;
            // TODO: set finalize tx hash
          }
        } else {
          // TODO: close modal
        }
      } catch {
        // TODO: close modal
      }
    })();
  }, [finalizeCCTPBridge, isPermittedToBridge]);

  const isOnCorrectNetwork =
    (bridgeDirection === 'deposit' && chain?.id === l2ChainID) ||
    (bridgeDirection === 'withdraw' && chain?.id === l1ChainID);

  return (
    <button
      type="button"
      onClick={isOnCorrectNetwork ? handleFinalizeCCTPBridge : handleSwitchToCorrectNetwork}
      className="w-32 bg-white py-2 font-sans text-sm text-black"
    >
      {isOnCorrectNetwork ? 'Complete' : `Switch to ${bridgeDirection === 'deposit' ? 'L2' : 'L1'}`}
    </button>
  );
});
