const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const child_process = require('child_process');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const sass = require("node-sass");
const sassUtils = require("node-sass-utils")(sass);
const sassVars = require('./src/variables');

/**
 * Extracts values withing measure from sass
 **/
function sassGet(keys) {
  const convertStringToSassDimension = (result) => {
    // Only attempt to convert strings
    if (typeof result !== "string") {
      return result;
    }

    const cssUnits = ["rem", "em", "vh", "vw", "vmin", "vmax", "ex", "%", "px", "cm", "mm", "in", "pt", "pc", "ch"];
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

/**
 *  Adds GIT_HASH to constants if git is available
 **/
function addGitHash(options) {
  let gitHash;
  try {
    gitHash = child_process.execSync('git rev-parse --short=10 HEAD', {encoding: 'utf8'});
    gitHash = gitHash.trim();
    options.GIT_HASH = gitHash;
    console.log(`Git hash = ${gitHash}`)
  } catch (e) {
    console.error("Git hash is unavailable");
  }
}

/**
 * Builds chain of plugins for webpack
 **/
function buildPlugins(options, isLint, isProd) {
  let plugins;
  plugins = [
    new VueLoaderPlugin(),
    new ForkTsCheckerWebpackPlugin({
      vue: true,
      tslint: false,
    }),
    ...(isLint ? [new StyleLintPlugin({
      files: ['**/*.vue', '**/*.sass'],
      emitErrors: false,
    }),] : []),
  ];
  if (options.IS_DEBUG) {
    plugins.push(new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      inject: false
    }))
  } else {
    plugins.push(new HtmlWebpackPlugin({
      template: 'src/index.ejs', inject: false, minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }));
  }

  if (isProd) {
    const {CleanWebpackPlugin} = require('clean-webpack-plugin');
    plugins.push(new CleanWebpackPlugin());
    const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
    const CompressionPlugin = require('compression-webpack-plugin');
    plugins.push(new MiniCssExtractPlugin());
    const SriPlugin = require('webpack-subresource-integrity');
    plugins.push(new SriPlugin({
      hashFuncNames: ['sha256', 'sha384'],
      enabled: true,
    }));
    plugins.push(new CompressionPlugin());
    plugins.push(new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: {
        map: {
          inline: false
        }
      }
    }));
  } else {
    //conflicts with speedmeasure
    // const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
    // plugins.push(new HardSourceWebpackPlugin({
    //   environmentHash: {
    //     root: process.cwd(),
    //     directories: [],
    //     files: ['package.json', `${argv.mode}.json`],
    //   }
    // }))
  }

  plugins.push(new webpack.DefinePlugin({
    CONSTS: JSON.stringify(options),
  }));
  return plugins;
}

/**
 *  Builds loaders for css processing
 **/
function getSassPlugins(isProd, publicPath) {
  const sassLoader = {
    loader: "sass-loader",
    options: {
      prependData: '@import "~@/assets/sass/global.sass"',
      sassOptions: {
        functions: {"get($keys)": sassGet},
        indentedSyntax: true
      },
    }
  };
  if (isProd) {
    return [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath,
        }
      },
      'css-loader',
      sassLoader,
    ]
  } else {
    return [
      "style-loader",
      'css-loader?sourceMap',
      sassLoader
    ];
  }
}


module.exports = (env, argv) => {

  if (['development', 'production'].indexOf(argv.mode) < 0) {
    throw `Pass --mode production/development, current ${argv.mode} is invalid`
  }

  let isProd = argv.mode === 'production';
  let isCoverage = argv.coverage === 'true';
  let isLint = argv.lint === 'true';
  let options = require(`./${argv.mode}.json`);

  addGitHash(options);

  return {
    context: __dirname,
    entry: ['reflect-metadata', './src/main.ts', './src/polyfills/inputEvent.ts'],
    stats: isProd ? 'normal' : 'errors-only',
    plugins: buildPlugins(options, isLint, isProd),
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
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  'babel-preset-typescript-vue',
                ],
                plugins: [
                  "@babel/plugin-proposal-optional-chaining",
                  "@babel/plugin-proposal-numeric-separator",
                  ["@babel/plugin-proposal-decorators", {"legacy": true}],
                  ["@babel/plugin-proposal-class-properties", {"loose": true}],
                  ...(isCoverage ? ['istanbul'] : []),
                ],
                babelrc: false,
              },
            },
          ],
        },
        {
          exclude: /node_modules/,
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        ...(isLint ? [{
          test: /\.(ts|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        },] : []),
        {
          test: /\.sa(s|c)s$/,
          use: [
          'vue-style-loader',
          'css-loader',
          {
              loader: 'sass-loader',
              // Requires sass-loader@^7.0.0
              options: {
                  sassOptions: {
                      fiber: require('fibers'),
                      indentedSyntax: true
                  },
                  implementation: require('sass'),
                  prependData: '@import "~@/assets/sass/global.sass"',
              },
          },
      ],
        },
        {
          test: /(\.svg|\.jpg|\.gif|\.png|\.woff2?|\.eot|\.ttf|\.otf)$/,
          loader: 'file-loader',
          options: {
            esModule: false, // vue doesn't support esmodule in things like images yet
            publicPath: options.PUBLIC_PATH,
            name: f => {
              let dirNameInsideAssets = path.relative(path.join(__dirname, 'src', 'assets'), path.dirname(f));
              return `${dirNameInsideAssets}/[name].[ext]?[sha512:hash:base64:6]`;
            }
          }
        },
      ],
    },
  };
  // if (isProd) {
  //   const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
  //   const smp = new SpeedMeasurePlugin();
  //   conf = smp.wrap(conf);
  // }
};
