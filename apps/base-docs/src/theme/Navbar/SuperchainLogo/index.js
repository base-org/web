import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ThemedImage from '@theme/ThemedImage';
import styles from './styles.module.css';

export default function NavbarSuperchainLogo() {
  return (
    <div className={styles.svgContainer}>
      <ThemedImage
        alt="Built on the Superchain"
        sources={{
          light: useBaseUrl('/img/superchain_text.svg'),
          dark: useBaseUrl('/img/superchain_text_darkmode.svg'),
        }}
      />
    </div>
  );
}
