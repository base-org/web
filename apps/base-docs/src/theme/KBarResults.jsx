import { KBarResults as OriginalKBarResults, useMatches } from 'kbar';

import styles from './kbar.module.css';

function CaretRight() {
  return (
    <div style={{ width: '14px', marginRight: '4px' }}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="#E3E3E3" viewBox="0 0 12 12">
        <path d="M3.67 2.46 7.21 6 3.67 9.54l1.06 1.06L9.33 6l-4.6-4.6-1.06 1.06Z" />
      </svg>
    </div>
  );
}

function Ancestors({ item }) {
  if (item.ancestors.length === 0) {
    return null;
  }

  return (
    <>
      {item.ancestors.map(({ name }) => (
        <span className={styles.ancestor}>
          {name} <CaretRight />
        </span>
      ))}
    </>
  );
}

function handleRender({ item, active }) {
  if (typeof item === 'string') {
    return <div />;
  }
  return (
    <div className={active ? styles.result__active : styles.result}>
      <Ancestors item={item} />
      <span className={styles.nowrap}>{item.name}</span>
    </div>
  );
}

export function KBarResults() {
  const props = useMatches();

  return <OriginalKBarResults items={props.results} onRender={handleRender} />;
}
