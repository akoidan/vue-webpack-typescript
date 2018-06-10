const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env, argv) => {

  const conf =  {
    entry: ['./src/main.ts', './src/assets/sass/main.sass'],
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin(), // extract css to a separate file, instead of having it loaded from js thus we can increase load time, since css is not required for domready state
      new HtmlWebpackPlugin({hash: true, template: 'src/index.html'}), // this plugin is required to change hashes of js/css for index.html
    ],
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        },
        {
          exclude: /node_modules/,
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.sass$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader?indentedSyntax"
          ]
        },
        { // always save fonts as files, so in case of multiple urls for same font browser only downloads the required one
          test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]?[sha512:hash:base64:6]',
          }
        },
        {
          test: /\.(png|jpg|gif)$/, //pack image to base64 when its size is less than 16k, otherwise leave it as a file
          loader: 'url-loader',
          options: {
            limit: 16384
          }
        },
      ],
    },
  };

  if (argv.mode === 'development') {
    conf.devtool = '#source-map';
  }
  return conf;
};
