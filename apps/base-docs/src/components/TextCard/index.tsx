import React, { useCallback } from 'react';
import Icon from '../Icon';

import styles from './styles.module.css';
import logEvent, { AnalyticsEventData } from 'base-ui/utils/logEvent';

type TextCardProps = {
  title: string;
  description: string;
  href: string;
  analyticsData: AnalyticsEventData;
};

function TextCard({ title, description, href, analyticsData }: TextCardProps) {
  const linkClick = useCallback(() => {
    logEvent(analyticsData.name, analyticsData.event, analyticsData.importance);
  }, [logEvent]);
  return (
    <div className={styles.textCard}>
      <div>
        <h3 className={styles.textCardTitle}>{title}</h3>
        <p className={styles.textCardDescription}>{description}</p>
      </div>
      <a href={href} className={styles.textCardLink} onClick={linkClick}>
        <span>Get started</span>
        <Icon name="arrow-right" width="16" height="16" />
      </a>
    </div>
  );
}

export default TextCard;
