import { useCallback } from 'react';

import styles from './styles.module.css';

export type ModalProps = {
  children: React.ReactNode;
  visible: boolean;
  onRequestClose: () => void;
};

export default function Modal({ children, onRequestClose, visible }: ModalProps) {
  const handleModalClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation(),
    [],
  );

  return (
    <div
      onClick={onRequestClose}
      className={visible ? styles.modalOverlay : styles.modalOverlayHidden}
    >
      <div tabIndex={0} className={styles.modal} onClick={handleModalClick}>
        {children}
      </div>
    </div>
  );
}
