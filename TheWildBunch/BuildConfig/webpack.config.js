﻿const webpack = require('webpack')
const merge = require('merge')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const paths = require('./paths')

module.exports = (env) => {
    const isDevBuild = !(env && env.prod)

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
            fs: 'empty',
            buffer: 'empty'
        },
        module: {
            rules: [
                {
                    test: [/\.js$/, /\.jsx$/],
                    exclude: /node-modules/,
                    use: 'babel-loader'
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    use: 'url-loader?limit=25000'
                },
                {
                    test: [/\.tsx?$/],
                    exclude: /node-modules/,
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
                require.resolve('./polyfills'),
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
                filename: 'site-css'
            }),
            // ship the vendor manifest to reduce compile time by only recompiling user application
            //new webpack.DllReferencePlugin({
                //context: __dirname,
                //manifest: require(paths.vendorManifest)
            //})
        ].concat(isDevBuild ? [

            // fixes hot reload case sensitive paths bug
            new CaseSensitivePathsPlugin()
        ] : [
            new webpack.optimize.UglifyJsPlugin()
        ])
    })

    const serverBundleConfig = merge(sharedConfig(), {
        resolve: { mainFields: ['main'] },

        entry: { 'main-server': paths.serverEntry },

        module: {
            rule: [{ test: /\.css(\?|$)/, use: isDevBuild ? 'css-loader' : 'css-loader?minimize' }]
        },

        plugins: [
            //new webpack.DllReferencePlugin({
              //  context: __dirname,
                //manifest: require(paths.vendorManifest),
                //sourceType: 'commonjs2',
                //name: './vendor'
            //}),
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