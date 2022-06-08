const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')

const prodConfig = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new webpack.HashedModuleIdsPlugin()
  ]
})

module.exports = prodConfig
