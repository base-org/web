'use client';

import { useCallback } from 'react';

import logEvent, { AnalyticsEventData } from 'libs/base-ui/utils/logEvent';

import { ButtonWithLink, ButtonWithLinkProps } from './ButtonWithLink';

export function ButtonWithLinkAndEventLogging({
  event,
  ...buttonWithLinkProps
}: ButtonWithLinkAndEventLogProps) {
  const handleClick = useCallback(() => {
    logEvent(event.name, event.event, event.importance);
  }, [event]);

  return <ButtonWithLink onClick={handleClick} {...buttonWithLinkProps} />;
}

type ButtonWithLinkAndEventLogProps = Omit<ButtonWithLinkProps, 'onClick'> & {
  event: AnalyticsEventData;
};
