// custom-webpack-plugin.js

module.exports = function(context, options) {
  return {
    name: 'custom-webpack-plugin',
    configureWebpack(config, isServer, utils) {
      return {
        resolve: {
          fallback: {
            path: require.resolve('path-browserify'),
            os: require.resolve('os-browserify/browser'),
            url: require.resolve('url/'),
            util: require.resolve('util/'),
            module: false, // Use an empty module for 'module'
            fs: false, // fs is typically not needed in a browser environment
          }
        }
      }
    },
  }
}
