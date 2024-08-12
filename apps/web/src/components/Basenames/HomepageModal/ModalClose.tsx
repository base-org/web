'use client';

import { Dispatch, SetStateAction, useCallback } from 'react';
import { ActionType, ComponentType } from 'base-ui/utils/logEvent';
import { useAnalytics } from '../../../../contexts/Analytics';
import { Icon } from '../../Icon/Icon';

export default function ModalClose({
  setIsModalOpen,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { logEventWithContext } = useAnalytics();
  const closeModal = useCallback(() => {
    logEventWithContext('get_a_basename_modal_close', ActionType.click, {
      componentType: ComponentType.icon,
    });
    setIsModalOpen(false);
  }, [logEventWithContext, setIsModalOpen]);
  return (
    <button type="button" onClick={closeModal} aria-label="Close the modal">
      <Icon name="close" color="white" width="16px" height="16px" />
    </button>
  );
}
