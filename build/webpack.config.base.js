const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const {execSync} = require('child_process');
const {getConfig} = require('./utils');
const webpack = require('webpack');


module.exports = {
  context: __dirname,
  // cypress doesn't support fetch api, replace it with whatwg-fetch polyfill
  entry: [...(getConfig('APP_TEST') ? ['whatwg-fetch', '../src/assets/sass/test.sass'] : []), 'reflect-metadata', '../src/main.ts'],
  plugins: [
    new VuetifyLoaderPlugin(),
    new VueLoaderPlugin(),
    new ForkTsCheckerWebpackPlugin({
      vue: true,
      tslint: false,
      tsconfig: '../tsconfig.json'
    }),
  ],
  resolve: {
    extensions: ['.ts', '.vue', '.json', ".js", '.png', ".sass"],
    alias: {
      '@': path.join(__dirname, '..', 'src')
    }
  },
  output: {
    crossOriginLoading: 'anonymous',
    publicPath: getConfig('APP_PUBLIC_PATH')
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 2048000
  },
  devtool: '#source-map',
  devServer: {
    historyApiFallback: true
  },
  // optimization: {minimize: true},
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-typescript-vue'],
            plugins: [
              "@babel/plugin-proposal-optional-chaining",
              "@babel/plugin-proposal-numeric-separator",
              "@babel/plugin-proposal-nullish-coalescing-operator",
              ["@babel/plugin-proposal-decorators", {"legacy": true}],
              ["@babel/plugin-proposal-class-properties", {"loose": true}],
              ...(getConfig('APP_TEST') ? ['istanbul'] : []),
            ],
            babelrc: false,
          },
        }],
      },
      {
        exclude: /node_modules/,
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ],
  },
};
