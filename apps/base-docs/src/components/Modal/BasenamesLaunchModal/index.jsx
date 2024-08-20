import React, { useCallback } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import AnalyticsProvider from 'base-ui/contexts/Analytics';
import HomepageModal from './HomepageModal';
import ModalClose from './ModalClose';
import ModalCta from './ModalCta';
import styles from './styles.module.css';

export default function BasenamesHomepageModal() {
  const [isModalOpen, setIsModalOpen] = useLocalStorage('BasenamesLaunchModalVisible', true);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  return (
    <AnalyticsProvider context="basenames_modal">
      <HomepageModal isOpen={isModalOpen} onClose={closeModal} modalAlign="center">
        <div className={styles.modalContainer}>
          <div className={styles.modalImageContainer}>
            <img src="/img/basenames-modal.svg" alt="basenames launch" />
            <div className={styles.modalCloseIcon}>
              <ModalClose setIsModalOpen={setIsModalOpen} />
            </div>
          </div>
          <div className={styles.modalContentContainer}>
            <h1>
              Basenames
              <br />
              are here!
            </h1>
            <div className={styles.modalSecondaryContentContainter}>
              <span>
                Connect with other Based builders and start building your unique onchain identity on
                Base with a .base.eth username.
              </span>
              <ModalCta buttonClassNames={styles.modalCta} setIsModalOpen={setIsModalOpen} />
            </div>
          </div>
        </div>
      </HomepageModal>
    </AnalyticsProvider>
  );
}
