const wp = require('@cypress/webpack-preprocessor');

const webpackConfig = {
    webpackOptions: {
        mode: 'development',
        // webpack will transpile TS and JS files
        resolve: {
            extensions: ['.ts', '.js']
        },
        module: {
            rules: [
                {
                    // every time webpack sees a TS file (except for node_modules)
                    // webpack will use "ts-loader" to transpile it to JavaScript
                    test: /\.ts$/,
                    exclude: [/node_modules/],
                    use: [
                        {
                            loader: 'ts-loader',
                            // options: {
                            //     // skip typechecking for speed
                            //     transpileOnly: true
                            // }
                        }
                    ]
                }
            ]
        }
    },
};

module.exports = (on) => {
    on('task', require('@cypress/code-coverage/task'));
    on('file:preprocessor', require('@cypress/code-coverage/use-browserify-istanbul'));
    on('file:preprocessor', wp(webpackConfig));
};
