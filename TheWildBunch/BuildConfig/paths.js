'use strict'

const path = require('path')
const fs = require('fs')
const url = require('url')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

const envPublicUrl = process.env.PUBLIC_URL

const getPublicUrl = appPackageJson => envPublicUrl || require(appPackageJson).homepage

module.exports = {
    publicPath: resolveApp('wwwroot'),
    clientSrc: resolveApp('ClientApp'),
    clientEntry: resolveApp('ClientApp/boot-client.jsx'),
    clientDist: resolveApp('wwwroot/dist/home'),
    serverEntry: resolveApp('ClientApp/boot-server.jsx'),
    serverDist: resolveApp('ClientApp/dist'),
    vendorManifest: resolveApp('wwwroot/dist/home/vendor-manifest.json')
}