module.exports = {
  root: true,
  reportUnusedDisableDirectives: true,
  overrides: [
    // Docusaurus, Storybook
    {
      files: [
        'apps/*-docs/**/*',
        'apps/*-storybook/**/*',
        'examples/docusaurus/**/*',
        'examples/storybook/**/*',
      ],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
  parserOptions: {
    EXPERIMENTAL_useProjectService: true,
    ecmaVersion: 2021, // Support for modern JavaScript features
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: [
    'react-perf',
    'relay',
    '@typescript-eslint',
    'import',
    'prettier', // Added Prettier plugin for automatic code formatting
  ],
  extends: [
    'airbnb-typescript/base',
    'airbnb/rules/react',
    'airbnb/rules/react-a11y',
    'plugin:relay/strict',
    'plugin:@typescript-eslint/recommended', // Recommended TypeScript rules
    'plugin:prettier/recommended', // Integrates Prettier rules
  ],
  rules: {
    'prettier/prettier': 'error', // Enforce Prettier code style
    'import/extensions': ['error', 'never'],
    'react/destructuring-assignment': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx', '.mdx'] }],

    // Allow prop spreading
    'react/jsx-props-no-spreading': 'off',

    // Use class properties
    'react/state-in-constructor': 'off',

    // Do not use prop types since TypeScript is used
    'react/default-props-match-prop-types': 'off',
    'react/forbid-foreign-prop-types': 'off',
    'react/forbid-prop-types': 'off',
    'react/no-unused-prop-types': 'off',
    'react/prefer-read-only-props': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/sort-prop-types': 'off',

    // Performance: Avoid unnecessary renders
    'react-perf/jsx-no-new-array-as-prop': 'warn',
    'react-perf/jsx-no-new-function-as-prop': 'warn',
    'react-perf/jsx-no-new-object-as-prop': ['warn', { nativeAllowList: ['style'] }],

    // Prefer function declarations
    'react/function-component-definition': [
      'error',
      { namedComponents: 'function-declaration', unnamedComponents: 'function-expression' },
    ],

    // Prefer named event handlers
    'react/jsx-handler-names': 'error',

    // Require named functions for inferred `displayName`
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],

    'react/jsx-one-expression-per-line': 'off',

    // Do not use Flow
    'relay/generated-flow-types': 'off',

    // Shortened types
    '@typescript-eslint/array-type': ['error', { default: 'array' }],
    '@typescript-eslint/consistent-indexed-object-style': ['error', 'record'],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/method-signature-style': ['error', 'property'],
    '@typescript-eslint/no-inferrable-types': 'error',

    // Banned types
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/no-explicit-any': ['error', { fixToUnknown: true }],
    '@typescript-eslint/no-invalid-void-type': 'error',
    '@typescript-eslint/no-unsafe-argument': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',

    // Readability
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: false }],
    '@typescript-eslint/parameter-properties': 'error',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
    '@typescript-eslint/no-use-before-define': 'off',

    // Correctness
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-literal-enum-member': 'error',
    '@typescript-eslint/restrict-plus-operands': ['error', { skipCompoundAssignments: false }],
    '@typescript-eslint/unified-signatures': 'error',

    // Assertions
    '@typescript-eslint/consistent-type-assertions': 'error',
    '@typescript-eslint/no-confusing-non-null-assertion': 'error',
    '@typescript-eslint/no-extra-non-null-assertion': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
    '@typescript-eslint/prefer-as-const': 'error',

    // Comments
    '@typescript-eslint/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    '@typescript-eslint/triple-slash-reference': [
      'error',
      { path: 'never', types: 'never', lib: 'never' },
    ],

    // Async
    'no-void': 'off',
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/promise-function-async': 'error',

    // API
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',

    // Migration Difficulties
    '@typescript-eslint/no-unsafe-member-access': 'off',
  },
};
