module.exports = {
  extends: 'next',
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
