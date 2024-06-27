import React, { useCallback } from 'react';
import Logo from '@theme/Logo';
import logEvent, {
  ActionType,
  AnalyticsEventImportance,
  ComponentType,
} from 'base-ui/utils/logEvent';
export default function NavbarLogo() {
  const linkClick = useCallback(() => {
    logEvent(
      'home',
      {
        action: ActionType.click,
        componentType: ComponentType.icon,
        context: 'navbar',
      },
      AnalyticsEventImportance.high,
    );
  }, [logEvent]);
  return (
    <Logo
      className="navbar__brand"
      imageClassName="navbar__logo"
      titleClassName="navbar__title text--truncate"
      onClick={linkClick}
    />
  );
}
