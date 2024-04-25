module.exports = {
  extends: [
    'next',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'eslint-config-prettier',
  ],
  languageOptions: {
    parserOptions: {
      project: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
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
