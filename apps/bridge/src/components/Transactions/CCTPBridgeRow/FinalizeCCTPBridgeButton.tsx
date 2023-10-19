import { Dispatch, SetStateAction, memo, useCallback } from 'react';
import { usePrepareFinalizeCCTPBridge } from 'apps/bridge/src/utils/hooks/usePrepareFinalizeCCTPBridge';
import { useIsPermittedToBridge } from 'apps/bridge/src/utils/hooks/useIsPermittedToBridge';
import { useContractWrite, useNetwork, usePublicClient, useSwitchNetwork } from 'wagmi';
import getConfig from 'next/config';
import { CCTPBridgePhase } from 'apps/bridge/src/utils/transactions/phase';
import { useChainEnv } from 'apps/bridge/src/utils/hooks/useChainEnv';

const { publicRuntimeConfig } = getConfig();
const l1ChainID = parseInt(publicRuntimeConfig.l1ChainID);
const l2ChainID = parseInt(publicRuntimeConfig.l2ChainID);

type FinalizeCCTPBridgeButtonProps = {
  message?: `0x${string}`;
  attestation?: `0x${string}`;
  bridgeDirection: 'deposit' | 'withdraw';
  setStatus: (status: CCTPBridgePhase) => void;
  onOpenFinalizeCCTPBridgeModal: () => void;
  onCloseFinalizeCCTPBridgeModal: () => void;
  setModalFinalizeCCTPTxHash: Dispatch<SetStateAction<`0x${string}` | undefined>>;
};

export const FinalizeCCTPBridgeButton = memo(function FinalizeCCTPBridgeButton({
  message,
  attestation,
  bridgeDirection,
  setStatus,
  onOpenFinalizeCCTPBridgeModal,
  onCloseFinalizeCCTPBridgeModal,
  setModalFinalizeCCTPTxHash,
}: FinalizeCCTPBridgeButtonProps) {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const isPermittedToBridge = useIsPermittedToBridge();
  const publicClient = usePublicClient({
    chainId: bridgeDirection === 'deposit' ? l2ChainID : l1ChainID,
  });
  const chainEnv = useChainEnv();
  const isMainnet = chainEnv === 'mainnet';
  const includeTosVersionByte = isMainnet;

  const finalizeCCTPBridgeConfig = usePrepareFinalizeCCTPBridge({
    isPermittedToBridge,
    message,
    attestation,
    bridgeDirection,
    includeTosVersionByte,
  });
  const { writeAsync: finalizeCCTPBridge } = useContractWrite(finalizeCCTPBridgeConfig);

  const handleSwitchToCorrectNetwork = useCallback(() => {
    switchNetwork?.(bridgeDirection === 'deposit' ? l2ChainID : l1ChainID);
  }, [bridgeDirection, switchNetwork]);

  const handleFinalizeCCTPBridge = useCallback(() => {
    setModalFinalizeCCTPTxHash(undefined);
    onOpenFinalizeCCTPBridgeModal();
    void (async () => {
      try {
        if (isPermittedToBridge) {
          const finalizeResult = await finalizeCCTPBridge?.();
          setStatus('FINALIZE_CCTP_BRIDGE_PENDING');
          if (finalizeResult?.hash) {
            const finalizeTxHash = finalizeResult.hash;
            setModalFinalizeCCTPTxHash(finalizeTxHash);
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
          onCloseFinalizeCCTPBridgeModal();
        }
      } catch {
        setStatus('FINALIZE_CCTP_BRIDGE_FAILED');
        onCloseFinalizeCCTPBridgeModal();
      }
    })();
  }, [
    finalizeCCTPBridge,
    isPermittedToBridge,
    onCloseFinalizeCCTPBridgeModal,
    onOpenFinalizeCCTPBridgeModal,
    publicClient,
    setModalFinalizeCCTPTxHash,
    setStatus,
  ]);

  const isOnCorrectNetwork =
    (bridgeDirection === 'deposit' && chain?.id === l2ChainID) ||
    (bridgeDirection === 'withdraw' && chain?.id === l1ChainID);

  return (
    <button
      type="button"
      onClick={isOnCorrectNetwork ? handleFinalizeCCTPBridge : handleSwitchToCorrectNetwork}
      className="w-32 bg-white py-2 font-sans text-sm text-black"
    >
      {isOnCorrectNetwork
        ? 'Ready to complete'
        : `Switch to ${bridgeDirection === 'deposit' ? 'L2' : 'L1'}`}
    </button>
  );
});
