import path from "path";
import webpack from "webpack";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: './js/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: 'bundle.js',
  },
  plugins: []
};
