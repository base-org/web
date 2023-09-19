import { KBarSearch as OriginalKBarSearch } from 'kbar';

import styles from './kbar.module.css';

export function KBarSearch() {
  return <OriginalKBarSearch className={styles.search} defaultPlaceholder="Type to search..." />;
}
