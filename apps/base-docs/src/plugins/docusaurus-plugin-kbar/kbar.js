const { getKBarActions } = require('./getKBarActions');
const { logger } = require('./logger');

const PLUGIN_ID = '@coinbase/docusaurus-plugin-kbar';

async function plugin(_, { kbarActions = [] } = {}) {
  return {
    name: PLUGIN_ID,
    async contentLoaded({ actions, allContent }) {
      let allActions = [];

      for (const content in allContent['docusaurus-plugin-content-docs']) {
        if (Object.hasOwn(allContent['docusaurus-plugin-content-docs'], content)) {
          const { docs, sidebars, path } =
            allContent['docusaurus-plugin-content-docs'][content].loadedVersions[0];
          allActions = [...allActions, ...getKBarActions({ docs, sidebars, route: path })];
        }
      }

      actions.setGlobalData({
        actions: [...allActions, ...kbarActions],
      });

      logger.pluginComplete();
    },
  };
}

module.exports = plugin;
