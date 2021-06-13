const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const umd = require('umd-require-webpack-plugin')
const paths = require('./paths')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const configuration = (env) => {
    const isDevBuild = !(env && env.prod)
    const extractCSS = new ExtractTextPlugin({
        filename: 'vendor.css',
        allChunks: true
    })

    const vendorLibs = [
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

    const sharedConfig = () => ({
        mode: 'development',
        devtool: 'inline-module-source-map',
        stats: { modules: false },
        resolve: { extensions: ['.js', '.jsx'] },
        output: {
            filename: '[name].js',
            publicPath: 'dist/',
            library: '[name]_[hash]'
        },
        node: {
            fs: 'empty'
        },
        module: {
            rules: [             
                { test: [/\.js$/, /\.jsx$/], use: 'babel-loader' }
            ]
        },
        cache: false,
        entry: {
            'vendor': vendorLibs
        },        
        plugins: [
        ]
    })

    const clientBundleConfig = merge(sharedConfig(), {
        output: { path: paths.clientDist },
        module: {
            rules: [
                { test: /\.css(\?|$)/, use: extractCSS.extract({ use: isDevBuild ? 'css-loader' : 'css-loader?minimize' }) }
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
            rules: [{ test: /\.css(\?|$)/, use: isDevBuild ? 'css-loader' : 'css-loader?minimize' }]
        },
        entry: { vendor: ['aspnet-prerendering', 'react-dom/server'] },
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

module.exports = configuration