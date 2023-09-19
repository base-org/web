import { Dispatch, memo, SetStateAction, useCallback } from 'react';
import { useIsPermittedToBridge } from 'apps/bridge/src/utils/hooks/useIsPermittedToBridge';
import { usePrepareFinalizeWithdrawal } from 'apps/bridge/src/utils/hooks/usePrepareFinalizeWithdrawal';
import getConfig from 'next/config';
import { useContractWrite, useNetwork, useSwitchNetwork } from 'wagmi';

const { publicRuntimeConfig } = getConfig();
const l1ChainID = parseInt(publicRuntimeConfig.l1ChainID);

type FinalizeWithdrawalButtonProps = {
  txHash: `0x${string}`;
  isERC20Withdrawal?: boolean;
  onOpenFinalizeWithdrawalModal: () => void;
  onCloseFinalizeWithdrawalModal: () => void;
  setFinalizeTxHash: Dispatch<SetStateAction<`0x${string}` | undefined>>;
  setModalFinalizeTxHash: Dispatch<SetStateAction<`0x${string}` | undefined>>;
};

export const FinalizeWithdrawalButton = memo(function FinalizeWithdrawalButton({
  txHash,
  isERC20Withdrawal,
  onOpenFinalizeWithdrawalModal,
  onCloseFinalizeWithdrawalModal,
  setFinalizeTxHash,
  setModalFinalizeTxHash,
}: FinalizeWithdrawalButtonProps) {
  const isPermittedToBridge = useIsPermittedToBridge();

  const proveWithdrawalConfig = usePrepareFinalizeWithdrawal(txHash, isERC20Withdrawal);
  const { writeAsync: finalizeWithdrawal } = useContractWrite(proveWithdrawalConfig);

  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const handleSwitchToL1 = useCallback(() => {
    switchNetwork?.(l1ChainID);
  }, [switchNetwork]);

  const handleProveWithdrawal = useCallback(() => {
    setModalFinalizeTxHash(undefined);
    onOpenFinalizeWithdrawalModal();
    void (async () => {
      try {
        if (isPermittedToBridge) {
          const finalizeResult = await finalizeWithdrawal?.();
          if (finalizeResult?.hash) {
            const finalizeTxHash = finalizeResult.hash;
            setFinalizeTxHash(finalizeTxHash);
            setModalFinalizeTxHash(finalizeTxHash);
          }
        } else {
          onCloseFinalizeWithdrawalModal();
        }
      } catch {
        onCloseFinalizeWithdrawalModal();
      }
    })();
  }, [
    finalizeWithdrawal,
    isPermittedToBridge,
    onCloseFinalizeWithdrawalModal,
    onOpenFinalizeWithdrawalModal,
    setFinalizeTxHash,
    setModalFinalizeTxHash,
  ]);

  const isConnectedToL1 = chain?.id === l1ChainID;

  return (
    <button
      type="button"
      onClick={isConnectedToL1 ? handleProveWithdrawal : handleSwitchToL1}
      className="w-32 bg-white py-2 font-sans text-sm text-black"
    >
      {isConnectedToL1 ? 'Complete' : 'Switch to L1'}
    </button>
  );
});
