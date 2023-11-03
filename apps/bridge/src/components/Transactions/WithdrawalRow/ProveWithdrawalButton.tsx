import { Dispatch, memo, SetStateAction, useCallback } from 'react';
import { usePrepareProveWithdrawal } from 'apps/bridge/src/utils/hooks/usePrepareProveWithdrawal';
import getConfig from 'next/config';
import { useContractWrite, useNetwork, useSwitchNetwork } from 'wagmi';

const { publicRuntimeConfig } = getConfig();
const l1ChainID = parseInt(publicRuntimeConfig.l1ChainID);

type ProveWithdrawalButtonProps = {
  txHash: `0x${string}`;
  onOpenProveWithdrawalModal: () => void;
  onCloseProveWithdrawalModal: () => void;
  setProveTxHash: Dispatch<SetStateAction<`0x${string}` | undefined>>;
  setModalProveTxHash: Dispatch<SetStateAction<`0x${string}` | undefined>>;
  blockNumberOfLatestL2OutputProposal?: bigint;
};

export const ProveWithdrawalButton = memo(function ProveWithdrawalButton({
  txHash,
  onOpenProveWithdrawalModal,
  onCloseProveWithdrawalModal,
  setProveTxHash,
  setModalProveTxHash,
  blockNumberOfLatestL2OutputProposal,
}: ProveWithdrawalButtonProps) {
  const proveWithdrawalConfig = usePrepareProveWithdrawal(
    txHash,
    blockNumberOfLatestL2OutputProposal,
  );
  const { writeAsync: submitProof } = useContractWrite(proveWithdrawalConfig);

  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const handleSwitchToL1 = useCallback(() => {
    switchNetwork?.(l1ChainID);
  }, [switchNetwork]);

  const handleProveWithdrawal = useCallback(() => {
    setModalProveTxHash(undefined);
    onOpenProveWithdrawalModal();
    void (async () => {
      try {
        const proveResult = await submitProof?.();
        if (proveResult?.hash) {
          const proveTxHash = proveResult.hash;
          setProveTxHash(proveTxHash);
          setModalProveTxHash(proveTxHash);
        }
      } catch {
        onCloseProveWithdrawalModal();
      }
    })();
  }, [
    onCloseProveWithdrawalModal,
    onOpenProveWithdrawalModal,
    setModalProveTxHash,
    setProveTxHash,
    submitProof,
  ]);

  const isConnectedToL1 = chain?.id === l1ChainID;

  return (
    <button
      type="button"
      onClick={isConnectedToL1 ? handleProveWithdrawal : handleSwitchToL1}
      className="w-32 bg-white py-2 font-sans text-sm text-black"
    >
      {isConnectedToL1 ? 'Verify' : 'Switch to L1'}
    </button>
  );
});
