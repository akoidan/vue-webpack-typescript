const wp = require('@cypress/webpack-preprocessor');

module.exports = (on) => {
    const options = {
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
    on('file:preprocessor', wp(options))
};
