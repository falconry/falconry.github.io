const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  mode: 'production',
  output: {
    filename: './assets/[name].[contenthash].js',
    assetModuleFilename: './assets/[name][ext][query]',
    path: path.resolve(__dirname, 'dist-prod'),
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(woff|woff2)$/i,
        type: 'asset'
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(html)$/,
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'public', to: '' }
      ],
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './src/favicon.png',
      minify: false
    }),
    new MiniCssExtractPlugin({
      filename: './[name].[contenthash].css'
    })
  ]
};

module.exports = config;
