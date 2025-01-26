'use client';

import { useCallback } from 'react';
import { ActionType, ComponentType } from 'base-ui/utils/logEvent';
import { useAnalytics } from '../../../contexts/Analytics';
import { ButtonWithLink, ButtonWithLinkProps } from './ButtonWithLink';

type ButtonWithLinkAndEventLogProps = ButtonWithLinkProps & {
  eventName: string;
};

export function ButtonWithLinkAndEventLogging({
  eventName,
  onClick,
  ...buttonWithLinkProps
}: ButtonWithLinkAndEventLogProps) {
  const { logEventWithContext } = useAnalytics();

  const handleClick = useCallback(() => {
    logEventWithContext(eventName, ActionType.click, { componentType: ComponentType.button });
    onClick?.();
  }, [logEventWithContext, eventName, onClick]);

  return <ButtonWithLink onClick={handleClick} {...buttonWithLinkProps} />;
}
