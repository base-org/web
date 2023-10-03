module.exports = {
  extends: [
    'next',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'eslint-config-prettier',
  ],
  settings: {
    next: {
      rootDir: __dirname,
    },
  },
  rules: {
    // Does not work with `:` aliases
    'import/extensions': 'off',
  },
};
