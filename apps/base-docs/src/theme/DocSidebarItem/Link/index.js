import React, { useCallback } from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {isActiveSidebarItem} from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import styles from './styles.module.css';
import logEvent, { ActionType, AnalyticsEventImportance, ComponentType } from 'base-ui/utils/logEvent';
export default function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}) {
  const {href, label, className, autoAddBaseUrl} = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);
  const linkClick = useCallback(() => {
    const eventData = {
      action: ActionType.click,
      componentType: ComponentType.link,
      context: 'sidebar',
    };
    let eventName = item.docId
      ? item.docId.replace(/[\/\\\- ]/g, '_')
      : item.label.replace(/[\/\\\- ]/g, '_');
    let eventImportance = item.docId ? AnalyticsEventImportance.high : AnalyticsEventImportance.low;
    logEvent(eventName, eventData, eventImportance);
  }, [logEvent]);
  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        'menu__list-item',
        className,
      )}
      key={label}>
      <Link
        className={clsx(
          'menu__link',
          !isInternalLink && styles.menuExternalLink,
          {
            'menu__link--active': isActive,
          },
        )}
        autoAddBaseUrl={autoAddBaseUrl}
        aria-current={isActive ? 'page' : undefined}
        to={href}
        onClick={linkClick}
        {...props}>
        {label}
        {!isInternalLink && <IconExternalLink />}
      </Link>
    </li>
  );
}
