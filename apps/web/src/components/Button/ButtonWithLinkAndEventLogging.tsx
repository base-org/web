'use client';

import { useCallback } from 'react';

import logEvent, { AnalyticsEventData, CCAEventData } from 'libs/base-ui/utils/logEvent';

import { ButtonWithLink, ButtonWithLinkProps } from './ButtonWithLink';

export function ButtonWithLinkAndEventLogging({
  eventName,
  eventContext,
  eventData,
  ...buttonWithLinkProps
}: ButtonWithLinkAndEventLogProps) {
  const event: AnalyticsEventData = {
    name: eventName,
    event: {
      ...eventData,
      action: eventData?.action ?? 'click',
      componentType: eventData?.componentType ?? 'button',
      context: eventContext,
    },
    importance: 'high',
  };

  const handleClick = useCallback(() => {
    logEvent(event.name, event.event, event.importance);
  }, [event.name, event.event, event.importance]);

  return <ButtonWithLink onClick={handleClick} {...buttonWithLinkProps} />;
}

type ButtonWithLinkAndEventLogProps = Omit<ButtonWithLinkProps, 'onClick'> & {
  eventName: string;
  eventContext: string;
  eventData?: CCAEventData
};
