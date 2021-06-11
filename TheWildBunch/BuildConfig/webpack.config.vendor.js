const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const umd = require('umd-require-webpack-plugin')
const paths = require('./paths')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = (env) => {
    const isDevBuild = !(env && env.prod)

    const extractCSS = new ExtractTextPlugin({
        filename: 'vendor.css',
        allChunks: true
    })

    const sharedConfig = () => ({
        mode: 'development',
        devtool: 'inline-cheap-module-source-map',
        stats: { modules: false },
        resolve: { extensions: ['.js', '.ts'] },

        module: {
            rules: [
                { test: [/\.js$/, /\.JSX$/], 'loader': 'babel-loader' },
                { test: /\.(png|woff|woff2|eot|ttf|svg)$/, use: 'url-loader?limit=100000' },
                { test: [/\.tsx?$/], use: 'ts-loader' }
            ]
        },
        cache: false,
        entry: {
            vendor: [
                'bootstrap/dist/css/bootstrap.css',
                'domain-task',
                'event-source-polyfill',
                'babel-polyfill',
                'history',
                'react',
                'react-dom',
                'react-router-dom',
                'react-redux',
                'redux',
                'redux-thunk',
                'connected-react-router'
            ]
        },
        output: {
            publicPath: 'dist/',
            filename: '[name].js',
            library: '[name]_[hash]'
        },
        plugins: [
            new webpack.NormalModuleReplacementPlugin(/\/iconv-loader$/, require.resolve('node-noop')),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': isDevBuild ? '"development"' : '"production'
            })
        ]
    })

    const clientBundleConfig = merge(sharedConfig(), {
        output: { path: paths.clientDist },
        module: {
            rules: [
                {
                    test: /\.css(\?|$)/,
                    use: ExtractTextPlugin.extract({ use: isDevBuild ? 'css-loader' : 'css-loader?minimize' })
                }
            ]
        },
        plugins: [
            extractCSS,
            umd,            
            new webpack.DllPlugin({
                path: path.join(paths.clientDist, '[name]-manifest.json'),
                name: '[name]_[hash]'
            })
        ].concat(isDevBuild ? [] : [
            new webpack.optimize.UglifyJsPlugin()
        ])
    })

    const serverBundleConfig = merge(sharedConfig(), {
        target: 'node',
        resolve: { mainFields: ['main'] },
        output: {
            path: paths.serverDist,
            libraryTarget: 'commonjs2'
        },
        module: {
            rule: [{ test: /\.css(\?|$)/, use: isDevBuild ? 'css-loader' : 'css-loader?minimize' }]
        },
        entry: { vendor: ['aspnet-prerendering', 'react-dom-server'] },
        plugins: [
            umd,
            new webpack.DllPlugin({
                path: path.join(paths.serverDist, '[name]-manifest.json'),
                name: '[name]_[hash]'
            })
        ]
        
    })

    return [clientBundleConfig, serverBundleConfig]
}