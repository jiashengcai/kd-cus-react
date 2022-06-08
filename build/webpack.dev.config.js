const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config.js')

const devConfig = merge(baseConfig, {
  mode: 'development',
  devtool: '#source-map',
  watch: true,
  watchOptions: {
    aggregateTimeout: 500,
    poll: 1000,
    ignored: /node_modules/
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
})

module.exports = devConfig