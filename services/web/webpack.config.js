const util = require('util')

// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WriteFilePlugin = require('write-file-webpack-plugin')
const webpack = require('webpack')

const isDevelopment = require('./common/environment/isDevelopment').default

const base = {
  mode: isDevelopment() ? 'development' : 'production',
  output: {
    filename: isDevelopment() ? '[name].js' : '[name].[hash].js',
    chunkFilename: isDevelopment() ? '[id].js' : '[id].[hash].js',
    path: `${__dirname}/.hmr`,
    // TODO: Get this from ENV var STATIC_ASSET_PATH
    publicPath: '/static/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       styles: {
  //         name: 'styles',
  //         test: /\.css$/,
  //         chunks: 'all',
  //         enforce: true,
  //       },
  //     },
  //   },
  // },
  plugins: [new WriteFilePlugin()],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [{ loader: 'url-loader' }],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        // use: isDevelopment()
        //   ? ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        //   : [
        //       'file-loader',
        //       'extract-loader',
        //       'css-loader',
        //       'postcss-loader',
        //       'sass-loader',
        //     ],
        use: [
          'file-loader',
          'extract-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
}

const client = {
  ...base,
  name: 'client',
  target: 'web',
  devtool: 'inline-cheap-source-map',
  entry: {
    client: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?name=client&reload=true',
      `${__dirname}/client.jsx`,
    ],
  },
  plugins: base.plugins.concat([new webpack.HotModuleReplacementPlugin()]),
  // module: {
  //   ...base.module,
  //   rules: base.module.rules.concat([]),
  // },
}

const server = {
  ...base,
  name: 'server',
  target: 'node',
  devtool: 'source-map',
  entry: {
    server: [`${__dirname}/server.jsx`],
  },
  output: {
    ...base.output,
    libraryTarget: 'commonjs2',
  },
  // module: {
  //   ...base.module,
  //   rules: base.module.rules.concat([]),
  // },
}

const config = [client, server]

console.log(util.inspect(config, false, null))

module.exports = config
