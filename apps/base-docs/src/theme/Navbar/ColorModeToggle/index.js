import React, { useCallback } from 'react';
import { useColorMode, useThemeConfig } from '@docusaurus/theme-common';
import ColorModeToggle from '@theme/ColorModeToggle';
import styles from './styles.module.css';
import logEvent, {
  ActionType,
  ComponentType,
  AnalyticsEventImportance,
} from 'base-ui/utils/logEvent';

export default function NavbarColorModeToggle({ className }) {
  const navbarStyle = useThemeConfig().navbar.style;
  const disabled = useThemeConfig().colorMode.disableSwitch;
  const { colorMode, setColorMode } = useColorMode();

  const toggleSwitch = useCallback(() => {
    const newColorMode = colorMode === 'dark' ? 'light' : 'dark';

    logEvent(
      `colormode_toggle_from_${colorMode}_to_${newColorMode}`,
      {
        action: ActionType.click,
        componentType: ComponentType.icon,
        context: 'base_docs_navbar',
      },
      AnalyticsEventImportance.low,
    );
    setColorMode(newColorMode);
  }, [colorMode, setColorMode]);

  if (disabled) {
    return null;
  }
  return (
    <ColorModeToggle
      className={className}
      buttonClassName={navbarStyle === 'dark' ? styles.darkNavbarColorModeToggle : undefined}
      value={colorMode}
      onChange={toggleSwitch}
    />
  );
}
