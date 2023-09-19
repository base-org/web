const log = require('@docusaurus/logger');

const PREFIX = 'docusaurus-plugin-kbar';

const logger = {
  init: () => {
    log.info(`${PREFIX}: Checking config`);
  },
  pluginComplete: () => {
    log.success(`${PREFIX}: Success`);
  },
};

module.exports = {
  logger,
};
