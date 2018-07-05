const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const name = '[name].[ext]?[sha512:hash:base64:6]';

module.exports = (env, argv) => {

  let plugins;
  let sasscPlugins;
  plugins = [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({hash: true, template: 'src/index.html'}),
  ];

  if (argv.mode === 'production') {
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    plugins.push(new MiniCssExtractPlugin());
    sasscPlugins = [
      MiniCssExtractPlugin.loader,
      'css-loader',
      {
        loader: "sass-loader",
        options: {
          indentedSyntax: true,
          includePaths: [path.resolve(__dirname, 'src/assets/sass')]
        }
      }
    ];
  } else if (argv.mode === 'development') {
    sasscPlugins = [
      "style-loader", 'css-loader?sourceMap',
      {
        loader: "sass-loader",
        options: {
          indentedSyntax: true,
          includePaths: [path.resolve(__dirname, 'src/assets/sass')]
        }
      }
    ];
  } else {
    throw `Pass --mode production/development, current ${argv.mode} is invalid`
  }
  const conf = {
    entry: ['./src/main.ts', './src/assets/sass/main.sass'],
    plugins,
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'],
    },
    devtool: '#source-map',
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
          use: sasscPlugins,
        },
        { // always save fonts as files, so in case of multiple urls for same font browser only downloads the required one
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'file-loader',
          options: {
            outputPath: 'font',  // put fonts into separate folder, so we don't have millions of files in root of dist
            name,
          }
        },
        {
          test: /\.(png|jpg|gif|svg)$/, //pack image to base64 when its size is less than 16k, otherwise leave it as a file
          loader: 'url-loader',
          options: {
            limit: 16384,
            outputPath: 'img', // put image into separate folder, so we don't have millions of files in root of dist
            name
          }
        },
      ],
    },
  };

  return conf;
};
