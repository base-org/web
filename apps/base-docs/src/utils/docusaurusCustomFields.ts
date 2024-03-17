type DocusaurusConfig = {
  default: {
    customFields: {
      nodeEnv: string;
    };
  };
};

const docusaurusConfig = require('@generated/docusaurus.config') as DocusaurusConfig;

export const { customFields } = docusaurusConfig.default;
