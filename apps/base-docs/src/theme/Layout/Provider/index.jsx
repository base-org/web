import { memo, useMemo } from 'react';
import { composeProviders } from '@docusaurus/theme-common';
import {
  AnnouncementBarProvider,
  ColorModeProvider,
  DocsPreferredVersionContextProvider,
  NavbarProvider,
  PluginHtmlClassNameProvider,
  ScrollControllerProvider,
} from '@docusaurus/theme-common/internal';
import { KBarPositioner, KBarProvider } from 'kbar';

import { KBarAnimator } from '../../KBarAnimator';
import { KBarPortal } from '../../KBarPortal';
import { KBarResults } from '../../KBarResults';
import { KBarSearch } from '../../KBarSearch';
import useKBarPluginData from '../../useKBarPluginData';

const SearchProvider = memo(function SearchProvider({ children }) {
  const { actions: pluginActions } = useKBarPluginData();
  const actions = useMemo(() => [...pluginActions], [pluginActions]);

  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner>
          <KBarAnimator>
            <KBarSearch />
            <KBarResults />
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  );
});

const Provider = composeProviders([
  ColorModeProvider,
  AnnouncementBarProvider,
  ScrollControllerProvider,
  DocsPreferredVersionContextProvider,
  PluginHtmlClassNameProvider,
  NavbarProvider,
  SearchProvider,
]);

export default function LayoutProvider({ children }) {
  return <Provider>{children}</Provider>;
}
