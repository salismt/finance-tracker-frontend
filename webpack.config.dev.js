const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    liveReload: true,
    hot: true,
    open: true,
    static: ['./'],
    contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'response-doc')],
    watchContentBase: true,
    port: 8080
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify('http://localhost:3000'),
      'process.env.FRONTEND_URL': JSON.stringify(process.env.FRONTEND_URL || 'http://localhost:8080')
    })
  ],
  module: {
    rules: [
      // ... other rules
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
});
