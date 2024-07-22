// sidebars.js in the root directory

// Function to load the sidebar for the given locale
const loadSidebar = (locale) => {
  switch (locale) {
    case 'es':
      return require('./i18n/es/docusaurus-plugin-content-docs/current/sidebars.js');
    case 'en':
    default:
      return require('./i18n/en/docusaurus-plugin-content-docs/current/sidebars.js');
  }
};

const sidebars = loadSidebar(process.env.DOCUSAURUS_CURRENT_LOCALE || 'en');

module.exports = sidebars;
