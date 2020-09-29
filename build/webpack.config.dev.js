const {merge} = require('webpack-merge');
const {sassLoader, fileLoader, getDefinitions} = require('./utils');
const config = require('./webpack.config.base');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(config, {
  mode: 'development',
  stats: 'normal',
  output: {
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(sass|css|scss)$/,
        use: ["vue-style-loader", 'css-loader?sourceMap', sassLoader],
      },
      fileLoader("/")
    ]
  },
  devServer: {
    disableHostCheck: true, // allow joining under different hostnames to dev server, like ngrok
  },
  plugins: [
    getDefinitions(true),
    new HtmlWebpackPlugin({
      template: '../src/index.ejs',
      favicon: '../src/assets/favicon.ico',
      inject: false
    })
  ]
});
