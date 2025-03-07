const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: path.join(__dirname, '../src', 'index.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@': path.resolve(__dirname, '../src/'),
      '@api': path.resolve(__dirname, '../src/api/'),
      '@hooks': path.resolve(__dirname, '../src/hooks/'),
      '@components': path.resolve(__dirname, '../src/components/'),
      '@styles': path.resolve(__dirname, '../src/styles'),
      // '@static': path.resolve(__dirname, '../static'),
      '@utils': path.resolve(__dirname, '../src/utils/'),
      // '@types': path.resolve(__dirname, '../src/types/'),
      '@layouts': path.resolve(__dirname, '../src/layouts/'),
      '@pages': path.resolve(__dirname, '../src/pages/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|woff|woff2|ttf|svg|ico)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  // set plugins
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new HtmlWebpackPlugin({
      title: 'N2T',
      scriptLoading: 'defer',
      template: './static/index.html',
    }),
  ],
};
