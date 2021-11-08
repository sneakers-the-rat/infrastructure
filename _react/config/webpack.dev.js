const webpack = require('webpack')
const { merge } = require('webpack-merge')
const path = require( 'path' );

const common = require('./webpack.common.js')


module.exports = merge(common, {
  // Set the mode to development or production
  mode: 'development',
  watch: true,
  watchOptions: {
    ignored: '**/node_modules/',
  },

  // Control how source maps are generated
  devtool: 'inline-source-map',

  module: {
    rules: [
      // Styles: Inject CSS into the head with source maps
      {
        test:/\.(s[ac]ss)$/i,
        use: [
          'style-loader',
           'css-loader',
            'sass-loader'
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ],
  },

  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
  ],
})
