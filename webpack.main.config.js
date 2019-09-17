const path = require('path');

module.exports = {
  mode: 'production',
  target: 'electron-main',
  entry: path.join(__dirname, 'src', 'MainProcess', 'index.ts'),
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
    ],
  },
};
