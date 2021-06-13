const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const paths = require('./paths')

const configuration = (env) => {
    const isDevBuild = !(env && env.prod)

    // common configuration
    const sharedConfig = () => ({
        mode: 'development',
        devtool: 'inline-module-source-map',
        resolve: {
            extensions: ['.js', '.jsx'],
            alias: {
                'react-dom': '@hot-loader/react-dom'
            }
        },
        output: {
            filename: '[name].js',
            publicPath: 'dist/'
        },
        node: {
            fs: 'empty', // Because of jsrsasign usage of fs
            buffer: 'empty'
        },
        module: {
            rules: [
                {
                    test: [/\.js$/, /\.jsx$/],
                    exclude: /node_modules/,
                    use: 'babel-loader'
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    use: 'url-loader?limit=25000'
                },
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: 'ts-loader'
                }
            ]
        },
        plugins: [
        ]
    })
    
    const clientBundleConfig = merge(sharedConfig(), {
        entry: {
            'main-client': [
                // require.resolve('./polyfills'),
                // require polyfill for async usage
                'babel-polyfill',
                paths.clientEntry
            ]
        },
        module: {
            rules: [
                {
                    test: /\.(css|sass|scss)$/,
                    use: ExtractTextPlugin.extract({ use: ['css-loader', 'sass-loader'] })
                }
            ]
        },
        output: { path: paths.clientDist },
        plugins: [
            new ExtractTextPlugin({
                filename: 'site.css'
            }),
            // ship the vendor manifest to reduce compile time by only recompiling user application
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require(paths.vendorManifest)
            })
        ].concat(isDevBuild ? [
            // plugins that apply in development builds only
            
            // fixes hot reload case sensitive paths bug
            new CaseSensitivePathsPlugin()
        ] : [
                // plugins that apply in production builds only
                new webpack.optimize.UglifyJsPlugin()
            ])
    })

    const serverBundleConfig = merge(sharedConfig(), {
        resolve: { mainFields: ['main'] },
        entry: { 'main-server': paths.serverEntry },
        module: {
            rules: [{ test: /\.css(\?|$)/, use: isDevBuild ? 'css-loader' : 'css-loader?minimize' }]
        },
        plugins: [
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require(paths.vendorManifest),
                sourceType: 'commonjs2',
                name: './vendor'
            }),

            // fixes hot reload case sensitive paths bug
            new CaseSensitivePathsPlugin()
        ],
        output: {
            libraryTarget: 'commonjs',
            path: paths.serverDist
        },
        target: 'node',
        devtool: 'inline-source-map'
    })

    return [clientBundleConfig, serverBundleConfig]
}

module.exports = configuration;