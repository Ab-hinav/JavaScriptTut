/* eslint-disable semi */
const path = require('path')

module.exports = {
  mode: 'production',
  entry: './src/app.js',
  output: {
    filename: '[contenthash].js',
    path: path.resolve(__dirname, 'assets', 'scripts'),
    publicPath: './assets/scripts/',
    clean: true
  },
  devtool: 'cheap-source-map'
};
