import React from 'react';
import { Button } from '../Button/Button';
import Icon from '../Icon';
import styles from './styles.module.css';

const url = 'https://base.org/learn';

export function CafeSocialShare({ name }) {
  const shareText = encodeURIComponent(
    `I earned my ${name} badge on Base Learn!  Join Onchain Summer and learn to build the future at ${url}.`,
  );

  return (
    <div className={styles.socialShare}>
      <a
        href={`https://warpcast.com/~/compose?embeds[]=${encodeURIComponent(
          url,
        )}&text=${shareText}`}
        className={styles.socialShareLink}
        target="_blank"
        rel="noreferrer"
      >
        <Button variant="secondary">
          <Icon name="farcaster" />
        </Button>
      </a>
      <a
        href={`https://twitter.com/intent/tweet?text=${shareText}`}
        className={styles.socialShareLink}
        target="_blank"
        rel="noreferrer"
      >
        <Button variant="secondary">
          <Icon name="twitter" />
        </Button>
      </a>
    </div>
  );
}
