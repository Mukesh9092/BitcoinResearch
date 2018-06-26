const WriteFilePlugin = require('write-file-webpack-plugin')
const webpack = require('webpack')

const isDevelopment = require('./common/environment/isDevelopment').default
const log = require('./common/log').log

const base = {
  mode: isDevelopment() ? 'development' : 'production',
  devtool: 'inline-cheap-source-map',
  output: {
    chunkFilename: '[name].js',
    filename: '[name].js',
    path: `${__dirname}/.hmr`,
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
}

const client = {
  ...base,
  name: 'client',
  target: 'web',
  entry: {
    client: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?name=client&reload=true',
      `${__dirname}/client.jsx`,
    ],
  },
  plugins: base.plugins.concat([new webpack.HotModuleReplacementPlugin()]),
}

const server = {
  ...base,
  name: 'server',
  target: 'node',
  entry: {
    server: [`${__dirname}/server.jsx`],
  },
  output: {
    ...base.output,
    libraryTarget: 'commonjs2',
  },
}

const config = [client, server]

log.debug({ config })

module.exports = config
