'use client';

import React, { useCallback } from 'react';
import { ActionType, ComponentType } from 'base-ui/utils/logEvent';
import { useAnalytics } from 'base-ui/contexts/Analytics';
import Icon from '../../Icon/index';
import styles from './styles.module.css';

export default function ModalClose({ setIsModalOpen }) {
  const { logEventWithContext } = useAnalytics();
  const closeModal = useCallback(() => {
    logEventWithContext('get_a_basename_modal_close', ActionType.click, {
      componentType: ComponentType.icon,
    });
    setIsModalOpen(false);
  }, [logEventWithContext, setIsModalOpen]);
  return (
    <button
      type="button"
      onClick={closeModal}
      aria-label="Close the modal"
      tabIndex={-1}
      className={styles.modalCloseButton}
    >
      <Icon name="close" color="white" width="16px" height="16px" />
    </button>
  );
}
