const { defineConfig } = require('@vue/cli-service');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const PERFORMANCE_IGNORED_ASSET_RE = /\.(avif|gif|jpe?g|map|mp4|png|svg|webm|webp)$/i;
const WATCH_IGNORED = [
  '**/.DS_Store',
  '**/Thumbs.db',
  path.resolve(__dirname, 'dist/**'),
  path.resolve(__dirname, 'src/assets/media-src/**'),
  path.resolve(__dirname, 'public/assets/media/**'),
  path.resolve(__dirname, 'public/media/**'),
];

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/', // Pour définir le chemin de base
  devServer: {
    static: {
      watch: {
        ignored: WATCH_IGNORED,
      },
    },
  },
  configureWebpack: {
    watchOptions: {
      ignored: WATCH_IGNORED,
    },
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
    performance: isProduction
      ? {
          // Keep webpack performance hints focused on code bundles in production.
          hints: 'warning',
          maxAssetSize: 1536 * 1024,
          maxEntrypointSize: 7 * 1024 * 1024,
          assetFilter: (assetFilename) => !PERFORMANCE_IGNORED_ASSET_RE.test(assetFilename),
        }
      : false,
  },
});
