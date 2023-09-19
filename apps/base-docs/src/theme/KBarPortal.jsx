import { KBarPortal as OriginalKBarPortal, useKBar } from 'kbar';

import styles from './kbar.module.css';

export function KBarPortal({ children }) {
  const { showing } = useKBar((state) => ({
    showing: state.visualState !== 'hidden',
  }));

  if (!showing) {
    return null;
  }

  return (
    <OriginalKBarPortal>
      <div className={styles.overlay} />
      <div className={styles.content}>{children}</div>
    </OriginalKBarPortal>
  );
}
