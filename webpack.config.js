'use strict';

const path = require('path');

/**
 * If the "--production" command-line parameter is specified when invoking Heft, then the
 * "production" function parameter will be true.  You can use this to enable bundling optimizations.
 */
function createWebpackConfig({ production }) {
    const webpackConfig = {
        // Documentation: https://webpack.js.org/configuration/mode/
        mode: production ? 'production' : 'development',
        resolve: {
            extensions: ['.js', '.jsx', '.json'],
        },
        module: {
            rules: [
                {
                    test: /\.(svg|png|jpe?g|gif)$/i,
                    loader: 'file-loader',
                },
            ],
        },
        entry: {
            app: path.join(__dirname, 'lib', 'index.js'),

            // Put these libraries in a separate vendor bundle
            vendor: ['react'],
        },
        output: {
            path: path.join(__dirname, 'dist'),
            filename: '[name]_bundle.js',
            chunkFilename: '[name]_[contenthash].js',
        },
        performance: {
            // This specifies the bundle size limit that will trigger Webpack's warning saying:
            // "The following entrypoint(s) combined asset size exceeds the recommended limit."
            maxEntrypointSize: 250000,
            maxAssetSize: 250000,
        },
        devtool: production ? undefined : 'source-map',
    };

    return webpackConfig;
}

module.exports = createWebpackConfig;
