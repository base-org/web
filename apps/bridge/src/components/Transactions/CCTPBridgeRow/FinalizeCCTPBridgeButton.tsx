import { memo, useCallback } from 'react';
import { usePrepareFinalizeCCTPBridge } from 'apps/bridge/src/utils/hooks/usePrepareFinalizeCCTPBridge';
import { useIsPermittedToBridge } from 'apps/bridge/src/utils/hooks/useIsPermittedToBridge';
import { useContractWrite, useNetwork, usePublicClient, useSwitchNetwork } from 'wagmi';
import getConfig from 'next/config';
import { CCTPBridgePhase } from 'apps/bridge/src/utils/transactions/phase';

const { publicRuntimeConfig } = getConfig();
const l1ChainID = parseInt(publicRuntimeConfig.l1ChainID);
const l2ChainID = parseInt(publicRuntimeConfig.l2ChainID);

type FinalizeCCTPBridgeButtonProps = {
  message?: `0x${string}`;
  attestation?: `0x${string}`;
  bridgeDirection: 'deposit' | 'withdraw';
  setStatus: (status: CCTPBridgePhase) => void;
};

export const FinalizeCCTPBridgeButton = memo(function FinalizeCCTPBridgeButton({
  message,
  attestation,
  bridgeDirection,
  setStatus,
}: FinalizeCCTPBridgeButtonProps) {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const isPermittedToBridge = useIsPermittedToBridge();
  const publicClient = usePublicClient({
    chainId: bridgeDirection === 'deposit' ? l2ChainID : l1ChainID,
  });

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
          setStatus('FINALIZE_CCTP_BRIDGE_PENDING');
          if (finalizeResult?.hash) {
            const finalizeTxReceipt = await publicClient.waitForTransactionReceipt({
              hash: finalizeResult.hash,
            });
            setStatus(
              finalizeTxReceipt?.status === 'success'
                ? 'CCTP_BRIDGE_COMPLETE'
                : 'FINALIZE_CCTP_BRIDGE_FAILED',
            );
          }
        } else {
          // TODO: close modal
        }
      } catch {
        setStatus('FINALIZE_CCTP_BRIDGE_FAILED');
        // TODO: close modal
      }
    })();
  }, [finalizeCCTPBridge, isPermittedToBridge, publicClient, setStatus]);

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
