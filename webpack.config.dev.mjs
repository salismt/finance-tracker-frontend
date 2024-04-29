import {merge} from "webpack-merge";

import common from "./webpack.common.mjs";

import path from "path";

import webpack from "webpack"; // Ensure webpack is required here

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default merge(common, {
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
    devMiddleware: {
      publicPath: "/"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      publicPath: '/'
    }),
  ],
  resolve: {
    alias: {
      'response-doc': path.resolve(__dirname, 'response-doc/')
    }
  }
});
