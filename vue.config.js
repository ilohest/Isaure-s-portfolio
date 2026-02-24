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
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: false,
          defaultVendors: false,
          framework: {
            test: /[\\/]node_modules[\\/](vue|vue-router|@vue|primevue|primeicons|primeflex)[\\/]/,
            name: 'chunk-framework',
            chunks: 'initial',
            priority: 30,
            reuseExistingChunk: true,
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'chunk-vendors',
            chunks: 'async',
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
  },
});
