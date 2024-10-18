'use client';

import { useCallback } from 'react';
import { ActionType, ComponentType } from 'base-ui/utils/logEvent';
import { useAnalytics } from '../../../contexts/Analytics';
import { ButtonWithLink, ButtonWithLinkProps } from './ButtonWithLink';

type ButtonWithLinkAndEventLogProps = Omit<ButtonWithLinkProps, 'onClick'> & {
  eventName: string;
};

export function ButtonWithLinkAndEventLogging({
  eventName,
  ...buttonWithLinkProps
}: ButtonWithLinkAndEventLogProps) {
  const { logEventWithContext } = useAnalytics();

  const handleClick = useCallback(() => {
    logEventWithContext(eventName, ActionType.click, { componentType: ComponentType.button });
  }, [logEventWithContext, eventName]);

  return <ButtonWithLink onClick={handleClick} {...buttonWithLinkProps} />;
}
