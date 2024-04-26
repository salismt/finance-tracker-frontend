const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack'); // Ensure webpack is required here

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    liveReload: true,
    hot: true,
    open: true,
    static: {
      directory: path.join(__dirname), // Pointing to the project root
      watch: true,
    },
    port: 8080,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify('http://localhost:3000'),
      'process.env.FRONTEND_URL': JSON.stringify('http://localhost:8080'),
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.URL_PREFIX': JSON.stringify('/')
    })
  ],
  resolve: {
    alias: {
      'response-doc': path.resolve(__dirname, 'response-doc/')
    }
  }
});
