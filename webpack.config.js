const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: './code/index.js',

  devtool: 'inline-source-map',

  devServer: {

    static: './dist',

  },

  output: {

   filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),

  },

  module: {

    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],

  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './code/build.html'
    })
  ],

};
