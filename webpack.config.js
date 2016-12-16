const path = require('path');
const webpack = require('webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');


module.exports = {
  entry: './src/script/main.js',
  output: {
   path: path.resolve(__dirname, 'dist', 'script'),
   filename: 'output.min.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
    // new webpack.SourceMapDevToolPlugin({})
    // new webpack.FaviconsWebpackPlugin({'some-image-logo.png'});
  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  }
};
