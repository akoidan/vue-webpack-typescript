const {merge} = require('webpack-merge');
const config = require('./webpack.config.base');
const {sassLoader, fileLoader, getDefinitions, getConfig} = require('./utils');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const SriPlugin = require('webpack-subresource-integrity');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(config, {
  mode: 'production',
  stats: 'errors-only',
  output: {
    crossOriginLoading: getConfig('APP_FILE_MODE') ? false: 'anonymous',
    publicPath: getConfig('APP_PUBLIC_PATH')
  },
  module: {
    rules: [
      {
        test: /\.(sass|css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: getConfig('APP_PUBLIC_PATH'),
            }
          },
          'css-loader',
          sassLoader,
        ],
      },
      fileLoader(getConfig('APP_PUBLIC_PATH'))
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: '../src/index.ejs',
      inject: false,
      favicon: '../src/assets/favicon.ico',
      hash: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    getDefinitions(false),
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: {
        map: {
          inline: false
        }
      }
    }),
    new SriPlugin({
      hashFuncNames: ['sha256', 'sha384'],
      enabled: !getConfig('APP_FILE_MODE'),
    }),
    new MiniCssExtractPlugin()
  ]
});
