module.exports = {
  extends: ['next', 'plugin:react/recommended', 'plugin:react/jsx-runtime'],
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
