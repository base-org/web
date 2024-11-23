import React, { useCallback } from 'react';

import logEvent, { AnalyticsEventData } from 'base-ui/utils/logEvent';
import styles from './styles.module.css';

type ImageCardProps = {
  // images are in /static/img
  src: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  analyticsData: AnalyticsEventData;
};

function ImageCard({
  src,
  title,
  description,
  buttonText,
  buttonHref,
  analyticsData,
}: ImageCardProps) {
  const linkClick = useCallback(() => {
    logEvent(analyticsData.name, analyticsData.event, analyticsData.importance);
  }, [logEvent]);

  return (
    <div className={styles.imageCard}>
      <div className={styles.imageCardImageContainer}>
        <img src={src} alt="" />
      </div>
      <div className={styles.imageCardContent}>
        <div>
          <h4 className={styles.imageCardTitle}>{title}</h4>
          <p className={styles.imageCardDescription}>{description}</p>
        </div>
        <a href={buttonHref} className={styles.imageCardButton} onClick={linkClick}>
          {buttonText}
        </a>
      </div>
    </div>
  );
}

export default ImageCard;
