const config = require('../../prettier.config');

module.exports = {
  ...config,
  plugins: [require('prettier-plugin-tailwindcss')],
};
