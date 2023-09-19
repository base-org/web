const isTestEnv = process.env.NODE_ENV === 'test';

module.exports = {
  plugins: ['babel-plugin-tsconfig-paths', 'babel-plugin-relay'],
  presets: [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        loose: true,
        modules: isTestEnv ? 'commonjs' : false,
        exclude: [
          // Preserve native async/await
          '@babel/plugin-transform-regenerator',
          '@babel/plugin-transform-async-to-generator',
        ],
      },
    ],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript',
  ],
};
