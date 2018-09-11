// TODO: Doesnt't work .. maybe it's the symlink?
// require('dotenv').config()

const util = require('util')

const MiniCssExtractWebpackPlugin = require('mini-css-extract-plugin')
const WriteFileWebpackPlugin = require('write-file-webpack-plugin')
const webpack = require('webpack')
const webpackNodeExternals = require('webpack-node-externals')

const isDevelopment = require('./common/environment/isDevelopment').default

// const { PUBLIC_ASSET_PATH } = process.env
const PUBLIC_ASSET_PATH = '/static'

const getEntry = (isServer) => {
  const output = {}

  if (isServer) {
    output.server = [`${__dirname}/server.jsx`]
  } else {
    output.client = [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?name=client&reload=true',
      `${__dirname}/client.jsx`,
    ]
  }

  return output
}

const getExternals = (isServer) => {
  const output = []

  if (isServer) {
    output.push(
      webpackNodeExternals({
        // Third party CSS
        whitelist: /\.css$/,
      }),
    )
  }

  return output
}

const getModuleRules = (isServer) => {
  const output = []

  output.push({
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    use: [{ loader: 'babel-loader' }],
  })

  output.push({
    test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
    use: [{ loader: 'file-loader' }],
  })

  output.push({
    test: /\.(png|svg|jpg|gif)$/,
    use: [{ loader: 'file-loader' }],
  })

  const styleLoader = {
    loader: 'style-loader',
  }

  const cssLoader = {
    loader: 'css-loader',
    options: {
      camelCase: true,
      modules: true,
      sourceMap: true,
      // Number of loaders below. Important.
      importLoaders: 2,
      localIdentName: '[name]__[local]--[hash:base64:5]',
    },
  }

  const cssLocalLoader = {
    loader: 'css-loader/locals',
    options: {
      camelCase: true,
      modules: true,
      sourceMap: true,
      // Number of loaders below. Important.
      importLoaders: 0,
      localIdentName: '[name]__[local]--[hash:base64:5]',
    },
  }

  const cssExtractLoader = {
    loader: MiniCssExtractWebpackPlugin.loader,
  }

  const postCssLoader = {
    loader: 'postcss-loader',
    options: {
      plugins: [
        require('autoprefixer')({
          browsers: ['IE >= 11', 'Android >= 7', 'last 2 ChromeAndroid versions', 'Last 2 versions'],
          // grid: true
        }),
      ],
    },
  }

  const sassLoader = {
    loader: 'sass-loader',
    options: {
      sourceMap: true,
      // includePaths: scssIncludePaths,
    },
  }

  const loaders = []

  if (isServer) {
    // loaders.push(cssLocalLoader)
    loaders.push(cssExtractLoader)
    // loaders.push(postCssLoader)
    // loaders.push(sassLoader)

    output.push({
      // test: /\.(css|scss)$/,
      test: /\.css$/,
      exclude: /node_modules/,
      use: loaders,
    })
  } else {
    if (isDevelopment()) {
      loaders.push(styleLoader)
      loaders.push(cssExtractLoader)
    } else {
      loaders.push(cssExtractLoader)
    }
    // loaders.push(postCssLoader)
    // loaders.push(sassLoader)

    output.push({
      // test: /\.(css|scss)$/,
      test: /\.css$/,
      exclude: /node_modules/,
      use: loaders,
    })
  }

  return output
}

const getOptimization = (isServer) => {
  return {
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
  }
}

const getOutput = (isServer) => {
  return {
    filename: isDevelopment() ? '[name].js' : '[name].[hash].js',
    chunkFilename: isDevelopment() ? '[id].js' : '[id].[hash].js',
    libraryTarget: isServer ? 'commonjs2' : 'var',
    path: `${__dirname}/.hmr`,
    publicPath: PUBLIC_ASSET_PATH,
  }
}

const getPlugins = (isServer) => {
  const plugins = []

  if (isDevelopment()) {
    plugins.push(new webpack.AutomaticPrefetchPlugin())
    plugins.push(new WriteFileWebpackPlugin())
  }

  if (isServer) {
    plugins.push(
      new MiniCssExtractWebpackPlugin({
        filename: isDevelopment() ? '[name].css' : '[name].[hash].css',
        chunkFilename: isDevelopment() ? '[id].css' : '[id].[hash].css',
      }),
    )
  } else {
    plugins.push(new webpack.HotModuleReplacementPlugin())
  }

  return plugins
}

const getResolve = (isServer) => {
  return {
    extensions: ['.js', '.jsx'],
  }
}

const getStats = (isServer) => {
  return {
    assets: true,
    builtAt: true,
    cached: true,
    cachedAssets: true,
    chunks: true,
    chunkGroups: true,
    chunkOrigins: true,
    colors: true,
    depth: true,
    entrypoints: true,
    env: true,
    errors: true,
    errorDetails: true,
    hash: true,
    maxModules: 100,
    modules: true,
    moduleTrace: true,
    performance: true,
    reasons: true,
    timings: true,
    version: true,
    warnings: true,
  }
}

const getConfiguration = (isServer) => {
  return {
    name: isServer ? 'server' : 'client',
    target: isServer ? 'node' : 'web',
    mode: isDevelopment() ? 'development' : 'production',
    devtool: isServer ? 'source-map' : 'inline-cheap-source-map',

    entry: getEntry(isServer),
    externals: getExternals(isServer),
    module: { rules: getModuleRules(isServer) },
    optimization: getOptimization(isServer),
    output: getOutput(isServer),
    plugins: getPlugins(isServer),
    resolve: getResolve(isServer),
    stats: getStats(isServer),
  }
}

const config = [getConfiguration(false), getConfiguration(true)]

console.log(util.inspect(config, false, null))

module.exports = config
