const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/', // Pour définir le chemin de base
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
        cacheGroups: {
          default: false,
          defaultVendors: false,
          framework: {
            test: /[\\/]node_modules[\\/](vue|vue-router|@vue)[\\/]/,
            name: 'chunk-framework',
            chunks: 'all',
            priority: 40,
            enforce: true,
            reuseExistingChunk: true,
          },
          ui: {
            test: /[\\/]node_modules[\\/](primevue|primeicons|primeflex)[\\/]/,
            name: 'chunk-ui',
            chunks: 'all',
            priority: 35,
            enforce: true,
            reuseExistingChunk: true,
          },
          firebase: {
            test: /[\\/]node_modules[\\/](firebase|@firebase)[\\/]/,
            name: 'chunk-firebase',
            chunks: 'async',
            priority: 30,
            reuseExistingChunk: true,
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'chunk-vendors',
            chunks: 'all',
            priority: 20,
            reuseExistingChunk: true,
          },
          common: {
            name: 'chunk-common',
            minChunks: 2,
            chunks: 'async',
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      },
    },
    performance: {
      hints: 'warning',
      maxAssetSize: 1024 * 1024,
      maxEntrypointSize: 1500 * 1024,
    },
  },
});
