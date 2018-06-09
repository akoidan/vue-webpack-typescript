const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: ['./src/main.js'],
  plugins: [
    new VueLoaderPlugin(), // required since webpack 4 and v14,
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
      {test:  /\.(sass|scss)$/, loader: 'style-loader!css-loader!sass-loader'},
    ]
  }

}
