const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const config = require('../config').webpack

module.exports = {
  entry: './frontend/index.js',
  output: {
    path: config.outputPath,
    filename: config.outputFilename,
    publicPath: config.outputPublicPath
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[path][name]__[local]--[hash:base64:5]'
              }
            },
            'postcss-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: config.cssFilename
    }),
    new webpack.DefinePlugin({
      NODE_ENV: 'production'
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
  ],
  resolve: {
    modules: [
      path.join(__dirname, 'frontend'),
      'node_modules'
    ]
  }
}