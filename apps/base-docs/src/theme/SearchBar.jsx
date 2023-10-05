import { useCallback } from 'react';
import { useKBar } from 'kbar';

import styles from './kbar.module.css';

function SearchIcon() {
  return (
    <div style={{ width: '14px', margin: '2px 4px 0 0' }}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="#E3E3E3" viewBox="0 0 12 12">
        <path d="M12 10.59 9.17 7.75A4.98 4.98 0 0 0 5 0a5 5 0 1 0 2.75 9.17L10.59 12 12 10.59ZM5 8a3 3 0 0 1-3-3 3 3 0 0 1 3-3 3 3 0 0 1 3 3 3 3 0 0 1-3 3Z" />
      </svg>
    </div>
  );
}

export default function SearchBar() {
  const { query } = useKBar();
  const handleOnPress = useCallback(() => {
    query.toggle();
  }, [query]);
  const handleKeyPress = useCallback(
    (evt) => {
      if (evt.code === 'Enter') {
        query.toggle();
      }
    },
    [query],
  );

  return (
    <div
      role="button"
      // eslint-disable-next-line
      tabIndex={1}
      className={styles.searchBar}
      onClick={handleOnPress}
      onKeyPress={handleKeyPress}
    >
      <div className={styles.keys}>
        <SearchIcon />
        Search
      </div>
    </div>
  );
}
