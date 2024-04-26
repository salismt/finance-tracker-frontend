import {merge} from "webpack-merge";
import common from "./webpack.common.mjs";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import webpack from "webpack"; // Ensure webpack is required here

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default merge(common, {
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new CopyPlugin({

      patterns: [
        { from: 'img', to: 'img' },
        { from: 'css', to: 'css' },
        { from: 'js/vendor', to: 'js/vendor' },
        { from: 'icon.svg', to: 'icon.svg' },
        { from: 'favicon.ico', to: 'favicon.ico' },
        { from: 'robots.txt', to: 'robots.txt' },
        { from: 'icon.png', to: 'icon.png' },
        { from: '404.html', to: '404.html' },
        { from: 'site.webmanifest', to: 'site.webmanifest' }
      ],
    }),
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL || 'https://finance-tracker-backend-zbxuhg7gpq-as.a.run.app'),
      'process.env.FRONTEND_URL': JSON.stringify(process.env.FRONTEND_URL || 'https://salismt.github.io/finance-tracker-frontend'),
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.URL_PREFIX': JSON.stringify('/finance-tracker-frontend/')
    }),
  ],
  output: {
    publicPath: '/finance-tracker-frontend/', // Make sure this is correct for your GitHub Pages URL
  }
});
