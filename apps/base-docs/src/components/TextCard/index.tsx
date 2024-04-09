import React from 'react';
import Icon from '../Icon';

import styles from './styles.module.css';

type TextCardProps = {
  title: string;
  description: string;
  href: string;
};

function TextCard({ title, description, href }: TextCardProps) {
  return (
    <div className={styles.textCard}>
      <div>
        <h3 className={styles.textCardTitle}>{title}</h3>
        <p className={styles.textCardDescription}>{description}</p>
      </div>
      <a href={href} className={styles.textCardLink}>
        <span>Get started</span>
        <Icon name="arrow-right" width="16" height="16" />
      </a>
    </div>
  );
}

export default TextCard;
