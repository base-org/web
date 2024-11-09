module.exports = {
  root: true,
  reportUnusedDisableDirectives: true,
  overrides: [
    {
      files: [
        'apps/*-docs/**/*',
        'apps/*-storybook/**/*',
        'examples/docusaurus/**/*',
        'examples/storybook/**/*',
      ],
      rules: {
        // Disable rule for extraneous dependencies in documentation and Storybook
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
  parserOptions: {
    // Enable experimental project service
    EXPERIMENTAL_useProjectService: true,
  },
  plugins: ['react-perf', 'relay', '@typescript-eslint', 'import'],
  extends: [
    'airbnb-typescript/base',
    'airbnb/rules/react',
    'airbnb/rules/react-a11y',
    'plugin:relay/strict',
  ],
  rules: {
    // General import settings
    'import/extensions': ['error', 'never'],
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx', '.mdx'] }],
    
    // Disable certain React rules as TypeScript is used
    'react/jsx-props-no-spreading': 'off',
    'react/state-in-constructor': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'react/jsx-one-expression-per-line': 'off',

    // Performance-related rules
    'react-perf/jsx-no-new-array-as-prop': 'warn',
    'react-perf/jsx-no-new-function-as-prop': 'warn',
    'react-perf/jsx-no-new-object-as-prop': ['warn', { nativeAllowList: ['style'] }],
    
    // Component definition style
    'react/function-component-definition': [
      'error',
      { namedComponents: 'function-declaration', unnamedComponents: 'function-expression' },
    ],
    
    // Enforce named event handlers
    'react/jsx-handler-names': 'error',

    // Disable Flow rules, using TypeScript instead
    'relay/generated-flow-types': 'off',

    // TypeScript rules
    '@typescript-eslint/array-type': ['error', { default: 'array' }],
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/no-explicit-any': ['error', { fixToUnknown: true }],
    
    // Enforce type safety
    '@typescript-eslint/no-unsafe-*': 'error',

    // Promote newer TypeScript features
    '@typescript-eslint/prefer-optional-chain': 'error',
    '@typescript-eslint/prefer-nullish-coalescing': 'error',

    // Require consistent type usage
    '@typescript-eslint/consistent-type-assertions': 'error',
    '@typescript-eslint/no-confusing-non-null-assertion': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    '@typescript-eslint/prefer-as-const': 'error',

    // Promises handling
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/promise-function-async': 'error',

    // Other improvements
    '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: false }],
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/restrict-plus-operands': ['error', { skipCompoundAssignments: false }],

    // Comment rules
    '@typescript-eslint/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],
    '@typescript-eslint/prefer-ts-expect-error': 'error',
    '@typescript-eslint/triple-slash-reference': ['error', { path: 'never', types: 'never', lib: 'never' }],

    // Structure and correctness rules
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/no-unnecessary-qualifier': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',
    '@typescript-eslint/prefer-literal-enum-member': 'error',
    '@typescript-eslint/unified-signatures': 'error',

    // Disable rule for unsafe member access
    '@typescript-eslint/no-unsafe-member-access': 'off',
  },
};
