const path = require('path')
const webpack = require('webpack')
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = function getWebpackBaseConfig (isProd) {
  return {
    mode : isProd ? 'production' : 'development',

    devtool: isProd
      ? false
      : '#cheap-module-source-map',
    output: {
      path: path.resolve(__dirname, '../dist'),
      publicPath: '/dist/',
      filename: '[name].[chunkhash].js'
    },
    resolve: {
      alias: {
        'public': path.resolve(__dirname, '../public'),
        // used by default already:
        // 'vue$': 'vue/dist/vue.runtime.esm.js'
      }
    },
    module: {
      noParse: /es6-promise\.js$/, // avoid webpack shimming process
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            compilerOptions: {
              preserveWhitespace: false
            }
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[name].[ext]?[hash]'
          }
        },
        {
          test: /\.(styl(us)|css)?$/,
          use: isProd
            ? MiniCssExtractPlugin.loader
            : ['vue-style-loader', 'css-loader', 'stylus-loader']
        },
      ]
    },
    performance: {
      hints: false
    },
    optimization: {
      minimizer: isProd
        ? [
          new TerserJSPlugin({
            cache : true,
            parallel : true,
            extractComments : true
          }),
          new OptimizeCSSAssetsPlugin()
        ]
        : [],
    },
    plugins: isProd
      ? [
          new VueLoaderPlugin(),
          new webpack.optimize.ModuleConcatenationPlugin(),
          new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
          })
        ]
      : [
          new VueLoaderPlugin(),
          new FriendlyErrorsPlugin()
        ]
  }
}