/* eslint-disable react-perf/jsx-no-new-function-as-prop */
import { memo, useCallback, useState } from 'react';
import chains from 'apps/bridge/chains';
import {
  BridgeButton,
  BridgeButtonProps,
} from 'apps/bridge/src/components/BridgeButton/BridgeButton';
import { Modal } from 'apps/bridge/src/components/Modal/Modal';
import { useIsConnectedToCorrectNetwork } from 'apps/bridge/src/utils/hooks/useIsConnectedToCorrectNetwork';
import { useSwitchNetwork } from 'wagmi';

type Props = {
  toChainId: number;
  onSuccess?: () => void;
};

export const SwitchNetworkButton = memo(function SwitchNetworkButton({
  toChainId,
  onSuccess,
}: Props) {
  const { switchNetwork } = useSwitchNetwork({
    onSuccess,
  });

  const switchToL1Network = useCallback(() => {
    switchNetwork?.(toChainId);
  }, [switchNetwork, toChainId]);

  return <BridgeButton onClick={switchToL1Network}>Switch network</BridgeButton>;
});

export function BaseButton({ toChainId, onClick, ...props }: Props & BridgeButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const isCorrectNetwork = useIsConnectedToCorrectNetwork(toChainId);
  const chainName = chains.find((chain) => chain.id === toChainId)?.name;

  const handleClick = () => {
    if (!isCorrectNetwork) {
      setShowModal(true);
    } else {
      onClick?.();
    }
  };

  return (
    <>
      <BridgeButton onClick={handleClick} {...props} />

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`Switch to ${chainName}`}
        content={`Switching networks will enable fund withdrawals from ${chainName}`}
        icon="confirm"
        footer={(
          <div className="flex justify-end gap-2">
            <BridgeButton variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </BridgeButton>
            <SwitchNetworkButton toChainId={toChainId} onSuccess={() => setShowModal(false)} />
          </div>
        )}
      />
    </>
  );
}
