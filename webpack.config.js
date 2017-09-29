const webpack = require('webpack');

module.exports = {
  entry: './src/Logo.js',
  output: {
    filename: './dist/Logo.js',
    library: 'LogoJS',
    libraryExport: 'default'
  }
};