import React, { useState, useCallback } from 'react';
import { CookiePreferencesModal } from '@coinbase/cookie-banner';

import styles from './styles.module.css';

export default function CookieManager() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = useCallback(() => setIsOpen(true), []);

  const handleCloseModal = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <button type="button" className={styles.cookieManagerButton} onClick={handleOpenModal}>
        Cookie Preference Manager
      </button>
      {isOpen && <CookiePreferencesModal isOpen={isOpen} onClose={handleCloseModal} />}
    </>
  );
}
