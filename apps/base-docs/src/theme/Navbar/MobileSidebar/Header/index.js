import React, { useCallback } from 'react';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import { translate } from '@docusaurus/Translate';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import IconClose from '@theme/Icon/Close';
import NavbarLogo from '@theme/Navbar/Logo';
import { CustomConnectButton } from '../../../NavbarItem/ComponentTypes';
import styles from './styles.module.css';

function CloseButton() {
  const mobileSidebar = useNavbarMobileSidebar();

  const toggleSidebar = useCallback(() => {
    mobileSidebar.toggle();
  }, [mobileSidebar]);

  return (
    <button
      type="button"
      aria-label={translate({
        id: 'theme.docs.sidebar.closeSidebarButtonAriaLabel',
        message: 'Close navigation bar',
        description: 'The ARIA label for close button of mobile sidebar',
      })}
      className="clean-btn navbar-sidebar__close"
      onClick={toggleSidebar}
    >
      <IconClose color="var(--ifm-color-emphasis-600)" />
    </button>
  );
}
export default function NavbarMobileSidebarHeader() {
  return (
    <div className={styles.navbarSidebarHeader}>
      <div className={styles.navbarSidebarPrimary}>
        <NavbarLogo />
        <NavbarColorModeToggle className="margin-right--md" />
        <CloseButton />
      </div>
      <div className={styles.navbarSidebarSecondary}>
        <CustomConnectButton className={styles.walletConnectButton} />
      </div>
    </div>
  );
}
