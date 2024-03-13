import React from 'react';
import { useThemeConfig, ErrorCauseBoundary } from '@docusaurus/theme-common';
import { useNavbarMobileSidebar } from '@docusaurus/theme-common/internal';
import NavbarItem from '@theme/NavbarItem';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import SearchBar from '@theme/SearchBar';
import NavbarMobileSidebarToggle from '@theme/Navbar/MobileSidebar/Toggle';
import NavbarLogo from '@theme/Navbar/Logo';
import NavbarSearch from '@theme/Navbar/Search';
import styles from './styles.module.css';

import Icon from '../../../components/Icon';

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
      <div className="navbar__items navbar__items--right">
        {right}
        <div className="navbar__social__links">
          <a href="https://discord.com/invite/buildonbase" target="_blank" rel="noreferrer">
            <Icon name="discord" />
          </a>
          <a href="https://www.twitter.com/base" target="_blank" rel="noreferrer">
            <Icon name="twitter" />
          </a>
          <a href="https://www.github.com/base-org" target="_blank" rel="noreferrer">
            <Icon name="github" />
          </a>
        </div>
      </div>
    </div>
  );
}
function NavbarLayoutBottomContent({ left, right }) {
  return (
    <div className="navbar__inner">
      <div className="navbar__items">{left}</div>
      <div className="navbar__items navbar__items--right">{right}</div>
    </div>
  );
}

function splitNavbarItems(items) {
  const topLeftItems = items.filter((item) => item.navPosition === 'topLeft');
  const topRightItems = items.filter((item) => item.navPosition === 'topRight');
  const bottomRightItems = items.filter((item) => item.navPosition === 'bottomRight');
  const bottomLeftItems = items.filter((item) => item.navPosition === 'bottomLeft');

  return { topLeftItems, topRightItems, bottomLeftItems, bottomRightItems };
}

export default function NavbarContent() {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useNavbarItems();
  const { topRightItems, bottomLeftItems, bottomRightItems } = splitNavbarItems(items);
  console.log(`topRightItems: ${JSON.stringify(topRightItems)}`);
  console.log(`bottomLeftItems: ${JSON.stringify(bottomLeftItems)}`);
  console.log(`bottomRightItems: ${JSON.stringify(bottomRightItems)}`);

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
          </>
        }
      />
    </>
  );
}
