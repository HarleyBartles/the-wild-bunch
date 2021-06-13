'use strict'

if (typeof Promise === 'undefined') {
    // rejection-tracking to prevent inconsistent state bug
    //require.resolve('../node_modules/promise/lib/rejection-tracking').enable()
    require('promise/lib/rejection-tracking').enable()
    //window.Promise = require.resolve('../node_modules/promise/lib/es6-extension.js')
    window.Promise = require('promise/lib/es6-extension.js')
}

// fetch polyfill for API calls
require("whatwg-fetch")

// it'll use the native implementation if it's present and not buggy
Object.assign = require('object-assign')

// if testing, polyfill requestAnimationFrame since jsdom doesn't provide it yet
if (process.env.NODE_ENV === 'test') {
    require('raf').polyfill(global)
}