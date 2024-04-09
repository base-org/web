import React, { useState, useEffect, useCallback } from 'react';
import Icon from '../Icon';

import styles from './styles.module.css';

type FloatingChatButtonProps = {
  onClick: () => void;
};

export default function FloatingChatButton({ onClick }: FloatingChatButtonProps) {
  const [visible, setVisible] = useState(true);

  const handleMouseEnter = useCallback(() => setVisible(true), []);

  const handleMouseLeave = useCallback(() => setVisible(false), []);

  useEffect(() => {
    let tooltipTimer: ReturnType<typeof setTimeout>;
    tooltipTimer = setTimeout(() => setVisible(false), 5000);
    return () => clearTimeout(tooltipTimer);
  }, []);

  return (
    <div className={styles.floatingChatButtonContainer}>
      {visible && (
        <div className={styles.floatingChatButtonTooltip}>
          <span>AI-Powered Search Beta</span>
          <span className={styles.tooltipPoint} />
        </div>
      )}
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={styles.floatingChatButton}
      >
        <Icon name="base-logo" width="60" height="60" />
      </button>
    </div>
  );
}
