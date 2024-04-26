const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './js/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: 'bundle.js', // Just the filename, Webpack will put this in the dist directory
  },
  plugins: []
};
