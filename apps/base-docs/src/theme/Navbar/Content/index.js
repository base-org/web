import React, { useCallback } from 'react';
import { useThemeConfig, ErrorCauseBoundary } from '@docusaurus/theme-common';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';

import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import NavbarItem from '@theme/NavbarItem';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarSearch from '@theme/Navbar/Search';
import SearchBar from '@theme/SearchBar';

import { CustomConnectButton } from '../../NavbarItem/ComponentTypes';
import Icon from '../../../components/Icon';
import styles from './styles.module.css';

function useNavbarItems() {
  // TODO temporary casting until ThemeConfig type is improved
  return useThemeConfig().navbar.items;
}

function NavbarItems({ items }) {
  return (
    <>
      {items.map((item, i) => (
        <ErrorCauseBoundary
          key={i}
          onError={(error) =>
            new Error(
              `A theme navbar item failed to render.
Please double-check the following navbar item (themeConfig.navbar.items) of your Docusaurus config:
${JSON.stringify(item, null, 2)}`,
              { cause: error },
            )
          }
        >
          <NavbarItem {...item} />
        </ErrorCauseBoundary>
      ))}
    </>
  );
}
function NavbarLayoutTopContent({ left, right }) {
  return (
    <div className="navbar__inner">
      <div className="navbar__items">{left}</div>
      <div className="navbar__items navbar__items--right">{right}</div>
    </div>
  );
}
function NavbarLayoutBottomContent({ left, right }) {
  return (
    <div className="navbar__inner">
      <div className="navbar__items">{left}</div>
      <div className="navbar__items navbar__items--right" style={{ gap: '24px' }}>
        {right}
      </div>
    </div>
  );
}

function splitNavbarItems(items) {
  const topLeftItems = items.filter((item) => item.navposition === 'topLeft');
  const topRightItems = items.filter((item) => item.navposition === 'topRight');
  const bottomRightItems = items.filter((item) => item.navposition === 'bottomRight');
  const bottomLeftItems = items.filter((item) => item.navposition === 'bottomLeft');

  return { topLeftItems, topRightItems, bottomLeftItems, bottomRightItems };
}

export default function NavbarContent() {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const { topRightItems, bottomLeftItems, bottomRightItems } = splitNavbarItems(items);

  const searchBarItem = items.find((item) => item.type === 'search');
  return (
    <>
      <NavbarLayoutTopContent left={<NavbarLogo />} right={<NavbarItems items={topRightItems} />} />
      <NavbarLayoutBottomContent
        left={
          <>
            {!mobileSidebar.disabled && <NavbarMobileSidebarToggle />}
            <NavbarItems items={bottomLeftItems} />
          </>
        }
        right={
          <>
            {!searchBarItem && (
              <NavbarSearch>
                <SearchBar />
              </NavbarSearch>
            )}
            <NavbarColorModeToggle className={styles.colorModeToggle} />
            <NavbarItems items={bottomRightItems} />
            <CustomConnectButton className={styles.walletConnectButton} />
          </>
        }
      />
    </>
  );
}
