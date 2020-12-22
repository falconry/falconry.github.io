const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  mode: 'development',
  output: {
    filename: './assets/[name].js',
    assetModuleFilename: './assets/[name][ext][query]',
    path: path.resolve(__dirname, 'dist-dev'),
    publicPath: ''
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
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
    })
  ]
};

module.exports = config;
