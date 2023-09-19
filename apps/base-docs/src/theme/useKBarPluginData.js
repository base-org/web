import { useMemo } from 'react';
// eslint-disable-next-line
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
// eslint-disable-next-line
import { useHistory } from '@docusaurus/router';
// eslint-disable-next-line
import { usePluginData } from '@docusaurus/useGlobalData';

function goToLink(href) {
  if (ExecutionEnvironment.canUseDOM) {
    window.location.assign(href);
  }
}

function decreasePriorityIfCategory(item) {
  return item.parent ? item : { ...item, priority: -1 };
}

function useKBarCustomActionsToActions(actions) {
  const history = useHistory();
  return useMemo(() => {
    return actions.map(decreasePriorityIfCategory).map(({ slug, url, ...item }) => {
      const hasLink = Boolean(slug ?? url);
      const perform = hasLink
        ? () => {
            if (slug) {
              history.push(slug);
            }
            if (url) {
              goToLink(url);
            }
          }
        : undefined;

      return {
        ...item,
        perform,
      };
    });
  }, [history, actions]);
}

function useKBarPluginData() {
  const pluginData = usePluginData('@coinbase/docusaurus-plugin-kbar');
  const actions = useKBarCustomActionsToActions(pluginData.actions);
  return { ...pluginData, actions };
}

export default useKBarPluginData;
