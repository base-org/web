import React from 'react';

import styles from './styles.module.css';

type ImageCardProps = {
  // images are in /static/img
  src: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
};

function ImageCard({ src, title, description, buttonText, buttonHref }: ImageCardProps) {
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
        <a href={buttonHref} className={styles.imageCardButton}>
          {buttonText}
        </a>
      </div>
    </div>
  );
}

export default ImageCard;
