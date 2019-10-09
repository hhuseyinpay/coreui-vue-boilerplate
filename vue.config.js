'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  runtimeCompiler: true,
  publicPath: '/',
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: 'hhp Template',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}
