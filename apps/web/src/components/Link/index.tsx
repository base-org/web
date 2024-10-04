'use client';
import { ActionType, CCAEventData, ComponentType } from 'libs/base-ui/utils/logEvent';
import NextLink, { LinkProps } from 'next/link';
import { AnchorHTMLAttributes, MouseEvent, useCallback } from 'react';
import { useAnalytics } from 'apps/web/contexts/Analytics';

type AnchorProps = LinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    eventName?: string;
    eventData?: CCAEventData;
  };

export default function Link({ children, eventName, eventData, onClick, ...props }: AnchorProps) {
  const { logEventWithContext } = useAnalytics();

  const handleOnClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      // Log event if eventName is defined
      if (eventName) {
        logEventWithContext(eventName, ActionType.click, {
          componentType: ComponentType.link,
          ...eventData,
        });
      }

      // Default onClick event
      if (onClick) onClick(event);
    },
    [eventName, onClick, logEventWithContext, eventData],
  );

  return (
    <NextLink {...props} onClick={handleOnClick}>
      {children}
    </NextLink>
  );
}
