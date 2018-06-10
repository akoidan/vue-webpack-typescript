const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {

  const conf =  {
    entry: ['./src/main.ts', './src/assets/sass/main.sass'],
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin()
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
      ],
    },
  };

  if (argv.mode === 'development') {
    conf.optimization = {
      splitChunks: {
        chunks: 'all',
        minSize: 0,
        maxAsyncRequests: Infinity,
        maxInitialRequests: Infinity,
        name: true,
        cacheGroups: {
          vendor: {
            name: 'vendor',
            chunks: 'initial',
            reuseExistingChunk: true,
            priority: -5,
            enforce: true,
            test: /[\\/]node_modules[\\/]/
          },
        }
      }
    };
    conf.devtool = '#source-map';
  }
  return conf;
};
