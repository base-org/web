import { useCallback, useEffect } from 'react';

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

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (visible) {
      const el = document.getElementById('__docusaurus');
      el?.classList.add('no-scroll');
    }

    return () => {
      const el = document.getElementById('__docusaurus');
      el?.classList.remove('no-scroll');
    };
  }, [visible]);

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
