type DocusaurusConfig = {
  default: {
    customFields: {
      mendableServerApiKey: string;
    };
  };
};

const docusaurusConfig = require('@generated/docusaurus.config') as DocusaurusConfig;

export const { customFields } = docusaurusConfig.default;
