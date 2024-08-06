'use client';

import { useCallback } from 'react';

import { ActionType } from 'libs/base-ui/utils/logEvent';

import { useAnalytics } from 'apps/web/contexts/Analytics';

import { ButtonWithLink, ButtonWithLinkProps } from './ButtonWithLink';

export function ButtonWithLinkAndEventLogging({
  eventName,
  ...buttonWithLinkProps
}: ButtonWithLinkAndEventLogProps) {
  const { logEventWithContext } = useAnalytics();

  const handleClick = useCallback(() => {
    logEventWithContext(eventName, ActionType.click, { componentType: 'button' });
  }, [logEventWithContext, eventName]);

  return <ButtonWithLink onClick={handleClick} {...buttonWithLinkProps} />;
}

type ButtonWithLinkAndEventLogProps = Omit<ButtonWithLinkProps, 'onClick'> & {
  eventName: string;
};
