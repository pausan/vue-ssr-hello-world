const webpack = require('webpack')
const merge = require('webpack-merge')
const getWebpackBaseConfig = require('./webpack.base.config')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const Visualizer = require('webpack-visualizer-plugin');

function getConfig (isProd) {
  const config = merge(
    getWebpackBaseConfig(isProd),
    {
      entry: {
        app: './src/entry-client.js'
      },
      resolve: {
        alias: {
          'create-api': './create-api-client.js',
        }
      },
      plugins: [
        // strip dev-only code in Vue source
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
          'process.env.VUE_ENV': '"client"'
        }),

        new VueSSRClientPlugin(),
        // new Visualizer()
      ]
    }
  )

  if (isProd) {
    config.plugins.push(
      // auto generate service worker
      new SWPrecachePlugin({
        cacheId: 'vue-ssr-hello-world',
        filename: 'service-worker.js',
        minify: true,
        dontCacheBustUrlsMatching: /./,
        staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
      })
    )
  }

  return config;
}

module.exports = (env, argv) => {
  return getConfig (argv.mode === 'production');
}