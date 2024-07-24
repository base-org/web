import React, { useCallback } from 'react';

import logEvent from 'base-ui/utils/logEvent';

import { heroEvent } from '../heroEvent';
import styles from './styles.module.css';

export default function HeroButton() {
  const handleClick = useCallback(() => {
    logEvent(heroEvent.name, heroEvent.event, heroEvent.importance);
  }, [logEvent, heroEvent]);

  return (
    <a href="/docs" className={styles.cta}>
      <button className={styles.ctaButton} type="button" onClick={handleClick}>
        LEARN MORE
      </button>
    </a>
  );
}
