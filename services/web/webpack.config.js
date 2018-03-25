const WriteFilePlugin = require('write-file-webpack-plugin');
const webpack = require('webpack');

const base = {
  mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
  devtool: 'inline-cheap-source-map',
  output: {
    chunkFilename: '[name].js',
    filename: '[name].js',
    path: `${__dirname}/dist`,
    publicPath: '/static/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [{ loader: 'css-loader', options: { importLoaders: 1 } }],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  plugins: [new WriteFilePlugin()],
};

const client = {
  ...base,
  name: 'client',
  target: 'web',
  entry: {
    client: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?name=client&reload=true',
      './src/client.jsx',
    ],
  },
  plugins: base.plugins.concat([new webpack.HotModuleReplacementPlugin()]),
};

const server = {
  ...base,
  name: 'server',
  target: 'node',
  entry: {
    server: ['./src/server.jsx'],
  },
  output: {
    ...base.output,
    libraryTarget: 'commonjs2',
  },
};

const config = [client, server];

// console.log('config', util.inspect(config, { depth: Infinity }));

module.exports = config;
