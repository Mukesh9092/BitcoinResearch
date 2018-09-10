const util = require('util')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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

  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NamedModulesPlugin(),
    new WriteFilePlugin(),
    new MiniCssExtractPlugin({
      filename: isDevelopment() ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment() ? '[id].css' : '[id].[hash].css',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{ loader: 'file-loader' }],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{ loader: 'file-loader' }],
      },
      {
        test: /\.json$/,
        use: [{ loader: 'json-loader' }],
      },
    ],
  },

  stats: {
    colors: true,
    modules: true,
    reasons: true,
  },
}

const getCSSRules = (isServer) => {
  const rules = [
    {
      test: /\.(css|scss)$/,
      use: [
        {
          loader: isServer ? MiniCssExtractPlugin.loader : 'style-loader',
          options: {
            sourceMap: true,
          },
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            module: true,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            // ident: 'postcss',
            plugins: [
              require('autoprefixer')({
                browsers: ['IE >= 11', 'Android >= 7', 'last 2 ChromeAndroid versions', 'Last 2 versions'],
                // grid: true
              }),
            ],
          },
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            // includePaths: scssIncludePaths,
          },
        },
      ],
    },
  ]

  return rules
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

  module: {
    ...base.module,

    rules: base.module.rules.concat(getCSSRules(false)),
  },
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

  plugins: base.plugins.concat([]),

  module: {
    ...base.module,

    rules: base.module.rules.concat(getCSSRules(true)),
  },
}

const config = [client, server]

console.log(util.inspect(config, false, null))

module.exports = config
