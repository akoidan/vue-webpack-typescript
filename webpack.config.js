const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const name = '[name].[ext]?[sha512:hash:base64:6]';
const webpack = require('webpack');
const sass = require("node-sass");
const sassUtils = require("node-sass-utils")(sass);
const sassVars = require('./src/variables')
const child_process = require('child_process');
const StyleLintPlugin = require('stylelint-webpack-plugin');

const sasFunctions = {
  "get($keys)": function (keys) {
    const convertStringToSassDimension = (result) => {
      // Only attempt to convert strings
      if (typeof result !== "string") {
        return result;
      }

      const cssUnits = [
        "rem",
        "em",
        "vh",
        "vw",
        "vmin",
        "vmax",
        "ex",
        "%",
        "px",
        "cm",
        "mm",
        "in",
        "pt",
        "pc",
        "ch"
      ];
      const parts = result.match(/[a-zA-Z]+|[0-9]+/g);
      const value = parts[0];
      const unit = parts[parts.length - 1];
      if (cssUnits.indexOf(unit) !== -1) {
        result = new sassUtils.SassDimension(parseInt(value, 10), unit);
      }

      return result;
    };
    keys = keys.getValue().split(".");
    var result = sassVars;
    var i;
    for (i = 0; i < keys.length; i++) {
      result = result[keys[i]];
      // Convert to SassDimension if dimenssion
      if (typeof result === "string") {
        result = convertStringToSassDimension(result);
      } else if (typeof result === "object") {
        Object.keys(result).forEach(function (key) {
          var value = result[key];
          result[key] = convertStringToSassDimension(value);
        });
      }
    }
    result = sassUtils.castToSass(result);
    return result;
  }
};


module.exports = (env, argv) => {
  let isProd = argv.mode === 'production';
  let isDev = argv.mode === 'development';
  if (!isProd && !isDev) {
    throw `Pass --mode production/development, current ${argv.mode} is invalid`
  }
  let plugins;
  let sasscPlugins;
  let options = require(`./${argv.mode}.json`);
  let gitHash;
  try {
    gitHash = child_process.execSync('git rev-parse --short=10 HEAD', {encoding: 'utf8'});
    gitHash = gitHash.trim();
    options.GIT_HASH = gitHash;
    console.log(`Git hash = ${gitHash}`)
  } catch (e) {
    console.error("Git hash is unavailable");
  }
  plugins = [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({template: 'src/index.ejs', inject: false}),
    new StyleLintPlugin({
      files: ['**/*.vue', '**/*.sass'],
      emitErrors: false,
    }),
  ];
  const entry = ['./src/main.ts'];
  const sassLoader = {
    loader: "sass-loader",
    options: {
      functions: sasFunctions,
      indentedSyntax: true,
      includePaths: [path.resolve(__dirname, 'src/assets/sass')]
    }
  };
  if (isProd) {
    entry.unshift(  'ts-polyfill'); // ie 11 support and es5 syntaxt
    const CleanWebpackPlugin = require('clean-webpack-plugin');
    plugins.push(new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: ["./dist"]}));
    const MiniCssExtractPlugin = require("mini-css-extract-plugin");
    const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
    const CompressionPlugin = require('compression-webpack-plugin');
    const SriPlugin = require('webpack-subresource-integrity');
    plugins.push(new MiniCssExtractPlugin());
    plugins.push(new SriPlugin({
      hashFuncNames: ['sha256', 'sha384'],
      enabled: true,
    }))
    plugins.push(new CompressionPlugin())
    plugins.push(new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: {
        map: {
          inline: false
        }
      }
    }));
    sasscPlugins = [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: options.PUBLIC_PATH,
        }
      },
      'css-loader',
      sassLoader,
    ];
  } else if (isDev) {
    sasscPlugins = ["style-loader", 'css-loader?sourceMap', sassLoader];
    //conflicts with speedmeasure
    const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
    plugins.push(new HardSourceWebpackPlugin({
      environmentHash: {
        root: process.cwd(),
        directories: [],
        files: ['package.json', `${argv.mode}.json`],
      }
    }))
  }
  plugins.push(new webpack.DefinePlugin({
    CONSTS: JSON.stringify(options),
  }));
  let conf = {
    entry,
    plugins,
    resolve: {
      extensions: ['.ts', '.vue', '.json', ".js", '.png', ".sass"],
      alias: {
        '@': path.join(__dirname, 'src')
      }
    },
    output: {
      crossOriginLoading: 'anonymous',
    },
    performance: {
      hints: isProd ? 'warning' : false,
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
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                appendTsSuffixTo: [/\.vue$/]
              }
            },
            {
              loader: 'tslint-loader'
            }
          ],
        },
        {
          exclude: /node_modules/,
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
            enforce: 'pre',
            test: /\.vue$/,
            loader: 'eslint-loader',
            exclude: /node_modules/
        },
        {
          test: /\.sass$/,
          use: sasscPlugins,
        },
        { // always save fonts as files, so in case of multiple urls for same font browser only downloads the required one
          test: /(\.woff2?|\.eot|\.ttf|\.otf|\/fonts(.*)\.svg)(\?.*)?$/,
          loader: 'file-loader',
          options: {
            outputPath: 'font',  // put fonts into separate folder, so we don't have millions of files in root of dist
            name,
            publicPath: options.PUBLIC_PATH ? options.PUBLIC_PATH + '/font' : null
          }
        },
        {
          test: /(images\/\w+\.svg|images\/\w+\.jpg|images\/\w+\.gif|images\/\w+\.png)$/, //pack image to base64 when its size is less than 16k, otherwise leave it as a file
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
  if (isProd) {
    const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
    const smp = new SpeedMeasurePlugin();
    conf = smp.wrap(conf);
  }

  return conf;
};

