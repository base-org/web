import React from 'react';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {isActiveSidebarItem} from '@docusaurus/theme-common/internal';
import clsx from 'clsx';

export default function DocSidebarItemDoc({item, onItemClick, activePath, level, ...props}) {
  const {href, label, docId} = item;
  const isActive = isActiveSidebarItem(item, activePath);
  
  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        'menu__list-item',
      )}
      key={label}>
      <Link
        className={clsx('menu__link', {
          'menu__link--active': isActive,
        })}
        aria-current={isActive ? 'page' : undefined}
        to={href}
        {...props}
        onClick={onItemClick}>
        {
          {
            id: `sidebar.developers.doc.${docId}`,
            message: label,
            description: `The label for doc item ${docId} in sidebar developers`,
          }
        }
      </Link>
    </li>
  );
}