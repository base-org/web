import React, { useCallback } from 'react';

import logEvent from 'base-ui/utils/logEvent';

import { heroEvent } from '../heroEvent';
import styles from './styles.module.css';

export default function HeroButton() {
  const handleClick = useCallback(() => {
    logEvent(heroEvent.name, heroEvent.event, heroEvent.importance);
  }, [logEvent, heroEvent]);

  return (
    <a
      href="https://base.org/build/?utm_source=basedocs&utm_medium=hero"
      className={styles.cta}
      target="_blank"
      rel="noreferrer noopener"
    >
      <button className={styles.ctaButton} type="button" onClick={handleClick}>
        Get Started
      </button>
    </a>
  );
}
