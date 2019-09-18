const path = require('path');

module.exports = {
  mode: 'production',
  target: 'electron-main',
  entry: path.resolve(__dirname, 'src', 'MainProcess', 'index.ts'),
  node: {
    __filename: false,
    __dirname: false,
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
      },
      {
        enforce: 'pre',
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          quiet: true,
        },
      },
    ],
  },
};
