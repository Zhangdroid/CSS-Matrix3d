const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'matrix.min.js',
    library: 'matrix',
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {test: /\.(js)$/, use: 'babel-loader'}
    ]
  },
  devtool: 'source-map'
}