import { KBarAnimator as OriginalKBarAnimator } from 'kbar';

import styles from './kbar.module.css';

export function KBarAnimator(props) {
  return <OriginalKBarAnimator {...props} className={styles.animator} />;
}
