const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: ['./src/main.js'],
  plugins: [
    new VueLoaderPlugin(), // required since webpack 4 and v14,
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  }, module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.vue$/,
        loader: 'vue-loader', //allows singleFileComponents

      },
      {
        test: /\.sass$/,
        use: [
          MiniCssExtractPlugin.loader,
          "style-loader",
          "css-loader",
          "sass-loader?indentedSyntax"
        ]
      },
    ]
  }

}
