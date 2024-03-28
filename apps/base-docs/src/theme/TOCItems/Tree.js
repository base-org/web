import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { useWindowSize } from '@docusaurus/theme-common';
import { Link } from 'react-router-dom';
import { useDoc } from '@docusaurus/theme-common/internal';

// Recursive component rendering the toc tree
function TOCItemTree({ toc, className, linkClassName, isChild }) {
  const windowSize = useWindowSize();
  const { metadata } = useDoc();

  if (!toc.length) {
    return null;
  }
  return (
    <ul className={isChild ? undefined : className}>
      {!isChild && windowSize === 'desktop' && (
        <li>
          <p className={clsx(styles.tocTitle)}>ON THIS PAGE</p>
        </li>
      )}
      {toc.map((heading) => (
        <li key={heading.id}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <a
            href={`#${heading.id}`}
            className={linkClassName ?? undefined}
            // Developer provided the HTML, so assume it's safe.
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: heading.value }}
          />
          <TOCItemTree
            isChild
            toc={heading.children}
            className={className}
            linkClassName={linkClassName}
          />
        </li>
      ))}
      {!isChild &&
        windowSize === 'desktop' &&
        metadata.source &&
        metadata.source.startsWith('@site/tutorials/docs') && (
          <li>
            <Link to={`/tutorials`}>
              <p className={clsx(styles.backLink)}>All tutorials</p>
            </Link>
          </li>
        )}
    </ul>
  );
}
// Memo only the tree root is enough
export default React.memo(TOCItemTree);
