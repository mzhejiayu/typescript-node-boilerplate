const path = require('path');
let mode = process.env.ENV ? process.env.ENV : "development"
let devtool = process.env.DEVTOOL ? process.env.DEVTOOL : "cheap-module-eval-source-map"
module.exports = {
  mode: mode,
  entry: './src/index.ts',
  devtool: devtool,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  target: 'node',
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'index.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9001
  }
};